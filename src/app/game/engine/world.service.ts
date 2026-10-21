import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { LANE_COUNT, LANE_WIDTH } from '../model/game.types';
import { billboardTexture, buildingTexture, roadTexture } from './textures';

const ROAD_WIDTH = LANE_COUNT * LANE_WIDTH;
// Close enough that a car spawned now is on you in a few seconds, far enough to be in the fog.
const SPAWN_Z = -170;
const DESPAWN_Z = 30;

interface Scenery {
  group: THREE.Group;
  length: number;
}

/**
 * The road and everything standing beside it.
 *
 * The player never moves: the world slides toward the camera at the player's speed and
 * anything that goes past is put back at the far end with a new face. Forty buildings, a
 * few dozen palms and a handful of lamp posts are enough to drive forever.
 */
@Injectable({ providedIn: 'root' })
export class WorldService {
  readonly scene = new THREE.Scene();
  readonly sun = new THREE.DirectionalLight(0xffffff, 2.2);
  readonly sky = new THREE.HemisphereLight(0xbfdfff, 0x7a6a50, 1.2);

  private road!: THREE.Mesh;
  private roadTex!: THREE.Texture;
  private readonly scenery: Scenery[] = [];
  private readonly lamps: THREE.MeshStandardMaterial[] = [];
  private bridges: THREE.Group[] = [];
  private built = false;

  readonly dayColor = new THREE.Color(0x9ec9ff);
  readonly duskColor = new THREE.Color(0xf29a63);
  readonly nightColor = new THREE.Color(0x0a0f24);

