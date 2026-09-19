// Six small spot scenes, one per card in "What you don't have to build".
// Each is a literal screen plus the person using it, drawn 200 x 156.

import type { ReactNode } from 'react';
import s from './cast.module.css';
import { Bust, C, LaptopLid, Line, Lock, Mug, Ol, POSE, Sticker, T, Tick, mirror, sh, withPose } from './kit';
import { Dachshund } from './MessScene';

const W = 200;
const H = 156;

function Spot({ label, children, floor = 128 }: { label: string; children: ReactNode; floor?: number }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={s.art} role="img" aria-label={label}>
      <rect width={W} height={H} fill={C.mint} />
      <rect y={floor} width={W} height={H - floor} fill="#C8EBD6" />
      {children}
    </svg>
  );
}

function Card({ x, y, w, h, children, shadow = true }: { x: number; y: number; w: number; h: number; children?: ReactNode; shadow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {shadow && <rect y="4" width={w} height={h} rx="10" fill={C.ink} />}
      <rect width={w} height={h} rx="10" fill={C.white} stroke={C.ink} strokeWidth={2.5} />
      {children}
    </g>
  );
}

// 1. Company sign-in: Jonah, his mug, and the sign-in card.
export function SpotSignIn() {
  return (
    <Spot label="Jonah signs in with Google: the card says Continue as jonah@harbor.co, and his cursor clicks it.">
      <Card x={60} y={14} w={134} h={108}>
        <T x={11} y={24} size={11.8} weight={800}>Sign in with Google</T>
        <g className={s.press}>
          <rect x="8" y="38" width="118" height="54" rx="9" fill="#F1EDF6" stroke={C.ink} strokeWidth={2} />
          <circle cx="21" cy="65" r="7.5" fill={C.corn} stroke={C.ink} strokeWidth={1.8} />
          <T x={21} y={69} size={9.5} weight={800} fill={C.white} anchor="middle">J</T>
          <T x={33} y={60} size={10.5} weight={600} fill={C.dim}>Continue as</T>
          <T x={33} y={76} size={10.4} weight={700} ls={-0.2}>jonah@harbor.co</T>
        </g>
      </Card>
      <g className={s.cursor}>
        <path d="M152 92 L152 114 L157.5 108.5 L162 118 L166 116 L161.6 106.8 L169 106.4 Z" fill={C.white} stroke={C.ink} strokeWidth={2.2} strokeLinejoin="round" />
      </g>
      <g transform="translate(34 88) scale(0.62)">
        <Bust
          who="jonah"
          height={80}
          face={{ eyes: 'open', mouth: 'smile', look: [2.4, 0], blink: s.blink }}
          arms={[withPose(mirror(POSE.mug), { pts: [[38, 58], [48, 102], [22, 84]], hold: <Mug x={-17} y={7} /> })]}
        />
      </g>
    </Spot>
  );
}

// 2. Company-only: the dog walker gets the door, and shrugs.
export function SpotCompanyOnly() {
  return (
    <Spot label="The dog walker from outside Harbor opens the link and gets a page that says only people at harbor.co can open this. She shrugs; her dachshund tilts its head.">
      <Card x={76} y={10} w={116} h={86}>
        <Lock x={18} y={21} scale={1.2} color={C.ink} />
        <T x={30} y={25} size={11.5} weight={800}>Harbor only</T>
        <T x={12} y={46} size={11} weight={600} fill={C.dim}>Only people at</T>
        <T x={12} y={61} size={11} weight={700}>harbor.co</T>
        <T x={12} y={76} size={11} weight={600} fill={C.dim}>can open this.</T>
      </Card>
      <g transform="translate(150 150) scale(0.6)">
        <Dachshund x={0} y={0} headClass={s.tilt} />
      </g>
      <g transform="translate(46 70) scale(0.46)">
        <Bust
          who="jo"
          height={120}
          face={{ eyes: 'open', brows: 'worried', mouth: 'wobbly' }}
          headClass={s.shrugHead}
          arms={[withPose(POSE.shrug, { className: s.shrugL }), withPose(mirror(POSE.shrug), { className: s.shrugR })]}
        />
      </g>
    </Spot>
  );
}

