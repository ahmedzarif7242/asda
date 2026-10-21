import { Injectable, inject } from '@angular/core';
import * as THREE from 'three';

import { CarSpec, DifficultySpec } from '../model/game.types';
import { RouteSpec } from '../model/routes';
import { mps } from './lanes';
import { buildPlayer, VehicleParts } from './vehicles';
import { SHOULDER, WorldService } from './world.service';

const NITRO_SECONDS = 3;
const INVULNERABLE_SECONDS = 1.6;

/**
 * The car under the player.
 *
 * It never moves forward — the world does — so what it owns is where its nose is pointed,
 * how fast it is going, and whether it is currently allowed to be hit. Steering is a wheel,
 * not a lane: hold it and the car keeps drifting across; let go and it straightens up. The
 * faster you go, the less the wheel does, which is what makes the top end feel like the top
 * end. Off the asphalt the gravel takes the speed out of it.
 */
@Injectable({ providedIn: 'root' })
export class PlayerService {
  private readonly world = inject(WorldService);

  parts: VehicleParts | null = null;
  spec!: CarSpec;
  private difficulty!: DifficultySpec;
  private route!: RouteSpec;

  x = 0;
  /** Radians, positive = nose to the right. */
  heading = 0;
  /** Lateral push from a collision, decays. */
  shove = 0;
  /** km/h */
  speed = 0;
  nitroLeft = 0;
  invulnerable = 0;
  /** Camera shake energy, decays every frame. */
  shake = 0;
  offRoad = false;
  private headlights: THREE.SpotLight[] = [];

  reset(spec: CarSpec, difficulty: DifficultySpec, route: RouteSpec): void {
    this.spec = spec;
    this.difficulty = difficulty;
    this.route = route;
    if (this.parts) {
      this.world.scene.remove(this.parts.group);
      this.headlights = [];
    }
    this.parts = buildPlayer(spec);
    this.parts.group.position.set(0, 0, 0);
    this.world.scene.add(this.parts.group);

    for (const sx of [-0.5, 0.5]) {
      const light = new THREE.SpotLight(0xfff2cc, 0, 70, Math.PI / 6, 0.6, 1);
      light.position.set(sx * spec.width * 0.7, spec.height * 0.5, -spec.length / 2);
      light.target.position.set(sx * spec.width * 1.2, 0, -40);
      this.parts.group.add(light, light.target);
      this.headlights.push(light);
    }

    this.x = 0;
    this.heading = 0;
    this.shove = 0;
    this.speed = 0;
    this.nitroLeft = 0;
    this.invulnerable = 0;
    this.shake = 0;
    this.offRoad = false;
  }

  get maxSpeed(): number {
    const boost = this.nitroLeft > 0 ? 1.45 : 1;
    return this.difficulty.maxSpeed * this.route.speed * this.spec.topSpeed * boost;
  }

  get nitroActive(): boolean {
    return this.nitroLeft > 0;
  }

  /** A flick of the wheel: one jolt, then the self-centring takes over. */
  flick(direction: number): void {
    this.heading += direction * 0.28 * this.spec.steering;
  }

  fireNitro(): void {
    this.nitroLeft = NITRO_SECONDS;
  }

  /** A collision: the car is thrown off its speed and line, and cannot be hit again for a moment. */
  takeHit(fromX: number): void {
    this.speed *= 0.45;
    this.invulnerable = INVULNERABLE_SECONDS;
    this.shake = 1;
    this.nitroLeft = 0;
    this.shove = (this.x >= fromX ? 1 : -1) * 6;
    this.heading += (this.x >= fromX ? 1 : -1) * 0.25;
  }

  bump(strength = 0.5): void {
    this.speed = Math.min(this.speed, 45);
    this.shake = Math.max(this.shake, strength);
  }

