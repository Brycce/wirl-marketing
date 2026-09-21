'use client';
// Hero concept "Priya ships, the admin sees it" (ships-and-shows-up). Exploration only.
//
// The other half of Wirl, kept about people. Top right, the admin's one
// screen: Lena's list of Acme's apps, each row saying what the app is, who
// built it (a face, with their agent's logo stuck on the shoulder) and who can
// open it (the company, or three named faces). The top row is new:
// supplier-payments, by Priya, with Claude. Bottom left, the reply that put it
// there: Priya's chat, Claude saying "Deployed supplier-payments." with its
// tail pointing up at the list. Nobody filed a ticket; the app just shows up.
//
// The mirror of "The agent's reply" (card top right, bubble bottom left), so
// the two never look alike. Two objects, three tiny agent marks, no other
// stickers, no log, no counts, no columns beyond who and who-can-open.
//
// Motion, once: the new row slides down out from under the header while the
// other two shift down to make room, its New chip pops, and its sun wash
// fades from bright to soft. The resting (no-motion) state is the finished
// one. On a phone, where the picture sits below the fold, it waits until it
// is scrolled into view.

import { useEffect, useRef } from 'react';
import { K, CastShadow, Avatar, AvatarStack, Acme, MiniLock, textW, type Who } from '../kit';
import { LogoStickerArt } from '../marks';

const P = 'hx-ships-and-shows-up';
const MUTED = '#5E5A4C';
const SOFT = '#FFF0B3';

type Agent = 'claude' | 'cursor' | 'codex';
type Row = { app: string; who: Who; agent: Agent; open: 'company' | Who[]; fresh?: boolean };
const ROWS: Row[] = [
  { app: 'supplier-payments', who: 'priya', agent: 'claude', open: 'company', fresh: true },
  { app: 'candidate-pipeline', who: 'mia', agent: 'cursor', open: 'company' },
  { app: 'nda-lookup', who: 'lena', agent: 'codex', open: ['lena', 'priya', 'tom'] },
];

const LABEL =
  'Lena’s admin screen, Acme’s apps. The top row is new: supplier-payments, built by Priya with Claude Code, open to anyone at acme.co. Below it, candidate-pipeline, built by Mia with Cursor, open to acme.co, and nda-lookup, built by Lena with Codex, open only to Lena, Priya and Tom. Under the list, Priya’s chat with Claude replies: Deployed supplier-payments.';

const CSS = `
.${P}-new { transform-box: fill-box; transform-origin: 50% 50%; }
@media (prefers-reduced-motion: no-preference) {
  .${P}-drop { animation: ${P}-drop .8s cubic-bezier(.3,1.22,.5,1) .7s both; }
  .${P}-push { animation: ${P}-push .8s cubic-bezier(.3,1.22,.5,1) .7s both; }
  .${P}-new { animation: ${P}-pop .5s cubic-bezier(.3,1.8,.5,1) 1.35s both; }
  .${P}-wash { animation: ${P}-wash 2s ease-in-out 1.5s both; }
}
@keyframes ${P}-drop { from { transform: translateY(-80px); } to { transform: none; } }
@keyframes ${P}-push { from { transform: translateY(-64px); } to { transform: none; } }
@keyframes ${P}-pop { from { transform: scale(0); } to { transform: scale(1); } }
@keyframes ${P}-wash { from { fill: ${K.sun}; } to { fill: ${SOFT}; } }
`;

type Sizes = { title: number; admin: number; name: number; chip: number };
type CardSpec = {
  v: string;
  x: number; y: number; w: number; h: number;
  lenaX: number;
  builderX: number;
  accessX: number; // left of the access chip, or the centre of the lock when compact
  compact: boolean;
  s: Sizes;
  shadow: { dx: number; dy: number };
};

const HEAD = 48;
const ROW_H = 60;
const PITCH = 64;

const TILT: Record<Agent, number> = { claude: -6, codex: 5, cursor: -3 };

/* A tiny die-cut agent logo. The kit's LogoSticker shadow is sized for big
   stickers and its blur gets cut square round a mark this small, so these
   carry their own, smaller shadow (defined once per svg in Defs). */
function Mark({ agent, x, y, size, uid, v }: { agent: Agent; x: number; y: number; size: number; uid: string; v: string }) {
  return (
    <g transform={`translate(${x} ${y})`} color={K.ink}>
      <g filter={`url(#${P}-stk-${v})`}>
        <g transform={`rotate(${TILT[agent]}) scale(${size / 24}) translate(-12 -12)`}>
          <LogoStickerArt agent={agent} uid={uid} peel={null} />
        </g>
      </g>
    </g>
  );
}

