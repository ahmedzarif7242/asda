import { Injectable, inject } from '@angular/core';

import { Audible } from '../engine/traffic.service';
import { TrafficKind } from '../model/game.types';
import { GameStore } from '../state/game.store';
import { Mahraganat } from './mahraganat';

interface Voice {
  osc: OscillatorNode;
  sub: OscillatorNode;
  noise: AudioBufferSourceNode;
  noiseGain: GainNode;
  filter: BiquadFilterNode;
  gain: GainNode;
  pan: StereoPannerNode;
  kind: TrafficKind | 'player';
}

/** Recordings the game will use if they are put beside it — see the README. */
const FILES = {
  engine: 'sounds/engine.ogg',
  horn: 'sounds/horn.ogg',
  radio: 'sounds/radio.ogg',
};

/**
 * Every sound, made on the spot — or played from a recording when one is provided.
 *
 * No audio files ship with the game: an engine is layered oscillators whose pitch climbs
 * through gears with the speed, a diesel is a knock of filtered noise on top, a tuktuk is a
 * two-stroke putter, and the radio in the tuktuk is a mahraganat beat written in code. Every
 * vehicle near the player has its own voice, panned to where it is and faded by how far.
 *
 * If `public/sounds/engine.ogg`, `horn.ogg` or `radio.ogg` exist, they are used instead of
 * the synth for the player's car, the player's horn and the tuktuk radio.
 */
