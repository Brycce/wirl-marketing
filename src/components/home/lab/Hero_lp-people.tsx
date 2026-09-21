// Hero concept "Priya and Tom" (lp-people). Exploration only.
//
// The laptop-to-phone picture, with the people drawn in. Priya sits at her
// laptop on the left, where her agent has just said it is done and here is
// the link. She holds that link up and across to Tom like a card, and Tom,
// standing on the right, has the other end of it in his hand. In his other
// hand his phone is up with the app open, and a small Google row on it says
// he is in as tom@acme.co.
//
// Everything touches: Priya against her laptop, her hand on the card, the
// card in Tom's hand, the phone in Tom's hand. No path, no arrows. The one
// motion is a blink.

import { K, DieCut, MiniLock, Btn, CheckBadge, GoogleG } from '../kit';
import { LogoStickerArt } from '../marks';

const LINK = 'acme--supplier-payments.wirl.run';
const P = 'hx-lp-people-';
const BASE_EDGE = '#CDBFA3';
const MUTED = '#5E5A4C';
const DESK = '#F2C48D';
const DESK_EDGE = '#D29A5C';

const PRIYA = { skin: K.skin[1], hair: '#1E1A1C', top: K.pink };
const TOM = { skin: K.skin[2], hair: '#2B1D16', top: K.blue };

const CSS = `
.${P}eyes { transform-box: fill-box; transform-origin: 50% 50%; }
@media (prefers-reduced-motion: no-preference) {
  .${P}eyes { animation: ${P}blink 5.2s ease-in-out infinite; }
  .${P}eyes-late { animation-delay: 1.9s; }
  @keyframes ${P}blink {
    0%, 92%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.1); }
  }
}
`;

type Box = { x: number; y: number; w: number; h: number };
type Pt = { x: number; y: number };

const rot = (p: Pt, c: Pt, deg: number): Pt => {
  const a = (deg * Math.PI) / 180;
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return { x: c.x + dx * Math.cos(a) - dy * Math.sin(a), y: c.y + dx * Math.sin(a) + dy * Math.cos(a) };
};

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

/* ---------- People ----------
   Drawn in the kit avatar's 40-unit space (face centred on 0,-2) and scaled
   up, so they are the same Priya and Tom as the avatars elsewhere. */
type Pose = { x: number; y: number; s: number; bottom: number };

function Face({ lx, ly, late }: { lx: number; ly: number; late?: boolean }) {
  const m = lx * 0.4;
  return (
    <>
      <g className={`${P}eyes${late ? ` ${P}eyes-late` : ''}`}>
        <ellipse cx={-3.6 + lx} cy={-1.2 + ly} rx={1.25} ry={1.45} fill={K.ink} />
        <ellipse cx={3.6 + lx} cy={-1.2 + ly} rx={1.25} ry={1.45} fill={K.ink} />
      </g>
      <circle cx={-6.1} cy={2.8} r={1.8} fill={K.cheek} opacity={0.9} />
      <circle cx={6.1} cy={2.8} r={1.8} fill={K.cheek} opacity={0.9} />
      {/* A wide open smile */}
      <path d={`M${-3.1 + m} 3.3 Q${m} 4.1 ${3.1 + m} 3.3 Q${2.6 + m} 7.5 ${m} 7.5 Q${-2.6 + m} 7.5 ${-3.1 + m} 3.3 Z`} fill={K.ink} />
    </>
  );
}

function Torso({ top, skin, w, bottom }: { top: string; skin: string; w: number; bottom: number }) {
  return (
    <>
      <path d="M-3.3 4 V12 H3.3 V4 Z" fill={skin} stroke={K.ink} strokeWidth={w * 0.7} />
      <path d={`M-18.4 ${bottom} L-17.6 23 C-17.6 15 -11 11.4 -5.2 11 Q0 15.6 5.2 11 C11 11.4 17.6 15 17.6 23 L18.4 ${bottom} Z`} fill={top} stroke={K.ink} strokeWidth={w} />
    </>
  );
}

