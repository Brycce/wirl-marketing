// Hero concept: bigger and fewer.
//
// Two objects, big, overlapping into one moment. Behind, on the left, Priya's
// laptop: she asks her agent for a payments tool and to deploy it, and the
// agent answers with the link. In front, on the right, Tom's phone, laid over
// the laptop's lower-right corner: the same app, already open, a green strip
// across the top with his face, Signed in with Google, tom@acme.co, and his finger
// on Approve. No floating pill and no arrows: the overlap and the matching
// link carry the relationship.
//
// No terminal (the connect block beside this picture is already one) and no
// stickers bar the small Claude mark on the agent's bubble.

import { K, MiniLock, Avatar, Btn, Hand } from '../kit';
import { LogoStickerArt } from '../marks';

const LINK = 'acme--supplier-payments.wirl.run';
const MUTED = '#5E5A4C';
const P = 'hx-lp-overlap-';
const BASE_EDGE = '#CDBFA3';

const CSS = `
@media (prefers-reduced-motion: no-preference) {
  .${P}press { animation: ${P}press 5s ease infinite; }
  @keyframes ${P}press {
    0%, 20% { transform: translateY(0); }
    23%, 30% { transform: translateY(4px); }
    34%, 100% { transform: translateY(0); }
  }
}
`;

type Box = { x: number; y: number; w: number; h: number };

/* A chat bubble with a pointed tail off one bottom corner. */
function bubble({ x, y, w, h }: Box, r: number, side: 'left' | 'right') {
  if (side === 'right') {
    return `M${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h} L${x + w + 7} ${y + h + 9} L${x + w - 18} ${y + h} H${x + r} A${r} ${r} 0 0 1 ${x} ${y + h - r} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`;
  }
  return `M${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h - r} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} H${x + 18} L${x - 7} ${y + h + 9} L${x} ${y + h} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`;
}

/* The small Claude mark on the agent's bubble, with its own small shadow
   (the kit's sticker shadow is sized for big stickers). */
function Mark({ x, y, size }: { x: number; y: number; size: number }) {
  const uid = `${P}mark`;
  return (
    <g transform={`translate(${x} ${y})`} color={K.ink}>
      <defs>
        <filter id={`${uid}-f`} x="-60%" y="-60%" width="220%" height="240%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="0.8" stdDeviation="0.6" floodColor={K.ink} floodOpacity="0.26" />
          <feDropShadow dx="0" dy="2.4" stdDeviation="2" floodColor={K.ink} floodOpacity="0.2" />
        </filter>
      </defs>
      <g filter={`url(#${uid}-f)`}>
        <g transform={`rotate(-6) scale(${size / 24}) translate(-12 -12)`}>
          <LogoStickerArt agent="claude" uid={uid} peel={null} />
        </g>
      </g>
    </g>
  );
}

/* ---------- Her laptop, front-on, behind ---------- */
const LID: Box = { x: 4, y: 20, w: 404, h: 254 };
const BEZEL = 12;
const BASE: Box = { x: -10, y: 274, w: 432, h: 20 };
const ASK: Box = { x: 26, y: 66, w: 324, h: 46 };
const REPLY: Box = { x: 24, y: 136, w: 330, h: 96 };
const PILL: Box = { x: REPLY.x + 12, y: REPLY.y + 47, w: REPLY.w - 24, h: 36 };

function Laptop() {
  const scr = { x: LID.x + BEZEL, y: LID.y + BEZEL, w: LID.w - BEZEL * 2, h: LID.h - BEZEL * 2 };
  const notch = 64;
  const nx = BASE.x + BASE.w / 2;
  return (
    <g>
      {/* Base */}
      <rect x={BASE.x} y={BASE.y + 6} width={BASE.w} height={BASE.h} rx={8} fill={BASE_EDGE} stroke={K.ink} strokeWidth={3} />
      <rect x={BASE.x} y={BASE.y} width={BASE.w} height={BASE.h} rx={8} fill={K.edge} stroke={K.ink} strokeWidth={3} />
      <path
        d={`M${nx - notch / 2} ${BASE.y} V${BASE.y + 2} Q${nx - notch / 2} ${BASE.y + 6} ${nx - notch / 2 + 4} ${BASE.y + 6} H${nx + notch / 2 - 4} Q${nx + notch / 2} ${BASE.y + 6} ${nx + notch / 2} ${BASE.y + 2} V${BASE.y}`}
        fill={BASE_EDGE} stroke={K.ink} strokeWidth={2}
      />
      {/* Lid: the ink is the bezel */}
      <rect x={LID.x} y={LID.y} width={LID.w} height={LID.h} rx={16} fill={K.ink} stroke={K.ink} strokeWidth={3} />
      <circle cx={LID.x + LID.w / 2} cy={LID.y + BEZEL / 2} r={2.2} fill="#3B4A42" />
      <rect x={scr.x} y={scr.y} width={scr.w} height={scr.h} rx={8} fill={K.paper} />
      {/* Her ask */}
      <path d={bubble(ASK, 14, 'right')} fill={K.pinkWash} stroke={K.ink} strokeWidth={2} />
      <text x={ASK.x + 15} y={ASK.y + ASK.h / 2 + 17 * 0.36} fontSize={17} fontWeight={800} fill={K.ink}>Make a payments tool and deploy it.</text>
      {/* The agent's answer: the link */}
      <path d={bubble(REPLY, 14, 'left')} fill={K.wash} stroke={K.ink} strokeWidth={2} />
      <text x={REPLY.x + 22} y={REPLY.y + 31} fontSize={17} fontWeight={800} fill={K.ink}>Done. It’s live:</text>
      <rect x={PILL.x} y={PILL.y} width={PILL.w} height={PILL.h} rx={PILL.h / 2} fill={K.paper} stroke={K.ink} strokeWidth={2} />
      <MiniLock x={PILL.x + 18} y={PILL.y + PILL.h / 2 - 1.4} s={1} />
      <text className="mono" x={PILL.x + 32} y={PILL.y + PILL.h / 2 + 13.5 * 0.36} fontSize={13.5} fill={K.ink}>{LINK}</text>
      <Mark x={REPLY.x + 4} y={REPLY.y + 3} size={22} />
      {/* Whose laptop */}
      <Avatar who="priya" x={LID.x + 22} y={LID.y + 4} r={21} />
    </g>
  );
}

