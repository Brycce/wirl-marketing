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

// The shell only opens a sliver: with the line length fixed, that is enough
// to make him lurch forward about 3px in the nav, which is all it needs.
export const SHELL_OPEN_TURNS = 2.117;
// The wind-up before the lurch: a moment tighter than rest, which pulls the
// head back 2.4 units so the release has somewhere to come from.
export const SHELL_RETRACT_TURNS = 2.255;
// 2.2 is as tight as it goes before the rings close up at 22px on a 1x screen.
export const SHELL_REST_TURNS = 2.2;

function pinnedShellPoints(turns: number): [number, number][] {
  const total = turns * Math.PI * 2;
  const b = (R_END - A) / total;
  const phase = ANGLE_END - total;
  const pts: [number, number][] = [];
  for (let i = 0; i <= PIN_STEPS; i++) {
    const t = (i / PIN_STEPS) * total;
    const r = A + b * t;
    pts.push([PIN_CX + r * Math.cos(t + phase), PIN_CY + r * Math.sin(t + phase)]);
  }
  return pts;
}

export function pinnedShellPath(turns: number): string {
  const pts = pinnedShellPoints(turns).map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`);
  return `M${pts[0]} L${pts.slice(1).join(' ')}`;
}

// How much line the coil uses. Fewer turns use less, and the rest has to go
// somewhere: Wordmark hands it to the body, so the snail comes out of its shell.
export function pinnedShellLength(turns: number): number {
  const pts = pinnedShellPoints(turns);
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return len;
}
