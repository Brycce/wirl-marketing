// Point the agent at Wirl: over Priya's shoulder at her screen. One sentence
// in, a link out, and a link for the key, which never goes through the agent.

import s from './cast.module.css';
import { C, HAIR_DARK, HEAD, Line, Lock, Mug, Ol, Plant, PriyaHair, Sticker, T, sh } from './kit';

const W = 560;
const H = 450;

// Priya from behind: shoulders, neck, the back of her head, and the bun.
export function PriyaBack({ nodClass }: { nodClass?: string }) {
  const skin = C.skin3;
  return (
    <g>
      <Ol fill={C.tomato} far={[-10, 0]}>
        <path d="M-66 140 C-66 82 -46 56 -16 52 L16 52 C46 56 66 82 66 140 Z" />
      </Ol>
      <Line d="M-30 64 C-26 90 -30 112 -34 140 M30 64 C26 90 30 112 34 140" w={2} color={sh(C.tomato, 0.3)} />
      <Ol fill={sh(skin, 0.16)}>
        <rect x="-11" y="12" width="22" height="46" rx="6" />
      </Ol>
      <path d="M-16 52 Q0 60 16 52" fill="none" stroke={C.ink} strokeWidth={2.4} strokeLinecap="round" />
      <g transform="translate(0 20)">
        <g className={nodClass}>
          <g transform="translate(0 -20)">
            <Ol fill={skin}>
              <ellipse cx="-27" cy="4" rx="6" ry="8" />
              <ellipse cx="27" cy="4" rx="6" ry="8" />
            </Ol>
            <Ol fill={HAIR_DARK} far={[-5, -4]} shadeFill="#241820">
              <path d={HEAD} />
            </Ol>
            <Line d="M-20 18 Q-18 -10 1 -30 M-4 27 Q-2 0 4 -30 M13 24 Q14 -4 8 -30 M24 10 Q22 -14 11 -30" w={2} color="#5A4250" />
            <PriyaHair />
          </g>
        </g>
      </g>
    </g>
  );
}

function Avatar({ x, y }: { x: number; y: number }) {
  return <Sticker kind="claude" x={x} y={y} size={22} rot={-8} />;
}

