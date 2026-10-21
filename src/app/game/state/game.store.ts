import { Injectable, computed, signal } from '@angular/core';

import {
  CARS,
  CarSpec,
  DIFFICULTIES,
  Difficulty,
  DifficultySpec,
  GameMode,
  GameStatus,
  RoadEvent,
  TIMED_SECONDS,
} from '../model/game.types';
import { Objective, RouteSpec, routeById } from '../model/routes';

/**
 * Everything the screens show, as signals.
 *
 * The engine writes here sixty times a second and the HUD reads; nothing in here knows what a
 * mesh is. Keeping the numbers apart from the scene is what lets the menu, the HUD and the
 * game-over card be plain templates.
 */
@Injectable({ providedIn: 'root' })
export class GameStore {
  readonly status = signal<GameStatus>('menu');
  readonly mode = signal<GameMode>('endless');
  readonly difficultyId = signal<Difficulty>('busy');
  readonly carId = signal<string>('fiat128');
  readonly routeId = signal<string>('ring');

  readonly difficulty = computed<DifficultySpec>(
    () => DIFFICULTIES.find((d) => d.id === this.difficultyId()) ?? DIFFICULTIES[1],
  );
  readonly car = computed<CarSpec>(
    () => CARS.find((c) => c.id === this.carId()) ?? CARS[0],
  );
  readonly route = computed<RouteSpec>(() => routeById(this.routeId()));

  // ---- the run ----
  /** km/h */
  readonly speed = signal(0);
  /** metres */
  readonly distance = signal(0);
  readonly coins = signal(0);
  readonly nearMisses = signal(0);
  readonly lives = signal(3);
  readonly maxLives = signal(3);
  /** 0..1 */
  readonly nitro = signal(0);
  readonly nitroActive = signal(false);
  readonly timeLeft = signal(TIMED_SECONDS);
  readonly topSpeed = signal(0);
  /** Metres driven since the last hit — the "clean run" objective. */
  readonly cleanStreak = signal(0);
  readonly bestClean = signal(0);
  /** 0 = noon, 0.5 = midnight. Drives the sky and the HUD's tint. */
  readonly dayPhase = signal(0.04);
  readonly level = signal(1);
  readonly muted = signal(false);
  /** Off the asphalt, on the shoulder. */
  readonly offRoad = signal(false);
  /** Where the wheel is, -1..1, for the HUD's wheel to turn with. */
  readonly wheel = signal(0);
  readonly braking = signal(false);
  readonly throttle = signal(false);

  /** Which gear the engine is in, from the speed — the same five the sound climbs through. */
  readonly gear = computed(() => {
    const s = this.speed();
    return s < 1 ? 'N' : s < 25 ? '1' : s < 50 ? '2' : s < 85 ? '3' : s < 125 ? '4' : '5';
  });
  readonly quality = signal<'high' | 'low'>('high');

  readonly score = computed(() => {
    const base = this.distance() + this.coins() * 10 + this.nearMisses() * 50;
    return Math.round(base * this.difficulty().multiplier * (0.8 + this.route().speed * 0.2));
  });

  readonly distanceKm = computed(() => (this.distance() / 1000).toFixed(2));

  /** The route's three objectives, with whether each is met right now. */
  readonly objectives = computed(() =>
    this.route().objectives.map((o) => ({ ...o, done: this.isMet(o), progress: this.progressOf(o) })),
  );
  readonly stars = computed(() => this.objectives().filter((o) => o.done).length);

  /** The last few things that happened, newest first, for the HUD to flash. */
  readonly events = signal<RoadEvent[]>([]);
  private eventId = 0;

  readonly isNight = computed(() => {
    const p = this.dayPhase();
    return p > 0.32 && p < 0.72;
  });

  startRun(): void {
    const car = this.car();
    this.speed.set(0);
    this.distance.set(0);
    this.coins.set(0);
    this.nearMisses.set(0);
    this.lives.set(car.lives);
    this.maxLives.set(car.lives);
    this.nitro.set(0);
    this.nitroActive.set(false);
    this.timeLeft.set(TIMED_SECONDS);
    this.topSpeed.set(0);
    this.cleanStreak.set(0);
    this.bestClean.set(0);
    this.level.set(1);
    this.offRoad.set(false);
    this.dayPhase.set(this.route().startPhase);
    this.events.set([]);
    this.status.set('playing');
  }

  pause(): void {
    if (this.status() === 'playing') this.status.set('paused');
  }

  resume(): void {
    if (this.status() === 'paused') this.status.set('playing');
  }

  endRun(): void {
    this.status.set('over');
  }

  toMenu(): void {
    this.status.set('menu');
  }

  toMap(): void {
    this.status.set('map');
  }

  push(kind: RoadEvent['kind'], text: string, delta?: number): void {
    const event: RoadEvent = { id: ++this.eventId, kind, text, delta };
    this.events.update((list) => [event, ...list].slice(0, 4));
    // Each notice clears itself; the HUD only ever shows the last few seconds.
    setTimeout(() => {
      this.events.update((list) => list.filter((e) => e.id !== event.id));
    }, 1800);
  }

  private progressOf(o: Objective): number {
    switch (o.kind) {
      case 'distance':
        return this.distance();
      case 'nearMiss':
        return this.nearMisses();
      case 'coins':
        return this.coins();
      case 'clean':
        return Math.max(this.bestClean(), this.cleanStreak());
      case 'speed':
        return this.topSpeed();
    }
  }

  private isMet(o: Objective): boolean {
    return this.progressOf(o) >= o.target;
  }
}
