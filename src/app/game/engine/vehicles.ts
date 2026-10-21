import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

import { CarSpec, TrafficKind } from '../model/game.types';

/**
 * Vehicles built from rounded boxes, cylinders and a little care.
 *
 * Nothing is loaded. A car is a rounded lower body, a rounded cabin set back on it, glass
 * with a dark tint, wheel arches cut by dark discs, tyres with a tread ring and spoked rims,
 * bumpers, mirrors, a grille, plates, and light bars front and back that the traffic logic
 * can switch on. The environment map the engine installs is what makes the paint look like
 * paint. Every vehicle carries a `brake` mesh and a `wheels` list the loop spins.
 */
export interface VehicleParts {
  group: THREE.Group;
  wheels: THREE.Mesh[];
  brake: THREE.Mesh;
  headlights: THREE.Mesh;
  width: number;
  length: number;
}

const tyreMat = new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.95 });
const rimMat = new THREE.MeshStandardMaterial({ color: 0xc9c9cc, metalness: 0.95, roughness: 0.25 });
const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x121c28, roughness: 0.08, metalness: 0.5, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.1 });
const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe6e6e6, metalness: 1, roughness: 0.12 });
const plasticMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1e, roughness: 0.75 });
const archMat = new THREE.MeshStandardMaterial({ color: 0x0b0b0d, roughness: 1 });
const brakeOff = new THREE.MeshStandardMaterial({ color: 0x6b0b0b, emissive: 0x000000, roughness: 0.3 });
const headOff = new THREE.MeshStandardMaterial({ color: 0xfff8e0, emissive: 0x000000, roughness: 0.2 });

function paint(color: number): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({ color, roughness: 0.3, metalness: 0.35, clearcoat: 0.9, clearcoatRoughness: 0.12, envMapIntensity: 0.9 });
}

function rounded(w: number, h: number, d: number, mat: THREE.Material, x = 0, y = 0, z = 0, radius = 0.12): THREE.Mesh {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(radius, w / 2, h / 2, d / 2)), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

function box(w: number, h: number, d: number, mat: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

/** A tyre with a tread ring, a spoked rim, and a dark arch behind it. */
function wheel(group: THREE.Group, x: number, y: number, z: number, radius = 0.34, width = 0.26): THREE.Mesh {
  const tyre = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 20), tyreMat);
  tyre.rotation.z = Math.PI / 2;
  tyre.position.set(x, y, z);
  tyre.castShadow = true;
  const tread = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.92, radius * 0.1, 6, 20), tyreMat);
  tread.rotation.y = Math.PI / 2;
  tyre.add(tread);
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.6, radius * 0.6, width + 0.02, 10), rimMat);
  tyre.add(rim);
  for (let i = 0; i < 5; i++) {
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(radius * 0.14, radius * 1.05, width + 0.04), rimMat);
    spoke.rotation.x = (i / 5) * Math.PI;
    tyre.add(spoke);
  }
  const arch = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.25, radius * 1.25, width * 0.6, 16, 1, false, 0, Math.PI), archMat);
  arch.rotation.z = Math.PI / 2;
  arch.rotation.y = Math.PI / 2;
  arch.position.set(x > 0 ? x - width * 0.3 : x + width * 0.3, y, z);
  group.add(arch, tyre);
  return tyre;
}

function lightBars(group: THREE.Group, width: number, length: number, y: number): { brake: THREE.Mesh; head: THREE.Mesh } {
  const brake = rounded(width * 0.82, 0.16, 0.08, brakeOff.clone(), 0, y, length / 2 + 0.02, 0.04);
  const head = rounded(width * 0.84, 0.18, 0.08, headOff.clone(), 0, y, -length / 2 - 0.02, 0.04);
  // Two lamps each end, so a lit bar reads as lamps and not a strip.
  for (const sx of [-1, 1]) {
    group.add(box(0.22, 0.1, 0.02, chromeMat, sx * width * 0.3, y, -length / 2 - 0.07));
    group.add(box(0.22, 0.08, 0.02, plasticMat, sx * width * 0.3, y, length / 2 + 0.07));
  }
  group.add(brake, head);
  return { brake, head };
}

