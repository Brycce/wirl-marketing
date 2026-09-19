// The Harbor cast kit. One set of parts that every scene is drawn from, so
// the same person looks the same everywhere and the whole page is one world.
//
// Drawing rules: every shape is a filled shape with a 3-unit ink outline
// outside it (the Ol helper draws the fill twice, once fat in ink behind,
// once in colour on top, so overlapping parts of one object merge into one
// silhouette). Inside details are 2-unit lines. Light comes from the top
// left, so each object gets one flat shade on its far side, clipped to it.

import { useId, type CSSProperties, type ReactNode } from 'react';
import { AGENT_MARKS } from '@/components/AgentIcons';
import { pinnedShellPath, SHELL_REST_TURNS } from '@/components/swirl';
import { BODY_REST, EYES as SNAIL_EYES } from '@/components/paper/Snail';
import s from './cast.module.css';

export const C = {
  ground: '#FFF7EA',
  ink: '#2B2233',
  dim: '#544A5E',
  white: '#FFFFFF',
  sun: '#FFC53D',
  tomato: '#FF6B4A',
  corn: '#4B8BFF',
  gum: '#FF8FB6',
  teal: '#25A89A',
  violet: '#7C6CF2',
  green: '#1E9E5A',
  greenText: '#177A45',
  red: '#E5484D',
  metal: '#D9D2E6',
  skin1: '#FAD7BD',
  skin2: '#E9B08A',
  skin3: '#C07F55',
  skin4: '#8A5638',
  sky: '#DDEBFF',
  peach: '#FFE3D3',
  mint: '#DDF3E6',
  pink: '#FFE4EF',
  butter: '#FFF1B8',
  lilac: '#ECE7FF',
  // Object colours for the world, not for type or UI.
  navy: '#3A4A8C',
  wood: '#F2C38C',
  leaf: '#6CC36A',
  pot: '#F08A5D',
  mouth: '#6E2438',
  tongue: '#FF7B8B',
  blush: '#FF6F7D',
  orange: '#FF9F43',
  dog: '#B86B3E',
  paper: '#F7F3FB',
};

// Mix a colour toward another. The shade of anything is 18% toward ink.
export function mix(a: string, b: string, t: number) {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
}
export const sh = (hex: string, t = 0.18) => mix(hex, C.ink, t);

export function useUid(prefix = 'c') {
  return `${prefix}${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
}

/* ------------------------------------------------------------------ */
/* Outlined shapes                                                     */
/* ------------------------------------------------------------------ */

type OlProps = {
  fill: string;
  w?: number;
  // `far` gives the automatic crescent shade on the side away from the light:
  // the same shape shifted toward the light covers all but the far rim.
  far?: boolean | [number, number];
  shade?: ReactNode; // or hand-drawn shade shapes, clipped to the object
  shadeFill?: string;
  children: ReactNode; // plain shapes only (they go into a clipPath)
  className?: string;
  style?: CSSProperties;
  transform?: string;
};

export function Ol({ fill, w = 3, far, shade, shadeFill, children, className, style, transform }: OlProps) {
  const id = useUid('ol');
  const off = far === true ? [-6, -5] : far || null;
  const tone = shadeFill ?? sh(fill);
  return (
    <g transform={transform}><g className={className} style={style}>
      {w > 0 && (
        <g fill={C.ink} stroke={C.ink} strokeWidth={w * 2} strokeLinejoin="round" strokeLinecap="round">
          {children}
        </g>
      )}
      <g fill={fill}>{children}</g>
      {(off || shade) && (
        <>
          <clipPath id={id}>{children}</clipPath>
          <g clipPath={`url(#${id})`}>
            {off && (
              <>
                <rect x="-2000" y="-2000" width="4000" height="4000" fill={tone} />
                <g fill={fill} transform={`translate(${off[0]} ${off[1]})`}>{children}</g>
              </>
            )}
            {shade && <g fill={tone}>{shade}</g>}
          </g>
        </>
      )}
    </g></g>
  );
}

// An outlined line: a tube. Used for arms, legs, straps, cables.
export function Tube({ d, width, color, w = 3, className }: { d: string; width: number; color: string; w?: number; className?: string }) {
  return (
    <g className={className} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={C.ink} strokeWidth={width + w * 2} />
      <path d={d} stroke={color} strokeWidth={width} />
    </g>
  );
}

export const Line = ({ d, w = 2, color = C.ink, className }: { d: string; w?: number; color?: string; className?: string }) => (
  <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" className={className} />
);

