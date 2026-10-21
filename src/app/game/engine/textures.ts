import * as THREE from 'three';

/**
 * Textures painted on a canvas at startup instead of downloaded.
 *
 * The game ships no image files: the asphalt, the brickwork, the billboards are all drawn
 * here in a few lines each. It keeps the whole thing under a megabyte and lets the billboards
 * say things in Arabic without a font baked into a PNG.
 */

export function roadTexture(laneCount: number, worn = 0.5): THREE.CanvasTexture {
  const w = 512;
  const h = 512;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;

  g.fillStyle = '#3a3a3f';
  g.fillRect(0, 0, w, h);
  // Grain, so the road is not one flat grey; tyre tracks where the wheels run.
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,.035)' : 'rgba(0,0,0,.07)';
    g.fillRect(Math.random() * w, Math.random() * h, 2, 2);
  }
  const laneW = w / laneCount;
  for (let l = 0; l < laneCount; l++) {
    g.fillStyle = `rgba(0,0,0,${0.08 * worn})`;
    g.fillRect(l * laneW + laneW * 0.2, 0, laneW * 0.18, h);
    g.fillRect(l * laneW + laneW * 0.62, 0, laneW * 0.18, h);
  }
  // Patched cracks.
  g.strokeStyle = 'rgba(0,0,0,.25)';
  g.lineWidth = 2;
  for (let i = 0; i < 6 * worn; i++) {
    g.beginPath();
    let x = Math.random() * w;
    let y = Math.random() * h;
    g.moveTo(x, y);
    for (let s = 0; s < 5; s++) {
      x += (Math.random() - 0.5) * 40;
      y += Math.random() * 30;
      g.lineTo(x, y);
    }
    g.stroke();
  }
  // Edge lines.
  g.fillStyle = '#e8c24a';
  g.fillRect(6, 0, 6, h);
  g.fillRect(w - 12, 0, 6, h);
  // Lane dashes.
  g.fillStyle = '#f2f2f2';
  for (let l = 1; l < laneCount; l++) {
    const x = Math.round(l * laneW) - 3;
    for (let y = 0; y < h; y += 96) g.fillRect(x, y, 6, 48);
  }

  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** The gravel strip beside the asphalt. */
