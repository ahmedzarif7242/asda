import { Injectable, NgZone, inject } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import { AudioService } from '../audio/audio.service';
import { InputService } from '../input/input.service';
import { GameStore } from '../state/game.store';
import { mps } from './lanes';
import { Particles } from './particles';
import { PlayerService } from './player.service';
import { TrafficService } from './traffic.service';
import { WorldService } from './world.service';

const DAY_SECONDS = 240;
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
  private composer: EffectComposer | null = null;
  private bloom: UnrealBloomPass | null = null;
  private readonly camera = new THREE.PerspectiveCamera(62, 1, 0.1, 500);
  private readonly particles = new Particles();
  private last = 0;
  private idleSpeed = 0;
  private onRunEnded: (() => void) | null = null;
  private readonly dust = new THREE.Color(0xd8c59a);
  private readonly spark = new THREE.Color(0xffb347);
  private readonly flame = new THREE.Color(0x4de3ff);

  mount(canvas: HTMLCanvasElement): void {
    if (this.renderer) return;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    // A phone with a dense screen gets the plain renderer; bloom on top of that is a fan.
    const mobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    this.store.quality.set(mobile && window.devicePixelRatio > 2 ? 'low' : 'high');

    this.world.build();
    this.world.scene.add(this.particles.points);
    this.world.setDayPhase(this.store.dayPhase());
    this.player.reset(this.store.car(), this.store.difficulty(), this.store.route());
    this.traffic.reset(this.store.difficulty(), this.store.route());
    this.input.bind();

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.world.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.45, 0.5, 0.86);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    this.camera.position.set(0, 4.4, 8.5);
    this.camera.lookAt(0, 0.8, -14);
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.zone.runOutsideAngular(() => {
      this.last = performance.now();
      const tick = (now: number) => {
        requestAnimationFrame(tick);
        const dt = Math.min(0.05, (now - this.last) / 1000);
        this.last = now;
        this.frame(dt);
      };
      requestAnimationFrame(tick);
    });
  }

  /** Puts the chosen road up, so the menu's background is the road about to be driven. */
  setRoute(): void {
    this.world.setRoute(this.store.route());
    this.traffic.reset(this.store.difficulty(), this.store.route());
    this.player.reset(this.store.car(), this.store.difficulty(), this.store.route());
    this.store.dayPhase.set(this.store.route().startPhase);
  }

  /** Called when a run starts; the facade owns the store transitions. */
  beginRun(onEnded: () => void): void {
    this.onRunEnded = onEnded;
    if (this.world.route.id !== this.store.route().id) this.world.setRoute(this.store.route());
    this.player.reset(this.store.car(), this.store.difficulty(), this.store.route());
    this.traffic.reset(this.store.difficulty(), this.store.route());
    this.world.setDayPhase(this.store.dayPhase());
    this.audio.startEngine();
  }

  private frame(dt: number): void {
    if (!this.renderer || !this.composer) return;
    const status = this.store.status();

    if (status === 'playing') {
      this.simulate(dt);
    } else if (status === 'menu' || status === 'map') {
      // The menu's background: a slow empty road.
      this.idleSpeed += (40 - this.idleSpeed) * dt;
      this.world.advance(mps(this.idleSpeed) * dt, dt);
      this.player.update(dt, 0, false, false, this.world.isNight);
      this.particles.update(dt, mps(this.idleSpeed));
      this.audio.stopEngine();
    } else {
      this.audio.stopEngine();
    }

    this.placeCamera(dt);
    if (this.store.quality() === 'high') this.composer.render();
    else this.renderer.render(this.world.scene, this.camera);
  }

  private simulate(dt: number): void {
    if (this.input.consume('pauseRequest')) {
      this.store.pause();
      return;
    }
    const flick = this.input.consumeFlick();
    if (flick !== 0) this.player.flick(flick);
    if (this.input.consume('hornRequest')) this.audio.horn();
    if (this.input.consume('nitroRequest') && this.store.nitro() >= 1 && !this.player.nitroActive) {
      this.player.fireNitro();
      this.store.nitro.set(0);
      this.store.nitroActive.set(true);
      this.store.push('nitro', 'نيترو!');
      this.audio.nitroBurst();
    }

    const night = this.world.isNight;
    this.player.update(dt, this.input.steer(), this.input.accelerate(), this.input.brake(), night);
    if (!this.player.nitroActive && this.store.nitroActive()) this.store.nitroActive.set(false);
    if (this.player.offRoad !== this.store.offRoad()) {
      this.store.offRoad.set(this.player.offRoad);
      this.audio.gravel(this.player.offRoad);
    }

    const metres = mps(this.player.speed) * dt;
    this.world.advance(metres, dt);

    const out = this.traffic.update(
      dt,
      { x: this.player.x, width: this.player.spec.width, length: this.player.spec.length, speed: this.player.speed, invulnerable: this.player.invulnerable > 0 },
      night,
    );

    // ---- particles ----
    const back = this.player.spec.length / 2;
    if (this.player.offRoad && this.player.speed > 20) {
      this.particles.emit(3, this.player.x, 0.1, back, this.dust, 1.2, 2.5, 4, 0.8);
    }
    if (this.player.nitroActive) {
      this.particles.emit(4, this.player.x, 0.4, back, this.flame, 0.6, 0.5, 14, 0.35);
    }
    this.particles.update(dt, mps(this.player.speed));

    // ---- bookkeeping ----
    const distance = this.store.distance() + metres;
    this.store.distance.set(distance);
    this.store.speed.set(Math.round(this.player.speed));
    if (this.player.speed > this.store.topSpeed()) this.store.topSpeed.set(Math.round(this.player.speed));
    this.store.cleanStreak.update((s) => s + metres);

    const level = 1 + Math.floor(distance / LEVEL_METRES);
    if (level !== this.store.level()) {
      this.store.level.set(level);
      this.traffic.setLevel(level);
      this.store.push('level', `كيلو ${Math.round(distance / 1000 * 10) / 10} — الزحمة بتزيد`);
    }

    const phase = (this.store.dayPhase() + dt / DAY_SECONDS) % 1;
    this.store.dayPhase.set(phase);
    this.world.setDayPhase(phase);
    if (this.bloom) this.bloom.strength = night ? 0.7 : 0.35;

    const starsBefore = this.store.stars();

    if (out.coins) {
      this.store.coins.update((c) => c + out.coins);
      this.store.push('coin', `+${out.coins * 10}`, out.coins * 10);
      this.audio.coin();
    }
    if (out.nitroCans) {
      this.store.nitro.set(1);
      this.store.push('nitro', 'نيترو جاهز');
      this.audio.coin();
    }
    if (out.nearMisses) {
      this.store.nearMisses.update((n) => n + out.nearMisses);
      this.store.nitro.update((n) => Math.min(1, n + 0.25 * out.nearMisses));
      this.store.push('nearMiss', 'حرفنة! +50', 50);
      this.audio.nearMiss();
    }
    for (const h of out.honks) this.audio.hornOf(h.kind, h.dx);
    if (out.fines) {
      this.store.coins.update((c) => Math.max(0, c - 10));
      this.store.push('fine', `رادار ${out.radarLimit} — مخالفة`, -100);
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
    if (out.sand) {
      this.player.bump(0.4);
      this.player.flick(Math.random() < 0.5 ? -0.6 : 0.6);
      this.particles.emit(20, this.player.x, 0.2, 0, this.dust, 2.5, 3, 3, 1);
      this.store.push('bump', 'رمل على الطريق!');
    }
    if (out.hits) {
      this.player.takeHit(out.hitFromX);
      this.store.lives.update((l) => l - 1);
      this.store.bestClean.update((b) => Math.max(b, this.store.cleanStreak()));
      this.store.cleanStreak.set(0);
      this.store.push('hit', 'خبطة!');
      this.audio.crash();
      this.particles.emit(30, this.player.x, 0.8, -this.player.spec.length / 2, this.spark, 2, 6, 2, 0.7);
      if (this.store.lives() <= 0) {
        this.endRun();
        return;
      }
    }

    const starsAfter = this.store.stars();
    if (starsAfter > starsBefore) {
      const done = this.store.objectives().filter((o) => o.done);
      this.store.push('mission', `⭐ ${done[done.length - 1]?.text ?? ''}`);
      this.audio.coin();
    }

    if (this.store.mode() === 'timed') {
      const left = Math.max(0, this.store.timeLeft() - dt);
      this.store.timeLeft.set(left);
      if (left <= 0) {
        this.endRun();
        return;
      }
    }

    this.audio.engine(this.player.speed, this.player.nitroActive, this.traffic.audible(this.player.x));
  }

  private endRun(): void {
    this.store.bestClean.update((b) => Math.max(b, this.store.cleanStreak()));
    this.audio.stopEngine();
    this.store.endRun();
    this.onRunEnded?.();
  }

  private placeCamera(dt: number): void {
    const targetX = this.player.x * 0.45;
    this.camera.position.x += (targetX - this.camera.position.x) * Math.min(1, dt * 5);
    const speedPull = (this.player.speed / 200) * 1.4;
    this.camera.position.z += (8.5 + speedPull - this.camera.position.z) * Math.min(1, dt * 2);
    const shake = this.player.shake;
    const sx = (Math.random() - 0.5) * shake * 0.5;
    const sy = (Math.random() - 0.5) * shake * 0.3;
    this.camera.position.y = 4.4 + sy;
    this.camera.lookAt(this.player.x * 0.45 + sx + this.player.heading * 2, 0.8, -14);
    this.camera.rotation.z += this.player.heading * 0.04;
    this.camera.fov = 62 + (this.player.nitroActive ? 10 : 0) + this.player.speed * 0.04;
    this.camera.updateProjectionMatrix();
  }

  private resize(): void {
    if (!this.renderer || !this.composer) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}
