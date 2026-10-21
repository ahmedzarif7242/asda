import * as THREE from 'three';

import { CarSpec, TrafficKind } from '../model/game.types';

/**
 * Low-poly vehicles built from boxes and cylinders.
 *
 * Nothing is loaded; a car is a dozen meshes. Every vehicle carries a `brake` light mesh the
 * traffic logic can switch on, and a `wheels` list the loop spins.
 */
export interface VehicleParts {
  group: THREE.Group;
  wheels: THREE.Mesh[];
  brake: THREE.Mesh;
  headlights: THREE.Mesh;
  width: number;
  length: number;
}

const wheelMat = new THREE.MeshStandardMaterial({ color: 0x15151a, roughness: 0.9 });
const rimMat = new THREE.MeshStandardMaterial({ color: 0xb8b8b8, metalness: 0.7, roughness: 0.35 });
const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x8ec5ff, roughness: 0.05, metalness: 0.1, transmission: 0, clearcoat: 1 });
const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdedede, metalness: 0.9, roughness: 0.2 });
const plasticMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
const brakeOff = new THREE.MeshStandardMaterial({ color: 0x5a0a0a, emissive: 0x000000 });
const headOff = new THREE.MeshStandardMaterial({ color: 0xfff6d5, emissive: 0x000000 });

function body(color: number): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({ color, roughness: 0.3, metalness: 0.35, clearcoat: 0.8, clearcoatRoughness: 0.15 });
}

function wheel(x: number, y: number, z: number, radius = 0.34): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.28, 14), wheelMat);
  m.rotation.z = Math.PI / 2;
  m.position.set(x, y, z);
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.58, radius * 0.58, 0.3, 8), rimMat);
  m.add(rim);
  m.castShadow = true;
  return m;
}

