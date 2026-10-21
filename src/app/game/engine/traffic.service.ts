import { Injectable, inject } from '@angular/core';
import * as THREE from 'three';

import { DifficultySpec, HazardKind, LANE_COUNT, LANE_WIDTH, PickupKind, TrafficKind } from '../model/game.types';
import { chance, clampLane, laneX, mps, rand, randomLane } from './lanes';
import { signTexture } from './textures';
import { buildTraffic, VehicleParts } from './vehicles';
import { WorldService } from './world.service';

interface Entity {
  kind: TrafficKind;
  parts: VehicleParts;
  lane: number;
  targetLane: number;
  x: number;
  z: number;
  prevZ: number;
  /** km/h */
  speed: number;
  cruise: number;
  moodTimer: number;
  braking: number;
  shoved: number;
  hit: boolean;
  passed: boolean;
}

interface Hazard {
  kind: HazardKind;
  group: THREE.Group;
  lanes: number[];
  z: number;
  prevZ: number;
  length: number;
  width: number;
  done: boolean;
}

interface Pickup {
  kind: PickupKind;
  mesh: THREE.Mesh;
  lane: number;
  z: number;
  taken: boolean;
}

/** What the player's car looks like to the traffic, this frame. */
export interface PlayerShape {
  x: number;
  width: number;
  length: number;
  /** km/h */
  speed: number;
  invulnerable: boolean;
}

/** Everything the road did to the player this frame. */
export interface TrafficOutcome {
  hits: number;
  nearMisses: number;
  coins: number;
  nitroCans: number;
  fines: number;
  bumps: number;
  potholes: number;
  /** The speed limit the radar that just fined you was set to. */
  radarLimit: number;
}

const RADAR_LIMIT = 80;

/**
 * The traffic, the hazards and the coins — spawned ahead, slid past, recycled behind.
 *
 * Every vehicle has a cruising speed and a mood. The microbus is the one with a mood: it
 * changes lanes without looking and stops dead to pick someone up, which is the thing that
 * makes the road feel like the road. Everything else mostly holds its lane.
 */
@Injectable({ providedIn: 'root' })
export class TrafficService {
  private readonly world = inject(WorldService);

  private entities: Entity[] = [];
  private hazards: Hazard[] = [];
  private pickups: Pickup[] = [];
  private spawnAcc = 0;
  private hazardAcc = 0;
  private pickupAcc = 0;
  private difficulty!: DifficultySpec;
  private levelBoost = 1;

