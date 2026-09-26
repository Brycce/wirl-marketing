// The hero: one login, many tools. A small fan of clearly different app
// windows — a budget chart, a spend-requests queue, a candidate board, and a
// supplier-payments table — stacked behind one compact Google sign-in card
// with a lock on it, and Priya's cursor pressing it.
//
// The tools being visibly different is what kills the "we sell a dashboard"
// read: four kinds of software, four bar colours, four shapes. The front
// window carries the wirl.run link so the address is always on screen, and
// the card in front is the gate. Every back window's title bar sits above the
// front window's top edge, so its name is never half-covered.
//
// No Claude Code terminal here: the connect block right beside this picture
// is already a dark agent window, and two of those read as one thing twice.

import type { ReactNode } from 'react';
import { K, Win, LinkBar, Btn, Avatar, Acme, GoogleG, NamedCursor, RoundSticker, Check, textW } from '../kit';
import { HeroSetupNight } from '../marks';

const LINK = 'acme--supplier-payments.wirl.run';
const MUTED = '#5E5A4C';

type Box = { x: number; y: number; w: number; h: number };

/* ---------- The fan: three other tools, behind ----------
   Each is a plain window whose title bar clears the front window's top edge,
   and whose body peeks out to one side. */
function BackWin({ box, rot, bar, name, size, barH, children }: {
  box: Box; rot: number; bar: string; name: string; size: number; barH: number; children: ReactNode;
}) {
  const { x, y, w, h } = box;
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <Win x={x} y={y} w={w} h={h} r={12} bar={bar} barH={barH} dots={false}>
        <text className="mono" x={x + 13} y={y + barH / 2 + size * 0.36} fontSize={size} fill={K.ink}>{name}</text>
        {children}
      </Win>
    </g>
  );
}

/* budget-lines: a bar chart. `pitch` is set so the bars that fall in the
   sliver left of the front window are whole ones, not slices. */
function ChartWin({ box, rot, size, barH, bw, pitch, x0 }: {
  box: Box; rot: number; size: number; barH: number; bw: number; pitch: number; x0: number;
}) {
  const { x, y, w, h } = box;
  const base = y + h - 24;
  const top = y + barH + 14;
  const span = base - top;
  return (
    <BackWin box={box} rot={rot} bar={K.sun} name="budget-lines" size={size} barH={barH}>
      {[0.36, 0.56, 0.3, 0.7, 0.46, 0.82].map((f, i) => (
        <rect
          key={i} x={x + x0 + i * pitch} y={base - span * f} width={bw} height={span * f} rx={3}
          fill={i === 1 ? K.green : K.sky} stroke={K.ink} strokeWidth={1.8}
        />
      ))}
      <path d={`M${x + 10} ${base + 2} H${x + w - 10}`} stroke={K.ink} strokeWidth={2.2} />
    </BackWin>
  );
}

/* spend-requests: a queue of things waiting on a yes or a no. Its right-hand
   side — the tick and the cross — is the half that shows. */
function QueueWin({ box, rot, size, barH, amounts, amtSize, amtOff = 84, tickR, offA, offD }: {
  box: Box; rot: number; size: number; barH: number; amounts: string[];
  amtSize?: number; amtOff?: number; tickR: number; offA: number; offD: number;
}) {
  const { x, y, w, h } = box;
  const n = amounts.length;
  const rowH = 28;
  const y0 = y + barH + 12;
  const pitch = (h - barH - 22 - rowH) / (n - 1);
  return (
    <BackWin box={box} rot={rot} bar={K.sky} name="spend-requests" size={size} barH={barH}>
      {amounts.map((amt, i) => {
        const ry = y0 + i * pitch;
        const cy = ry + rowH / 2;
        return (
          <g key={i}>
            <rect x={x + 8} y={ry} width={w - 16} height={rowH} rx={8} fill={K.wash} />
            <rect x={x + 18} y={ry + 10.5} width={(w - 16) * 0.3} height={7} rx={3.5} fill={K.edge} />
            {amtSize && <text x={x + w - amtOff} y={cy + amtSize * 0.36} fontSize={amtSize} fill={K.ink} textAnchor="end">{amt}</text>}
            <circle cx={x + w - offA} cy={cy} r={tickR} fill={K.green} stroke={K.ink} strokeWidth={2} />
            <Check x={x + w - offA} y={cy} s={tickR / 11} w={2.8} />
            <circle cx={x + w - offD} cy={cy} r={tickR} fill={K.tomato} stroke={K.ink} strokeWidth={2} />
            <path
              d={`M${x + w - offD - 4} ${cy - 4} l8 8 M${x + w - offD + 4} ${cy - 4} l-8 8`}
              stroke={K.paper} strokeWidth={2.6} fill="none"
            />
          </g>
        );
      })}
    </BackWin>
  );
}