function Priya({ x, y, s, bottom }: Pose) {
  const w = 3 / s;
  const p = PRIYA;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* A black bob to the jaw, fringe swept to one side */}
      <path d="M-12.4 -1 C-13.6 -13 -7 -16.6 0 -16.6 C7 -16.6 13.6 -13 12.4 -1 L12.8 7.6 C9 9.4 -9 9.4 -12.8 7.6 Z" fill={p.hair} stroke={K.ink} strokeWidth={w} />
      <Torso top={p.top} skin={p.skin} w={w} bottom={bottom} />
      <ellipse cx={0} cy={-2} rx={9.6} ry={10.4} fill={p.skin} stroke={K.ink} strokeWidth={w} />
      <path d="M-10 -3.2 C-10.6 -11.6 -5 -14.4 0.6 -14.2 C6.4 -14 10.6 -11 10 -3.2 C8.4 -6.4 5.6 -8.8 2.2 -9.2 C-1.4 -7.2 -6 -5.6 -10 -3.2 Z" fill={p.hair} stroke={K.ink} strokeWidth={w} />
      <Face lx={1.1} ly={-0.4} />
    </g>
  );
}

function Tom({ x, y, s, bottom }: Pose) {
  const w = 3 / s;
  const p = TOM;
  const curls: [number, number, number][] = [[-9.4, -5.4, 3.4], [-8.6, -10, 3.8], [-4.6, -13.4, 4], [0.4, -14.6, 4], [5.2, -13.4, 4], [8.8, -10, 3.8], [9.6, -5.4, 3.4], [-2, -10.4, 3.6], [3, -10.6, 3.6]];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Torso top={p.top} skin={p.skin} w={w} bottom={bottom} />
      <circle cx={-9.6} cy={-0.6} r={2.4} fill={p.skin} stroke={K.ink} strokeWidth={w} />
      <circle cx={9.6} cy={-0.6} r={2.4} fill={p.skin} stroke={K.ink} strokeWidth={w} />
      <ellipse cx={0} cy={-2} rx={9.6} ry={10.4} fill={p.skin} stroke={K.ink} strokeWidth={w} />
      {/* Tight curls over the top */}
      <g fill={p.hair} stroke={K.ink} strokeWidth={w * 0.8}>
        {curls.map(([cx, cy, r]) => <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={r} />)}
      </g>
      <Face lx={-1} ly={0.3} late />
    </g>
  );
}

/* An arm: a sleeve tube from shoulder to wrist. */
function Sleeve({ d, color }: { d: string; color: string }) {
  return (
    <g>
      <path d={d} fill="none" stroke={K.ink} strokeWidth={24} strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={18} strokeLinecap="round" />
    </g>
  );
}

/* A hand closed round one end of the card, in the card's own frame: the
   origin is the card's end, and the fingers wrap over its face. */
function Mitten({ side, skin }: { side: 'left' | 'right'; skin: string }) {
  const f = side === 'left' ? 1 : -1;
  return (
    <g transform={`scale(${f} 1)`}>
      <rect x={-9} y={-16} width={27} height={40} rx={12} fill={skin} stroke={K.ink} strokeWidth={2.8} />
      <path d="M9 -5 H18 M9 5 H18 M9 14 H17" fill="none" stroke={K.ink} strokeWidth={2.2} />
    </g>
  );
}

/* ---------- The link, as a die-cut card ---------- */
function LinkCard({ box, size, tilt }: { box: Box; size: number; tilt: number }) {
  const { x, y, w, h } = box;
  const cy = y + h / 2;
  const lx = x + 36;
  return (
    <DieCut big border={8} tilt={tilt} cx={x + w / 2} cy={cy} cut={<rect x={x} y={y} width={w} height={h} rx={h / 2} />}>
      <rect x={x - 10} y={y - 30} width={w + 20} height={h + 80} fill="none" stroke="none" />
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={K.paper} stroke={K.ink} strokeWidth={3} />
      <MiniLock x={lx} y={cy - 1.4} s={1.05} />
      <text className="mono" x={lx + 13} y={cy + size * 0.36} fontSize={size} fill={K.ink}>{LINK}</text>
    </DieCut>
  );
}

