import type { ReactNode } from 'react';

// Cut-paper primitives. Every piece is flat colour with a slightly deckled
// edge and a soft lifted shadow, so simple geometry reads as paper on a table.
// No outlines anywhere: shapes are defined by colour and shadow alone.

export const P = {
  ink: '#1F2A1F',
  paper: '#FCF8F0',
  cream: '#F5EFE3',
  sand: '#E1D8C1',
  wood: '#D8C39A',
  dark: '#33402F',
  green: '#2F7D4F',
  screen: '#1E3A2B',
  phosphor: '#8FD39A',
  mint: '#BFDCC5',
  sky: '#BFD9EA',
  slate: '#A9B8C4',
  blue: '#4F86C6',
  sun: '#F2C14E',
  coral: '#E4795C',
  blush: '#F0C9BC',
  lilac: '#B9AEDD',
  grey: '#C9C3B4',
  red: '#C8433D',
  skin: ['#F1C9A5', '#D9A377', '#8D5A3B', '#F5D7C2'],
  hair: ['#3B2A22', '#D9A441', '#1F1A17', '#B24A2C'],
};

export function Defs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-paper`} x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7" result="warp" />
        <feDisplacementMap in="SourceGraphic" in2="warp" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
        <feDropShadow dx="0" dy="2.5" stdDeviation="2.4" floodColor="#1F2A1F" floodOpacity="0.24" />
      </filter>
      <pattern id="check" width="14" height="14" patternUnits="userSpaceOnUse">
        <rect width="7" height="7" fill="#FCF8F0" /><rect x="7" y="7" width="7" height="7" fill="#FCF8F0" />
      </pattern>
      <filter id={`${id}-flat`} x="-25%" y="-25%" width="150%" height="150%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="3" result="warp" />
        <feDisplacementMap in="SourceGraphic" in2="warp" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  );
}

type Common = { id: string; x?: number; y?: number; r?: number; s?: number; className?: string };

/* One sheet of paper: positioned, optionally tilted, with its own shadow.
   The animation class goes on a middle group so CSS transforms compose with
   the placement instead of replacing it. */
export function Piece({ id, x = 0, y = 0, r = 0, s = 1, flat = false, className, children }: Common & { flat?: boolean; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <g className={className}>
        <g filter={`url(#${id}-${flat ? 'flat' : 'paper'})`}>{children}</g>
      </g>
    </g>
  );
}

export function Scene({ id, w = 560, h = 420, className = '', children }: { id: string; w?: number; h?: number; className?: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" className={`block h-auto ${className}`} aria-hidden="true" focusable="false">
      <Defs id={id} />
      {children}
    </svg>
  );
}

export function Ground({ id, y, x = 30, w = 500 }: { id: string; y: number; x?: number; w?: number }) {
  return (
    <Piece id={id} x={x} y={y} flat>
      <rect width={w} height="8" rx="4" fill={P.sand} />
    </Piece>
  );
}

/* A person, 44 wide and 90 tall from the top of the hair to the shoes.
   Two sheets: body, then head, so the head sits on the body with its own shadow. */
