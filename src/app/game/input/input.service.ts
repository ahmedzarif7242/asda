import { Injectable, signal } from '@angular/core';

/**
 * What the player is asking for, read by the engine each frame.
 *
 * Keyboard on a desk, swipes and on-screen buttons on a phone, all landing on the same four
 * signals so the engine never asks which.
 */
@Injectable({ providedIn: 'root' })
export class InputService {
  /** -1 left, +1 right; consumed by the engine once acted on. */
  readonly laneRequest = signal(0);
  readonly accelerate = signal(false);
  readonly brake = signal(false);
  readonly nitroRequest = signal(false);
  readonly pauseRequest = signal(false);

  private touchStartX = 0;
  private touchStartY = 0;
  private touchStartAt = 0;
  private bound = false;

  bind(): void {
    if (this.bound) return;
    this.bound = true;

    window.addEventListener('keydown', (e) => this.onKey(e, true));
    window.addEventListener('keyup', (e) => this.onKey(e, false));
    window.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
    window.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: true });
    window.addEventListener('blur', () => this.releaseAll());
  }

  steer(direction: -1 | 1): void {
    this.laneRequest.set(direction);
  }

  consumeLane(): number {
    const v = this.laneRequest();
    if (v !== 0) this.laneRequest.set(0);
    return v;
  }

  consumeNitro(): boolean {
    const v = this.nitroRequest();
    if (v) this.nitroRequest.set(false);
    return v;
  }

  consumePause(): boolean {
    const v = this.pauseRequest();
    if (v) this.pauseRequest.set(false);
    return v;
  }

  private onKey(e: KeyboardEvent, down: boolean): void {
    const code = e.code;
    const isGameKey =
      code === 'ArrowLeft' || code === 'ArrowRight' || code === 'ArrowUp' ||
      code === 'ArrowDown' || code === 'KeyA' || code === 'KeyD' || code === 'KeyW' ||
      code === 'KeyS' || code === 'Space' || code === 'Escape' || code === 'KeyP';
    if (!isGameKey) return;
    e.preventDefault();

    if (down && !e.repeat) {
      // The page is RTL but the road is not: left is left.
      if (code === 'ArrowLeft' || code === 'KeyA') this.laneRequest.set(-1);
      if (code === 'ArrowRight' || code === 'KeyD') this.laneRequest.set(1);
      if (code === 'Space') this.nitroRequest.set(true);
      if (code === 'Escape' || code === 'KeyP') this.pauseRequest.set(true);
    }
    if (code === 'ArrowUp' || code === 'KeyW') this.accelerate.set(down);
    if (code === 'ArrowDown' || code === 'KeyS') this.brake.set(down);
  }

  private onTouchStart(e: TouchEvent): void {
    const t = e.changedTouches[0];
    if (!t) return;
    this.touchStartX = t.clientX;
    this.touchStartY = t.clientY;
    this.touchStartAt = performance.now();
  }

  private onTouchEnd(e: TouchEvent): void {
    const t = e.changedTouches[0];
    if (!t) return;
    // Buttons handle their own taps; swipes anywhere else steer.
    if ((e.target as HTMLElement | null)?.closest('button, a')) return;
    const dx = t.clientX - this.touchStartX;
    const dy = t.clientY - this.touchStartY;
    const quick = performance.now() - this.touchStartAt < 600;
    if (!quick) return;
    if (Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy)) {
      this.laneRequest.set(dx < 0 ? -1 : 1);
    } else if (dy < -40) {
      this.nitroRequest.set(true);
    }
  }

  private releaseAll(): void {
    this.accelerate.set(false);
    this.brake.set(false);
  }
}
