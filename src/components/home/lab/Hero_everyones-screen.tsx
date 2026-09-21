// Hero concept: Everyone's screen. A place rather than a screen: one desk,
// three laptops facing us, and the three people using them seen from behind.
// Every laptop has the same little app open, each one signed in as the person
// sitting at it, with that person's own amount typed in. The one link they all
// opened is a die-cut sticker above the desk, and it is the only place the
// link is written.
//
// Flat and side-on: no perspective, no chairs, no mugs. The people sit below
// the desk line so no screen is covered.

import { K, PEOPLE, Avatar, DieCut, MiniLock, Check, Tile, textW, type Who } from '../kit';

const LINK = 'acme--spend-requests.wirl.run';
const P = 'hx-everyones-screen';

const WOOD_TOP = '#E3B77F';
const WOOD_FRONT = '#C99A66';
const METAL_EDGE = '#B7AB94';
const DESK_Y = 320;

/* ---------- The app, on one person's screen ---------- */
type Size = {
  strip: number; av: number; pad: number; title: number; titleY: number;
  fieldY: number; fieldH: number; amt: number; rowY: number; btnW: number; btnH: number; barH: number;
};
const SMALL: Size = { strip: 22, av: 9, pad: 10, title: 15, titleY: 40, fieldY: 47, fieldH: 22, amt: 14, rowY: 75, btnW: 52, btnH: 20, barH: 9 };
const BIG: Size = { strip: 24, av: 10.5, pad: 12, title: 17, titleY: 48, fieldY: 57, fieldH: 26, amt: 15, rowY: 92, btnW: 60, btnH: 22, barH: 10 };

function AppScreen({ x, y, w, h, who, amount, z, i }: {
  x: number; y: number; w: number; h: number; who: Who; amount: string; z: Size; i: number;
}) {
  const r = 5;
  const bx = x + w - z.pad - z.btnW;
  const by = y + z.rowY;
  const delay = { animationDelay: `${i * 0.35}s` };
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={K.paper} />
      <path
        d={`M${x} ${y + z.strip} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + z.strip} Z`}
        fill={K.green}
      />
      <path d={`M${x} ${y + z.strip} H${x + w}`} stroke={K.ink} strokeWidth={2} />
      {/* Signed in as whoever is sitting at it: their name and face, top right. */}
      <text x={x + w - z.av * 2 - 11} y={y + z.strip / 2 + 13.5 * 0.36} fontSize={13.5} fontWeight={800} fill={K.paper} textAnchor="end">{PEOPLE[who].name.split(' ')[0]}</text>
      <Avatar who={who} x={x + w - z.av - 5} y={y + z.strip / 2} r={z.av} />
      <text x={x + z.pad} y={y + z.titleY} fontSize={z.title} fontWeight={800} fill={K.ink}>Spend request</text>
      {/* The amount: the one thing that differs from screen to screen. */}
      <rect x={x + z.pad} y={y + z.fieldY} width={w - z.pad * 2} height={z.fieldH} rx={7} fill={K.wash} stroke={K.ink} strokeWidth={2} />
      <text x={x + z.pad + 10} y={y + z.fieldY + z.fieldH / 2 + z.amt * 0.36} fontSize={z.amt} fontWeight={700} fill={K.ink}>{amount}</text>
      <rect x={x + z.pad} y={by + (z.btnH - z.barH) / 2 + 1} width={w - z.pad * 3 - z.btnW - 6} height={z.barH} rx={z.barH / 2} fill={K.wash} stroke={K.ink} strokeWidth={1.6} />
      {/* Send: a small toy key whose face presses down onto its edge. */}
      <rect x={bx} y={by + 3} width={z.btnW} height={z.btnH} rx={z.btnH / 2} fill={K.greenEdge} stroke={K.ink} strokeWidth={2} />
      <g className={`${P}-key`} style={delay}>
        <rect x={bx} y={by} width={z.btnW} height={z.btnH} rx={z.btnH / 2} fill={K.green} stroke={K.ink} strokeWidth={2} />
        <text className={`${P}-label`} style={delay} x={bx + z.btnW / 2} y={by + z.btnH / 2 + 14 * 0.36} fontSize={14} fontWeight={800} fill={K.paper} textAnchor="middle">Send</text>
        <g className={`${P}-tick`} style={delay} opacity={0}>
          <Check x={bx + z.btnW / 2} y={by + z.btnH / 2} s={0.95} w={2.8} />
        </g>
      </g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke={K.ink} strokeWidth={2} />
    </g>
  );
}