export function Person({ id, x = 0, y = 0, r = 0, s = 1, className, shirt, skin = 0, hair = 0, style = 'cap', sit = false }: Common & {
  shirt: string; skin?: number; hair?: number; style?: 'cap' | 'bun' | 'long' | 'curly'; sit?: boolean;
}) {
  const sk = P.skin[skin];
  const hr = P.hair[hair];
  return (
    <>
      <Piece id={id} x={x} y={y} r={r} s={s} className={className}>
        <rect x="6" y="30" width="32" height={sit ? 30 : 38} rx="9" fill={shirt} />
        {!sit && (
          <>
            <rect x="11" y="62" width="9" height="28" rx="4" fill={P.dark} />
            <rect x="24" y="62" width="9" height="28" rx="4" fill={P.dark} />
          </>
        )}
        <rect x="1" y="34" width="8" height="26" rx="4" fill={shirt} transform="rotate(10 5 34)" />
        <rect x="35" y="34" width="8" height="26" rx="4" fill={shirt} transform="rotate(-10 39 34)" />
        <circle cx="3" cy="60" r="4.2" fill={sk} />
        <circle cx="41" cy="60" r="4.2" fill={sk} />
      </Piece>
      <Piece id={id} x={x} y={y} r={r} s={s} className={className}>
        <circle cx="22" cy="16" r="14" fill={sk} />
        <path d="M8 13 A14 14 0 0 1 36 13 Z" fill={hr} />
        {style === 'bun' && <circle cx="33" cy="4" r="5.5" fill={hr} />}
        {style === 'long' && (
          <>
            <rect x="7" y="12" width="6" height="18" rx="3" fill={hr} />
            <rect x="31" y="12" width="6" height="18" rx="3" fill={hr} />
          </>
        )}
        {style === 'curly' && (
          <>
            <circle cx="9" cy="10" r="4.5" fill={hr} />
            <circle cx="22" cy="2" r="4.5" fill={hr} />
            <circle cx="35" cy="10" r="4.5" fill={hr} />
          </>
        )}
        <circle cx="17" cy="19" r="1.8" fill={P.ink} />
        <circle cx="27" cy="19" r="1.8" fill={P.ink} />
      </Piece>
    </>
  );
}

/* A robot, 48 wide and 69 tall. Two sheets, body then head. */
export function Robot({ id, x = 0, y = 0, r = 0, s = 1, className, tone = P.slate, arms = 'down' }: Common & { tone?: string; arms?: 'down' | 'up' }) {
  return (
    <>
      <Piece id={id} x={x} y={y} r={r} s={s} className={className}>
        {arms === 'down' ? (
          <>
            <rect x="0" y="40" width="8" height="18" rx="4" fill={tone} />
            <rect x="40" y="40" width="8" height="18" rx="4" fill={tone} />
          </>
        ) : (
          <>
            <rect x="0" y="24" width="8" height="20" rx="4" fill={tone} transform="rotate(-35 4 44)" />
            <rect x="40" y="24" width="8" height="20" rx="4" fill={tone} transform="rotate(35 44 44)" />
          </>
        )}
        <rect x="10" y="38" width="28" height="22" rx="6" fill={tone} />
        <circle cx="24" cy="49" r="3.5" fill={P.sun} />
        <rect x="6" y="60" width="36" height="9" rx="4.5" fill={P.ink} />
      </Piece>
      <Piece id={id} x={x} y={y} r={r} s={s} className={className}>
        <rect x="22" y="2" width="4" height="8" fill={P.ink} />
        <circle cx="24" cy="2.5" r="3.2" fill={P.coral} className="blink-slow" />
        <rect x="6" y="9" width="36" height="28" rx="8" fill={tone} />
        <rect x="13" y="18" width="7" height="9" rx="2.5" fill={P.ink} />
        <rect x="28" y="18" width="7" height="9" rx="2.5" fill={P.ink} />
        <rect x="18" y="30" width="12" height="2.6" rx="1.3" fill={P.ink} />
      </Piece>
    </>
  );
}

