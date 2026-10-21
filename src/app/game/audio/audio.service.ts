import { Injectable, inject } from '@angular/core';

import { GameStore } from '../state/game.store';

/**
 * Every sound, made on the spot.
 *
 * No audio files: an engine is a low sawtooth whose pitch follows the speed, a horn is two
 * detuned squares, a coin is a rising sine, a hit is filtered noise. It all weighs nothing and
 * it all starts the instant the player taps, which is when a browser first allows sound.
 */
@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly store = inject(GameStore);
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private nitroOsc: OscillatorNode | null = null;
  private nitroGain: GainNode | null = null;

  /** Must be called from a user gesture the first time. */
  unlock(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.5;
    this.master.connect(this.ctx.destination);
  }

  startEngine(): void {
    if (!this.ctx || !this.master || this.engineOsc) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 50;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 320;
    const gain = this.ctx.createGain();
    gain.gain.value = 0;
    osc.connect(filter).connect(gain).connect(this.master);
    osc.start();
    this.engineOsc = osc;
    this.engineGain = gain;

    const nitro = this.ctx.createOscillator();
    nitro.type = 'triangle';
    nitro.frequency.value = 180;
    const nitroGain = this.ctx.createGain();
    nitroGain.gain.value = 0;
    nitro.connect(nitroGain).connect(this.master);
    nitro.start();
    this.nitroOsc = nitro;
    this.nitroGain = nitroGain;
  }

  /** Called every frame with the current speed. */
  engine(speedKmh: number, nitro: boolean): void {
    if (!this.ctx || !this.engineOsc || !this.engineGain || !this.nitroGain) return;
    const t = this.ctx.currentTime;
    const muted = this.store.muted() || this.store.status() !== 'playing';
    const pitch = 45 + speedKmh * 0.9;
    this.engineOsc.frequency.setTargetAtTime(pitch, t, 0.08);
    this.engineGain.gain.setTargetAtTime(muted ? 0 : 0.06 + speedKmh / 1400, t, 0.1);
    this.nitroGain.gain.setTargetAtTime(muted || !nitro ? 0 : 0.05, t, 0.05);
    if (this.nitroOsc) this.nitroOsc.frequency.setTargetAtTime(160 + speedKmh, t, 0.1);
  }

  stopEngine(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.engineGain?.gain.setTargetAtTime(0, t, 0.05);
    this.nitroGain?.gain.setTargetAtTime(0, t, 0.05);
  }

  coin(): void {
    this.blip(880, 1320, 0.09, 'sine', 0.12);
  }

  nearMiss(): void {
    this.blip(520, 760, 0.12, 'triangle', 0.1);
  }

  nitroBurst(): void {
    this.blip(120, 480, 0.35, 'sawtooth', 0.12);
  }

  fine(): void {
    this.blip(440, 220, 0.3, 'square', 0.08);
  }

  horn(): void {
    if (!this.ctx || !this.master || this.store.muted()) return;
    const t = this.ctx.currentTime;
    for (const f of [392, 466]) {
      const o = this.ctx.createOscillator();
      o.type = 'square';
      o.frequency.value = f;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.07, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      o.connect(g).connect(this.master);
      o.start(t);
      o.stop(t + 0.4);
    }
  }

  crash(): void {
    if (!this.ctx || !this.master || this.store.muted()) return;
    const t = this.ctx.currentTime;
    const length = Math.floor(this.ctx.sampleRate * 0.4);
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2;
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    const g = this.ctx.createGain();
    g.gain.value = 0.5;
    src.connect(filter).connect(g).connect(this.master);
    src.start(t);
  }

  bump(): void {
    this.blip(90, 60, 0.18, 'sine', 0.25);
  }

  private blip(from: number, to: number, seconds: number, type: OscillatorType, volume: number): void {
    if (!this.ctx || !this.master || this.store.muted()) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(from, t);
    o.frequency.exponentialRampToValueAtTime(to, t + seconds);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(volume, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + seconds);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + seconds + 0.02);
  }
}
