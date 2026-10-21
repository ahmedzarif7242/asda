import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { GameService } from '../game/game.service';

@Component({
  selector: 'app-game-over',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" role="dialog" aria-label="خلص المشوار">
      <p class="kicker">{{ store.mode() === 'timed' ? 'خلص الوقت' : 'خلص الكاوتش' }}</p>
      <h2>{{ store.score() }}</h2>
      @if (game.newBest()) {
        <p class="best">🏆 أعلى نتيجة ليك على {{ store.difficulty().name }}</p>
      } @else {
        <p class="sub">أعلى نتيجة: {{ game.best() }}</p>
      }
      <dl class="stats">
        <div><dt>المسافة</dt><dd>{{ store.distanceKm() }} كم</dd></div>
        <div><dt>فكة</dt><dd>{{ store.coins() }}</dd></div>
        <div><dt>حرفنة</dt><dd>{{ store.nearMisses() }}</dd></div>
        <div><dt>أعلى سرعة</dt><dd>{{ store.topSpeed() }} كم/س</dd></div>
      </dl>
      <button type="button" class="primary" (click)="game.restart()">تاني</button>
      <button type="button" (click)="share()">{{ shared() ? 'اتنسخ ✓' : 'شارك النتيجة' }}</button>
      <button type="button" (click)="game.toMenu()">القائمة</button>
    </div>
  `,
  styles: `
    :host { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(8,10,24,.65); backdrop-filter: blur(6px); }
    .card { display: grid; gap: .55rem; width: min(92vw, 22rem); padding: 1.5rem; border-radius: 22px; background: rgba(20,22,44,.94); border: 1px solid rgba(255,255,255,.14); text-align: center; color: #fff; }
    .kicker { margin: 0; font-family: var(--mono); font-size: .72rem; letter-spacing: .18em; color: var(--sand); }
    h2 { margin: 0; font-family: var(--mono); font-size: 3.4rem; line-height: 1; color: var(--gold); }
    .best { margin: 0; color: #7cf5b4; font-family: var(--display); }
    .sub { margin: 0; color: var(--ink-2); font-size: .9rem; }
    .stats { margin: .4rem 0; display: grid; grid-template-columns: 1fr 1fr; gap: .4rem; }
    .stats div { padding: .5rem; border-radius: 12px; background: rgba(255,255,255,.06); }
    dt { font-size: .68rem; color: var(--ink-2); }
    dd { margin: 0; font-family: var(--mono); font-size: 1.05rem; }
    button { font: inherit; font-family: var(--display); font-size: 1.1rem; padding: .7rem; border-radius: 14px; border: 1px solid rgba(255,255,255,.18); background: rgba(255,255,255,.08); color: #fff; cursor: pointer; }
    .primary { background: linear-gradient(180deg, #ffd666, #f2b01e); color: #1b1200; border: 0; font-size: 1.3rem; }
  `,
})
export class GameOver {
  readonly game = inject(GameService);
  readonly store = this.game.store;
  readonly shared = signal(false);

  async share(): Promise<void> {
    this.shared.set(await this.game.share());
  }
}