/* An app: a window with a coloured title bar. On Wirl the bar is green and it wears a lock. */
export function AppCard({ id, x = 0, y = 0, r = 0, s = 1, className, w = 72, h = 54, tone = P.blue, onWirl = false, extra = false }: Common & {
  w?: number; h?: number; tone?: string; onWirl?: boolean; extra?: boolean;
}) {
  return (
    <Piece id={id} x={x} y={y} r={r} s={s} className={className}>
      <rect width={w} height={h} rx="7" fill={P.paper} />
      <path d={`M0 7 a7 7 0 0 1 7 -7 h${w - 14} a7 7 0 0 1 7 7 v6 H0 Z`} fill={onWirl ? P.green : tone} />
      <circle cx="8" cy="6.5" r="1.7" fill={P.paper} opacity="0.9" />
      <circle cx="13.5" cy="6.5" r="1.7" fill={P.paper} opacity="0.9" />
      <circle cx="19" cy="6.5" r="1.7" fill={P.paper} opacity="0.9" />
      <rect x="9" y="20" width={w * 0.55} height="4.5" rx="2.25" fill={P.sand} />
      <rect x="9" y="29" width={w * 0.72} height="4.5" rx="2.25" fill={P.sand} />
      <rect x="9" y="38" width={w * 0.4} height="4.5" rx="2.25" fill={extra ? P.coral : P.sand} />
      {onWirl && (
        <g transform={`translate(${w - 21} ${h - 20})`}>
          <path d="M4 8 v-3 a3.5 3.5 0 0 1 7 0 V8" stroke={P.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <rect x="1.5" y="7.5" width="12" height="9" rx="2" fill={P.sun} />
        </g>
      )}
    </Piece>
  );
}

/* A cloud, 220 by 96. */
export function Cloud({ id, x = 0, y = 0, s = 1, className, tone = P.paper }: Common & { tone?: string }) {
  return (
    <Piece id={id} x={x} y={y} s={s} className={className}>
      <rect x="0" y="52" width="220" height="44" rx="22" fill={tone} />
      <circle cx="60" cy="54" r="38" fill={tone} />
      <circle cx="118" cy="42" r="46" fill={tone} />
      <circle cx="172" cy="58" r="32" fill={tone} />
    </Piece>
  );
}

/* A padlock, 34 wide. Open swings the shackle off to the right. */
export function Lock({ id, x = 0, y = 0, s = 1, r = 0, className, open = false }: Common & { open?: boolean }) {
  return (
    <Piece id={id} x={x} y={y} s={s} r={r} className={className}>
      <path d={open ? 'M18 18 v-8 a9 9 0 0 1 18 0 v3' : 'M8 18 v-6 a9 9 0 0 1 18 0 v6'} stroke={P.ink} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <rect x="0" y="17" width="34" height="26" rx="5" fill={P.sun} />
      <circle cx="17" cy="28" r="3.2" fill={P.ink} />
      <rect x="15.5" y="28" width="3" height="6.5" rx="1.5" fill={P.ink} />
    </Piece>
  );
}

/* A laptop with a green terminal on it, 76 by 48. */
export function Laptop({ id, x = 0, y = 0, s = 1, r = 0, className }: Common) {
  return (
    <Piece id={id} x={x} y={y} s={s} r={r} className={className}>
      <rect x="6" y="0" width="64" height="42" rx="4" fill={P.dark} />
      <rect x="10" y="4" width="56" height="34" rx="2" fill={P.screen} />
      <rect x="14" y="9" width="24" height="3" rx="1.5" fill={P.phosphor} />
      <rect x="14" y="15" width="36" height="3" rx="1.5" fill={P.phosphor} opacity="0.8" />
      <rect x="14" y="21" width="18" height="3" rx="1.5" fill={P.phosphor} opacity="0.8" />
      <rect x="14" y="27" width="30" height="3" rx="1.5" fill={P.phosphor} opacity="0.6" />
      <rect x="0" y="41" width="76" height="7" rx="3" fill={P.dark} />
    </Piece>
  );
}

export function Desk({ id, x = 0, y = 0, w = 440 }: Common & { w?: number }) {
  return (
    <Piece id={id} x={x} y={y}>
      <rect x="12" y="10" width="10" height="28" fill={P.wood} />
      <rect x={w - 22} y="10" width="10" height="28" fill={P.wood} />
      <rect width={w} height="12" rx="4" fill={P.wood} />
    </Piece>
  );
}

/* Stickers. */
export function Warn({ id, x = 0, y = 0, s = 1, r = 0, className }: Common) {
  return (
    <Piece id={id} x={x} y={y} s={s} r={r} className={className}>
      <path d="M14 1 L27 24 H1 Z" fill={P.sun} />
      <rect x="12.4" y="9" width="3.2" height="8" rx="1.6" fill={P.ink} />
      <circle cx="14" cy="20.5" r="1.8" fill={P.ink} />
    </Piece>
  );
}

export function Flame({ id, x = 0, y = 0, s = 1, className }: Common) {
  return (
    <Piece id={id} x={x} y={y} s={s} className={className}>
      <path d="M12 0 C16 7 24 11 24 19 A12 12 0 0 1 0 19 C0 11 8 7 12 0 Z" fill={P.coral} />
      <path d="M12 10 C14 14 18 15 18 20 A6 6 0 0 1 6 20 C6 15 10 14 12 10 Z" fill={P.sun} />
    </Piece>
  );
}

export function Clock({ id, x = 0, y = 0, s = 1, className }: Common) {
  return (
    <Piece id={id} x={x} y={y} s={s} className={className}>
      <circle cx="13" cy="13" r="13" fill={P.ink} />
      <circle cx="13" cy="13" r="10" fill={P.paper} />
      <rect x="12" y="5.5" width="2" height="8.5" rx="1" fill={P.ink} />
      <rect x="12" y="12" width="7" height="2" rx="1" fill={P.ink} />
    </Piece>
  );
}

export function Skull({ id, x = 0, y = 0, s = 1, className }: Common) {
  return (
    <Piece id={id} x={x} y={y} s={s} className={className}>
      <circle cx="12" cy="11" r="11" fill={P.paper} />
      <rect x="6" y="15" width="12" height="8" rx="2" fill={P.paper} />
      <circle cx="8" cy="10" r="2.6" fill={P.ink} />
      <circle cx="16" cy="10" r="2.6" fill={P.ink} />
      <path d="M12 13 l-1.6 2.6 h3.2 z" fill={P.ink} />
      <rect x="9" y="19" width="1.6" height="3" fill={P.ink} />
      <rect x="13.4" y="19" width="1.6" height="3" fill={P.ink} />
    </Piece>
  );
}

export function Spark({ id, x = 0, y = 0, s = 1, className }: Common) {
  return (
    <Piece id={id} x={x} y={y} s={s} className={className} flat>
      <path d="M0 -9 L2.2 -2.2 L9 0 L2.2 2.2 L0 9 L-2.2 2.2 L-9 0 L-2.2 -2.2 Z" fill={P.sun} />
    </Piece>
  );
}

/* Race-world pieces. */

/* A road: a paper band with a dashed centre line and, optionally, the link
   painted on it like a lane marking. */
export function Road({ id, x = 0, y = 0, w = 380, h = 64, label, tone = '#CDBDA0', className }: Common & { w?: number; h?: number; label?: string; tone?: string }) {
  const dashes = [];
  for (let dx = 12; dx < w - 12; dx += 34) dashes.push(dx);
  return (
    <Piece id={id} x={x} y={y} className={className}>
      <rect width={w} height={h} rx="6" fill={tone} />
      {dashes.map((dx) => <rect key={dx} x={dx} y={h / 2 - 2} width="18" height="4" rx="2" fill={P.paper} opacity="0.7" />)}
      {label && (
        <text x={w / 2} y={h - 12} textAnchor="middle" fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="13" fontWeight="700" fill={P.paper} letterSpacing="0.5">{label}</text>
      )}
    </Piece>
  );
}

/* A gate the snails pass through: two posts and a beam with a lock and a light. */
export function Gate({ id, x = 0, y = 0, h = 200, w = 110, className }: Common & { h?: number; w?: number }) {
  return (
    <>
      <Piece id={id} x={x} y={y} className={className}>
        <rect x="0" y="22" width="12" height={h - 22} rx="4" fill={P.dark} />
        <rect x={w - 12} y="22" width="12" height={h - 22} rx="4" fill={P.dark} />
        <rect x="-6" y="0" width={w + 12} height="26" rx="6" fill={P.ink} />
      </Piece>
      <Lock id={id} x={x + w / 2 - 12} y={y + 30} s={0.7} />
      <circle cx={x + w - 24} cy={y + 13} r="5" fill={P.red} className="gate-light" />
    </>
  );
}

/* A checkered finish flag on a pole. */
export function Flag({ id, x = 0, y = 0, s = 1, className }: Common) {
  const cells = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) if ((r + c) % 2 === 0) cells.push([c, r]);
  return (
    <Piece id={id} x={x} y={y} s={s} className={className}>
      <rect x="0" y="0" width="5" height="96" rx="2.5" fill={P.dark} />
      <rect x="5" y="2" width="60" height="36" rx="3" fill={P.paper} />
      {cells.map(([c, r]) => <rect key={`${c}${r}`} x={5 + c * 12} y={2 + r * 12} width="12" height="12" fill={P.ink} />)}
    </Piece>
  );
}

