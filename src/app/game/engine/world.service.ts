import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { LANE_WIDTH } from '../model/game.types';
import { Landmark, RouteSpec, ROUTES } from '../model/routes';
import { chance, pick, rand } from './lanes';
import { asphaltNormal, billboardTexture, buildingTexture, latticeTexture, roadTexture, seaTexture, shoulderTexture, signTexture } from './textures';

const SPAWN_Z = -170;
const DESPAWN_Z = 30;
const ROAD_LENGTH = 600;
export const SHOULDER = 2.4;

interface Scenery {
  group: THREE.Group;
  /** Metres of road this piece occupies. */
  length: number;
}

interface Spinner {
  mesh: THREE.Object3D;
  rate: number;
}

/**
 * The road and everything standing beside it, for whichever road this is.
 *
 * The player never moves: the world slides toward the camera at the player's speed and
 * anything that goes past is put back at the far end with a new face. What gets put there
 * depends on the route — Cairo brick on the Ring Road, dunes on the desert road, the sea on
 * the Corniche — and the sky, the haze and the lamps follow the time of day.
 */
@Injectable({ providedIn: 'root' })
export class WorldService {
  readonly scene = new THREE.Scene();
  readonly sun = new THREE.DirectionalLight(0xffffff, 2.4);
  readonly sky = new THREE.HemisphereLight(0xbfdfff, 0x7a6a50, 1.2);

  route: RouteSpec = ROUTES[0];
  lanes = 4;
  halfRoad = (4 * LANE_WIDTH) / 2;

  private road: THREE.Mesh | null = null;
  private readonly asphalt = asphaltNormal();
  private roadTex: THREE.Texture | null = null;
  private shoulders: THREE.Mesh[] = [];
  private kerbs: THREE.Mesh[] = [];
  private ground: THREE.Mesh | null = null;
  private sea: THREE.Mesh | null = null;
  private seaTex: THREE.Texture | null = null;
  private readonly scenery: Scenery[] = [];
  private landmark: Scenery | null = null;
  private landmarkTimer = 0;
  private readonly lamps: THREE.MeshStandardMaterial[] = [];
  private readonly spinners: Spinner[] = [];
  private bridges: THREE.Group[] = [];
  private stars: THREE.Points | null = null;
  private dome: THREE.Mesh | null = null;
  private domeMat: THREE.ShaderMaterial | null = null;
  private sunDisc: THREE.Mesh | null = null;
  private moon: THREE.Mesh | null = null;
  private built = false;
  private night = false;

  readonly dayColor = new THREE.Color(0x9ec9ff);
  readonly duskColor = new THREE.Color(0xf29a63);
  readonly nightColor = new THREE.Color(0x0a0f24);