/* ---------- Her laptop ---------- */
function Laptop({ lid, bezel, base }: { lid: Box; bezel: number; base: Box }) {
  const scr = { x: lid.x + bezel, y: lid.y + bezel, w: lid.w - bezel * 2, h: lid.h - bezel * 2 };
  const size = 14.5;
  const lead = 19;
  const ask = { x: scr.x + scr.w - 178, y: scr.y + 11, w: 168, h: 48 };
  const reply = { x: scr.x + 14, y: scr.y + 76, w: 178, h: 34 };
  const notch = 52;
  const mid = base.x + base.w / 2;
  return (
    <g>
      <rect x={base.x} y={base.y + 6} width={base.w} height={base.h} rx={8} fill={BASE_EDGE} stroke={K.ink} strokeWidth={3} />
      <rect x={base.x} y={base.y} width={base.w} height={base.h} rx={8} fill={K.edge} stroke={K.ink} strokeWidth={3} />
      <path
        d={`M${mid - notch / 2} ${base.y} V${base.y + 2} Q${mid - notch / 2} ${base.y + 6} ${mid - notch / 2 + 4} ${base.y + 6} H${mid + notch / 2 - 4} Q${mid + notch / 2} ${base.y + 6} ${mid + notch / 2} ${base.y + 2} V${base.y}`}
        fill={BASE_EDGE} stroke={K.ink} strokeWidth={2}
      />
      <rect x={lid.x} y={lid.y} width={lid.w} height={lid.h} rx={15} fill={K.ink} stroke={K.ink} strokeWidth={3} />
      <rect x={scr.x} y={scr.y} width={scr.w} height={scr.h} rx={7} fill={K.paper} />
      {/* Her ask */}
      <path d={bubble(ask, 14, 'right')} fill={K.pinkWash} stroke={K.ink} strokeWidth={2} />
      <text x={ask.x + 13} y={ask.y + ask.h / 2 + size * 0.36 - lead / 2} fontSize={size} fontWeight={800} fill={K.ink}>Make us a payments</text>
      <text x={ask.x + 13} y={ask.y + ask.h / 2 + size * 0.36 + lead / 2} fontSize={size} fontWeight={800} fill={K.ink}>tool and deploy it.</text>
      {/* The agent's answer */}
      <path d={bubble(reply, 14, 'left')} fill={K.wash} stroke={K.ink} strokeWidth={2} />
      <text x={reply.x + 18} y={reply.y + reply.h / 2 + size * 0.36} fontSize={size} fontWeight={800} fill={K.ink}>Done. Here’s the link.</text>
      <Mark uid={`${P}m`} x={reply.x + 1} y={reply.y + 1} size={20} />
    </g>
  );
}

/* ---------- His phone, with the app open ---------- */
function Phone({ body, tilt }: { body: Box; tilt: number }) {
  const inset = 7;
  const scr = { x: body.x + inset, y: body.y + inset, w: body.w - inset * 2, h: body.h - inset * 2 };
  const cx = body.x + body.w / 2;
  const cy = body.y + body.h / 2;
  const sr = 24 - inset;
  const barH = 32;
  const rowX = scr.x + 8;
  const rowW = scr.w - 16;
  const gY = scr.y + barH + 10;
  const gH = 30;
  const payY = gY + gH + 9;
  const payH = 46;
  const btnY = payY + payH + 11;
  const btnH = 34;
  return (
    <g transform={`rotate(${tilt} ${cx} ${cy})`}>
      <rect x={body.x + 4} y={body.y} width={body.w} height={body.h} rx={24} fill={K.metal} stroke={K.ink} strokeWidth={3} />
      <rect x={body.x} y={body.y} width={body.w} height={body.h} rx={24} fill={K.ink} stroke={K.ink} strokeWidth={3} />
      <rect x={scr.x} y={scr.y} width={scr.w} height={scr.h} rx={sr} fill={K.paper} />
      <path d={`M${scr.x} ${scr.y + barH} V${scr.y + sr} A${sr} ${sr} 0 0 1 ${scr.x + sr} ${scr.y} H${scr.x + scr.w - sr} A${sr} ${sr} 0 0 1 ${scr.x + scr.w} ${scr.y + sr} V${scr.y + barH} Z`} fill={K.green} />
      <path d={`M${scr.x} ${scr.y + barH} H${scr.x + scr.w}`} stroke={K.ink} strokeWidth={2} />
      <text x={scr.x + scr.w / 2} y={scr.y + barH / 2 + 14 * 0.36 + 1} fontSize={14} fontWeight={800} fill={K.paper} textAnchor="middle">Supplier payments</text>
      {/* Signed in with Google, as tom@acme.co */}
      <rect x={rowX} y={gY} width={rowW} height={gH} rx={gH / 2} fill={K.greenWash} stroke={K.ink} strokeWidth={2} />
      <GoogleG x={rowX + 14} y={gY + gH / 2} r={6.2} />
      <text x={rowX + 25} y={gY + gH / 2 + 13.5 * 0.36} fontSize={13.5} fontWeight={800} fill={K.ink}>tom@acme.co</text>
      <CheckBadge x={rowX + rowW - 13} y={gY + gH / 2} r={8.5} />
      {/* One payment */}
      <rect x={rowX} y={payY} width={rowW} height={payH} rx={10} fill={K.wash} />
      <text x={rowX + 11} y={payY + 20} fontSize={14} fontWeight={800} fill={K.ink}>Northwind</text>
      <text x={rowX + 11} y={payY + 37} fontSize={14} fontWeight={700} fill={MUTED}>$4,200</text>
      <Btn x={rowX} y={btnY} w={rowW} h={btnH} fill={K.green} edge={K.greenEdge} label="Approve" size={15} />
      <rect x={cx - 22} y={scr.y + scr.h - 10} width={44} height={4} rx={2} fill={K.ink} opacity={0.85} />
    </g>
  );
}