/* The pit stop: a canopy with the mark on it, on two posts. */
export function Canopy({ id, x = 0, y = 0, w = 180, className, mark }: Common & { w?: number; mark: string }) {
  return (
    <Piece id={id} x={x} y={y} className={className}>
      <rect x="14" y="30" width="10" height="150" rx="4" fill={P.dark} />
      <rect x={w - 24} y="30" width="10" height="150" rx="4" fill={P.dark} />
      <path d={`M0 34 L${w} 34 L${w - 14} 0 L14 0 Z`} fill={P.sun} />
      <rect x="0" y="30" width={w} height="10" rx="4" fill={P.coral} />
      <g transform={`translate(${w / 2 - 16} 2) scale(0.9)`}>
        <path d={mark} fill="none" stroke={P.ink} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Piece>
  );
}

/* A striped barrier across the road. */
export function Barrier({ id, x = 0, y = 0, s = 1, className }: Common) {
  return (
    <Piece id={id} x={x} y={y} s={s} className={className}>
      <rect x="6" y="18" width="6" height="30" fill={P.dark} />
      <rect x="68" y="18" width="6" height="30" fill={P.dark} />
      <rect x="0" y="6" width="80" height="16" rx="4" fill={P.paper} />
      {[0, 2, 4].map((i) => <rect key={i} x={4 + i * 16} y="6" width="10" height="16" fill={P.red} transform={`skewX(-20) translate(${(i * 16 + 4) * 0.36} 0)`} />)}
    </Piece>
  );
}

