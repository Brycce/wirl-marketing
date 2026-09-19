// Toybox: one kit of chunky cartoon UI parts that every scene is built from.
// Everything is a real piece of software drawn big and soft: windows, link
// bars, buttons, avatars, cursors, padlocks. A 3px ink outline on every shape,
// 2px for inner detail, and a darker copy of each object peeking 6px out
// underneath it (the toy edge), always straight down.

import type { ReactNode } from 'react';

export const K = {
  ink: '#1B2420',
  cream: '#F7F1E4',
  paper: '#FFFDF7',
  edge: '#E4D9C3',
  wash: '#F3ECDD', // rows, pills and inputs inside a window
  sun: '#FFD23F',
  sunEdge: '#D9A514',
  coral: '#FF9A76',
  mint: '#A6E6BE',
  sky: '#A9D8F7',
  lilac: '#CDBFFF',
  green: '#2E9D5B',
  greenEdge: '#1D6B3D',
  greenWash: '#DDF3E4',
  tomato: '#E5483B',
  tomatoEdge: '#A8302A',
  blue: '#3F6FE8',
  blueEdge: '#2A4CB2',
  blueWash: '#DDE8FF',
  pink: '#FF8FB8',
  pinkEdge: '#D9678F',
  pinkWash: '#FFE1EC',
  term: '#28342E',
  termBar: '#1B2420',
  termEdge: '#101713',
  termText: '#E9F1EA',
  metal: '#DCD3C1',
  skin: ['#F6D2B8', '#D9A27A', '#8D5A3B'] as const,
  cheek: '#F4A99A',
};

/** Rough width of a run of Inter bold / JetBrains Mono, for sizing pills round text. */
export const textW = (s: string, size: number, mono = false) => s.length * size * (mono ? 0.6 : 0.56);

/* Shared defs, rendered once near the top of the page in an always-visible
   svg, so every scene (including ones hidden at some widths) can use them. */
export function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {/* Die-cut stickers: a soft two-layer shadow lifting them off the slab. */}
        <filter id="tb-stk" x="-25%" y="-25%" width="150%" height="160%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1" floodColor={K.ink} floodOpacity="0.2" />
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor={K.ink} floodOpacity="0.2" />
        </filter>
        <filter id="tb-stk-lg" x="-25%" y="-25%" width="150%" height="160%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="2" stdDeviation="1.6" floodColor={K.ink} floodOpacity="0.18" />
          <feDropShadow dx="0" dy="9" stdDeviation="9" floodColor={K.ink} floodOpacity="0.2" />
        </filter>
        {/* The underside of a peeling corner. */}
        <filter id="tb-flap" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="-1" dy="2" stdDeviation="2" floodColor={K.ink} floodOpacity="0.3" />
        </filter>
        {/* Halftone, only ever inside the cast shadow of the biggest object in a scene. */}
        <pattern id="tb-dots" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle cx="3.5" cy="3.5" r="1.45" fill={K.ink} fillOpacity="0.2" />
        </pattern>
        <pattern id="tb-dots-light" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle cx="3.5" cy="3.5" r="1.45" fill={K.cream} fillOpacity="0.16" />
        </pattern>
        {/* Rubber stamps: a little worn, with specks where the ink didn't take. */}
        <mask id="tb-worn" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="#fff" />
          <g fill="#000">
            <ellipse cx="0.08" cy="0.22" rx="0.012" ry="0.05" />
            <ellipse cx="0.21" cy="0.9" rx="0.03" ry="0.04" />
            <ellipse cx="0.33" cy="0.08" rx="0.02" ry="0.03" />
            <ellipse cx="0.47" cy="0.62" rx="0.008" ry="0.06" />
            <ellipse cx="0.56" cy="0.93" rx="0.04" ry="0.03" />
            <ellipse cx="0.64" cy="0.36" rx="0.01" ry="0.05" />
            <ellipse cx="0.78" cy="0.12" rx="0.025" ry="0.04" />
            <ellipse cx="0.91" cy="0.7" rx="0.015" ry="0.07" />
            <ellipse cx="0.97" cy="0.3" rx="0.02" ry="0.05" />
            <ellipse cx="0.14" cy="0.55" rx="0.006" ry="0.04" />
            <ellipse cx="0.4" cy="0.3" rx="0.006" ry="0.03" />
            <ellipse cx="0.85" cy="0.5" rx="0.006" ry="0.035" />
          </g>
        </mask>
        {/* Avatars are drawn in a 40-unit circle and scaled; this clips the face and shoulders to it. */}
        <clipPath id="tb-av">
          <circle r="20" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* A toy tile: the face, and a darker copy peeking out straight below it. */
