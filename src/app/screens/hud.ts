import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GameService } from '../game/game.service';

@Component({
  selector: 'app-hud',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="top">
      <div class="stat score"><small>النقط</small><b>{{ store.score() }}</b></div>
      <div class="stat"><small>كم</small><b>{{ store.distanceKm() }}</b></div>
      <div class="stat"><small>فكة</small><b>{{ store.coins() }}</b></div>
      @if (store.mode() === 'timed') {
        <div class="stat time" [class.low]="store.timeLeft() < 10"><small>الوقت</small><b>{{ store.timeLeft() | number: '1.0-0' }}</b></div>
      }
      <button type="button" class="pause" (click)="game.pause()" aria-label="وقّف">❚❚</button>
    </div>

    <div class="lives" aria-label="الكاوتش">
      @for (i of lifeSlots(); track i) {
        <span class="tire" [class.gone]="i >= store.lives()"></span>
      }
    </div>

    <div class="events" aria-live="polite">
      @for (e of store.events(); track e.id) {
        <p class="event" [class]="'event ' + e.kind">{{ e.text }}</p>
      }
    </div>

    <div class="bottom">
      <div class="speedo" [class.nitro]="store.nitroActive()">
        <b>{{ store.speed() }}</b><small>كم/س</small>
      </div>
      <div class="nitro-bar" [class.ready]="store.nitro() >= 1">
        <i [style.width.%]="store.nitro() * 100"></i>
        <span>{{ store.nitro() >= 1 ? 'نيترو جاهز' : 'نيترو' }}</span>
      </div>
    </div>

    <div class="touch">
      <button type="button" class="pad" (pointerdown)="game.steer(-1)" aria-label="شمال">‹</button>
      <button type="button" class="pad gas" (pointerdown)="game.hold('accelerate', true)" (pointerup)="game.hold('accelerate', false)" (pointercancel)="game.hold('accelerate', false)" (pointerleave)="game.hold('accelerate', false)" aria-label="بنزين">▲</button>
      <button type="button" class="pad brake" (pointerdown)="game.hold('brake', true)" (pointerup)="game.hold('brake', false)" (pointercancel)="game.hold('brake', false)" (pointerleave)="game.hold('brake', false)" aria-label="فرامل">▼</button>
      <button type="button" class="pad boost" [disabled]="store.nitro() < 1" (pointerdown)="game.nitro()" aria-label="نيترو">⚡</button>
      <button type="button" class="pad" (pointerdown)="game.steer(1)" aria-label="يمين">›</button>
    </div>
  `,
  styles: `
    :host { position: fixed; inset: 0; pointer-events: none; display: block; direction: rtl; }
    .top { position: absolute; top: max(.6rem, env(safe-area-inset-top)); inset-inline: .75rem; display: flex; gap: .5rem; align-items: stretch; }
    .stat { pointer-events: none; display: grid; justify-items: center; padding: .35rem .75rem; border-radius: 14px; background: rgba(8,10,24,.55); backdrop-filter: blur(8px); color: #fff; min-width: 4rem; }
    .stat small { font-size: .62rem; color: var(--ink-2); letter-spacing: .08em; }
    .stat b { font-family: var(--mono); font-size: 1.15rem; line-height: 1.2; }
    .score b { color: var(--gold); }
    .time.low b { color: #ff5252; animation: blink .5s steps(2) infinite; }
    .pause { pointer-events: auto; margin-inline-start: auto; font: inherit; width: 2.6rem; border-radius: 14px; border: 0; background: rgba(8,10,24,.55); color: #fff; cursor: pointer; backdrop-filter: blur(8px); }
    .lives { position: absolute; top: 4.2rem; inset-inline-end: .85rem; display: flex; gap: .3rem; }
    .tire { width: 1rem; height: 1rem; border-radius: 50%; background: #222; border: .28rem solid #d0d0d0; box-shadow: 0 2px 6px rgba(0,0,0,.5); transition: .3s; }
    .tire.gone { opacity: .2; transform: scale(.8); }
    .events { position: absolute; top: 28%; inset-inline: 0; display: grid; justify-items: center; gap: .3rem; }
    .event { margin: 0; font-family: var(--display); font-size: 1.5rem; color: #fff; text-shadow: 0 3px 12px rgba(0,0,0,.6); animation: pop 1.8s ease-out forwards; }
    .event.coin { color: var(--gold); font-size: 1.2rem; }
    .event.nearMiss { color: #7cf5b4; }
    .event.fine, .event.hit { color: #ff6b6b; font-size: 1.9rem; }
    .event.bump { color: #ffd166; }
    .event.nitro { color: #4de3ff; }
    .event.level { color: #fff; font-size: 1.05rem; font-family: var(--mono); }
    .bottom { position: absolute; bottom: calc(5.4rem + env(safe-area-inset-bottom)); inset-inline: .75rem; display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; }
    .speedo { display: flex; align-items: baseline; gap: .3rem; color: #fff; text-shadow: 0 3px 12px rgba(0,0,0,.6); transition: color .2s; }
    .speedo b { font-family: var(--mono); font-size: 2.6rem; line-height: 1; }
    .speedo small { color: var(--ink-2); }
    .speedo.nitro b { color: #4de3ff; }
    .nitro-bar { position: relative; flex: 1; max-width: 12rem; height: 1.3rem; border-radius: 999px; background: rgba(8,10,24,.55); overflow: hidden; border: 1px solid rgba(255,255,255,.18); }
    .nitro-bar i { position: absolute; inset: 0 auto 0 0; background: linear-gradient(90deg, #00bcd4, #4de3ff); transition: width .2s; }
    .nitro-bar.ready i { animation: blink .6s steps(2) infinite; }
    .nitro-bar span { position: relative; display: block; text-align: center; font-size: .65rem; line-height: 1.3rem; color: #fff; letter-spacing: .08em; }
    .touch { position: absolute; bottom: max(.75rem, env(safe-area-inset-bottom)); inset-inline: .75rem; display: none; gap: .5rem; }
    .pad { pointer-events: auto; flex: 1; height: 4rem; border-radius: 18px; border: 0; font-size: 1.8rem; color: #fff; background: rgba(8,10,24,.55); backdrop-filter: blur(8px); touch-action: none; -webkit-user-select: none; user-select: none; }
    .pad:active { background: rgba(255,255,255,.25); }
    .pad.gas { background: rgba(46,125,50,.6); }
    .pad.brake { background: rgba(198,40,40,.6); }
    .pad.boost { background: rgba(0,188,212,.6); }
    .pad.boost:disabled { opacity: .35; }
    @media (hover: none) and (pointer: coarse) { .touch { display: flex; } }
    @media (hover: hover) { .bottom { bottom: 1rem; } }
    @keyframes pop { 0% { opacity: 0; transform: translateY(12px) scale(.9); } 12% { opacity: 1; transform: none; } 75% { opacity: 1; } 100% { opacity: 0; transform: translateY(-16px); } }
    @keyframes blink { 50% { opacity: .35; } }
  `,
  imports: [DecimalPipe],
})
export class Hud {
  readonly game = inject(GameService);
  readonly store = this.game.store;

  lifeSlots(): number[] {
    return Array.from({ length: this.store.maxLives() }, (_, i) => i);
  }
}
