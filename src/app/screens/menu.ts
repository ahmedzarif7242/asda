import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GameService } from '../game/game.service';
import { DIFFICULTIES } from '../game/model/game.types';

@Component({
  selector: 'app-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="sheet">
      <header class="brand">
        <p class="kicker">لعبة سواقة مصرية · من المتصفح على طول</p>
        <h1>زحمة</h1>
        <p class="wallet">💰 {{ game.progress.bank() }} فكة · ⭐ {{ game.progress.totalStars() }}</p>
      </header>

      <button type="button" class="route" (click)="game.openMap()">
        <span class="label">الطريق</span>
        <strong>{{ store.route().name }}</strong>
        <small>{{ store.route().place }} · {{ store.route().tagline }}</small>
        <span class="change">غيّر من الخريطة ←</span>
      </button>

      <section class="row">
        <h2>المهمات على الطريق ده</h2>
        <ul class="missions">
          @for (o of store.route().objectives; track o.text) {
            <li>{{ o.text }}</li>
          }
        </ul>
      </section>

      <section class="row">
        <h2>المشوار</h2>
        <div class="chips">
          <button type="button" class="chip" [class.on]="store.mode() === 'endless'" (click)="game.choose('endless')">
            <strong>مشوار</strong><span>لحد ما العربية تخلص</span>
          </button>
          <button type="button" class="chip" [class.on]="store.mode() === 'timed'" (click)="game.choose('timed')">
            <strong>سابق الزمن</strong><span>٩٠ ثانية بس</span>
          </button>
        </div>
      </section>

      <section class="row">
        <h2>الزحمة</h2>
        <div class="chips">
          @for (d of difficulties; track d.id) {
            <button type="button" class="chip" [class.on]="store.difficultyId() === d.id" (click)="game.chooseDifficulty(d.id)">
              <strong>{{ d.name }} <em>×{{ d.multiplier }}</em></strong><span>{{ d.tagline }}</span>
            </button>
          }
        </div>
      </section>

      <section class="row">
        <h2>الجراج</h2>
        <div class="chips cars">
          @for (c of game.cars; track c.id) {
            @if (game.progress.owns(c.id)) {
              <button type="button" class="chip" [class.on]="store.carId() === c.id" (click)="game.chooseCar(c.id)">
                <i class="swatch" [style.background]="'#' + c.color.toString(16).padStart(6, '0')"></i>
                <strong>{{ c.name }}</strong><span>{{ c.tagline }}</span>
                <small>{{ c.lives }} كاوتش · تماسك {{ c.grip }} · عجلة {{ c.steering }}</small>
              </button>
            } @else {
              <button type="button" class="chip locked" [disabled]="game.progress.bank() < c.price" (click)="game.buyCar(c.id)">
                <i class="swatch" [style.background]="'#' + c.color.toString(16).padStart(6, '0')"></i>
                <strong>{{ c.name }} <em>💰 {{ c.price }}</em></strong><span>{{ c.tagline }}</span>
                <small>{{ game.progress.bank() < c.price ? 'لم فكة من المشاوير' : 'اضغط عشان تشتريها' }}</small>
              </button>
            }
          }
        </div>
      </section>

      <footer class="go">
        <button type="button" class="start" (click)="game.start()">يلا نمشي</button>
        <p class="best">أعلى نتيجة على الطريق ده: <b>{{ game.best() }}</b></p>
        @if (!game.isTouch) {
          <p class="how">
            <kbd>←</kbd><kbd>→</kbd> عجلة · <kbd>↑</kbd> بنزين · <kbd>↓</kbd> فرامل · <kbd>مسافة</kbd> نيترو · <kbd>H</kbd> كلاكس · <kbd>Esc</kbd> وقّف
          </p>
        }
        <button type="button" class="mute" (click)="game.toggleMute()">{{ store.muted() ? '🔇 الصوت مقفول' : '🔊 الصوت شغال' }}</button>
      </footer>
    </div>
  `,
  styles: `
    :host { position: fixed; inset: 0; display: grid; place-items: start center; overflow: auto; padding: 1rem; background: linear-gradient(180deg, rgba(8,10,24,.35), rgba(8,10,24,.78)); }
    .sheet { width: min(100%, 44rem); display: grid; gap: 1rem; padding-bottom: 2rem; }
    .brand { text-align: center; }
    .kicker { margin: 0; font-family: var(--mono); font-size: .72rem; letter-spacing: .18em; color: var(--sand); }
    h1 { margin: .1rem 0; font-family: var(--display); font-size: clamp(3.6rem, 16vw, 6.5rem); line-height: 1; color: #fff; text-shadow: 0 6px 0 #b8860b, 0 14px 40px rgba(0,0,0,.5); }
    .wallet { margin: 0; color: var(--gold); font-family: var(--mono); font-size: .9rem; }
    .route { display: grid; gap: .1rem; text-align: start; padding: .9rem 1rem; border-radius: 18px; cursor: pointer; font: inherit; color: #fff;
             background: linear-gradient(135deg, rgba(124,245,180,.18), rgba(79,195,247,.12)); border: 2px solid rgba(124,245,180,.5); }
    .route .label { font-family: var(--mono); font-size: .65rem; letter-spacing: .18em; color: #7cf5b4; }
    .route strong { font-family: var(--display); font-size: 1.6rem; }
    .route small { color: var(--ink-2); font-size: .8rem; }
    .route .change { justify-self: end; font-size: .75rem; color: #7cf5b4; }
    h2 { margin: 0 0 .5rem; font-family: var(--display); font-size: 1.05rem; color: var(--sand); }
    .missions { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: .4rem; }
    .missions li { padding: .3rem .7rem; border-radius: 999px; background: rgba(255,200,61,.14); border: 1px solid rgba(255,200,61,.4); font-size: .8rem; color: #fff; }
    .missions li::before { content: '☆ '; color: var(--gold); }
    .chips { display: grid; grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr)); gap: .55rem; }
    .chip { position: relative; text-align: start; display: grid; gap: .15rem; padding: .75rem .85rem; border-radius: 16px; cursor: pointer;
            background: rgba(255,255,255,.07); border: 2px solid rgba(255,255,255,.14); color: #fff; font: inherit; transition: .18s; }
    .chip:hover { background: rgba(255,255,255,.12); }
    .chip.on { border-color: var(--gold); background: rgba(255,200,61,.14); box-shadow: 0 0 0 4px rgba(255,200,61,.15); }
    .chip.locked { border-style: dashed; }
    .chip:disabled { opacity: .5; cursor: not-allowed; }
    .chip strong { font-family: var(--display); font-size: 1.15rem; display: flex; justify-content: space-between; align-items: baseline; }
    .chip em { font-style: normal; font-family: var(--mono); font-size: .75rem; color: var(--gold); }
    .chip span { font-size: .8rem; color: var(--ink-2); }
    .chip small { font-family: var(--mono); font-size: .65rem; color: var(--sand); }
    .swatch { position: absolute; top: .8rem; inset-inline-end: .8rem; width: .9rem; height: .9rem; border-radius: 50%; border: 2px solid rgba(255,255,255,.6); }
    .go { display: grid; gap: .55rem; justify-items: center; text-align: center; }
    .start { font: inherit; font-family: var(--display); font-size: 1.6rem; padding: .8rem 3rem; border-radius: 999px; border: 0; cursor: pointer;
             color: #1b1200; background: linear-gradient(180deg, #ffd666, #f2b01e); box-shadow: 0 8px 0 #a86f00, 0 18px 40px rgba(0,0,0,.45); transition: transform .12s, box-shadow .12s; }
    .start:active { transform: translateY(6px); box-shadow: 0 2px 0 #a86f00, 0 8px 20px rgba(0,0,0,.45); }
    .best { margin: 0; color: var(--ink-2); font-size: .9rem; }
    .best b { color: var(--gold); font-family: var(--mono); }
    .how { margin: 0; font-size: .75rem; color: var(--ink-3); max-width: 30rem; line-height: 1.9; }
    kbd { font-family: var(--mono); font-size: .7rem; padding: .05rem .4rem; border-radius: 6px; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2); }
    .mute { font: inherit; font-size: .8rem; color: var(--ink-2); background: none; border: 1px solid rgba(255,255,255,.2); border-radius: 999px; padding: .3rem .9rem; cursor: pointer; }
  `,
})
export class Menu {
  readonly game = inject(GameService);
  readonly store = this.game.store;
  readonly difficulties = DIFFICULTIES;
}
