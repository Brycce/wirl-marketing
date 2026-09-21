// Hero concept: same link, two people. One wirl.run address across the top,
// and two phones that opened it. Tom, at acme.co, gets the app. Alex, on a
// gmail account, gets a padlock and one plain sentence. Nothing to decode:
// the picture is the second half of the headline, "behind your company login".
//
// Symmetrical and still. Two small motions only: Tom's tick pops once on
// load, and every 6s the padlock's shackle jiggles, as if Alex just tried.

import type { ReactNode } from 'react';
import { K, Avatar, Btn, CheckBadge, DieCut, MiniLock, Padlock } from '../kit';

const P = 'hx-same-link-two-phones';
const LINK = 'acme--supplier-payments.wirl.run';
const MUTED = '#5E5A4C';
const ALEX = '#B07CE8'; // the outsider's colour in the Company-only band

/* Phone body, before tilt. Drawn whole: a phone cut off by the bottom of
   the picture read as a clipping mistake beside the headline, not as a hand. */
const PW = 190;
const PH = 292;
const PY = 112;
const BEZEL = 9;
const SW = PW - BEZEL * 2;
const SY = PY + BEZEL;
const STRIP = 36;

const CSS = `
.${P}-pop, .${P}-shackle { transform-box: fill-box; transform-origin: 50% 50%; }
@media (prefers-reduced-motion: no-preference) {
  .${P}-pop { animation: ${P}-pop .65s ease-out .45s 1 both; }
  .${P}-shackle { transform-origin: 50% 100%; animation: ${P}-tug 6s ease-in-out 1s infinite; }
}
@keyframes ${P}-pop { 0% { transform: scale(1); } 35% { transform: scale(1.32); } 65% { transform: scale(.94); } 100% { transform: scale(1); } }
@keyframes ${P}-tug {
  0%, 20% { transform: translateY(0) rotate(0); }
  22% { transform: translateY(-5px) rotate(-3deg); }
  24.5% { transform: translateY(0) rotate(0); }
  27% { transform: translateY(-3px) rotate(2deg); }
  29.5%, 100% { transform: translateY(0) rotate(0); }
}
`;

/* A short chunky arrow with an open head. */
function Arrow({ from, to }: { from: [number, number]; to: [number, number] }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const back = 13;
  const half = 10;
  const hx = x2 - ux * back;
  const hy = y2 - uy * back;
  const a = [hx - uy * half, hy + ux * half];
  const b = [hx + uy * half, hy - ux * half];
  return (
    <g fill="none" stroke={K.ink} strokeWidth={4.5}>
      <path d={`M${x1} ${y1} L${x2} ${y2}`} />
      <path d={`M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${x2} ${y2} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`} />
    </g>
  );
}

/* A phone held up: ink body, paper screen, the account it is signed in with
   across the top of the screen. `outer` is the side the buttons go on. */
function Phone({ x, rot, id, outer, account, children }: {
  x: number; rot: number; id: string; outer: 'left' | 'right'; account: ReactNode; children: ReactNode;
}) {
  const sx = x + BEZEL;
  const cx = x + PW / 2;
  const btnX = outer === 'left' ? x - 3.5 : x + PW - 1.5;
  return (
    <g transform={`rotate(${rot} ${cx} ${PY + PH / 2})`}>
      <defs>
        <clipPath id={`${P}-${id}`}>
          <rect x={sx} y={SY} width={SW} height={PH - BEZEL * 2} rx={20} />
        </clipPath>
      </defs>
      {/* Side buttons, peeking out of the outer edge */}
      <rect x={btnX} y={PY + 74} width={5} height={30} rx={2.5} fill={K.ink} />
      <rect x={btnX} y={PY + 114} width={5} height={30} rx={2.5} fill={K.ink} />
      <rect x={x} y={PY} width={PW} height={PH} rx={28} fill={K.ink} stroke={K.ink} strokeWidth={3} />
      <g clipPath={`url(#${P}-${id})`}>
        <rect x={sx} y={SY} width={SW} height={PH} fill={K.paper} />
        <rect x={sx} y={SY} width={SW} height={STRIP} fill={K.wash} />
        {account}
        {children}
      </g>
      {/* The earpiece, in the bezel */}
      <rect x={cx - 17} y={PY + 3} width={34} height={3.2} rx={1.6} fill="#3B4A42" />
    </g>
  );
}

