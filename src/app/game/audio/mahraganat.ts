/**
 * The radio in the tuktuk, written in code.
 *
 * A mahraganat beat: a four-on-the-floor kick with the off-beat push, claps on two and four,
 * a darbuka tek on the sixteenths, a saw bass on the root, and a lead that noodles up and
 * down a Hijaz scale with the portamento the genre lives on. It is not a song, but from a
 * tuktuk going past at forty it is unmistakably the right radio station.
 *
 * Scheduled with a lookahead so the beat holds while the game loop stutters.
 */
export class Mahraganat {
  private readonly bpm = 104;
  private readonly lookahead = 0.12;
  private next = 0;
  private step = 0;
  private timer: number | null = null;
  private stopAt: number | null = null;
  private readonly out: GainNode;
  /** Hijaz on E, two octaves. */
  private readonly scale = [164.8, 174.6, 207.7, 220, 246.9, 261.6, 311.1, 329.6, 349.2, 415.3, 440, 493.9];
  private leadNote = 7;
  private phrase = 0;

  constructor(private readonly ctx: AudioContext, destination: AudioNode) {
    this.out = ctx.createGain();
    this.out.gain.value = 0.9;
    // A little of the radio's own box: a band-pass so it sounds like a speaker in a tuktuk.
    const box = ctx.createBiquadFilter();
    box.type = 'bandpass';
    box.frequency.value = 1400;
    box.Q.value = 0.5;
    this.out.connect(box).connect(destination);
  }

  play(): void {
    this.stopAt = null;
    if (this.timer !== null) return;
    this.next = this.ctx.currentTime + 0.05;
    this.timer = window.setInterval(() => this.schedule(), 40);
  }

  /** Lets the current bar finish, then stops. */
  pauseSoon(): void {
    if (this.timer === null || this.stopAt !== null) return;
    this.stopAt = this.ctx.currentTime + 1.2;
  }

  private schedule(): void {
    const stepLen = 60 / this.bpm / 4;
    while (this.next < this.ctx.currentTime + this.lookahead) {
      this.playStep(this.step % 32, this.next, stepLen);
      this.next += stepLen;
      this.step++;
    }
    if (this.stopAt !== null && this.ctx.currentTime > this.stopAt) {
      window.clearInterval(this.timer!);
      this.timer = null;
      this.stopAt = null;
    }
  }

  private playStep(s: number, t: number, len: number): void {
    const inBar = s % 16;
    // Kick: 1, the "and" of 2, 3 — the push that makes it mahraganat and not house.
    if (inBar === 0 || inBar === 6 || inBar === 8 || inBar === 14) this.kick(t);
    // Clap on 2 and 4, doubled on the last.
    if (inBar === 4 || inBar === 12) this.clap(t);
    if (inBar === 13 && s >= 16) this.clap(t, 0.5);
    // Darbuka tek on the off sixteenths.
    if (inBar % 2 === 1) this.tek(t, inBar % 4 === 3 ? 1 : 0.6);
    // Bass: root on the kicks, the flat second on the push.
    if (inBar === 0 || inBar === 8) this.bass(this.scale[0], t, len * 3);
    if (inBar === 6 || inBar === 14) this.bass(this.scale[1], t, len * 1.5);
    if (inBar === 11) this.bass(this.scale[2], t, len);
    // Lead: a new phrase every two bars, a step along the scale every other sixteenth.
    if (s === 0) this.phrase = (this.phrase + 1) % 4;
    if (inBar % 2 === 0 && (this.phrase !== 3 || inBar < 8)) {
      const move = [1, 1, -1, 2, -1, -2, 1, -1][(s / 2) % 8];
      this.leadNote = Math.max(3, Math.min(this.scale.length - 1, this.leadNote + move));
      this.lead(this.scale[this.leadNote], t, len * 1.9, this.phrase === 2);
    }
  }

  private kick(t: number): void {
    const o = this.ctx.createOscillator();
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    o.connect(g).connect(this.out);
    o.start(t);
    o.stop(t + 0.25);
  }

  private clap(t: number, vol = 1): void {
    for (let i = 0; i < 3; i++) {
      const o = this.ctx.createOscillator();
      o.type = 'square';
      o.frequency.value = 1800 + i * 400;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.12 * vol, t + i * 0.012);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.012 + 0.07);
      const f = this.ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = 2200;
      o.connect(f).connect(g).connect(this.out);
      o.start(t + i * 0.012);
      o.stop(t + i * 0.012 + 0.08);
    }
  }

  private tek(t: number, vol: number): void {
    const o = this.ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(900, t);
    o.frequency.exponentialRampToValueAtTime(500, t + 0.05);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.18 * vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    o.connect(g).connect(this.out);
    o.start(t);
    o.stop(t + 0.07);
  }

  private bass(f: number, t: number, len: number): void {
    const o = this.ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = f / 2;
    const o2 = this.ctx.createOscillator();
    o2.type = 'square';
    o2.frequency.value = f / 4;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, t);
    filter.frequency.exponentialRampToValueAtTime(180, t + len);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.35, t);
    g.gain.setValueAtTime(0.35, t + len * 0.7);
    g.gain.exponentialRampToValueAtTime(0.001, t + len);
    o.connect(filter);
    o2.connect(filter);
    filter.connect(g).connect(this.out);
    o.start(t);
    o2.start(t);
    o.stop(t + len);
    o2.stop(t + len);
  }

  private lead(f: number, t: number, len: number, vibrato: boolean): void {
    const o = this.ctx.createOscillator();
    o.type = 'sawtooth';
    // Portamento in from a note below: the slide is the whole sound of the genre.
    o.frequency.setValueAtTime(f * 0.94, t);
    o.frequency.exponentialRampToValueAtTime(f, t + 0.06);
    const o2 = this.ctx.createOscillator();
    o2.type = 'square';
    o2.frequency.value = f * 1.005;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.14, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + len);
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2600;
    if (vibrato) {
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 6;
      const depth = this.ctx.createGain();
      depth.gain.value = f * 0.02;
      lfo.connect(depth).connect(o.frequency);
      lfo.start(t);
      lfo.stop(t + len);
    }
    o.connect(filter);
    o2.connect(filter);
    filter.connect(g).connect(this.out);
    o.start(t);
    o2.start(t);
    o.stop(t + len);
    o2.stop(t + len);
  }
}