function plates(group: THREE.Group, length: number, y: number): void {
  const mat = new THREE.MeshStandardMaterial({ color: 0xf4f0e0, roughness: 0.6 });
  group.add(box(0.36, 0.12, 0.02, mat, 0, y, length / 2 + 0.05), box(0.36, 0.12, 0.02, mat, 0, y, -length / 2 - 0.05));
}

export function buildCar(color: number, width = 1.7, length = 4.2, height = 1.3): VehicleParts {
  const group = new THREE.Group();
  const body = paint(color);
  // Lower body with a slight taper at the nose, cabin set back.
  group.add(rounded(width, height * 0.46, length, body, 0, height * 0.4, 0, 0.16));
  group.add(rounded(width * 0.88, height * 0.44, length * 0.5, body, 0, height * 0.78, 0.15, 0.2));
  // Bonnet and boot lines.
  group.add(box(width * 0.9, 0.01, 0.02, plasticMat, 0, height * 0.63, -length * 0.42));
  group.add(box(width * 0.9, 0.01, 0.02, plasticMat, 0, height * 0.63, length * 0.4));
  // Glass: front, rear, sides, dark.
  group.add(box(width * 0.82, height * 0.36, 0.04, glassMat, 0, height * 0.8, -length * 0.1));
  group.add(box(width * 0.8, height * 0.3, 0.04, glassMat, 0, height * 0.8, length * 0.4));
  group.add(box(0.03, height * 0.3, length * 0.44, glassMat, -width * 0.44, height * 0.82, 0.15));
  group.add(box(0.03, height * 0.3, length * 0.44, glassMat, width * 0.44, height * 0.82, 0.15));
  // Door seams.
  group.add(box(0.02, height * 0.42, 0.015, archMat, -width / 2 - 0.005, height * 0.4, 0.05));
  group.add(box(0.02, height * 0.42, 0.015, archMat, width / 2 + 0.005, height * 0.4, 0.05));
  // Bumpers, grille, mirrors, exhaust.
  group.add(rounded(width + 0.06, 0.2, 0.18, plasticMat, 0, height * 0.2, length / 2, 0.06));
  group.add(rounded(width + 0.06, 0.2, 0.18, plasticMat, 0, height * 0.2, -length / 2, 0.06));
  group.add(box(width * 0.5, 0.12, 0.03, chromeMat, 0, height * 0.32, -length / 2 - 0.08));
  group.add(box(width * 0.5, 0.14, 0.03, archMat, 0, height * 0.32, -length / 2 - 0.07));
  group.add(rounded(0.2, 0.1, 0.12, body, -width / 2 - 0.12, height * 0.7, -length * 0.1, 0.03));
  group.add(rounded(0.2, 0.1, 0.12, body, width / 2 + 0.12, height * 0.7, -length * 0.1, 0.03));
  const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8), chromeMat);
  exhaust.rotation.x = Math.PI / 2;
  exhaust.position.set(width * 0.3, 0.3, length / 2 + 0.08);
  group.add(exhaust);
  plates(group, length, height * 0.22);
  const wheels = [
    wheel(group, -width / 2, 0.34, -length * 0.32),
    wheel(group, width / 2, 0.34, -length * 0.32),
    wheel(group, -width / 2, 0.34, length * 0.32),
    wheel(group, width / 2, 0.34, length * 0.32),
  ];
  const { brake, head } = lightBars(group, width, length, height * 0.45);
  return { group, wheels, brake, headlights: head, width, length };
}