export default function DeployScene() {
  const sx = 84; // screen left
  const sw = 408; // screen width
  const r = sx + sw - 16; // right edge for messages
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={s.art} role="img" aria-label="Over Priya's shoulder: her screen shows Claude Code. She typed: Deploy this to Wirl. The agent replies with a green-locked link, harbor--supplier-payments.wirl.run, then: It needs a Stripe key. Add it in your browser, with an Add key button. Her mug and her plant, now with three leaves, sit beside the laptop.">
      <rect width={W} height={H} fill={C.mint} />
      <rect y="362" width={W} height={H - 362} fill={C.wood} />
      <rect y="362" width={W} height="7" fill={sh(C.wood, 0.1)} />

      {/* The laptop. */}
      <Ol fill={C.ink}>
        <rect x={sx - 12} y="18" width={sw + 24} height="330" rx="18" />
      </Ol>
      <rect x={sx} y="30" width={sw} height="306" rx="8" fill={C.white} />
      <circle cx={sx + sw / 2} cy="24" r="2.2" fill="#51485C" />

      {/* Claude Code, in its window. */}
      <rect x={sx} y="30" width={sw} height="40" rx="8" fill="#F6F2FB" />
      <rect x={sx} y="62" width={sw} height="8" fill="#F6F2FB" />
      <Line d={`M${sx} 70 H${sx + sw}`} w={2} color="#E4DEEE" />
      <Sticker kind="claude" x={sx + 22} y={50} size={20} rot={-6} />
      <T x={sx + 42} y={56} size={17} weight={700}>Claude Code</T>

      {/* Priya: "Deploy this to Wirl". */}
      <g className={s.dm1}>
        <g transform={`translate(${r - 200} 84)`}>
          <rect x="0" y="0" width="200" height="40" rx="14" fill={C.tomato} stroke={C.ink} strokeWidth={2.6} />
          <T x={100} y={26} size={18} weight={700} anchor="middle">Deploy this to Wirl</T>
        </g>
      </g>

      {/* Typing, then the link. */}
      <g className={s.dmDots1}>
        <Avatar x={sx + 24} y={152} />
        <rect x={sx + 42} y="138" width="64" height="30" rx="12" fill={C.white} stroke={C.ink} strokeWidth={2.4} />
        <g fill={C.dim}>
          <circle className={s.dot1} cx={sx + 60} cy="153" r="3.4" />
          <circle className={s.dot2} cx={sx + 74} cy="153" r="3.4" />
          <circle className={s.dot3} cx={sx + 88} cy="153" r="3.4" />
        </g>
      </g>
      <g className={s.dm2}>
        <Avatar x={sx + 24} y={152} />
        <rect x={sx + 42} y="138" width={sw - 58} height="82" rx="14" fill={C.white} stroke={C.ink} strokeWidth={2.6} />
        <T x={sx + 58} y={165} size={18}>Live at</T>
        <g transform={`translate(${sx + 54} 178)`}>
          <rect x="0" y="0" width={sw - 82} height="30" rx="15" fill={C.mint} stroke={C.green} strokeWidth={2.2} />
          <Lock x={17} y={15} scale={1} />
          <T x={30} y={21} size={15.5} weight={700} fill={C.greenText}>harbor--supplier-payments.wirl.run</T>
        </g>
      </g>

      {/* Typing, then the key. */}
      <g className={s.dmDots2}>
        <Avatar x={sx + 24} y={248} />
        <rect x={sx + 42} y="234" width="64" height="30" rx="12" fill={C.white} stroke={C.ink} strokeWidth={2.4} />
        <g fill={C.dim}>
          <circle className={s.dot1} cx={sx + 60} cy="249" r="3.4" />
          <circle className={s.dot2} cx={sx + 74} cy="249" r="3.4" />
          <circle className={s.dot3} cx={sx + 88} cy="249" r="3.4" />
        </g>
      </g>
      <g className={s.dm3}>
        <Avatar x={sx + 24} y={248} />
        <rect x={sx + 42} y="234" width={sw - 58} height="88" rx="14" fill={C.white} stroke={C.ink} strokeWidth={2.6} />
        <T x={sx + 58} y={260} size={18}>It needs a Stripe key.</T>
        <T x={sx + 58} y={283} size={18}>Add it in your browser:</T>
        <g transform={`translate(${sx + 58} 292)`}>
          <g className={s.glow}>
            <rect x="0" y="3" width="92" height="24" rx="8" fill={C.ink} />
            <rect x="0" y="0" width="92" height="24" rx="8" fill={C.sun} stroke={C.ink} strokeWidth={2.2} />
            <T x={46} y={17} size={14.5} weight={700} anchor="middle">Add key</T>
          </g>
        </g>
      </g>

      {/* The keyboard deck. */}
      <Ol fill={C.metal} far={[0, -5]}>
        <path d={`M${sx - 22} 348 H${sx + sw + 22} L${sx + sw + 58} 392 H${sx - 58} Z`} />
      </Ol>
      <path d={`M${sx + 8} 356 H${sx + sw - 8} L${sx + sw + 12} 378 H${sx - 12} Z`} fill={sh(C.metal, 0.1)} />
      <Line d={`M${sx + 2} 363 H${sx + sw - 2} M${sx - 6} 371 H${sx + sw + 6}`} w={2} color={sh(C.metal, 0.3)} />

      {/* Her mug and plant, which has a third leaf now. */}
      <Plant x={34} y={400} stage={3} />
      <Mug x={70} y={404} kind="plain" color={C.sun} steam />

      {/* Priya, from behind, nodding along. */}
      <g transform="translate(490 362) scale(1.4)">
        <PriyaBack nodClass={s.nod} />
      </g>
    </svg>
  );
}