  build(): void {
    if (this.built) return;
    this.built = true;

    this.scene.fog = new THREE.Fog(0x9ec9ff, 70, 210);
    this.scene.background = this.dayColor.clone();

    this.sun.position.set(30, 60, -20);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(1024, 1024);
    this.sun.shadow.camera.left = -30;
    this.sun.shadow.camera.right = 30;
    this.sun.shadow.camera.top = 40;
    this.sun.shadow.camera.bottom = -40;
    this.sun.shadow.camera.far = 160;
    this.scene.add(this.sun, this.sky);

    // The road, and the sand it was laid on.
    this.roadTex = roadTexture(LANE_COUNT);
    this.roadTex.repeat.set(1, 40);
    this.road = new THREE.Mesh(
      new THREE.PlaneGeometry(ROAD_WIDTH + 0.6, 600),
      new THREE.MeshStandardMaterial({ map: this.roadTex, roughness: 0.95 }),
    );
    this.road.rotation.x = -Math.PI / 2;
    this.road.position.set(0, 0, -200);
    this.road.receiveShadow = true;
    this.scene.add(this.road);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 700),
      new THREE.MeshStandardMaterial({ color: 0xcdb98a, roughness: 1 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.05, -200);
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Kerbs.
    for (const side of [-1, 1]) {
      const kerb = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.25, 600),
        new THREE.MeshStandardMaterial({ color: 0xd9d9d9 }),
      );
      kerb.position.set(side * (ROAD_WIDTH / 2 + 0.55), 0.12, -200);
      this.scene.add(kerb);
    }

    let z = -20;
    for (let i = 0; i < 44; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const item = this.makeScenery(side);
      item.group.position.z = z;
      this.scene.add(item.group);
      this.scenery.push(item);
      if (i % 2 === 1) z -= 12;
    }

    for (let i = 0; i < 2; i++) {
      const bridge = this.makeBridge();
      bridge.position.z = -200 - i * 400;
      this.scene.add(bridge);
      this.bridges.push(bridge);
    }
  }

  /** Moves everything by `metres` toward the camera and recycles what has passed. */
  advance(metres: number): void {
    this.roadTex.offset.y -= metres / 15;

    for (const item of this.scenery) {
      item.group.position.z += metres;
      if (item.group.position.z > DESPAWN_Z) {
        const side = Math.sign(item.group.position.x) || 1;
        const fresh = this.makeScenery(side);
        fresh.group.position.z = this.farthestZ() - 12;
        this.scene.remove(item.group);
        this.dispose(item.group);
        item.group = fresh.group;
        item.length = fresh.length;
        this.scene.add(fresh.group);
      }
    }

    for (const bridge of this.bridges) {
      bridge.position.z += metres;
      if (bridge.position.z > DESPAWN_Z) bridge.position.z -= 800;
    }
  }

  /** Paints the sky for a time of day, 0 = noon, 0.5 = midnight. */
  setDayPhase(phase: number): void {
    const target = new THREE.Color();
    // noon → dusk → night → dawn → noon
    const t = phase % 1;
    if (t < 0.25) target.lerpColors(this.dayColor, this.duskColor, t / 0.25);
    else if (t < 0.4) target.lerpColors(this.duskColor, this.nightColor, (t - 0.25) / 0.15);
    else if (t < 0.65) target.copy(this.nightColor);
    else if (t < 0.8) target.lerpColors(this.nightColor, this.duskColor, (t - 0.65) / 0.15);
    else target.lerpColors(this.duskColor, this.dayColor, (t - 0.8) / 0.2);

    (this.scene.background as THREE.Color).copy(target);
    this.scene.fog!.color.copy(target);

    const night = t > 0.32 && t < 0.72 ? 1 : t > 0.22 && t < 0.82 ? 0.5 : 0;
    this.sun.intensity = 2.2 - night * 1.9;
    this.sky.intensity = 1.2 - night * 0.9;
    for (const lamp of this.lamps) lamp.emissiveIntensity = night > 0 ? 2.5 : 0;
  }

  private farthestZ(): number {
    return this.scenery.reduce((min, s) => Math.min(min, s.group.position.z), 0);
  }

  private makeScenery(side: number): Scenery {
    const group = new THREE.Group();
    const roll = Math.random();
    const x = side * (ROAD_WIDTH / 2 + 3);

    if (roll < 0.62) {
      // A building, most of the time. Cairo's are tall, close, and mostly unfinished.
      const floors = 3 + Math.floor(Math.random() * 7);
      const finished = Math.random() > 0.55;
      const w = 7 + Math.random() * 5;
      const d = 8 + Math.random() * 6;
      const h = floors * 3;
      const tex = buildingTexture(finished, floors);
      const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 });
      const plain = new THREE.MeshStandardMaterial({ color: finished ? 0xcdbd9c : 0x8f432a, roughness: 0.9 });
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [plain, mat, plain, plain, plain, mat]);
      b.position.set(x + side * (w / 2), h / 2, 0);
      b.castShadow = true;
      group.add(b);
      // Rooftop: a water tank, a dish, sometimes a half-built extra floor.
      const tank = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 1.2, 10),
        new THREE.MeshStandardMaterial({ color: 0x2b2b2b }),
      );
      tank.position.set(x + side * (w / 2) + (Math.random() - 0.5) * 2, h + 0.6, (Math.random() - 0.5) * 3);
      group.add(tank);
      if (!finished && Math.random() > 0.5) {
        const stub = new THREE.Mesh(new THREE.BoxGeometry(w * 0.9, 1.4, d * 0.9), plain);
        stub.position.set(x + side * (w / 2), h + 0.7, 0);
        group.add(stub);
      }
      // A lamp post in front of it.
      group.add(this.makeLamp(side * (ROAD_WIDTH / 2 + 1.2), -3));
      return { group, length: d };
    }

    if (roll < 0.82) {
      // Palms on a strip of sand.
      for (let i = 0; i < 3; i++) {
        group.add(this.makePalm(x + side * (1 + Math.random() * 6), -4 + i * 4));
      }
      return { group, length: 12 };
    }

    // A billboard, Cairo's second sky.
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.3, 9, 8),
      new THREE.MeshStandardMaterial({ color: 0x555555 }),
    );
    post.position.set(x + side * 2, 4.5, 0);
    group.add(post);
    const board = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 5),
      new THREE.MeshStandardMaterial({ map: billboardTexture(), roughness: 0.6 }),
    );
    board.position.set(x + side * 2, 11, 0);
    board.rotation.y = side < 0 ? Math.PI * 0.42 : -Math.PI * 0.42;
    group.add(board);
    const back = board.clone();
    back.rotation.y += Math.PI;
    group.add(back);
    return { group, length: 12 };
  }

  private makeLamp(x: number, z: number): THREE.Group {
    const g = new THREE.Group();
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.12, 7, 6),
      new THREE.MeshStandardMaterial({ color: 0x8a8f96 }),
    );
    pole.position.set(x, 3.5, z);
    g.add(pole);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xfff1c2, emissive: 0xffd36b, emissiveIntensity: 0 });
    this.lamps.push(headMat);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.2, 0.4), headMat);
    head.position.set(x - Math.sign(x) * 0.6, 7, z);
    g.add(head);
    return g;
  }

  private makePalm(x: number, z: number): THREE.Group {
    const g = new THREE.Group();
    const h = 5 + Math.random() * 4;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.3, h, 7),
      new THREE.MeshStandardMaterial({ color: 0x7a5a3a, roughness: 1 }),
    );
    trunk.position.set(x, h / 2, z);
    trunk.rotation.z = (Math.random() - 0.5) * 0.15;
    trunk.castShadow = true;
    g.add(trunk);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x2f7d3a, roughness: 0.9, side: THREE.DoubleSide });
    for (let i = 0; i < 7; i++) {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.5, 3.2, 4), leafMat);
      const a = (i / 7) * Math.PI * 2;
      leaf.position.set(x + Math.cos(a) * 1.1, h + 0.3, z + Math.sin(a) * 1.1);
      leaf.rotation.set(Math.sin(a) * 1.2, 0, -Math.cos(a) * 1.2);
      g.add(leaf);
    }
    return g;
  }

  private makeBridge(): THREE.Group {
    const g = new THREE.Group();
    const concrete = new THREE.MeshStandardMaterial({ color: 0xb8b2a8, roughness: 0.95 });
    const deck = new THREE.Mesh(new THREE.BoxGeometry(ROAD_WIDTH + 40, 1.4, 9), concrete);
    deck.position.set(0, 7.5, 0);
    deck.castShadow = true;
    g.add(deck);
    for (const sx of [-1, 1]) {
      const pier = new THREE.Mesh(new THREE.BoxGeometry(1.6, 7, 3), concrete);
      pier.position.set(sx * (ROAD_WIDTH / 2 + 2.4), 3.5, 0);
      g.add(pier);
    }
    const rail = new THREE.Mesh(new THREE.BoxGeometry(ROAD_WIDTH + 40, 1, 0.2), new THREE.MeshStandardMaterial({ color: 0x3f6fb5 }));
    rail.position.set(0, 8.7, -4.4);
    g.add(rail);
    return g;
  }

  private dispose(group: THREE.Object3D): void {
    group.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of mats) {
        const std = m as THREE.MeshStandardMaterial;
        std.map?.dispose();
        const i = this.lamps.indexOf(std);
        if (i >= 0) this.lamps.splice(i, 1);
        m.dispose();
      }
    });
  }

  get spawnZ(): number {
    return SPAWN_Z;
  }

  get despawnZ(): number {
    return DESPAWN_Z;
  }
}