/* candidate-pipeline: a board of cards in columns. Its top band is the part
   that shows, so the cards sit high in it. */
function BoardWin({ box, rot, size, barH, pitch }: { box: Box; rot: number; size: number; barH: number; pitch: number }) {
  const { x, y, w, h } = box;
  const cw = (w - 44) / 3;
  const cy0 = y + barH + 10;
  return (
    <BackWin box={box} rot={rot} bar={K.lilac} name="candidate-pipeline" size={size} barH={barH}>
      {[0, 1, 2].map((c) => {
        const cx = x + 12 + c * (cw + 10);
        return (
          <g key={c}>
            <rect x={cx} y={cy0} width={cw} height={h - barH - 22} rx={8} fill={K.wash} />
            {Array.from({ length: 3 - c }, (_, j) => {
              const cardY = cy0 + 7 + j * pitch;
              return (
                <g key={j}>
                  <rect x={cx + 6} y={cardY} width={cw - 12} height={20} rx={4} fill={K.paper} stroke={K.ink} strokeWidth={1.6} />
                  <circle cx={cx + 16} cy={cardY + 10} r={5} fill={[K.coral, K.mint, K.sky][(c + j) % 3]} stroke={K.ink} strokeWidth={1.4} />
                  <rect x={cx + 25} y={cardY + 7} width={cw - 37} height={6} rx={3} fill={K.edge} />
                </g>
              );
            })}
          </g>
        );
      })}
    </BackWin>
  );
}

/* ---------- The front window: the app, at its link ---------- */
const ROWS = [
  { name: 'Northwind Freight', amount: '$4,200', paid: true },
  { name: 'Kelp & Co', amount: '$1,180', paid: false },
];

function PayWin({ box, s }: { box: Box; s: { name: number; link: number; head: number; row: number; pill: number } }) {
  const { x, y, w, h } = box;
  const barH = 34;
  const linkY = y + barH + 10;
  const divY = linkY + 40;
  const rowX = x + 12;
  const rowW = w - 24;
  return (
    <g>
      <Win x={x} y={y} w={w} h={h} bar={K.green} barH={barH}>
        <text className="mono" x={x + 66} y={y + barH / 2 + s.name * 0.36} fontSize={s.name} fill={K.paper}>supplier-payments</text>
        <LinkBar x={x + 10} y={linkY} w={w - 20} h={28} text={LINK} size={s.link} />
        <path d={`M${x} ${divY} H${x + w}`} stroke={K.ink} strokeWidth={2.5} />
        <Acme x={x + 24} y={divY + 18} r={11} />
        <text x={x + 42} y={divY + 24} fontSize={s.head} fontWeight={800} fill={K.ink}>Supplier payments</text>
        {ROWS.map((r, i) => {
          const ry = divY + 36 + i * 36;
          const px = rowX + rowW - 90;
          return (
            <g key={r.name}>
              <rect x={rowX} y={ry} width={rowW} height={30} rx={9} fill={K.wash} />
              <text x={rowX + 12} y={ry + 20} fontSize={s.row} fill={K.ink}>{r.name}</text>
              <text x={rowX + rowW - 100} y={ry + 20} fontSize={s.row} fill={K.ink} textAnchor="end" fontWeight={800}>{r.amount}</text>
              {r.paid ? (
                <g>
                  <rect x={px} y={ry + 5} width={80} height={20} rx={10} fill={K.green} stroke={K.ink} strokeWidth={2} />
                  <text x={px + 30} y={ry + 19.5} fontSize={s.pill} fill={K.paper} fontWeight={800} textAnchor="middle">Paid</text>
                  <Check x={px + 60} y={ry + 15} s={0.78} w={2.6} />
                </g>
              ) : (
                <g>
                  <rect x={px} y={ry + 5} width={80} height={20} rx={10} fill={K.sun} stroke={K.ink} strokeWidth={2} />
                  <text x={px + 40} y={ry + 19.5} fontSize={s.pill} fill={K.ink} fontWeight={800} textAnchor="middle">Due</text>
                </g>
              )}
            </g>
          );
        })}
      </Win>
    </g>
  );
}