@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly store = inject(GameStore);
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private player: Voice | null = null;
  private nitroOsc: OscillatorNode | null = null;
  private nitroGain: GainNode | null = null;
  private readonly voices = new Map<string, Voice>();
  private radio: Mahraganat | null = null;
  private radioGain: GainNode | null = null;
  private radioPan: StereoPannerNode | null = null;
  private readonly samples: Partial<Record<keyof typeof FILES, AudioBuffer>> = {};
  private engineSample: AudioBufferSourceNode | null = null;
  private radioSample: AudioBufferSourceNode | null = null;
  private lastHorn = 0;

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
    this.master.gain.value = 0.55;
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 4;
    this.master.connect(comp).connect(this.ctx.destination);

    const seconds = 2;
    this.noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * seconds, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    void this.loadSamples();
  }

  startEngine(): void {
    if (!this.ctx || !this.master || this.player) return;
    this.player = this.voice('player', this.store.car().id === 'microbus' ? 'microbus' : this.store.car().id === 'jeep' ? 'truck' : 'car');

    const nitro = this.ctx.createOscillator();
    nitro.type = 'triangle';
    nitro.frequency.value = 180;
    const nitroGain = this.ctx.createGain();
    nitroGain.gain.value = 0;
    nitro.connect(nitroGain).connect(this.master);
    nitro.start();
    this.nitroOsc = nitro;
    this.nitroGain = nitroGain;

    if (this.samples.engine && !this.engineSample) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.samples.engine;
      src.loop = true;
      src.connect(this.player.gain);
      src.start();
      this.engineSample = src;
    }
  }

  /** Called every frame with the player's speed and whatever is near enough to hear. */
  engine(speedKmh: number, nitro: boolean, nearby: Audible[]): void {
    if (!this.ctx || !this.player || !this.nitroGain || !this.master) return;
    const t = this.ctx.currentTime;
    const muted = this.store.muted() || this.store.status() !== 'playing';

    if (this.engineSample) {
      this.engineSample.playbackRate.setTargetAtTime(0.6 + speedKmh / 160, t, 0.1);
      this.player.osc.frequency.setTargetAtTime(0, t, 0.1);
      this.player.gain.gain.setTargetAtTime(muted ? 0 : 0.35, t, 0.1);
    } else {
      this.drive(this.player, speedKmh, muted ? 0 : 0.16 + speedKmh / 900, 0, t, true);
    }
    this.nitroGain.gain.setTargetAtTime(muted || !nitro ? 0 : 0.06, t, 0.05);
    if (this.nitroOsc) this.nitroOsc.frequency.setTargetAtTime(160 + speedKmh, t, 0.1);

    // ---- the others ----
    const heard = new Set<string>();
    let radioFrom: Audible | null = null;
    nearby.slice(0, 4).forEach((a, i) => {
      const id = `${a.kind}-${i}`;
      heard.add(id);
      let v = this.voices.get(id);
      if (!v || v.kind !== a.kind) {
        v?.gain.disconnect();
        v = this.voice(id, a.kind);
        this.voices.set(id, v);
      }
      const dist = Math.hypot(a.dx, a.dz);
      const vol = muted ? 0 : Math.max(0, 0.22 - dist / 180);
      this.drive(v, a.speed, vol, a.dx, t, false);
      if (a.radio && (!radioFrom || dist < Math.hypot(radioFrom.dx, radioFrom.dz))) radioFrom = a;
    });
    for (const [id, v] of this.voices) {
      if (!heard.has(id)) v.gain.gain.setTargetAtTime(0, t, 0.2);
    }

    // ---- the radio in the tuktuk ----
    if (!this.radioGain || !this.radioPan) {
      this.radioGain = this.ctx.createGain();
      this.radioGain.gain.value = 0;
      this.radioPan = this.ctx.createStereoPanner();
      this.radioGain.connect(this.radioPan).connect(this.master);
    }
    const from = radioFrom as Audible | null;
    if (from) {
      const dist = Math.hypot(from.dx, from.dz);
      const vol = muted ? 0 : Math.max(0, 0.5 - dist / 70);
      this.radioGain.gain.setTargetAtTime(vol, t, 0.15);
      this.radioPan.pan.setTargetAtTime(Math.max(-1, Math.min(1, from.dx / 8)), t, 0.1);
      if (this.samples.radio) {
        if (!this.radioSample) {
          const src = this.ctx.createBufferSource();
          src.buffer = this.samples.radio;
          src.loop = true;
          src.connect(this.radioGain);
          src.start();
          this.radioSample = src;
        }
      } else {
        if (!this.radio) this.radio = new Mahraganat(this.ctx, this.radioGain);
        this.radio.play();
      }
    } else {
      this.radioGain.gain.setTargetAtTime(0, t, 0.3);
      this.radio?.pauseSoon();
    }
  }

  stopEngine(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.player?.gain.gain.setTargetAtTime(0, t, 0.05);
    this.nitroGain?.gain.setTargetAtTime(0, t, 0.05);
    for (const v of this.voices.values()) v.gain.gain.setTargetAtTime(0, t, 0.05);
    this.radioGain?.gain.setTargetAtTime(0, t, 0.1);
    this.radio?.pauseSoon();
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

  /** The player's own horn: the car's kind decides the voice. */
  horn(): void {
    const id = this.store.car().id;
    this.hornOf(id === 'microbus' ? 'microbus' : id === 'jeep' ? 'truck' : 'car', 0);
  }

  /** A horn from the traffic, from where that vehicle is. */
  hornOf(kind: TrafficKind, dx: number): void {
    if (!this.ctx || !this.master || this.store.muted()) return;
    const t = this.ctx.currentTime;
    if (t - this.lastHorn < 0.15) return;
    this.lastHorn = t;

    if (this.samples.horn && dx === 0) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.samples.horn;
      src.connect(this.master);
      src.start(t);
      return;
    }

    const pan = this.ctx.createStereoPanner();
    pan.pan.value = Math.max(-1, Math.min(1, dx / 8));
    const out = this.ctx.createGain();
    out.gain.value = dx === 0 ? 1 : 0.6;
    out.connect(pan).connect(this.master);

    const tone = (f: number, type: OscillatorType, start: number, len: number, vol: number, slide = 0) => {
      const o = this.ctx!.createOscillator();
      o.type = type;
      o.frequency.setValueAtTime(f, t + start);
      if (slide) o.frequency.linearRampToValueAtTime(f + slide, t + start + len);
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.0001, t + start);
      g.gain.exponentialRampToValueAtTime(vol, t + start + 0.015);
      g.gain.setValueAtTime(vol, t + start + len - 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + start + len);
      o.connect(g).connect(out);
      o.start(t + start);
      o.stop(t + start + len + 0.02);
    };

    switch (kind) {
      case 'truck':
      case 'bus':
        // An air horn: two low tones, a slow swell, a long hold.
        tone(146, 'sawtooth', 0, 0.9, 0.09);
        tone(185, 'sawtooth', 0, 0.9, 0.07);
        tone(110, 'square', 0, 0.9, 0.04);
        break;
      case 'microbus': {
        // The musical horn. Every microbus has one; every microbus uses it.
        const notes = [523, 659, 784, 659, 523, 784];
        notes.forEach((f, i) => tone(f, 'square', i * 0.11, 0.1, 0.06));
        break;
      }
      case 'tuktuk':
        tone(880, 'square', 0, 0.12, 0.05);
        tone(880, 'square', 0.16, 0.12, 0.05);
        tone(1100, 'square', 0.32, 0.22, 0.05);
        break;
      case 'tractor':
        tone(220, 'square', 0, 0.5, 0.05);
        break;
      case 'car':
      default:
        // Two notes a fourth apart, a touch of detune so it is not a pure electronic beep.
        tone(392, 'square', 0, 0.38, 0.06);
        tone(523, 'square', 0, 0.38, 0.05);
        tone(394, 'sawtooth', 0, 0.38, 0.02);
        break;
    }
  }

  crash(): void {
    if (!this.ctx || !this.master || !this.noiseBuffer || this.store.muted()) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, t);
    filter.frequency.exponentialRampToValueAtTime(200, t + 0.4);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.7, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    src.connect(filter).connect(g).connect(this.master);
    src.start(t);
    src.stop(t + 0.5);
    // The thud under the crunch.
    this.blip(80, 30, 0.3, 'sine', 0.5);
    // Glass.
    for (let i = 0; i < 5; i++) this.blip(2400 + Math.random() * 2000, 1800, 0.05, 'triangle', 0.03);
  }

  bump(): void {
    this.blip(90, 60, 0.18, 'sine', 0.25);
  }

  /** The gravel under the tyres, while off the road. */
  gravel(on: boolean): void {
    if (!this.player) return;
    const t = this.ctx!.currentTime;
    this.player.noiseGain.gain.setTargetAtTime(on ? 0.12 : this.noiseFor(this.player.kind), t, 0.1);
  }

  private async loadSamples(): Promise<void> {
    if (!this.ctx) return;
    for (const [key, url] of Object.entries(FILES) as [keyof typeof FILES, string][]) {
      try {
        const res = await fetch(url);
        if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('audio')) continue;
        this.samples[key] = await this.ctx.decodeAudioData(await res.arrayBuffer());
      } catch {
        /* no recording there: the synth stays */
      }
    }
  }

  private voice(id: string, kind: TrafficKind | 'player'): Voice {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = kind === 'tuktuk' ? 'square' : 'sawtooth';
    const sub = ctx.createOscillator();
    sub.type = 'triangle';
    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    noise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = this.noiseFor(kind);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = kind === 'tuktuk' ? 900 : kind === 'car' || kind === 'player' ? 420 : 260;
    filter.Q.value = 1.2;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const pan = ctx.createStereoPanner();
    osc.connect(filter);
    sub.connect(filter);
    noise.connect(noiseGain).connect(filter);
    filter.connect(gain).connect(pan).connect(this.master!);
    osc.start();
    sub.start();
    noise.start();
    void id;
    return { osc, sub, noise, noiseGain, filter, gain, pan, kind };
  }

  private noiseFor(kind: TrafficKind | 'player'): number {
    return kind === 'truck' || kind === 'bus' || kind === 'tractor' ? 0.09 : kind === 'microbus' ? 0.06 : kind === 'tuktuk' ? 0.04 : 0.025;
  }

  /** Sets a voice's pitch and loudness from a speed, through gears. */
  private drive(v: Voice, speedKmh: number, vol: number, dx: number, t: number, player: boolean): void {
    // Five gears: revs climb through each and drop at the shift, like an engine does.
    const gears = [0, 25, 50, 85, 125, 400];
    let g = 0;
    while (g < gears.length - 2 && speedKmh > gears[g + 1]) g++;
    const inGear = (speedKmh - gears[g]) / (gears[g + 1] - gears[g]);
    const rpm = 0.25 + inGear * 0.75;

    let base: number;
    let am = 0;
    switch (v.kind) {
      case 'tuktuk':
        base = 70 + rpm * 60;
        am = 18 + rpm * 20; // the two-stroke putter
        break;
      case 'truck':
      case 'bus':
      case 'tractor':
        base = 32 + rpm * 28;
        am = 8 + rpm * 6; // diesel knock
        break;
      case 'microbus':
        base = 42 + rpm * 40;
        am = 10 + rpm * 8;
        break;
      case 'car':
      case 'player':
      default:
        base = 48 + rpm * 70;
        break;
    }
    v.osc.frequency.setTargetAtTime(base, t, player ? 0.06 : 0.12);
    v.sub.frequency.setTargetAtTime(base / 2, t, 0.1);
    v.filter.frequency.setTargetAtTime((v.kind === 'tuktuk' ? 600 : 220) + rpm * 500, t, 0.1);
    // Amplitude modulation faked by nudging the gain at the knock rate.
    const knock = am ? 1 - 0.25 * (0.5 + 0.5 * Math.sin(t * am * Math.PI * 2)) : 1;
    v.gain.gain.setTargetAtTime(vol * knock, t, 0.04);
    v.pan.pan.setTargetAtTime(Math.max(-1, Math.min(1, dx / 8)), t, 0.1);
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
