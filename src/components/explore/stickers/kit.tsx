// The sticker book's building blocks. Every picture on the page is a pile of
// die-cut stickers: a flat drawing of one real thing, cut out with a thick
// white border that follows its outline, lifted off the page by a soft shadow.
//
// A Scene is one coloured page. A Sticker is one piece of vinyl on it, placed
// in the page's own units (1 unit = 1 CSS px at desktop size), with its own
// placement for phones. The white border is the drawing itself, redrawn
// underneath in white with a 14px round-jointed stroke (see .sb-cut), so it
// follows every bump of the silhouette at a fixed 7px, as a cutter would.

import type { CSSProperties, ReactNode } from 'react';

export const C = {
  bg: '#F6F4EF',
  ink: '#1F2A1F',
  dim: '#5A6057',
  white: '#FFFFFF',
  back: '#E4E0D6',
  cobalt: '#3D63FF',
  cobaltDark: '#2A4BD8',
  tomato: '#FF6A48',
  tomatoDark: '#E24E2E',
  sun: '#FFCC3D',
  sunDark: '#EDB020',
  green: '#22A861',
  greenDark: '#188A4D',
  sky: '#5EC0FF',
  skyDark: '#3AA5EA',
  lilac: '#9A87FF',
  lilacDark: '#7E69F0',
  gum: '#FF8DC0',
  gumDark: '#F06CA8',
  laptop: '#2F343E',
  laptopDark: '#1F232A',
  grey: '#CDD1D6',
  greyDark: '#9DA3AB',
  line: '#E9E6DF',
  paperDim: '#8A8F87',
};

export const INK_W = 2.5;

// x, y of the drawing's top-left corner in page units, then scale and tilt.
export type Place = [x: number, y: number, s?: number, r?: number];

export type Peel = {
  // Size of the folded corner, in the sticker's own units.
  a: number;
  // 'still' stays peeled, 'loop' lifts and settles on a timer, 'hover' lifts under the pointer.
  mode: 'still' | 'loop' | 'hover';
  // Corner radius of the drawing's outline, so the flap's tip is rounded to match.
  radius?: number;
};

const r2 = (n: number) => Math.round(n * 100) / 100;

/* The fold, for a sticker whose outline is a (rounded) rectangle w x h cut
   with a 7 unit border. The bottom-right corner comes up along a 45 degree
   line. Returns the clip for the sticker (flat and peeled) and the flap. */
function peelGeometry(w: number, h: number, pad: number, peel: Peel) {
  const bw = w + pad * 2;
  const bh = h + pad * 2;
  const cx = w + 7;
  const cy = h + 7;
  const line = (a: number) => {
    const yRight = cx + cy - a - (w + pad);
    const xBottom = cx + cy - a - (h + pad);
    const py = r2(((yRight + pad) / bh) * 100);
    const px = r2(((xBottom + pad) / bw) * 100);
    return `polygon(0% 0%, 100% 0%, 100% ${py}%, ${px}% 100%, 0% 100%)`;
  };
  const a = peel.a;
  const k = Math.min(a * 0.45, ((peel.radius ?? 8) + 7) * 0.5);
  // The flap: the corner folded back over the sticker, its tip rounded like the cut.
  const flap = `M${r2(cx - a)} ${r2(cy)} L${r2(cx)} ${r2(cy - a)} L${r2(cx - a + k)} ${r2(cy - a)} Q${r2(cx - a)} ${r2(cy - a)} ${r2(cx - a)} ${r2(cy - a + k)} Z`;
  return { flat: line(0), peeled: line(a), flap };
}

