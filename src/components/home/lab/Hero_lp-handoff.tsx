// Hero concept: the agent hands it over.
//
// Priya's laptop on the left: she asks her agent for a payments tool, and
// the agent's answer is the link itself, a die-cut pill inside its bubble.
// One short solid arrow carries that same pill to Tom's phone, where it is
// the address, the page opens on Google's "Signed in as tom@acme.co", and
// the app is right there beneath it with his finger on Approve.
//
// Objects: laptop, phone, the pill (twice, identical), one arrow, a hand.
// No terminal (the connect block beside this picture is already one).
//
// The link at a legible 14 units is wider than any phone at this scale, so on
// Tom's phone the pill is stuck across the top of the screen and overhangs
// towards the laptop; that overhang, and the phone's corner over the laptop
// base, are what tie the two devices into one scene.

import { K, DieCut, MiniLock, Avatar, Btn, CheckBadge, Hand, GoogleG } from '../kit';
import { LogoStickerArt } from '../marks';

const LINK = 'acme--supplier-payments.wirl.run';
const MUTED = '#5E5A4C';
const P = 'hx-lp-handoff-';
const BASE_EDGE = '#CDBFA3';

const CSS = `
.${P}tick { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .${P}press { animation: ${P}press 5s ease infinite; }
  @keyframes ${P}press {
    0%, 20% { transform: translateY(0); }
    23%, 30% { transform: translateY(4px); }
    34%, 100% { transform: translateY(0); }
  }
  .${P}tick { transform-box: fill-box; transform-origin: 50% 50%; animation: ${P}tick 5s ease infinite; }
  @keyframes ${P}tick {
    0%, 24% { opacity: 0; transform: scale(0); }
    28% { opacity: 1; transform: scale(1.18); }
    31%, 64% { opacity: 1; transform: scale(1); }
    68%, 100% { opacity: 0; transform: scale(0); }
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

/* The small Claude mark on the agent's bubble, with its own small shadow. */
function Mark({ x, y, size, uid }: { x: number; y: number; size: number; uid: string }) {
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

/* ---------- The link, as a die-cut pill. Drawn twice, identically. ---------- */
const PILL = { h: 36, size: 14, lock: 15.5, text: 27, w: 27 + 238 + 11 };
function LinkPill({ x, y, tilt = -2 }: { x: number; y: number; tilt?: number }) {
  const { h, w, size } = PILL;
  const cy = y + h / 2;
  return (
    <DieCut border={6} tilt={tilt} cx={x + w / 2} cy={cy} cut={<rect x={x} y={y} width={w} height={h} rx={h / 2} />}>
      <rect x={x} y={y - 10} width={w} height={h + 30} fill="none" stroke="none" />
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
      <MiniLock x={x + PILL.lock} y={cy - 1.4} s={1} />
      <text x={x + PILL.text} y={cy + size * 0.36} fontSize={size} fontWeight={800} fill={K.ink}>{LINK}</text>
    </DieCut>
  );
}

/* ---------- Layout (600 x 412) ---------- */
const LID: Box = { x: 2, y: 58, w: 336, h: 236 };
const BEZEL = 11;
const BASE: Box = { x: -10, y: 294, w: 360, h: 18 };
const CHAT = 16;
const ASK: Box = { x: 96, y: 83, w: 186, h: 58 };
const REPLY: Box = { x: 19, y: 159, w: 304, h: 98 };
const LPILL = { x: REPLY.x + 12, y: REPLY.y + 46 };

const PHONE: Box = { x: 358, y: 96, w: 188, h: 300 };
const ROT = 6;
const INSET = 8;
const PPILL = { x: 321, y: 112, tilt: 4 };

function Laptop() {
  const scr = { x: LID.x + BEZEL, y: LID.y + BEZEL, w: LID.w - BEZEL * 2, h: LID.h - BEZEL * 2 };
  const notch = 60;
  const mid = BASE.x + BASE.w / 2;
  return (
    <g>
      <rect x={BASE.x} y={BASE.y + 6} width={BASE.w} height={BASE.h} rx={8} fill={BASE_EDGE} stroke={K.ink} strokeWidth={3} />
      <rect x={BASE.x} y={BASE.y} width={BASE.w} height={BASE.h} rx={8} fill={K.edge} stroke={K.ink} strokeWidth={3} />
      <path
        d={`M${mid - notch / 2} ${BASE.y} V${BASE.y + 2} Q${mid - notch / 2} ${BASE.y + 6} ${mid - notch / 2 + 4} ${BASE.y + 6} H${mid + notch / 2 - 4} Q${mid + notch / 2} ${BASE.y + 6} ${mid + notch / 2} ${BASE.y + 2} V${BASE.y}`}
        fill={BASE_EDGE} stroke={K.ink} strokeWidth={2}
      />
      <rect x={LID.x} y={LID.y} width={LID.w} height={LID.h} rx={16} fill={K.ink} stroke={K.ink} strokeWidth={3} />
      <circle cx={LID.x + LID.w / 2} cy={LID.y + BEZEL / 2} r={2.2} fill="#3B4A42" />
      <rect x={scr.x} y={scr.y} width={scr.w} height={scr.h} rx={8} fill={K.paper} />
      {/* Her ask */}
      <path d={bubble(ASK, 14, 'right')} fill={K.pinkWash} stroke={K.ink} strokeWidth={2} />
      <text x={ASK.x + 15} y={ASK.y + 25} fontSize={CHAT} fontWeight={800} fill={K.ink}>Make us a payments</text>
      <text x={ASK.x + 15} y={ASK.y + 46} fontSize={CHAT} fontWeight={800} fill={K.ink}>tool and deploy it.</text>
      {/* The agent's answer: the link */}
      <path d={bubble(REPLY, 14, 'left')} fill={K.wash} stroke={K.ink} strokeWidth={2} />
      <text x={REPLY.x + 22} y={REPLY.y + 29} fontSize={CHAT} fontWeight={800} fill={K.ink}>Done. Here it is:</text>
      <Mark uid={`${P}m`} x={REPLY.x + 6} y={REPLY.y + 4} size={20} />
      <LinkPill x={LPILL.x} y={LPILL.y} />
      <Avatar who="priya" x={LID.x + 18} y={LID.y + 4} r={19} />
    </g>
  );
}

function phoneLayout() {
  const scr = { x: PHONE.x + INSET, y: PHONE.y + INSET, w: PHONE.w - INSET * 2, h: PHONE.h - INSET * 2 };
  const x = scr.x + 8;
  const w = scr.w - 16;
  const bar = scr.y + 36; // where the page starts, under the address
  const sign = { x, y: bar + 8, w, h: 46 };
  const app = sign.y + sign.h + 8;
  const row = { x, y: app + 40, w, h: 46 };
  const btn = { x, y: row.y + row.h + 12, w, h: 40 };
  return { scr, bar, sign, app, row, btn };
}

function Phone() {
  const { scr, bar, sign, app, row, btn } = phoneLayout();
  const cx = PHONE.x + PHONE.w / 2;
  const cy = PHONE.y + PHONE.h / 2;
  const sr = 28 - INSET;
  return (
    <g transform={`rotate(${ROT} ${cx} ${cy})`}>
      <rect x={PHONE.x + 4} y={PHONE.y} width={PHONE.w} height={PHONE.h} rx={28} fill={K.metal} stroke={K.ink} strokeWidth={3} />
      <rect x={PHONE.x} y={PHONE.y} width={PHONE.w} height={PHONE.h} rx={28} fill={K.ink} stroke={K.ink} strokeWidth={3} />
      <rect x={scr.x} y={scr.y} width={scr.w} height={scr.h} rx={sr} fill={K.paper} />
      {/* Browser bar, where the link lands */}
      <path d={`M${scr.x} ${bar} V${scr.y + sr} A${sr} ${sr} 0 0 1 ${scr.x + sr} ${scr.y} H${scr.x + scr.w - sr} A${sr} ${sr} 0 0 1 ${scr.x + scr.w} ${scr.y + sr} V${bar} Z`} fill={K.wash} />
      <path d={`M${scr.x} ${bar} H${scr.x + scr.w}`} stroke={K.ink} strokeWidth={2} />
      {/* Google sign-in */}
      <rect x={sign.x} y={sign.y} width={sign.w} height={sign.h} rx={12} fill={K.paper} stroke={K.ink} strokeWidth={2} />
      <GoogleG x={sign.x + 19} y={sign.y + sign.h / 2} r={8} />
      <text x={sign.x + 36} y={sign.y + 19} fontSize={14} fontWeight={700} fill={MUTED}>Signed in as</text>
      <text x={sign.x + 36} y={sign.y + 36} fontSize={14} fontWeight={800} fill={K.ink}>tom@acme.co</text>
      {/* The app */}
      <rect x={scr.x} y={app} width={scr.w} height={32} fill={K.green} />
      <path d={`M${scr.x} ${app} H${scr.x + scr.w} M${scr.x} ${app + 32} H${scr.x + scr.w}`} stroke={K.ink} strokeWidth={2} />
      <text className="mono" x={scr.x + scr.w / 2} y={app + 16 + 14 * 0.36} fontSize={14} fill={K.paper} textAnchor="middle">supplier-payments</text>
      <rect x={row.x} y={row.y} width={row.w} height={row.h} rx={10} fill={K.wash} />
      <text x={row.x + 11} y={row.y + 19} fontSize={14} fontWeight={800} fill={K.ink}>Northwind</text>
      <text x={row.x + 11} y={row.y + 36} fontSize={14} fontWeight={700} fill={MUTED}>$4,200</text>
      <circle cx={row.x + row.w - 20} cy={row.y + row.h / 2} r={10} fill={K.paper} stroke={K.ink} strokeWidth={2} strokeDasharray="3.2 3.4" />
      <CheckBadge x={row.x + row.w - 20} y={row.y + row.h / 2} r={10} className={`${P}tick`} />
      <Btn x={btn.x} y={btn.y} w={btn.w} h={btn.h} fill={K.green} edge={K.greenEdge} faceClass={`${P}press`}>
        <text x={btn.x + 16} y={btn.y + btn.h / 2 + 16 * 0.36} fontSize={16} fontWeight={800} fill={K.paper}>Approve</text>
      </Btn>
      <rect x={cx - 25} y={scr.y + scr.h - 12} width={50} height={4.5} rx={2.25} fill={K.ink} opacity={0.85} />
      <g className={`${P}press`}>
        <Hand x={btn.x + btn.w * 0.78} y={btn.y + btn.h * 0.56} s={1.2} />
      </g>
    </g>
  );
}

/* One short, solid arrow from her pill to his, cut out like a sticker so it
   reads over the dark bezel as well as the sun. */
function HandoffArrow() {
  const x0 = LPILL.x + PILL.w + 10;
  const y0 = LPILL.y + PILL.h / 2;
  const x1 = 353;
  const y1 = PPILL.y + PILL.h + 16;
  const shaft = `M${x0} ${y0} C${x1 - 6} ${y0}, ${x1} ${y0 - 12}, ${x1} ${y1 + 12}`;
  const head = `M${x1 - 10} ${y1 + 13} L${x1} ${y1} L${x1 + 10} ${y1 + 13} Z`;
  return (
    <g filter="url(#tb-stk)">
      <g stroke={K.paper} strokeWidth={13} fill={K.paper}>
        <path d={shaft} fill="none" />
        <path d={head} />
      </g>
      <path d={shaft} fill="none" stroke={K.ink} strokeWidth={4.5} />
      <path d={head} fill={K.ink} stroke={K.ink} strokeWidth={3} />
    </g>
  );
}

const LABEL =
  'Priya’s laptop shows a chat. She asks: Make us a payments tool and deploy it. Claude answers: Done. Here it is, with the link acme--supplier-payments.wirl.run. An arrow carries that same link to Tom’s phone, which opens it signed in with Google as tom@acme.co, with the supplier-payments app beneath and his finger on Approve.';

export default function HeroLpHandoff() {
  return (
    <svg viewBox="0 0 600 412" className="tb-art tb-hero-art" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <style>{CSS}</style>
      <circle cx={300} cy={214} r={196} fill={K.sun} />
      <Laptop />
      <Phone />
      <LinkPill x={PPILL.x} y={PPILL.y} tilt={PPILL.tilt} />
      <HandoffArrow />
    </svg>
  );
}