/* ---------- The gate: one compact sign-in card, in front of the stack ----------
   Not the account chooser (that picture belongs to the sign-in band): this is
   the short "Continue as" card, with the lock that says who it opens for. */
function SigninCard({ x, y, w, s }: { x: number; y: number; w: number; s: { label: number; btn: number } }) {
  const h = 96;
  const bx = x + 18;
  const bw = w - 36;
  const by = y + 46;
  const half = (30 + textW('Continue as Priya', s.btn)) / 2;
  return (
    <g>
      <rect x={x} y={y + 7} width={w} height={h} rx={18} fill={K.edge} stroke={K.ink} strokeWidth={3} />
      <rect x={x} y={y} width={w} height={h} rx={18} fill={K.paper} stroke={K.ink} strokeWidth={3} />
      <GoogleG x={x + 30} y={y + 26} r={9} />
      <text x={x + 46} y={y + 31} fontSize={s.label} fill={MUTED}>Sign in with Google</text>
      <g transform={`translate(${x + w - 30} ${y + 26})`}>
        <circle r={13} fill={K.green} stroke={K.ink} strokeWidth={2.2} />
        <path d="M-3.4 -1.4 V-3.8 A3.4 3.4 0 0 1 3.4 -3.8 V-1.4" fill="none" stroke={K.paper} strokeWidth={2.1} />
        <rect x={-5.2} y={-1.8} width={10.4} height={8.2} rx={2} fill={K.paper} />
      </g>
      <Btn x={bx} y={by} w={bw} h={32} fill={K.blue} edge={K.blueEdge} faceClass="tb-h-press">
        <Avatar who="priya" x={bx + bw / 2 - half + 11} y={by + 16} r={11} />
        <text x={bx + bw / 2 - half + 30} y={by + 21} fontSize={s.btn} fill={K.paper} fontWeight={800}>Continue as Priya</text>
      </Btn>
    </g>
  );
}

/* The round green sticker, down in the right-hand corner where the stack runs
   out: on the wide it crosses the queue window's bottom edge, on the phone it
   tucks under the front window's corner. Flat colour underneath it either
   way, so it covers no text. */
function CompanyOnly({ v, x, y, r }: { v: string; x: number; y: number; r: number }) {
  const k = r / 45;
  return (
    <RoundSticker
      x={x}
      y={y}
      r={r}
      tilt={-8}
      id={`hero-only-${v}`}
      big
      className="tb-h-sticker"
      peel={{ angle: -138, depth: r * 0.24 }}
      face={
        <g transform={`scale(${k})`}>
          <circle r={44} fill={K.green} stroke={K.ink} strokeWidth={3} />
          <circle r={36} fill="none" stroke={K.paper} strokeWidth={1.6} strokeDasharray="3 5" opacity={0.7} />
          <g transform="translate(0 -18)">
            <path d="M-5.4 -2 V-6 A5.4 5.4 0 0 1 5.4 -6 V-2" fill="none" stroke={K.paper} strokeWidth={3} />
            <rect x={-8.5} y={-3} width={17} height={13} rx={3.4} fill={K.paper} />
            <circle cx={0} cy={2.6} r={1.8} fill={K.green} />
          </g>
          <text x={0} y={13} fontSize={15} fontWeight={900} fill={K.paper} textAnchor="middle" letterSpacing="0.04em">COMPANY</text>
          <text x={0} y={30} fontSize={15} fontWeight={900} fill={K.paper} textAnchor="middle" letterSpacing="0.04em">ONLY</text>
        </g>
      }
    />
  );
}