export function buildJeep(color: number): VehicleParts {
  const width = 1.95;
  const length = 4.7;
  const height = 1.9;
  const group = new THREE.Group();
  const body = paint(color);
  group.add(rounded(width, height * 0.5, length, body, 0, height * 0.45, 0, 0.12));
  group.add(rounded(width * 0.96, height * 0.42, length * 0.64, body, 0, height * 0.84, 0.2, 0.14));
  group.add(box(width * 0.9, height * 0.34, 0.04, glassMat, 0, height * 0.86, -length * 0.12));
  group.add(box(0.03, height * 0.28, length * 0.52, glassMat, -width * 0.48, height * 0.86, 0.2));
  group.add(box(0.03, height * 0.28, length * 0.52, glassMat, width * 0.48, height * 0.86, 0.2));
  group.add(rounded(width + 0.12, 0.3, 0.26, plasticMat, 0, height * 0.22, -length / 2, 0.05));
  group.add(rounded(width + 0.12, 0.26, 0.18, plasticMat, 0, height * 0.22, length / 2, 0.05));
  group.add(box(width * 0.9, 0.08, 0.08, chromeMat, 0, height * 0.22, -length / 2 - 0.16));
  group.add(rounded(width * 0.8, 0.1, length * 0.5, plasticMat, 0, height * 1.08, 0.2, 0.04));
  group.add(rounded(0.22, 0.12, 0.14, body, -width / 2 - 0.13, height * 0.76, -length * 0.1, 0.03));
  group.add(rounded(0.22, 0.12, 0.14, body, width / 2 + 0.13, height * 0.76, -length * 0.1, 0.03));
  const spare = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.26, 18), tyreMat);
  spare.rotation.x = Math.PI / 2;
  spare.position.set(0.5, height * 0.58, length / 2 + 0.16);
  group.add(spare);
  plates(group, length, height * 0.3);
  const wheels = [
    wheel(group, -width / 2, 0.42, -length * 0.32, 0.42, 0.3),
    wheel(group, width / 2, 0.42, -length * 0.32, 0.42, 0.3),
    wheel(group, -width / 2, 0.42, length * 0.32, 0.42, 0.3),
    wheel(group, width / 2, 0.42, length * 0.32, 0.42, 0.3),
  ];
  const { brake, head } = lightBars(group, width, length, height * 0.5);
  return { group, wheels, brake, headlights: head, width, length };
}

export function buildMicrobus(): VehicleParts {
  const width = 2;
  const length = 5;
  const height = 2.1;
  const group = new THREE.Group();
  const white = paint(0xf4f4f0);
  const stripe = new THREE.MeshStandardMaterial({ color: 0x1e5bb8, roughness: 0.5, metalness: 0.3 });
  group.add(rounded(width, height * 0.84, length, white, 0, height * 0.52, 0, 0.18));
  group.add(box(width + 0.02, 0.22, length - 0.3, stripe, 0, height * 0.45, 0));
  for (let i = -1.5; i <= 1.5; i += 1) group.add(box(width + 0.04, 0.5, 0.75, glassMat, 0, height * 0.72, i));
  group.add(box(width * 0.9, 0.62, 0.04, glassMat, 0, height * 0.72, -length / 2 + 0.05));
  group.add(box(width * 0.86, 0.5, 0.04, glassMat, 0, height * 0.72, length / 2 - 0.05));
  group.add(rounded(width + 0.06, 0.18, 0.16, plasticMat, 0, height * 0.14, -length / 2, 0.05));
  group.add(rounded(width + 0.06, 0.18, 0.16, plasticMat, 0, height * 0.14, length / 2, 0.05));
  group.add(rounded(0.24, 0.14, 0.14, white, -width / 2 - 0.14, height * 0.7, -length * 0.35, 0.03));
  group.add(rounded(0.24, 0.14, 0.14, white, width / 2 + 0.14, height * 0.7, -length * 0.35, 0.03));
  const rack = new THREE.MeshStandardMaterial({ color: 0x6b6b6b, metalness: 0.6, roughness: 0.4 });
  group.add(box(width * 0.9, 0.06, length * 0.7, rack, 0, height * 0.96, 0));
  group.add(rounded(width * 0.5, 0.35, length * 0.3, new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 1 }), 0, height * 1.16, 0.4, 0.05));
  plates(group, length, height * 0.2);
  const wheels = [
    wheel(group, -width / 2, 0.38, -length * 0.3, 0.38, 0.28),
    wheel(group, width / 2, 0.38, -length * 0.3, 0.38, 0.28),
    wheel(group, -width / 2, 0.38, length * 0.3, 0.38, 0.28),
    wheel(group, width / 2, 0.38, length * 0.3, 0.38, 0.28),
  ];
  const { brake, head } = lightBars(group, width, length, height * 0.3);
  return { group, wheels, brake, headlights: head, width, length };
}