function box(w: number, h: number, d: number, mat: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

function lights(width: number, length: number, height: number): { brake: THREE.Mesh; head: THREE.Mesh } {
  const brake = box(width * 0.8, 0.14, 0.06, brakeOff.clone(), 0, height * 0.45, length / 2 + 0.02);
  const head = box(width * 0.8, 0.16, 0.06, headOff.clone(), 0, height * 0.42, -length / 2 - 0.02);
  return { brake, head };
}

function plate(width: number, length: number, y: number): THREE.Mesh[] {
  const mat = new THREE.MeshStandardMaterial({ color: 0xf4f0e0 });
  return [box(0.36, 0.12, 0.02, mat, 0, y, length / 2 + 0.04), box(0.36, 0.12, 0.02, mat, 0, y, -length / 2 - 0.04)];
}

export function buildCar(color: number, width = 1.7, length = 4.2, height = 1.3): VehicleParts {
  const group = new THREE.Group();
  const paint = body(color);
  group.add(box(width, height * 0.48, length, paint, 0, height * 0.36, 0));
  group.add(box(width * 0.86, height * 0.46, length * 0.5, paint, 0, height * 0.78, 0.1));
  // Windscreen and rear glass, side glass.
  group.add(box(width * 0.82, height * 0.36, 0.05, glassMat, 0, height * 0.8, -length * 0.26));
  group.add(box(width * 0.82, height * 0.3, 0.05, glassMat, 0, height * 0.8, length * 0.35));
  group.add(box(0.03, height * 0.3, length * 0.42, glassMat, -width * 0.44, height * 0.82, 0.1));
  group.add(box(0.03, height * 0.3, length * 0.42, glassMat, width * 0.44, height * 0.82, 0.1));
  // Bumpers, mirrors, grille.
  group.add(box(width + 0.04, 0.16, 0.12, plasticMat, 0, height * 0.2, length / 2));
  group.add(box(width + 0.04, 0.16, 0.12, plasticMat, 0, height * 0.2, -length / 2));
  group.add(box(width * 0.5, 0.1, 0.03, chromeMat, 0, height * 0.3, -length / 2 - 0.05));
  group.add(box(0.18, 0.1, 0.1, paint, -width / 2 - 0.1, height * 0.68, -length * 0.14));
  group.add(box(0.18, 0.1, 0.1, paint, width / 2 + 0.1, height * 0.68, -length * 0.14));
  plate(width, length, height * 0.22).forEach((p) => group.add(p));
  const wheels = [
    wheel(-width / 2, 0.34, -length * 0.32),
    wheel(width / 2, 0.34, -length * 0.32),
    wheel(-width / 2, 0.34, length * 0.32),
    wheel(width / 2, 0.34, length * 0.32),
  ];
  wheels.forEach((w) => group.add(w));
  const { brake, head } = lights(width, length, height);
  group.add(brake, head);
  return { group, wheels, brake, headlights: head, width, length };
}

export function buildJeep(color: number): VehicleParts {
  const width = 1.95;
  const length = 4.7;
  const height = 1.9;
  const group = new THREE.Group();
  const paint = body(color);
  group.add(box(width, height * 0.5, length, paint, 0, height * 0.42, 0));
  group.add(box(width * 0.95, height * 0.42, length * 0.62, paint, 0, height * 0.82, 0.2));
  group.add(box(width * 0.9, height * 0.34, 0.05, glassMat, 0, height * 0.84, -length * 0.1));
  group.add(box(0.03, height * 0.28, length * 0.5, glassMat, -width * 0.48, height * 0.84, 0.2));
  group.add(box(0.03, height * 0.28, length * 0.5, glassMat, width * 0.48, height * 0.84, 0.2));
  group.add(box(width + 0.1, 0.26, 0.2, plasticMat, 0, height * 0.22, -length / 2));
  group.add(box(width + 0.1, 0.22, 0.14, plasticMat, 0, height * 0.22, length / 2));
  // Roof rack and the spare on the back.
  group.add(box(width * 0.8, 0.1, length * 0.5, plasticMat, 0, height * 1.05, 0.2));
  const spare = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.24, 14), wheelMat);
  spare.rotation.x = Math.PI / 2;
  spare.position.set(0.5, height * 0.55, length / 2 + 0.14);
  group.add(spare);
  const wheels = [
    wheel(-width / 2, 0.42, -length * 0.32, 0.42),
    wheel(width / 2, 0.42, -length * 0.32, 0.42),
    wheel(-width / 2, 0.42, length * 0.32, 0.42),
    wheel(width / 2, 0.42, length * 0.32, 0.42),
  ];
  wheels.forEach((w) => group.add(w));
  const { brake, head } = lights(width, length, height * 0.7);
  group.add(brake, head);
  return { group, wheels, brake, headlights: head, width, length };
}

export function buildMicrobus(): VehicleParts {
  const width = 2;
  const length = 5;
  const height = 2.1;
  const group = new THREE.Group();
  const white = body(0xf4f4f0);
  const stripe = new THREE.MeshStandardMaterial({ color: 0x1e5bb8, roughness: 0.5 });
  group.add(box(width, height * 0.82, length, white, 0, height * 0.52, 0));
  group.add(box(width + 0.02, 0.22, length + 0.02, stripe, 0, height * 0.45, 0));
  // A row of side windows.
  for (let i = -1.5; i <= 1.5; i += 1) {
    group.add(box(width + 0.04, 0.5, 0.75, glassMat, 0, height * 0.72, i));
  }
  group.add(box(width * 0.9, 0.6, 0.05, glassMat, 0, height * 0.72, -length / 2));
  group.add(box(width + 0.04, 0.16, 0.12, plasticMat, 0, height * 0.14, -length / 2));
  group.add(box(width + 0.04, 0.16, 0.12, plasticMat, 0, height * 0.14, length / 2));
  // Roof rack: the microbus always carries something.
  const rack = new THREE.MeshStandardMaterial({ color: 0x6b6b6b, metalness: 0.5 });
  group.add(box(width * 0.9, 0.08, length * 0.7, rack, 0, height * 0.95, 0));
  group.add(box(width * 0.5, 0.35, length * 0.3, new THREE.MeshStandardMaterial({ color: 0x8d6e63 }), 0, height * 1.15, 0.4));
  const wheels = [
    wheel(-width / 2, 0.38, -length * 0.3, 0.38),
    wheel(width / 2, 0.38, -length * 0.3, 0.38),
    wheel(-width / 2, 0.38, length * 0.3, 0.38),
    wheel(width / 2, 0.38, length * 0.3, 0.38),
  ];
  wheels.forEach((w) => group.add(w));
  const { brake, head } = lights(width, length, height);
  group.add(brake, head);
  return { group, wheels, brake, headlights: head, width, length };
}