export function Tile({ x, y, w, h, r = 14, fill = K.paper, edge = K.edge, d = 6, sw = 3, stroke = K.ink }: {
  x: number; y: number; w: number; h: number; r?: number; fill?: string; edge?: string; d?: number; sw?: number; stroke?: string;
}) {
  return (
    <>
      <rect x={x} y={y + d} width={w} height={h} rx={r} fill={edge} stroke={stroke} strokeWidth={sw} />
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={sw} />
    </>
  );
}

/* A soft halftone cast shadow, down and to the right, for the biggest object. */
export function CastShadow({ x, y, w, h, r = 14, dx = 12, dy = 16, light = false }: {
  x: number; y: number; w: number; h: number; r?: number; dx?: number; dy?: number; light?: boolean;
}) {
  return <rect x={x + dx} y={y + dy} width={w} height={h} rx={r} fill={`url(#${light ? 'tb-dots-light' : 'tb-dots'})`} />;
}

const topPath = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x} ${y + h} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h} Z`;

/* An app window: a fat title bar with three dots, a body, and the toy edge. */
export function Win({ x, y, w, h, r = 14, fill = K.paper, edge = K.edge, bar = K.edge, barH = 38, dots = true, stroke = K.ink, dotFill = K.paper, children }: {
  x: number; y: number; w: number; h: number; r?: number; fill?: string; edge?: string; bar?: string; barH?: number;
  dots?: boolean; stroke?: string; dotFill?: string; children?: ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y + 6} width={w} height={h} rx={r} fill={edge} stroke={stroke} strokeWidth={3} />
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} />
      <path d={topPath(x, y, w, barH, r)} fill={bar} />
      <path d={`M${x} ${y + barH} H${x + w}`} stroke={stroke} strokeWidth={2.5} />
      {dots && [0, 1, 2].map((i) => (
        <circle key={i} cx={x + 20 + i * 15} cy={y + barH / 2} r={4.6} fill={dotFill} stroke={stroke} strokeWidth={2} />
      ))}
      {children}
      <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke={stroke} strokeWidth={3} />
    </g>
  );
}

/* A terminal or agent chat: the same window, dark. */
export function Term({ x, y, w, h, barH = 36, children, stroke = K.ink, face = K.term, bar = K.termBar }: {
  x: number; y: number; w: number; h: number; barH?: number; children?: ReactNode; stroke?: string; face?: string; bar?: string;
}) {
  return (
    <Win x={x} y={y} w={w} h={h} fill={face} edge={K.termEdge} bar={bar} barH={barH} stroke={stroke} dotFill="#3B4A42">
      {children}
    </Win>
  );
}

/* The small padlock that sits in an address bar. Centre at (x, y). */
export function MiniLock({ x, y, s = 1, color = K.green }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-3.8 -1 V-3.6 A3.8 3.8 0 0 1 3.8 -3.6 V-1" fill="none" stroke={color} strokeWidth={2.4} />
      <rect x={-6} y={-1.6} width={12} height={9.4} rx={2.4} fill={color} />
    </g>
  );
}

export function Globe({ x, y, r = 7, color = K.ink }: { x: number; y: number; r?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={color} strokeWidth={1.8}>
      <circle r={r} />
      <ellipse rx={r * 0.45} ry={r} />
      <path d={`M${-r} 0 H${r}`} />
    </g>
  );
}

/* The address bar: a pill with a padlock (or a globe) and the link in mono. */
export function LinkBar({ x, y, w, h = 30, text, size = 15, globe = false, fill = K.wash, className, lockColor = K.green }: {
  x: number; y: number; w: number; h?: number; text: string; size?: number; globe?: boolean; fill?: string; className?: string; lockColor?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} stroke={K.ink} strokeWidth={2} />
      {globe ? <Globe x={x + 18} y={y + h / 2} r={7} /> : <MiniLock x={x + 18} y={y + h / 2 - 1.6} color={lockColor} />}
      <text className={`mono ${className ?? ''}`} x={x + 32} y={y + h / 2 + size * 0.36} fontSize={size} fill={K.ink}>{text}</text>
    </g>
  );
}

/* A toy button: a pill on a darker copy of itself. `face` gets the press. */
export function Btn({ x, y, w, h = 34, label, fill = K.green, edge = K.greenEdge, color = K.paper, size = 16, faceClass, children }: {
  x: number; y: number; w: number; h?: number; label?: string; fill?: string; edge?: string; color?: string; size?: number;
  faceClass?: string; children?: ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y + 5} width={w} height={h} rx={h / 2} fill={edge} stroke={K.ink} strokeWidth={2.5} />
      <g className={faceClass}>
        <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} stroke={K.ink} strokeWidth={2.5} />
        {label && <text x={x + w / 2} y={y + h / 2 + size * 0.36} fontSize={size} fill={color} textAnchor="middle" fontWeight={800}>{label}</text>}
        {children}
      </g>
    </g>
  );
}

/* A flat pill with a label, for statuses and hosts. */
export function Chip({ x, y, label, fill = K.wash, color = K.ink, size = 15, h = 26, w, mono = false, icon, iconW = 0 }: {
  x: number; y: number; label: string; fill?: string; color?: string; size?: number; h?: number; w?: number; mono?: boolean;
  icon?: ReactNode; iconW?: number;
}) {
  const width = w ?? textW(label, size, mono) + 22 + iconW;
  return (
    <g>
      <rect x={x} y={y} width={width} height={h} rx={h / 2} fill={fill} stroke={K.ink} strokeWidth={2} />
      {icon}
      <text className={mono ? 'mono' : undefined} x={x + 11 + iconW} y={y + h / 2 + size * 0.35} fontSize={size} fill={color}>{label}</text>
    </g>
  );
}

export function Check({ x, y, s = 1, color = K.paper, w = 3 }: { x: number; y: number; s?: number; color?: string; w?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M-5 0.5 L-1.6 4 L5 -3.6" fill="none" stroke={color} strokeWidth={w / s} />;
}

/* A round badge with a tick in it. */
export function CheckBadge({ x, y, r = 12, fill = K.green, className }: { x: number; y: number; r?: number; fill?: string; className?: string }) {
  return (
    <g className={className}>
      <g transform={`translate(${x} ${y})`}>
        <circle r={r} fill={fill} stroke={K.ink} strokeWidth={2.5} />
        <Check x={0} y={0} s={r / 11} />
      </g>
    </g>
  );
}

/* A 4-point sparkle, sun yellow with an ink outline. */
export function Sparkle({ x, y, r = 12, className, fill = K.sun }: { x: number; y: number; r?: number; className?: string; fill?: string }) {
  const k = r * 0.2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path className={className} d={`M0 ${-r} Q${k} ${-k} ${r} 0 Q${k} ${k} 0 ${r} Q${-k} ${k} ${-r} 0 Q${-k} ${-k} 0 ${-r} Z`} fill={fill} stroke={K.ink} strokeWidth={2.5} />
    </g>
  );
}

/* Harbor's logo: a white anchor in a blue circle. On every Harbor screen. */
export function Harbor({ x, y, r = 12 }: { x: number; y: number; r?: number }) {
  const s = r / 12;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={12} fill={K.blue} stroke={K.ink} strokeWidth={2.2 / s} />
      <g fill="none" stroke={K.paper} strokeWidth={1.9} strokeLinecap="round">
        <circle cx={0} cy={-5.6} r={1.9} />
        <path d="M0 -3.7 V7.2 M-3.6 -1.2 H3.6 M-6.2 2.6 Q-5.2 7.4 0 7.4 Q5.2 7.4 6.2 2.6" />
      </g>
    </g>
  );
}

/* The four-colour G, the small glyph on a "Sign in with Google" row. */
export function GoogleG({ x, y, r = 9 }: { x: number; y: number; r?: number }) {
  const a = (deg: number) => [Math.cos((deg * Math.PI) / 180) * r, Math.sin((deg * Math.PI) / 180) * r];
  const arc = (from: number, to: number) => {
    const [x1, y1] = a(from);
    const [x2, y2] = a(to);
    return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };
  const sw = r * 0.46;
  return (
    <g transform={`translate(${x} ${y})`} fill="none" strokeWidth={sw}>
      <path d={arc(-38, 0) + ` M0 0 H${r}`} stroke="#4285F4" strokeLinecap="butt" />
      <path d={arc(0, 44)} stroke="#4285F4" />
      <path d={arc(44, 136)} stroke="#34A853" />
      <path d={arc(136, 212)} stroke="#FBBC05" />
      <path d={arc(212, 322)} stroke="#EA4335" />
    </g>
  );
}

/* ---------- People ----------
   Harbor's cast, the way software shows people: round avatar faces and
   named multiplayer cursors. */
export type Who = 'priya' | 'tom' | 'lena' | 'sam' | 'mia';
export const PEOPLE: Record<Who, { name: string; email: string; skin: string; hair: string; top: string; bg: string; color: string; colorEdge: string; tagText: string }> = {
  priya: { name: 'Priya Nair', email: 'priya@harbor.co', skin: K.skin[1], hair: '#1E1A1C', top: K.pink, bg: '#FFD6E5', color: K.pink, colorEdge: K.pinkEdge, tagText: K.ink },
  tom: { name: 'Tom Abara', email: 'tom@harbor.co', skin: K.skin[2], hair: '#2B1D16', top: K.blue, bg: '#C9D8FF', color: K.blue, colorEdge: K.blueEdge, tagText: K.paper },
  lena: { name: 'Lena K.', email: 'lena@harbor.co', skin: K.skin[0], hair: '#BDB6AE', top: K.green, bg: '#FFE9A8', color: K.green, colorEdge: K.greenEdge, tagText: K.paper },
  sam: { name: 'Sam O.', email: 'sam@harbor.co', skin: K.skin[1], hair: '#3A2A20', top: '#FF9A76', bg: '#C4EED3', color: K.coral, colorEdge: '#D9714D', tagText: K.ink },
  mia: { name: 'Mia R.', email: 'mia@harbor.co', skin: K.skin[0], hair: '#7A4A2A', top: '#8E7CF0', bg: '#E4DCFF', color: '#8E7CF0', colorEdge: '#6A58C8', tagText: K.paper },
};

function Hair({ who, back }: { who: Who; back: boolean }) {
  const p = PEOPLE[who];
  const line = { stroke: K.ink, strokeWidth: 1.5 };
  if (who === 'priya') {
    // A black bob to the jaw, fringe swept to one side.
    return back
      ? <path d="M-12.4 -1 C-13.6 -13 -7 -16.6 0 -16.6 C7 -16.6 13.6 -13 12.4 -1 L12.8 7.6 C9 9.4 -9 9.4 -12.8 7.6 Z" fill={p.hair} {...line} />
      : <path d="M-10 -3.2 C-10.6 -11.6 -5 -14.4 0.6 -14.2 C6.4 -14 10.6 -11 10 -3.2 C8.4 -6.4 5.6 -8.8 2.2 -9.2 C-1.4 -7.2 -6 -5.6 -10 -3.2 Z" fill={p.hair} {...line} />;
  }
  if (who === 'tom') {
    if (back) return null;
    // Tight curls over the top.
    const curls: [number, number, number][] = [[-9.4, -5.4, 3.4], [-8.6, -10, 3.8], [-4.6, -13.4, 4], [0.4, -14.6, 4], [5.2, -13.4, 4], [8.8, -10, 3.8], [9.6, -5.4, 3.4], [-2, -10.4, 3.6], [3, -10.6, 3.6]];
    return (
      <g fill={p.hair} {...line}>
        {curls.map(([cx, cy, r]) => <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={r} />)}
      </g>
    );
  }
  if (who === 'lena') {
    // Grey hair pulled up into a bun, and round glasses.
    return back
      ? <circle cx={0} cy={-15.4} r={5.4} fill={p.hair} {...line} />
      : (
        <g>
          <path d="M-9.9 -2.4 C-10.4 -11.2 -5.4 -14 0 -14 C5.4 -14 10.4 -11.2 9.9 -2.4 C8.6 -7.4 4.8 -9.6 0 -9.8 C-4.8 -9.6 -8.6 -7.4 -9.9 -2.4 Z" fill={p.hair} {...line} />
        </g>
      );
  }
  if (who === 'sam') {
    if (back) return null;
    // A cap, brim to the side.
    return (
      <g {...line}>
        <path d="M-10.2 -4.2 C-10.6 -13 -5.4 -15.6 0 -15.6 C5.4 -15.6 10.6 -13 10.2 -4.2 Z" fill={K.green} />
        <path d="M2 -4.6 H15.4 C15.8 -2.6 14.4 -1.6 12.4 -1.6 H2 Z" fill={K.greenEdge} />
        <circle cx={0} cy={-15.6} r={1.6} fill={K.greenEdge} />
      </g>
    );
  }
  // Mia: long brown hair with a middle parting.
  return back
    ? <path d="M-12.6 -2 C-13.4 -13.4 -7 -16.8 0 -16.8 C7 -16.8 13.4 -13.4 12.6 -2 L14 21 H-14 Z" fill={p.hair} {...line} />
    : <path d="M-10 -1.6 C-10.4 -11 -5 -14 0 -14 C5 -14 10.4 -11 10 -1.6 C9 -6.8 4.6 -10 0.4 -10.6 C-4 -10 -8.8 -6.8 -10 -1.6 Z" fill={p.hair} {...line} />;
}

/* A round avatar face. (x, y) is the centre, r the radius. */
export function Avatar({ who, x, y, r = 20, ring = true }: { who: Who; x: number; y: number; r?: number; ring?: boolean }) {
  const p = PEOPLE[who];
  const s = r / 20;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g clipPath="url(#tb-av)">
        <rect x={-20} y={-20} width={40} height={40} fill={p.bg} />
        <Hair who={who} back />
        <path d="M-18 24 C-18 13 -9.4 9.6 0 9.6 C9.4 9.6 18 13 18 24 Z" fill={p.top} stroke={K.ink} strokeWidth={1.5} />
        <path d="M-3.2 5 V10.6 Q0 12.6 3.2 10.6 V5 Z" fill={p.skin} />
        <ellipse cx={0} cy={-2} rx={9.6} ry={10.4} fill={p.skin} stroke={K.ink} strokeWidth={1.5} />
        <Hair who={who} back={false} />
        <circle cx={-3.7} cy={-0.8} r={1.35} fill={K.ink} />
        <circle cx={3.7} cy={-0.8} r={1.35} fill={K.ink} />
        {who === 'lena' && (
          <g fill="none" stroke={K.ink} strokeWidth={1.1}>
            <circle cx={-3.7} cy={-0.8} r={3} />
            <circle cx={3.7} cy={-0.8} r={3} />
            <path d="M-0.7 -1 H0.7" />
          </g>
        )}
        <circle cx={-6.2} cy={3} r={1.9} fill={K.cheek} opacity={0.9} />
        <circle cx={6.2} cy={3} r={1.9} fill={K.cheek} opacity={0.9} />
        <path d="M-2.8 3.8 Q0 6.2 2.8 3.8" fill="none" stroke={K.ink} strokeWidth={1.3} strokeLinecap="round" />
      </g>
      {ring && <circle r={20} fill="none" stroke={K.ink} strokeWidth={(r >= 17 ? 2.6 : 2) / s} />}
    </g>
  );
}

/* Overlapping avatars, like a share menu shows them. */
export function AvatarStack({ x, y, r = 14, who, step }: { x: number; y: number; r?: number; who: Who[]; step?: number }) {
  const gap = step ?? r * 1.35;
  return (
    <g>
      {who.map((w, i) => <Avatar key={w} who={w} x={x + i * gap} y={y} r={r} />)}
    </g>
  );
}

/* A multiplayer cursor: an arrow in the person's colour with a name tag.
   (x, y) is the tip. */
export function NamedCursor({ x, y, who, s = 1, className, tag = true, tagLeft = false }: {
  x: number; y: number; who: Who; s?: number; className?: string; tag?: boolean; tagLeft?: boolean;
}) {
  const p = PEOPLE[who];
  const first = p.name.split(' ')[0];
  const tw = textW(first, 15) + 20;
  const tx = tagLeft ? -tw - 2 : 17;
  return (
    <g className={className}>
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M0 0 L0 33 L8.2 25.8 L13.8 38.4 L20.4 35.6 L14.8 23.2 L25.6 23.2 Z" fill={p.color} stroke={K.ink} strokeWidth={2.8} />
        {tag && (
          <g>
            <rect x={tx} y={36} width={tw} height={26} rx={13} fill={p.color} stroke={K.ink} strokeWidth={2.4} />
            <text x={tx + tw / 2} y={36 + 18.2} fontSize={15} fill={p.tagText} textAnchor="middle" fontWeight={800}>{first}</text>
          </g>
        )}
      </g>
    </g>
  );
}

/* A plain arrow cursor (strangers in the mess). */
export function Arrow({ x, y, color, s = 1, className, rot = 0 }: { x: number; y: number; color: string; s?: number; className?: string; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className}>
        <path transform={`rotate(${rot}) scale(${s})`} d="M0 0 L0 33 L8.2 25.8 L13.8 38.4 L20.4 35.6 L14.8 23.2 L25.6 23.2 Z" fill={color} stroke={K.ink} strokeWidth={2.8 / s} />
      </g>
    </g>
  );
}

/* The pointing hand, for clicks. (x, y) is the fingertip. */
export function Hand({ x, y, s = 1, className }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className}>
        <g transform={`scale(${s}) translate(-18.5 0)`}>
          <path
            d="M14 22 V4.6 A4.5 4.5 0 0 1 23 4.6 V18.6 A4 4 0 0 1 31 19.2 V21.2 A3.7 3.7 0 0 1 38.4 22 V35.6 C38.4 44 33.2 50 25 50 H21.4 C16.4 50 13.4 47.6 10.8 44 L4.4 35.2 A3.9 3.9 0 0 1 10.2 30.2 L14 33.6 Z"
            fill={K.paper}
            stroke={K.ink}
            strokeWidth={2.8 / s}
          />
          <path d="M23 18.6 V27 M31 21.2 V27.4" fill="none" stroke={K.ink} strokeWidth={2 / s} />
          <path d="M16.6 8 V13" fill="none" stroke={K.edge} strokeWidth={2 / s} />
        </g>
      </g>
    </g>
  );
}

/* A big chunky padlock. (x, y) is the top-left of a 60 x 86 box at s = 1. */
export function Padlock({ x, y, s = 1, fill = K.green, edge = K.greenEdge, shackleClass, className }: {
  x: number; y: number; s?: number; fill?: string; edge?: string; shackleClass?: string; className?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={className}>
        <g className={shackleClass}>
          <path d="M13 40 V24 A17 17 0 0 1 47 24 V40" fill="none" stroke={K.ink} strokeWidth={14} />
          <path d="M13 40 V24 A17 17 0 0 1 47 24 V40" fill="none" stroke={K.metal} strokeWidth={8} />
          <path d="M19 22 A11 11 0 0 1 27 13.4" fill="none" stroke={K.paper} strokeWidth={2.4} opacity={0.9} />
        </g>
        <rect x={0} y={40} width={60} height={46} rx={13} fill={edge} stroke={K.ink} strokeWidth={3} />
        <rect x={0} y={34} width={60} height={46} rx={13} fill={fill} stroke={K.ink} strokeWidth={3} />
        <path d="M8 46 V56" stroke={K.paper} strokeWidth={3} opacity={0.75} />
        <circle cx={30} cy={53} r={6} fill={K.ink} />
        <path d="M30 55 V65" stroke={K.ink} strokeWidth={5.4} />
      </g>
    </g>
  );
}

/* A rubber stamp: double-ruled box, heavy caps, slightly worn. */
export function Stamp({ x, y, text, rot = -12, size = 26, color = K.tomato, className }: {
  x: number; y: number; text: string; rot?: number; size?: number; color?: string; className?: string;
}) {
  const w = text.length * size * 0.7 + 34;
  const h = size + 28;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <g className={className}>
        <g mask="url(#tb-worn)" opacity={0.94}>
          <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={7} fill="none" stroke={color} strokeWidth={4.5} />
          <rect x={-w / 2 + 7} y={-h / 2 + 7} width={w - 14} height={h - 14} rx={3} fill="none" stroke={color} strokeWidth={2} />
          <text x={0} y={size * 0.36} fontSize={size} fontWeight={900} fill={color} textAnchor="middle" letterSpacing="0.06em">{text}</text>
        </g>
      </g>
    </g>
  );
}

/* A flat ink shadow under something that floats. */
export function Floor({ x, y, rx, ry = 6, o = 0.12 }: { x: number; y: number; rx: number; ry?: number; o?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={K.ink} opacity={o} />;
}

/* Text placeholder bars inside a window. */
export function Bars({ x, y, widths, gap = 14, h = 8, fill = K.edge }: { x: number; y: number; widths: number[]; gap?: number; h?: number; fill?: string }) {
  return (
    <g>
      {widths.map((w, i) => <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={h / 2} fill={fill} />)}
    </g>
  );
}

/* ---------- Die-cut stickers ----------
   Paper-white border cut round the shape, a soft shadow, a tilt, and
   sometimes a corner that has come up to show the sand back. */

/** A round die-cut sticker. `face` draws inside a circle of radius r at the origin. */
export function RoundSticker({ x, y, r, border = 6, tilt = -6, face, peel, id, className, big = false }: {
  x: number; y: number; r: number; border?: number; tilt?: number; face: ReactNode;
  peel?: { angle: number; depth: number }; id?: string; className?: string; big?: boolean;
}) {
  const R = r + border;
  let fold: { x: number; y: number; a: number } | null = null;
  if (peel && id) {
    const rad = (peel.angle * Math.PI) / 180;
    const d = R - peel.depth;
    fold = { x: Math.cos(rad) * d, y: Math.sin(rad) * d, a: peel.angle };
  }
  const mirror = fold ? `translate(${fold.x} ${fold.y}) rotate(${fold.a}) scale(-1 1) rotate(${-fold.a}) translate(${-fold.x} ${-fold.y})` : '';
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className}>
        <g filter={`url(#${big ? 'tb-stk-lg' : 'tb-stk'})`}>
          <g transform={`rotate(${tilt})`}>
            {fold && (
              <defs>
                <clipPath id={`${id}-keep`}>
                  <rect x={-400} y={-400} width={400} height={800} transform={`translate(${fold.x} ${fold.y}) rotate(${fold.a})`} />
                </clipPath>
              </defs>
            )}
            <g clipPath={fold ? `url(#${id}-keep)` : undefined}>
              <circle r={R} fill={K.paper} />
              {face}
            </g>
            {fold && (
              <g clipPath={`url(#${id}-keep)`}>
                <g filter="url(#tb-flap)">
                  <circle r={R} fill={K.edge} transform={mirror} />
                </g>
              </g>
            )}
          </g>
        </g>
      </g>
    </g>
  );
}

/* A die-cut sticker of any shape: `cut` is the silhouette (drawn grown by
   `border` in paper white, with the sticker shadow), then the art on top. */
export function DieCut({ cut, border = 9, children, tilt = 0, cx = 0, cy = 0, big = false, className }: {
  cut: ReactNode; border?: number; children: ReactNode; tilt?: number; cx?: number; cy?: number; big?: boolean; className?: string;
}) {
  return (
    <g className={className}>
      <g filter={`url(#${big ? 'tb-stk-lg' : 'tb-stk'})`}>
        <g transform={`rotate(${tilt} ${cx} ${cy})`}>
          <g fill={K.paper} stroke={K.paper} strokeWidth={border * 2} strokeLinejoin="round">{cut}</g>
          {children}
        </g>
      </g>
    </g>
  );
}
