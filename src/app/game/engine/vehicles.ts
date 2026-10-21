import * as THREE from 'three';

import { CarSpec, TrafficKind } from '../model/game.types';

/**
 * Low-poly vehicles built from boxes and cylinders.
 *
 * Nothing is loaded; a car is six meshes. Every vehicle carries a `brake` light mesh the
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

const wheelGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.26, 12);
const wheelMat = new THREE.MeshStandardMaterial({ color: 0x15151a, roughness: 0.9 });
const rimMat = new THREE.MeshStandardMaterial({ color: 0xa8a8a8, metalness: 0.6, roughness: 0.4 });
const glassMat = new THREE.MeshStandardMaterial({ color: 0x9fd3ff, roughness: 0.1, metalness: 0.2 });
const brakeOff = new THREE.MeshStandardMaterial({ color: 0x5a0a0a, emissive: 0x000000 });
const headOff = new THREE.MeshStandardMaterial({ color: 0xfff6d5, emissive: 0x000000 });

function wheel(x: number, y: number, z: number, radius = 0.34): THREE.Mesh {
  const geo = radius === 0.34 ? wheelGeo : new THREE.CylinderGeometry(radius, radius, 0.3, 12);
  const m = new THREE.Mesh(geo, wheelMat);
  m.rotation.z = Math.PI / 2;
  m.position.set(x, y, z);
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, 0.28, 8), rimMat);
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

export function buildCar(color: number, width = 1.7, length = 4.2, height = 1.3): VehicleParts {
  const group = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.25 });
  group.add(box(width, height * 0.5, length, body, 0, height * 0.35, 0));
  group.add(box(width * 0.86, height * 0.45, length * 0.5, body, 0, height * 0.78, 0.1));
  // Windscreen and rear glass.
  group.add(box(width * 0.8, height * 0.35, 0.05, glassMat, 0, height * 0.8, -length * 0.25));
  group.add(box(width * 0.8, height * 0.3, 0.05, glassMat, 0, height * 0.8, length * 0.35));
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

export function buildMicrobus(): VehicleParts {
  const width = 2;
  const length = 5;
  const height = 2.1;
  const group = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xf4f4f0, roughness: 0.5 });
  const stripe = new THREE.MeshStandardMaterial({ color: 0x1e5bb8, roughness: 0.5 });
  group.add(box(width, height * 0.82, length, white, 0, height * 0.52, 0));
  group.add(box(width + 0.02, 0.22, length + 0.02, stripe, 0, height * 0.45, 0));
  // A row of side windows.
  for (let i = -1.5; i <= 1.5; i += 1) {
    group.add(box(width + 0.04, 0.5, 0.75, glassMat, 0, height * 0.72, i));
  }
  group.add(box(width * 0.9, 0.6, 0.05, glassMat, 0, height * 0.72, -length / 2));
  // Roof rack: the microbus always carries something.
  const rack = new THREE.MeshStandardMaterial({ color: 0x6b6b6b, metalness: 0.5 });
  group.add(box(width * 0.9, 0.08, length * 0.7, rack, 0, height * 0.95, 0));
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
  const yellow = new THREE.MeshStandardMaterial({ color: 0xf5c518, roughness: 0.5 });
  const black = new THREE.MeshStandardMaterial({ color: 0x202020, roughness: 0.8 });
  group.add(box(width, 0.6, length * 0.9, yellow, 0, 0.55, 0.1));
  group.add(box(width * 0.9, 0.1, length * 0.9, black, 0, height - 0.05, 0.1));
  // Canopy posts.
  for (const sx of [-1, 1]) {
    group.add(box(0.06, height - 0.6, 0.06, black, (sx * width) / 2 - sx * 0.08, height * 0.65, length * 0.4));
    group.add(box(0.06, height - 0.6, 0.06, black, (sx * width) / 2 - sx * 0.08, height * 0.65, -length * 0.2));
  }
  group.add(box(width * 0.85, 0.5, 0.05, glassMat, 0, 1.1, -length * 0.42));
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
  const cabMat = new THREE.MeshStandardMaterial({ color: 0x2f7a3e, roughness: 0.5 });
  const boxMat = new THREE.MeshStandardMaterial({ color: 0xbcbcb4, roughness: 0.7 });
  group.add(box(width, height * 0.55, 2, cabMat, 0, height * 0.42, -length / 2 + 1));
  group.add(box(width * 0.9, 0.7, 0.05, glassMat, 0, height * 0.55, -length / 2));
  group.add(box(width, height * 0.85, length - 2.3, boxMat, 0, height * 0.55, 1.15));
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

const CAR_COLOURS = [0xffffff, 0xc0c0c0, 0x2b2b2b, 0xb71c1c, 0x1a237e, 0x795548, 0xe0e0e0, 0x4e342e, 0x607d8b];

export function buildTraffic(kind: TrafficKind): VehicleParts {
  switch (kind) {
    case 'microbus':
      return buildMicrobus();
    case 'tuktuk':
      return buildTuktuk();
    case 'truck':
      return buildTruck();
    case 'car':
    default:
      return buildCar(CAR_COLOURS[Math.floor(Math.random() * CAR_COLOURS.length)]);
  }
}

export function buildPlayer(spec: CarSpec): VehicleParts {
  if (spec.id === 'microbus') return buildMicrobus();
  return buildCar(spec.color, spec.width, spec.length, spec.height);
}