const LABEL =
  'Four different internal tools stacked in a fan: a budget-lines bar chart, a spend-requests queue with tick and cross buttons, a candidate-pipeline board, and in front, supplier-payments open at acme--supplier-payments.wirl.run. A Google sign-in card reading Continue as Priya sits over the stack with a padlock on it, Priya’s cursor pressing it, and a Company only sticker on the corner.';

/* Wide: the fan on the sun disc. Three title bars clear the front window's
   top edge, the chart peeks left, the queue right, the board above. */
function Wide() {
  return (
    <svg viewBox="0 0 600 412" className="tb-art tb-hero-art tb-hero-wide" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <circle className="tb-hero-sun" cx={300} cy={196} r={212} fill={K.sun} />
      <BoardWin box={{ x: 194, y: 28, w: 204, h: 170 }} rot={-2} size={14.5} barH={28} pitch={26} />
      <ChartWin box={{ x: 4, y: 68, w: 204, h: 184 }} rot={-5} size={14.5} barH={28} bw={20} pitch={30} x0={12} />
      <QueueWin
        box={{ x: 384, y: 56, w: 212, h: 196 }} rot={3} size={14.5} barH={28}
        amounts={['$1,240', '$380', '$95', '$2,400']} amtSize={14.5} amtOff={70} tickR={11} offA={52} offD={24}
      />
      <PayWin box={{ x: 124, y: 96, w: 340, h: 214 }} s={{ name: 15, link: 14.6, head: 18, row: 15, pill: 14 }} />
      <SigninCard x={112} y={288} w={280} s={{ label: 14.5, btn: 15.5 }} />
      <NamedCursor x={358} y={344} who="priya" className="tb-h-cursor" tag={false} />
      <CompanyOnly v="w" x={526} y={294} r={42} />
    </svg>
  );
}

/* Phone: the same four tools, drawn bigger so nothing falls under 11px, with
   the sides trimmed to what still reads — two bars of the chart, the queue's
   yes and no, the board's cards. */
function Phone() {
  return (
    <svg viewBox="0 0 430 404" className="tb-art tb-hero-art tb-hero-phone" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <circle className="tb-hero-sun" cx={215} cy={198} r={202} fill={K.sun} />
      <BoardWin box={{ x: 128, y: 14, w: 210, h: 150 }} rot={-2} size={14} barH={30} pitch={32} />
      <ChartWin box={{ x: 0, y: 60, w: 148, h: 168 }} rot={-5} size={14} barH={30} bw={12} pitch={14} x0={3} />
      <QueueWin
        box={{ x: 264, y: 56, w: 166, h: 180 }} rot={2} size={14} barH={30}
        amounts={['$1,240', '$380', '$95', '$2,400']} tickR={9} offA={40} offD={18}
      />
      <PayWin box={{ x: 52, y: 92, w: 326, h: 206 }} s={{ name: 14, link: 13.6, head: 17, row: 14, pill: 13.5 }} />
      <SigninCard x={34} y={282} w={280} s={{ label: 14, btn: 15 }} />
      <NamedCursor x={276} y={344} who="priya" className="tb-h-cursor" tag={false} />
      <CompanyOnly v="p" x={374} y={348} r={42} />
    </svg>
  );
}

export default function HeroScene() {
  return (
    <>
      <HeroSetupNight />
      <Wide />
      <Phone />
    </>
  );
}
