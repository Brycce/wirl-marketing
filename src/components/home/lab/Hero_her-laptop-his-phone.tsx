// Hero concept: her laptop, his phone.
//
// The verb, with two people attached. On the left, Priya's laptop: a light
// chat where she asks her agent for a payments tool and the agent says it is
// done and only people at acme.co can open it. Across the top, the link
// itself, as a die-cut pill. One dotted path runs out of her laptop, through
// the link, and down into Tom's phone on the right, where the app is already
// open as tom@acme.co and his finger is on Approve. No invite, no password,
// no sign-in card: he is simply in.
//
// Five objects: laptop, phone, hand, link pill, one dashed path. No terminal
// (the connect block beside this picture is already one), and no stickers
// bar the small Claude mark on the agent's bubble.

import { K, DieCut, MiniLock, Avatar, Btn, CheckBadge, Hand } from '../kit';
import { LogoStickerArt } from '../marks';

const LINK = 'acme--supplier-payments.wirl.run';
const MUTED = '#5E5A4C';
const P = 'hx-her-laptop-his-phone-';
const BASE_EDGE = '#CDBFA3';

const CSS = `
.${P}tick { transform: scale(0); transform-box: fill-box; transform-origin: 50% 50%; }
@media (prefers-reduced-motion: no-preference) {
  .${P}path { animation: ${P}march 1.6s linear infinite; }
  @keyframes ${P}march { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -11; } }
  .${P}press { animation: ${P}press 5s ease infinite; }
  @keyframes ${P}press {
    0%, 20% { transform: translateY(0); }
    23%, 30% { transform: translateY(4px); }
    34%, 100% { transform: translateY(0); }
  }
  .${P}tick { animation: ${P}tick 5s ease infinite; }
  @keyframes ${P}tick {
    0%, 24% { transform: scale(0); }
    28% { transform: scale(1.18); }
    31%, 64% { transform: scale(1); }
    68%, 100% { transform: scale(0); }
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

/* The small Claude mark on the agent's bubble. The kit's LogoSticker shadow
   is sized for big stickers: at this size its blur is cut square and leaves a
   pale box round the mark, so this one carries its own, smaller shadow. */
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
function LinkPill({ box, size, lockS, tilt }: { box: Box; size: number; lockS: number; tilt: number }) {
  const { x, y, w, h } = box;
  const cy = y + h / 2;
  const lx = x + h / 2;
  return (
    <DieCut big border={9} tilt={tilt} cx={x + w / 2} cy={cy} cut={<rect x={x} y={y} width={w} height={h} rx={h / 2} />}>
      {/* Invisible: stretches the filter region so the sticker's soft shadow
          is not sliced off in a straight line across the sun. */}
      <rect x={x} y={y - 14} width={w} height={h + 54} fill="none" stroke="none" />
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={K.paper} stroke={K.ink} strokeWidth={3} />
      <MiniLock x={lx} y={cy - 1.4} s={lockS} />
      <text className="mono" x={lx + 15} y={cy + size * 0.36} fontSize={size} fill={K.ink}>{LINK}</text>
    </DieCut>
  );
}

/* ---------- Her laptop, front-on ---------- */
type LaptopProps = {
  lid: Box; bezel: number; base?: Box; notch?: number;
  ask: Box; reply: Box; size: number; lead: number; pad: number; replyPad: number;
  av: { x: number; y: number; r: number }; mark: { x: number; y: number; size: number };
};
function Laptop({ lid, bezel, base, notch = 60, ask, reply, size, lead, pad, replyPad, av, mark }: LaptopProps) {
  const scr = { x: lid.x + bezel, y: lid.y + bezel, w: lid.w - bezel * 2, h: lid.h - bezel * 2 };
  const line = (b: Box, i: number) => b.y + b.h / 2 + size * 0.36 + (i === 0 ? -lead / 2 : lead / 2);
  return (
    <g>
      {base && (
        <g>
          <rect x={base.x} y={base.y + 6} width={base.w} height={base.h} rx={8} fill={BASE_EDGE} stroke={K.ink} strokeWidth={3} />
          <rect x={base.x} y={base.y} width={base.w} height={base.h} rx={8} fill={K.edge} stroke={K.ink} strokeWidth={3} />
          <path
            d={`M${base.x + base.w / 2 - notch / 2} ${base.y} V${base.y + 2} Q${base.x + base.w / 2 - notch / 2} ${base.y + 6} ${base.x + base.w / 2 - notch / 2 + 4} ${base.y + 6} H${base.x + base.w / 2 + notch / 2 - 4} Q${base.x + base.w / 2 + notch / 2} ${base.y + 6} ${base.x + base.w / 2 + notch / 2} ${base.y + 2} V${base.y}`}
            fill={BASE_EDGE} stroke={K.ink} strokeWidth={2}
          />
        </g>
      )}
      {/* Lid: the ink is the bezel */}
      <rect x={lid.x} y={lid.y} width={lid.w} height={lid.h} rx={16} fill={K.ink} stroke={K.ink} strokeWidth={3} />
      <circle cx={lid.x + lid.w / 2} cy={lid.y + bezel / 2} r={2.2} fill="#3B4A42" />
      <rect x={scr.x} y={scr.y} width={scr.w} height={scr.h} rx={8} fill={K.paper} />
      {/* Her ask */}
      <path d={bubble(ask, 14, 'right')} fill={K.pinkWash} stroke={K.ink} strokeWidth={2} />
      <text x={ask.x + pad} y={line(ask, 0)} fontSize={size} fontWeight={800} fill={K.ink}>Make us a payments</text>
      <text x={ask.x + pad} y={line(ask, 1)} fontSize={size} fontWeight={800} fill={K.ink}>tool and deploy it.</text>
      {/* The agent's answer */}
      <path d={bubble(reply, 14, 'left')} fill={K.wash} stroke={K.ink} strokeWidth={2} />
      <text x={reply.x + replyPad} y={line(reply, 0)} fontSize={size} fontWeight={800} fill={K.ink}>Done. Only people at</text>
      <text x={reply.x + replyPad} y={line(reply, 1)} fontSize={size} fontWeight={800} fill={K.ink}>acme.co can open it.</text>
      <Mark uid={`${P}m${mark.size}`} x={mark.x} y={mark.y} size={mark.size} />
      {/* Whose laptop */}
      <Avatar who="priya" x={av.x} y={av.y} r={av.r} />
    </g>
  );
}

/* ---------- His phone, tilted, with the app open ---------- */
type PhoneSizes = { bar: number; name: number; email: number; row: number; btn: number; barH: number; rowH: number; btnH: number; av: number; badge: number };
function phoneLayout(body: Box, inset: number, t: PhoneSizes) {
  const scr = { x: body.x + inset, y: body.y + inset, w: body.w - inset * 2, h: body.h - inset * 2 };
  const rowX = scr.x + 8;
  const rowW = scr.w - 16;
  const who = scr.y + t.barH + 20;
  const r1 = scr.y + t.barH + 40;
  const r2 = r1 + t.rowH + 8;
  const btnY = r2 + t.rowH + 14;
  return { scr, rowX, rowW, who, r1, r2, btnY };
}

function Phone({ body, inset, rot, t }: { body: Box; inset: number; rot: number; t: PhoneSizes }) {
  const { scr, rowX, rowW, who, r1, r2, btnY } = phoneLayout(body, inset, t);
  const cx = body.x + body.w / 2;
  const cy = body.y + body.h / 2;
  const sr = 28 - inset;
  const rows = [
    { y: r1, name: 'Northwind', amt: '$4,200', done: true },
    { y: r2, name: 'Kelp & Co', amt: '$1,180', done: false },
  ];
  const nameDy = t.rowH / 2 - t.row * 0.2;
  const amtDy = t.rowH / 2 + t.row * 1.08;
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      {/* Body, with its side showing on the right */}
      <rect x={body.x + 4} y={body.y} width={body.w} height={body.h} rx={28} fill={K.metal} stroke={K.ink} strokeWidth={3} />
      <rect x={body.x} y={body.y} width={body.w} height={body.h} rx={28} fill={K.ink} stroke={K.ink} strokeWidth={3} />
      <rect x={scr.x} y={scr.y} width={scr.w} height={scr.h} rx={sr} fill={K.paper} />
      {/* App bar */}
      <path d={`M${scr.x} ${scr.y + t.barH} V${scr.y + sr} A${sr} ${sr} 0 0 1 ${scr.x + sr} ${scr.y} H${scr.x + scr.w - sr} A${sr} ${sr} 0 0 1 ${scr.x + scr.w} ${scr.y + sr} V${scr.y + t.barH} Z`} fill={K.green} />
      <path d={`M${scr.x} ${scr.y + t.barH} H${scr.x + scr.w}`} stroke={K.ink} strokeWidth={2} />
      <text className="mono" x={scr.x + scr.w / 2} y={scr.y + t.barH / 2 + t.bar * 0.36 + 2} fontSize={t.bar} fill={K.paper} textAnchor="middle">supplier-payments</text>
      {/* Who is looking */}
      <Avatar who="tom" x={rowX + t.av} y={who} r={t.av} />
      <text x={rowX + t.av * 2 + 7} y={who + t.email * 0.36} fontSize={t.email} fontWeight={700} fill={K.ink}>tom@acme.co</text>
      {/* Rows */}
      {rows.map((r) => (
        <g key={r.name}>
          <rect x={rowX} y={r.y} width={rowW} height={t.rowH} rx={10} fill={K.wash} />
          <text x={rowX + 11} y={r.y + nameDy} fontSize={t.row} fontWeight={800} fill={K.ink}>{r.name}</text>
          <text x={rowX + 11} y={r.y + amtDy} fontSize={t.row} fontWeight={700} fill={MUTED}>{r.amt}</text>
          {r.done ? (
            <CheckBadge x={rowX + rowW - t.badge - 8} y={r.y + t.rowH / 2} r={t.badge} />
          ) : (
            <g>
              <circle cx={rowX + rowW - t.badge - 8} cy={r.y + t.rowH / 2} r={t.badge} fill={K.paper} stroke={K.ink} strokeWidth={2} strokeDasharray="3.2 3.4" />
              <CheckBadge x={rowX + rowW - t.badge - 8} y={r.y + t.rowH / 2} r={t.badge} className={`${P}tick`} />
            </g>
          )}
        </g>
      ))}
      {/* The key */}
      <Btn x={rowX} y={btnY} w={rowW} h={t.btnH} fill={K.green} edge={K.greenEdge} faceClass={`${P}press`}>
        <text x={rowX + 17} y={btnY + t.btnH / 2 + t.btn * 0.36} fontSize={t.btn} fontWeight={800} fill={K.paper}>Approve</text>
      </Btn>
      <rect x={cx - 25} y={scr.y + scr.h - 12} width={50} height={4.5} rx={2.25} fill={K.ink} opacity={0.85} />
    </g>
  );
}

/* His finger on the key's right third, so the word stays readable. */
function TomHand({ body, inset, rot, t, s }: { body: Box; inset: number; rot: number; t: PhoneSizes; s: number }) {
  const { rowX, rowW, btnY } = phoneLayout(body, inset, t);
  const cx = body.x + body.w / 2;
  const cy = body.y + body.h / 2;
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      <g className={`${P}press`}>
        <Hand x={rowX + rowW * 0.8} y={btnY + t.btnH * 0.56} s={s} />
      </g>
    </g>
  );
}

const LABEL =
  'Priya’s laptop shows a chat. She asks: Make us a payments tool and deploy it. Claude answers: Done. Only people at acme.co can open it. A dotted line runs from her laptop through the link acme--supplier-payments.wirl.run and down into Tom’s phone, where supplier-payments is already open, signed in as tom@acme.co, with Northwind’s $4,200 approved, Kelp & Co’s $1,180 waiting, and his finger pressing Approve.';

/* ---------- Wide: 600 x 412 ---------- */
const W_PHONE: Box = { x: 392, y: 100, w: 176, h: 300 };
const W_T: PhoneSizes = { bar: 14, name: 14, email: 14.5, row: 15, btn: 17, barH: 36, rowH: 50, btnH: 46, av: 12, badge: 10 };

function Wide() {
  return (
    <svg viewBox="0 0 600 412" className="tb-art tb-hero-art tb-hero-wide" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <style>{CSS}</style>
      <circle cx={300} cy={214} r={200} fill={K.sun} />
      {/* One path: out of her laptop, through the link, into his phone. */}
      <path
        className={`${P}path`}
        d="M110 122 C110 72, 118 47, 150 47 H490 C528 47, 540 62, 540 99"
        fill="none" stroke={K.ink} strokeWidth={3} strokeDasharray="2 9"
      />
      <path d="M532 91 L540 100 L548 91" fill="none" stroke={K.ink} strokeWidth={3} />
      <Laptop
        lid={{ x: 20, y: 124, w: 300, h: 196 }} bezel={12} base={{ x: 6, y: 320, w: 328, h: 20 }}
        ask={{ x: 100, y: 150, w: 196, h: 58 }} reply={{ x: 46, y: 228, w: 212, h: 60 }}
        size={16} lead={22} pad={16} replyPad={20}
        av={{ x: 40, y: 128, r: 20 }} mark={{ x: 50, y: 231, size: 22 }}
      />
      <Phone body={W_PHONE} inset={8} rot={6} t={W_T} />
      <TomHand body={W_PHONE} inset={8} rot={6} t={W_T} s={1.3} />
      <LinkPill box={{ x: 140, y: 24, w: 360, h: 46 }} size={16} lockS={1.1} tilt={-2} />
    </svg>
  );
}

/* ---------- Phone: 430 x 404 ----------
   Everything at 13.5 units or more, so nothing drops under 11px at 390. */
const N_PHONE: Box = { x: 246, y: 120, w: 164, h: 262 };
const N_T: PhoneSizes = { bar: 13.5, name: 13.5, email: 14, row: 14, btn: 16, barH: 34, rowH: 46, btnH: 42, av: 11, badge: 9.5 };

function Narrow() {
  return (
    <svg viewBox="0 0 430 404" className="tb-art tb-hero-art tb-hero-phone" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={215} cy={206} r={190} fill={K.sun} />
      <path
        className={`${P}path`}
        d="M76 110 C76 70, 76 37, 52 35 M378 35 C404 36, 404 70, 398 119"
        fill="none" stroke={K.ink} strokeWidth={3} strokeDasharray="2 9"
      />
      <path d="M390 111 L398 120 L406 111" fill="none" stroke={K.ink} strokeWidth={3} />
      <Laptop
        lid={{ x: 0, y: 108, w: 240, h: 188 }} bezel={11} base={{ x: -4, y: 296, w: 248, h: 16 }} notch={48}
        ask={{ x: 44, y: 130, w: 170, h: 54 }} reply={{ x: 20, y: 206, w: 190, h: 56 }}
        size={15} lead={20.5} pad={13} replyPad={16}
        av={{ x: 18, y: 112, r: 17 }} mark={{ x: 23, y: 209, size: 20 }}
      />
      <Phone body={N_PHONE} inset={7} rot={6} t={N_T} />
      <TomHand body={N_PHONE} inset={7} rot={6} t={N_T} s={1.15} />
      <LinkPill box={{ x: 47, y: 14, w: 336, h: 42 }} size={14.5} lockS={1} tilt={-2} />
    </svg>
  );
}

export default function HeroHerLaptopHisPhone() {
  return (
    <>
      <Wide />
      <Narrow />
    </>
  );
}
