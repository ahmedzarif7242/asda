import { Injectable, inject, signal } from '@angular/core';

import { AudioService } from './audio/audio.service';
import { EngineService } from './engine/engine.service';
import { InputService } from './input/input.service';
import { CARS, Difficulty, GameMode } from './model/game.types';
import { ROUTES } from './model/routes';
import { GameStore } from './state/game.store';
import { ProgressService } from './storage/progress.service';
import { ScoresService } from './storage/scores.service';

const HINT_KEY = 'zahma.touchHint.v1';

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
  readonly progress = inject(ProgressService);
  private readonly engine = inject(EngineService);
  private readonly audio = inject(AudioService);
  private readonly input = inject(InputService);

  readonly routes = ROUTES;
  readonly cars = CARS;

  /** Set when the last run beat the device's best for its mode and difficulty. */
  readonly newBest = signal(false);
  /** Stars won on the last run that the route did not already have. */
  readonly newStars = signal(0);
  /** The one-time "how to hold it" card on a touch screen. */
  readonly touchHint = signal(this.needsHint());
  readonly isTouch = matchMedia('(hover: none) and (pointer: coarse)').matches;

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
    if (!this.progress.owns(id)) return;
    this.store.carId.set(id);
  }

  buyCar(id: string): void {
    if (this.progress.buy(id)) this.store.carId.set(id);
  }

  chooseRoute(id: string): void {
    if (!this.progress.isUnlocked(id)) return;
    this.store.routeId.set(id);
    this.engine.setRoute();
    this.store.toMenu();
  }

  openMap(): void {
    this.audio.unlock();
    this.store.toMap();
  }

  toggleMute(): void {
    this.store.muted.update((m) => !m);
  }

  start(): void {
    this.audio.unlock();
    this.newBest.set(false);
    this.newStars.set(0);
    this.store.startRun();
    this.engine.beginRun(() => this.onRunEnded());
  }

  dismissHint(): void {
    this.touchHint.set(false);
    try {
      localStorage.setItem(HINT_KEY, '1');
    } catch {
      /* fine */
    }
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

  hold(control: 'left' | 'right' | 'accelerate' | 'brake', down: boolean): void {
    this.input.hold(control, down);
  }

  nitro(): void {
    this.input.nitroRequest.set(true);
  }

  horn(): void {
    this.input.hornRequest.set(true);
  }

  best(): number {
    return this.scores.best(this.store.mode(), this.store.difficultyId(), this.store.routeId());
  }

  async share(): Promise<boolean> {
    const s = this.store;
    const text = `عملت ${s.score()} نقطة في زحمة على ${s.route().name} — ${s.distanceKm()} كم بعربية ${s.car().name}. جرّب تكسرها: ${location.href}`;
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
      route: s.routeId(),
      car: s.carId(),
      score: s.score(),
      distance: Math.round(s.distance()),
      coins: s.coins(),
      nearMisses: s.nearMisses(),
      topSpeed: s.topSpeed(),
      stars: s.stars(),
      at: new Date().toISOString(),
    });
    this.newBest.set(beat);
    this.newStars.set(this.progress.finishRun(s.routeId(), s.stars(), s.coins()));
  }

  private needsHint(): boolean {
    try {
      return !localStorage.getItem(HINT_KEY);
    } catch {
      return true;
    }
  }
}
