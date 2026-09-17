import type { Ref } from 'react';
import { swirlPath, pinnedShellPath } from '../swirl';
import { Piece, P } from './Paper';

// Concept: the wirl is a shell. One stroke leaves the spiral at the bottom,
// runs left along the ground, and lifts into a head with two stalks.
// The spiral's outer end is placed at 80 degrees (just right of straight down)
// so the stroke exits heading left.
const SHELL_PHASE = (170 * Math.PI) / 180;
const SHELL = swirlPath(32, 17, SHELL_PHASE);
export const MARK = swirlPath(16, 16);
const BODY = 'M34.17 29.31 C 27 31.8, 15 33.2, 9 30.2 C 4.6 28, 4.2 23.4, 8.2 22.2';
const STALK_A = 'M8.6 22.4 L5.6 15.2';
const STALK_B = 'M9.6 22.4 L10.6 14.6';

// Coming out of the shell. The body is a belly (first curve, from the shell to
// under the head) and a neck (second curve, up to the stalks). To lengthen it,
// the head moves forward by dx: the belly stretches along x from the point where
// it leaves the shell, and the neck, stalks, and eyes slide along with the head
// without changing shape. Nothing bends; the line just gets longer.
type Pt = [number, number];
const JOIN: Pt = [34.17, 29.31];
const BELLY_END_X = 9;
function bellyStretch(dx: number) {
  return (JOIN[0] - (BELLY_END_X - dx)) / (JOIN[0] - BELLY_END_X);
}
function stretchX(x: number, k: number) {
  return JOIN[0] + (x - JOIN[0]) * k;
}
function cubicAt(t: number, a: Pt, b: Pt, c: Pt, d: Pt): Pt {
  const u = 1 - t;
  return [
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
  ];
}
function bellyLength(dx: number) {
  const k = bellyStretch(dx);
  const b: Pt = [stretchX(27, k), 31.8];
  const c: Pt = [stretchX(15, k), 33.2];
  const d: Pt = [BELLY_END_X - dx, 30.2];
  let len = 0;
  let prev = JOIN;
  for (let i = 1; i <= 64; i++) {
    const p = cubicAt(i / 64, JOIN, b, c, d);
    len += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
    prev = p;
  }
  return len;
}
// Extra belly length for each head position, so a length can be turned back
// into a position without solving anything per frame.
const STRETCH_TABLE: Pt[] = [];
{
  const base = bellyLength(0);
  for (let dx = 0; dx <= 40; dx += 0.25) STRETCH_TABLE.push([bellyLength(dx) - base, dx]);
}

export const BODY_REST = BODY;

/** How far the head has to move forward to take up `extra` units of line. */
export function headShiftForLength(extra: number): number {
  if (extra <= 0) return 0;
  for (let i = 1; i < STRETCH_TABLE.length; i++) {
    const [l1, d1] = STRETCH_TABLE[i];
    if (l1 >= extra) {
      const [l0, d0] = STRETCH_TABLE[i - 1];
      return d0 + ((d1 - d0) * (extra - l0)) / (l1 - l0);
    }
  }
  return STRETCH_TABLE[STRETCH_TABLE.length - 1][1];
}

/** The body with its head moved forward by dx. */
export function bodyPath(dx: number): string {
  if (dx <= 0) return BODY;
  const k = bellyStretch(dx);
  const f = (n: number) => n.toFixed(2);
  return `M34.17 29.31 C ${f(stretchX(27, k))} 31.8, ${f(stretchX(15, k))} 33.2, ${f(BELLY_END_X - dx)} 30.2 C ${f(4.6 - dx)} 28, ${f(4.2 - dx)} 23.4, ${f(8.2 - dx)} 22.2`;
}

