import { swirlPath } from '../swirl';
import { Piece, P } from './Paper';

// Concept: the wirl is a shell. One stroke leaves the spiral at the bottom,
// runs left along the ground, and lifts into a head with two stalks.
// The spiral's outer end is placed at 80 degrees (just right of straight down)
// so the stroke exits heading left.
const SHELL_PHASE = (170 * Math.PI) / 180;
const SHELL = swirlPath(32, 17, SHELL_PHASE);
export const MARK = swirlPath(16, 16);
const BODY = 'M34.17 29.31 C 27 31.8, 15 33.2, 9 30.2 C 4.6 28, 4.2 23.4, 8.2 22.2';

// The belly ripple. The body is sampled as a polyline so every frame has the
// same number of points, then a wave train travels from the tail to the head,
// the way a snail's foot actually moves. One and a half wavelengths fit on the
// belly, so there is always a hump somewhere and the loop is seamless.
// Both ends stay put: the tail meets the shell, the head is where the eyes are.
type Pt = [number, number];
function cubic(t: number, a: Pt, b: Pt, c: Pt, d: Pt): Pt {
  const u = 1 - t;
  return [
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
  ];
}
const BELLY = 12;
const CURL = 4;
function bellyFrame(phase: number | null): string {
  const pts: string[] = [];
  for (let i = 0; i <= BELLY; i++) {
    const s = i / BELLY;
    const [x, y] = cubic(s, [34.17, 29.31], [27, 31.8], [15, 33.2], [9, 30.2]);
    let dy = 0;
    if (phase !== null) {
      const hump = 0.5 + 0.5 * Math.cos(2 * Math.PI * (1.5 * s - phase));
      dy = -2.0 * hump * hump * Math.sin(Math.PI * s);
    }
    pts.push(`${x.toFixed(2)} ${(y + dy).toFixed(2)}`);
  }
  for (let i = 1; i <= CURL; i++) {
    const [x, y] = cubic(i / CURL, [9, 30.2], [4.6, 28], [4.2, 23.4], [8.2, 22.2]);
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${pts[0]} L${pts.slice(1).join(' ')}`;
}
const BELLY_REST = bellyFrame(null);
const WAVE_STEPS = 12;
const BELLY_FRAMES = Array.from({ length: WAVE_STEPS + 1 }, (_, k) => bellyFrame((k % WAVE_STEPS) / WAVE_STEPS)).join(';');
const STALK_A = 'M8.6 22.4 L5.6 15.2';
const STALK_B = 'M9.6 22.4 L10.6 14.6';

export function SnailMark({ size = 32, className = '', fast = false }: { size?: number; className?: string; fast?: boolean }) {
  const w = fast ? 60 : 48;
  return (
    <svg viewBox={`0 0 ${w} 36`} width={size * (w / 36)} height={size} className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={SHELL} />
        {fast ? (
          <path d={BELLY_REST}>
            <animate attributeName="d" values={BELLY_FRAMES} dur="0.7s" begin="indefinite" repeatCount="indefinite" calcMode="linear" />
          </path>
        ) : (
          <path d={BODY} />
        )}
        <path d={STALK_A} />
        <path d={STALK_B} />
        {fast && (
          <g className="speed">
            <path d="M48 10 h7" />
            <path d="M49.5 17.5 h9" />
            <path d="M48 25 h7" />
          </g>
        )}
      </g>
      <circle cx="5.4" cy="14.6" r="2.1" fill="currentColor" />
      <circle cx="10.8" cy="14" r="2.1" fill="currentColor" />
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