function Defs({ v }: { v: string }) {
  return (
    <defs>
      <filter id={`${P}-stk-${v}`} x="-50%" y="-50%" width="200%" height="220%" colorInterpolationFilters="sRGB">
        <feDropShadow dx="0" dy="0.8" stdDeviation="0.6" floodColor={K.ink} floodOpacity="0.28" />
        <feDropShadow dx="0" dy="2.2" stdDeviation="1.8" floodColor={K.ink} floodOpacity="0.2" />
      </filter>
    </defs>
  );
}

/* The builder: a face, with their agent's logo stuck on the shoulder. */
function Builder({ who, agent, x, y, uid, v }: { who: Who; agent: Agent; x: number; y: number; uid: string; v: string }) {
  return (
    <g>
      <Avatar who={who} x={x} y={y} r={14} />
      <Mark agent={agent} x={x + 12} y={y + 10} size={16} uid={uid} v={v} />
    </g>
  );
}

/* Who can open it: the company (a lock and the domain), or named faces. */
function Access({ open, c, y }: { open: Row['open']; c: CardSpec; y: number }) {
  const cy = y + ROW_H / 2;
  if (open !== 'company') {
    const step = c.compact ? 12 : 13.5;
    const x0 = c.compact ? c.accessX - step : c.accessX + 10;
    return <AvatarStack x={x0} y={cy} r={10} step={step} who={open} />;
  }
  if (c.compact) {
    return (
      <g>
        <circle cx={c.accessX} cy={cy} r={14} fill={K.greenWash} stroke={K.ink} strokeWidth={2} />
        <MiniLock x={c.accessX} y={cy - 1} s={1.05} color={K.green} />
      </g>
    );
  }
  return (
    <g>
      <rect x={c.accessX} y={cy - 13} width={92} height={26} rx={13} fill={K.greenWash} stroke={K.ink} strokeWidth={2} />
      <MiniLock x={c.accessX + 15} y={cy - 1.2} color={K.green} />
      <text x={c.accessX + 25} y={cy + c.s.chip * 0.36} fontSize={c.s.chip} fontWeight={800} fill={K.greenEdge}>acme.co</text>
    </g>
  );
}

function AppRow({ row, c, y, rowX, rowW }: { row: Row; c: CardSpec; y: number; rowX: number; rowW: number }) {
  const nameX = rowX + 14;
  const chipX = nameX + textW(row.app, c.s.name, true) + 8;
  const chipW = c.s.chip * 3.3;
  return (
    <g>
      {row.fresh ? (
        <rect className={`${P}-wash`} x={rowX} y={y} width={rowW} height={ROW_H} rx={10} fill={SOFT} stroke={K.ink} strokeWidth={2} />
      ) : (
        <rect x={rowX} y={y} width={rowW} height={ROW_H} rx={10} fill={K.wash} />
      )}
      <text className="mono" x={nameX} y={y + 36} fontSize={c.s.name} fill={K.ink}>{row.app}</text>
      {row.fresh && (
        <g className={`${P}-new`}>
          <rect x={chipX} y={y + 18} width={chipW} height={24} rx={12} fill={K.sun} stroke={K.ink} strokeWidth={2} />
          <text x={chipX + chipW / 2} y={y + 30 + c.s.chip * 0.36} fontSize={c.s.chip} fontWeight={800} fill={K.ink} textAnchor="middle">New</text>
        </g>
      )}
      <Builder who={row.who} agent={row.agent} x={c.builderX} y={y + 30} uid={`${P}-${c.v}-${row.agent}`} v={c.v} />
      <Access open={row.open} c={c} y={y} />
    </g>
  );
}

/* The admin's card: Acme's apps, as Lena sees them. */
function Card({ c }: { c: CardSpec }) {
  const { x, y, w, h, v } = c;
  const r = 18;
  const divY = y + HEAD;
  const rowX = x + 12;
  const rowW = w - 24;
  const rowY = (i: number) => divY + 13 + i * PITCH;
  const clip = `${P}-body-${v}`;
  return (
    <g>
      <CastShadow x={x} y={y} w={w} h={h} r={r} dx={c.shadow.dx} dy={c.shadow.dy} />
      <rect x={x} y={y + 6} width={w} height={h} rx={r} fill={K.edge} stroke={K.ink} strokeWidth={3} />
      <rect x={x} y={y} width={w} height={h} rx={r} fill={K.paper} />
      <path d={`M${x} ${divY} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${divY} Z`} fill={K.sky} />
      <Acme x={x + 26} y={y + HEAD / 2} r={13} />
      <text x={x + 48} y={y + HEAD / 2 + c.s.title * 0.36} fontSize={c.s.title} fontWeight={800} fill={K.ink}>Acme’s apps</text>
      <Avatar who="lena" x={c.lenaX} y={y + HEAD / 2} r={14} />
      <text x={c.lenaX + 20} y={y + HEAD / 2 + c.s.admin * 0.36} fontSize={c.s.admin} fontWeight={700} fill={MUTED}>admin</text>
      <defs>
        <clipPath id={clip}>
          <rect x={x} y={divY + 1.4} width={w} height={h - HEAD - 1.4} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <g className={`${P}-push`}>
          {ROWS.slice(1).map((row, i) => <AppRow key={row.app} row={row} c={c} y={rowY(i + 1)} rowX={rowX} rowW={rowW} />)}
        </g>
        <g className={`${P}-drop`}>
          <AppRow row={ROWS[0]} c={c} y={rowY(0)} rowX={rowX} rowW={rowW} />
        </g>
      </g>
      <path d={`M${x} ${divY} H${x + w}`} stroke={K.ink} strokeWidth={2.5} />
      <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke={K.ink} strokeWidth={3} />
    </g>
  );
}