  build(): void {
    if (this.built) return;
    this.built = true;

    this.scene.fog = new THREE.Fog(0x9ec9ff, 70, 210);
    this.scene.background = this.dayColor.clone();

    // The sky is a dome with a gradient from the zenith to the horizon and a glow where the
    // sun sits, instead of one flat colour behind everything.
    this.domeMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        top: { value: new THREE.Color(0x4f8fd6) },
        horizon: { value: new THREE.Color(0xd9ecff) },
        sunDir: { value: new THREE.Vector3(0.3, 0.6, -0.7) },
        sunColor: { value: new THREE.Color(0xfff1c4) },
        night: { value: 0 },
      },
      vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
        uniform vec3 top; uniform vec3 horizon; uniform vec3 sunDir; uniform vec3 sunColor; uniform float night;
        varying vec3 vDir;
        void main(){
          float h = clamp(vDir.y, 0.0, 1.0);
          vec3 c = mix(horizon, top, pow(h, 0.6));
          float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
          c += sunColor * (pow(s, 48.0) * 0.9 + pow(s, 6.0) * 0.18) * (1.0 - night);
          gl_FragColor = vec4(c, 1.0);
        }`,
    });
    this.dome = new THREE.Mesh(new THREE.SphereGeometry(420, 24, 12), this.domeMat);
    this.dome.position.set(0, -20, -120);
    this.scene.add(this.dome);

    this.sun.position.set(30, 60, -20);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.camera.left = -40;
    this.sun.shadow.camera.right = 40;
    this.sun.shadow.camera.top = 60;
    this.sun.shadow.camera.bottom = -60;
    this.sun.shadow.camera.far = 200;
    this.sun.shadow.bias = -0.0005;
    this.scene.add(this.sun, this.sky);

    // The sky's furniture: stars that only show at night, a sun and a moon that cross.
    const starGeo = new THREE.BufferGeometry();
    const pts: number[] = [];
    for (let i = 0; i < 900; i++) {
      const a = Math.random() * Math.PI * 2;
      const e = Math.random() * Math.PI * 0.45 + 0.05;
      pts.push(Math.cos(a) * Math.cos(e) * 300, Math.sin(e) * 300, Math.sin(a) * Math.cos(e) * 300 - 100);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    this.stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, transparent: true, opacity: 0, fog: false }));
    this.scene.add(this.stars);
    this.sunDisc = new THREE.Mesh(new THREE.SphereGeometry(9, 16, 16), new THREE.MeshBasicMaterial({ color: 0xfff3c4, fog: false }));
    this.moon = new THREE.Mesh(new THREE.SphereGeometry(6, 16, 16), new THREE.MeshBasicMaterial({ color: 0xe8ecff, fog: false }));
    this.scene.add(this.sunDisc, this.moon);

    this.setRoute(this.route);
  }

  /** Tears the roadside down and puts up the given route's. */
  setRoute(route: RouteSpec): void {
    this.route = route;
    this.lanes = route.lanes;
    this.halfRoad = (route.lanes * LANE_WIDTH) / 2;

    for (const s of this.scenery) {
      this.scene.remove(s.group);
      this.dispose(s.group);
    }
    this.scenery.length = 0;
    if (this.landmark) {
      this.scene.remove(this.landmark.group);
      this.dispose(this.landmark.group);
      this.landmark = null;
    }
    for (const b of this.bridges) this.scene.remove(b);
    this.bridges = [];
    this.spinners.length = 0;
    for (const m of [this.road, this.ground, this.sea, ...this.shoulders, ...this.kerbs]) if (m) this.scene.remove(m);
    this.shoulders = [];
    this.kerbs = [];
    this.sea = null;

    const roadWidth = this.halfRoad * 2;
    this.roadTex = roadTexture(route.lanes, route.scenery === 'desert' || route.scenery === 'coast' ? 0.2 : 0.8);
    this.roadTex.repeat.set(1, ROAD_LENGTH / 15);
    this.asphalt.repeat.set(4, ROAD_LENGTH / 4);
    this.road = new THREE.Mesh(
      new THREE.PlaneGeometry(roadWidth + 0.4, ROAD_LENGTH),
      new THREE.MeshStandardMaterial({ map: this.roadTex, normalMap: this.asphalt, normalScale: new THREE.Vector2(0.35, 0.35), roughness: 0.82, metalness: 0.1, envMapIntensity: 0.3 }),
    );
    this.road.rotation.x = -Math.PI / 2;
    this.road.position.set(0, 0, -200);
    this.road.receiveShadow = true;
    this.scene.add(this.road);

    const shoulderColor = route.scenery === 'fields' ? '#8a7a55' : '#b8a888';
    for (const side of [-1, 1]) {
      const tex = shoulderTexture(shoulderColor);
      tex.repeat.set(1, 60);
      const s = new THREE.Mesh(new THREE.PlaneGeometry(SHOULDER, ROAD_LENGTH), new THREE.MeshStandardMaterial({ map: tex, roughness: 1 }));
      s.rotation.x = -Math.PI / 2;
      s.position.set(side * (this.halfRoad + SHOULDER / 2 + 0.2), -0.01, -200);
      s.receiveShadow = true;
      this.scene.add(s);
      this.shoulders.push(s);

      const kerb = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.25, ROAD_LENGTH),
        new THREE.MeshStandardMaterial({ color: route.scenery === 'city' || route.scenery === 'sea' ? 0xd9d9d9 : 0x9e9e9e }),
      );
      kerb.position.set(side * (this.halfRoad + SHOULDER + 0.5), 0.12, -200);
      kerb.castShadow = true;
      this.scene.add(kerb);
      this.kerbs.push(kerb);
    }

    this.ground = new THREE.Mesh(
      new THREE.PlaneGeometry(500, ROAD_LENGTH + 200),
      new THREE.MeshStandardMaterial({ color: route.ground, roughness: 1, envMapIntensity: 0.15 }),
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.set(0, -0.05, -200);
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    if (route.scenery === 'sea' || route.scenery === 'coast') {
      this.seaTex = seaTexture();
      this.seaTex.repeat.set(8, 30);
      const offset = route.scenery === 'sea' ? 24 : 60;
      this.sea = new THREE.Mesh(
        new THREE.PlaneGeometry(300, ROAD_LENGTH + 200),
        new THREE.MeshStandardMaterial({ map: this.seaTex, roughness: 0.25, metalness: 0.2 }),
      );
      this.sea.rotation.x = -Math.PI / 2;
      this.sea.position.set(this.halfRoad + offset + 150, -0.3, -200);
      this.scene.add(this.sea);
    }

    let z = -10;
    const count = Math.round(44 * Math.max(0.5, route.density));
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const item = this.makeScenery(side);
      item.group.position.z = z;
      this.scene.add(item.group);
      this.scenery.push(item);
      if (i % 2 === 1) z -= 12 / route.density;
    }

    if (route.scenery === 'city') {
      for (let i = 0; i < 2; i++) {
        const bridge = this.makeBridge();
        bridge.position.z = -200 - i * 400;
        this.scene.add(bridge);
        this.bridges.push(bridge);
      }
    }
    this.landmarkTimer = 60;
    this.setDayPhase(route.startPhase);
  }

  /** Moves everything by `metres` toward the camera and recycles what has passed. */
  advance(metres: number, dt: number): void {
    if (this.roadTex) this.roadTex.offset.y -= metres / 15;
    for (const s of this.shoulders) (s.material as THREE.MeshStandardMaterial).map!.offset.y -= metres / 10;
    if (this.seaTex) this.seaTex.offset.y -= metres / 60 + dt * 0.02;

    for (const item of this.scenery) {
      item.group.position.z += metres;
      if (item.group.position.z > DESPAWN_Z) {
        const side = Math.sign(item.group.position.x) || 1;
        const fresh = this.makeScenery(side);
        fresh.group.position.z = this.farthestZ() - 12 / this.route.density;
        this.scene.remove(item.group);
        this.dispose(item.group);
        item.group = fresh.group;
        item.length = fresh.length;
        this.scene.add(fresh.group);
      }
    }

    for (const bridge of this.bridges) {
      bridge.position.z += metres;
      if (bridge.position.z > DESPAWN_Z) bridge.position.z -= 800;
    }

    // A landmark every so often, far off to the side, big enough to be seen for a while.
    this.landmarkTimer -= metres;
    if (this.landmark) {
      this.landmark.group.position.z += metres * 0.6; // parallax: it is far away
      if (this.landmark.group.position.z > 120) {
        this.scene.remove(this.landmark.group);
        this.dispose(this.landmark.group);
        this.landmark = null;
      }
    } else if (this.landmarkTimer <= 0 && this.route.landmarks.length) {
      this.landmark = this.makeLandmark(pick(this.route.landmarks));
      this.landmark.group.position.z = -320;
      this.scene.add(this.landmark.group);
      this.landmarkTimer = rand(700, 1400);
    }

    for (const s of this.spinners) s.mesh.rotation.z += s.rate * dt;
  }

  /** Paints the sky for a time of day, 0 = noon, 0.5 = midnight. */
  setDayPhase(phase: number): void {
    const target = new THREE.Color();
    const t = phase % 1;
    if (t < 0.25) target.lerpColors(this.dayColor, this.duskColor, t / 0.25);
    else if (t < 0.4) target.lerpColors(this.duskColor, this.nightColor, (t - 0.25) / 0.15);
    else if (t < 0.65) target.copy(this.nightColor);
    else if (t < 0.8) target.lerpColors(this.nightColor, this.duskColor, (t - 0.65) / 0.15);
    else target.lerpColors(this.duskColor, this.dayColor, (t - 0.8) / 0.2);

    // Each road has its own haze; it tints the day sky and the fog.
    const haze = new THREE.Color(this.route.haze);
    const sky = target.clone().lerp(haze, t < 0.25 || t > 0.8 ? 0.35 : 0);
    (this.scene.background as THREE.Color).copy(sky);
    this.scene.fog!.color.copy(sky);
    if (this.domeMat) {
      const u = this.domeMat.uniforms;
      (u['horizon'].value as THREE.Color).copy(sky);
      (u['top'].value as THREE.Color).copy(sky).multiplyScalar(0.55).lerp(new THREE.Color(0x3b74c8), t < 0.22 || t > 0.82 ? 0.5 : 0);
      u['night'].value = t > 0.3 && t < 0.75 ? 1 : 0;
      const angle = t * Math.PI * 2;
      (u['sunDir'].value as THREE.Vector3).set(Math.sin(angle) * 0.5, Math.cos(angle) * 0.6 + 0.1, -0.7).normalize();
      (u['sunColor'].value as THREE.Color).set(t > 0.12 && t < 0.3 ? 0xffb070 : 0xfff1c4);
    }

    const night = t > 0.32 && t < 0.72 ? 1 : t > 0.22 && t < 0.82 ? 0.5 : 0;
    this.night = night === 1;
    this.sun.intensity = 2.4 - night * 2.1;
    this.sun.color.set(t > 0.12 && t < 0.3 ? 0xffb070 : 0xffffff);
    this.sky.intensity = 1.2 - night * 0.95;
    for (const lamp of this.lamps) lamp.emissiveIntensity = night > 0 ? 3 : 0;
    if (this.stars) (this.stars.material as THREE.PointsMaterial).opacity = night;

    // Sun and moon on an arc behind the horizon, across the run.
    const angle = t * Math.PI * 2;
    if (this.sunDisc) {
      this.sunDisc.position.set(Math.sin(angle) * 120, Math.cos(angle) * 110 + 10, -260);
      this.sunDisc.visible = this.sunDisc.position.y > -5;
    }
    if (this.moon) {
      this.moon.position.set(-Math.sin(angle) * 120, -Math.cos(angle) * 110 + 10, -260);
      this.moon.visible = this.moon.position.y > -5;
    }
  }

  get isNight(): boolean {
    return this.night;
  }

  private farthestZ(): number {
    return this.scenery.reduce((min, s) => Math.min(min, s.group.position.z), 0);
  }

  private makeScenery(side: number): Scenery {
    switch (this.route.scenery) {
      case 'desert':
        return this.desertPiece(side);
      case 'sea':
        return side > 0 ? this.cornichePiece() : this.cityPiece(side, true);
      case 'coast':
        return side > 0 ? this.beachPiece() : chance(0.6) ? this.compoundPiece(side) : this.desertPiece(side);
      case 'fields':
        return this.fieldsPiece(side);
      case 'giza':
        return chance(0.5) ? this.cityPiece(side, false, 2, 5) : this.palmsPiece(side);
      case 'city':
      default:
        return this.cityPiece(side, false);
    }
  }

  private edge(side: number, extra = 3): number {
    return side * (this.halfRoad + SHOULDER + extra);
  }

  private cityPiece(side: number, finishedOnly: boolean, minFloors = 3, maxFloors = 10): Scenery {
    const group = new THREE.Group();
    const roll = Math.random();
    const x = this.edge(side);

    if (roll < 0.62) {
      const floors = minFloors + Math.floor(Math.random() * (maxFloors - minFloors));
      const finished = finishedOnly || Math.random() > 0.55;
      const w = 7 + Math.random() * 5;
      const d = 8 + Math.random() * 6;
      const h = floors * 3;
      const tex = buildingTexture(finished, floors, this.night);
      const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 });
      const plain = new THREE.MeshStandardMaterial({ color: finished ? 0xcdbd9c : 0x8f432a, roughness: 0.9 });
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [plain, mat, plain, plain, plain, mat]);
      b.position.set(x + side * (w / 2), h / 2, 0);
      b.castShadow = true;
      b.receiveShadow = true;
      group.add(b);
      // Balconies on the road face, one per floor, with a rail.
      const slab = new THREE.MeshStandardMaterial({ color: finished ? 0xd9d2c0 : 0xb0a899, roughness: 0.95 });
      const rail = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.6, metalness: 0.4 });
      for (let f = 1; f < floors; f++) {
        if (Math.random() > 0.65) continue;
        const bx = x + side * 0.5;
        const by = f * 3 + 0.1;
        const bz = (Math.random() - 0.5) * (d - 3);
        const balcony = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.18, 2.4), slab);
        balcony.position.set(bx, by, bz);
        balcony.castShadow = true;
        const r = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.9, 2.4), rail);
        r.position.set(bx - side * 0.58, by + 0.5, bz);
        group.add(balcony, r);
        if (Math.random() > 0.6) {
          const ac = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.7), new THREE.MeshStandardMaterial({ color: 0xd8d8d8, roughness: 0.7 }));
          ac.position.set(x + side * 0.3, by + 1.9, bz + 1.6);
          group.add(ac);
        }
      }
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1.2, 10), new THREE.MeshStandardMaterial({ color: 0x2b2b2b }));
      tank.position.set(x + side * (w / 2) + (Math.random() - 0.5) * 2, h + 0.6, (Math.random() - 0.5) * 3);
      group.add(tank);
      if (!finished && Math.random() > 0.5) {
        const stub = new THREE.Mesh(new THREE.BoxGeometry(w * 0.9, 1.4, d * 0.9), plain);
        stub.position.set(x + side * (w / 2), h + 0.7, 0);
        group.add(stub);
      }
      // A shop at street level: a dark doorway and an awning in whatever colour the owner had.
      if (chance(0.7)) {
        const door = new THREE.Mesh(new THREE.BoxGeometry(w * 0.5, 2.6, 0.2), new THREE.MeshStandardMaterial({ color: 0x151a22, emissive: this.night ? 0x3a2e10 : 0x000000 }));
        door.position.set(x + side * 0.1, 1.3, 0);
        const awning = new THREE.Mesh(new THREE.BoxGeometry(w * 0.6, 0.12, 1.4), new THREE.MeshStandardMaterial({ color: pick([0xb23a2a, 0x1e6fb5, 0x2e7d32, 0xc9a227]), roughness: 0.9 }));
        awning.position.set(x - side * 0.6, 2.7, 0);
        awning.rotation.x = side * 0.25;
        group.add(door, awning);
      }
      group.add(this.makeLamp(side * (this.halfRoad + SHOULDER + 1.2), -3));
      return { group, length: d };
    }
    if (roll < 0.82) return this.palmsPiece(side);
    return this.billboardPiece(side);
  }

  private palmsPiece(side: number): Scenery {
    const group = new THREE.Group();
    const x = this.edge(side);
    for (let i = 0; i < 3; i++) group.add(this.makePalm(x + side * (1 + Math.random() * 6), -4 + i * 4));
    if (chance(0.5)) group.add(this.makeLamp(side * (this.halfRoad + SHOULDER + 1.2), 0));
    return { group, length: 12 };
  }

  private billboardPiece(side: number): Scenery {
    const group = new THREE.Group();
    const x = this.edge(side);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 9, 8), new THREE.MeshStandardMaterial({ color: 0x555555 }));
    post.position.set(x + side * 2, 4.5, 0);
    group.add(post);
    const board = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), new THREE.MeshStandardMaterial({ map: billboardTexture(), roughness: 0.6, emissive: 0x111111 }));
    board.position.set(x + side * 2, 11, 0);
    board.rotation.y = side < 0 ? Math.PI * 0.42 : -Math.PI * 0.42;
    group.add(board);
    const back = board.clone();
    back.rotation.y += Math.PI;
    group.add(back);
    return { group, length: 12 };
  }

  private desertPiece(side: number): Scenery {
    const group = new THREE.Group();
    const x = this.edge(side, 6);
    const roll = Math.random();
    if (roll < 0.7) {
      // A dune: a bumpy plane, pushed up in the middle.
      const w = 30 + Math.random() * 40;
      const d = 30 + Math.random() * 30;
      const geo = new THREE.PlaneGeometry(w, d, 10, 8);
      const pos = geo.attributes['position'] as THREE.BufferAttribute;
      const h = 2 + Math.random() * 6;
      for (let i = 0; i < pos.count; i++) {
        const px = pos.getX(i) / w;
        const py = pos.getY(i) / d;
        pos.setZ(i, Math.max(0, Math.cos(px * Math.PI) * Math.cos(py * Math.PI)) * h + Math.random() * 0.4);
      }
      geo.computeVertexNormals();
      const dune = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: pick([0xe0c58f, 0xd6b97f, 0xe8d2a0]), roughness: 1 }));
      dune.rotation.x = -Math.PI / 2;
      dune.position.set(x + side * (w / 2), 0, 0);
      dune.receiveShadow = true;
      group.add(dune);
      if (chance(0.3)) group.add(this.makeRocks(x + side * 4, 0));
      return { group, length: d * 0.7 };
    }
    if (roll < 0.85) {
      // A petrol station. The only building for twenty kilometres.
      const canopy = new THREE.Mesh(new THREE.BoxGeometry(16, 0.6, 10), new THREE.MeshStandardMaterial({ color: 0xf5f5f5 }));
      canopy.position.set(x + side * 10, 5, 0);
      canopy.castShadow = true;
      group.add(canopy);
      for (const [dx, dz] of [[-6, -3], [6, -3], [-6, 3], [6, 3]]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 5, 8), new THREE.MeshStandardMaterial({ color: 0xbdbdbd }));
        post.position.set(x + side * 10 + dx, 2.5, dz);
        group.add(post);
      }
      const shop = new THREE.Mesh(new THREE.BoxGeometry(10, 4, 7), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      shop.position.set(x + side * 22, 2, 0);
      group.add(shop);
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(4, 2), new THREE.MeshStandardMaterial({ map: signTexture('بنزينة', '#d32f2f', '#ffffff', 'كافيتريا · حمّام'), side: THREE.DoubleSide, emissive: 0x222222 }));
      sign.position.set(x + side * 3, 7, 0);
      sign.rotation.y = side < 0 ? Math.PI / 2 : -Math.PI / 2;
      group.add(sign);
      group.add(this.makeLamp(side * (this.halfRoad + SHOULDER + 1.2), -6));
      return { group, length: 36 };
    }
    return this.billboardPiece(side);
  }

  private cornichePiece(): Scenery {
    // The sea side of the Corniche: a wall, a pavement, the odd fisherman's umbrella.
    const group = new THREE.Group();
    const x = this.edge(1, 0.5);
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.1, 12), new THREE.MeshStandardMaterial({ color: 0xe6e2d6 }));
    wall.position.set(x + 6, 0.55, 0);
    group.add(wall);
    const pave = new THREE.Mesh(new THREE.BoxGeometry(6, 0.2, 12), new THREE.MeshStandardMaterial({ color: 0xcfc7b5 }));
    pave.position.set(x + 3, 0.1, 0);
    pave.receiveShadow = true;
    group.add(pave);
    for (let i = 0; i < 2; i++) group.add(this.makePalm(x + 2 + Math.random() * 2, -4 + i * 6));
    group.add(this.makeLamp(this.halfRoad + SHOULDER + 1.2, -2));
    if (chance(0.4)) {
      const umb = new THREE.Mesh(new THREE.ConeGeometry(1.2, 0.6, 8), new THREE.MeshStandardMaterial({ color: pick([0xef5350, 0x42a5f5, 0xffee58]) }));
      umb.position.set(x + 4.5, 2, 2);
      group.add(umb);
    }
    return { group, length: 12 };
  }

  private beachPiece(): Scenery {
    const group = new THREE.Group();
    const x = this.edge(1, 4);
    const sand = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), new THREE.MeshStandardMaterial({ color: 0xf0e2bd, roughness: 1 }));
    sand.rotation.x = -Math.PI / 2;
    sand.position.set(x + 30, 0.01, 0);
    group.add(sand);
    for (let i = 0; i < 3; i++) {
      const umb = new THREE.Mesh(new THREE.ConeGeometry(1.4, 0.7, 8), new THREE.MeshStandardMaterial({ color: pick([0xef5350, 0x42a5f5, 0xffee58, 0xffffff]) }));
      umb.position.set(x + 40 + Math.random() * 15, 2, -8 + i * 8);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2, 6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      pole.position.copy(umb.position).setY(1);
      group.add(umb, pole);
    }
    group.add(this.makePalm(x + 2 + Math.random() * 4, 0));
    return { group, length: 24 };
  }

  private compoundPiece(side: number): Scenery {
    // A gated compound: a long white wall, villas with red roofs behind it.
    const group = new THREE.Group();
    const x = this.edge(side, 5);
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.6, 36), new THREE.MeshStandardMaterial({ color: 0xf2eee4 }));
    wall.position.set(x, 1.3, 0);
    group.add(wall);
    const white = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.8 });
    const roof = new THREE.MeshStandardMaterial({ color: 0xb23a2a, roughness: 0.9 });
    for (let i = 0; i < 3; i++) {
      const vx = x + side * (8 + Math.random() * 6);
      const vz = -12 + i * 12;
      const villa = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 8), white);
      villa.position.set(vx, 2.5, vz);
      villa.castShadow = true;
      const top = new THREE.Mesh(new THREE.ConeGeometry(6.2, 2.4, 4), roof);
      top.rotation.y = Math.PI / 4;
      top.position.set(vx, 6.2, vz);
      group.add(villa, top);
      group.add(this.makePalm(vx + side * 5, vz + 3));
    }
    group.add(this.makeLamp(side * (this.halfRoad + SHOULDER + 1.2), -8));
    return { group, length: 36 };
  }

  private fieldsPiece(side: number): Scenery {
    const group = new THREE.Group();
    const x = this.edge(side, 1);
    const roll = Math.random();
    if (roll < 0.55) {
      // A field in rows, and a canal between it and the road.
      const canal = new THREE.Mesh(new THREE.PlaneGeometry(4, 16), new THREE.MeshStandardMaterial({ color: 0x4f7f8f, roughness: 0.3 }));
      canal.rotation.x = -Math.PI / 2;
      canal.position.set(x + side * 3, -0.2, 0);
      group.add(canal);
      const crop = new THREE.MeshStandardMaterial({ color: pick([0x5f9b3a, 0x7bb544, 0x4c8a2f]), roughness: 1 });
      for (let r = 0; r < 6; r++) {
        const row = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5 + Math.random() * 1.2, 15), crop);
        row.position.set(x + side * (8 + r * 2.2), 0.4, 0);
        group.add(row);
      }
      for (let i = 0; i < 2; i++) group.add(this.makePalm(x + side * (22 + Math.random() * 8), -6 + i * 10));
      return { group, length: 16 };
    }
    if (roll < 0.85) {
      // Village houses: short, brick, close to the road.
      const floors = 1 + Math.floor(Math.random() * 3);
      const h = floors * 3;
      const w = 5 + Math.random() * 3;
      const tex = buildingTexture(chance(0.3), floors, this.night);
      const plain = new THREE.MeshStandardMaterial({ color: 0x8f432a, roughness: 0.9 });
      const house = new THREE.Mesh(new THREE.BoxGeometry(w, h, 7), [plain, new THREE.MeshStandardMaterial({ map: tex }), plain, plain, plain, new THREE.MeshStandardMaterial({ map: tex })]);
      house.position.set(x + side * (w / 2 + 1), h / 2, 0);
      house.castShadow = true;
      group.add(house);
      if (chance(0.5)) group.add(this.makePalm(x + side * (w + 4), 3));
      return { group, length: 10 };
    }
    return this.palmsPiece(side);
  }

  private makeLandmark(kind: Landmark): Scenery {
    const group = new THREE.Group();
    const side = chance(0.5) ? -1 : 1;
    const x = this.edge(side, 60);
    switch (kind) {
      case 'pyramids': {
        const stone = new THREE.MeshStandardMaterial({ color: 0xd9bf8c, roughness: 1 });
        for (const [dx, dz, s] of [[0, 0, 70], [60, -40, 58], [110, -70, 42]]) {
          const p = new THREE.Mesh(new THREE.ConeGeometry(s, s * 0.63, 4), stone);
          p.rotation.y = Math.PI / 4;
          p.position.set(x + side * (40 + dx), s * 0.315, dz);
          group.add(p);
        }
        break;
      }
      case 'cairoTower': {
        const tower = new THREE.Mesh(new THREE.CylinderGeometry(4, 5, 90, 16, 1, true), new THREE.MeshStandardMaterial({ map: latticeTexture(), side: THREE.DoubleSide }));
        tower.position.set(x, 45, -20);
        const top = new THREE.Mesh(new THREE.CylinderGeometry(8, 5, 8, 16), new THREE.MeshStandardMaterial({ color: 0xb89a6a }));
        top.position.set(x, 92, -20);
        group.add(tower, top);
        break;
      }
      case 'mosque': {
        const wallMat = new THREE.MeshStandardMaterial({ color: 0xf1e9d2 });
        const base = new THREE.Mesh(new THREE.BoxGeometry(22, 10, 22), wallMat);
        base.position.set(x, 5, 0);
        const dome = new THREE.Mesh(new THREE.SphereGeometry(8, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x2e7d6b }));
        dome.position.set(x, 10, 0);
        const minaret = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.8, 36, 10), wallMat);
        minaret.position.set(x + side * 14, 18, 8);
        group.add(base, dome, minaret);
        break;
      }
      case 'lighthouse': {
        const body = new THREE.Mesh(new THREE.CylinderGeometry(3, 4, 40, 14), new THREE.MeshStandardMaterial({ color: 0xffffff }));
        body.position.set(this.halfRoad + 120, 20, 0);
        const band = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 6, 14), new THREE.MeshStandardMaterial({ color: 0xd32f2f }));
        band.position.set(this.halfRoad + 120, 24, 0);
        const lampMat = new THREE.MeshStandardMaterial({ color: 0xfff1c2, emissive: 0xffd36b, emissiveIntensity: 0 });
        this.lamps.push(lampMat);
        const lamp = new THREE.Mesh(new THREE.SphereGeometry(2.4, 12, 12), lampMat);
        lamp.position.set(this.halfRoad + 120, 42, 0);
        group.add(body, band, lamp);
        break;
      }
      case 'windmills': {
        for (let i = 0; i < 4; i++) {
          const px = x + side * i * 40;
          const pz = -i * 30;
          const mast = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.6, 60, 10), new THREE.MeshStandardMaterial({ color: 0xf5f5f5 }));
          mast.position.set(px, 30, pz);
          const hub = new THREE.Group();
          hub.position.set(px, 60, pz + 2);
          for (let b = 0; b < 3; b++) {
            const blade = new THREE.Mesh(new THREE.BoxGeometry(2, 26, 0.6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
            blade.position.y = 13;
            const arm = new THREE.Group();
            arm.rotation.z = (b / 3) * Math.PI * 2;
            arm.add(blade);
            hub.add(arm);
          }
          this.spinners.push({ mesh: hub, rate: 0.6 + Math.random() * 0.4 });
          group.add(mast, hub);
        }
        break;
      }
      case 'canal': {
        const water = new THREE.Mesh(new THREE.PlaneGeometry(14, 300), new THREE.MeshStandardMaterial({ color: 0x3f7a8a, roughness: 0.2 }));
        water.rotation.x = -Math.PI / 2;
        water.position.set(this.edge(side, 10) + side * 7, -0.25, -100);
        group.add(water);
        break;
      }
      case 'compound':
      default: {
        const piece = this.compoundPiece(side);
        return piece;
      }
    }
    return { group, length: 100 };
  }

  private makeRocks(x: number, z: number): THREE.Group {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0x9e8b6a, roughness: 1 });
    for (let i = 0; i < 4; i++) {
      const r = new THREE.Mesh(new THREE.DodecahedronGeometry(0.4 + Math.random() * 0.8, 0), mat);
      r.position.set(x + (Math.random() - 0.5) * 4, 0.3, z + (Math.random() - 0.5) * 6);
      r.rotation.set(Math.random(), Math.random(), Math.random());
      g.add(r);
    }
    return g;
  }

  private makeLamp(x: number, z: number): THREE.Group {
    const g = new THREE.Group();
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 7, 6), new THREE.MeshStandardMaterial({ color: 0x8a8f96 }));
    pole.position.set(x, 3.5, z);
    g.add(pole);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.08), new THREE.MeshStandardMaterial({ color: 0x8a8f96 }));
    arm.position.set(x - Math.sign(x) * 0.6, 7, z);
    g.add(arm);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xfff1c2, emissive: 0xffd36b, emissiveIntensity: 0 });
    this.lamps.push(headMat);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.2, 0.4), headMat);
    head.position.set(x - Math.sign(x) * 1.2, 7, z);
    g.add(head);
    return g;
  }

  private makePalm(x: number, z: number): THREE.Group {
    const g = new THREE.Group();
    const h = 5 + Math.random() * 4;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.3, h, 7), new THREE.MeshStandardMaterial({ color: 0x7a5a3a, roughness: 1 }));
    trunk.position.set(x, h / 2, z);
    trunk.rotation.z = (Math.random() - 0.5) * 0.15;
    trunk.castShadow = true;
    g.add(trunk);
    const leafMat = new THREE.MeshStandardMaterial({ color: pick([0x2f7d3a, 0x3a8a44, 0x2a6e33]), roughness: 0.9, side: THREE.DoubleSide });
    for (let i = 0; i < 8; i++) {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.5, 3.4, 4), leafMat);
      const a = (i / 8) * Math.PI * 2;
      leaf.position.set(x + Math.cos(a) * 1.2, h + 0.3, z + Math.sin(a) * 1.2);
      leaf.rotation.set(Math.sin(a) * 1.25, 0, -Math.cos(a) * 1.25);
      g.add(leaf);
    }
    const dates = new THREE.Mesh(new THREE.SphereGeometry(0.4, 6, 6), new THREE.MeshStandardMaterial({ color: 0xc77c2a }));
    dates.position.set(x, h - 0.3, z);
    g.add(dates);
    return g;
  }

  private makeBridge(): THREE.Group {
    const g = new THREE.Group();
    const width = this.halfRoad * 2 + 40;
    const concrete = new THREE.MeshStandardMaterial({ color: 0xb8b2a8, roughness: 0.95 });
    const deck = new THREE.Mesh(new THREE.BoxGeometry(width, 1.4, 9), concrete);
    deck.position.set(0, 7.5, 0);
    deck.castShadow = true;
    g.add(deck);
    for (const sx of [-1, 1]) {
      const pier = new THREE.Mesh(new THREE.BoxGeometry(1.6, 7, 3), concrete);
      pier.position.set(sx * (this.halfRoad + SHOULDER + 1.6), 3.5, 0);
      g.add(pier);
    }
    const rail = new THREE.Mesh(new THREE.BoxGeometry(width, 1, 0.2), new THREE.MeshStandardMaterial({ color: 0x3f6fb5 }));
    rail.position.set(0, 8.7, -4.4);
    g.add(rail);
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(6, 2), new THREE.MeshStandardMaterial({ map: signTexture(this.route.name, '#1b5e20', '#ffffff', this.route.place), emissive: 0x111111 }));
    sign.position.set(0, 5.6, 4.6);
    g.add(sign);
    return g;
  }

  private dispose(group: THREE.Object3D): void {
    group.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of mats) {
        const std = m as THREE.MeshStandardMaterial;
        std.map?.dispose();
        const i = this.lamps.indexOf(std);
        if (i >= 0) this.lamps.splice(i, 1);
        m.dispose();
      }
    });
    this.spinners.splice(0, this.spinners.length, ...this.spinners.filter((s) => !this.contains(group, s.mesh)));
  }

  private contains(root: THREE.Object3D, target: THREE.Object3D): boolean {
    let found = false;
    root.traverse((o) => {
      if (o === target) found = true;
    });
    return found;
  }

  get spawnZ(): number {
    return SPAWN_Z;
  }

  get despawnZ(): number {
    return DESPAWN_Z;
  }
}
