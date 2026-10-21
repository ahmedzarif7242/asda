import { Injectable, NgZone, inject } from '@angular/core';
import * as THREE from 'three';

import { AudioService } from '../audio/audio.service';
import { InputService } from '../input/input.service';
import { TIMED_SECONDS } from '../model/game.types';
import { GameStore } from '../state/game.store';
import { mps } from './lanes';
import { PlayerService } from './player.service';
import { TrafficService } from './traffic.service';
import { WorldService } from './world.service';

const DAY_SECONDS = 220;
const LEVEL_METRES = 800;

/**
 * The loop.
 *
 * One `requestAnimationFrame` that moves the world, asks the traffic what happened, and
 * writes the numbers into the store. It renders whether or not a run is on — the menu sits
 * on a slow, empty drive — and only simulates while the store says `playing`.
 */
@Injectable({ providedIn: 'root' })
export class EngineService {
  private readonly zone = inject(NgZone);
  private readonly store = inject(GameStore);
  private readonly input = inject(InputService);
  private readonly audio = inject(AudioService);
  private readonly world = inject(WorldService);
  private readonly traffic = inject(TrafficService);
  private readonly player = inject(PlayerService);

  private renderer: THREE.WebGLRenderer | null = null;
  private readonly camera = new THREE.PerspectiveCamera(62, 1, 0.1, 400);
  private last = 0;
  private raf = 0;
  private idleSpeed = 0;
  private onRunEnded: (() => void) | null = null;

  mount(canvas: HTMLCanvasElement): void {
    if (this.renderer) return;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this.world.build();
    this.world.setDayPhase(this.store.dayPhase());
    this.player.reset(this.store.car(), this.store.difficulty());
    this.traffic.reset(this.store.difficulty());
    this.input.bind();

    this.camera.position.set(0, 4.4, 8.5);
    this.camera.lookAt(0, 0.8, -14);
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.zone.runOutsideAngular(() => {
      this.last = performance.now();
      const tick = (now: number) => {
        this.raf = requestAnimationFrame(tick);
        const dt = Math.min(0.05, (now - this.last) / 1000);
        this.last = now;
        this.frame(dt);
      };
      this.raf = requestAnimationFrame(tick);
    });
  }

  /** Called when a run starts; the facade owns the store transitions. */
  beginRun(onEnded: () => void): void {
    this.onRunEnded = onEnded;
    this.player.reset(this.store.car(), this.store.difficulty());
    this.traffic.reset(this.store.difficulty());
    this.audio.startEngine();
  }

  private frame(dt: number): void {
    if (!this.renderer) return;
    const status = this.store.status();

    if (status === 'playing') {
      this.simulate(dt);
    } else if (status === 'menu') {
      // The menu's background: a slow empty road.
      this.idleSpeed += (40 - this.idleSpeed) * dt;
      this.world.advance(mps(this.idleSpeed) * dt);
      this.player.update(dt, false, false, this.store.isNight());
      this.audio.stopEngine();
    } else {
      this.audio.stopEngine();
    }

    this.placeCamera(dt);
    this.renderer.render(this.world.scene, this.camera);
  }