/* ---------- His phone, tilted, in front ---------- */
const PHONE: Box = { x: 364, y: 72, w: 220, h: 322 };
const INSET = 11;
const ROT = 4;

function Phone() {
  const body = PHONE;
  const scr = { x: body.x + INSET, y: body.y + INSET, w: body.w - INSET * 2, h: body.h - INSET * 2 };
  const cx = body.x + body.w / 2;
  const cy = body.y + body.h / 2;
  const sr = 28 - INSET;
  const stripH = 52;
  const px = scr.x + 12;
  const pw = scr.w - 24;
  const titleY = scr.y + stripH + 34;
  const row = { x: px, y: scr.y + stripH + 50, w: pw, h: 64 };
  const btn = { x: px, y: row.y + row.h + 16, w: pw, h: 50 };
  const badge = 11;
  return (
    <g transform={`rotate(${ROT} ${cx} ${cy})`}>
      {/* Body, with its side showing on the right */}
      <rect x={body.x + 4} y={body.y} width={body.w} height={body.h} rx={28} fill={K.metal} stroke={K.ink} strokeWidth={3} />
      <rect x={body.x} y={body.y} width={body.w} height={body.h} rx={28} fill={K.ink} stroke={K.ink} strokeWidth={3} />
      <rect x={scr.x} y={scr.y} width={scr.w} height={scr.h} rx={sr} fill={K.paper} />
      {/* The company sign-in, as a slim strip across the top */}
      <path d={`M${scr.x} ${scr.y + stripH} V${scr.y + sr} A${sr} ${sr} 0 0 1 ${scr.x + sr} ${scr.y} H${scr.x + scr.w - sr} A${sr} ${sr} 0 0 1 ${scr.x + scr.w} ${scr.y + sr} V${scr.y + stripH} Z`} fill={K.green} />
      <path d={`M${scr.x} ${scr.y + stripH} H${scr.x + scr.w}`} stroke={K.ink} strokeWidth={2} />
      <Avatar who="tom" x={scr.x + 25} y={scr.y + stripH / 2 + 1} r={15} />
      <text x={scr.x + 47} y={scr.y + 23} fontSize={13.5} fontWeight={800} fill={K.paper}>Signed in with Google</text>
      <text x={scr.x + 47} y={scr.y + 41} fontSize={13.5} fontWeight={700} fill={K.greenWash}>tom@acme.co</text>
      {/* The app */}
      <text x={px} y={titleY} fontSize={18} fontWeight={800} fill={K.ink}>Supplier payments</text>
      <rect x={row.x} y={row.y} width={row.w} height={row.h} rx={12} fill={K.wash} />
      <text x={row.x + 13} y={row.y + 27} fontSize={16} fontWeight={800} fill={K.ink}>Northwind</text>
      <text x={row.x + 13} y={row.y + 49} fontSize={16} fontWeight={700} fill={MUTED}>$4,200</text>
      <circle cx={row.x + row.w - badge - 12} cy={row.y + row.h / 2} r={badge} fill={K.paper} stroke={K.ink} strokeWidth={2} strokeDasharray="3.2 3.4" />
      <Btn x={btn.x} y={btn.y} w={btn.w} h={btn.h} fill={K.green} edge={K.greenEdge} faceClass={`${P}press`}>
        <text x={btn.x + 18} y={btn.y + btn.h / 2 + 18 * 0.36} fontSize={18} fontWeight={800} fill={K.paper}>Approve</text>
      </Btn>
      <rect x={cx - 25} y={scr.y + scr.h - 12} width={50} height={4.5} rx={2.25} fill={K.ink} opacity={0.85} />
      {/* His finger on the key's right third, so the word stays readable */}
      <g className={`${P}press`}>
        <Hand x={btn.x + btn.w * 0.78} y={btn.y + btn.h * 0.56} s={1.35} />
      </g>
    </g>
  );
}

const LABEL =
  'Priya’s laptop shows a chat. She asks: Make a payments tool and deploy it. Claude answers: Done. It’s live: acme--supplier-payments.wirl.run. In front of the laptop, Tom’s phone has supplier payments open under a green strip with his face that says Signed in with Google, tom@acme.co, and his finger is pressing Approve on Northwind’s $4,200.';

export default function HeroLpOverlap() {
  return (
    <svg viewBox="0 0 600 412" className="tb-art tb-hero-art" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <style>{CSS}</style>
      <circle cx={306} cy={212} r={194} fill={K.sun} />
      <Laptop />
      <Phone />
    </svg>
  );
}

