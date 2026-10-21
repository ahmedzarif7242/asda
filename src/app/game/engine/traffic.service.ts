import { Injectable, inject } from '@angular/core';
import * as THREE from 'three';

import { DifficultySpec, HazardKind, LANE_WIDTH, PickupKind, TrafficKind } from '../model/game.types';
import { RouteSpec } from '../model/routes';
import { chance, clampLane, laneX, mps, pick, rand, randomLane, weighted } from './lanes';
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
  honked: boolean;
  /** A radio on, loud enough for the road to hear. Every tuktuk; some microbuses. */
  radio: boolean;
}

interface Hazard {
  kind: HazardKind;
  group: THREE.Group;
  lanes: number[];
  z: number;
  prevZ: number;
  length: number;
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
  /** Where the thing that hit the player was, so the car can be shoved the other way. */
  hitFromX: number;
  nearMisses: number;
  coins: number;
  nitroCans: number;
  fines: number;
  bumps: number;
  potholes: number;
  sand: number;
  /** Who leaned on the horn, and from which side. */
  honks: { kind: TrafficKind; dx: number }[];
  radarLimit: number;
}

/** A vehicle close enough to be heard. */
export interface Audible {
  kind: TrafficKind;
  dx: number;
  dz: number;
  speed: number;
  radio: boolean;
}

const RADAR_LIMIT = 80;

