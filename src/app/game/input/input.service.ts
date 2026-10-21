import { Injectable, computed, signal } from '@angular/core';

/**
 * What the player is asking for, read by the engine each frame.
 *
 * Keyboard on a desk, swipes and on-screen buttons on a phone, all landing on the same few
 * signals so the engine never asks which. Steering is an axis held down, not a lane tapped:
 * the car goes where the wheel is pointed for as long as it is pointed there.
 */
@Injectable({ providedIn: 'root' })
export class InputService {
  private readonly leftHeld = signal(false);
  private readonly rightHeld = signal(false);
  /** -1 full left … +1 full right. */
  readonly steer = computed(() => (this.rightHeld() ? 1 : 0) - (this.leftHeld() ? 1 : 0));
  /** A flick: one jolt of the wheel, consumed by the engine once acted on. */
  readonly flick = signal(0);
  readonly accelerate = signal(false);
  readonly brake = signal(false);
  readonly nitroRequest = signal(false);
  readonly pauseRequest = signal(false);
  readonly hornRequest = signal(false);

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

  hold(control: 'left' | 'right' | 'accelerate' | 'brake', down: boolean): void {
    if (control === 'left') this.leftHeld.set(down);
    else if (control === 'right') this.rightHeld.set(down);
    else this[control].set(down);
  }

  consumeFlick(): number {
    const v = this.flick();
    if (v !== 0) this.flick.set(0);
    return v;
  }

  consume(which: 'nitroRequest' | 'pauseRequest' | 'hornRequest'): boolean {
    const v = this[which]();
    if (v) this[which].set(false);
    return v;
  }

  private onKey(e: KeyboardEvent, down: boolean): void {
    const code = e.code;
    const isGameKey =
      code === 'ArrowLeft' || code === 'ArrowRight' || code === 'ArrowUp' ||
      code === 'ArrowDown' || code === 'KeyA' || code === 'KeyD' || code === 'KeyW' ||
      code === 'KeyS' || code === 'Space' || code === 'Escape' || code === 'KeyP' || code === 'KeyH';
    if (!isGameKey) return;
    e.preventDefault();

    // The page is RTL but the road is not: left is left.
    if (code === 'ArrowLeft' || code === 'KeyA') this.leftHeld.set(down);
    if (code === 'ArrowRight' || code === 'KeyD') this.rightHeld.set(down);
    if (code === 'ArrowUp' || code === 'KeyW') this.accelerate.set(down);
    if (code === 'ArrowDown' || code === 'KeyS') this.brake.set(down);
    if (down && !e.repeat) {
      if (code === 'Space') this.nitroRequest.set(true);
      if (code === 'Escape' || code === 'KeyP') this.pauseRequest.set(true);
      if (code === 'KeyH') this.hornRequest.set(true);
    }
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
      this.flick.set(dx < 0 ? -1 : 1);
    } else if (dy < -40) {
      this.nitroRequest.set(true);
    }
  }

  private releaseAll(): void {
    this.leftHeld.set(false);
    this.rightHeld.set(false);
    this.accelerate.set(false);
    this.brake.set(false);
  }
}
