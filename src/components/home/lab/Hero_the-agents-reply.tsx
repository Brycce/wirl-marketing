// Hero concept: "The agent's reply". The quiet one.
//
// The headline asks, the connect block beside it installs, and this picture is
// the answer that comes back: one light chat bubble from Claude saying the app
// is deployed and who can open it, with the link in it. Priya's cursor is on
// the link, and the app it opens pops out from behind the bubble: a small
// customer-credits form, Priya already signed in.
//
// Two objects and one sticker. No prompt bubble (the headline and the connect
// block already ask), no dark surface (the connect block is the dark one), no
// second app, nothing piled on anything else. The window only tucks under the
// bubble's blank bottom padding, below the link, so nothing covers text.

import { K, Win, Btn, Acme, Avatar, NamedCursor, MiniLock } from '../kit';
import { LogoSticker } from '../marks';

const APP = 'customer-credits';
const LINK = 'acme--customer-credits.wirl.run';
const MUTED = '#5E5A4C';
const P = 'hx-the-agents-reply';

const LABEL =
  'A chat reply from Claude: “Deployed. customer-credits is live. Only people at acme.co can open it.” with the link acme--customer-credits.wirl.run in it and Priya’s cursor on the link. Behind the bubble, the app it opens: a customer-credits window with Priya signed in, an Acme “Give a credit” form with Order #4471 and Amount $40, and a green Send credit button.';

/* Once, on load: the cursor clicks the link, and the app springs out from
   behind the bubble, growing from the cursor's tip. Then it all holds still.
   Everything is drawn from the first frame; the window just starts a little
   small and tucked in. */
const css = (v: string, ox: number, oy: number) => `
@media (prefers-reduced-motion: no-preference) {
  .${P}-cur { transform-box: fill-box; transform-origin: 0 0; animation: ${P}-click .32s cubic-bezier(.3,0,.3,1) .12s both; }
  .${P}-win-${v} { transform-box: view-box; transform-origin: ${ox}px ${oy}px; animation: ${P}-pop .42s cubic-bezier(.3,1.5,.55,1) .3s both; }
}
@keyframes ${P}-click { 0%, 100% { transform: scale(1); } 40% { transform: scale(.84, .8); } }
@keyframes ${P}-pop { from { transform: scale(.85); } to { transform: scale(1); } }
`;

type Box = { x: number; y: number; w: number; h: number };

/* The bubble as one outline: a rounded box whose tail leaves the bottom edge
   between tx0 and tx1 and curls down-left to a rounded tip at (tipX, tipY). */
function bubblePath({ x, y, w, h }: Box, r: number, tx0: number, tx1: number, tipX: number, tipY: number) {
  const b = y + h;
  return [
    `M${x + r} ${y}`,
    `H${x + w - r}`,
    `A${r} ${r} 0 0 1 ${x + w} ${y + r}`,
    `V${b - r}`,
    `A${r} ${r} 0 0 1 ${x + w - r} ${b}`,
    `H${tx1}`,
    `C${tx1 - 2} ${b + 12} ${tipX + 22} ${tipY + 0.5} ${tipX + 5} ${tipY + 0.5}`,
    `C${tipX - 2} ${tipY + 0.5} ${tipX - 3.5} ${tipY - 7} ${tipX + 1.5} ${tipY - 9.5}`,
    `C${tx0 + 1} ${b + 10} ${tx0 + 1} ${b + 5} ${tx0} ${b}`,
    `H${x + r}`,
    `A${r} ${r} 0 0 1 ${x} ${b - r}`,
    `V${y + r}`,
    `A${r} ${r} 0 0 1 ${x + r} ${y}`,
    'Z',
  ].join(' ');
}

type Layout = {
  vb: [number, number];
  sun: { cx: number; cy: number; r: number };
  bubble: Box & { r: number; tx0: number; tx1: number; tipX: number; tipY: number };
  text: { x: number; y1: number; y2: number; size: number };
  link: Box & { size: number };
  cursor: { x: number; y: number; s: number };
  sticker: { x: number; y: number; size: number };
  win: Box;
  sfx: string;
};

const WIDE: Layout = {
  vb: [600, 412],
  sun: { cx: 350, cy: 232, r: 180 },
  bubble: { x: 24, y: 28, w: 456, h: 152, r: 22, tx0: 60, tx1: 100, tipX: 52, tipY: 203 },
  text: { x: 52, y1: 72, y2: 102, size: 20 },
  link: { x: 50, y: 118, w: 404, h: 42, size: 17 },
  cursor: { x: 432, y: 136, s: 0.9 },
  sticker: { x: 42, y: 228, size: 44 },
  win: { x: 296, y: 174, w: 284, h: 226 },
  sfx: 'w',
};

