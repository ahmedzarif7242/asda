import { Injectable, inject } from '@angular/core';
import * as THREE from 'three';

import { CarSpec, DifficultySpec, LANE_COUNT } from '../model/game.types';
import { clampLane, laneX, mps } from './lanes';
import { buildPlayer, VehicleParts } from './vehicles';
import { WorldService } from './world.service';

const NITRO_SECONDS = 3;
const INVULNERABLE_SECONDS = 1.6;

/**
 * The car under the player.
 *
 * It never moves forward — the world does — so all it owns is which lane it is heading for,
 * how fast it is going, and whether it is currently allowed to be hit.
 */
@Injectable({ providedIn: 'root' })
export class PlayerService {
  private readonly world = inject(WorldService);

  parts: VehicleParts | null = null;
  spec!: CarSpec;
  private difficulty!: DifficultySpec;

  lane = 1;
  x = laneX(1);
  /** km/h */
  speed = 0;
  nitroLeft = 0;
  invulnerable = 0;
  /** Camera shake energy, decays every frame. */
  shake = 0;
  private headlights: THREE.SpotLight[] = [];

  reset(spec: CarSpec, difficulty: DifficultySpec): void {
    this.spec = spec;
    this.difficulty = difficulty;
    if (this.parts) {
      this.world.scene.remove(this.parts.group);
      for (const h of this.headlights) this.world.scene.remove(h, h.target);
      this.headlights = [];
    }
    this.parts = buildPlayer(spec);
    this.parts.group.position.set(laneX(1), 0, 0);
    this.world.scene.add(this.parts.group);

    for (const sx of [-0.5, 0.5]) {
      const light = new THREE.SpotLight(0xfff2cc, 0, 60, Math.PI / 7, 0.5, 1);
      light.position.set(sx * spec.width * 0.7, spec.height * 0.5, -spec.length / 2);
      light.target.position.set(sx * spec.width * 0.7, 0, -30);
      this.parts.group.add(light, light.target);
      this.headlights.push(light);
    }

    this.lane = 1;
    this.x = laneX(1);
    this.speed = 0;
    this.nitroLeft = 0;
    this.invulnerable = 0;
    this.shake = 0;
  }

  get maxSpeed(): number {
    const boost = this.nitroLeft > 0 ? 1.45 : 1;
    return this.difficulty.maxSpeed * this.spec.topSpeed * boost;
  }

  get nitroActive(): boolean {
    return this.nitroLeft > 0;
  }

  steer(direction: number): void {
    this.lane = clampLane(this.lane + direction);
  }

  fireNitro(): void {
    this.nitroLeft = NITRO_SECONDS;
  }

  /** A collision: the car is thrown off its speed and cannot be hit again for a moment. */
  takeHit(): void {
    this.speed *= 0.45;
    this.invulnerable = INVULNERABLE_SECONDS;
    this.shake = 1;
    this.nitroLeft = 0;
  }

  bump(strength = 0.5): void {
    this.speed = Math.min(this.speed, 45);
    this.shake = Math.max(this.shake, strength);
  }

  update(dt: number, accelerate: boolean, brake: boolean, night: boolean): void {
    if (!this.parts) return;
    const max = this.maxSpeed;
    const cruise = this.difficulty.minSpeed + (max - this.difficulty.minSpeed) * 0.55;

    if (this.nitroLeft > 0) {
      this.nitroLeft -= dt;
      this.speed += (max - this.speed) * Math.min(1, dt * 1.8);
    } else if (brake) {
      this.speed = Math.max(this.difficulty.minSpeed * 0.5, this.speed - 110 * dt);
    } else if (accelerate) {
      this.speed = Math.min(max, this.speed + 55 * dt);
    } else {
      // Left alone the car settles to a comfortable cruise, so a phone with no buttons
      // held still moves — and so braking has something to come back from.
      this.speed += (cruise - this.speed) * Math.min(1, dt * 0.5);
    }

    // Slide to the lane, lean into it.
    const target = laneX(this.lane);
    const diff = target - this.x;
    const maxStep = this.spec.agility * 3.2 * dt;
    const step = Math.abs(diff) < maxStep ? diff : Math.sign(diff) * maxStep;
    this.x += step;
    const lean = -(step / dt) * 0.03;
    this.parts.group.rotation.z = THREE.MathUtils.lerp(this.parts.group.rotation.z, lean, 0.2);
    this.parts.group.rotation.y = THREE.MathUtils.lerp(this.parts.group.rotation.y, -(step / dt) * 0.04, 0.2);
    this.parts.group.position.x = this.x;

    for (const w of this.parts.wheels) w.rotation.x += mps(this.speed) * dt / 0.34;

    if (this.invulnerable > 0) {
      this.invulnerable -= dt;
      this.parts.group.visible = Math.floor(this.invulnerable * 12) % 2 === 0;
    } else {
      this.parts.group.visible = true;
    }

    this.shake = Math.max(0, this.shake - dt * 2.2);

    for (const h of this.headlights) h.intensity = night ? 40 : 0;
    const head = this.parts.headlights.material as THREE.MeshStandardMaterial;
    head.emissive.setHex(night ? 0xfff0b0 : 0x000000);
    head.emissiveIntensity = 2;
    const tail = this.parts.brake.material as THREE.MeshStandardMaterial;
    tail.emissive.setHex(brake ? 0xff1a1a : night ? 0x880000 : 0x000000);
    tail.emissiveIntensity = brake ? 2.5 : 1;
  }

  get laneCount(): number {
    return LANE_COUNT;
  }
}
