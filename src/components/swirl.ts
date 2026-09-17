// The mark: one smooth spiral, drawn once so the wordmark, the favicon, and
// the social image all agree. Coordinates are rounded so the server and the
// client render the same string.
const TURNS = 1.75;
const A = 1.3;
const B = 1.02;
const PHASE = (3 * Math.PI) / 4;
const STEPS = 96;

export function swirlPath(cx = 16, cy = 16, phase = PHASE): string {
  const total = TURNS * Math.PI * 2;
  const pts: string[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = (i / STEPS) * total;
    const r = A + B * t;
    pts.push(`${(cx + r * Math.cos(t + phase)).toFixed(2)} ${(cy + r * Math.sin(t + phase)).toFixed(2)}`);
  }
  return `M${pts[0]} L${pts.slice(1).join(' ')}`;
}

export const SWIRL_PATH = swirlPath();

// The shell as a coil whose outer end stays pinned where the body joins it.
// More turns pack in tighter; fewer open it up. At 1.75 turns this is the
// same spiral as the mark, placed where SnailMark draws its shell.
const PIN_CX = 32;
const PIN_CY = 17;
const PIN_PHASE = (170 * Math.PI) / 180;
const PIN_STEPS = 128;
const R_END = A + B * TURNS * Math.PI * 2;
const ANGLE_END = TURNS * Math.PI * 2 + PIN_PHASE;

export const SHELL_OPEN_TURNS = TURNS;
// 2.2 is as tight as it goes before the rings close up at 22px on a 1x screen.
export const SHELL_REST_TURNS = 2.2;

export function pinnedShellPath(turns: number): string {
  const total = turns * Math.PI * 2;
  const b = (R_END - A) / total;
  const phase = ANGLE_END - total;
  const pts: string[] = [];
  for (let i = 0; i <= PIN_STEPS; i++) {
    const t = (i / PIN_STEPS) * total;
    const r = A + b * t;
    pts.push(`${(PIN_CX + r * Math.cos(t + phase)).toFixed(2)} ${(PIN_CY + r * Math.sin(t + phase)).toFixed(2)}`);
  }
  return `M${pts[0]} L${pts.slice(1).join(' ')}`;
}
