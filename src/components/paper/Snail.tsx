import { swirlPath } from '../swirl';
import { Piece, P } from './Paper';

// Concept: the wirl is a shell. One stroke leaves the spiral at the bottom,
// runs left along the ground, and lifts into a head with two stalks.
// The spiral's outer end is placed at 80 degrees (just right of straight down)
// so the stroke exits heading left.
const SHELL_PHASE = (170 * Math.PI) / 180;
const SHELL = swirlPath(32, 17, SHELL_PHASE);
const BODY = 'M34.17 29.31 C 27 31.8, 15 33.2, 9 30.2 C 4.6 28, 4.2 23.4, 8.2 22.2';
const STALK_A = 'M8.6 22.4 L5.6 15.2';
const STALK_B = 'M9.6 22.4 L10.6 14.6';

export function SnailMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 48 36" width={size * 1.33} height={size} className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={SHELL} />
        <path d={BODY} />
        <path d={STALK_A} />
        <path d={STALK_B} />
      </g>
      <circle cx="5.4" cy="14.6" r="2.1" fill="currentColor" />
      <circle cx="10.8" cy="14" r="2.1" fill="currentColor" />
    </svg>
  );
}

export function SnailWordmark({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <SnailMark size={size} />
      <span className="font-display font-bold leading-none tracking-[-0.04em]" style={{ fontSize: Math.round(size * 0.95) }}>wirl</span>
    </span>
  );
}

/* The cut-paper snail, about 120 wide and 72 tall, facing left.
   Three sheets: foot, shell, head. `shell` and `body` are colours. */
export function PaperSnail({ id, x = 0, y = 0, s = 1, className, flip = false, shell = P.sun, body = '#9CC5A5', spiral = P.ink }: {
  id: string; x?: number; y?: number; s?: number; className?: string; flip?: boolean; shell?: string; body?: string; spiral?: string;
}) {
  const inner = (
    <>
      <Piece id={id}>
        <rect x="14" y="52" width="100" height="18" rx="9" fill={body} />
        <circle cx="22" cy="44" r="12" fill={body} />
      </Piece>
      <Piece id={id}>
        <circle cx="70" cy="40" r="26" fill={shell} />
        <path d={swirlPath(70, 40, SHELL_PHASE)} fill="none" stroke={spiral} strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" transform="translate(70 40) scale(1.7) translate(-70 -40)" />
      </Piece>
      <Piece id={id}>
        <rect x="12" y="22" width="4.5" height="20" rx="2.25" fill={body} transform="rotate(14 14 42)" />
        <rect x="24" y="20" width="4.5" height="22" rx="2.25" fill={body} transform="rotate(-6 26 42)" />
        <circle cx="10.5" cy="21" r="4.6" fill={P.paper} />
        <circle cx="26.5" cy="19" r="4.6" fill={P.paper} />
        <circle cx="9.6" cy="21" r="2" fill={P.ink} />
        <circle cx="25.6" cy="19" r="2" fill={P.ink} />
      </Piece>
    </>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})${flip ? ' translate(-120 0)' : ''}`} className={className}>
      {inner}
    </g>
  );
}
