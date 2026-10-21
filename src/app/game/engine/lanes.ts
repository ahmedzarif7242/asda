import { LANE_WIDTH } from '../model/game.types';

/** World x of a lane's centre; lane 0 is the leftmost of `count`. */
export function laneX(lane: number, count: number): number {
  return (lane - (count - 1) / 2) * LANE_WIDTH;
}

export function clampLane(lane: number, count: number): number {
  return Math.max(0, Math.min(count - 1, lane));
}

export function randomLane(count: number): number {
  return Math.floor(Math.random() * count);
}

/** The lane an x sits in, or -1 off the asphalt. */
export function laneOf(x: number, count: number): number {
  const lane = Math.round(x / LANE_WIDTH + (count - 1) / 2);
  return lane < 0 || lane >= count ? -1 : lane;
}

/** km/h → metres per second. */
export function mps(kmh: number): number {
  return kmh / 3.6;
}

export function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function chance(p: number): boolean {
  return Math.random() < p;
}

export function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

/** Picks a key by weight from `{ key: weight }`. */
export function weighted<K extends string>(weights: Partial<Record<K, number>>): K {
  const entries = Object.entries(weights) as [K, number][];
  const total = entries.reduce((a, [, w]) => a + (w ?? 0), 0);
  let r = Math.random() * total;
  for (const [k, w] of entries) {
    r -= w ?? 0;
    if (r <= 0) return k;
  }
  return entries[entries.length - 1][0];
}