  private readonly coinGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.12, 14);
  private readonly coinMat = new THREE.MeshStandardMaterial({ color: 0xffc83d, metalness: 0.8, roughness: 0.25, emissive: 0x6b4a00, emissiveIntensity: 0.4 });
  private readonly canGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.9, 10);
  private readonly canMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00bcd4, emissiveIntensity: 0.8 });

  reset(difficulty: DifficultySpec): void {
    this.difficulty = difficulty;
    this.levelBoost = 1;
    for (const e of this.entities) this.world.scene.remove(e.parts.group);
    for (const h of this.hazards) this.world.scene.remove(h.group);
    for (const p of this.pickups) this.world.scene.remove(p.mesh);
    this.entities = [];
    this.hazards = [];
    this.pickups = [];
    this.spawnAcc = 0;
    this.hazardAcc = -4; // a clean first few seconds
    this.pickupAcc = 0;

    // The road is never empty when you join it: a few cars already out there, spread ahead.
    for (let i = 0; i < 7; i++) this.spawnVehicle(-50 - i * 18);
  }

  setLevel(level: number): void {
    this.levelBoost = 1 + (level - 1) * 0.12;
  }

  update(dt: number, player: PlayerShape, night: boolean): TrafficOutcome {
    const out: TrafficOutcome = { hits: 0, nearMisses: 0, coins: 0, nitroCans: 0, fines: 0, bumps: 0, potholes: 0, radarLimit: RADAR_LIMIT };
    const speedFactor = 0.35 + player.speed / this.difficulty.maxSpeed;

    this.spawnAcc += this.difficulty.spawnRate * this.levelBoost * speedFactor * dt;
    while (this.spawnAcc >= 1) {
      this.spawnAcc -= 1;
      this.spawnVehicle();
    }
    this.hazardAcc += speedFactor * dt;
    if (this.hazardAcc > rand(5, 9)) {
      this.hazardAcc = 0;
      this.spawnHazard();
    }
    this.pickupAcc += speedFactor * dt;
    if (this.pickupAcc > 3.5) {
      this.pickupAcc = 0;
      this.spawnPickups();
    }

    const playerMps = mps(player.speed);
    const halfW = player.width / 2;
    const halfL = player.length / 2;

    for (const e of this.entities) {
      this.drive(e, dt, player.speed);
      e.prevZ = e.z;
      e.z += (playerMps - mps(e.speed)) * dt;
      e.parts.group.position.set(e.x, 0, e.z);
      for (const w of e.parts.wheels) w.rotation.x += mps(e.speed) * dt / 0.34;
      this.setLights(e.parts, e.braking > 0 || e.speed < e.cruise * 0.7, night);

      const dx = Math.abs(e.x - player.x);
      const dz = Math.abs(e.z);
      const overlapX = dx < (e.parts.width / 2 + halfW) * 0.88;
      const overlapZ = dz < (e.parts.length / 2 + halfL) * 0.9;

      if (overlapX && overlapZ && !e.hit) {
        e.hit = true;
        if (!player.invulnerable) out.hits++;
        // Shoved forward, so the car is not sitting inside the player's next frame too.
        e.shoved = 2;
        e.speed = Math.max(e.speed, player.speed) + 25;
      } else if (!e.passed && !e.hit && dx < e.parts.width / 2 + halfW + 1.1 && this.crossed(e.prevZ, e.z)) {
        e.passed = true;
        out.nearMisses++;
      }
    }

    for (const h of this.hazards) {
      h.prevZ = h.z;
      h.z += playerMps * dt;
      h.group.position.z = h.z;
      if (h.done) continue;

      const inLane = h.lanes.some((l) => Math.abs(laneX(l) - player.x) < LANE_WIDTH * 0.55);

      if (h.kind === 'cones') {
        const dx = h.lanes.reduce((m, l) => Math.min(m, Math.abs(laneX(l) - player.x)), 99);
        if (dx < LANE_WIDTH / 2 + halfW * 0.9 && Math.abs(h.z) < h.length / 2 + halfL * 0.9) {
          h.done = true;
          if (!player.invulnerable) out.hits++;
        }
        continue;
      }

      if (!this.crossed(h.prevZ, h.z)) continue;
      h.done = true;
      if (h.kind === 'radar') {
        if (player.speed > RADAR_LIMIT) out.fines++;
      } else if (h.kind === 'bump') {
        if (player.speed > 60) out.bumps++;
      } else if (h.kind === 'pothole' && inLane) {
        out.potholes++;
      }
    }

    for (const p of this.pickups) {
      p.z += playerMps * dt;
      p.mesh.position.z = p.z;
      p.mesh.rotation.y += dt * 4;
      if (p.taken) continue;
      if (Math.abs(p.z) < 1.6 && Math.abs(laneX(p.lane) - player.x) < LANE_WIDTH * 0.6) {
        p.taken = true;
        p.mesh.visible = false;
        if (p.kind === 'coin') out.coins++;
        else out.nitroCans++;
      }
    }

    this.recycle();
    return out;
  }

  /** The traffic ahead in a lane, nearest first — the player's car reads this for the HUD. */
  nearestAhead(lane: number): number {
    let best = Infinity;
    const x = laneX(lane);
    for (const e of this.entities) {
      if (e.z < 0 && Math.abs(e.x - x) < LANE_WIDTH * 0.6) best = Math.min(best, -e.z);
    }
    return best;
  }

  private crossed(prevZ: number, z: number): boolean {
    return (prevZ < 0 && z >= 0) || (prevZ > 0 && z <= 0);
  }

  private drive(e: Entity, dt: number, playerSpeed: number): void {
    // Lane changes.
    const tx = laneX(e.targetLane);
    if (Math.abs(e.x - tx) > 0.02) {
      const step = Math.sign(tx - e.x) * LANE_WIDTH * 1.6 * dt;
      e.x = Math.abs(step) > Math.abs(tx - e.x) ? tx : e.x + step;
      e.parts.group.rotation.y = -Math.sign(tx - e.x) * 0.06;
    } else {
      e.lane = e.targetLane;
      e.parts.group.rotation.y = 0;
    }

    // Avoid the cones everyone else has to avoid too.
    for (const h of this.hazards) {
      if (h.kind !== 'cones' || h.done) continue;
      const ahead = h.z - e.z;
      if (ahead < -45 || ahead > -4) continue;
      if (h.lanes.includes(e.targetLane)) {
        const options = [e.targetLane - 1, e.targetLane + 1].filter((l) => l >= 0 && l < LANE_COUNT && !h.lanes.includes(l));
        if (options.length) e.targetLane = options[Math.floor(Math.random() * options.length)];
      }
    }

    // Don't drive into the vehicle ahead: match its speed.
    for (const other of this.entities) {
      if (other === e || Math.abs(other.x - e.x) > LANE_WIDTH * 0.7) continue;
      const gap = e.z - other.z;
      if (gap > 0 && gap < other.parts.length / 2 + e.parts.length / 2 + 6 && other.speed < e.speed) {
        e.speed = other.speed;
      }
    }

    if (e.shoved > 0) {
      e.shoved -= dt;
      return;
    }
    if (e.braking > 0) {
      e.braking -= dt;
      e.speed = Math.max(8, e.speed - 90 * dt);
      return;
    }
    // Ease back to cruising speed after a brake or a shove.
    e.speed += (e.cruise - e.speed) * Math.min(1, dt * 0.8);

    e.moodTimer -= dt;
    if (e.moodTimer > 0) return;
    e.moodTimer = rand(1.5, 4);
    const mood = e.kind === 'microbus' ? this.difficulty.microbusMood : e.kind === 'car' ? 0.08 : 0.03;
    if (!chance(mood)) return;
    if (e.kind === 'microbus' && chance(0.45)) {
      e.braking = rand(0.8, 1.6); // "بيلم زبون"
    } else {
      e.targetLane = clampLane(e.lane + (chance(0.5) ? -1 : 1));
    }
    void playerSpeed;
  }

  private setLights(parts: VehicleParts, braking: boolean, night: boolean): void {
    const brake = parts.brake.material as THREE.MeshStandardMaterial;
    brake.emissive.setHex(braking ? 0xff1a1a : night ? 0x660000 : 0x000000);
    brake.emissiveIntensity = braking ? 2.5 : 1;
    const head = parts.headlights.material as THREE.MeshStandardMaterial;
    head.emissive.setHex(night ? 0xfff0b0 : 0x000000);
    head.emissiveIntensity = 2;
  }

  private spawnVehicle(atZ?: number): void {
    const roll = Math.random();
    const chaos = this.difficulty.id === 'chaos';
    const kind: TrafficKind =
      roll < (chaos ? 0.36 : 0.5) ? 'car' : roll < (chaos ? 0.68 : 0.75) ? 'microbus' : roll < 0.9 ? 'tuktuk' : 'truck';

    const lane = randomLane();
    const z = atZ ?? this.world.spawnZ + rand(-30, 0);
    const blocked = this.entities.some((e) => Math.abs(e.x - laneX(lane)) < LANE_WIDTH * 0.7 && Math.abs(e.z - z) < 16);
    if (blocked) return;

    // Everything cruises below the player's comfortable speed, so the road comes to you;
    // the microbus is the one thing that can be faster, which is how it ends up beside you.
    const top = this.difficulty.maxSpeed;
    const cruise =
      kind === 'tuktuk' ? rand(20, 38) :
      kind === 'truck' ? rand(top * 0.25, top * 0.4) :
      kind === 'microbus' ? rand(top * 0.3, top * 0.75) :
      rand(top * 0.3, top * 0.55);
    const parts = buildTraffic(kind);
    parts.group.position.set(laneX(lane), 0, z);
    this.world.scene.add(parts.group);
    this.entities.push({
      kind, parts, lane, targetLane: lane, x: laneX(lane), z, prevZ: z,
      speed: cruise, cruise, moodTimer: rand(1, 3), braking: 0, shoved: 0, hit: false, passed: false,
    });
  }

  private spawnHazard(): void {
    const roll = Math.random();
    const kind: HazardKind = roll < 0.3 ? 'bump' : roll < 0.5 ? 'pothole' : roll < 0.75 ? 'radar' : 'cones';
    const z = this.world.spawnZ - 20;
    const group = new THREE.Group();
    let lanes: number[] = [];
    let length = 1;
    let width = LANE_COUNT * LANE_WIDTH;

    if (kind === 'bump') {
      const bump = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.22, 1.1),
        new THREE.MeshStandardMaterial({ color: 0x3c3c3c, roughness: 1 }),
      );
      bump.position.y = 0.1;
      group.add(bump);
      for (let x = -width / 2 + 0.6; x < width / 2; x += 1.2) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.24, 1.12), new THREE.MeshStandardMaterial({ color: 0xf2c200 }));
        stripe.position.set(x, 0.1, 0);
        group.add(stripe);
      }
      lanes = [0, 1, 2, 3];
      group.add(this.sign('مطب', '#f2c200', '#1b1b1b', -28));
    } else if (kind === 'pothole') {
      const lane = randomLane();
      lanes = [lane];
      const hole = new THREE.Mesh(
        new THREE.CircleGeometry(0.9, 16),
        new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 1 }),
      );
      hole.rotation.x = -Math.PI / 2;
      hole.position.set(laneX(lane), 0.02, 0);
      group.add(hole);
      width = LANE_WIDTH;
    } else if (kind === 'radar') {
      group.add(this.sign(`رادار ${RADAR_LIMIT}`, '#1b1b1b', '#ffffff', 0));
      const cam = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.6), new THREE.MeshStandardMaterial({ color: 0x9e9e9e }));
      cam.position.set(LANE_COUNT * LANE_WIDTH / 2 + 1.2, 2.3, 0);
      group.add(cam);
      lanes = [0, 1, 2, 3];
    } else {
      const first = Math.floor(Math.random() * (LANE_COUNT - 1));
      lanes = [first, first + 1];
      length = 2;
      const cone = new THREE.MeshStandardMaterial({ color: 0xff6d00 });
      for (const lane of lanes) {
        for (const dx of [-1, 0, 1]) {
          const c = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.8, 8), cone);
          c.position.set(laneX(lane) + dx * 1, 0.4, 0);
          group.add(c);
        }
      }
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(LANE_WIDTH * 2, 0.25, 0.2),
        new THREE.MeshStandardMaterial({ color: 0xffffff }),
      );
      bar.position.set((laneX(lanes[0]) + laneX(lanes[1])) / 2, 0.9, 0);
      group.add(bar);
      const red = new THREE.Mesh(new THREE.BoxGeometry(LANE_WIDTH * 0.6, 0.27, 0.22), new THREE.MeshStandardMaterial({ color: 0xd50000 }));
      red.position.copy(bar.position);
      group.add(red);
      group.add(this.sign('كمين', '#d50000', '#ffffff', -34));
    }

    group.position.z = z;
    this.world.scene.add(group);
    this.hazards.push({ kind, group, lanes, z, prevZ: z, length, width, done: false });
  }

  private sign(text: string, bg: string, fg: string, zOffset: number): THREE.Group {
    const g = new THREE.Group();
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.4, 6), new THREE.MeshStandardMaterial({ color: 0x777777 }));
    post.position.set(LANE_COUNT * LANE_WIDTH / 2 + 1.2, 1.2, zOffset);
    g.add(post);
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 1),
      new THREE.MeshStandardMaterial({ map: signTexture(text, bg, fg), side: THREE.DoubleSide }),
    );
    panel.position.set(LANE_COUNT * LANE_WIDTH / 2 + 1.2, 2.6, zOffset);
    panel.rotation.y = -Math.PI * 0.12;
    g.add(panel);
    return g;
  }

  private spawnPickups(): void {
    const lane = randomLane();
    const baseZ = this.world.spawnZ - rand(0, 20);
    const blocked = this.entities.some((e) => Math.abs(e.x - laneX(lane)) < LANE_WIDTH * 0.7 && Math.abs(e.z - baseZ) < 24);
    if (blocked) return;

    if (chance(0.12)) {
      const can = new THREE.Mesh(this.canGeo, this.canMat);
      can.position.set(laneX(lane), 0.7, baseZ);
      this.world.scene.add(can);
      this.pickups.push({ kind: 'nitro', mesh: can, lane, z: baseZ, taken: false });
      return;
    }
    for (let i = 0; i < 5; i++) {
      const coin = new THREE.Mesh(this.coinGeo, this.coinMat);
      coin.rotation.x = Math.PI / 2;
      coin.position.set(laneX(lane), 0.7, baseZ - i * 3);
      this.world.scene.add(coin);
      this.pickups.push({ kind: 'coin', mesh: coin, lane, z: baseZ - i * 3, taken: false });
    }
  }

  private recycle(): void {
    const gone = this.world.despawnZ;
    const far = this.world.spawnZ - 80;
    this.entities = this.entities.filter((e) => {
      const keep = e.z < gone && e.z > far;
      if (!keep) {
        this.world.scene.remove(e.parts.group);
        e.parts.group.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.isMesh && m.material && !Array.isArray(m.material) && (m === e.parts.brake || m === e.parts.headlights)) m.material.dispose();
        });
      }
      return keep;
    });
    this.hazards = this.hazards.filter((h) => {
      const keep = h.z < gone + 40;
      if (!keep) this.world.scene.remove(h.group);
      return keep;
    });
    this.pickups = this.pickups.filter((p) => {
      const keep = p.z < gone && !p.taken;
      if (!keep) this.world.scene.remove(p.mesh);
      return keep;
    });
  }
}
