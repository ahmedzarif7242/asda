import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GameService } from '../game/game.service';

@Component({
  selector: 'app-hud',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
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

    <div class="side">
      <div class="lives" aria-label="الكاوتش">
        @for (i of lifeSlots(); track i) {
          <span class="tire" [class.gone]="i >= store.lives()"></span>
        }
      </div>
      <ul class="missions">
        @for (o of store.objectives(); track o.text) {
          <li [class.done]="o.done">{{ o.done ? '⭐' : '☆' }} {{ o.text }}</li>
        }
      </ul>
    </div>

    <div class="events" aria-live="polite">
      @for (e of store.events(); track e.id) {
        <p [class]="'event ' + e.kind">{{ e.text }}</p>
      }
    </div>

    @if (store.offRoad()) {
      <p class="offroad">⚠ إنت على الطوار — ارجع للأسفلت</p>
    }

    <!-- The wheel, turning with the car. Decorative on a desk, the thing you watch on a phone. -->
    <svg class="wheel" viewBox="0 0 100 100" [style.transform]="'rotate(' + store.wheel() * 110 + 'deg)'" aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="none" stroke="#1a1a1f" stroke-width="11" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="#3a3a42" stroke-width="7" />
      <path d="M50 50 L50 10 M50 50 L16 68 M50 50 L84 68" stroke="#2a2a30" stroke-width="9" stroke-linecap="round" />
      <circle cx="50" cy="50" r="13" fill="#1f1f24" stroke="#4a4a52" stroke-width="2" />
      <circle cx="50" cy="50" r="5" fill="#ffc83d" />
      <path d="M50 10 a40 40 0 0 1 20 5" stroke="#ffc83d" stroke-width="4" fill="none" stroke-linecap="round" />
    </svg>

    <div class="dash">
      <div class="dial" [class.nitro]="store.nitroActive()">
        <svg viewBox="0 0 100 60" aria-hidden="true">
          <path d="M8 55 A45 45 0 0 1 92 55" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="6" stroke-linecap="round" />
          <path d="M8 55 A45 45 0 0 1 92 55" fill="none" [attr.stroke]="store.nitroActive() ? '#4de3ff' : '#ffc83d'" stroke-width="6" stroke-linecap="round"
                [attr.stroke-dasharray]="dial(store.speed()) + ' 200'" />
        </svg>
        <b>{{ store.speed() }}</b><small>كم/س</small>
        <span class="gear">{{ store.gear() }}</span>
      </div>
      <div class="nitro-bar" [class.ready]="store.nitro() >= 1">
        <i [style.width.%]="store.nitro() * 100"></i>
        <span>{{ store.nitro() >= 1 ? 'نيترو جاهز' : 'نيترو' }}</span>
      </div>
    </div>

    <!-- Touch: two big halves to steer, a thumb column for the pedals. -->
    <div class="touch">
      <button type="button" class="zone left" aria-label="لف شمال"
              (pointerdown)="game.hold('left', true)" (pointerup)="game.hold('left', false)" (pointercancel)="game.hold('left', false)" (pointerleave)="game.hold('left', false)">
        <span>‹</span><small>شمال</small>
      </button>
      <button type="button" class="zone right" aria-label="لف يمين"
              (pointerdown)="game.hold('right', true)" (pointerup)="game.hold('right', false)" (pointercancel)="game.hold('right', false)" (pointerleave)="game.hold('right', false)">
        <span>›</span><small>يمين</small>
      </button>
      <div class="pedals">
        <button type="button" class="pedal boost" [disabled]="store.nitro() < 1" (pointerdown)="game.nitro()" aria-label="نيترو">⚡<small>نيترو</small></button>
        <button type="button" class="pedal gas" [class.down]="store.throttle()" aria-label="بنزين"
                (pointerdown)="game.hold('accelerate', true)" (pointerup)="game.hold('accelerate', false)" (pointercancel)="game.hold('accelerate', false)" (pointerleave)="game.hold('accelerate', false)">
          <svg viewBox="0 0 40 70" aria-hidden="true"><rect x="4" y="2" width="32" height="66" rx="6" fill="#2a2a30" stroke="#55555e" stroke-width="2"/><g stroke="#8a8a94" stroke-width="2"><line x1="10" y1="14" x2="30" y2="14"/><line x1="10" y1="26" x2="30" y2="26"/><line x1="10" y1="38" x2="30" y2="38"/><line x1="10" y1="50" x2="30" y2="50"/></g></svg>
          <small>بنزين</small>
        </button>
        <button type="button" class="pedal brake" [class.down]="store.braking()" aria-label="فرامل"
                (pointerdown)="game.hold('brake', true)" (pointerup)="game.hold('brake', false)" (pointercancel)="game.hold('brake', false)" (pointerleave)="game.hold('brake', false)">
          <svg viewBox="0 0 50 40" aria-hidden="true"><rect x="3" y="3" width="44" height="34" rx="6" fill="#2a2a30" stroke="#55555e" stroke-width="2"/><g stroke="#8a8a94" stroke-width="2"><line x1="10" y1="12" x2="40" y2="12"/><line x1="10" y1="20" x2="40" y2="20"/><line x1="10" y1="28" x2="40" y2="28"/></g></svg>
          <small>فرامل</small>
        </button>
      </div>
      <button type="button" class="horn" (pointerdown)="game.horn()" aria-label="كلاكس">📣</button>
    </div>

    @if (game.isTouch && game.touchHint()) {
      <div class="hint" (click)="game.dismissHint()">
        <div class="card">
          <h3>إزاي تسوق</h3>
          <p><b>‹ شمال · يمين ›</b> — اضغط ومتسيبش على نص الشاشة اللي عايز تروحه، العربية بتلف طول ما إيدك عليه.</p>
          <p><b>▲ بنزين · ▼ فرامل</b> — على اليمين. لو سيبتهم العربية بتمشي لوحدها على سرعة مريحة.</p>
          <p><b>⚡ نيترو</b> — بيتملي من «الحرفنة»: كل ما تعدّي جنب عربية من غير ما تخبط.</p>
          <p><b>اسحب لفوق</b> في أي مكان = نيترو كمان.</p>
          <button type="button">فهمت، يلا</button>
        </div>
      </div>
    }
  `,
  styles: `
    :host { position: fixed; inset: 0; pointer-events: none; display: block; direction: rtl; }
    .top { position: absolute; top: max(.6rem, env(safe-area-inset-top)); inset-inline: .75rem; display: flex; gap: .5rem; align-items: stretch; }
    .stat { display: grid; justify-items: center; padding: .35rem .75rem; border-radius: 14px; background: rgba(8,10,24,.55); backdrop-filter: blur(8px); color: #fff; min-width: 4rem; }
    .stat small { font-size: .62rem; color: var(--ink-2); letter-spacing: .08em; }
    .stat b { font-family: var(--mono); font-size: 1.15rem; line-height: 1.2; }
    .score b { color: var(--gold); }
    .time.low b { color: #ff5252; animation: blink .5s steps(2) infinite; }
    .pause { pointer-events: auto; margin-inline-start: auto; font: inherit; width: 2.6rem; border-radius: 14px; border: 0; background: rgba(8,10,24,.55); color: #fff; cursor: pointer; backdrop-filter: blur(8px); }
    .side { position: absolute; top: 4.3rem; inset-inline-end: .85rem; display: grid; gap: .5rem; justify-items: end; }
    .lives { display: flex; gap: .3rem; }
    .tire { width: 1rem; height: 1rem; border-radius: 50%; background: #222; border: .28rem solid #d0d0d0; box-shadow: 0 2px 6px rgba(0,0,0,.5); transition: .3s; }
    .tire.gone { opacity: .2; transform: scale(.8); }
    .missions { margin: 0; padding: 0; list-style: none; display: grid; gap: .2rem; }
    .missions li { font-size: .68rem; color: var(--ink-2); background: rgba(8,10,24,.45); padding: .15rem .5rem; border-radius: 8px; }
    .missions li.done { color: var(--gold); }
    .events { position: absolute; top: 26%; inset-inline: 0; display: grid; justify-items: center; gap: .3rem; }
    .event { margin: 0; font-family: var(--display); font-size: 1.5rem; color: #fff; text-shadow: 0 3px 12px rgba(0,0,0,.6); animation: pop 1.8s ease-out forwards; }
    .event.coin { color: var(--gold); font-size: 1.2rem; }
    .event.nearMiss { color: #7cf5b4; }
    .event.fine, .event.hit { color: #ff6b6b; font-size: 1.9rem; }
    .event.bump { color: #ffd166; }
    .event.nitro { color: #4de3ff; }
    .event.mission { color: var(--gold); font-size: 1.2rem; }
    .event.level { color: #fff; font-size: 1.05rem; font-family: var(--mono); }
    .offroad { position: absolute; top: 42%; inset-inline: 0; margin: 0; text-align: center; font-family: var(--display); color: #ffd166; text-shadow: 0 2px 10px rgba(0,0,0,.7); animation: blink .6s steps(2) infinite; }
    .wheel { position: absolute; bottom: -2.2rem; left: 50%; width: 9.5rem; height: 9.5rem; margin-left: -4.75rem; transition: transform .08s linear; filter: drop-shadow(0 8px 16px rgba(0,0,0,.6)); opacity: .92; }
    .dash { position: absolute; bottom: 1.4rem; inset-inline-start: .75rem; display: grid; gap: .4rem; justify-items: start; direction: ltr; }
    .dial { position: relative; width: 8.5rem; color: #fff; text-shadow: 0 3px 12px rgba(0,0,0,.6); }
    .dial svg { width: 100%; display: block; }
    .dial b { position: absolute; left: 50%; bottom: .1rem; transform: translateX(-50%); font-family: var(--mono); font-size: 2.1rem; line-height: 1; }
    .dial small { position: absolute; left: 50%; bottom: -.9rem; transform: translateX(-50%); font-size: .6rem; color: var(--ink-2); letter-spacing: .1em; }
    .dial .gear { position: absolute; right: -1.4rem; bottom: .2rem; width: 1.6rem; height: 1.6rem; border-radius: 6px; background: rgba(8,10,24,.7); border: 1px solid rgba(255,255,255,.25); font-family: var(--mono); font-size: .95rem; display: grid; place-items: center; color: var(--gold); }
    .dial.nitro b { color: #4de3ff; }
    .nitro-bar { position: relative; width: 8.5rem; margin-top: 1rem; height: 1.1rem; border-radius: 999px; background: rgba(8,10,24,.55); overflow: hidden; border: 1px solid rgba(255,255,255,.18); }
    .nitro-bar i { position: absolute; inset: 0 auto 0 0; background: linear-gradient(90deg, #00bcd4, #4de3ff); transition: width .2s; }
    .nitro-bar.ready i { animation: blink .6s steps(2) infinite; }
    .nitro-bar span { position: relative; display: block; text-align: center; font-size: .65rem; line-height: 1.3rem; color: #fff; letter-spacing: .08em; }

    .touch { display: none; }
    @media (hover: none) and (pointer: coarse) {
      .touch { display: block; }
      .dash { bottom: calc(10rem + env(safe-area-inset-bottom)); }
      .wheel { bottom: calc(.4rem + env(safe-area-inset-bottom)); width: 8rem; height: 8rem; margin-left: -4rem; pointer-events: none; }
      .zone { pointer-events: auto; position: absolute; bottom: 0; top: 55%; width: 50%; border: 0; background: transparent; color: rgba(255,255,255,.55); font: inherit;
              display: grid; place-content: end center; padding-bottom: calc(1rem + env(safe-area-inset-bottom)); touch-action: none; -webkit-user-select: none; user-select: none; }
      .zone span { font-size: 4rem; line-height: 1; }
      .zone small { font-family: var(--display); font-size: .8rem; letter-spacing: .1em; }
      .zone.left { left: 0; }
      .zone.right { right: 0; }
      .zone:active { background: linear-gradient(0deg, rgba(255,255,255,.14), transparent); color: #fff; }
      .pedals { pointer-events: auto; position: absolute; inset-inline-end: .75rem; bottom: calc(1rem + env(safe-area-inset-bottom)); display: grid; gap: .5rem; width: 5.6rem; }
      .pedal { height: 4.6rem; border-radius: 14px; border: 0; background: transparent; color: #fff; display: grid; place-items: center; gap: .1rem; line-height: 1; padding: 0;
               touch-action: none; -webkit-user-select: none; user-select: none; filter: drop-shadow(0 6px 10px rgba(0,0,0,.6)); transition: transform .08s; }
      .pedal svg { height: 3.4rem; width: auto; }
      .pedal small { font-family: var(--display); font-size: .68rem; color: var(--ink-2); }
      .pedal.gas svg { height: 4rem; }
      .pedal.brake { height: 3.6rem; }
      .pedal.down { transform: scale(.92) translateY(3px); }
      .pedal.down svg rect { stroke: #ffc83d; }
      .pedal.boost { height: 3.2rem; border-radius: 999px; background: rgba(0,188,212,.75); font-size: 1.3rem; border: 2px solid rgba(255,255,255,.3); }
      .pedal.boost:disabled { opacity: .35; }
      .horn { pointer-events: auto; position: absolute; inset-inline-start: .75rem; bottom: calc(9.5rem + env(safe-area-inset-bottom)); width: 3rem; height: 3rem; border-radius: 50%; border: 2px solid rgba(255,255,255,.25); background: rgba(8,10,24,.6); font-size: 1.2rem; }
      .hint { pointer-events: auto; position: absolute; inset: 0; display: grid; place-items: center; background: rgba(8,10,24,.7); backdrop-filter: blur(6px); }
    }
    .card { width: min(90vw, 22rem); padding: 1.3rem; border-radius: 20px; background: rgba(20,22,44,.95); border: 1px solid rgba(255,255,255,.14); color: #fff; display: grid; gap: .6rem; }
    .card h3 { margin: 0; font-family: var(--display); font-size: 1.5rem; color: var(--gold); }
    .card p { margin: 0; font-size: .9rem; line-height: 1.6; color: var(--ink-2); }
    .card b { color: #fff; }
    .card button { font: inherit; font-family: var(--display); font-size: 1.1rem; padding: .7rem; border-radius: 14px; border: 0; background: linear-gradient(180deg, #ffd666, #f2b01e); color: #1b1200; }
    @keyframes pop { 0% { opacity: 0; transform: translateY(12px) scale(.9); } 12% { opacity: 1; transform: none; } 75% { opacity: 1; } 100% { opacity: 0; transform: translateY(-16px); } }
    @keyframes blink { 50% { opacity: .35; } }
  `,
})
export class Hud {
  readonly game = inject(GameService);
  readonly store = this.game.store;

  /** Dash length of the speed arc, 0..132 for 0..200 km/h. */
  dial(speed: number): number {
    return Math.min(132, (speed / 200) * 132);
  }

  lifeSlots(): number[] {
    return Array.from({ length: this.store.maxLives() }, (_, i) => i);
  }
}
