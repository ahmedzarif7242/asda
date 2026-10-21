import { LANE_COUNT, LANE_WIDTH } from '../model/game.types';

/** World x of a lane's centre; lane 0 is the leftmost. */
export function laneX(lane: number): number {
  return (lane - (LANE_COUNT - 1) / 2) * LANE_WIDTH;
}

export function clampLane(lane: number): number {
  return Math.max(0, Math.min(LANE_COUNT - 1, lane));
}

export function randomLane(): number {
  return Math.floor(Math.random() * LANE_COUNT);
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