export function buildTuktuk(): VehicleParts {
  const width = 1.3;
  const length = 2.6;
  const height = 1.7;
  const group = new THREE.Group();
  const yellow = body(0xf5c518);
  const black = new THREE.MeshStandardMaterial({ color: 0x202020, roughness: 0.8 });
  group.add(box(width, 0.6, length * 0.9, yellow, 0, 0.55, 0.1));
  group.add(box(width * 0.9, 0.1, length * 0.9, black, 0, height - 0.05, 0.1));
  for (const sx of [-1, 1]) {
    group.add(box(0.06, height - 0.6, 0.06, black, (sx * width) / 2 - sx * 0.08, height * 0.65, length * 0.4));
    group.add(box(0.06, height - 0.6, 0.06, black, (sx * width) / 2 - sx * 0.08, height * 0.65, -length * 0.2));
  }
  group.add(box(width * 0.85, 0.5, 0.05, glassMat, 0, 1.1, -length * 0.42));
  // The speaker on the roof. There is always a speaker on the roof.
  group.add(box(0.3, 0.25, 0.25, black, 0, height + 0.1, 0.2));
  const wheels = [
    wheel(0, 0.28, -length * 0.42, 0.28),
    wheel(-width / 2, 0.28, length * 0.3, 0.28),
    wheel(width / 2, 0.28, length * 0.3, 0.28),
  ];
  wheels.forEach((w) => group.add(w));
  const { brake, head } = lights(width * 0.7, length * 0.9, height * 0.5);
  group.add(brake, head);
  return { group, wheels, brake, headlights: head, width, length };
}

export function buildTruck(): VehicleParts {
  const width = 2.3;
  const length = 7;
  const height = 2.8;
  const group = new THREE.Group();
  const cabMat = body(0x2f7a3e);
  const boxMat = new THREE.MeshStandardMaterial({ color: 0xbcbcb4, roughness: 0.7 });
  group.add(box(width, height * 0.55, 2, cabMat, 0, height * 0.42, -length / 2 + 1));
  group.add(box(width * 0.9, 0.7, 0.05, glassMat, 0, height * 0.55, -length / 2));
  group.add(box(width, height * 0.85, length - 2.3, boxMat, 0, height * 0.55, 1.15));
  group.add(box(width + 0.1, 0.3, 0.2, chromeMat, 0, height * 0.14, -length / 2));
  // Tarpaulin ropes.
  const rope = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
  for (let z = -1; z <= 3; z += 1.3) group.add(box(width + 0.06, 0.04, 0.04, rope, 0, height * 0.9, z));
  const wheels = [
    wheel(-width / 2, 0.45, -length * 0.36, 0.45),
    wheel(width / 2, 0.45, -length * 0.36, 0.45),
    wheel(-width / 2, 0.45, length * 0.2, 0.45),
    wheel(width / 2, 0.45, length * 0.2, 0.45),
    wheel(-width / 2, 0.45, length * 0.36, 0.45),
    wheel(width / 2, 0.45, length * 0.36, 0.45),
  ];
  wheels.forEach((w) => group.add(w));
  const { brake, head } = lights(width, length, height * 0.5);
  group.add(brake, head);
  return { group, wheels, brake, headlights: head, width, length };
}

