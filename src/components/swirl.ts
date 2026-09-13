// The mark: one smooth spiral, drawn once so the wordmark, the favicon, and
// the social image all agree. Coordinates are rounded so the server and the
// client render the same string.
const TURNS = 1.75;
const A = 1.3;
const B = 1.02;
const PHASE = (3 * Math.PI) / 4;
const STEPS = 96;

export function swirlPath(cx = 16, cy = 16): string {
  const total = TURNS * Math.PI * 2;
  const pts: string[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = (i / STEPS) * total;
    const r = A + B * t;
    pts.push(`${(cx + r * Math.cos(t + PHASE)).toFixed(2)} ${(cy + r * Math.sin(t + PHASE)).toFixed(2)}`);
  }
  return `M${pts[0]} L${pts.slice(1).join(' ')}`;
}

export const SWIRL_PATH = swirlPath();
