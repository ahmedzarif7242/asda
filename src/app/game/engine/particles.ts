import * as THREE from 'three';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  max: number;
  size: number;
}

/**
 * Dust off the shoulder, sparks off a crash, the flame out of the nitro.
 *
 * One `Points` with a fixed buffer; a particle is a slot that is alive or not. Cheap enough
 * for a phone, and it is what makes leaving the road *feel* like leaving the road.
 */
export class Particles {
  readonly points: THREE.Points;
  private readonly pool: Particle[] = [];
  private readonly positions: Float32Array;
  private readonly colors: Float32Array;
  private readonly sizes: Float32Array;
  private readonly max: number;

  constructor(max = 400) {
    this.max = max;
    this.positions = new Float32Array(max * 3);
    this.colors = new Float32Array(max * 3);
    this.sizes = new Float32Array(max);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
    const mat = new THREE.PointsMaterial({ size: 0.35, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, sizeAttenuation: true });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    for (let i = 0; i < max; i++) this.pool.push({ x: 0, y: -50, z: 0, vx: 0, vy: 0, vz: 0, life: 0, max: 1, size: 0.3 });
  }

  emit(count: number, x: number, y: number, z: number, color: THREE.Color, spread: number, up: number, back: number, life: number): void {
    for (let n = 0; n < count; n++) {
      const p = this.pool.find((q) => q.life <= 0);
      if (!p) return;
      p.x = x + (Math.random() - 0.5) * spread;
      p.y = y;
      p.z = z;
      p.vx = (Math.random() - 0.5) * spread * 2;
      p.vy = Math.random() * up;
      p.vz = back + Math.random() * back * 0.5;
      p.life = life * (0.6 + Math.random() * 0.4);
      p.max = p.life;
      const i = this.pool.indexOf(p);
      this.colors[i * 3] = color.r;
      this.colors[i * 3 + 1] = color.g;
      this.colors[i * 3 + 2] = color.b;
    }
  }

  update(dt: number, worldSpeed: number): void {
    const pos = this.points.geometry.attributes['position'] as THREE.BufferAttribute;
    for (let i = 0; i < this.max; i++) {
      const p = this.pool[i];
      if (p.life <= 0) {
        this.positions[i * 3 + 1] = -50;
        continue;
      }
      p.life -= dt;
      p.vy -= 6 * dt;
      p.x += p.vx * dt;
      p.y = Math.max(0.02, p.y + p.vy * dt);
      p.z += (p.vz + worldSpeed) * dt;
      this.positions[i * 3] = p.x;
      this.positions[i * 3 + 1] = p.y;
      this.positions[i * 3 + 2] = p.z;
    }
    pos.needsUpdate = true;
  }
}
