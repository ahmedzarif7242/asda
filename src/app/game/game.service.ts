import { Injectable, inject, signal } from '@angular/core';

import { AudioService } from './audio/audio.service';
import { EngineService } from './engine/engine.service';
import { InputService } from './input/input.service';
import { Difficulty, GameMode } from './model/game.types';
import { GameStore } from './state/game.store';
import { ScoresService } from './storage/scores.service';

/**
 * What the buttons call.
 *
 * The screens are templates with no logic of their own; every tap lands here, and this is
 * the one place that knows a run starts with the engine *and* the store *and* the sound.
 */
@Injectable({ providedIn: 'root' })
export class GameService {
  readonly store = inject(GameStore);
  readonly scores = inject(ScoresService);
  private readonly engine = inject(EngineService);
  private readonly audio = inject(AudioService);
  private readonly input = inject(InputService);

  /** Set when the last run beat the device's best for its mode and difficulty. */
  readonly newBest = signal(false);

  mount(canvas: HTMLCanvasElement): void {
    this.engine.mount(canvas);
  }

  choose(mode: GameMode): void {
    this.store.mode.set(mode);
  }

  chooseDifficulty(id: Difficulty): void {
    this.store.difficultyId.set(id);
  }

  chooseCar(id: string): void {
    this.store.carId.set(id);
  }

  toggleMute(): void {
    this.store.muted.update((m) => !m);
  }

  start(): void {
    this.audio.unlock();
    this.newBest.set(false);
    this.store.startRun();
    this.engine.beginRun(() => this.onRunEnded());
  }

  pause(): void {
    this.store.pause();
  }

  resume(): void {
    this.audio.unlock();
    this.store.resume();
  }

  restart(): void {
    this.start();
  }

  toMenu(): void {
    this.store.toMenu();
  }

  steer(direction: -1 | 1): void {
    this.input.steer(direction);
  }

  nitro(): void {
    this.input.nitroRequest.set(true);
  }

  hold(control: 'accelerate' | 'brake', down: boolean): void {
    this.input[control].set(down);
  }

  best(): number {
    return this.scores.best(this.store.mode(), this.store.difficultyId());
  }

  async share(): Promise<boolean> {
    const s = this.store;
    const text = `عملت ${s.score()} نقطة في زحمة — ${s.distanceKm()} كم على وضع ${s.difficulty().name} بعربية ${s.car().name}. جرّب تكسرها: ${location.href}`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return true;
      }
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  private onRunEnded(): void {
    const s = this.store;
    const beat = this.scores.record({
      mode: s.mode(),
      difficulty: s.difficultyId(),
      car: s.carId(),
      score: s.score(),
      distance: Math.round(s.distance()),
      coins: s.coins(),
      nearMisses: s.nearMisses(),
      topSpeed: s.topSpeed(),
      at: new Date().toISOString(),
    });
    this.newBest.set(beat);
  }
}