export function buildTuktuk(): VehicleParts {
  const width = 1.3;
  const length = 2.6;
  const height = 1.7;
  const group = new THREE.Group();
  const yellow = paint(0xf5c518);
  const black = new THREE.MeshStandardMaterial({ color: 0x202020, roughness: 0.8 });
  group.add(rounded(width, 0.6, length * 0.9, yellow, 0, 0.55, 0.1, 0.14));
  // The nose cone over the front wheel.
  group.add(rounded(width * 0.6, 0.7, 0.9, yellow, 0, 0.75, -length * 0.38, 0.2));
  group.add(rounded(width * 0.9, 0.1, length * 0.9, black, 0, height - 0.05, 0.1, 0.04));
  for (const sx of [-1, 1]) {
    group.add(box(0.06, height - 0.6, 0.06, black, (sx * width) / 2 - sx * 0.08, height * 0.65, length * 0.4));
    group.add(box(0.06, height - 0.6, 0.06, black, (sx * width) / 2 - sx * 0.08, height * 0.65, -length * 0.2));
  }
  group.add(box(width * 0.85, 0.5, 0.04, glassMat, 0, 1.1, -length * 0.42));
  // The speaker on the roof. There is always a speaker on the roof.
  group.add(rounded(0.3, 0.25, 0.25, black, 0, height + 0.1, 0.2, 0.04));
  // A handlebar, and the seat.
  group.add(box(0.7, 0.04, 0.04, chromeMat, 0, 1.05, -length * 0.2));
  group.add(rounded(width * 0.8, 0.2, 0.7, new THREE.MeshStandardMaterial({ color: 0x5d2b1a, roughness: 0.9 }), 0, 0.95, length * 0.2, 0.06));
  const wheels = [
    wheel(group, 0, 0.28, -length * 0.42, 0.28, 0.16),
    wheel(group, -width / 2, 0.28, length * 0.3, 0.28, 0.16),
    wheel(group, width / 2, 0.28, length * 0.3, 0.28, 0.16),
  ];
  const { brake, head } = lightBars(group, width * 0.7, length * 0.9, 0.8);
  return { group, wheels, brake, headlights: head, width, length };
}

export function buildTruck(): VehicleParts {
  const width = 2.3;
  const length = 7;
  const height = 2.8;
  const group = new THREE.Group();
  const cabMat = paint(0x2f7a3e);
  const boxMat = new THREE.MeshStandardMaterial({ color: 0xbcbcb4, roughness: 0.8 });
  group.add(rounded(width, height * 0.56, 2, cabMat, 0, height * 0.42, -length / 2 + 1, 0.12));
  group.add(box(width * 0.9, 0.7, 0.04, glassMat, 0, height * 0.55, -length / 2 + 0.02));
  group.add(rounded(width, height * 0.86, length - 2.3, boxMat, 0, height * 0.55, 1.15, 0.05));
  group.add(box(width + 0.1, 0.3, 0.2, chromeMat, 0, height * 0.14, -length / 2));
  const rope = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
  for (let z = -1; z <= 3; z += 1.3) group.add(box(width + 0.06, 0.04, 0.04, rope, 0, height * 0.9, z));
  // Exhaust stack and mirrors.
  const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.6, 8), chromeMat);
  stack.position.set(width / 2 + 0.1, height * 0.7, -length / 2 + 2.1);
  group.add(stack);
  group.add(box(0.1, 0.4, 0.2, plasticMat, -width / 2 - 0.2, height * 0.6, -length / 2 + 0.3));
  group.add(box(0.1, 0.4, 0.2, plasticMat, width / 2 + 0.2, height * 0.6, -length / 2 + 0.3));
  const wheels = [
    wheel(group, -width / 2, 0.45, -length * 0.36, 0.45, 0.32),
    wheel(group, width / 2, 0.45, -length * 0.36, 0.45, 0.32),
    wheel(group, -width / 2, 0.45, length * 0.2, 0.45, 0.32),
    wheel(group, width / 2, 0.45, length * 0.2, 0.45, 0.32),
    wheel(group, -width / 2, 0.45, length * 0.36, 0.45, 0.32),
    wheel(group, width / 2, 0.45, length * 0.36, 0.45, 0.32),
  ];
  const { brake, head } = lightBars(group, width, length, height * 0.3);
  return { group, wheels, brake, headlights: head, width, length };
}

