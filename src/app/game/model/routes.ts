import { HazardKind, TrafficKind } from './game.types';

/** What stands beside the road. */
export type Scenery = 'city' | 'desert' | 'sea' | 'fields' | 'coast' | 'giza';

export type Landmark = 'pyramids' | 'cairoTower' | 'mosque' | 'lighthouse' | 'canal' | 'windmills' | 'compound';

export type ObjectiveKind = 'distance' | 'nearMiss' | 'coins' | 'clean' | 'speed';

export interface Objective {
  kind: ObjectiveKind;
  target: number;
  text: string;
}

export interface RouteSpec {
  id: string;
  name: string;
  /** Where it is, as a line on the sign. */
  place: string;
  tagline: string;
  scenery: Scenery;
  landmarks: Landmark[];
  /** Colours, as hex numbers: the ground, the far haze, the lamp light. */
  ground: number;
  haze: number;
  /** 0 noon · 0.25 dusk · 0.5 midnight — where the day starts on this road. */
  startPhase: number;
  /** Relative weights of what drives here. */
  traffic: Partial<Record<TrafficKind, number>>;
  hazards: HazardKind[];
  /** Lanes open on this road: the Corniche is narrower than the Ring Road. */
  lanes: number;
  /** How tightly scenery is packed, 1 = the Ring Road. */
  density: number;
  /** Top speed factor: a city street is not a desert highway. */
  speed: number;
  /** Map pin, as longitude and latitude. */
  lon: number;
  lat: number;
  /** Stars needed on the route before it to open this one. */
  unlock: number;
  objectives: [Objective, Objective, Objective];
}