/* ---------- A laptop, lid open, straight on ---------- */
function Laptop({ lid, inset, base, who, amount, z, i }: {
  lid: { x: number; y: number; w: number; h: number };
  inset: { side: number; top: number; bottom: number };
  base: { x: number; w: number; h: number };
  who: Who; amount: string; z: Size; i: number;
}) {
  const lidBottom = lid.y + lid.h;
  const cx = lid.x + lid.w / 2;
  return (
    <g>
      <rect x={lid.x} y={lid.y} width={lid.w} height={lid.h} rx={13} fill={K.ink} stroke={K.ink} strokeWidth={3} />
      <circle cx={cx} cy={lid.y + inset.top / 2 + 0.5} r={1.7} fill="#4A5A51" />
      <AppScreen
        x={lid.x + inset.side} y={lid.y + inset.top}
        w={lid.w - inset.side * 2} h={lid.h - inset.top - inset.bottom}
        who={who} amount={amount} z={z} i={i}
      />
      <Tile x={base.x} y={lidBottom} w={base.w} h={base.h} r={base.h / 2} fill={K.metal} edge={METAL_EDGE} d={4} sw={2.5} />
      <path d={`M${cx - 18} ${lidBottom + 1.5} Q${cx - 18} ${lidBottom + 5} ${cx - 14} ${lidBottom + 5} H${cx + 14} Q${cx + 18} ${lidBottom + 5} ${cx + 18} ${lidBottom + 1.5}`} fill="none" stroke={K.ink} strokeWidth={1.8} />
    </g>
  );
}

/* ---------- The people, from behind ---------- */
const HEAD_Y = 357;
const HEAD_R = 30;
const SHOULDER_Y = 384;

function Shoulders({ cx, fill }: { cx: number; fill: string }) {
  const y = SHOULDER_Y;
  return (
    <g>
      <path
        d={`M${cx - 62} ${y + 60} V${y + 24} C${cx - 62} ${y + 8} ${cx - 48} ${y} ${cx - 28} ${y} H${cx + 28} C${cx + 48} ${y} ${cx + 62} ${y + 8} ${cx + 62} ${y + 24} V${y + 60} Z`}
        fill={fill} stroke={K.ink} strokeWidth={3}
      />
      <path d={`M${cx - 16} ${y + 0.5} Q${cx} ${y + 7} ${cx + 16} ${y + 0.5}`} fill="none" stroke={K.ink} strokeWidth={2} />
    </g>
  );
}

function Ears({ cx, skin, y = HEAD_Y + 5 }: { cx: number; skin: string; y?: number }) {
  return (
    <g fill={skin} stroke={K.ink} strokeWidth={2.5}>
      <ellipse cx={cx - HEAD_R + 1} cy={y} rx={6} ry={9} />
      <ellipse cx={cx + HEAD_R - 1} cy={y} rx={6} ry={9} />
    </g>
  );
}

/* Priya: a black bob cut straight across, and a pink top. */
function Priya({ cx }: { cx: number }) {
  const p = PEOPLE.priya;
  const y = HEAD_Y;
  return (
    <g>
      <rect x={cx - 11} y={y + 12} width={22} height={SHOULDER_Y - y - 8} fill={p.skin} stroke={K.ink} strokeWidth={2.5} />
      <Shoulders cx={cx} fill={p.top} />
      {/* Head tipped a little, as if reading the screen. */}
      <g transform={`rotate(-5 ${cx} ${y + 24})`}>
        <path
          d={`M${cx - 31} ${y + 24} Q${cx - 36} ${y + 22} ${cx - 35} ${y + 15} C${cx - 37} ${y - 8} ${cx - 31} ${y - 33} ${cx} ${y - 33} C${cx + 31} ${y - 33} ${cx + 37} ${y - 8} ${cx + 35} ${y + 15} Q${cx + 36} ${y + 22} ${cx + 31} ${y + 24} Q${cx} ${y + 28} ${cx - 31} ${y + 24} Z`}
          fill={p.hair} stroke={K.ink} strokeWidth={3}
        />
        <path d={`M${cx - 15} ${y - 24} Q${cx - 25} ${y - 16} ${cx - 26} ${y - 2}`} fill="none" stroke="#5A4E55" strokeWidth={3} />
      </g>
    </g>
  );
}