export function T({ x, y, children, size = 18, weight = 600, fill = C.ink, anchor, className, mono, ls }: {
  x: number; y: number; children: ReactNode; size?: number; weight?: number; fill?: string; anchor?: 'start' | 'middle' | 'end'; className?: string; mono?: boolean; ls?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      textAnchor={anchor}
      className={className}
      style={{ fontFamily: mono ? '"JetBrains Mono", ui-monospace, monospace' : 'Inter, system-ui, sans-serif', letterSpacing: ls ?? (mono ? 0 : '-0.01em') }}
    >
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------ */
/* Faces                                                               */
/* ------------------------------------------------------------------ */

export type Eyes = 'open' | 'happy' | 'wide' | 'tired' | 'closed' | 'down';
export type Brows = 'calm' | 'up' | 'worried' | 'focus' | 'raise' | 'none';
export type Mouth = 'smile' | 'grin' | 'o' | 'flat' | 'wobbly' | 'tongue' | 'smirk' | 'grimace' | 'none' | 'open' | 'bigO';
export type Face = { eyes?: Eyes; brows?: Brows; mouth?: Mouth; look?: [number, number]; blush?: boolean; blink?: string; blinkStyle?: CSSProperties; scan?: string };

// The head: 56 wide, 61 tall, centred on 0,0. Ears at the sides.
export const HEAD = 'M0 -31 C17 -31 28 -19 28 -3 C28 16 17 30 0 30 C-17 30 -28 16 -28 -3 C-28 -19 -17 -31 0 -31 Z';

function Eye({ x, kind, look }: { x: number; kind: Eyes; look: [number, number] }) {
  const [lx, ly] = look;
  if (kind === 'happy') return <Line d={`M${x - 5} ${1} Q${x} ${-6} ${x + 5} ${1}`} w={3} />;
  if (kind === 'closed') return <Line d={`M${x - 5} ${-1} Q${x} ${3} ${x + 5} ${-1}`} w={3} />;
  if (kind === 'down') return <Line d={`M${x - 5} ${0} Q${x} ${4} ${x + 5} ${0}`} w={3} />;
  const rx = kind === 'wide' ? 4.6 : 3.9;
  const ry = kind === 'wide' ? 6.2 : kind === 'tired' ? 4.4 : 5.3;
  return (
    <g>
      <ellipse cx={x + lx} cy={-1 + ly + (kind === 'tired' ? 1 : 0)} rx={rx} ry={ry} fill={C.ink} />
      <circle cx={x + lx + 1.4} cy={-3 + ly} r={1.5} fill={C.white} />
      {kind === 'tired' && <path d={`M${x - 6} ${-3.6} Q${x} ${-6.2} ${x + 6} ${-3.6} L${x + 6} ${-7} L${x - 6} ${-7} Z`} fill="currentColor" />}
      {kind === 'tired' && <Line d={`M${x - 5.5} ${-3.2} Q${x} ${-5.4} ${x + 5.5} ${-3.2}`} w={2.2} />}
    </g>
  );
}

function Brow({ x, kind, side }: { x: number; kind: Brows; side: -1 | 1 }) {
  // side -1 is the viewer's left. Inner end is toward the middle.
  const inner = x - 4.8 * side;
  const outer = x + 4.8 * side;
  let d = '';
  switch (kind) {
    case 'calm': d = `M${outer} ${-11} Q${x} ${-15} ${inner} ${-12.5}`; break;
    case 'up': d = `M${outer} ${-15} Q${x} ${-21} ${inner} ${-17}`; break;
    case 'worried': d = `M${outer} ${-11} Q${x} ${-13} ${inner} ${-16.5}`; break;
    case 'focus': d = `M${outer} ${-15} Q${x} ${-14} ${inner} ${-10.5}`; break;
    case 'raise': d = side === 1 ? `M${outer} ${-16} Q${x} ${-23} ${inner} ${-18}` : `M${outer} ${-11.5} Q${x} ${-13} ${inner} ${-12}`; break;
    default: return null;
  }
  return <Line d={d} w={3.6} />;
}

function MouthShape({ kind }: { kind: Mouth }) {
  switch (kind) {
    case 'smile': return <Line d="M-7.5 14.5 Q0 21.5 7.5 14.5" w={3} />;
    case 'grin':
      return (
        <g>
          <path d="M-10.5 12.5 Q0 15.5 10.5 12.5 Q9.5 25.5 0 25.8 Q-9.5 25.5 -10.5 12.5 Z" fill={C.mouth} stroke={C.ink} strokeWidth={2.4} strokeLinejoin="round" />
          <path d="M-8.8 13.9 Q0 16.4 8.8 13.9 L8.4 16.6 Q0 18.6 -8.4 16.6 Z" fill={C.white} />
          <path d="M-5.2 23.4 Q0 18.8 5.2 23.4 Q0 25.6 -5.2 23.4 Z" fill={C.tongue} />
        </g>
      );
    case 'open':
      return (
        <g>
          <path d="M-7 14 Q0 16 7 14 Q6 23 0 23.4 Q-6 23 -7 14 Z" fill={C.mouth} stroke={C.ink} strokeWidth={2.4} strokeLinejoin="round" />
          <path d="M-3.8 21.4 Q0 18.6 3.8 21.4 Q0 23 -3.8 21.4 Z" fill={C.tongue} />
        </g>
      );
    case 'o': return <ellipse cx="0" cy="17.5" rx="3.6" ry="4.6" fill={C.mouth} stroke={C.ink} strokeWidth={2.4} />;
    case 'bigO': return <ellipse cx="0" cy="18" rx="5.2" ry="6.6" fill={C.mouth} stroke={C.ink} strokeWidth={2.4} />;
    case 'flat': return <Line d="M-5.5 16.5 H5.5" w={3} />;
    case 'wobbly': return <Line d="M-8 17.5 q2 -2.4 4 0 t4 0 t4 0 t4 0" w={2.6} />;
    case 'smirk': return <Line d="M-6.5 16.5 Q1 19.5 7.5 13" w={3} />;
    case 'tongue':
      return (
        <g>
          <path d="M3 16.8 q1.2 6.2 5.8 3.6 q1.2 -1.4 -0.4 -4.6 z" fill={C.tongue} stroke={C.ink} strokeWidth={2.2} strokeLinejoin="round" />
          <Line d="M-6.5 15.5 Q1 18.8 9 15" w={3} />
        </g>
      );
    case 'grimace':
      return (
        <g>
          <rect x="-9.5" y="12" width="19" height="9" rx="3.5" fill={C.white} stroke={C.ink} strokeWidth={2.4} />
          <Line d="M-9 16.5 H9 M-3.2 12.5 V20.5 M3.2 12.5 V20.5" w={1.6} />
        </g>
      );
    default: return null;
  }
}

export function FaceParts({ face, skin, part = 'all' }: { face: Face; skin: string; part?: 'all' | 'brows' | 'rest' }) {
  const { eyes = 'open', brows = 'calm', mouth = 'smile', look = [0, 0], blush = true, blink, blinkStyle, scan } = face;
  if (part === 'brows') {
    return (
      <g>
        <Brow x={-10.5} kind={brows} side={-1} />
        <Brow x={10.5} kind={brows} side={1} />
      </g>
    );
  }
  const canBlink = eyes === 'open' || eyes === 'wide' || eyes === 'tired';
  const eyeEls = (
    <>
      <Eye x={-10.5} kind={eyes} look={look} />
      <Eye x={10.5} kind={eyes} look={look} />
    </>
  );
  return (
    <g style={{ color: skin }}>
      {blush && (
        <g fill={C.blush} opacity={skin === C.skin4 || skin === C.skin3 ? 0.42 : 0.3}>
          <ellipse cx="-16.5" cy="9" rx="5.4" ry="3.4" />
          <ellipse cx="16.5" cy="9" rx="5.4" ry="3.4" />
        </g>
      )}
      <g className={scan}>{canBlink && blink ? <g className={blink} style={blinkStyle}>{eyeEls}</g> : eyeEls}</g>
      {part === 'all' && (
        <>
          <Brow x={-10.5} kind={brows} side={-1} />
          <Brow x={10.5} kind={brows} side={1} />
        </>
      )}
      <Line d="M-0.5 3.5 C3.6 5 4.4 8.6 0.4 9.8" w={2.4} color={sh(skin, 0.5)} />
      <MouthShape kind={mouth} />
    </g>
  );
}

export function HeadBase({ skin }: { skin: string }) {
  return (
    <>
      <Ol fill={skin}>
        <ellipse cx="-27" cy="3" rx="6" ry="7.5" />
        <ellipse cx="27" cy="3" rx="6" ry="7.5" />
      </Ol>
      <Line d="M24.5 0.5 Q28.5 2 26 6" w={2} color={sh(skin, 0.35)} />
      <Line d="M-24.5 0.5 Q-28.5 2 -26 6" w={2} color={sh(skin, 0.35)} />
      <Ol fill={skin} far={[-5, -4]}>
        <path d={HEAD} />
      </Ol>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* The cast                                                            */
/* ------------------------------------------------------------------ */

export type Who = 'priya' | 'jonah' | 'mia' | 'tom' | 'sam' | 'lena' | 'dana' | 'intern' | 'jo';

type Look = {
  skin: string;
  top: string;
  outfit: 'cardigan' | 'sweater' | 'hoodie' | 'blazer' | 'zip' | 'tee' | 'coat';
  hairBack?: ReactNode;
  hairFront?: ReactNode;
  over?: ReactNode; // glasses and the like, over the face
  chest?: ReactNode; // lanyards, braids: over the torso
};

export const HAIR_DARK = '#34232B';

export function PriyaHair() {
  return (
    <>
      {/* The pencil goes through the bun: drawn first, the bun covers its middle. */}
      <g transform="translate(8 -44) rotate(-28)">
        <Ol fill={C.sun} w={2.4}>
          <rect x="-24" y="-3.2" width="42" height="6.4" rx="1.5" />
        </Ol>
        <Ol fill={C.wood} w={2.4}>
          <path d="M18 -3.2 L26 0 L18 3.2 Z" />
        </Ol>
        <path d="M23.3 -1.1 L26 0 L23.3 1.1 Z" fill={C.ink} />
        <Ol fill={C.gum} w={2.4}>
          <rect x="-29" y="-3.2" width="6" height="6.4" rx="2.4" />
        </Ol>
      </g>
      <Ol fill={HAIR_DARK} far={[-4, -3]} shadeFill="#241820">
        <circle cx="7" cy="-42" r="12.5" />
      </Ol>
      <Line d="M1 -46 Q7 -50 13 -45 M3 -39 Q9 -36 14 -40" w={2} color="#5A4250" />
      <g transform="translate(8 -44) rotate(-28)">
        <Ol fill={C.sun} w={2.4}>
          <rect x="6" y="-3.2" width="12" height="6.4" rx="1" />
        </Ol>
        <Ol fill={C.wood} w={2.4}>
          <path d="M18 -3.2 L26 0 L18 3.2 Z" />
        </Ol>
        <path d="M23.3 -1.1 L26 0 L23.3 1.1 Z" fill={C.ink} />
      </g>
    </>
  );
}

const LOOKS: Record<Who, Look> = {
  priya: {
    skin: C.skin3,
    top: C.tomato,
    outfit: 'cardigan',
    hairFront: (
      <>
        <PriyaHair />
        <Ol fill={HAIR_DARK} far={[-4, -3]} shadeFill="#241820">
          <path d="M-29.5 0 C-32 -24 -18 -35.5 0 -35.5 C18 -35.5 32 -24 29.5 0 C27 -9 22.5 -15 16 -18.5 C9 -21 3.5 -22.5 1 -27 C-3 -21 -11 -19.5 -18 -17 C-23.5 -14.5 -27.5 -9 -29.5 0 Z" />
        </Ol>
        <Line d="M3.5 -31 Q14 -28.5 21 -20 M-3 -31 Q-12 -28 -19 -21" w={2} color="#5A4250" />
      </>
    ),
    over: (
      <g>
        <circle cx="-10.5" cy="-1" r="8.6" fill={C.white} fillOpacity={0.22} stroke={C.ink} strokeWidth={2.6} />
        <circle cx="10.5" cy="-1" r="8.6" fill={C.white} fillOpacity={0.22} stroke={C.ink} strokeWidth={2.6} />
        <Line d="M-2 -2.5 Q0 -4.5 2 -2.5 M-19 -2.5 L-27 -4.5 M19 -2.5 L27 -4.5" w={2.4} />
        <Line d="M-15 -4.5 Q-13 -7 -10 -7.4 M6 -4.5 Q8 -7 11 -7.4" w={1.6} color={C.white} />
      </g>
    ),
  },
  jonah: {
    skin: C.skin1,
    top: C.corn,
    outfit: 'sweater',
    hairFront: (
      <>
        <Ol fill="#E4773A" shadeFill="#C45F28" far={[-4, -3]}>
          <circle cx="-23" cy="-15" r="9" />
          <circle cx="-15" cy="-26" r="10" />
          <circle cx="-2" cy="-32" r="10.5" />
          <circle cx="12" cy="-29" r="10" />
          <circle cx="22.5" cy="-18" r="9" />
          <circle cx="-27" cy="-4" r="6.5" />
          <circle cx="27" cy="-6" r="6.5" />
          <ellipse cx="0" cy="-22" rx="22" ry="9" />
          <circle cx="-10" cy="-17" r="6.5" />
          <circle cx="3" cy="-18.5" r="6.5" />
          <circle cx="14" cy="-15.5" r="6" />
        </Ol>
        <Line d="M-18 -28 q3 -3 6 0 M0 -34 q3 -3 6 0 M13 -30 q3 -3 6 0 M-25 -16 q2.5 -3 5 0 M20 -19 q2.5 -3 5 0 M-6 -20 q2.5 -2.5 5 0" w={2} color="#A94E1E" />
      </>
    ),
    over: (
      <g fill="#D9825A">
        <circle cx="-15" cy="6" r="1.1" />
        <circle cx="-11.5" cy="8.6" r="1.1" />
        <circle cx="-17.5" cy="9.6" r="1.1" />
        <circle cx="15" cy="6" r="1.1" />
        <circle cx="11.5" cy="8.6" r="1.1" />
        <circle cx="17.5" cy="9.6" r="1.1" />
      </g>
    ),
  },
  mia: {
    skin: C.skin4,
    top: C.gum,
    outfit: 'hoodie',
    hairFront: (
      <>
        <Ol fill={HAIR_DARK} shadeFill="#20151B" far={[-4, -3]}>
          <circle cx="-26" cy="-12" r="12" />
          <circle cx="-19" cy="-28" r="14" />
          <circle cx="0" cy="-35" r="15" />
          <circle cx="19" cy="-28" r="14" />
          <circle cx="26" cy="-12" r="12" />
          <circle cx="-30" cy="0" r="7" />
          <circle cx="30" cy="0" r="7" />
          <path d="M-30 -6 C-26 -18 26 -18 30 -6 L30 -24 L-30 -24 Z" />
        </Ol>
        <Line d="M-22 -34 q3 -3 6 0 M-4 -42 q3 -3 6 0 M14 -36 q3 -3 6 0 M-31 -16 q2.5 -3 5 0 M26 -18 q2.5 -3 5 0" w={2} color="#5A4250" />
        <Ol fill={C.gum} w={2.6} far={[-2, -3]}>
          <path d="M-31 -9 C-26 -30 26 -30 31 -9 L30 -2.5 C24 -21 -24 -21 -30 -2.5 Z" />
        </Ol>
      </>
    ),
  },
  tom: {
    skin: C.skin2,
    top: C.teal,
    outfit: 'tee',
    hairFront: (
      <>
        <Ol fill="#6B4228" shadeFill="#553320">
          <path d="M-28 -6 C-29 4 -27 10 -26 12 L-22 10 L-23 -6 Z" />
          <path d="M28 -6 C29 4 27 10 26 12 L22 10 L23 -6 Z" />
        </Ol>
        <Ol fill={C.teal} far={[-4, -3]}>
          <path d="M-29.5 -12 C-31 -40 31 -40 29.5 -12 Z" />
          <circle cx="0" cy="-44" r="6" />
        </Ol>
        <Line d="M-12 -36 Q-10 -26 -10 -16 M0 -38 V-16 M12 -36 Q10 -26 10 -16" w={2} color="#1A7F74" />
        <Ol fill="#1E8F83">
          <rect x="-32" y="-19" width="64" height="12" rx="6" />
        </Ol>
        <Line d="M-24 -17 V-9 M-16 -17 V-9 M-8 -17 V-9 M0 -17 V-9 M8 -17 V-9 M16 -17 V-9 M24 -17 V-9" w={1.8} color="#166A61" />
      </>
    ),
    over: (
      <Ol fill="#6B4228" shadeFill="#553320" far={[-3, -2]}>
        <path d="M-26 2 C-26 22 -15 35 0 35 C15 35 26 22 26 2 C23 9 19 13 13 13 C8 13 5 10.5 0 10.5 C-5 10.5 -8 13 -13 13 C-19 13 -23 9 -26 2 Z" />
      </Ol>
    ),
  },
  sam: {
    skin: C.skin1,
    top: C.sun,
    outfit: 'blazer',
    hairBack: (
      <Ol fill="#CFCADB" shadeFill="#ACA6BF" far={[-4, -3]}>
        <path d="M-35 22 C-37 -12 -30 -39 0 -39 C30 -39 37 -12 35 22 C35 27 31 28 26 27 L-26 27 C-31 28 -35 27 -35 22 Z" />
      </Ol>
    ),
    hairFront: (
      <>
        <Ol fill="#CFCADB" shadeFill="#ACA6BF" far={[-3, -3]}>
          <path d="M-30.5 -2 C-32.5 -30 -17 -37.5 0 -37.5 C17 -37.5 32.5 -30 30.5 -2 C28.5 -7.5 26.5 -12 24 -13 L-24 -13 C-26.5 -12 -28.5 -7.5 -30.5 -2 Z" />
        </Ol>
        <Line d="M-14 -34 Q-12 -24 -13 -14 M0 -36 V-14 M14 -34 Q12 -24 13 -14" w={2} color="#9D97B3" />
      </>
    ),
  },
  lena: {
    skin: C.skin2,
    top: C.navy,
    outfit: 'hoodie',
    hairBack: (
      <Ol fill="#E8B545" shadeFill="#C99526" far={[-4, -3]}>
        <path d="M-32 10 C-34 -22 -20 -37 0 -37 C20 -37 34 -22 32 10 L20 14 L-20 14 Z" />
      </Ol>
    ),
    hairFront: (
      <>
        <Ol fill="#E8B545" shadeFill="#C99526" far={[-3, -3]}>
          <path d="M-30 2 C-32 -26 -16 -36.5 2 -36 C20 -35.5 32 -24 30 2 C28 -8 25 -13 20 -16 C8 -12 -6 -16 -14 -24 C-19 -16 -25 -10 -30 2 Z" />
        </Ol>
        <Line d="M-12 -30 Q2 -20 18 -19 M6 -34 Q16 -30 24 -20" w={2} color="#B8861F" />
      </>
    ),
    chest: (
      <>
        {/* The braid, over her right shoulder (viewer's left). */}
        <Ol fill="#E8B545" shadeFill="#C99526" w={2.6}>
          <ellipse cx="-27" cy="26" rx="7.5" ry="8" />
          <ellipse cx="-29" cy="39" rx="7.5" ry="8" />
          <ellipse cx="-30" cy="52" rx="7" ry="7.5" />
          <ellipse cx="-30.5" cy="64" rx="6.5" ry="7" />
        </Ol>
        <Line d="M-33 22 Q-27 30 -21 25 M-35 35 Q-29 43 -23 38 M-36 48 Q-30 56 -24 51 M-36 61 Q-31 67 -25 63" w={1.8} color="#B8861F" />
        <Ol fill={C.gum} w={2.4}>
          <rect x="-36" y="70" width="11" height="5" rx="2" />
        </Ol>
        <Ol fill="#E8B545" w={2.4}>
          <path d="M-35 75 Q-31 86 -26 75 Z" />
        </Ol>
      </>
    ),
  },
  dana: {
    skin: C.skin3,
    top: C.violet,
    outfit: 'zip',
    hairFront: (
      <>
        <Ol fill="#4A4453" shadeFill="#39333F" far={[-3, -3]}>
          <path d="M-29.5 -1 C-31.5 -28 -18 -37.5 1 -37 C20 -36.5 31.5 -27 29.5 -1 C28 -11 25.5 -16 20 -19 C12 -17.5 1 -20 -8 -25 C-13 -18 -21 -12.5 -29.5 -1 Z" />
        </Ol>
        <path d="M-8 -25 C-2 -34 12 -35 20 -30 L22 -26 C14 -30 3 -29 -4 -22 Z" fill="#B3ACC0" />
        <Line d="M-20 -26 Q-12 -32 -4 -33 M8 -31 Q18 -30 24 -22" w={2} color="#6B6475" />
        {/* Reading glasses pushed up into her hair. */}
        <g transform="translate(0 -31) rotate(-4)">
          <rect x="-19" y="-5" width="15" height="10" rx="4" fill={C.lilac} fillOpacity={0.9} stroke={C.ink} strokeWidth={2.4} />
          <rect x="4" y="-5" width="15" height="10" rx="4" fill={C.lilac} fillOpacity={0.9} stroke={C.ink} strokeWidth={2.4} />
          <Line d="M-4 -1 Q0 -3.5 4 -1" w={2.2} />
          <Line d="M-15 -2 L-12 -4.5 M8 -2 L11 -4.5" w={1.4} color={C.white} />
        </g>
      </>
    ),
  },
  intern: {
    skin: C.skin4,
    top: C.sun,
    outfit: 'tee',
    hairFront: (
      <Ol fill={HAIR_DARK} shadeFill="#20151B" far={[-3, -3]}>
        <path d="M-28.5 -6 C-30 -30 -16 -34 0 -34 C16 -34 30 -30 28.5 -6 C25 -16 17 -19 0 -19 C-17 -19 -25 -16 -28.5 -6 Z" />
        <circle cx="-18" cy="-31" r="5" />
        <circle cx="-8" cy="-35" r="5" />
        <circle cx="3" cy="-36" r="5" />
        <circle cx="14" cy="-34" r="5" />
        <circle cx="23" cy="-28" r="4.5" />
      </Ol>
    ),
  },
  jo: {
    skin: C.skin2,
    top: C.orange,
    outfit: 'coat',
    hairBack: (
      <Ol fill="#7A4A2E" shadeFill="#5E3720" far={[-3, -3]}>
        <path d="M18 -26 C34 -26 40 -10 36 6 C34 12 30 12 29 6 C30 -6 26 -16 16 -18 Z" />
      </Ol>
    ),
    hairFront: (
      <>
        <Ol fill="#7A4A2E" shadeFill="#5E3720" far={[-3, -3]}>
          <path d="M-29.5 -2 C-31.5 -27 -17 -36 1 -36 C19 -36 31.5 -27 29.5 -2 C26 -13 18 -21 6 -21 C-6 -20 -16 -18 -22 -12 C-25 -9 -27 -6 -29.5 -2 Z" />
        </Ol>
        <Ol fill={C.sun} w={2.4}>
          <rect x="26" y="-22" width="8" height="8" rx="3" />
        </Ol>
      </>
    ),
  },
};

export function skinOf(who: Who) {
  return LOOKS[who].skin;
}
export function topOf(who: Who) {
  return LOOKS[who].top;
}

// Just the head, centred on 0,0. For avatars and close-ups.
export function Head({ who, face = {}, className, transform, style }: { who: Who; face?: Face; className?: string; transform?: string; style?: CSSProperties }) {
  const L = LOOKS[who];
  return (
    <g transform={transform}><g className={className} style={style}>
      {L.hairBack}
      <HeadBase skin={L.skin} />
      {who === 'tom' && L.over}
      <FaceParts face={face} skin={L.skin} part={who === 'sam' ? 'rest' : 'all'} />
      {who !== 'tom' && L.over}
      {L.hairFront}
      {/* Sam's eyebrow does the talking, so it sits over her fringe. */}
      {who === 'sam' && <FaceParts face={face} skin={L.skin} part="brows" />}
    </g></g>
  );
}

/* ------------------------------------------------------------------ */
/* Hands                                                               */
/* ------------------------------------------------------------------ */

export type HandKind = 'open' | 'fist' | 'thumb' | 'point' | 'grip' | 'flat';

// Wrist at 0,0, fingers pointing up (-y). About 20 wide and 32 long.
export function Hand({ kind, skin, x = 0, y = 0, rot = 0, flip = false, scale = 1, className }: {
  kind: HandKind; skin: string; x?: number; y?: number; rot?: number; flip?: boolean; scale?: number; className?: string;
}) {
  const tf = `translate(${x} ${y}) rotate(${rot}) scale(${flip ? -scale : scale} ${scale})`;
  const line = sh(skin, 0.55);
  if (kind === 'open') {
    return (
      <g transform={tf}><g className={className}>
        <Ol fill={skin} w={2.6}>
          <rect x="-9.5" y="-19" width="19" height="20" rx="7.5" />
          <rect x="-9.4" y="-30" width="5" height="18" rx="2.5" />
          <rect x="-4.6" y="-33" width="5" height="20" rx="2.5" />
          <rect x="0.2" y="-32.4" width="5" height="20" rx="2.5" />
          <rect x="4.8" y="-28.6" width="5" height="17" rx="2.5" />
          <rect x="-4" y="-13" width="6.4" height="15" rx="3.2" transform="translate(-7 -2) rotate(-48)" />
        </Ol>
        <Line d="M-4.5 -26 V-18 M0.2 -28 V-18 M4.9 -26 V-18" w={1.8} color={line} />
      </g></g>
    );
  }
  if (kind === 'flat') {
    // An open hand seen edge-on-ish: fingers together, for hands on chest or lids.
    return (
      <g transform={tf}><g className={className}>
        <Ol fill={skin} w={2.6}>
          <rect x="-9.5" y="-28" width="19" height="29" rx="8" />
          <rect x="-4" y="-12" width="6.4" height="13" rx="3.2" transform="translate(-8 -2) rotate(-40)" />
        </Ol>
        <Line d="M-3.2 -26 V-15 M1.6 -27 V-15 M6 -25 V-15" w={1.8} color={line} />
      </g></g>
    );
  }
  if (kind === 'thumb') {
    return (
      <g transform={tf}><g className={className}>
        <Ol fill={skin} w={2.6}>
          <rect x="-10" y="-18" width="20" height="19" rx="7" />
          <rect x="-10" y="-33" width="8" height="19" rx="4" />
        </Ol>
        <Line d="M-2 -12 H8 M-2 -6.5 H8" w={1.8} color={line} />
      </g></g>
    );
  }
  if (kind === 'point') {
    return (
      <g transform={tf}><g className={className}>
        <Ol fill={skin} w={2.6}>
          <rect x="-10" y="-17" width="20" height="18" rx="7" />
          <rect x="-8.5" y="-33" width="5.6" height="20" rx="2.8" />
        </Ol>
        <Line d="M-2 -12 H8 M-2 -6.5 H8" w={1.8} color={line} />
      </g></g>
    );
  }
  // fist / grip: knuckles toward us.
  return (
    <g transform={tf}><g className={className}>
      <Ol fill={skin} w={2.6}>
        <rect x="-10" y="-19" width="20" height="20" rx="8" />
      </Ol>
      <Line d="M-3.4 -18 V-10 M1.6 -18.5 V-10 M6.4 -17.5 V-10" w={1.8} color={line} />
    </g></g>
  );
}

/* ------------------------------------------------------------------ */
/* Bodies                                                              */
/* ------------------------------------------------------------------ */

export type ArmPose = {
  pts: [number, number][]; // shoulder, elbow, wrist
  hand: HandKind;
  flip?: boolean;
  rot?: number;
  behind?: boolean;
  className?: string; // pivots at the shoulder
  foreClass?: string; // pivots at the elbow
  foreStyle?: CSSProperties;
  hold?: ReactNode; // drawn under the hand, in wrist coordinates (a mug, a phone)
  over?: ReactNode; // drawn over the hand, in wrist coordinates
  sleeve?: string;
};

function handAngle(a: [number, number], b: [number, number]) {
  return (Math.atan2(b[0] - a[0], -(b[1] - a[1])) * 180) / Math.PI;
}

// An arm is an upper arm and a forearm, each an outlined tube. The forearm
// sits in its own group pivoted on the elbow so it can wave or sip; the
// upper arm's colour is laid last so the elbow joint shows no seam.
export function Arm({ pose, color, skin }: { pose: ArmPose; color: string; skin: string }) {
  const [s0, e0, w0] = pose.pts;
  const e: [number, number] = [e0[0] - s0[0], e0[1] - s0[1]];
  const w: [number, number] = [w0[0] - e0[0], w0[1] - e0[1]];
  const rot = pose.rot ?? handAngle([0, 0], w);
  const upper = `M0 0 L${e[0]} ${e[1]}`;
  const sleeve = pose.sleeve ?? color;
  return (
    <g transform={`translate(${s0[0]} ${s0[1]})`}>
      <g className={pose.className}>
        <path d={upper} stroke={C.ink} strokeWidth={24} strokeLinecap="round" fill="none" />
        <g transform={`translate(${e[0]} ${e[1]})`}>
          <g className={pose.foreClass} style={pose.foreStyle}>
            <Tube d={`M0 0 L${w[0]} ${w[1]}`} width={18} color={sleeve} />
            <g transform={`translate(${w[0]} ${w[1]})`}>
              {pose.hold}
              <Hand kind={pose.hand} skin={skin} rot={rot} flip={pose.flip} />
              {pose.over}
            </g>
          </g>
        </g>
        <path d={upper} stroke={sleeve} strokeWidth={18} strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}

// Standard arm poses, for the viewer's left arm. mirror() flips one for the right.
export const POSE = {
  down: { pts: [[-38, 58], [-46, 100], [-44, 128]], hand: 'fist' } as ArmPose,
  tada: { pts: [[-38, 58], [-66, 38], [-80, 6]], hand: 'open' } as ArmPose,
  wave: { pts: [[-38, 58], [-66, 62], [-72, 26]], hand: 'open' } as ArmPose,
  up: { pts: [[-38, 58], [-52, 20], [-56, -26]], hand: 'open' } as ArmPose,
  chest: { pts: [[-38, 58], [-44, 100], [-12, 82]], hand: 'flat', rot: 62 } as ArmPose,
  thumb: { pts: [[-38, 58], [-48, 102], [-30, 78]], hand: 'thumb', rot: 0 } as ArmPose,
  shrug: { pts: [[-38, 58], [-54, 96], [-80, 84]], hand: 'open', rot: -70 } as ArmPose,
  mug: { pts: [[-38, 58], [-46, 102], [-22, 86]], hand: 'grip', rot: 0 } as ArmPose,
};

export function mirror(p: ArmPose): ArmPose {
  return { ...p, pts: p.pts.map(([x, y]) => [-x, y] as [number, number]), rot: p.rot === undefined ? undefined : -p.rot, flip: !p.flip };
}

export function withPose(p: ArmPose, extra: Partial<ArmPose>): ArmPose {
  return { ...p, ...extra };
}

function Outfit({ who, height }: { who: Who; height: number }) {
  const L = LOOKS[who];
  const top = L.top;
  const bottom = 38 + height;
  const torso = `M-14 37 C-36 37 -48 47 -50 68 L-51 ${bottom} L51 ${bottom} L50 68 C48 47 36 37 14 37 Z`;
  const dark = sh(top, 0.28);
  return (
    <>
      {L.outfit === 'hoodie' && (
        <Ol fill={top} far={[-3, -3]}>
          <path d="M-30 30 C-34 52 34 52 30 30 C24 22 -24 22 -30 30 Z" />
        </Ol>
      )}
      <Ol fill={top} far={[-9, 0]}>
        <path d={torso} />
      </Ol>
      {L.outfit === 'cardigan' && (
        <>
          <Ol fill="#FFF1D6" w={2.4}>
            <path d="M-14 37.5 L0 70 L14 37.5 Z" />
          </Ol>
          <Line d={`M-14 38 L0 70 L14 38 M0 70 V${bottom}`} w={2.4} />
          {[82, 100, 118, 136].filter((y) => y < bottom - 6).map((y) => (
            <circle key={y} cx="5.5" cy={y} r="2.6" fill={C.white} stroke={C.ink} strokeWidth={2} />
          ))}
          <Line d={`M-40 ${Math.min(120, bottom - 12)} h14 M26 ${Math.min(120, bottom - 12)} h14`} w={2} color={dark} />
        </>
      )}
      {L.outfit === 'sweater' && (
        <>
          <Ol fill={sh(top, 0.1)} w={2.6}>
            <path d="M-18 36 Q0 55 18 36 L13 33 Q0 47 -13 33 Z" />
          </Ol>
          <Line d="M-30 60 q4 6 0 12 M30 60 q-4 6 0 12" w={2} color={dark} />
        </>
      )}
      {L.outfit === 'hoodie' && (
        <>
          <Line d="M-8 46 V76 M8 46 V74" w={2.4} color={C.white} />
          <circle cx="-8" cy="78" r="2.6" fill={C.white} stroke={C.ink} strokeWidth={1.8} />
          <circle cx="8" cy="76" r="2.6" fill={C.white} stroke={C.ink} strokeWidth={1.8} />
          {bottom > 120 && <Line d={`M-30 ${bottom - 20} Q0 ${bottom - 30} 30 ${bottom - 20}`} w={2} color={dark} />}
        </>
      )}
      {L.outfit === 'blazer' && (
        <>
          <Ol fill={C.white} w={2.4}>
            <path d="M-14 37.5 L0 74 L14 37.5 Z" />
          </Ol>
          <Ol fill={sh(top, 0.1)} w={2.6}>
            <path d="M-15 37 L-2 76 L-20 58 L-15 52 Z" />
            <path d="M15 37 L2 76 L20 58 L15 52 Z" />
          </Ol>
          <circle cx="0" cy="92" r="2.8" fill={C.ink} />
        </>
      )}
      {L.outfit === 'zip' && (
        <>
          <Ol fill={top} w={2.6} far={[-2, 0]}>
            <path d="M-17 26 L-18 44 Q0 50 18 44 L17 26 Q0 32 -17 26 Z" />
          </Ol>
          <Line d="M0 32 V96" w={2.4} />
          <Ol fill={C.metal} w={2}>
            <rect x="-3" y="58" width="6" height="10" rx="2" />
          </Ol>
        </>
      )}
      {L.outfit === 'tee' && (
        <Line d="M-15 38 Q0 50 15 38" w={2.6} color={dark} />
      )}
      {L.outfit === 'coat' && (
        <>
          <Ol fill={sh(top, 0.1)} w={2.6}>
            <path d="M-20 34 C-28 44 -24 56 -12 60 L0 44 L12 60 C24 56 28 44 20 34 Z" />
          </Ol>
          <Line d={`M0 44 V${bottom}`} w={2.4} />
          {[74, 96, 118].filter((y) => y < bottom - 6).map((y) => (
            <circle key={y} cx="-6" cy={y} r="2.6" fill={C.white} stroke={C.ink} strokeWidth={2} />
          ))}
        </>
      )}
    </>
  );
}

export function Neck({ skin }: { skin: string }) {
  return (
    <Ol fill={sh(skin, 0.14)}>
      <rect x="-9" y="18" width="18" height="26" rx="4" />
    </Ol>
  );
}

// A person from the waist up (or further, with `height`). Head centred on 0,0.
export function Bust({ who, face = {}, arms = [], height = 100, className, transform, style, headClass, headStyle, extra }: {
  who: Who;
  face?: Face;
  arms?: ArmPose[];
  height?: number;
  className?: string;
  transform?: string;
  style?: CSSProperties;
  headClass?: string;
  headStyle?: CSSProperties;
  extra?: ReactNode; // drawn over the torso, under the arms
}) {
  const L = LOOKS[who];
  const behind = arms.filter((a) => a.behind);
  const front = arms.filter((a) => !a.behind);
  return (
    <g transform={transform}><g className={className} style={style}>
      {behind.map((a, i) => <Arm key={`b${i}`} pose={a} color={L.top} skin={L.skin} />)}
      <Outfit who={who} height={height} />
      <Neck skin={L.skin} />
      {L.outfit === 'hoodie' && <Line d="M-22 36 Q0 50 22 36" w={2.4} color={sh(L.top, 0.3)} />}
      {L.chest}
      {extra}
      <Head who={who} face={face} className={headClass} style={headStyle} />
      {front.map((a, i) => <Arm key={`f${i}`} pose={a} color={L.top} skin={L.skin} />)}
    </g></g>
  );
}

// A leg as a filled quadrilateral from hip point a to ankle point b.
function legPath(a: [number, number], b: [number, number], wTop: number, wBot: number) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  const [nx, ny] = [-dy / len, dx / len];
  const p = (q: [number, number], w: number, sgn: number) => `${(q[0] + nx * w * sgn).toFixed(1)} ${(q[1] + ny * w * sgn).toFixed(1)}`;
  return `M${p(a, wTop / 2, 1)} L${p(b, wBot / 2, 1)} L${p(b, wBot / 2, -1)} L${p(a, wTop / 2, -1)} Z`;
}

// Legs and shoes for anyone standing. Hips at y = top, soles at y = bottom.
// `walk` puts one foot forward. Everything is one outlined silhouette.
export function Legs({ top, bottom, color = '#4B4459', shoe = C.white, stance = 'stand', className }: { top: number; bottom: number; color?: string; shoe?: string; stance?: 'stand' | 'walk' | 'wide'; className?: string }) {
  const ank = bottom - 10;
  const feet: [number, number][] = stance === 'walk' ? [[-30, ank], [26, ank - 2]] : stance === 'wide' ? [[-28, ank], [28, ank]] : [[-19, ank], [19, ank]];
  const hips: [number, number][] = [[-20, top + 18], [20, top + 18]];
  return (
    <g className={className}>
      <Ol fill={color} far={[-6, 0]}>
        <rect x="-44" y={top} width="88" height="34" rx="12" />
        <path d={legPath(hips[0], feet[0], 40, 26)} />
        <path d={legPath(hips[1], feet[1], 40, 26)} />
      </Ol>
      <Line d={`M0 ${top + 22} V${top + 34}`} w={2} color={sh(color, 0.4)} />
      <Ol fill={shoe} far={[0, -3]} shadeFill={sh(shoe, 0.12)}>
        <path d={`M${feet[0][0] + 12} ${bottom} L${feet[0][0] - 20} ${bottom} C${feet[0][0] - 24} ${bottom} ${feet[0][0] - 24} ${bottom - 12} ${feet[0][0] - 12} ${bottom - 14} L${feet[0][0] + 12} ${bottom - 16} Z`} />
        <path d={`M${feet[1][0] - 12} ${bottom} L${feet[1][0] + 20} ${bottom} C${feet[1][0] + 24} ${bottom} ${feet[1][0] + 24} ${bottom - 12} ${feet[1][0] + 12} ${bottom - 14} L${feet[1][0] - 12} ${bottom - 16} Z`} />
      </Ol>
    </g>
  );
}

// A whole standing person. Head centre at 0,0; soles at y = 232.
export function Figure({ who, face, arms, legs = '#4B4459', shoe, stance = 'stand', className, transform, style, headClass, extra, back }: {
  who: Who; face?: Face; arms?: ArmPose[]; legs?: string; shoe?: string; stance?: 'stand' | 'walk' | 'wide'; className?: string; transform?: string; style?: CSSProperties; headClass?: string; extra?: ReactNode; back?: ReactNode;
}) {
  return (
    <g transform={transform}>
      <g className={className} style={style}>
        {back}
        <Legs top={122} bottom={232} color={legs} shoe={shoe} stance={stance} />
        <Bust who={who} face={face} arms={arms} height={96} headClass={headClass} extra={extra} />
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Things                                                              */
/* ------------------------------------------------------------------ */

// Jonah's mug and Dana's. Base centre at 0,0, 26 wide, 30 tall, handle right.
export function Mug({ x = 0, y = 0, rot = 0, scale = 1, kind = 'anchor', steam = false, flip = false, color = C.white, className }: { x?: number; y?: number; rot?: number; scale?: number; kind?: 'anchor' | 'it' | 'plain'; steam?: boolean; flip?: boolean; color?: string; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -scale : scale} ${scale})`}><g className={className}>
      {steam && (
        <g className={s.steam}>
          <Line d="M-5 -36 q-4 -5 0 -10 q4 -5 0 -10" w={2.2} color={C.dim} />
          <Line d="M5 -34 q-4 -5 0 -10 q4 -5 0 -10" w={2.2} color={C.dim} />
        </g>
      )}
      <Ol fill={color} far={[-4, 0]} shadeFill={color === C.white ? '#E4DEEE' : sh(color)}>
        <path d="M13 -24 C24 -24 24 -8 13 -8 L13 -12 C19 -12 19 -20 13 -20 Z" />
        <rect x="-13" y="-30" width="26" height="30" rx="4" />
      </Ol>
      {kind === 'anchor' && (
        <g fill="none" stroke={C.corn} strokeWidth={2.2} strokeLinecap="round">
          <circle cx="0" cy="-21" r="2.4" />
          <path d="M0 -18.6 V-6 M-4 -14 H4 M-7 -10 Q-6 -5 0 -5 Q6 -5 7 -10" />
        </g>
      )}
      {kind === 'it' && <g transform={flip ? 'scale(-1 1)' : undefined}><T x={-0.5} y={-9} size={13} weight={800} fill={C.violet} anchor="middle">IT</T></g>}
    </g></g>
  );
}

// The desk plant. It grows over the day: 2 leaves, then 3, then a flower.
export function Plant({ x, y, stage = 2, scale = 1, className }: { x: number; y: number; stage?: 2 | 3 | 4; scale?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className={className}>
        <Line d={`M0 -22 Q-2 -34 1 -${stage === 4 ? 50 : 40}`} w={3} color={sh(C.leaf, 0.3)} />
        <Ol fill={C.leaf} far={[-3, -2]}>
          <path d="M0 -26 C-8 -24 -20 -30 -22 -42 C-10 -44 -2 -38 0 -26 Z" />
          <path d="M1 -32 C9 -30 21 -36 22 -48 C10 -50 2 -44 1 -32 Z" />
          {stage >= 3 && <path d="M0 -38 C-6 -38 -12 -46 -10 -56 C-2 -54 1 -46 0 -38 Z" />}
        </Ol>
        {stage === 4 && (
          <g transform="translate(2 -56)"><g className={s.flower}>
            <Ol fill={C.gum}>
              <circle cx="0" cy="-8" r="5.5" />
              <circle cx="7.6" cy="-2.5" r="5.5" />
              <circle cx="4.7" cy="6.5" r="5.5" />
              <circle cx="-4.7" cy="6.5" r="5.5" />
              <circle cx="-7.6" cy="-2.5" r="5.5" />
            </Ol>
            <circle r="4" fill={C.sun} stroke={C.ink} strokeWidth={2} />
          </g></g>
        )}
      </g>
      <Ol fill={C.pot} far={[-4, 0]}>
        <path d="M-14 -24 L14 -24 L11 0 L-11 0 Z" />
        <rect x="-16" y="-28" width="32" height="8" rx="3" />
      </Ol>
    </g>
  );
}

// A green padlock. `shut` class drops the shackle.
export function Lock({ x, y, scale = 1, color = C.green, shackleClass }: { x: number; y: number; scale?: number; color?: string; shackleClass?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path className={shackleClass} d="M-4.5 -3 V-7 A4.5 4.5 0 0 1 4.5 -7 V-3" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
      <rect x="-7" y="-4" width="14" height="11" rx="2.6" fill={color} />
      <circle cx="0" cy="1.2" r="1.6" fill={C.white} />
    </g>
  );
}

export function Tick({ x, y, r = 9, fill = C.green, className }: { x: number; y: number; r?: number; fill?: string; className?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}><g className={className}>
      <circle r={r} fill={fill} stroke={C.ink} strokeWidth={2} />
      <path d={`M${-r * 0.42} ${r * 0.02} L${-r * 0.1} ${r * 0.34} L${r * 0.45} ${-r * 0.3}`} fill="none" stroke={C.white} strokeWidth={r * 0.26} strokeLinecap="round" strokeLinejoin="round" />
    </g></g>
  );
}

// A cartoon browser window. The address bar of any app on Wirl is green,
// with a lock and its harbor-- link.
export function Win({ x, y, w, h, url, children, shadow = true, lockClass, bar = 'wirl', urlSize = 16, className }: {
  x: number; y: number; w: number; h: number; url?: string; children?: ReactNode; shadow?: boolean; lockClass?: string; bar?: 'wirl' | 'plain' | 'none'; urlSize?: number; className?: string;
}) {
  const barH = bar === 'none' ? 0 : 36;
  return (
    <g transform={`translate(${x} ${y})`}><g className={className}>
      {shadow && <rect x="0" y="6" width={w} height={h} rx="14" fill={C.ink} />}
      <rect x="0" y="0" width={w} height={h} rx="14" fill={C.white} stroke={C.ink} strokeWidth={3} />
      {bar !== 'none' && (
        <>
          <path d={`M1.5 ${barH} H${w - 1.5}`} stroke={C.ink} strokeWidth={2.5} />
          <g stroke={C.ink} strokeWidth={2}>
            <circle cx="17" cy="18" r="4.6" fill={C.tomato} />
            <circle cx="31" cy="18" r="4.6" fill={C.sun} />
            <circle cx="45" cy="18" r="4.6" fill={C.teal} />
          </g>
          {url !== undefined && (
            <g>
              <rect x="60" y="7" width={w - 72} height="22" rx="11" fill={bar === 'wirl' ? C.mint : '#F1EDF6'} stroke={bar === 'wirl' ? C.green : C.ink} strokeWidth={2} />
              {bar === 'wirl' && <Lock x={75} y={17} scale={0.95} shackleClass={lockClass} />}
              <T x={bar === 'wirl' ? 86 : 72} y={23.5} size={urlSize} fill={bar === 'wirl' ? C.greenText : C.dim}>{url}</T>
            </g>
          )}
        </>
      )}
      <g transform={`translate(0 ${barH})`}>{children}</g>
    </g></g>
  );
}

// A speech or chat bubble with a tail. The tail points from the bubble to (tx, ty).
export function Bubble({ x, y, w, h, fill = C.white, tail, r = 16, className, children }: {
  x: number; y: number; w: number; h: number; fill?: string; tail?: [number, number, number, number, number, number]; r?: number; className?: string; children?: ReactNode;
}) {
  return (
    <g className={className}>
      <Ol fill={fill} w={3}>
        <rect x={x} y={y} width={w} height={h} rx={r} />
        {tail && <path d={`M${tail[0]} ${tail[1]} L${tail[2]} ${tail[3]} L${tail[4]} ${tail[5]} Z`} />}
      </Ol>
      {children}
    </g>
  );
}

// Typing dots.
export function Dots({ x, y, className, color = C.dim }: { x: number; y: number; className?: string; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}><g className={className} fill={color}>
      <circle className={s.dot1} cx="-10" cy="0" r="3.6" />
      <circle className={s.dot2} cx="0" cy="0" r="3.6" />
      <circle className={s.dot3} cx="10" cy="0" r="3.6" />
    </g></g>
  );
}

/* ------------------------------------------------------------------ */
/* Stickers                                                            */
/* ------------------------------------------------------------------ */

// The mark's outside edge is the first subpath of its first path.
function outlineOf(node: ReactNode): string {
  const arr = Array.isArray(node) ? node : [node];
  for (const child of arr) {
    if (!child || typeof child !== 'object' || !('props' in child)) continue;
    const el = child as { type: unknown; props: { d?: unknown; children?: ReactNode } };
    if (el.type === 'path' && typeof el.props.d === 'string') {
      const end = el.props.d.search(/z/i);
      return end < 0 ? el.props.d : el.props.d.slice(0, end + 1);
    }
    const inner = outlineOf(el.props.children);
    if (inner) return inner;
  }
  return '';
}

export type StickerKind = 'claude' | 'codex' | 'cursor' | 'plus' | 'doc' | 'snail' | 'anchor';

// Where a sticker's corner comes up: just past one corner of the mark, like
// the headline's Cursor sticker. (x, y) is that corner, angle points outward.
const PEELS: Partial<Record<StickerKind, { x: number; y: number; angle: number; depth: number }>> = {
  cursor: { x: 22.53, y: 17.59, angle: 30, depth: 1.3 },
  claude: { x: 20.5, y: 20.5, angle: 45, depth: 0.2 },
  codex: { x: 20.5, y: 19.5, angle: 40, depth: 0.4 },
};

// A die-cut sticker stuck onto something in the drawing: a white cut border
// with a thin ink cut line, a soft shadow, the logo untouched on top.
// (x, y) is its centre; size is the logo's width in scene units. With
// `peelMore`, a second copy with a deeper fold is drawn for hover states
// (the page crossfades them with the two class names).
export function Sticker({ kind, x, y, size, rot = 0, peel = false, className, peelMore }: {
  kind: StickerKind; x: number; y: number; size: number; rot?: number; peel?: boolean; className?: string; peelMore?: [string, string];
}) {
  const id = useUid('stk');
  const k = size / 24;
  const cut = 1.5 / k; // the ink cut line, in logo units
  const border = 6;
  const mark = AGENT_MARKS.find((m) => m.id === kind);
  let shape: ReactNode;
  let art: ReactNode;
  if (mark) {
    shape = <path d={outlineOf(mark.icon(id))} />;
    art = <g color={C.ink}>{mark.icon(id)}</g>;
  } else if (kind === 'snail') {
    shape = <rect x="-1" y="1" width="26" height="22" rx="11" />;
    art = (
      <g transform="translate(-0.5 2.6) scale(0.52)" fill="none" stroke={C.ink} strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round">
        <path d={pinnedShellPath(SHELL_REST_TURNS)} />
        <path d={BODY_REST} />
        {SNAIL_EYES.map(({ base, tip, eye }) => (
          <g key={tip.join(',')}>
            <path d={`M${base[0]} ${base[1]} L${tip[0]} ${tip[1]}`} />
            <circle cx={eye[0]} cy={eye[1]} r="2.2" fill={C.ink} stroke="none" />
          </g>
        ))}
      </g>
    );
  } else if (kind === 'anchor') {
    shape = <circle cx="12" cy="12" r="12" />;
    art = (
      <>
        <circle cx="12" cy="12" r="11" fill={C.corn} />
        <g fill="none" stroke={C.white} strokeWidth={2.2} strokeLinecap="round">
          <circle cx="12" cy="6.4" r="2.2" />
          <path d="M12 8.6 V19 M8.4 11.6 H15.6 M6 15 Q7 19.2 12 19.2 Q17 19.2 18 15" />
        </g>
      </>
    );
  } else if (kind === 'doc') {
    // A skill file, for agents with no MCP: the same glyph as the connect tab.
    shape = <circle cx="12" cy="12" r="11.5" />;
    art = (
      <g fill="none" stroke={C.ink} strokeOpacity={0.6} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.5 4.5h6.5l3.5 3.5v11.5h-10z" />
        <path d="M10 12h5M10 15.5h5" />
      </g>
    );
  } else {
    // plus: a plain round sticker, for any other agent.
    shape = <circle cx="12" cy="12" r="11.5" />;
    art = <path d="M12 5.5v13M5.5 12h13" fill="none" stroke={C.ink} strokeOpacity={0.6} strokeWidth={3} strokeLinecap="round" />;
  }
  const sheet = (fillC: string) => (
    <>
      <g fill={C.ink} stroke={C.ink} strokeWidth={border + cut * 2} strokeLinejoin="round">{shape}</g>
      <g fill={fillC} stroke={fillC} strokeWidth={border} strokeLinejoin="round">{shape}</g>
    </>
  );
  const pl = peel ? PEELS[kind] : undefined;
  const variant = (depth: number | null, key: string, cls?: string) => {
    let fold: { x: number; y: number; a: number } | null = null;
    if (pl && depth !== null) {
      const rad = (pl.angle * Math.PI) / 180;
      fold = { x: +(pl.x + depth * Math.cos(rad)).toFixed(2), y: +(pl.y + depth * Math.sin(rad)).toFixed(2), a: pl.angle };
    }
    const keep = `${id}-${key}-keep`;
    return (
      <g className={cls} key={key}>
        {fold && (
          <clipPath id={keep}>
            <rect x="-60" y="-60" width="60" height="120" transform={`translate(${fold.x} ${fold.y}) rotate(${fold.a})`} />
          </clipPath>
        )}
        <g clipPath={fold ? `url(#${keep})` : undefined}>
          {sheet(C.white)}
          {art}
        </g>
        {fold && (
          // The corner that came up, mirrored across the fold so we see its back.
          <g clipPath={`url(#${keep})`}>
            <g transform={`translate(${fold.x} ${fold.y}) rotate(${fold.a}) scale(-1 1) rotate(${-fold.a}) translate(${-fold.x} ${-fold.y})`}>
              {sheet('#E9E3F2')}
            </g>
          </g>
        )}
      </g>
    );
  };
  return (
    <g transform={`translate(${x} ${y})`}><g className={className}><g transform={`rotate(${rot}) scale(${k}) translate(-12 -12)`}>
      <defs>
        <filter id={`${id}-sh`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy={0.9} stdDeviation={0.9} floodColor={C.ink} floodOpacity={0.28} />
        </filter>
      </defs>
      <g filter={`url(#${id}-sh)`}>
        {pl && peelMore ? (
          <>
            {variant(pl.depth, 'a', peelMore[0])}
            {variant(Math.max(0.2, pl.depth - 1.1), 'b', peelMore[1])}
          </>
        ) : (
          variant(pl ? pl.depth : null, 'a')
        )}
      </g>
    </g></g></g>
  );
}

/* ------------------------------------------------------------------ */
/* Laptops and furniture                                               */
/* ------------------------------------------------------------------ */

// A laptop seen from the lid side. Centre bottom at (x, y). Lid w x h.
export function LaptopLid({ x, y, w = 150, h = 100, children, className }: { x: number; y: number; w?: number; h?: number; children?: ReactNode; className?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}><g className={className}>
      <Ol fill={C.metal} far={[-7, -5]}>
        <rect x={-w / 2} y={-h} width={w} height={h} rx="10" />
      </Ol>
      <Ol fill={sh(C.metal, 0.12)}>
        <rect x={-w / 2 - 10} y={-3} width={w + 20} height="9" rx="4.5" />
      </Ol>
      <g transform={`translate(0 ${-h / 2})`}>{children}</g>
    </g></g>
  );
}

// A laptop seen from the front, screen toward us. (x, y) is the top left of
// the lid; children draw on the screen, origin at its top left.
export function LaptopScreen({ x, y, w, h, children, deck = true, dark = false }: { x: number; y: number; w: number; h: number; children?: ReactNode; deck?: boolean; dark?: boolean }) {
  const b = 8;
  return (
    <g transform={`translate(${x} ${y})`}>
      <Ol fill={C.ink}>
        <rect x="0" y="0" width={w} height={h} rx="12" />
      </Ol>
      <rect x={b} y={b} width={w - b * 2} height={h - b * 2} rx="5" fill={dark ? '#1E1824' : C.white} />
      <g transform={`translate(${b} ${b})`}>{children}</g>
      {deck && (
        <Ol fill={C.metal} far={[0, -3]}>
          <path d={`M-6 ${h} H${w + 6} L${w + 14} ${h + 12} H-14 Z`} />
        </Ol>
      )}
    </g>
  );
}

// A desk seen from the front: a slab, and either legs or a front panel
// that runs down out of frame (so nobody behind it needs legs).
export function Desk({ x, y, w, h = 18, legs = true, panel = 0 }: { x: number; y: number; w: number; h?: number; legs?: boolean; panel?: number }) {
  return (
    <g>
      {legs && !panel && (
        <Ol fill={sh(C.wood, 0.3)}>
          <rect x={x + 18} y={y + h} width="12" height="240" />
          <rect x={x + w - 30} y={y + h} width="12" height="240" />
        </Ol>
      )}
      {panel > 0 && (
        <Ol fill="#F7D9B4" far={[-10, 0]} shadeFill="#EBC596">
          <rect x={x + 8} y={y + h - 4} width={w - 16} height={panel} />
        </Ol>
      )}
      <Ol fill={C.wood} far={[0, -4]} shadeFill={sh(C.wood, 0.14)}>
        <rect x={x} y={y} width={w} height={h} rx="6" />
      </Ol>
    </g>
  );
}

// A ground contact shadow.
export function Contact({ x, y, rx, ry = 7, fill }: { x: number; y: number; rx: number; ry?: number; fill: string }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={fill} />;
}