// 3. Keys skip the agent: a person types the key into Wirl's page, in a browser.
export function SpotKeys() {
  const dots = Array.from({ length: 11 }, (_, i) => i);
  return (
    <Spot label="A browser page with a field called STRIPE_SECRET_KEY, filled with dots, and a Save to vault button with a green lock. Priya's hand types it in. The agent is nowhere in this picture.">
      <Card x={10} y={10} w={180} h={106}>
        <T x={12} y={22} size={11} weight={700} mono fill={C.dim}>STRIPE_SECRET_KEY</T>
        <rect x="10" y="32" width="160" height="26" rx="7" fill="#F6F2FB" stroke={C.ink} strokeWidth={2} />
        {dots.map((i) => (
          <circle key={i} className={s.keyDot} style={{ animationDelay: `${i * 0.18}s` }} cx={22 + i * 12} cy="45" r="3.4" fill={C.ink} />
        ))}
        <g transform="translate(10 68)">
          <rect y="3" width="118" height="26" rx="8" fill={C.ink} />
          <rect width="118" height="26" rx="8" fill={C.sun} stroke={C.ink} strokeWidth={2} />
          <Lock x={17} y={13} scale={0.95} />
          <T x={29} y={18} size={12.5} weight={800}>Save to vault</T>
        </g>
        <g className={s.keyTick}>
          <Tick x={150} y={81} r={10} />
        </g>
      </Card>
      {/* Her hand on the keys. */}
      <Ol fill={C.metal} far={[0, -3]}>
        <path d="M96 132 H204 V160 H86 Z" />
      </Ol>
      <Line d="M104 140 H204 M100 148 H204" w={2} color={sh(C.metal, 0.3)} />
      <g className={s.typeHand}>
        <path d="M200 176 L162 138" stroke={C.ink} strokeWidth={24} strokeLinecap="round" />
        <path d="M200 176 L162 138" stroke={C.tomato} strokeWidth={18} strokeLinecap="round" />
        <g transform="translate(160 136) rotate(-60) scale(0.85)">
          <Ol fill={C.skin3} w={2.6}>
            <rect x="-10" y="-20" width="20" height="21" rx="8" />
            <rect x="-9.4" y="-30" width="5" height="16" rx="2.5" />
            <rect x="-4.6" y="-32" width="5" height="18" rx="2.5" />
            <rect x="0.2" y="-31" width="5" height="18" rx="2.5" />
            <rect x="4.8" y="-28" width="5" height="15" rx="2.5" />
          </Ol>
        </g>
      </g>
    </Spot>
  );
}

// 4. Every call is logged: Dana reads the calls, by host.
export function SpotLog() {
  const rows = [
    ['api.stripe.com', '42'],
    ['harbor-db', '318'],
    ['hooks.slack.com', '7'],
  ];
  return (
    <Spot label="Dana from IT holds her mug and reads the log: api.stripe.com 42 calls, harbor-db 318 calls, hooks.slack.com 7 calls.">
      <Card x={70} y={12} w={122} h={108}>
        <T x={10} y={21} size={11} weight={800}>Calls, by host</T>
        <Line d="M8 30 H114" w={2} color="#ECE6F3" />
        <svg x="0" y="32" width="122" height="72" viewBox="0 0 122 72" overflow="hidden">
          <g className={s.logRoll}>
            {/* Two copies of the three lines: rolling down one line at a time,
                the list comes back to where it started after three steps. */}
            {[...rows, ...rows].map(([h, n], i) => (
              <g key={i} transform={`translate(0 ${(i - 3) * 23})`}>
                <T x={10} y={16} size={9.8} weight={600} mono>{h}</T>
                <T x={112} y={16} size={10.5} weight={800} anchor="end" fill={C.violet}>{n}</T>
              </g>
            ))}
          </g>
        </svg>
      </Card>
      <g transform="translate(40 88) scale(0.56)">
        <Bust
          who="dana"
          height={100}
          face={{ eyes: 'open', mouth: 'smile', look: [2.6, -0.5], blink: s.blink }}
          arms={[withPose(POSE.mug, { pts: [[-38, 58], [-46, 102], [-20, 84]], hold: <Mug x={17} y={7} flip kind="it" /> })]}
        />
      </g>
    </Spot>
  );
}

