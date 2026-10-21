/** The screens the game moves between. */
export type GameStatus = 'menu' | 'playing' | 'paused' | 'over';

/** مشوار: drive until the car is done. سابق الزمن: ninety seconds, make them count. */
export type GameMode = 'endless' | 'timed';

/** How much of Cairo is on the road with you. */
export type Difficulty = 'calm' | 'busy' | 'chaos';

export interface DifficultySpec {
  id: Difficulty;
  name: string;
  tagline: string;
  /** Vehicles spawned per second at full speed. */
  spawnRate: number;
  /** Player speed range, km/h. */
  minSpeed: number;
  maxSpeed: number;
  /** How often a microbus decides to do something microbus-like, per second. */
  microbusMood: number;
  /** Score multiplier shown on the menu. */
  multiplier: number;
}

export interface CarSpec {
  id: string;
  name: string;
  tagline: string;
  /** Body colour as a hex number for Three.js. */
  color: number;
  /** Width and length in world units (a lane is 3.2 wide). */
  width: number;
  length: number;
  height: number;
  /** Lane-change speed, lanes per second. */
  agility: number;
  /** How many hits it takes. */
  lives: number;
  /** Top-speed factor against the difficulty's max. */
  topSpeed: number;
}

/** Everything that drives beside you, or sits in the road waiting for you. */
export type TrafficKind = 'car' | 'microbus' | 'tuktuk' | 'truck';
export type HazardKind = 'bump' | 'pothole' | 'cones' | 'radar';
export type PickupKind = 'coin' | 'nitro';

/** One thing that happened on the road, for the HUD to flash. */
export interface RoadEvent {
  id: number;
  kind: 'nearMiss' | 'coin' | 'fine' | 'hit' | 'nitro' | 'bump' | 'level';
  text: string;
  delta?: number;
}

export interface RunSummary {
  mode: GameMode;
  difficulty: Difficulty;
  car: string;
  score: number;
  distance: number;
  coins: number;
  nearMisses: number;
  topSpeed: number;
  at: string;
}

export const DIFFICULTIES: readonly DifficultySpec[] = [
  {
    id: 'calm',
    name: 'هادي',
    tagline: 'الفجر، الطريق فاضي',
    spawnRate: 0.55,
    minSpeed: 50,
    maxSpeed: 130,
    microbusMood: 0.15,
    multiplier: 1,
  },
  {
    id: 'busy',
    name: 'زحمة',
    tagline: 'الساعة ٣ العصر على الدايري',
    spawnRate: 0.95,
    minSpeed: 60,
    maxSpeed: 160,
    microbusMood: 0.35,
    multiplier: 1.5,
  },
  {
    id: 'chaos',
    name: 'مدعكة',
    tagline: 'خميس آخر الشهر قبل العيد',
    spawnRate: 1.45,
    minSpeed: 70,
    maxSpeed: 190,
    microbusMood: 0.6,
    multiplier: 2.2,
  },
];

export const CARS: readonly CarSpec[] = [
  {
    id: 'fiat128',
    name: '١٢٨',
    tagline: 'أسطورة الشوارع. بتلف في أي خرم.',
    color: 0xf2f2f2,
    width: 1.5,
    length: 3.4,
    height: 1.25,
    agility: 3.4,
    lives: 3,
    topSpeed: 0.92,
  },
  {
    id: 'lancer',
    name: 'لانسر',
    tagline: 'بتطلع من عند الرادار وهو لسه بيفكر.',
    color: 0xc62828,
    width: 1.7,
    length: 4.4,
    height: 1.3,
    agility: 2.6,
    lives: 3,
    topSpeed: 1,
  },
  {
    id: 'microbus',
    name: 'ميكروباص',
    tagline: 'تقيل، بيستحمل، والكل بيعدّي له.',
    color: 0x1565c0,
    width: 2,
    length: 5,
    height: 2,
    agility: 1.9,
    lives: 4,
    topSpeed: 0.85,
  },
];

export const LANE_WIDTH = 3.2;
export const LANE_COUNT = 4;
export const TIMED_SECONDS = 90;