/* His other hand round the phone's right edge, fingers over the bezel. */
function PhoneGrip({ body, tilt, skin }: { body: Box; tilt: number; skin: string }) {
  const cx = body.x + body.w / 2;
  const cy = body.y + body.h / 2;
  return (
    <g transform={`rotate(${tilt} ${cx} ${cy})`}>
      <g transform={`translate(${body.x + body.w + 4} ${body.y + body.h * 0.56})`}>
        <Mitten side="right" skin={skin} />
      </g>
    </g>
  );
}

const LABEL =
  'Priya sits at her laptop, where she asked Claude: Make us a payments tool and deploy it. Claude answers: Done. Here’s the link. She holds the link, acme--supplier-payments.wirl.run, up and across to Tom, who has the other end of it in his hand. In his other hand his phone shows the Supplier payments app, signed in with Google as tom@acme.co, with Northwind’s $4,200 and an Approve button.';

const CARD: Box = { x: 130, y: 136, w: 340, h: 44 };
const TILT = -8;
const PHONE: Box = { x: 408, y: 196, w: 176, h: 196 };

export default function HeroLpPeople() {
  const c = { x: CARD.x + CARD.w / 2, y: CARD.y + CARD.h / 2 };
  const L = (dx: number, dy: number) => rot({ x: c.x + dx, y: c.y + dy }, c, TILT);
  const hw = CARD.w / 2;
  const pWrist = L(-hw + 4, 26);
  const tWrist = L(hw - 4, 26);
  const pEnd = L(-hw, 0);
  const tEnd = L(hw, 0);
  return (
    <svg viewBox="0 0 600 412" className="tb-art tb-hero-art" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <style>{CSS}</style>
      <circle cx={300} cy={206} r={200} fill={K.sun} />
      <Priya x={78} y={188} s={3.5} bottom={52} />
      <Tom x={522} y={124} s={3.5} bottom={70} />
      {/* The desk they share */}
      <rect x={12} y={356} width={576} height={24} rx={12} fill={DESK_EDGE} stroke={K.ink} strokeWidth={3} />
      <rect x={12} y={350} width={576} height={24} rx={12} fill={DESK} stroke={K.ink} strokeWidth={3} />
      <Laptop lid={{ x: 158, y: 200, w: 214, h: 136 }} bezel={10} base={{ x: 144, y: 334, w: 242, h: 16 }} />
      {/* Her other hand still on the laptop */}
      <Sleeve d="M36 268 Q60 338 158 340" color={PRIYA.top} />
      <g transform="translate(168 344) rotate(-90)"><Mitten side="left" skin={PRIYA.skin} /></g>
      {/* Priya holds the link up to Tom; he has the other end */}
      <LinkCard box={CARD} size={14} tilt={TILT} />
      <Sleeve d={`M125 260 Q134 232 ${pWrist.x} ${pWrist.y}`} color={PRIYA.top} />
      <Sleeve d={`M474 200 Q472 176 ${tWrist.x} ${tWrist.y}`} color={TOM.top} />
      <g transform={`translate(${pEnd.x} ${pEnd.y}) rotate(${TILT})`}><Mitten side="left" skin={PRIYA.skin} /></g>
      <g transform={`translate(${tEnd.x} ${tEnd.y}) rotate(${TILT})`}><Mitten side="right" skin={TOM.skin} /></g>
      <Phone body={PHONE} tilt={4} />
      <PhoneGrip body={PHONE} tilt={4} skin={TOM.skin} />
    </svg>
  );
}
