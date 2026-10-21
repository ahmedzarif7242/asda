import { Injectable, signal } from '@angular/core';

import { RunSummary } from '../model/game.types';

const KEY = 'zahma.runs.v2';
const MAX_RUNS = 80;

/**
 * The best runs, kept on the device.
 *
 * Nothing leaves the browser — there is no account and no server — so this is the whole
 * leaderboard. Reads are guarded because storage can be blocked (private windows, iOS with
 * site data off) and the game must still start.
 */
@Injectable({ providedIn: 'root' })
export class ScoresService {
  readonly runs = signal<RunSummary[]>(this.load());

  best(mode: RunSummary['mode'], difficulty: RunSummary['difficulty'], route: string): number {
    return this.runs()
      .filter((r) => r.mode === mode && r.difficulty === difficulty && r.route === route)
      .reduce((top, r) => Math.max(top, r.score), 0);
  }

  /** Records a run and says whether it is the new best of its kind. */
  record(run: RunSummary): boolean {
    const previous = this.best(run.mode, run.difficulty, run.route);
    const runs = [run, ...this.runs()].sort((a, b) => b.score - a.score).slice(0, MAX_RUNS);
    this.runs.set(runs);
    try {
      localStorage.setItem(KEY, JSON.stringify(runs));
    } catch {
      /* storage blocked: the run still shows for this session */
    }
    return run.score > previous && run.score > 0;
  }

  private load(): RunSummary[] {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as RunSummary[]) : [];
    } catch {
      return [];
    }
  }
}