/** A tourist coach: tall, white, a stripe, a wall of windows. */
export function buildBus(): VehicleParts {
  const width = 2.5;
  const length = 11;
  const height = 3.3;
  const group = new THREE.Group();
  const white = body(0xf7f7f2);
  const stripe = new THREE.MeshStandardMaterial({ color: [0xd32f2f, 0x1565c0, 0xf9a825][Math.floor(Math.random() * 3)] });
  group.add(box(width, height * 0.9, length, white, 0, height * 0.52, 0));
  group.add(box(width + 0.02, 0.5, length + 0.02, stripe, 0, height * 0.35, 0));
  group.add(box(width + 0.04, height * 0.32, length * 0.86, glassMat, 0, height * 0.72, 0.3));
  group.add(box(width * 0.92, height * 0.5, 0.05, glassMat, 0, height * 0.68, -length / 2));
  group.add(box(width * 0.3, 0.3, 0.6, plasticMat, -width / 2 - 0.2, height * 0.7, -length / 2 + 0.6));
  group.add(box(width * 0.3, 0.3, 0.6, plasticMat, width / 2 + 0.2, height * 0.7, -length / 2 + 0.6));
  const wheels = [
    wheel(-width / 2, 0.5, -length * 0.34, 0.5),
    wheel(width / 2, 0.5, -length * 0.34, 0.5),
    wheel(-width / 2, 0.5, length * 0.3, 0.5),
    wheel(width / 2, 0.5, length * 0.3, 0.5),
  ];
  wheels.forEach((w) => group.add(w));
  const { brake, head } = lights(width, length, height * 0.4);
  group.add(brake, head);
  return { group, wheels, brake, headlights: head, width, length };
}

/** A tractor with a trailer of cane. Slow, wide, and never in a hurry. */
export function buildTractor(): VehicleParts {
  const width = 1.9;
  const length = 6.5;
  const height = 2.2;
  const group = new THREE.Group();
  const red = body(0xc62828);
  const cane = new THREE.MeshStandardMaterial({ color: 0x8bc34a, roughness: 1 });
  group.add(box(width * 0.6, 0.9, 2.2, red, 0, 0.9, -length / 2 + 1.3));
  group.add(box(0.5, 0.6, 0.5, plasticMat, 0, 1.75, -length / 2 + 1.6));
  group.add(box(0.08, 0.9, 0.08, plasticMat, 0.35, 1.6, -length / 2 + 0.8));
  // Trailer piled with cane.
  group.add(box(width, 0.6, 3.6, new THREE.MeshStandardMaterial({ color: 0x5d4037 }), 0, 0.8, 1.2));
  group.add(box(width * 1.1, 1.4, 3.4, cane, 0, 1.7, 1.2));
  const wheels = [
    wheel(-width * 0.3, 0.3, -length / 2 + 0.5, 0.3),
    wheel(width * 0.3, 0.3, -length / 2 + 0.5, 0.3),
    wheel(-width * 0.38, 0.62, -length / 2 + 1.9, 0.62),
    wheel(width * 0.38, 0.62, -length / 2 + 1.9, 0.62),
    wheel(-width / 2, 0.4, 1.2, 0.4),
    wheel(width / 2, 0.4, 1.2, 0.4),
  ];
  wheels.forEach((w) => group.add(w));
  const { brake, head } = lights(width * 0.6, length, 0.9);
  group.add(brake, head);
  return { group, wheels, brake, headlights: head, width, length };
}

const CAR_COLOURS = [0xffffff, 0xc0c0c0, 0x2b2b2b, 0xb71c1c, 0x1a237e, 0x795548, 0xe0e0e0, 0x4e342e, 0x607d8b, 0xfbc02d];

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
