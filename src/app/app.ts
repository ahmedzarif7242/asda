import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GameService } from './game/game.service';
import { GameCanvas } from './screens/game-canvas';
import { GameOver } from './screens/game-over';
import { Hud } from './screens/hud';
import { Menu } from './screens/menu';
import { Pause } from './screens/pause';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameCanvas, Menu, Hud, Pause, GameOver],
  template: `
    <app-game-canvas />
    @switch (status()) {
      @case ('menu') { <app-menu /> }
      @case ('playing') { <app-hud /> }
      @case ('paused') { <app-hud /><app-pause /> }
      @case ('over') { <app-game-over /> }
    }
  `,
})
export class App {
  private readonly game = inject(GameService);
  readonly status = this.game.store.status;
}
