// Hero concept: laptop, link, two people.
//
// Priya's laptop on the left: she asks her agent for a payments tool, and the
// agent's reply hands back the link, as a die-cut sticker that comes out of
// the reply and off the edge of her screen. At its end the link forks, in two
// plain arrows, to two phones that opened it. Tom, signed in as tom@acme.co,
// is inside the app with a green tick. Alex, on a gmail account, gets a
// padlock and one sentence. The company login is shown, not said.
//
// One motion: every 6s Alex's shackle gives a small tug, as if he just tried.

import type { ReactNode } from 'react';
import { K, DieCut, MiniLock, Avatar, Btn, CheckBadge, Padlock } from '../kit';
import { LogoStickerArt } from '../marks';

const LINK = 'acme--supplier-payments.wirl.run';
const MUTED = '#5E5A4C';
const P = 'hx-lp-gate-';
const BASE_EDGE = '#CDBFA3';

const CSS = `
.${P}shackle { transform-box: fill-box; transform-origin: 50% 100%; }
@media (prefers-reduced-motion: no-preference) {
  .${P}shackle { animation: ${P}tug 6s ease-in-out 1.2s infinite; }
  @keyframes ${P}tug {
    0%, 20% { transform: translateY(0) rotate(0); }
    22% { transform: translateY(-4px) rotate(-3deg); }
    24.5% { transform: translateY(0) rotate(0); }
    27% { transform: translateY(-2.5px) rotate(2deg); }
    29.5%, 100% { transform: translateY(0) rotate(0); }
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

/* ---------- The link, as a die-cut pill ---------- */
function LinkPill({ box, size, tilt }: { box: Box; size: number; tilt: number }) {
  const { x, y, w, h } = box;
  const cy = y + h / 2;
  const lx = x + h / 2 + 2;
  return (
    <DieCut big border={8} tilt={tilt} cx={x + w / 2} cy={cy} cut={<rect x={x} y={y} width={w} height={h} rx={h / 2} />}>
      <rect x={x} y={y - 14} width={w} height={h + 54} fill="none" stroke="none" />
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={K.paper} stroke={K.ink} strokeWidth={3} />
      <MiniLock x={lx} y={cy - 1.4} s={1.05} />
      <text className="mono" x={lx + 14} y={cy + size * 0.36} fontSize={size} fill={K.ink}>{LINK}</text>
    </DieCut>
  );
}

/* ---------- Her laptop, front-on ---------- */
const LID: Box = { x: 4, y: 22, w: 262, h: 196 };
const BEZEL = 11;
const BASE: Box = { x: 0, y: 218, w: 270, h: 18 };
const ASK: Box = { x: 66, y: 45, w: 178, h: 50 };
const REPLY: Box = { x: 24, y: 112, w: 196, h: 80 };
const PILL: Box = { x: 34, y: 146, w: 328, h: 36 };
const SIZE = 15;

function Laptop() {
  const scr = { x: LID.x + BEZEL, y: LID.y + BEZEL, w: LID.w - BEZEL * 2, h: LID.h - BEZEL * 2 };
  const notch = 54;
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
      <text x={ASK.x + 14} y={ASK.y + 21} fontSize={SIZE} fontWeight={800} fill={K.ink}>Make us a payments</text>
      <text x={ASK.x + 14} y={ASK.y + 41} fontSize={SIZE} fontWeight={800} fill={K.ink}>tool and deploy it.</text>
      {/* The agent's answer: the link itself is laid on this bubble below. */}
      <path d={bubble(REPLY, 14, 'left')} fill={K.wash} stroke={K.ink} strokeWidth={2} />
      <text x={REPLY.x + 22} y={REPLY.y + 24} fontSize={SIZE} fontWeight={800} fill={K.ink}>Done. It’s live:</text>
      <Mark uid={`${P}m`} x={REPLY.x + 3} y={REPLY.y + 3} size={20} />
      <Avatar who="priya" x={LID.x + 18} y={LID.y + 4} r={17} />
    </g>
  );
}

/* ---------- A phone held up ---------- */
function Phone({ body, inset, rot, id, children }: { body: Box; inset: number; rot: number; id: string; children: ReactNode }) {
  const scr = { x: body.x + inset, y: body.y + inset, w: body.w - inset * 2, h: body.h - inset * 2 };
  const cx = body.x + body.w / 2;
  const cy = body.y + body.h / 2;
  const sr = 26 - inset;
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      <defs>
        <clipPath id={`${P}${id}`}>
          <rect x={scr.x} y={scr.y} width={scr.w} height={scr.h} rx={sr} />
        </clipPath>
      </defs>
      <rect x={body.x + 4} y={body.y} width={body.w} height={body.h} rx={26} fill={K.metal} stroke={K.ink} strokeWidth={3} />
      <rect x={body.x} y={body.y} width={body.w} height={body.h} rx={26} fill={K.ink} stroke={K.ink} strokeWidth={3} />
      <g clipPath={`url(#${P}${id})`}>
        <rect x={scr.x} y={scr.y} width={scr.w} height={scr.h} fill={K.paper} />
        {children}
      </g>
      <rect x={cx - 20} y={scr.y + scr.h - 10} width={40} height={4} rx={2} fill={K.ink} opacity={0.85} />
    </g>
  );
}

