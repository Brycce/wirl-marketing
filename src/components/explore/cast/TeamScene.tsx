// Let your people build: a team photo at Harbor, bookending the hero. The
// builders sit at one long table behind their laptops, each lid wearing the
// agent that person uses; Jonah, Lena and Dana stand behind; the intern who
// left pops back in as a visitor. Priya's plant has flowered.

import type { CSSProperties, ReactNode } from 'react';
import s from './cast.module.css';
import { Bust, C, Desk, LaptopLid, Mug, Ol, Plant, POSE, Sticker, T, mirror, sh, withPose, type ArmPose, type Face, type Who } from './kit';

const W = 560;
const H = 440;
const TABLE = 376;

// Every member waves when you point at them.
const HOVER_WAVE = withPose(mirror(POSE.wave), { className: s.hoverArm, foreClass: s.hoverFore });

function Member({ who, x, y, scale, face, arms = [], height, delay, children }: {
  who: Who; x: number; y: number; scale: number; face: Face; arms?: ArmPose[]; height: number; delay: number; children?: ReactNode;
}) {
  const blinkStyle: CSSProperties = { animationDelay: `${delay}s` };
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className={s.member}>
        <Bust who={who} height={height} face={{ ...face, blink: s.blinkTeam, blinkStyle }} arms={arms} />
        {children}
      </g>
    </g>
  );
}

export default function TeamScene() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={s.art} role="img" aria-label="A team photo at Harbor. Priya, Tom, Sam and Mia sit at one long table behind their laptops, stickered with Claude, Cursor, Codex and Claude. Jonah with his mug, Lena, and Dana from IT with her mug stand behind them. The intern pops in at the edge, waving, with a visitor sticker. Priya's plant has a flower now.">
      <rect width={W} height={H} fill={C.sky} />

      {/* The Harbor sign on the wall. */}
      <g transform="translate(280 44)">
        <rect x="-78" y="-24" width="156" height="48" rx="24" fill={C.white} stroke={C.ink} strokeWidth="3" />
        <circle cx="-52" cy="0" r="15" fill={C.corn} stroke={C.ink} strokeWidth="2.4" />
        <g fill="none" stroke={C.white} strokeWidth="2.4" strokeLinecap="round">
          <circle cx="-52" cy="-6.5" r="2.6" />
          <path d="M-52 -4 V8 M-56.5 -0.5 H-47.5 M-59 4 Q-58 8.5 -52 8.5 Q-46 8.5 -45 4" />
        </g>
        <T x={10} y={8} size={22} weight={800} anchor="middle" ls={-0.6}>Harbor</T>
      </g>

      {/* The intern, visiting. */}
      <Member who="intern" x={530} y={184} scale={0.92} face={{ eyes: 'happy', brows: 'up', mouth: 'grin' }} height={200} delay={0.4} arms={[withPose(POSE.wave, { pts: [[-38, 58], [-72, 50], [-76, 6]], foreClass: s.wave })]}>
        <g transform="translate(12 62) rotate(-8) scale(0.9)">
          <circle r="21" fill={C.white} stroke={C.ink} strokeWidth="2.4" />
          <T x={0} y={4} size={9} weight={800} anchor="middle" ls={0.3}>VISITOR</T>
        </g>
      </Member>

      {/* Back row, standing. */}
      <Member who="jonah" x={142} y={136} scale={0.98} face={{ mouth: 'smile', eyes: 'open', look: [0.5, 0] }} height={220} delay={1.1}
        arms={[withPose(mirror(POSE.mug), { pts: [[38, 58], [52, 92], [30, 62]], hold: <Mug x={-17} y={7} /> }), withPose(POSE.wave, { className: s.hoverArm, foreClass: s.hoverFore })]} />
      <Member who="lena" x={280} y={128} scale={0.98} face={{ mouth: 'grin', eyes: 'happy' }} height={220} delay={2.3} arms={[HOVER_WAVE]}>
        <path d="M-27 30 C-31 50 31 50 27 30" fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <Ol fill={C.violet} w={2.4}>
          <rect x="-37" y="26" width="15" height="21" rx="7" />
          <rect x="22" y="26" width="15" height="21" rx="7" />
        </Ol>
      </Member>
      <Member who="dana" x={418} y={136} scale={0.98} face={{ mouth: 'smirk', look: [-0.5, 0] }} height={220} delay={3.2}
        arms={[withPose(POSE.mug, { pts: [[-38, 58], [-52, 92], [-30, 62]], hold: <Mug x={17} y={7} flip kind="it" /> }), HOVER_WAVE]} />

      {/* Front row, at the table. */}
      <Member who="priya" x={76} y={240} scale={1.02} face={{ eyes: 'happy', brows: 'up', mouth: 'grin' }} height={150} delay={0.8}
        arms={[withPose(POSE.tada, { pts: [[-38, 58], [-58, 30], [-62, -6]], foreClass: s.hoverFore })]} />
      <Member who="tom" x={206} y={242} scale={1.02} face={{ mouth: 'grin', brows: 'up' }} height={150} delay={1.9}
        arms={[withPose(POSE.thumb, { pts: [[-38, 58], [-64, 66], [-60, 26]] }), HOVER_WAVE]} />
      <Member who="sam" x={354} y={242} scale={1.02} face={{ mouth: 'smirk', brows: 'raise', look: [-1.2, 0] }} height={150} delay={2.7} arms={[HOVER_WAVE]} />
      <Member who="mia" x={484} y={240} scale={1.02} face={{ eyes: 'happy', mouth: 'grin' }} height={150} delay={0.2} arms={[withPose(POSE.wave, { className: s.hoverArm, foreClass: s.hoverFore })]} />

      <Desk x={-12} y={TABLE} w={W + 24} panel={120} />
      <LaptopLid x={76} y={TABLE} w={116} h={78}>
        <Sticker kind="claude" x={-14} y={0} size={34} rot={-8} />
        <Sticker kind="anchor" x={34} y={-16} size={16} rot={8} />
      </LaptopLid>
      <LaptopLid x={206} y={TABLE} w={116} h={78}>
        <Sticker kind="cursor" x={0} y={0} size={34} rot={-5} peel />
      </LaptopLid>
      <LaptopLid x={354} y={TABLE} w={116} h={78}>
        <Sticker kind="codex" x={-8} y={0} size={34} rot={5} />
        <g transform="translate(34 20) rotate(-7)">
          <rect x="-19" y="-8" width="38" height="16" rx="4" fill={C.sun} stroke={C.ink} strokeWidth={1.6} />
          <T x={0} y={4} size={9} weight={800} anchor="middle" ls={0.4}>LEGAL</T>
        </g>
      </LaptopLid>
      <LaptopLid x={484} y={TABLE} w={116} h={78}>
        <Sticker kind="claude" x={0} y={0} size={34} rot={6} />
      </LaptopLid>
      <Plant x={280} y={TABLE} stage={4} />
      <rect y={TABLE + 18} width={W} height="4" fill={sh('#F7D9B4', 0.12)} />
    </svg>
  );
}