  update(dt: number, steer: number, accelerate: boolean, brake: boolean, night: boolean): void {
    if (!this.parts) return;
    const max = this.maxSpeed;
    const cruise = this.difficulty.minSpeed + (max - this.difficulty.minSpeed) * 0.55;
    const ratio = Math.min(1, this.speed / Math.max(1, this.difficulty.maxSpeed * this.route.speed));

    // ---- speed ----
    if (this.nitroLeft > 0) {
      this.nitroLeft -= dt;
      this.speed += (max - this.speed) * Math.min(1, dt * 1.8);
    } else if (brake) {
      this.speed = Math.max(this.difficulty.minSpeed * 0.4, this.speed - 120 * dt);
    } else if (accelerate) {
      this.speed = Math.min(max, this.speed + (60 - ratio * 25) * dt);
    } else {
      // Left alone the car settles to a comfortable cruise, so a phone with no buttons
      // held still moves — and so braking has something to come back from.
      this.speed += (cruise - this.speed) * Math.min(1, dt * 0.5);
    }

    // ---- steering ----
    // The wheel turns the nose; how far it can turn shrinks with speed. Off the wheel the
    // nose comes back to straight on its own.
    const maxYaw = this.spec.steering * (0.42 - ratio * 0.24);
    if (steer !== 0) {
      this.heading += steer * this.spec.steering * 2.4 * dt;
      this.heading = THREE.MathUtils.clamp(this.heading, -maxYaw * 1.6, maxYaw * 1.6);
    } else {
      this.heading -= this.heading * Math.min(1, dt * 3.2);
    }
    const grip = this.offRoad ? this.spec.grip * 0.6 : this.spec.grip;
    const lateral = Math.sin(this.heading) * mps(this.speed) * 0.55 * grip + this.shove;
    this.x += lateral * dt;
    this.shove -= this.shove * Math.min(1, dt * 4);

    // ---- the edge of the road ----
    const limit = this.world.halfRoad + SHOULDER - this.spec.width * 0.4;
    const asphalt = this.world.halfRoad - this.spec.width * 0.3;
    if (Math.abs(this.x) > limit) {
      this.x = Math.sign(this.x) * limit;
      this.heading = -Math.sign(this.x) * 0.15;
      this.shove = -Math.sign(this.x) * 3;
      this.speed = Math.max(this.difficulty.minSpeed * 0.5, this.speed * 0.9);
      this.shake = Math.max(this.shake, 0.4);
    }
    this.offRoad = Math.abs(this.x) > asphalt;
    if (this.offRoad) {
      this.speed = Math.max(this.difficulty.minSpeed * 0.6, this.speed - 50 * dt);
      this.shake = Math.max(this.shake, 0.18);
    }

    // ---- the body ----
    const g = this.parts.group;
    g.position.x = this.x;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -this.heading * 0.9, 0.25);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -lateral * 0.012, 0.2);
    g.position.y = this.offRoad ? Math.sin(performance.now() / 30) * 0.03 : 0;
    for (const w of this.parts.wheels) w.rotation.x += mps(this.speed) * dt / 0.34;
    // The front wheels turn with the wheel.
    this.parts.wheels[0].rotation.y = -this.heading * 0.6;
    this.parts.wheels[1].rotation.y = -this.heading * 0.6;

    if (this.invulnerable > 0) {
      this.invulnerable -= dt;
      g.visible = Math.floor(this.invulnerable * 12) % 2 === 0;
    } else {
      g.visible = true;
    }

    this.shake = Math.max(0, this.shake - dt * 2.2);

    for (const h of this.headlights) h.intensity = night ? 60 : 0;
    const head = this.parts.headlights.material as THREE.MeshStandardMaterial;
    head.emissive.setHex(night ? 0xfff0b0 : 0x000000);
    head.emissiveIntensity = 2.5;
    const tail = this.parts.brake.material as THREE.MeshStandardMaterial;
    tail.emissive.setHex(brake ? 0xff1a1a : night ? 0x880000 : 0x000000);
    tail.emissiveIntensity = brake ? 3 : 1.2;
  }
}