export function SnailMark({ size = 32, className = '', fast = false, shellRef, bodyRef, headRef, shellTurns }: {
  size?: number; className?: string; fast?: boolean; shellTurns?: number;
  shellRef?: Ref<SVGPathElement>; bodyRef?: Ref<SVGPathElement>; headRef?: Ref<SVGGElement>;
}) {
  const w = fast ? 60 : 48;
  return (
    <svg viewBox={`0 0 ${w} 36`} width={size * (w / 36)} height={size} className={className} style={{ overflow: 'visible' }} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path ref={shellRef} d={shellTurns ? pinnedShellPath(shellTurns) : SHELL} />
        <path ref={bodyRef} d={BODY} />
        <g ref={headRef}>
          <path d={STALK_A} />
          <path d={STALK_B} />
          <circle cx="5.4" cy="14.6" r="2.1" fill="currentColor" stroke="none" />
          <circle cx="10.8" cy="14" r="2.1" fill="currentColor" stroke="none" />
        </g>
        {fast && (
          <g className="speed">
            <path d="M48 10 h7" />
            <path d="M49.5 17.5 h9" />
            <path d="M48 25 h7" />
          </g>
        )}
      </g>
    </svg>
  );
}

export function SnailWordmark({ size = 28, fast = false }: { size?: number; fast?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <SnailMark size={size} fast={fast} />
      <span className="font-display font-bold leading-none tracking-[-0.04em]" style={{ fontSize: Math.round(size * 0.95) }}>wirl</span>
    </span>
  );
}

/* The cut-paper snail, about 120 wide and 72 tall, facing left.
   Three sheets: foot, shell, head. `shell` and `body` are colours. */
export function PaperSnail({ id, x = 0, y = 0, s = 1, className, flip = false, fast = false, locked = false, star = false, shell = P.sun, body = '#9CC5A5', spiral = P.ink }: {
  id: string; x?: number; y?: number; s?: number; className?: string; flip?: boolean; fast?: boolean; locked?: boolean; star?: boolean; shell?: string; body?: string; spiral?: string;
}) {
  const inner = (
    <>
      {fast && (
        <Piece id={id} flat className="strips">
          <rect x="112" y="34" width="26" height="5" rx="2.5" fill={P.paper} />
          <rect x="118" y="46" width="38" height="5" rx="2.5" fill={P.paper} />
          <rect x="112" y="58" width="26" height="5" rx="2.5" fill={P.paper} />
        </Piece>
      )}
      <Piece id={id}>
        <rect x="14" y="52" width="100" height="18" rx="9" fill={body} />
        <circle cx="22" cy="44" r="12" fill={body} />
      </Piece>
      <Piece id={id}>
        <circle cx="70" cy="40" r="26" fill={shell} />
        <path d={swirlPath(70, 40, SHELL_PHASE)} fill="none" stroke={spiral} strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" transform="translate(70 40) scale(1.7) translate(-70 -40)" />
      </Piece>
      {locked && (
        <Piece id={id} className="badge-lock">
          <path d="M84 62 v-4 a5 5 0 0 1 10 0 v4" stroke={P.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="80" y="61" width="18" height="13" rx="3" fill={P.sun} />
          <circle cx="89" cy="66.5" r="1.8" fill={P.ink} />
        </Piece>
      )}
      {star && (
        <Piece id={id} className="badge-star" flat>
          <path transform="translate(50 24)" d="M0 -9 L2.2 -2.2 L9 0 L2.2 2.2 L0 9 L-2.2 2.2 L-9 0 L-2.2 -2.2 Z" fill={P.coral} />
        </Piece>
      )}
      <Piece id={id}>
        <g className="stalks">
          <rect x="12" y="22" width="4.5" height="20" rx="2.25" fill={body} transform="rotate(14 14 42)" />
          <rect x="24" y="20" width="4.5" height="22" rx="2.25" fill={body} transform="rotate(-6 26 42)" />
          <circle cx="10.5" cy="21" r="4.6" fill={P.paper} />
          <circle cx="26.5" cy="19" r="4.6" fill={P.paper} />
          <circle cx="9.6" cy="21" r="2" fill={P.ink} />
          <circle cx="25.6" cy="19" r="2" fill={P.ink} />
        </g>
      </Piece>
    </>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})${flip ? ' translate(-120 0)' : ''}`} className={className}>
      {inner}
    </g>
  );
}