export function Sticker({
  w, h, pad = 10, d, m, i, z, cut, children, className = '', inner = '', peel, hover = true, style,
}: {
  w: number; h: number; pad?: number;
  // Placement on the page for wide screens and for phones. Leave m out to
  // reuse d; pass false to leave the sticker off that layout.
  d?: Place | false; m?: Place | false;
  // Order it slaps on in, and stacking.
  i?: number; z?: number;
  // The outline to cut around, when the drawing has details that stick out
  // past where the cutter should go. Defaults to the drawing itself.
  cut?: ReactNode;
  children: ReactNode;
  className?: string;
  // Class for the tilted layer, for loops that move the whole sticker.
  inner?: string;
  peel?: Peel;
  hover?: boolean;
  style?: CSSProperties;
}) {
  const vars: Record<string, string | number> = { '--bw': w + pad * 2, '--pad': pad };
  const mm = m === undefined ? d : m;
  if (d) Object.assign(vars, { '--x': d[0], '--y': d[1], '--s': d[2] ?? 1, '--r': d[3] ?? 0 });
  if (mm) Object.assign(vars, { '--mx': mm[0], '--my': mm[1], '--ms': mm[2] ?? 1, '--mr': mm[3] ?? 0 });
  if (d === undefined && mm === undefined) vars['--r'] = 0;
  if (i !== undefined) vars['--i'] = i;
  if (z !== undefined) vars['--z'] = z;
  const placed = d !== undefined || m !== undefined;
  const geo = peel ? peelGeometry(w, h, pad, peel) : null;
  if (geo) Object.assign(vars, { '--p0': geo.flat, '--p1': geo.peeled });
  const cls = [
    'sb-stk',
    placed && 'sb-abs',
    d === false && 'no-d',
    mm === false && 'no-m',
    hover && 'hv',
    peel && `peel-${peel.mode}`,
    className,
  ].filter(Boolean).join(' ');
  const vb = `${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}`;
  return (
    <div className={cls} style={{ ...vars, ...style } as CSSProperties} aria-hidden="true">
      <div className="sb-a">
        <div className={`sb-rot ${inner}`}>
          <svg viewBox={vb} className="sb-art" focusable="false">
            <g className="sb-cut">{cut ?? children}</g>
            {children}
          </svg>
          {geo && (
            <svg viewBox={vb} className="sb-flap" focusable="false">
              <path d={geo.flap} fill={C.back} stroke={C.back} strokeWidth={1} strokeLinejoin="round" />
              <path d={geo.flap} fill="url(#sb-fold)" opacity={0.5} />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

/* One coloured page of the book. W x H are the page's units on wide screens,
   MW x MH on phones. The whole page is one picture for screen readers. */
export function Scene({
  W, H, MW, MH, tone, label, className = '', children, style,
}: {
  W: number; H: number; MW?: number; MH?: number; tone: string; label: string;
  className?: string; children: ReactNode; style?: CSSProperties;
}) {
  const vars = { '--W': W, '--H': H, '--MW': MW ?? W, '--MH': MH ?? H, '--page': tone } as CSSProperties;
  return (
    <div className={`sb-scene ${className}`} style={{ ...vars, ...style }} role="img" aria-label={label} data-slap="">
      {children}
    </div>
  );
}

/* Shapes drawn as one outlined silhouette: every child is stroked in ink
   first, then filled on top, so overlapping parts (curls, a cap and its
   brim) read as one piece with one outline. */
export function Blob({ fill, children, w = INK_W }: { fill: string; children: ReactNode; w?: number }) {
  return (
    <>
      <g fill={C.ink} stroke={C.ink} strokeWidth={w * 2} strokeLinejoin="round">{children}</g>
      <g fill={fill}>{children}</g>
    </>
  );
}

/* Shared gradient for the fold shadow on peeled corners. Rendered once per page. */
export function StickerDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="sb-fold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#1F2A1F" stopOpacity="0.25" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Label-maker tape: ink strip, white lettering. Used for captions inside the art. */
export function tapeWidth(text: string, size = 14) {
  // Inter 600, roughly: narrow letters count less.
  let u = 0;
  for (const ch of text) {
    if ('iljt.,\'’ :;|!'.includes(ch)) u += 0.3;
    else if ('frI-'.includes(ch)) u += 0.38;
    else if ('mwMW'.includes(ch)) u += 0.86;
    else if (ch === ch.toUpperCase() && /[A-Z]/.test(ch)) u += 0.68;
    else u += 0.57;
  }
  return Math.ceil(u * size);
}