/**
 * The traffic, the hazards and the coins — spawned ahead, slid past, recycled behind.
 *
 * Every vehicle has a cruising speed and a mood. The microbus is the one with a mood: it
 * changes lanes without looking and stops dead to pick someone up, which is the thing that
 * makes the road feel like the road. The tractor has no mood and no hurry. Everything else
 * mostly holds its lane and leans on the horn when you cut it up.
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
  private route!: RouteSpec;
  private levelBoost = 1;

  private readonly coinGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.12, 14);
  private readonly coinMat = new THREE.MeshStandardMaterial({ color: 0xffc83d, metalness: 0.8, roughness: 0.25, emissive: 0x8a5a00, emissiveIntensity: 0.6 });
  private readonly canGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.9, 10);
  private readonly canMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00bcd4, emissiveIntensity: 1.2 });

  private get lanes(): number {
    return this.world.lanes;
  }

  reset(difficulty: DifficultySpec, route: RouteSpec): void {
    this.difficulty = difficulty;
    this.route = route;
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
    const out: TrafficOutcome = { hits: 0, hitFromX: 0, nearMisses: 0, coins: 0, nitroCans: 0, fines: 0, bumps: 0, potholes: 0, sand: 0, honks: [], radarLimit: RADAR_LIMIT };
    const top = this.difficulty.maxSpeed * this.route.speed;
    const speedFactor = 0.35 + player.speed / top;

    this.spawnAcc += this.difficulty.spawnRate * this.levelBoost * speedFactor * dt * (this.lanes / 4 + 0.4);
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
      this.drive(e, dt);
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
        if (!player.invulnerable) {
          out.hits++;
          out.hitFromX = e.x;
        }
        // Shoved forward, so the car is not sitting inside the player's next frame too.
        e.shoved = 2;
        e.speed = Math.max(e.speed, player.speed) + 25;
      } else if (!e.passed && !e.hit && dx < e.parts.width / 2 + halfW + 1.1 && this.crossed(e.prevZ, e.z)) {
        e.passed = true;
        out.nearMisses++;
        if (!e.honked && chance(0.5)) {
          e.honked = true;
          out.honks.push({ kind: e.kind, dx: e.x - player.x });
        }
      }
    }

    for (const h of this.hazards) {
      h.prevZ = h.z;
      h.z += playerMps * dt;
      h.group.position.z = h.z;
      if (h.done) continue;

      const inLane = h.lanes.some((l) => Math.abs(laneX(l, this.lanes) - player.x) < LANE_WIDTH * 0.55);

      if (h.kind === 'cones') {
        const dx = h.lanes.reduce((m, l) => Math.min(m, Math.abs(laneX(l, this.lanes) - player.x)), 99);
        if (dx < LANE_WIDTH / 2 + halfW * 0.9 && Math.abs(h.z) < h.length / 2 + halfL * 0.9) {
          h.done = true;
          if (!player.invulnerable) {
            out.hits++;
            out.hitFromX = player.x + (dx < 0.1 ? 1 : 0);
          }
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
      } else if (h.kind === 'sand' && inLane) {
        out.sand++;
      }
    }

    for (const p of this.pickups) {
      p.z += playerMps * dt;
      p.mesh.position.z = p.z;
      p.mesh.rotation.y += dt * 4;
      if (p.taken) continue;
      if (Math.abs(p.z) < 1.6 && Math.abs(laneX(p.lane, this.lanes) - player.x) < LANE_WIDTH * 0.6) {
        p.taken = true;
        p.mesh.visible = false;
        if (p.kind === 'coin') out.coins++;
        else out.nitroCans++;
      }
    }

    this.recycle();
    return out;
  }

  /** The nearest vehicles, for the sound to place. */
  audible(playerX: number): Audible[] {
    return this.entities
      .map((e) => ({ kind: e.kind, dx: e.x - playerX, dz: e.z, speed: e.speed, radio: e.radio }))
      .filter((a) => Math.hypot(a.dx, a.dz) < 60)
      .sort((a, b) => Math.hypot(a.dx, a.dz) - Math.hypot(b.dx, b.dz))
      .slice(0, 4);
  }

  private crossed(prevZ: number, z: number): boolean {
    return (prevZ < 0 && z >= 0) || (prevZ > 0 && z <= 0);
  }

  private drive(e: Entity, dt: number): void {
    // Lane changes.
    const tx = laneX(e.targetLane, this.lanes);
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
        const options = [e.targetLane - 1, e.targetLane + 1].filter((l) => l >= 0 && l < this.lanes && !h.lanes.includes(l));
        if (options.length) e.targetLane = pick(options);
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
    e.speed += (e.cruise - e.speed) * Math.min(1, dt * 0.8);

    e.moodTimer -= dt;
    if (e.moodTimer > 0) return;
    e.moodTimer = rand(1.5, 4);
    const mood = e.kind === 'microbus' ? this.difficulty.microbusMood : e.kind === 'car' ? 0.08 : e.kind === 'tuktuk' ? 0.12 : 0.03;
    if (!chance(mood)) return;
    if (e.kind === 'microbus' && chance(0.45)) {
      e.braking = rand(0.8, 1.6); // "بيلم زبون"
    } else {
      e.targetLane = clampLane(e.lane + (chance(0.5) ? -1 : 1), this.lanes);
    }
  }

  private setLights(parts: VehicleParts, braking: boolean, night: boolean): void {
    const brake = parts.brake.material as THREE.MeshStandardMaterial;
    brake.emissive.setHex(braking ? 0xff1a1a : night ? 0x660000 : 0x000000);
    brake.emissiveIntensity = braking ? 3 : 1.2;
    const head = parts.headlights.material as THREE.MeshStandardMaterial;
    head.emissive.setHex(night ? 0xfff0b0 : 0x000000);
    head.emissiveIntensity = 2.5;
  }

  private spawnVehicle(atZ?: number): void {
    const kind = weighted<TrafficKind>(this.route.traffic);
    const lane = randomLane(this.lanes);
    const z = atZ ?? this.world.spawnZ + rand(-30, 0);
    const blocked = this.entities.some((e) => Math.abs(e.x - laneX(lane, this.lanes)) < LANE_WIDTH * 0.7 && Math.abs(e.z - z) < 18);
    if (blocked) return;

    // Everything cruises below the player's comfortable speed, so the road comes to you;
    // the microbus is the one thing that can be faster, which is how it ends up beside you.
    const top = this.difficulty.maxSpeed * this.route.speed;
    const cruise =
      kind === 'tuktuk' ? rand(20, 38) :
      kind === 'tractor' ? rand(12, 22) :
      kind === 'truck' ? rand(top * 0.25, top * 0.4) :
      kind === 'bus' ? rand(top * 0.3, top * 0.45) :
      kind === 'microbus' ? rand(top * 0.3, top * 0.75) :
      rand(top * 0.3, top * 0.55);
    const parts = buildTraffic(kind);
    parts.group.position.set(laneX(lane, this.lanes), 0, z);
    this.world.scene.add(parts.group);
    this.entities.push({
      kind, parts, lane, targetLane: lane, x: laneX(lane, this.lanes), z, prevZ: z,
      speed: cruise, cruise, moodTimer: rand(1, 3), braking: 0, shoved: 0, hit: false, passed: false, honked: false,
      radio: kind === 'tuktuk' || (kind === 'microbus' && chance(0.4)),
    });
  }

  private spawnHazard(): void {
    const kind = pick(this.route.hazards);
    const z = this.world.spawnZ - 20;
    const group = new THREE.Group();
    let lanes: number[] = [];
    let length = 1;
    const width = this.lanes * LANE_WIDTH;
    const all = Array.from({ length: this.lanes }, (_, i) => i);

    if (kind === 'bump') {
      const bump = new THREE.Mesh(new THREE.BoxGeometry(width, 0.22, 1.1), new THREE.MeshStandardMaterial({ color: 0x3c3c3c, roughness: 1 }));
      bump.position.y = 0.1;
      group.add(bump);
      for (let x = -width / 2 + 0.6; x < width / 2; x += 1.2) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.24, 1.12), new THREE.MeshStandardMaterial({ color: 0xf2c200 }));
        stripe.position.set(x, 0.1, 0);
        group.add(stripe);
      }
      lanes = all;
      group.add(this.sign('مطب', '#f2c200', '#1b1b1b', -28));
    } else if (kind === 'pothole') {
      const lane = randomLane(this.lanes);
      lanes = [lane];
      const hole = new THREE.Mesh(new THREE.CircleGeometry(0.9, 16), new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 1 }));
      hole.rotation.x = -Math.PI / 2;
      hole.position.set(laneX(lane, this.lanes), 0.02, 0);
      group.add(hole);
    } else if (kind === 'sand') {
      // Sand blown across the road: a pale drift on one or two lanes.
      const first = randomLane(this.lanes);
      lanes = [first, Math.min(this.lanes - 1, first + 1)];
      const drift = new THREE.Mesh(new THREE.PlaneGeometry(LANE_WIDTH * 2.2, 8), new THREE.MeshStandardMaterial({ color: 0xe8d6a8, roughness: 1, transparent: true, opacity: 0.85 }));
      drift.rotation.x = -Math.PI / 2;
      drift.position.set((laneX(lanes[0], this.lanes) + laneX(lanes[1], this.lanes)) / 2, 0.03, 0);
      group.add(drift);
      length = 8;
    } else if (kind === 'radar') {
      group.add(this.sign(`رادار ${RADAR_LIMIT}`, '#1b1b1b', '#ffffff', 0));
      const cam = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.6), new THREE.MeshStandardMaterial({ color: 0x9e9e9e }));
      cam.position.set(width / 2 + 1.2, 2.3, 0);
      group.add(cam);
      lanes = all;
    } else {
      const first = Math.floor(Math.random() * Math.max(1, this.lanes - 1));
      lanes = this.lanes > 1 ? [first, first + 1] : [0];
      length = 2;
      const cone = new THREE.MeshStandardMaterial({ color: 0xff6d00 });
      for (const lane of lanes) {
        for (const dx of [-1, 0, 1]) {
          const c = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.8, 8), cone);
          c.position.set(laneX(lane, this.lanes) + dx * 1, 0.4, 0);
          group.add(c);
        }
      }
      const mid = lanes.reduce((a, l) => a + laneX(l, this.lanes), 0) / lanes.length;
      const bar = new THREE.Mesh(new THREE.BoxGeometry(LANE_WIDTH * lanes.length, 0.25, 0.2), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      bar.position.set(mid, 0.9, 0);
      group.add(bar);
      const red = new THREE.Mesh(new THREE.BoxGeometry(LANE_WIDTH * 0.6, 0.27, 0.22), new THREE.MeshStandardMaterial({ color: 0xd50000 }));
      red.position.copy(bar.position);
      group.add(red);
      group.add(this.sign('كمين', '#d50000', '#ffffff', -34));
    }

    group.position.z = z;
    this.world.scene.add(group);
    this.hazards.push({ kind, group, lanes, z, prevZ: z, length, done: false });
  }

  private sign(text: string, bg: string, fg: string, zOffset: number): THREE.Group {
    const g = new THREE.Group();
    const x = this.lanes * LANE_WIDTH / 2 + 1.2;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.4, 6), new THREE.MeshStandardMaterial({ color: 0x777777 }));
    post.position.set(x, 1.2, zOffset);
    g.add(post);
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(2, 1), new THREE.MeshStandardMaterial({ map: signTexture(text, bg, fg), side: THREE.DoubleSide, emissive: 0x111111 }));
    panel.position.set(x, 2.6, zOffset);
    panel.rotation.y = -Math.PI * 0.12;
    g.add(panel);
    return g;
  }

  private spawnPickups(): void {
    const lane = randomLane(this.lanes);
    const baseZ = this.world.spawnZ - rand(0, 20);
    const blocked = this.entities.some((e) => Math.abs(e.x - laneX(lane, this.lanes)) < LANE_WIDTH * 0.7 && Math.abs(e.z - baseZ) < 24);
    if (blocked) return;

    if (chance(0.12)) {
      const can = new THREE.Mesh(this.canGeo, this.canMat);
      can.position.set(laneX(lane, this.lanes), 0.7, baseZ);
      this.world.scene.add(can);
      this.pickups.push({ kind: 'nitro', mesh: can, lane, z: baseZ, taken: false });
      return;
    }
    for (let i = 0; i < 5; i++) {
      const coin = new THREE.Mesh(this.coinGeo, this.coinMat);
      coin.rotation.x = Math.PI / 2;
      coin.position.set(laneX(lane, this.lanes), 0.7, baseZ - i * 3);
      this.world.scene.add(coin);
      this.pickups.push({ kind: 'coin', mesh: coin, lane, z: baseZ - i * 3, taken: false });
    }
  }

  private recycle(): void {
    const gone = this.world.despawnZ;
    const far = this.world.spawnZ - 80;
    this.entities = this.entities.filter((e) => {
      const keep = e.z < gone && e.z > far;
      if (!keep) this.world.scene.remove(e.parts.group);
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
