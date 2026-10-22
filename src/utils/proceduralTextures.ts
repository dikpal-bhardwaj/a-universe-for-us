/**
 * Procedural Texture Generation Suite
 * Ensures zero-dependency, zero-404 WebGL textures with SRGBColorSpace,
 * high visual fidelity, and graceful fallbacks.
 */
import * as THREE from 'three';

/**
 * Creates a glowing circular starlight particle texture with soft falloff and diffraction glow.
 */
export function createStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const center = 64;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, 64);
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.12, 'rgba(255, 240, 210, 0.95)');
    gradient.addColorStop(0.35, 'rgba(180, 150, 255, 0.45)');
    gradient.addColorStop(0.7, 'rgba(100, 70, 200, 0.12)');
    gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    // Subtle 4-point cross diffraction flare
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(center, 16);
    ctx.lineTo(center, 112);
    ctx.moveTo(16, center);
    ctx.lineTo(112, center);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates a rich, swirling planetary surface texture with continents, atmosphere, and stardust veins.
 */
export function createPlanetSurfaceTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Deep cosmic ocean base
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#100B2B');
    grad.addColorStop(0.3, '#19154C');
    grad.addColorStop(0.5, '#2B1C6D');
    grad.addColorStop(0.7, '#19154C');
    grad.addColorStop(1.0, '#0D0826');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Continental landmasses and glowing mineral swirls
    for (let i = 0; i < 45; i++) {
      const cx = (i * 247) % 1024;
      const cy = 60 + ((i * 183) % 390);
      const rad = 40 + (i % 7) * 20;

      const blobGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, rad);
      blobGrad.addColorStop(0.0, 'rgba(240, 180, 230, 0.6)');
      blobGrad.addColorStop(0.4, 'rgba(130, 90, 210, 0.45)');
      blobGrad.addColorStop(0.8, 'rgba(70, 45, 140, 0.2)');
      blobGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = blobGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Atmospheric swirls and golden stardust bands
    ctx.fillStyle = 'rgba(255, 230, 180, 0.12)';
    for (let y = 100; y < 450; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= 1024; x += 64) {
        const ny = y + Math.sin(x * 0.015 + y) * 14 + Math.cos(x * 0.03) * 6;
        ctx.lineTo(x, ny);
      }
      ctx.lineTo(1024, y + 16);
      ctx.lineTo(0, y + 16);
      ctx.closePath();
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates a translucent planetary ring texture with subtle concentric dust lanes.
 */
export function createRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0.0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.15, 'rgba(210, 180, 255, 0.25)');
    grad.addColorStop(0.35, 'rgba(255, 220, 190, 0.65)');
    grad.addColorStop(0.5, 'rgba(60, 40, 120, 0.1)'); // Cassini-like division
    grad.addColorStop(0.65, 'rgba(230, 195, 255, 0.75)');
    grad.addColorStop(0.85, 'rgba(255, 240, 210, 0.4)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Generates an elegant procedural memory canvas texture when an image file
 * is loading or absent, ensuring zero visual breakage and gorgeous presentation.
 */
export function createMemoryFallbackTexture(
  title: string,
  date: string | undefined,
  motif: string,
  themeColor: string,
  accentColor: string,
  width = 600,
  height = 700
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Elegant deep space gradient frame
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0.0, '#0C0E24');
    bgGrad.addColorStop(0.5, '#171A3F');
    bgGrad.addColorStop(1.0, '#0A081D');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Glowing nebula core
    const nebGrad = ctx.createRadialGradient(width / 2, height / 2 - 40, 30, width / 2, height / 2 - 40, width * 0.45);
    nebGrad.addColorStop(0.0, themeColor + '66');
    nebGrad.addColorStop(0.6, accentColor + '33');
    nebGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = nebGrad;
    ctx.fillRect(0, 0, width, height);

    // Cosmic motif rings
    ctx.save();
    ctx.translate(width / 2, height / 2 - 40);
    ctx.strokeStyle = accentColor + '44';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 90, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = themeColor + '66';
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.arc(0, 0, 130, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Central celestial icon
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();

    // 4 diffraction spikes
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -35);
    ctx.lineTo(0, 35);
    ctx.moveTo(-35, 0);
    ctx.lineTo(35, 0);
    ctx.stroke();

    ctx.restore();

    // Fine decorative border
    ctx.strokeStyle = 'rgba(255, 230, 180, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(18, 18, width - 36, height - 36);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.strokeRect(26, 26, width - 52, height - 52);

    // Corner accents
    const corners = [
      [22, 22],
      [width - 22, 22],
      [22, height - 22],
      [width - 22, height - 22],
    ];
    ctx.fillStyle = accentColor;
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Date header
    if (date) {
      ctx.font = '500 15px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 220, 170, 0.85)';
      ctx.letterSpacing = '3px';
      ctx.fillText(date.toUpperCase(), width / 2, height - 120);
    }

    // Memory title
    ctx.font = '600 24px "Cormorant Garamond", serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.letterSpacing = '1px';

    // Word wrap title
    const words = title.split(' ');
    let line = '';
    let yPos = height - 80;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > width - 80 && n > 0) {
        ctx.fillText(line, width / 2, yPos);
        line = words[n] + ' ';
        yPos += 30;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, width / 2, yPos);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