export const ROUTES: readonly RouteSpec[] = [
  {
    id: 'ring',
    name: 'الطريق الدائري',
    place: 'القاهرة الكبرى',
    tagline: 'كل مصر بتعدّي من هنا. وكل الميكروباصات كمان.',
    scenery: 'city',
    landmarks: ['cairoTower'],
    ground: 0xcdb98a,
    haze: 0x9ec9ff,
    startPhase: 0.04,
    traffic: { car: 5, microbus: 3, tuktuk: 1, truck: 1.5, bus: 0.5 },
    hazards: ['bump', 'pothole', 'radar', 'cones'],
    lanes: 4,
    density: 1,
    speed: 1,
    lon: 31.33,
    lat: 30.05,
    unlock: 0,
    objectives: [
      { kind: 'distance', target: 2000, text: 'كمّل ٢ كيلو' },
      { kind: 'nearMiss', target: 8, text: '٨ حرفنات' },
      { kind: 'clean', target: 1000, text: 'كيلو من غير خبطة' },
    ],
  },
  {
    id: 'mehwar',
    name: 'المحور',
    place: '٢٦ يوليو · ٦ أكتوبر',
    tagline: 'كباري فوق كباري، والناس كلها راجعة من الشغل.',
    scenery: 'city',
    landmarks: ['compound'],
    ground: 0xc9b58c,
    haze: 0xa9c4e0,
    startPhase: 0.2,
    traffic: { car: 6, microbus: 2, truck: 1, bus: 1 },
    hazards: ['radar', 'cones', 'pothole'],
    lanes: 4,
    density: 0.8,
    speed: 1.05,
    lon: 31.05,
    lat: 30.03,
    unlock: 1,
    objectives: [
      { kind: 'distance', target: 3000, text: 'كمّل ٣ كيلو' },
      { kind: 'speed', target: 150, text: 'وصّل ١٥٠ كم/س' },
      { kind: 'coins', target: 25, text: 'لم ٢٥ فكة' },
    ],
  },
  {
    id: 'haram',
    name: 'شارع الهرم',
    place: 'الجيزة',
    tagline: 'الأهرامات قدامك، وأتوبيس سياحة في كل حارة.',
    scenery: 'giza',
    landmarks: ['pyramids'],
    ground: 0xd8c08f,
    haze: 0xe8d5a8,
    startPhase: 0.12,
    traffic: { car: 4, microbus: 3, tuktuk: 2, bus: 2 },
    hazards: ['bump', 'pothole', 'cones'],
    lanes: 3,
    density: 1.1,
    speed: 0.85,
    lon: 31.15,
    lat: 29.99,
    unlock: 1,
    objectives: [
      { kind: 'distance', target: 2500, text: 'كمّل ٢.٥ كيلو' },
      { kind: 'nearMiss', target: 12, text: '١٢ حرفنة' },
      { kind: 'clean', target: 1500, text: 'كيلو ونص من غير خبطة' },
    ],
  },
  {
    id: 'desert',
    name: 'الطريق الصحراوي',
    place: 'القاهرة — إسكندرية',
    tagline: 'نقل تقيل، شبورة الفجر، وسرعة مفيش زيها.',
    scenery: 'desert',
    landmarks: ['windmills'],
    ground: 0xd9c49a,
    haze: 0xf1dfc0,
    startPhase: 0.9,
    traffic: { car: 4, truck: 4, bus: 1.5, microbus: 1 },
    hazards: ['radar', 'sand', 'cones'],
    lanes: 4,
    density: 0.35,
    speed: 1.2,
    lon: 30.4,
    lat: 30.55,
    unlock: 2,
    objectives: [
      { kind: 'distance', target: 5000, text: 'كمّل ٥ كيلو' },
      { kind: 'speed', target: 180, text: 'وصّل ١٨٠ كم/س' },
      { kind: 'clean', target: 3000, text: '٣ كيلو من غير خبطة' },
    ],
  },
  {
    id: 'corniche',
    name: 'كورنيش إسكندرية',
    place: 'من المنتزه للأنفوشي',
    tagline: 'البحر على يمينك، والناس كلها نازلة تتمشى.',
    scenery: 'sea',
    landmarks: ['lighthouse'],
    ground: 0xd6cbb0,
    haze: 0xbfe3ff,
    startPhase: 0.22,
    traffic: { car: 5, microbus: 2, tuktuk: 0.5, bus: 1 },
    hazards: ['bump', 'radar', 'pothole'],
    lanes: 3,
    density: 0.9,
    speed: 0.8,
    lon: 29.92,
    lat: 31.21,
    unlock: 2,
    objectives: [
      { kind: 'distance', target: 3000, text: 'كمّل ٣ كيلو' },
      { kind: 'coins', target: 30, text: 'لم ٣٠ فكة' },
      { kind: 'nearMiss', target: 10, text: '١٠ حرفنات' },
    ],
  },
  {
    id: 'sahel',
    name: 'طريق الساحل',
    place: 'العلمين — مارينا',
    tagline: 'كمبوندات على الشمال، رمل على اليمين، وجيب في كل عربية.',
    scenery: 'coast',
    landmarks: ['compound', 'windmills'],
    ground: 0xe5d6b0,
    haze: 0xd8ecff,
    startPhase: 0.02,
    traffic: { car: 6, bus: 1, truck: 1 },
    hazards: ['radar', 'sand'],
    lanes: 4,
    density: 0.5,
    speed: 1.15,
    lon: 28.8,
    lat: 30.95,
    unlock: 3,
    objectives: [
      { kind: 'distance', target: 6000, text: 'كمّل ٦ كيلو' },
      { kind: 'speed', target: 170, text: 'وصّل ١٧٠ كم/س' },
      { kind: 'clean', target: 4000, text: '٤ كيلو من غير خبطة' },
    ],
  },
  {
    id: 'saeed',
    name: 'الطريق الزراعي',
    place: 'الصعيد · المنيا — أسيوط',
    tagline: 'غيطان وقصب وترعة، وجرار بيطلع عليك من غير ما تحس.',
    scenery: 'fields',
    landmarks: ['canal', 'mosque'],
    ground: 0x7fa05a,
    haze: 0xd4e6c3,
    startPhase: 0.15,
    traffic: { car: 3, microbus: 3, tuktuk: 3, tractor: 2, truck: 1 },
    hazards: ['bump', 'pothole', 'cones'],
    lanes: 2,
    density: 1,
    speed: 0.75,
    lon: 30.9,
    lat: 27.6,
    unlock: 3,
    objectives: [
      { kind: 'distance', target: 3000, text: 'كمّل ٣ كيلو' },
      { kind: 'nearMiss', target: 15, text: '١٥ حرفنة' },
      { kind: 'clean', target: 2000, text: '٢ كيلو من غير خبطة' },
    ],
  },
];

export function routeById(id: string): RouteSpec {
  return ROUTES.find((r) => r.id === id) ?? ROUTES[0];
}