export function buildBus(): VehicleParts {
  const width = 2.5;
  const length = 11;
  const height = 3.3;
  const group = new THREE.Group();
  const white = paint(0xf7f7f2);
  const stripe = new THREE.MeshStandardMaterial({ color: [0xd32f2f, 0x1565c0, 0xf9a825][Math.floor(Math.random() * 3)], roughness: 0.4, metalness: 0.3 });
  group.add(rounded(width, height * 0.9, length, white, 0, height * 0.52, 0, 0.2));
  group.add(box(width + 0.02, 0.5, length - 0.4, stripe, 0, height * 0.35, 0));
  group.add(box(width + 0.04, height * 0.32, length * 0.86, glassMat, 0, height * 0.72, 0.3));
  group.add(box(width * 0.92, height * 0.5, 0.04, glassMat, 0, height * 0.68, -length / 2 + 0.03));
  group.add(box(width * 0.3, 0.3, 0.6, plasticMat, -width / 2 - 0.2, height * 0.7, -length / 2 + 0.6));
  group.add(box(width * 0.3, 0.3, 0.6, plasticMat, width / 2 + 0.2, height * 0.7, -length / 2 + 0.6));
  const wheels = [
    wheel(group, -width / 2, 0.5, -length * 0.34, 0.5, 0.34),
    wheel(group, width / 2, 0.5, -length * 0.34, 0.5, 0.34),
    wheel(group, -width / 2, 0.5, length * 0.3, 0.5, 0.34),
    wheel(group, width / 2, 0.5, length * 0.3, 0.5, 0.34),
  ];
  const { brake, head } = lightBars(group, width, length, height * 0.28);
  return { group, wheels, brake, headlights: head, width, length };
}

export function buildTractor(): VehicleParts {
  const width = 1.9;
  const length = 6.5;
  const height = 2.2;
  const group = new THREE.Group();
  const red = paint(0xc62828);
  const cane = new THREE.MeshStandardMaterial({ color: 0x8bc34a, roughness: 1 });
  group.add(rounded(width * 0.6, 0.9, 2.2, red, 0, 0.9, -length / 2 + 1.3, 0.1));
  group.add(rounded(0.5, 0.6, 0.5, plasticMat, 0, 1.75, -length / 2 + 1.6, 0.08));
  group.add(box(0.08, 0.9, 0.08, plasticMat, 0.35, 1.6, -length / 2 + 0.8));
  const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 8), plasticMat);
  stack.position.set(-0.3, 1.8, -length / 2 + 0.8);
  group.add(stack);
  group.add(rounded(width, 0.6, 3.6, new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 1 }), 0, 0.8, 1.2, 0.05));
  group.add(rounded(width * 1.1, 1.4, 3.4, cane, 0, 1.7, 1.2, 0.3));
  const wheels = [
    wheel(group, -width * 0.3, 0.3, -length / 2 + 0.5, 0.3, 0.2),
    wheel(group, width * 0.3, 0.3, -length / 2 + 0.5, 0.3, 0.2),
    wheel(group, -width * 0.38, 0.62, -length / 2 + 1.9, 0.62, 0.4),
    wheel(group, width * 0.38, 0.62, -length / 2 + 1.9, 0.62, 0.4),
    wheel(group, -width / 2, 0.4, 1.2, 0.4, 0.24),
    wheel(group, width / 2, 0.4, 1.2, 0.4, 0.24),
  ];
  const { brake, head } = lightBars(group, width * 0.6, length, 0.9);
  return { group, wheels, brake, headlights: head, width, length };
}

const CAR_COLOURS = [0xffffff, 0xc0c0c0, 0x2b2b2b, 0xb71c1c, 0x1a237e, 0x795548, 0xe0e0e0, 0x4e342e, 0x607d8b, 0xfbc02d, 0x111111, 0x8e0038];

export function buildTraffic(kind: TrafficKind): VehicleParts {
  switch (kind) {
    case 'microbus':
      return buildMicrobus();
    case 'tuktuk':
      return buildTuktuk();
    case 'truck':
      return buildTruck();
    case 'bus':
      return buildBus();
    case 'tractor':
      return buildTractor();
    case 'car':
    default:
      return buildCar(CAR_COLOURS[Math.floor(Math.random() * CAR_COLOURS.length)]);
  }
}

export function buildPlayer(spec: CarSpec): VehicleParts {
  if (spec.id === 'microbus') return buildMicrobus();
  if (spec.id === 'jeep') return buildJeep(spec.color);
  return buildCar(spec.color, spec.width, spec.length, spec.height);
}
