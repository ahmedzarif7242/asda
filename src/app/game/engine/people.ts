import * as THREE from 'three';

/**
 * The people in the cars, and what they say.
 *
 * A person is a head, a body, two arms and two legs — enough to lean out of a window and
 * wave, or stand in the road and point. A line of speech is a sprite with the words drawn
 * on a canvas, held over the speaker's head.
 */
export interface Person {
  group: THREE.Group;
  leftArm: THREE.Mesh;
  rightArm: THREE.Mesh;
  bubble: THREE.Sprite | null;
}

const SKIN = [0xf1c27d, 0xe0ac69, 0xc68642, 0x8d5524, 0xffdbac];
const SHIRT = [0xffffff, 0x1565c0, 0x2e7d32, 0x9e9e9e, 0x5d4037, 0x000000, 0xd32f2f, 0xfbc02d];

export function buildPerson(): Person {
  const group = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: SKIN[Math.floor(Math.random() * SKIN.length)], roughness: 0.9 });
  const shirt = new THREE.MeshStandardMaterial({ color: SHIRT[Math.floor(Math.random() * SHIRT.length)], roughness: 0.9 });
  const trousers = new THREE.MeshStandardMaterial({ color: Math.random() > 0.5 ? 0x263238 : 0x37474f, roughness: 0.9 });

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), skin);
  head.position.y = 1.62;
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.165, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x1a1a1a }));
  hair.position.y = 1.64;
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.6, 0.24), shirt);
  body.position.y = 1.16;
  const legs = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.86, 0.22), trousers);
  legs.position.y = 0.43;

  const arm = () => {
    const a = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.56, 0.11), shirt);
    // Pivot at the shoulder.
    a.geometry.translate(0, -0.28, 0);
    a.position.y = 1.42;
    return a;
  };
  const leftArm = arm();
  leftArm.position.x = -0.27;
  const rightArm = arm();
  rightArm.position.x = 0.27;

  group.add(head, hair, body, legs, leftArm, rightArm);
  group.traverse((o) => ((o as THREE.Mesh).castShadow = true));
  return { group, leftArm, rightArm, bubble: null };
}

export function say(person: Person, text: string, scene: THREE.Scene): void {
  if (person.bubble) {
    person.group.remove(person.bubble);
    (person.bubble.material as THREE.SpriteMaterial).map?.dispose();
    person.bubble.material.dispose();
  }
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 160;
  const g = c.getContext('2d')!;
  g.fillStyle = 'rgba(255,255,255,.96)';
  const r = 28;
  g.beginPath();
  g.moveTo(r, 10);
  g.lineTo(512 - r, 10);
  g.quadraticCurveTo(512 - 10, 10, 512 - 10, 10 + r);
  g.lineTo(512 - 10, 120 - r);
  g.quadraticCurveTo(512 - 10, 120, 512 - r, 120);
  g.lineTo(280, 120);
  g.lineTo(256, 150);
  g.lineTo(232, 120);
  g.lineTo(r, 120);
  g.quadraticCurveTo(10, 120, 10, 120 - r);
  g.lineTo(10, 10 + r);
  g.quadraticCurveTo(10, 10, r, 10);
  g.closePath();
  g.fill();
  g.fillStyle = '#1b1200';
  g.font = 'bold 44px "Changa", "Cairo", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.direction = 'rtl';
  g.fillText(text, 256, 66);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
  sprite.scale.set(3.2, 1, 1);
  sprite.position.y = 2.4;
  sprite.renderOrder = 10;
  person.group.add(sprite);
  person.bubble = sprite;
  void scene;
}

export function hush(person: Person): void {
  if (!person.bubble) return;
  person.group.remove(person.bubble);
  (person.bubble.material as THREE.SpriteMaterial).map?.dispose();
  person.bubble.material.dispose();
  person.bubble = null;
}

/** Arms up and waving, the way a man shouts at traffic. `t` is seconds. */
export function gesture(person: Person, t: number, both: boolean): void {
  person.rightArm.rotation.z = -2.4 + Math.sin(t * 14) * 0.5;
  person.rightArm.rotation.x = Math.sin(t * 9) * 0.3;
  if (both) {
    person.leftArm.rotation.z = 2.4 - Math.sin(t * 14 + 1) * 0.5;
    person.leftArm.rotation.x = Math.cos(t * 9) * 0.3;
  } else {
    person.leftArm.rotation.z = 0.2;
  }
}

export function relax(person: Person): void {
  person.leftArm.rotation.set(0, 0, 0.1);
  person.rightArm.rotation.set(0, 0, -0.1);
}

export const LIGHT_LINES = ['فين عينك يا عم؟!', 'شوف قدامك!', 'إنت نايم؟!', 'حاسب يا باشا!', 'يا عم إنت!', 'ماشي يا أسطى؟!'];

/** The argument, as the two of them take turns. The last line is always the one that ends it. */
export const BRAWL_LINES: [string, string][] = [
  ['إنت أعمى؟!', 'مين اللي أعمى؟!'],
  ['عربيتي يا عم!', 'عربيتك إيه؟ إنت اللي جاي عليا!'],
  ['هات رخصتك!', 'رخصتي في جيبي، عايز إيه؟'],
  ['حاسب بقى!', 'أنا اللي أحاسب؟!'],
  ['خلاص يا عم… ماشي', 'ماشي ماشي، ربنا يهديك'],
];