/* Tom: tight dark curls and a blue top. */
function Tom({ cx }: { cx: number }) {
  const p = PEOPLE.tom;
  const y = HEAD_Y;
  const R = 26;
  const bumps = Array.from({ length: 12 }, (_, k) => {
    const a = ((158 + k * 20) * Math.PI) / 180;
    return [cx + Math.cos(a) * R, y + Math.sin(a) * R] as const;
  });
  const hair = `M${cx - 24} ${y + 13} A${R} ${R} 0 1 1 ${cx + 24} ${y + 13} Q${cx} ${y + 30} ${cx - 24} ${y + 13} Z`;
  return (
    <g>
      <rect x={cx - 11} y={y + 12} width={22} height={SHOULDER_Y - y - 8} fill={p.skin} stroke={K.ink} strokeWidth={2.5} />
      <Shoulders cx={cx} fill={p.top} />
      <Ears cx={cx} skin={p.skin} />
      <circle cx={cx} cy={y} r={HEAD_R - 2} fill={p.skin} stroke={K.ink} strokeWidth={3} />
      <g fill={p.hair} stroke={K.ink} strokeWidth={2.5}>
        {bumps.map(([bx, by]) => <circle key={bx} cx={bx} cy={by} r={7} />)}
      </g>
      <path d={hair} fill={p.hair} />
    </g>
  );
}

/* Sam: the green cap from the back — the snap strap across the arch, hair
   showing through it — and a coral top. */
function Sam({ cx }: { cx: number }) {
  const p = PEOPLE.sam;
  const y = HEAD_Y;
  const R = HEAD_R - 2;
  return (
    <g>
      <rect x={cx - 11} y={y + 12} width={22} height={SHOULDER_Y - y - 8} fill={p.skin} stroke={K.ink} strokeWidth={2.5} />
      <Shoulders cx={cx} fill={p.top} />
      <g transform={`rotate(4 ${cx} ${y + 24})`}>
        <Ears cx={cx} skin={p.skin} y={y + 8} />
        <circle cx={cx} cy={y} r={R} fill={p.skin} stroke={K.ink} strokeWidth={3} />
        <path d={`M${cx - 25} ${y + 13} A${R} ${R} 0 1 1 ${cx + 25} ${y + 13} Q${cx} ${y + 30} ${cx - 25} ${y + 13} Z`} fill={p.hair} stroke={K.ink} strokeWidth={2.5} />
        {/* The cap. */}
        <path
          d={`M${cx - 32} ${y + 2} C${cx - 33} ${y - 22} ${cx - 19} ${y - 33} ${cx} ${y - 33} C${cx + 19} ${y - 33} ${cx + 33} ${y - 22} ${cx + 32} ${y + 2} Q${cx} ${y + 7} ${cx - 32} ${y + 2} Z`}
          fill={K.green} stroke={K.ink} strokeWidth={3}
        />
        <g fill="none" stroke={K.greenEdge} strokeWidth={2}>
          <path d={`M${cx} ${y - 30} V${y - 14}`} />
          <path d={`M${cx - 2} ${y - 30} C${cx - 14} ${y - 26} ${cx - 21} ${y - 16} ${cx - 23} ${y - 2}`} />
          <path d={`M${cx + 2} ${y - 30} C${cx + 14} ${y - 26} ${cx + 21} ${y - 16} ${cx + 23} ${y - 2}`} />
        </g>
        {/* The arch at the back, with hair showing through, and the strap. */}
        <path d={`M${cx - 11} ${y + 5.5} V${y - 3} A11 11 0 0 1 ${cx + 11} ${y - 3} V${y + 5.5} Z`} fill={p.hair} stroke={K.ink} strokeWidth={2.5} />
        <rect x={cx - 16} y={y - 1} width={32} height={7} rx={3.5} fill={K.greenEdge} stroke={K.ink} strokeWidth={2} />
        <g fill={K.paper}>
          <circle cx={cx - 8} cy={y + 2.5} r={1.3} />
          <circle cx={cx} cy={y + 2.5} r={1.3} />
          <circle cx={cx + 8} cy={y + 2.5} r={1.3} />
        </g>
        <circle cx={cx} cy={y - 32} r={3.6} fill={K.greenEdge} stroke={K.ink} strokeWidth={2} />
      </g>
    </g>
  );
}