/* Tom, at Acme: the app itself. */
function TomScreen({ x }: { x: number }) {
  const sx = x + BEZEL;
  const barY = SY + STRIP;
  const rowX = sx + 10;
  const rowW = SW - 20;
  const rows = [
    { name: 'Northwind', amount: '$4,200' },
    { name: 'Kelp & Co', amount: '$1,180' },
  ];
  return (
    <g>
      <rect x={sx} y={barY} width={SW} height={34} fill={K.green} />
      <path d={`M${sx} ${barY} H${sx + SW} M${sx} ${barY + 34} H${sx + SW}`} stroke={K.ink} strokeWidth={2.5} />
      <text className="mono" x={sx + 12} y={barY + 17 + 14 * 0.36} fontSize={14} fill={K.paper}>supplier-payments</text>
      {rows.map((r, i) => {
        const ry = barY + 46 + i * 58;
        return (
          <g key={r.name}>
            <rect x={rowX} y={ry} width={rowW} height={50} rx={12} fill={K.wash} />
            <text x={rowX + 13} y={ry + 22} fontSize={15} fontWeight={800} fill={K.ink}>{r.name}</text>
            <text x={rowX + 13} y={ry + 41} fontSize={15} fontWeight={600} fill={MUTED}>{r.amount}</text>
          </g>
        );
      })}
      <Btn x={rowX} y={barY + 168} w={rowW} h={44} label="Approve" size={17} />
    </g>
  );
}

/* Alex, outside Acme: the same address, and a padlock. */
function AlexScreen({ x }: { x: number }) {
  const sx = x + BEZEL;
  const mid = sx + SW / 2;
  const top = SY + STRIP;
  const s = 0.9;
  return (
    <g>
      <rect x={sx} y={top} width={SW} height={PH} fill={K.wash} />
      <path d={`M${sx} ${top} H${sx + SW}`} stroke={K.ink} strokeWidth={2.5} />
      <Padlock x={mid - 30 * s} y={top + 40} s={s} shackleClass={`${P}-shackle`} />
      {['Only people at', 'acme.co can', 'open this.'].map((t, i) => (
        <text key={t} x={mid} y={top + 151 + i * 21} fontSize={16} fontWeight={800} fill={K.ink} textAnchor="middle">{t}</text>
      ))}
    </g>
  );
}

function Account({ x, avatar, email }: { x: number; avatar: ReactNode; email: string }) {
  const sx = x + BEZEL;
  return (
    <g>
      {avatar}
      <text x={sx + 45} y={SY + STRIP / 2 + 14.5 * 0.36} fontSize={14.5} fontWeight={700} fill={K.ink}>{email}</text>
    </g>
  );
}

const LABEL =
  'One link, acme--supplier-payments.wirl.run, opened on two phones. On Tom’s phone, signed in as tom@acme.co, the supplier-payments app opens: Northwind $4,200, Kelp & Co $1,180, and an Approve button, with a green tick on the corner. On the other phone, signed in as alex@gmail.com, there is only a padlock and the words Only people at acme.co can open this.';

export default function HeroSameLinkTwoPhones() {
  const LX = 66;
  const RX = 344;
  return (
    <svg viewBox="0 0 600 412" className="tb-art tb-hero-art" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <style>{CSS}</style>
      {/* Raised 6 from the spec's cy 214 so the disc finishes inside the canvas
          instead of being sliced flat along the bottom. */}
      <g>
        <circle cx={300} cy={208} r={204} fill={K.sun} />

        {/* Tom, at acme.co */}
        <Phone
          x={LX} rot={-4} id="tom" outer="left"
          account={<Account x={LX} email="tom@acme.co" avatar={<Avatar who="tom" x={LX + BEZEL + 23} y={SY + STRIP / 2} r={13} />} />}
        >
          <TomScreen x={LX} />
        </Phone>

        {/* Alex, outside */}
        <Phone
          x={RX} rot={4} id="alex" outer="right"
          account={
            <Account
              x={RX}
              email="alex@gmail.com"
              avatar={
                <g transform={`translate(${RX + BEZEL + 23} ${SY + STRIP / 2})`}>
                  <circle r={13} fill={ALEX} stroke={K.ink} strokeWidth={2} />
                  <text x={0} y={5.4} fontSize={15} fontWeight={800} fill={K.paper} textAnchor="middle">A</text>
                </g>
              }
            />
          }
        >
          <AlexScreen x={RX} />
        </Phone>
      </g>

      {/* Tom's tick, on the phone's corner, over the bezel */}
      <g transform={`rotate(-4 ${LX + PW / 2} ${PY + PH / 2})`}>
        <CheckBadge x={LX + PW - 6} y={PY + 6} r={20} className={`${P}-pop`} />
      </g>

      {/* The link, and where it goes */}
      <DieCut big border={9} cut={<rect x={104} y={18} width={392} height={50} rx={25} />}>
        {/* Invisible: stretches the filter region so the sticker's soft
            shadow is not sliced off in a straight line across the sun. */}
        <rect x={104} y={4} width={392} height={100} fill="none" stroke="none" />
        <rect x={104} y={18} width={392} height={50} rx={25} fill={K.paper} stroke={K.ink} strokeWidth={3} />
        <MiniLock x={132} y={41} s={1.2} />
        <text className="mono" x={149} y={43 + 17 * 0.36} fontSize={17} fill={K.ink}>{LINK}</text>
      </DieCut>
      <Arrow from={[216, 84]} to={[166, PY - 5]} />
      <Arrow from={[384, 84]} to={[434, PY - 5]} />
    </svg>
  );
}