type BubbleSpec = {
  v: string;
  x: number; y: number; w: number; h: number;
  tail: { a: number; b: number; tx: number; ty: number };
  s: { said: number; app: number };
};

const bubblePath = (x: number, y: number, w: number, h: number, r: number, t: BubbleSpec['tail']) =>
  `M${x + r} ${y} H${t.a} L${t.tx} ${t.ty} L${t.b} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h - r} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} H${x + r} A${r} ${r} 0 0 1 ${x} ${y + h - r} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`;

/* Priya's reply: one light bubble, Claude saying it's deployed, the tail
   pointing up at the list it landed on. Her face on the corner says whose
   chat this is. */
function Bubble({ b }: { b: BubbleSpec }) {
  const { x, y, w, h } = b;
  const d = bubblePath(x, y, w, h, 20, b.tail);
  // The toy edge is drawn without the tail: a second, lower copy of the tail
  // peeked out beside the first and turned it into a zigzag.
  const flat = bubblePath(x, y, w, h, 20, { ...b.tail, tx: (b.tail.a + b.tail.b) / 2, ty: y });
  const tx = x + 38;
  return (
    <g>
      <path d={flat} transform="translate(0 6)" fill={K.edge} stroke={K.ink} strokeWidth={3} />
      <path d={d} fill={K.paper} stroke={K.ink} strokeWidth={3} />
      <Mark agent="claude" x={tx + 10} y={y + 33} size={19} uid={`${P}-${b.v}-say`} v={b.v} />
      <text x={tx + 28} y={y + 33 + b.s.said * 0.36} fontSize={b.s.said} fontWeight={800} fill={K.ink}>Deployed</text>
      <text className="mono" x={tx} y={y + 67} fontSize={b.s.app} fill={K.ink}>supplier-payments.</text>
      <Avatar who="priya" x={x + 8} y={y + 5} r={20} />
    </g>
  );
}

const WIDE_CARD: CardSpec = {
  v: 'w', x: 176, y: 18, w: 408, h: 262, lenaX: 492, builderX: 442, accessX: 470, compact: false,
  s: { title: 18, admin: 14.5, name: 16, chip: 14 }, shadow: { dx: 12, dy: 16 },
};
const WIDE_BUBBLE: BubbleSpec = {
  v: 'w', x: 16, y: 300, w: 250, h: 96, tail: { a: 206, b: 234, tx: 232, ty: 286 }, s: { said: 18, app: 16 },
};

const PHONE_CARD: CardSpec = {
  v: 'p', x: 8, y: 10, w: 414, h: 262, lenaX: 334, builderX: 312, accessX: 382, compact: true,
  s: { title: 19, admin: 16, name: 17, chip: 15.5 }, shadow: { dx: 4, dy: 14 },
};
const PHONE_BUBBLE: BubbleSpec = {
  v: 'p', x: 20, y: 298, w: 262, h: 96, tail: { a: 208, b: 236, tx: 234, ty: 280 }, s: { said: 19, app: 17 },
};

export default function HeroShipsAndShowsUp() {
  const wide = useRef<SVGSVGElement>(null);
  const phone = useRef<SVGSVGElement>(null);

  // The row lands on page load. Where the picture starts below the fold (a
  // phone), hold it at the start and play it when it scrolls into view.
  useEffect(() => {
    const el = [wide.current, phone.current].find((s) => s && s.getBoundingClientRect().width > 0);
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) return;
    const anims = el.getAnimations({ subtree: true });
    anims.forEach((a) => { a.pause(); a.currentTime = 0; });
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        anims.forEach((a) => a.play());
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <svg ref={wide} viewBox="0 0 600 412" className="tb-art tb-hero-art tb-hero-wide" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
        <style>{CSS}</style>
        <Defs v="w" />
        <circle cx={330} cy={190} r={196} fill={K.sun} />
        <Card c={WIDE_CARD} />
        <Bubble b={WIDE_BUBBLE} />
      </svg>
      <svg ref={phone} viewBox="0 0 430 404" className="tb-art tb-hero-art tb-hero-phone" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
        <Defs v="p" />
        <circle cx={250} cy={236} r={168} fill={K.sun} />
        <Card c={PHONE_CARD} />
        <Bubble b={PHONE_BUBBLE} />
      </svg>
    </>
  );
}