  private simulate(dt: number): void {
    if (this.input.consumePause()) {
      this.store.pause();
      return;
    }
    const steer = this.input.consumeLane();
    if (steer !== 0) this.player.steer(steer);
    if (this.input.consumeNitro() && this.store.nitro() >= 1 && !this.player.nitroActive) {
      this.player.fireNitro();
      this.store.nitro.set(0);
      this.store.nitroActive.set(true);
      this.store.push('nitro', 'نيترو!');
      this.audio.nitroBurst();
    }

    const night = this.store.isNight();
    this.player.update(dt, this.input.accelerate(), this.input.brake(), night);
    if (!this.player.nitroActive && this.store.nitroActive()) this.store.nitroActive.set(false);

    const metres = mps(this.player.speed) * dt;
    this.world.advance(metres);

    const out = this.traffic.update(
      dt,
      { x: this.player.x, width: this.player.spec.width, length: this.player.spec.length, speed: this.player.speed, invulnerable: this.player.invulnerable > 0 },
      night,
    );

    // ---- bookkeeping ----
    const distance = this.store.distance() + metres;
    this.store.distance.set(distance);
    this.store.speed.set(Math.round(this.player.speed));
    if (this.player.speed > this.store.topSpeed()) this.store.topSpeed.set(Math.round(this.player.speed));

    const level = 1 + Math.floor(distance / LEVEL_METRES);
    if (level !== this.store.level()) {
      this.store.level.set(level);
      this.traffic.setLevel(level);
      this.store.push('level', `كيلو ${Math.round(distance / 1000 * 10) / 10} — الزحمة بتزيد`);
    }

    const phase = (this.store.dayPhase() + dt / DAY_SECONDS) % 1;
    this.store.dayPhase.set(phase);
    this.world.setDayPhase(phase);

    if (out.coins) {
      this.store.coins.update((c) => c + out.coins);
      this.store.push('coin', `+${out.coins * 10}`, out.coins * 10);
      this.audio.coin();
    }
    if (out.nitroCans) {
      this.store.nitro.set(1);
      this.store.push('nitro', 'نيترو جاهز — اضغط مسافة أو اسحب لفوق');
      this.audio.coin();
    }
    if (out.nearMisses) {
      this.store.nearMisses.update((n) => n + out.nearMisses);
      this.store.nitro.update((n) => Math.min(1, n + 0.25 * out.nearMisses));
      this.store.push('nearMiss', 'حرفنة! +50', 50);
      this.audio.nearMiss();
      if (Math.random() < 0.3) this.audio.horn();
    }
    if (out.fines) {
      const fine = 100;
      this.store.coins.update((c) => Math.max(0, c - fine / 10));
      this.store.push('fine', `رادار ${out.radarLimit} — مخالفة`, -fine);
      this.audio.fine();
    }
    if (out.bumps) {
      this.player.bump(0.6);
      this.store.push('bump', 'مطب! هدّي');
      this.audio.bump();
    }
    if (out.potholes) {
      this.player.bump(0.9);
      this.store.nitro.set(0);
      this.store.push('bump', 'حفرة — راح النيترو');
      this.audio.bump();
    }
    if (out.hits) {
      this.player.takeHit();
      this.store.lives.update((l) => l - 1);
      this.store.push('hit', 'خبطة!');
      this.audio.crash();
      if (this.store.lives() <= 0) {
        this.endRun();
        return;
      }
    }

    if (this.store.mode() === 'timed') {
      const left = Math.max(0, this.store.timeLeft() - dt);
      this.store.timeLeft.set(left);
      if (left <= 0) {
        this.endRun();
        return;
      }
    }

    this.audio.engine(this.player.speed, this.player.nitroActive);
  }

  private endRun(): void {
    this.audio.stopEngine();
    this.store.endRun();
    this.onRunEnded?.();
  }

  private placeCamera(dt: number): void {
    const targetX = this.player.x * 0.4;
    this.camera.position.x += (targetX - this.camera.position.x) * Math.min(1, dt * 5);
    const speedPull = (this.player.speed / 200) * 1.2;
    this.camera.position.z += (8.5 + speedPull - this.camera.position.z) * Math.min(1, dt * 2);
    const shake = this.player.shake;
    const sx = (Math.random() - 0.5) * shake * 0.5;
    const sy = (Math.random() - 0.5) * shake * 0.3;
    this.camera.position.y = 4.4 + sy;
    this.camera.lookAt(this.player.x * 0.4 + sx, 0.8, -14);
    this.camera.fov = 62 + (this.player.nitroActive ? 10 : 0) + this.player.speed * 0.04;
    this.camera.updateProjectionMatrix();
  }

  private resize(): void {
    if (!this.renderer) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  get timedSeconds(): number {
    return TIMED_SECONDS;
  }
}