export function shoulderTexture(color: string): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const g = c.getContext('2d')!;
  g.fillStyle = color;
  g.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 700; i++) {
    g.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.14)';
    g.fillRect(Math.random() * 128, Math.random() * 128, 2, 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Cairo brick, with windows. `finished` buildings get plaster; the rest show their bricks. */
export function buildingTexture(finished: boolean, floors: number, night: boolean): THREE.CanvasTexture {
  const w = 256;
  const h = 64 * floors;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;

  if (finished) {
    const tones = ['#d8c9a8', '#cdb892', '#e2d7bf', '#bfae8f', '#d6bfa0', '#efe9dc'];
    g.fillStyle = tones[Math.floor(Math.random() * tones.length)];
    g.fillRect(0, 0, w, h);
    // Balcony slabs.
    g.fillStyle = 'rgba(0,0,0,.14)';
    for (let f = 0; f < floors; f++) g.fillRect(0, f * 64 + 54, w, 4);
  } else {
    g.fillStyle = '#9a4a2c';
    g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(0,0,0,.18)';
    for (let y = 0; y < h; y += 8) {
      const offset = (y / 8) % 2 ? 10 : 0;
      for (let x = -10; x < w; x += 20) g.fillRect(x + offset, y, 19, 1);
      g.fillRect(0, y + 7, w, 1);
    }
    // Concrete columns and slabs between the brick.
    g.fillStyle = '#b9b2a6';
    for (let f = 0; f < floors; f++) g.fillRect(0, f * 64, w, 6);
    for (let x = 0; x < w; x += 64) g.fillRect(x, 0, 8, h);
  }

  // Windows: some lit, some dark, some with an air-conditioner box under them.
  for (let f = 0; f < floors; f++) {
    for (let x = 20; x < w - 20; x += 48) {
      const lit = Math.random() > (night ? 0.35 : 0.8);
      g.fillStyle = lit ? '#f7e3a1' : '#1b2430';
      g.fillRect(x, f * 64 + 18, 26, 30);
      g.fillStyle = 'rgba(255,255,255,.25)';
      g.fillRect(x, f * 64 + 18, 26, 2);
      if (Math.random() > 0.6) {
        g.fillStyle = '#cfcfcf';
        g.fillRect(x + 4, f * 64 + 50, 18, 9);
      }
    }
  }

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const BILLBOARDS = [
  'عروض العيد · خصم ٥٠٪',
  'شقق تمليك · مقدم ١٠٪',
  'كشري أبو طارق',
  'اشترك دلوقتي',
  'مدينة جديدة · ساعة من هنا',
  'بطاطس شيبسي',
  'سيراميك كليوباترا',
  'سوبر ماركت ٢٤ ساعة',
  'شاليهات الساحل · قسّط على ٨ سنين',
  'كابتن ماجد للمقاولات',
  'عصير قصب أبو عوف',
  'مول جديد · افتتاح قريب',
];

export function billboardTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 256;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  const hues = ['#d32f2f', '#1565c0', '#2e7d32', '#ef6c00', '#6a1b9a', '#00838f'];
  g.fillStyle = hues[Math.floor(Math.random() * hues.length)];
  g.fillRect(0, 0, w, h);
  g.fillStyle = 'rgba(255,255,255,.12)';
  g.fillRect(0, h * 0.62, w, h * 0.38);
  g.fillStyle = '#ffffff';
  g.font = 'bold 56px "Changa", "Cairo", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.direction = 'rtl';
  g.fillText(BILLBOARDS[Math.floor(Math.random() * BILLBOARDS.length)], w / 2, h * 0.42);
  g.font = '28px "Cairo", sans-serif';
  g.fillStyle = 'rgba(255,255,255,.85)';
  g.fillText('اتصل ١٩٠٠٠', w / 2, h * 0.8);

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** A plain text panel — the radar sign, the checkpoint sign, the route's own sign. */
export function signTexture(text: string, bg: string, fg = '#ffffff', sub = ''): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 128;
  const g = c.getContext('2d')!;
  g.fillStyle = bg;
  g.fillRect(0, 0, 256, 128);
  g.strokeStyle = fg;
  g.lineWidth = 8;
  g.strokeRect(6, 6, 244, 116);
  g.fillStyle = fg;
  g.font = `bold ${sub ? 44 : 54}px "Changa", "Cairo", sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.direction = 'rtl';
  g.fillText(text, 128, sub ? 48 : 66);
  if (sub) {
    g.font = '24px "Cairo", sans-serif';
    g.fillText(sub, 128, 92);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** The sea: a slow swell drawn as foam lines, scrolled by the world. */
export function seaTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const g = c.getContext('2d')!;
  g.fillStyle = '#2a7fb8';
  g.fillRect(0, 0, 256, 256);
  g.strokeStyle = 'rgba(255,255,255,.22)';
  g.lineWidth = 2;
  for (let i = 0; i < 18; i++) {
    g.beginPath();
    const y = Math.random() * 256;
    g.moveTo(0, y);
    for (let x = 0; x <= 256; x += 16) g.lineTo(x, y + Math.sin(x / 20 + i) * 4);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** The lattice of the Cairo Tower. */
export function latticeTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 256;
  const g = c.getContext('2d')!;
  g.fillStyle = '#b89a6a';
  g.fillRect(0, 0, 128, 256);
  g.strokeStyle = 'rgba(60,40,20,.6)';
  g.lineWidth = 3;
  for (let i = -8; i < 8; i++) {
    g.beginPath();
    g.moveTo(i * 32, 0);
    g.lineTo(i * 32 + 128, 256);
    g.stroke();
    g.beginPath();
    g.moveTo(i * 32 + 128, 0);
    g.lineTo(i * 32, 256);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 6);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
