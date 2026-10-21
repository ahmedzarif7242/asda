import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

import { GameService } from '../game/game.service';

/** The one canvas the whole game is drawn on. Everything else floats above it. */
@Component({
  selector: 'app-game-canvas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #stage class="stage" aria-hidden="true"></canvas>`,
  styles: `
    :host { position: fixed; inset: 0; display: block; }
    .stage { width: 100%; height: 100%; display: block; touch-action: none; }
  `,
})
export class GameCanvas {
  private readonly game = inject(GameService);
  private readonly stage = viewChild.required<ElementRef<HTMLCanvasElement>>('stage');

  constructor() {
    afterNextRender(() => this.game.mount(this.stage().nativeElement));
  }
}