// 5. Bad deploys undo themselves: v4 failed, so it went back to v3.
export function SpotRollback() {
  return (
    <Spot label="Two version chips: v4 failed, with a red cross, and a curved arrow takes it back to v3, which has a green tick. Priya puts a hand on her chest, relieved.">
      <path className={s.arrowDraw} d="M140 44 C 134 6, 70 4, 62 36" pathLength={100} fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <path d="M54 30 L62 40 L70 30" fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={s.arrowHead} />
      <g transform="translate(18 44)">
        <g className={s.v3}>
          <rect y="4" width="74" height="34" rx="12" fill={C.ink} />
          <rect width="74" height="34" rx="12" fill="#DDF5E6" stroke={C.ink} strokeWidth={2.5} />
          <T x={12} y={23} size={15} weight={800}>v3</T>
          <Tick x={54} y={17} r={9} />
        </g>
      </g>
      <g transform="translate(110 44)">
        <rect y="4" width="74" height="34" rx="12" fill={C.ink} />
        <rect width="74" height="34" rx="12" fill="#FFE1E1" stroke={C.ink} strokeWidth={2.5} />
        <T x={12} y={23} size={15} weight={800}>v4</T>
        <circle cx="54" cy="17" r="9" fill={C.red} stroke={C.ink} strokeWidth={2} />
        <Line d="M50.5 13.5 L57.5 20.5 M57.5 13.5 L50.5 20.5" w={2.6} color={C.white} />
      </g>
      <g transform="translate(100 108) scale(0.5)">
        <Bust who="priya" height={100} face={{ eyes: 'closed', brows: 'up', mouth: 'smile' }} arms={[mirror(POSE.chest)]} />
      </g>
    </Spot>
  );
}

// 6. Same thing on your laptop: Mia runs wirl dev.
export function SpotLocal() {
  return (
    <Spot label="Mia at her laptop, which has a Claude sticker, runs npx wirl dev in a terminal, and it says ready.">
      <g transform="translate(78 12)">
        <rect y="4" width="114" height="72" rx="10" fill={C.ink} />
        <rect width="114" height="72" rx="10" fill={C.ink} stroke={C.ink} strokeWidth={2.5} />
        <circle cx="12" cy="11" r="3" fill={C.tomato} />
        <circle cx="22" cy="11" r="3" fill={C.sun} />
        <circle cx="32" cy="11" r="3" fill={C.teal} />
        <T x={10} y={38} size={11} weight={700} mono fill="#FFF7EA">
          <tspan fill={C.sun}>$</tspan> npx wirl dev
        </T>
        <Tick x={16} y={56} r={6.5} />
        <T x={27} y={60} size={11} weight={700} mono fill="#9BE3B7">ready</T>
        <rect className={s.caret} x="66" y="50" width="7" height="13" fill="#FFF7EA" />
      </g>
      <g transform="translate(50 64) scale(0.5)">
        <Bust who="mia" height={100} face={{ eyes: 'open', brows: 'focus', mouth: 'tongue', look: [2.2, 1], blink: s.blink }} />
      </g>
      <LaptopLid x={50} y={150} w={96} h={62}>
        <Sticker kind="claude" x={-8} y={0} size={28} rot={-8} />
      </LaptopLid>
    </Spot>
  );
}

export const SPOTS = [SpotSignIn, SpotCompanyOnly, SpotKeys, SpotLog, SpotRollback, SpotLocal];
