import { Injectable, computed, signal } from '@angular/core';

import { CARS } from '../model/game.types';
import { ROUTES } from '../model/routes';

const KEY = 'zahma.progress.v1';

interface Progress {
  /** Best star count per route. */
  stars: Record<string, number>;
  /** Coins banked across runs — the garage's currency. */
  bank: number;
  owned: string[];
}

const EMPTY: Progress = { stars: {}, bank: 0, owned: ['fiat128'] };

/**
 * What the player has earned, kept on the device.
 *
 * Routes open as stars are won on the routes before them, cars are bought with the coins
 * banked from every run. Nothing leaves the browser.
 */
@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly state = signal<Progress>(this.load());

  readonly bank = computed(() => this.state().bank);
  readonly owned = computed(() => this.state().owned);
  readonly totalStars = computed(() =>
    Object.values(this.state().stars).reduce((a, b) => a + b, 0),
  );

  stars(routeId: string): number {
    return this.state().stars[routeId] ?? 0;
  }

  /** A route opens once the one before it has given enough stars. */
  isUnlocked(routeId: string): boolean {
    const i = ROUTES.findIndex((r) => r.id === routeId);
    if (i <= 0) return true;
    return this.stars(ROUTES[i - 1].id) >= ROUTES[i].unlock;
  }

  owns(carId: string): boolean {
    return this.state().owned.includes(carId);
  }

  /** Records a run's stars and coins. Returns the stars newly won on the route. */
  finishRun(routeId: string, stars: number, coins: number): number {
    const before = this.stars(routeId);
    this.update((p) => ({
      ...p,
      bank: p.bank + coins,
      stars: { ...p.stars, [routeId]: Math.max(before, stars) },
    }));
    return Math.max(0, stars - before);
  }

  buy(carId: string): boolean {
    const car = CARS.find((c) => c.id === carId);
    if (!car || this.owns(carId) || this.bank() < car.price) return false;
    this.update((p) => ({ ...p, bank: p.bank - car.price, owned: [...p.owned, carId] }));
    return true;
  }

  private update(fn: (p: Progress) => Progress): void {
    const next = fn(this.state());
    this.state.set(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage blocked: progress lasts the session */
    }
  }

  private load(): Progress {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? { ...EMPTY, ...(JSON.parse(raw) as Progress) } : EMPTY;
    } catch {
      return EMPTY;
    }
  }
}