/* A rain cloud. */
export function RainCloud({ id, x = 0, y = 0, s = 1, className }: Common) {
  return (
    <Piece id={id} x={x} y={y} s={s} className={className}>
      <rect x="0" y="26" width="90" height="22" rx="11" fill={P.grey} />
      <circle cx="26" cy="26" r="17" fill={P.grey} />
      <circle cx="50" cy="20" r="21" fill={P.grey} />
      <circle cx="72" cy="28" r="14" fill={P.grey} />
      {[14, 34, 54, 74].map((rx, i) => <rect key={rx} x={rx} y={52 + (i % 2) * 6} width="4" height="12" rx="2" fill={P.blue} opacity="0.8" />)}
    </Piece>
  );
}

/* A doorway in a wall: the company's door. The opening is dark; the wall runs
   to the right so whatever is inside stays hidden until it comes through. */
export function Doorway({ id, x = 0, y = 0, h = 170, wall = 120, name, className, hollow = false }: Common & { h?: number; wall?: number; name?: string; hollow?: boolean }) {
  return (
    <>
      {!hollow && (
        <Piece id={id} x={x} y={y} className={className} flat>
          <rect x="8" y="8" width="44" height={h - 8} fill={P.ink} />
        </Piece>
      )}
      <Piece id={id} x={x} y={y} className={className}>
        <rect x="52" y="-30" width={wall} height={h + 30} rx="4" fill={P.paper} />
        <rect x="0" y="0" width="60" height="10" rx="3" fill={P.dark} />
        <rect x="0" y="0" width="8" height={h} rx="3" fill={P.dark} />
        <rect x="52" y="0" width="8" height={h} rx="3" fill={P.dark} />
        {name && <text x={58} y="-10" textAnchor="start" fontFamily="Inter, system-ui, sans-serif" fontSize="12" fontWeight="700" fill={P.ink}>{name}</text>}
      </Piece>
      <Lock id={id} x={x + 13} y={y + 14} s={0.6} />
    </>
  );
}