/* ---------- The link, stuck up above the desk ---------- */
function LinkSticker() {
  const x = 100;
  const y = 56;
  const w = 400;
  const h = 54;
  const cy = y + h / 2;
  const lockW = 12 * 1.3;
  const gap = 11;
  const tw = textW(LINK, 18, true);
  const x0 = x + (w - (lockW + gap + tw)) / 2;
  return (
    <DieCut big tilt={-2} cx={x + w / 2} cy={cy} border={9} cut={<rect x={x} y={y} width={w} height={h} rx={27} />}>
      {/* Invisible: stretches the filter region so the sticker's soft shadow
          is not sliced off in a straight line across the sun. */}
      <rect x={x} y={y - 14} width={w} height={h + 54} fill="none" stroke="none" />
      <rect x={x} y={y} width={w} height={h} rx={27} fill={K.paper} stroke={K.ink} strokeWidth={3} />
      <MiniLock x={x0 + lockW / 2} y={cy - 1.8} s={1.3} />
      <text className="mono" x={x0 + lockW + gap} y={cy + 18 * 0.36} fontSize={18} fill={K.ink}>{LINK}</text>
    </DieCut>
  );
}

const STYLE = `
@media (prefers-reduced-motion: no-preference) {
  .${P}-key { animation: ${P}-press 7s ease infinite; }
  .${P}-label { animation: ${P}-label 7s linear infinite; }
  .${P}-tick { animation: ${P}-tick 7s linear infinite; }
}
@keyframes ${P}-press { 0%, 17% { transform: translateY(0); } 18.6%, 20% { transform: translateY(3px); } 22.5%, 100% { transform: translateY(0); } }
@keyframes ${P}-label { 0%, 18.2% { opacity: 1; } 18.6%, 32.6% { opacity: 0; } 33.2%, 100% { opacity: 1; } }
@keyframes ${P}-tick { 0%, 18.2% { opacity: 0; } 18.6%, 32.6% { opacity: 1; } 33.2%, 100% { opacity: 0; } }
`;

const LABEL =
  'A desk with three laptops side by side, all open on the same Spend request app at acme--spend-requests.wirl.run, the link on a sticker above them. Each screen is signed in as the person sitting at it, with their face in the corner and their own amount typed in: $38 for Priya, $120 for Tom, $9 for Sam. The three of them sit in front, seen from behind, and press Send one after another.';

export default function HeroEveryonesScreen() {
  return (
    <svg viewBox="0 0 600 412" className="tb-art tb-hero-art" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <style>{STYLE}</style>
      <defs>
        <clipPath id={`${P}-crop`}>
          <rect x={-10} y={-40} width={620} height={452} />
        </clipPath>
      </defs>
      <circle cx={300} cy={170} r={180} fill={K.sun} />
      <LinkSticker />
      <g clipPath={`url(#${P}-crop)`}>
        <rect x={-10} y={DESK_Y + 16} width={620} height={120} fill={WOOD_FRONT} stroke={K.ink} strokeWidth={3} />
        <rect x={-10} y={DESK_Y} width={620} height={16} rx={4} fill={WOOD_TOP} stroke={K.ink} strokeWidth={3} />
      </g>
      <Laptop
        lid={{ x: 20, y: 188, w: 164, h: 120 }} inset={{ side: 7, top: 7, bottom: 9 }} base={{ x: 14, w: 176, h: 8 }}
        who="priya" amount="$38" z={SMALL} i={0}
      />
      <Laptop
        lid={{ x: 198, y: 164, w: 204, h: 142 }} inset={{ side: 8, top: 8, bottom: 10 }} base={{ x: 194, w: 212, h: 10 }}
        who="tom" amount="$120" z={BIG} i={1}
      />
      <Laptop
        lid={{ x: 416, y: 188, w: 164, h: 120 }} inset={{ side: 7, top: 7, bottom: 9 }} base={{ x: 410, w: 176, h: 8 }}
        who="sam" amount="$9" z={SMALL} i={2}
      />
      <g clipPath={`url(#${P}-crop)`}>
        <Priya cx={102} />
        <Tom cx={300} />
        <Sam cx={498} />
      </g>
    </svg>
  );
}