function Reply({ L }: { L: Layout }) {
  const { bubble: B, text: T, link: Ln, cursor: C, sticker: S } = L;
  const d = bubblePath(B, B.r, B.tx0, B.tx1, B.tipX, B.tipY);
  const lcy = Ln.y + Ln.h / 2;
  return (
    <g>
      <path d={d} transform="translate(0 6)" fill={K.edge} stroke={K.ink} strokeWidth={3} />
      <path d={d} fill={K.paper} stroke={K.ink} strokeWidth={3} />
      <text x={T.x} y={T.y1} fontSize={T.size} fontWeight={700} fill={K.ink}>
        Deployed. <tspan className="mono" fontSize={T.size * 0.92}>{APP}</tspan> is live.
      </text>
      <text x={T.x} y={T.y2} fontSize={T.size} fontWeight={700} fill={K.ink}>Only people at acme.co can open it.</text>
      <rect x={Ln.x} y={Ln.y} width={Ln.w} height={Ln.h} rx={Ln.h / 2} fill={K.wash} stroke={K.ink} strokeWidth={2} />
      <MiniLock x={Ln.x + 22} y={lcy - 1.6} s={1.1} />
      <text className="mono" x={Ln.x + 40} y={lcy + Ln.size * 0.36} fontSize={Ln.size} fill={K.ink}>{LINK}</text>
      <NamedCursor x={C.x} y={C.y} who="priya" s={C.s} tag={false} className={`${P}-cur`} />
      <LogoSticker agent="claude" uid={`${P}-${L.sfx}`} x={S.x} y={S.y} size={S.size} tilt={-6} />
    </g>
  );
}

/* The app the link opens: a plain form, Priya signed in at the top right. */
function App({ box, sfx }: { box: Box; sfx: string }) {
  const { x, y, w, h } = box;
  const barH = 42;
  const pad = 16;
  const bodyY = y + barH;
  const colW = (w - pad * 2 - 12) / 2;
  const fields = [
    { label: 'Order', value: '#4471', fx: x + pad },
    { label: 'Amount', value: '$40', fx: x + pad + colW + 12 },
  ];
  return (
    <g className={`${P}-win ${P}-win-${sfx}`}>
      <Win x={x} y={y} w={w} h={h} bar={K.green} barH={barH} dots={false}>
        <text className="mono" x={x + pad} y={y + 33} fontSize={15} fill={K.paper}>{APP}</text>
        <Avatar who="priya" x={x + w - 24} y={y + 27} r={12} />
        <Acme x={x + pad + 11} y={bodyY + 28} r={11} />
        <text x={x + pad + 29} y={bodyY + 35} fontSize={19} fontWeight={800} fill={K.ink}>Give a credit</text>
        {fields.map((f) => (
          <g key={f.label}>
            <text x={f.fx} y={bodyY + 66} fontSize={15} fontWeight={700} fill={MUTED}>{f.label}</text>
            <rect x={f.fx} y={bodyY + 74} width={colW} height={34} rx={9} fill={K.wash} stroke={K.ink} strokeWidth={2} />
            <text x={f.fx + 12} y={bodyY + 96.4} fontSize={15} fontWeight={600} fill={K.ink}>{f.value}</text>
          </g>
        ))}
        <Btn x={x + w - pad - 136} y={y + h - 58} w={136} h={38} label="Send credit" size={17} />
      </Win>
    </g>
  );
}

function Scene({ L, cls }: { L: Layout; cls: string }) {
  const [vw, vh] = L.vb;
  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      className={`tb-art tb-hero-art ${cls}`}
      role="img"
      aria-label={LABEL}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <style>{css(L.sfx, L.cursor.x, L.cursor.y)}</style>
      <circle cx={L.sun.cx} cy={L.sun.cy} r={L.sun.r} fill={K.sun} />
      <App box={L.win} sfx={L.sfx} />
      <Reply L={L} />
    </svg>
  );
}

/* Phone crop, 430 x 404: the bubble full width, the app lower right, the
   Claude sticker lower left. Swapped in below 561px by the site's
   tb-hero-wide / tb-hero-phone classes, the way the live hero does it. */
const PHONE: Layout = {
  vb: [430, 404],
  sun: { cx: 224, cy: 236, r: 160 },
  bubble: { x: 12, y: 16, w: 406, h: 148, r: 20, tx0: 46, tx1: 78, tipX: 44, tipY: 183 },
  text: { x: 34, y1: 54, y2: 82, size: 18 },
  link: { x: 30, y: 98, w: 370, h: 40, size: 15 },
  cursor: { x: 374, y: 114, s: 0.85 },
  sticker: { x: 34, y: 208, size: 40 },
  win: { x: 118, y: 160, w: 300, h: 226 },
  sfx: 'p',
};

export function HeroTheAgentsReplyPhone() {
  return <Scene L={PHONE} cls="tb-hero-phone" />;
}

/* Both crops; only one is ever on screen. */
export default function HeroTheAgentsReply() {
  return (
    <>
      <Scene L={WIDE} cls="tb-hero-wide" />
      <Scene L={PHONE} cls="tb-hero-phone" />
    </>
  );
}
