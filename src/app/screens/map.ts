import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GameService } from '../game/game.service';
import { RouteSpec } from '../game/model/routes';

/** Egypt's outline, as longitude/latitude pairs, clockwise from the north-west corner. */
const EGYPT: [number, number][] = [
  [25.0, 31.5], [27.0, 31.4], [29.2, 30.9], [30.4, 31.4], [31.3, 31.6], [32.3, 31.3], [33.3, 31.1], [34.2, 31.3],
  [34.9, 29.5], [34.6, 28.2], [34.2, 27.8], [33.6, 27.9], [33.2, 28.4], [32.6, 29.9], [32.4, 29.5], [32.6, 28.6],
  [33.3, 27.6], [33.8, 26.6], [34.4, 25.6], [35.0, 24.7], [35.6, 23.6], [36.2, 22.8], [36.9, 22.0], [31.5, 22.0],
  [25.0, 22.0],
];

/** The Nile, from Aswan to the Delta. */
const NILE: [number, number][] = [
  [32.9, 24.1], [32.6, 25.7], [31.7, 26.6], [31.2, 27.2], [30.8, 28.1], [30.9, 29.2], [31.2, 29.9], [31.2, 30.3],
];

@Component({
  selector: 'app-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="sheet">
      <header>
        <button type="button" class="back" (click)="game.toMenu()">→ رجوع</button>
        <h1>اختار الطريق</h1>
        <p>⭐ {{ game.progress.totalStars() }} · كل طريق بيفتح بنجوم اللي قبله</p>
      </header>

      <div class="body">
        <svg class="egypt" viewBox="0 0 320 340" aria-label="خريطة مصر">
          <path class="land" [attr.d]="land" />
          <path class="nile" [attr.d]="nile" />
          @for (r of game.routes; track r.id; let i = $index) {
            <g class="pin" [class.locked]="!game.progress.isUnlocked(r.id)" [class.on]="store.routeId() === r.id"
               [attr.transform]="'translate(' + px(r)[0] + ' ' + px(r)[1] + ')'" (click)="game.chooseRoute(r.id)" role="button" tabindex="0">
              <circle r="11" class="halo" />
              <circle r="7" />
              <text y="3">{{ i + 1 }}</text>
              @if (store.routeId() === r.id) {
                <text class="name" y="-14">{{ r.name }}</text>
              }
            </g>
          }
          <text class="caption" x="160" y="330">القاهرة والجيزة فيهم ٤ طرق — الأرقام زي القايمة</text>
        </svg>

        <ul class="list">
          @for (r of game.routes; track r.id; let i = $index) {
            <li>
              <button type="button" [class.on]="store.routeId() === r.id" [disabled]="!game.progress.isUnlocked(r.id)" (click)="game.chooseRoute(r.id)">
                <span class="n">{{ i + 1 }}</span>
                <span class="t">
                  <strong>{{ r.name }}</strong>
                  <small>{{ r.place }}</small>
                  <em>{{ r.tagline }}</em>
                </span>
                <span class="stars">
                  @if (game.progress.isUnlocked(r.id)) {
                    {{ '⭐'.repeat(game.progress.stars(r.id)) }}{{ '☆'.repeat(3 - game.progress.stars(r.id)) }}
                  } @else {
                    🔒 {{ r.unlock }} ⭐ على اللي قبله
                  }
                </span>
              </button>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: `
    :host { position: fixed; inset: 0; display: grid; place-items: center; overflow: auto; padding: 1rem; background: linear-gradient(180deg, rgba(8,10,24,.55), rgba(8,10,24,.85)); }
    .sheet { width: min(100%, 56rem); display: grid; gap: 1rem; }
    header { display: grid; gap: .2rem; text-align: center; position: relative; }
    .back { position: absolute; inset-inline-start: 0; top: 0; font: inherit; color: #fff; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); border-radius: 999px; padding: .35rem .9rem; cursor: pointer; }
    h1 { margin: 0; font-family: var(--display); font-size: 2.2rem; color: #fff; }
    header p { margin: 0; color: var(--ink-2); font-size: .85rem; }
    .body { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: start; }
    @media (max-width: 44rem) { .body { grid-template-columns: 1fr; } }
    .egypt { width: 100%; height: auto; }
    .land { fill: rgba(232,213,168,.18); stroke: var(--sand); stroke-width: 1.5; stroke-linejoin: round; }
    .nile { fill: none; stroke: #4fc3f7; stroke-width: 2; stroke-linecap: round; opacity: .8; }
    .pin { cursor: pointer; }
    .pin circle { fill: var(--gold); }
    .pin .halo { fill: rgba(255,200,61,.25); animation: pulse 1.6s ease-in-out infinite; }
    .pin.on circle { fill: #7cf5b4; }
    .pin.on .halo { fill: rgba(124,245,180,.3); }
    .pin.locked circle { fill: #777; }
    .pin.locked .halo { animation: none; fill: transparent; }
    .pin text { fill: #1b1200; font-family: var(--mono); font-weight: 700; font-size: 9px; text-anchor: middle; pointer-events: none; }
    .pin.locked text { fill: #ddd; }
    .pin text.name { fill: #fff; font-family: var(--display); font-size: 12px; paint-order: stroke; stroke: rgba(8,10,24,.85); stroke-width: 3px; }
    .caption { fill: var(--ink-3); font-size: 9px; text-anchor: middle; }
    .list { list-style: none; margin: 0; padding: 0; display: grid; gap: .5rem; }
    .list button { width: 100%; display: grid; grid-template-columns: auto 1fr auto; gap: .8rem; align-items: center; text-align: start; padding: .7rem .9rem; border-radius: 16px;
                   background: rgba(255,255,255,.07); border: 2px solid rgba(255,255,255,.14); color: #fff; font: inherit; cursor: pointer; }
    .list button:disabled { opacity: .45; cursor: not-allowed; }
    .list button.on { border-color: #7cf5b4; background: rgba(124,245,180,.12); }
    .n { font-family: var(--mono); color: var(--gold); font-size: 1.2rem; }
    .t { display: grid; }
    .t strong { font-family: var(--display); font-size: 1.1rem; }
    .t small { color: var(--sand); font-size: .72rem; }
    .t em { font-style: normal; color: var(--ink-2); font-size: .8rem; }
    .stars { font-size: .8rem; white-space: nowrap; color: var(--gold); }
    @keyframes pulse { 50% { r: 13; opacity: .4; } }
  `,
})
export class EgyptMap {
  readonly game = inject(GameService);
  readonly store = this.game.store;
  readonly land = this.path(EGYPT, true);
  readonly nile = this.path(NILE, false);

  /** Longitude/latitude → SVG pixels. Egypt spans 25–37 east, 22–32 north. */
  px(r: RouteSpec): [number, number] {
    return this.project(r.lon, r.lat);
  }

  private project(lon: number, lat: number): [number, number] {
    return [Math.round(((lon - 24.5) / 13) * 320), Math.round(((32 - lat) / 10.5) * 320)];
  }

  private path(points: [number, number][], close: boolean): string {
    const d = points.map(([lon, lat], i) => (i ? 'L' : 'M') + this.project(lon, lat).join(' ')).join(' ');
    return close ? d + ' Z' : d;
  }
}