/* Tom, at acme.co: who he is, then the app. */
const TOM: Box = { x: 420, y: 32, w: 162, h: 296 };
const TOM_IN = 8;
const STRIP = 34;
function TomScreen() {
  const sx = TOM.x + TOM_IN;
  const sy = TOM.y + TOM_IN;
  const sw = TOM.w - TOM_IN * 2;
  const barY = sy + STRIP;
  const barH = 34;
  const rowX = sx + 9;
  const rowW = sw - 18;
  const rows = [
    { name: 'Northwind', amt: '$4,200' },
    { name: 'Kelp & Co', amt: '$1,180' },
  ];
  return (
    <g>
      <rect x={sx} y={sy} width={sw} height={STRIP} fill={K.wash} />
      <Avatar who="tom" x={sx + 20} y={sy + STRIP / 2 + 1} r={11} />
      <text x={sx + 36} y={sy + STRIP / 2 + 1 + 14 * 0.36} fontSize={14} fontWeight={700} fill={K.ink}>tom@acme.co</text>
      <rect x={sx} y={barY} width={sw} height={barH} fill={K.green} />
      <path d={`M${sx} ${barY} H${sx + sw} M${sx} ${barY + barH} H${sx + sw}`} stroke={K.ink} strokeWidth={2} />
      <text className="mono" x={sx + sw / 2} y={barY + barH / 2 + 13.5 * 0.36} fontSize={13.5} fill={K.paper} textAnchor="middle">supplier-payments</text>
      {rows.map((r, i) => {
        const ry = barY + barH + 12 + i * 58;
        return (
          <g key={r.name}>
            <rect x={rowX} y={ry} width={rowW} height={50} rx={11} fill={K.wash} />
            <text x={rowX + 12} y={ry + 21} fontSize={14.5} fontWeight={800} fill={K.ink}>{r.name}</text>
            <text x={rowX + 12} y={ry + 40} fontSize={14.5} fontWeight={700} fill={MUTED}>{r.amt}</text>
          </g>
        );
      })}
      <Btn x={rowX} y={barY + barH + 12 + 2 * 58 + 4} w={rowW} h={42} label="Approve" size={16} />
    </g>
  );
}

/* Alex, outside Acme: the same link, and a padlock. */
const ALEXB: Box = { x: 284, y: 216, w: 138, h: 184 };
const ALEX_IN = 7;
function AlexScreen() {
  const sx = ALEXB.x + ALEX_IN;
  const sy = ALEXB.y + ALEX_IN;
  const sw = ALEXB.w - ALEX_IN * 2;
  const mid = sx + sw / 2;
  const top = sy + STRIP;
  const s = 0.56;
  return (
    <g>
      <rect x={sx} y={sy} width={sw} height={STRIP} fill={K.wash} />
      <text x={mid} y={sy + STRIP / 2 + 1 + 14 * 0.36} fontSize={14} fontWeight={700} fill={K.ink} textAnchor="middle">alex@gmail.com</text>
      <path d={`M${sx} ${top} H${sx + sw}`} stroke={K.ink} strokeWidth={2} />
      <Padlock x={mid - 30 * s} y={top + 9} s={s} fill={K.tomato} edge={K.tomatoEdge} shackleClass={`${P}shackle`} />
      {['Only people at', 'acme.co can', 'open this.'].map((t, i) => (
        <text key={t} x={mid} y={top + 72 + i * 19} fontSize={14} fontWeight={800} fill={K.ink} textAnchor="middle">{t}</text>
      ))}
    </g>
  );
}

/* A chunky arrow with an open head, along a gentle curve. */
function Arrow({ from, via, to }: { from: [number, number]; via: [number, number]; to: [number, number] }) {
  const [x2, y2] = to;
  const [vx, vy] = via;
  const len = Math.hypot(x2 - vx, y2 - vy);
  const ux = (x2 - vx) / len;
  const uy = (y2 - vy) / len;
  const back = 11;
  const half = 8.5;
  const hx = x2 - ux * back;
  const hy = y2 - uy * back;
  const a = [hx - uy * half, hy + ux * half];
  const b = [hx + uy * half, hy - ux * half];
  return (
    <g fill="none" stroke={K.ink} strokeWidth={4}>
      <path d={`M${from[0]} ${from[1]} Q${vx} ${vy} ${x2} ${y2}`} />
      <path d={`M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${x2} ${y2} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`} />
    </g>
  );
}

const LABEL =
  'Priya’s laptop shows a chat. She asks: Make us a payments tool and deploy it. Claude answers: Done. It’s live, and hands back the link acme--supplier-payments.wirl.run. From the link, one arrow goes to Tom’s phone, signed in as tom@acme.co, where the supplier-payments app is open with a green tick. Another arrow goes to a phone signed in as alex@gmail.com, which shows only a padlock and the words Only people at acme.co can open this.';

export default function HeroLpGate() {
  return (
    <svg viewBox="0 0 600 412" className="tb-art tb-hero-art" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <style>{CSS}</style>
      <circle cx={300} cy={214} r={200} fill={K.sun} />
      <Laptop />
      <Phone body={ALEXB} inset={ALEX_IN} rot={-5} id="alex">
        <AlexScreen />
      </Phone>
      <Phone body={TOM} inset={TOM_IN} rot={5} id="tom">
        <TomScreen />
      </Phone>
      <g transform={`rotate(5 ${TOM.x + TOM.w / 2} ${TOM.y + TOM.h / 2})`}>
        {/* Kept inside x≈592 so the frame's right edge at 1024–1150px does not cut it in half. */}
        <CheckBadge x={TOM.x + TOM.w - 21} y={TOM.y - 2} r={18} />
      </g>
      <LinkPill box={PILL} size={14} tilt={-2} />
      <Arrow from={[377, 157]} via={[398, 136]} to={[417, 135]} />
      <Arrow from={[377, 165]} via={[394, 180]} to={[389, 210]} />
    </svg>
  );
}
