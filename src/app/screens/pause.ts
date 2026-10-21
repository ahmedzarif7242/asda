import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GameService } from '../game/game.service';

@Component({
  selector: 'app-pause',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" role="dialog" aria-label="اللعبة واقفة">
      <h2>واقفين شوية</h2>
      <p>{{ store.distanceKm() }} كم · {{ store.score() }} نقطة</p>
      <button type="button" class="primary" (click)="game.resume()">كمّل</button>
      <button type="button" (click)="game.restart()">ابدأ من أول</button>
      <button type="button" (click)="game.toMenu()">القائمة</button>
    </div>
  `,
  styles: `
    :host { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(8,10,24,.6); backdrop-filter: blur(6px); }
    .card { display: grid; gap: .6rem; width: min(90vw, 20rem); padding: 1.5rem; border-radius: 22px; background: rgba(20,22,44,.92); border: 1px solid rgba(255,255,255,.14); text-align: center; color: #fff; }
    h2 { margin: 0; font-family: var(--display); font-size: 2rem; }
    p { margin: 0 0 .5rem; color: var(--ink-2); font-family: var(--mono); }
    button { font: inherit; font-family: var(--display); font-size: 1.1rem; padding: .7rem; border-radius: 14px; border: 1px solid rgba(255,255,255,.18); background: rgba(255,255,255,.08); color: #fff; cursor: pointer; }
    .primary { background: linear-gradient(180deg, #ffd666, #f2b01e); color: #1b1200; border: 0; }
  `,
})
export class Pause {
  readonly game = inject(GameService);
  readonly store = this.game.store;
}
