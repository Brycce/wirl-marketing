// The things on the stickers, drawn once and reused in every scene: the app
// window, the padlock, the Google button, the link, chat bubbles, laptops,
// the terminal, the safe, the log receipt, version chips, label tape.
// Flat fills, one darker band for depth, a 2.5 ink outline with round joins.

import type { ReactNode } from 'react';
import { AGENT_MARKS } from '@/components/AgentIcons';
import { pinnedShellPath, SHELL_REST_TURNS } from '@/components/swirl';
import { C } from './kit';

const O = { stroke: C.ink, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
export const FONT = { fontFamily: 'Inter, system-ui, sans-serif' };
export const MONO = { fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace' };

/* ---------- App window ---------- */

export function AppWindow({
  w, h, name, bar = C.green, barText = C.ink, lock = false, children, bar_h = 32, url, dots = true, nameSize = 14,
}: {
  w: number; h: number; name: string; bar?: string; barText?: string; lock?: boolean; children?: ReactNode; bar_h?: number; url?: string; dots?: boolean; nameSize?: number;
}) {
  const r = 12;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={r} fill={C.white} />
      <path d={`M0 ${bar_h} V${r} Q0 0 ${r} 0 H${w - r} Q${w} 0 ${w} ${r} V${bar_h} Z`} fill={bar} />
      <path d={`M0 ${bar_h} H${w}`} {...O} />
      {dots && [15, 28, 41].map((x) => <circle key={x} cx={x} cy={bar_h / 2} r={4} fill={C.white} stroke={C.ink} strokeWidth={1.8} />)}
      <text x={dots ? 55 : 13} y={bar_h / 2 + nameSize * 0.34} fontSize={nameSize} fontWeight={650} fill={barText} style={FONT}>{name}</text>
      {lock && <MiniLock x={w - 26} y={bar_h / 2 - 9} />}
      {url && (
        <g>
          <rect x={10} y={bar_h + 9} width={w - 20} height={22} rx={11} fill="#F1EFEA" stroke={C.ink} strokeWidth={1.6} />
          <text x={22} y={bar_h + 24.5} fontSize={12} fontWeight={500} fill={C.dim} style={FONT}>{url}</text>
        </g>
      )}
      {children}
      <rect x={0} y={0} width={w} height={h} rx={r} fill="none" {...O} />
    </g>
  );
}

/* A small closed padlock for title bars. 16 x 19. */
export function MiniLock({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M4.5 8 V5.5 a3.5 3.5 0 0 1 7 0 V8" fill="none" stroke={C.ink} strokeWidth={2.2} strokeLinecap="round" />
      <rect x={1} y={7.5} width={14} height={11} rx={3} fill={C.sun} stroke={C.ink} strokeWidth={1.8} />
      <circle cx={8} cy={12.5} r={1.6} fill={C.ink} />
    </g>
  );
}

/* ---------- Padlock ---------- 44 x 54 */
export function Padlock() {
  return (
    <g>
      <path d="M11 25 V16 a11 11 0 0 1 22 0 V25" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <path d="M11 25 V16 a11 11 0 0 1 22 0 V25" fill="none" stroke="#5B6470" strokeWidth={2} strokeLinecap="round" opacity={0.6} />
      <rect x={1.5} y={22} width={41} height={31} rx={8} fill={C.sun} />
      <path d="M1.5 44 H42.5 V45 Q42.5 53 34.5 53 H9.5 Q1.5 53 1.5 45 Z" fill={C.sunDark} />
      <rect x={1.5} y={22} width={41} height={31} rx={8} fill="none" {...O} />
      <circle cx={22} cy={34.5} r={4.2} fill={C.ink} />
      <path d="M22 36 V43" stroke={C.ink} strokeWidth={3.4} strokeLinecap="round" />
      {/* vinyl sheen */}
      <path d="M8 40 L20 26 H27 L10 46 Z" fill="#FFFFFF" opacity={0.3} />
    </g>
  );
}

/* ---------- Google ---------- */
export function GoogleG({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 48})`}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </g>
  );
}

/* 'Sign in with Google', a white pill. 206 x 40 */
export const GOOGLE_W = 206;
export function GoogleButton({ className }: { className?: string }) {
  return (
    <g className={className}>
      <rect x={0} y={0} width={GOOGLE_W} height={40} rx={20} fill={C.white} {...O} />
      <GoogleG x={15} y={10} size={20} />
      <text x={45} y={25.2} fontSize={14.5} fontWeight={600} fill={C.ink} style={FONT}>Sign in with Google</text>
    </g>
  );
}

/* ---------- Link ---------- */
export function ChainIcon({ x, y, s = 1, color = C.ink }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </g>
  );
}

export const LINK_TEXT = 'harbor--supplier-payments.wirl.run';
export const LINK_W = 306;
/* The link as a bumper sticker. LINK_W x 40 */
export function LinkTag({ w = LINK_W, text = LINK_TEXT, size = 15 }: { w?: number; text?: string; size?: number }) {
  return (
    <g>
      <rect x={0} y={0} width={w} height={40} rx={10} fill={C.sun} />
      <path d={`M0 31 H${w} V30 Q${w} 40 ${w - 10} 40 H10 Q0 40 0 30 Z`} fill={C.sunDark} opacity={0.55} />
      <rect x={0} y={0} width={w} height={40} rx={10} fill="none" {...O} />
      <ChainIcon x={11} y={8.5} s={0.95} />
      <text x={40} y={25.5} fontSize={size} fontWeight={700} fill={C.ink} style={FONT} letterSpacing="-0.01em">{text}</text>
    </g>
  );
}

/* ---------- Chat bubble ---------- */
export function bubblePath(w: number, h: number, tail: 'bl' | 'br' | 'tl' | 'tr' | 'none' = 'bl', r = 16) {
  // A rounded rectangle, with a short tail off one bottom corner.
  const t = 13;
  let d = `M${r} 0 H${w - r} Q${w} 0 ${w} ${r} V${h - r} `;
  if (tail === 'br') d += `Q${w} ${h} ${w - r} ${h} Q${w - 2} ${h + 2} ${w + 4} ${h + t} Q${w - 14} ${h + 7} ${w - r - 14} ${h} `;
  else d += `Q${w} ${h} ${w - r} ${h} `;
  if (tail === 'bl') d += `H${r + 14} Q${14} ${h + 7} ${-4} ${h + t} Q${2} ${h + 2} ${r} ${h} Q0 ${h} 0 ${h - r} `;
  else d += `H${r} Q0 ${h} 0 ${h - r} `;
  d += `V${r} Q0 0 ${r} 0 Z`;
  return d;
}

export function Bubble({ w, h, tail = 'bl', fill = C.white, children }: { w: number; h: number; tail?: 'bl' | 'br' | 'none'; fill?: string; children?: ReactNode }) {
  return (
    <g>
      <path d={bubblePath(w, h, tail)} fill={fill} {...O} />
      {children}
    </g>
  );
}

/* ---------- Agent logos ---------- */

// The outside edge of a mark: its first subpath, so the cut ignores holes.
function outlineOf(node: ReactNode): string {
  if (!node || typeof node !== 'object') return '';
  if (Array.isArray(node)) {
    for (const n of node) { const d = outlineOf(n); if (d) return d; }
    return '';
  }
  const el = node as { type?: unknown; props?: { d?: unknown; children?: ReactNode } };
  if (el.type === 'path' && typeof el.props?.d === 'string') {
    const d = el.props.d;
    const end = d.search(/z/i);
    return end < 0 ? d : d.slice(0, end + 1);
  }
  return outlineOf(el.props?.children);
}

export function markOutline(id: string) {
  const m = AGENT_MARKS.find((a) => a.id === id);
  return m ? outlineOf(m.icon('o')) : '';
}

/* One agent's mark, exact, at `size` px, top-left at x, y. */
export function Mark({ id, x = 0, y = 0, size = 24, uid, color = C.ink }: { id: string; x?: number; y?: number; size?: number; uid: string; color?: string }) {
  const m = AGENT_MARKS.find((a) => a.id === id);
  if (!m) return null;
  return <g transform={`translate(${x} ${y}) scale(${size / 24})`} style={{ color }}>{m.icon(uid)}</g>;
}

/* A mark cut out as its own little sticker (for laptop lids, bubbles, the table).
   border is the white margin in page units. */
export function MarkSticker({ id, x = 0, y = 0, size = 24, uid, border = 4, r = 0, back = false }: { id: string; x?: number; y?: number; size?: number; uid: string; border?: number; r?: number; back?: boolean }) {
  const k = size / 24;
  const d = markOutline(id);
  return (
    <g transform={`translate(${x + size / 2} ${y + size / 2}) rotate(${r}) translate(${-size / 2} ${-size / 2})`}>
      <g transform={`scale(${k})`}>
        {back && <path d={d} fill="#000" stroke="#000" strokeOpacity={0.18} fillOpacity={0.18} strokeWidth={(border * 2) / k} strokeLinejoin="round" transform={`translate(0 ${1.4 / k})`} />}
        <path d={d} fill={C.white} stroke={C.white} strokeWidth={(border * 2) / k} strokeLinejoin="round" />
      </g>
      <Mark id={id} size={size} uid={uid} />
    </g>
  );
}

/* The '+' for every other agent, a plain round sticker. */
export function PlusSticker({ x = 0, y = 0, size = 24, border = 0 }: { x?: number; y?: number; size?: number; border?: number }) {
  const c = size / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={c} cy={c} r={c + border} fill={C.white} />
      <path d={`M${c} ${size * 0.26}V${size * 0.74}M${size * 0.26} ${c}H${size * 0.74}`} stroke={C.ink} strokeOpacity={0.55} strokeWidth={size * 0.11} strokeLinecap="round" />
    </g>
  );
}

/* ---------- The snail (the wordmark's mark), as a tiny sticker ---------- */
const SNAIL_BODY = 'M34.17 29.31 C 27 31.8, 15 33.2, 9 30.2 C 4.6 28, 4.2 23.4, 8.2 22.2';
const SNAIL_EYES: [number, number, number, number][] = [[8.6, 22.4, 5.4, 14.6], [9.6, 22.4, 10.8, 14]];
export function SnailSticker({ x = 0, y = 0, size = 16, border = 3, r = 0, color = C.ink }: { x?: number; y?: number; size?: number; border?: number; r?: number; color?: string }) {
  // Drawn in the mark's own 48 x 36 box, scaled to `size` tall.
  const k = size / 36;
  const shell = pinnedShellPath(SHELL_REST_TURNS);
  const lines = (
    <>
      <path d={shell} />
      <path d={SNAIL_BODY} />
      {SNAIL_EYES.map(([bx, by, ex, ey]) => <path key={ex} d={`M${bx} ${by} L${ex} ${ey}`} />)}
    </>
  );
  return (
    <g transform={`translate(${x} ${y}) rotate(${r} ${24 * k} ${18 * k}) scale(${k})`}>
      <g fill={C.white} stroke={C.white} strokeWidth={3.4 + (border * 2) / k} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={32} cy={17} r={12} />
        {lines}
        {SNAIL_EYES.map(([, , ex, ey]) => <circle key={ex} cx={ex} cy={ey} r={2.1} />)}
      </g>
      <g fill="none" stroke={color} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">{lines}</g>
      {SNAIL_EYES.map(([, , ex, ey]) => <circle key={ex} cx={ex} cy={ey} r={2.1} fill={color} />)}
    </g>
  );
}
/* The snail's silhouette as it would be cut: for the empty spot on the sticker sheet. */
export function SnailHole({ x = 0, y = 0, size = 16, border = 3 }: { x?: number; y?: number; size?: number; border?: number }) {
  const k = size / 36;
  const shell = pinnedShellPath(SHELL_REST_TURNS);
  const shapes = (
    <>
      <circle cx={32} cy={17} r={12} />
      <path d={shell} />
      <path d={SNAIL_BODY} />
      {SNAIL_EYES.map(([bx, by, ex, ey]) => <path key={ex} d={`M${bx} ${by} L${ex} ${ey}`} />)}
      {SNAIL_EYES.map(([, , ex, ey]) => <circle key={`e${ex}`} cx={ex} cy={ey} r={2.1} />)}
    </>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} strokeLinecap="round" strokeLinejoin="round">
      <g fill="#D9D4C8" stroke="#D9D4C8" strokeWidth={3.4 + (border * 2 + 2) / k}>{shapes}</g>
      <g fill="#EEEBE4" stroke="#EEEBE4" strokeWidth={3.4 + (border * 2) / k}>{shapes}</g>
      {/* The faint print of the sticker that was here. */}
      <g fill="none" stroke="#CFC9BB" strokeWidth={3.4}>
        <path d={shell} />
        <path d={SNAIL_BODY} />
        {SNAIL_EYES.map(([bx, by, ex, ey]) => <path key={ex} d={`M${bx} ${by} L${ex} ${ey}`} />)}
      </g>
      {SNAIL_EYES.map(([, , ex, ey]) => <circle key={`d${ex}`} cx={ex} cy={ey} r={2.1} fill="#CFC9BB" />)}
    </g>
  );
}

/* ---------- Laptops ---------- */

/* From behind: the lid, and the edge of the base under it. w x h */
export function LaptopBack({ w, h, children }: { w: number; h: number; children?: ReactNode }) {
  return (
    <g>
      <rect x={-10} y={h - 14} width={w + 20} height={16} rx={6} fill={C.laptopDark} {...O} />
      <rect x={0} y={0} width={w} height={h - 8} rx={14} fill={C.laptop} {...O} />
      <path d={`M10 ${h - 22} H${w - 10}`} stroke="#3B414D" strokeWidth={3} strokeLinecap="round" />
      {children}
    </g>
  );
}

/* From the front: screen and keyboard. w x h */
export function LaptopFront({ w, h, children, screen = C.white }: { w: number; h: number; children?: ReactNode; screen?: string }) {
  const baseH = Math.round(h * 0.16);
  const lidH = h - baseH;
  return (
    <g>
      <rect x={0} y={0} width={w} height={lidH} rx={12} fill={C.laptop} {...O} />
      <rect x={10} y={10} width={w - 20} height={lidH - 20} rx={4} fill={screen} />
      {children}
      <path d={`M-14 ${lidH} H${w + 14} L${w + 6} ${h - 4} Q${w + 4} ${h} ${w - 2} ${h} H2 Q-4 ${h} -6 ${h - 4} Z`} fill="#454C59" {...O} />
      <path d={`M${w / 2 - 22} ${lidH + 1.5} H${w / 2 + 22} V${lidH + 4} Q${w / 2 + 22} ${lidH + 7} ${w / 2 + 18} ${lidH + 7} H${w / 2 - 18} Q${w / 2 - 22} ${lidH + 7} ${w / 2 - 22} ${lidH + 4} Z`} fill={C.laptopDark} />
    </g>
  );
}

/* ---------- Terminal ---------- */
export function Terminal({ w, h, lines, size = 13 }: { w: number; h: number; lines: (string | [string, string])[]; size?: number }) {
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={12} fill={C.ink} {...O} />
      {[14, 26, 38].map((x) => <circle key={x} cx={x} cy={13} r={3.2} fill="#3E4A3E" />)}
      {lines.map((l, i) => {
        const [pre, rest] = typeof l === 'string' ? ['', l] : l;
        return (
          <text key={i} x={14} y={36 + i * (size + 7)} fontSize={size} fill="#E8F1E8" style={MONO}>
            {pre && <tspan fill={C.green}>{pre}</tspan>}{rest}
          </text>
        );
      })}
    </g>
  );
}

/* ---------- Safe ---------- 96 x 100 */
export function Safe({ dialClass }: { dialClass?: string }) {
  return (
    <g>
      <rect x={14} y={90} width={14} height={10} rx={3} fill={C.cobaltDark} {...O} />
      <rect x={68} y={90} width={14} height={10} rx={3} fill={C.cobaltDark} {...O} />
      <rect x={0} y={0} width={96} height={92} rx={12} fill={C.cobalt} {...O} />
      <path d="M78 2.5 H84 Q93.5 2.5 93.5 12 V80 Q93.5 89.5 84 89.5 H78 Z" fill={C.cobaltDark} />
      <rect x={0} y={0} width={96} height={92} rx={12} fill="none" {...O} />
      <rect x={10} y={10} width={64} height={72} rx={7} fill="none" stroke={C.ink} strokeWidth={2} opacity={0.55} />
      <g className={dialClass} style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}>
        <circle cx={42} cy={46} r={17} fill="#E9EDFF" {...O} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M42 32.5 V35.5" stroke={C.ink} strokeWidth={1.8} strokeLinecap="round" transform={`rotate(${a} 42 46)`} />
        ))}
        <circle cx={42} cy={46} r={6} fill={C.cobalt} {...O} strokeWidth={2} />
        <path d="M42 46 V35" stroke={C.ink} strokeWidth={2.4} strokeLinecap="round" />
      </g>
      <rect x={80} y={34} width={7} height={24} rx={3.5} fill="#E9EDFF" {...O} strokeWidth={2} />
      <path d="M8 60 L30 12 H40 L14 70 Z" fill="#FFFFFF" opacity={0.18} />
    </g>
  );
}

/* A key tag with a label, its ring on the right end (the end that goes in first). w x 34 */
export function KeyTag({ w = 132, text = 'STRIPE_KEY' }: { w?: number; text?: string }) {
  return (
    <g>
      <circle cx={w - 11} cy={17} r={9} fill="none" stroke={C.ink} strokeWidth={2.5} />
      <path d={`M8 5 H${w - 30} L${w - 19} 17 L${w - 30} 29 H8 Q0 29 0 21 V13 Q0 5 8 5 Z`} fill={C.white} {...O} />
      <circle cx={w - 31} cy={17} r={2.6} fill="none" stroke={C.ink} strokeWidth={2} />
      <text x={11} y={21.5} fontSize={12.5} fontWeight={700} fill={C.ink} style={MONO}>{text}</text>
    </g>
  );
}

/* ---------- The log, as a receipt ---------- w x h, zigzag bottom */
export function Receipt({ w, h, lines, size = 12.5, title }: { w: number; h: number; lines: [string, string][]; size?: number; title?: string }) {
  const z = 7;
  let d = `M0 6 Q0 0 6 0 H${w - 6} Q${w} 0 ${w} 6 V${h - z}`;
  const n = Math.round(w / 12);
  const step = w / n;
  for (let k = n; k > 0; k--) d += ` L${(k - 0.5) * step} ${h} L${(k - 1) * step} ${h - z}`;
  d += ' Z';
  const top = title ? 52 : 24;
  return (
    <g>
      <path d={d} fill={C.white} {...O} />
      {title && <text x={12} y={22} fontSize={11.5} fontWeight={700} fill={C.dim} style={FONT} letterSpacing="0.06em">{title}</text>}
      {title && <path d={`M12 32 H${w - 12}`} stroke={C.ink} strokeWidth={1.5} strokeDasharray="3 4" opacity={0.45} />}
      {lines.map(([a, b], i) => (
        <g key={a + i}>
          <text x={12} y={top + i * (size + 9)} fontSize={size} fill={C.ink} style={MONO}>{a}</text>
          <text x={w - 12} y={top + i * (size + 9)} fontSize={size} fill={C.dim} style={MONO} textAnchor="end">{b}</text>
        </g>
      ))}
    </g>
  );
}

/* ---------- Versions ---------- */
export function VersionChip({ x, y, label, good }: { x: number; y: number; label: string; good: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={70} height={32} rx={16} fill={good ? C.green : C.tomato} {...O} />
      <text x={14} y={21} fontSize={14} fontWeight={700} fill={C.ink} style={FONT}>{label}</text>
      {good
        ? <path d="M47 16.5 l4 4 l8 -9" fill="none" stroke={C.ink} strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M48 11 l9 10 M57 11 l-9 10" fill="none" stroke={C.ink} strokeWidth={2.8} strokeLinecap="round" />}
    </g>
  );
}

/* v4 (bad) on the right, an arrow curving back to v3 (good) on the left. 196 x 64 */
export function Versions() {
  return (
    <g>
      <VersionChip x={0} y={28} label="v3" good />
      <VersionChip x={126} y={28} label="v4" good={false} />
      <path d="M160 24 C150 2 106 -2 60 8 C48 11 42 16 38 22" fill="none" stroke={C.ink} strokeWidth={2.8} strokeLinecap="round" />
      <path d="M31 14 L37 23.5 L47.5 20" fill="none" stroke={C.ink} strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/* ---------- Label-maker tape ---------- w x 30 */
export function Tape({ w, text, size = 14, lines }: { w: number; text?: string; size?: number; lines?: string[] }) {
  const ls = lines ?? [text ?? ''];
  const h = 12 + ls.length * (size + 4);
  return (
    <g>
      <path d={`M0 3 Q0 0 3 0 H${w - 3} Q${w} 0 ${w} 3 V${h - 3} Q${w} ${h} ${w - 3} ${h} H3 Q0 ${h} 0 ${h - 3} Z`} fill={C.ink} />
      {ls.map((l, i) => (
        <text key={l} x={w / 2} y={6 + (i + 1) * (size + 4) - 3.5} fontSize={size} fontWeight={600} fill="#FFFFFF" textAnchor="middle" style={FONT}>{l}</text>
      ))}
    </g>
  );
}
export function tapeH(lines: number, size = 14) {
  return 12 + lines * (size + 4);
}

/* ---------- Mouse pointer ---------- 22 x 30 */
export function Pointer() {
  return (
    <path d="M2 2 L2 25 L8 19.5 L12.5 28.5 L17 26.5 L12.5 17.5 L20 17 Z" fill={C.ink} stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
  );
}

/* ---------- Small things ---------- */
export function Check({ x, y, s = 1, color = C.ink }: { x: number; y: number; s?: number; color?: string }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M1 6 l4 4 l8 -9" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />;
}

export function Chip({ x, y, w, text, fill = C.green, color = C.ink, h = 22, size = 12 }: { x: number; y: number; w: number; text: string; fill?: string; color?: string; h?: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={w} height={h} rx={h / 2} fill={fill} stroke={C.ink} strokeWidth={1.8} />
      <text x={w / 2} y={h / 2 + size * 0.36} fontSize={size} fontWeight={650} fill={color} textAnchor="middle" style={FONT}>{text}</text>
    </g>
  );
}

/* Two little people: for 'named people' access. 26 x 20 */
export function PeopleIcon({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={C.ink} strokeWidth={2} strokeLinejoin="round">
      <circle cx={17} cy={6} r={4.5} fill={C.lilac} />
      <path d="M9 20 C9 13 12.5 11 17 11 C21.5 11 25 13 25 20 Z" fill={C.lilac} />
      <circle cx={9} cy={7} r={4.5} fill={C.sun} />
      <path d="M1 20 C1 14 4.5 12 9 12 C13.5 12 17 14 17 20 Z" fill={C.sun} />
    </g>
  );
}

/* A git branch, for the pull request card. 18 x 24 */
export function BranchIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={C.ink} strokeWidth={2.3} strokeLinecap="round">
      <circle cx={4} cy={4} r={3} />
      <circle cx={4} cy={20} r={3} />
      <circle cx={15} cy={7} r={3} />
      <path d="M4 7 V17 M15 10 C15 15 10 15 4 17" />
    </g>
  );
}

/* A globe: 'anyone on the internet'. 40 x 40 */
export function Globe() {
  return (
    <g>
      <circle cx={20} cy={20} r={18} fill={C.sky} {...O} />
      <path d="M11 9 C15 12 13 16 17 18 C21 20 19 25 15 26 C11 27 9 23 5 23 M27 6 C24 10 28 13 31 12 C34 11 36 16 33 19 C30 22 32 27 29 32" fill="none" stroke={C.ink} strokeWidth={2} strokeLinecap="round" />
      <path d="M8 13 C11 10 14 11 16 14 C17 17 13 19 12 22 C11 25 7 25 5 22 Z" fill={C.green} opacity={0.9} />
      <path d="M26 8 C29 7 33 10 34 14 C35 18 32 20 30 23 C28 26 26 24 26 20 C26 16 24 11 26 8 Z" fill={C.green} opacity={0.9} />
      <circle cx={20} cy={20} r={18} fill="none" {...O} />
      <path d="M9 12 C11 9 14 7 17 6.5" fill="none" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" opacity={0.5} />
    </g>
  );
}

/* A round clock. 58 x 58 */
export function Clock({ handClass }: { handClass?: string }) {
  return (
    <g>
      <circle cx={29} cy={29} r={27} fill={C.white} {...O} />
      <circle cx={29} cy={29} r={21} fill="none" stroke={C.ink} strokeWidth={1.4} opacity={0.3} />
      {[0, 90, 180, 270].map((a) => <path key={a} d="M29 6 V10" stroke={C.ink} strokeWidth={2.4} strokeLinecap="round" transform={`rotate(${a} 29 29)`} />)}
      <path d="M29 29 L20 22" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <g className={handClass}>
        <path d="M29 29 V12" stroke={C.tomato} strokeWidth={2.6} strokeLinecap="round" />
      </g>
      <circle cx={29} cy={29} r={3} fill={C.ink} />
    </g>
  );
}
