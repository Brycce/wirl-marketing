// Share the link or the code. Left: Jonah opens the app from the link Priya
// sent him. Right: Mia pulls the code, adds an Export CSV button and ships
// v5. When she does, the button turns up in Jonah's copy.

import s from './cast.module.css';
import { Bust, C, Desk, Head, LaptopScreen, Lock, Mug, POSE, T, Tick, mirror, withPose } from './kit';

const W = 560;
const H = 290;
const DESK = 224;

function Tag({ x, y, children, w }: { x: number; y: number; children: string; w: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect y="3" width={w} height="30" rx="15" fill={C.ink} />
      <rect width={w} height="30" rx="15" fill={C.white} stroke={C.ink} strokeWidth={2.5} />
      <T x={w / 2} y={20.5} size={15.5} weight={800} anchor="middle">{children}</T>
    </g>
  );
}

function Sparkle({ x, y, className }: { x: number; y: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className}>
        <path d="M0 -10 L2.4 -2.4 L10 0 L2.4 2.4 L0 10 L-2.4 2.4 L-10 0 L-2.4 -2.4 Z" fill={C.sun} stroke={C.ink} strokeWidth={1.8} strokeLinejoin="round" />
      </g>
    </g>
  );
}

// On a phone the two halves are shown one above the other (half="link" and
// half="code"), so the words on the screens stay big enough to read.
export default function ShareScene({ half }: { half?: 'link' | 'code' }) {
  // A half stops just under the desk top, so it isn't mostly desk.
  const hh = DESK + 26;
  const box = half === 'link' ? `0 0 ${W / 2} ${hh}` : half === 'code' ? `${W / 2} 0 ${W / 2} ${hh}` : `0 0 ${W} ${H}`;
  const clipId = `share-priya-${half ?? 'both'}`;
  return (
    <svg viewBox={box} className={s.art} {...(half === 'code' ? { 'aria-hidden': true } : { role: 'img' })} aria-label={half === 'code' ? undefined : "Two desks. The link: Jonah opens the supplier payments app from a link Priya sent him in chat. The code: Mia runs npx wirl pull supplier-payments, adds an Export CSV button, and v5 is live. The new Export CSV button appears in Jonah's app, and his eyebrows jump."}>
      <rect width={W} height={H} fill={C.pink} />
      <clipPath id={clipId}>
        <circle cx="0" cy="0" r="12" />
      </clipPath>

      {/* The link: Jonah, and the app Priya sent him. */}
      <g transform="translate(52 128) scale(0.8)">
        <Bust
          who="jonah"
          height={140}
          face={{ eyes: 'open', brows: 'calm', mouth: 'smile', look: [2.6, 0.8] }}
          headClass={s.shareJump}
          arms={[withPose(mirror(POSE.mug), { pts: [[38, 58], [50, 102], [26, 80]], hold: <Mug x={-17} y={7} /> })]}
        />
      </g>
      <LaptopScreen x={96} y={62} w={166} h={150}>
        <g className={s.linkIn}>
          <g transform="translate(14 18)">
            <circle r="13" fill={C.sky} stroke={C.ink} strokeWidth={2} />
            <g clipPath={`url(#${clipId})`}>
              <g transform="translate(0 5) scale(0.3)">
                <Head who="priya" face={{ mouth: 'smile' }} />
              </g>
            </g>
            <circle r="12" fill="none" stroke={C.ink} strokeWidth={2} />
          </g>
          <rect x="30" y="5" width="118" height="27" rx="13.5" fill={C.mint} stroke={C.green} strokeWidth={2} />
          <Lock x={42} y={18.5} scale={0.8} />
          <T x={50} y={22.8} size={10.4} weight={700} fill={C.greenText} ls={-0.2}>supplier-payments</T>
        </g>
        <rect x="4" y="40" width="142" height="88" rx="8" fill={C.white} stroke={C.ink} strokeWidth={2} />
        <T x={12} y={58} size={11.5} weight={800}>Supplier payments</T>
        <T x={12} y={79} size={10.5}>Pier 9 Freight</T>
        <rect x="104" y="68" width="32" height="16" rx="5" fill={C.sun} stroke={C.ink} strokeWidth={1.6} />
        <T x={120} y={80} size={9.5} weight={700} anchor="middle">Pay</T>
        <T x={12} y={99} size={10.5}>Lumen Paper</T>
        <Tick x={120} y={95} r={6.5} />
        <g className={s.csvIn}>
          <rect x="12" y="110" width="70" height="16" rx="5" fill={C.ink} transform="translate(0 2)" />
          <rect x="12" y="110" width="70" height="16" rx="5" fill={C.sun} stroke={C.ink} strokeWidth={1.8} />
          <T x={47} y={122} size={9.5} weight={800} anchor="middle">Export CSV</T>
        </g>
      </LaptopScreen>
      <Sparkle x={192} y={180} className={s.sparkle} />

      {/* The code: Mia pulls it, changes it, ships it. */}
      <g transform="translate(508 128) scale(0.8)">
        <Bust
          who="mia"
          height={140}
          face={{ eyes: 'open', brows: 'focus', mouth: 'tongue', look: [-2.6, 1.2], blink: s.blink }}
          arms={[withPose(POSE.down, { pts: [[-38, 58], [-60, 102], [-86, 112]], hand: 'fist', rot: -80 })]}
        />
      </g>
      <LaptopScreen x={298} y={62} w={166} h={150} dark>
        <circle cx="12" cy="11" r="3.2" fill={C.tomato} />
        <circle cx="22" cy="11" r="3.2" fill={C.sun} />
        <circle cx="32" cy="11" r="3.2" fill={C.teal} />
        <T x={9} y={38} size={11.6} weight={700} mono fill="#FFF7EA"><tspan fill={C.sun}>$</tspan> npx wirl pull</T>
        <T x={17} y={55} size={11.6} weight={700} mono fill="#FFF7EA">supplier-payments</T>
        <rect className={s.typeCover} x="7" y="26" width="143" height="34" fill="#1E1824" />
        <g className={s.editIn}>
          <T x={9} y={82} size={11.6} weight={600} mono fill="#B9AFC6">+ Export CSV</T>
        </g>
        <g className={s.liveIn}>
          <Tick x={15} y={103} r={7} />
          <T x={27} y={107.5} size={11.6} weight={700} mono fill="#9BE3B7">v5 is live</T>
        </g>
      </LaptopScreen>

      <Desk x={-10} y={DESK} w={580} panel={80} />
      <Tag x={16} y={14} w={96}>The link</Tag>
      <Tag x={448} y={14} w={100}>The code</Tag>
      {!half && <path d={`M280 6 V${DESK - 6}`} stroke={C.ink} strokeWidth={2.5} strokeDasharray="2 9" strokeLinecap="round" />}
    </svg>
  );
}
