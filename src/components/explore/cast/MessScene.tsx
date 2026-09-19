// The mess, as four comic panels, numbered to match the list beside them:
// 1 a Stripe key pasted into code on a personal account, 2 the intern
// leaving with the laptop, 3 a review nobody has time for, 4 a stranger
// outside the company looking at the app on their phone.

import type { ReactNode } from 'react';
import s from './cast.module.css';
import { Bust, C, Figure, Line, Mug, Ol, POSE, T, mirror, sh, withPose } from './kit';

const PW = 262;
const PH = 244;

export function NumSticker({ n, x, y, rot = 0, r = 16 }: { n: number; x: number; y: number; rot?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <circle r={r + 1.5} cy={1.6} fill={C.ink} opacity={0.18} />
      <circle r={r} fill={C.white} stroke={C.ink} strokeWidth={2.5} />
      <T x={0} y={r * 0.38} size={r * 1.12} weight={800} anchor="middle">{n}</T>
    </g>
  );
}

function Panel({ x, y, n, rot, bg, floor, floorAt = 204, children }: { x: number; y: number; n: number; rot: number; bg: string; floor: string; floorAt?: number; children: ReactNode }) {
  const clip = `mess-clip-${n}`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={clip}>
        <rect width={PW} height={PH} rx="18" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <rect width={PW} height={PH} fill={bg} />
        <rect y={floorAt} width={PW} height={PH - floorAt} fill={floor} />
        {children}
      </g>
      <rect width={PW} height={PH} rx="18" fill="none" stroke={C.ink} strokeWidth={3} />
      <NumSticker n={n} x={4} y={4} rot={rot} />
    </g>
  );
}

// 1. A personal account, and a live Stripe key pasted into the code.
function KeyInCode() {
  return (
    <>
      {/* The laptop, screen toward us. */}
      <Ol fill={C.ink}>
        <rect x="16" y="30" width="230" height="150" rx="12" />
      </Ol>
      <rect x="24" y="38" width="214" height="134" rx="6" fill={C.white} />
      <Line d="M24 60 H238" w={2} color="#E4DEEE" />
      <T x={34} y={54} size={12.5} weight={700} fill={C.dim}>personal account</T>
      <rect x="36" y="72" width="96" height="8" rx="4" fill="#E4DEEE" />
      <rect x="50" y="88" width="132" height="8" rx="4" fill="#E4DEEE" />
      <rect x="29" y="104" width="204" height="30" rx="7" fill="#FFE1E1" stroke={C.red} strokeWidth={2.5} />
      <T x={37} y={124} size={14.6} weight={700} mono fill={C.ink}>STRIPE_KEY=&quot;sk_live_…&quot;</T>
      <rect x="50" y="146" width="80" height="8" rx="4" fill="#E4DEEE" />
      <Ol fill={C.metal} far={[0, -3]}>
        <path d="M6 180 H256 L250 192 H12 Z" />
      </Ol>
      {/* Priya, caught. */}
      <g transform="translate(212 176) scale(0.74)">
        <Bust who="priya" height={60} face={{ eyes: 'open', brows: 'worried', mouth: 'grimace', look: [-2.2, 0.5] }} />
        <g className={s.sweat}>
          <path d="M-35 -26 C-35 -26 -41 -17 -41 -13 A6 6 0 0 0 -29 -13 C-29 -17 -35 -26 -35 -26 Z" fill="#8EC5FF" stroke={C.ink} strokeWidth={2.4} strokeLinejoin="round" />
        </g>
      </g>
    </>
  );
}

// 2. The intern waves goodbye on the way out, with the laptop.
function InternLeaves() {
  return (
    <>
      {/* The door out, with daylight beyond it. */}
      <Ol fill="#F4EFE8">
        <rect x="130" y="40" width="104" height="170" rx="4" />
      </Ol>
      <rect x="140" y="50" width="84" height="160" fill="#CFE3FF" />
      <path d="M140 172 C160 158 180 166 196 160 C210 156 218 162 224 160 V210 H140 Z" fill="#9ED49A" />
      <Line d="M140 172 C160 158 180 166 196 160 C210 156 218 162 224 160" w={2} color={sh('#9ED49A', 0.35)} />
      <Ol fill={C.wood} far={[-3, 0]}>
        <path d="M224 50 L252 40 L252 222 L224 210 Z" />
      </Ol>
      <circle cx="245" cy="132" r="3.5" fill={C.ink} />
      <g transform="translate(182 20)">
        <rect x="-26" y="-12" width="52" height="24" rx="5" fill={C.red} stroke={C.ink} strokeWidth={2.4} />
        <T x={0} y={6} size={14} weight={800} fill={C.white} anchor="middle" ls={1}>EXIT</T>
      </g>
      {/* The intern, halfway out, looking back to wave. */}
      <g transform="translate(160 66) scale(0.6)">
        <Figure
          who="intern"
          stance="walk"
          legs="#4B4459"
          face={{ eyes: 'happy', brows: 'up', mouth: 'grin' }}
          back={
            <Ol fill={C.corn} far={[-4, -3]}>
              <rect x="30" y="44" width="46" height="72" rx="16" />
            </Ol>
          }
          extra={
            <>
              <Line d="M-30 42 L-24 100 M30 42 L24 100" w={7} color={sh(C.corn, 0.2)} />
              <Line d="M-12 40 L-2 74 M12 40 L2 74" w={3} color={C.tomato} />
              <g transform="translate(0 86) rotate(-4)">
                <rect x="-31" y="-12" width="62" height="26" rx="4" fill={C.white} stroke={C.ink} strokeWidth={2.6} />
                <T x={0} y={6} size={13} weight={800} anchor="middle" ls={0.3}>INTERN</T>
              </g>
            </>
          }
          arms={[
            withPose(POSE.wave, { pts: [[-38, 58], [-72, 50], [-74, 8]], foreClass: s.wave }),
            withPose(mirror(POSE.down), {
              pts: [[38, 58], [52, 100], [40, 126]],
              hand: 'grip',
              rot: 0,
              hold: (
                <g transform="translate(14 -14) rotate(8)">
                  {/* An open laptop, screen out, carried by its base. */}
                  <Ol fill={C.ink}>
                    <rect x="-6" y="-50" width="76" height="54" rx="7" />
                  </Ol>
                  <rect x="0" y="-44" width="64" height="42" rx="3" fill={C.white} />
                  <rect x="5" y="-38" width="34" height="5" rx="2.5" fill={C.ink} />
                  <rect x="5" y="-28" width="30" height="4" rx="2" fill="#E4DEEE" />
                  <rect x="44" y="-30" width="15" height="8" rx="3" fill={C.sun} stroke={C.ink} strokeWidth={1.4} />
                  <rect x="5" y="-17" width="30" height="4" rx="2" fill="#E4DEEE" />
                  <rect x="44" y="-19" width="15" height="8" rx="3" fill={C.sun} stroke={C.ink} strokeWidth={1.4} />
                  <Ol fill={C.metal} far={[0, -3]}>
                    <path d="M-10 4 H74 L80 14 H-16 Z" />
                  </Ol>
                </g>
              ),
            }),
          ]}
        />
      </g>
    </>
  );
}

// 3. Lena, a coffee, and a pile of reviews. The one on top is weeks old.
function ReviewPile() {
  const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {/* The pile, edge on. */}
      {cards.map((i) => (
        <Ol key={i} fill={i % 2 ? '#F4F0FA' : C.white} w={2.4}>
          <rect x={150 + ((i * 7) % 11) - 5} y={196 - i * 11} width="92" height="12" rx="3" />
        </Ol>
      ))}
      {/* The card on top, face up. */}
      <g transform="translate(116 22) rotate(-3)">
        <Ol fill={C.white} far={[-4, -3]} shadeFill="#EFEAF6">
          <rect x="0" y="0" width="138" height="84" rx="10" />
        </Ol>
        <circle cx="18" cy="20" r="7" fill={C.teal} stroke={C.ink} strokeWidth={2} />
        <T x={30} y={25} size={13} weight={800}>Add supplier</T>
        <T x={12} y={44} size={13} weight={800}>payments</T>
        <T x={12} y={62} size={11.5} weight={600} fill={C.dim}>review requested</T>
        <T x={12} y={77} size={11.5} weight={700} fill="#C4302F">3 weeks ago</T>
        {/* The cobweb, in the corner. */}
        <g className={s.cobweb}>
          <g fill="none" stroke={C.dim} strokeWidth={1.4} strokeLinecap="round" opacity={0.85}>
            <path d="M138 0 L108 0 M138 0 L112 16 M138 0 L126 26 M138 0 L138 30" />
            <path d="M118 0 Q124 8 118 11 Q126 14 128 20 Q134 18 138 22" />
            <path d="M128 0 Q131 4 128 6 Q132 8 133 12 Q136 11 138 13" />
          </g>
        </g>
      </g>
      {/* Lena, chin on her fist. */}
      <g transform="translate(72 118) scale(0.72)">
        <Bust
          who="lena"
          height={80}
          face={{ eyes: 'tired', brows: 'worried', mouth: 'flat', blink: s.droop }}
          arms={[withPose(mirror(POSE.down), { pts: [[38, 58], [44, 114], [18, 44]], hand: 'fist', rot: 0 })]}
          extra={
            <g>
              <path d="M-26 30 C-30 48 30 48 26 30" fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
              <Ol fill={C.violet} w={2.4}>
                <rect x="-36" y="26" width="15" height="21" rx="7" />
                <rect x="21" y="26" width="15" height="21" rx="7" />
              </Ol>
            </g>
          }
        />
      </g>
      <Mug x={32} y={216} kind="plain" steam scale={0.9} />
    </>
  );
}

// 4. Outside: a stranger with a dachshund, looking at Harbor's payments.
export function Dachshund({ x, y, flip = false, headClass }: { x: number; y: number; flip?: boolean; headClass?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <g className={s.wag}>
        <Ol fill={C.dog}>
          <path d="M-46 -26 Q-60 -40 -62 -52 Q-58 -52 -54 -44 Q-48 -34 -42 -30 Z" />
        </Ol>
      </g>
      <Ol fill={C.dog} far={[-4, -4]}>
        <rect x="-50" y="-34" width="84" height="26" rx="13" />
        <rect x="-44" y="-14" width="10" height="16" rx="4" />
        <rect x="-30" y="-14" width="10" height="16" rx="4" />
        <rect x="10" y="-14" width="10" height="16" rx="4" />
        <rect x="22" y="-14" width="10" height="16" rx="4" />
      </Ol>
      <g transform="translate(28 -30)">
        <g className={headClass}>
          <g transform="translate(-28 30)">
            <Ol fill={C.dog} far={[-3, -3]}>
              <path d="M18 -26 C18 -44 34 -58 50 -56 C60 -54 66 -46 66 -40 C66 -34 60 -32 54 -33 L40 -24 C32 -20 20 -18 18 -26 Z" />
            </Ol>
            <ellipse cx="64" cy="-40" rx="3.6" ry="3" fill={C.ink} />
            <ellipse cx="50" cy="-46" rx="2.8" ry="3.4" fill={C.ink} />
            <circle cx="51" cy="-47.2" r="1" fill={C.white} />
            <Ol fill={sh(C.dog, 0.28)} w={2.4}>
              <path d="M36 -52 C30 -52 26 -44 28 -34 C30 -30 36 -32 38 -38 C40 -44 40 -50 36 -52 Z" />
            </Ol>
            <rect x="20" y="-30" width="13" height="6" rx="3" fill={C.red} stroke={C.ink} strokeWidth={2} transform="rotate(-62 26 -27)" />
          </g>
        </g>
      </g>
    </g>
  );
}

function StrangerSees() {
  return (
    <>
      {/* A tree and the kerb, so we know it's outside. */}
      <Ol fill="#8A5A3C">
        <rect x="222" y="90" width="12" height="120" rx="4" />
      </Ol>
      <Ol fill={C.leaf} far={[-6, -5]}>
        <circle cx="228" cy="70" r="30" />
        <circle cx="206" cy="92" r="20" />
        <circle cx="250" cy="96" r="20" />
      </Ol>
      <Line d="M0 214 H262" w={2.5} color={sh('#D3DCEC', 0.25)} />
      <Dachshund x={170} y={226} flip />
      {/* Jo, jaw on the floor, phone out. */}
      <g transform="translate(92 62) scale(0.58)">
        <Figure
          who="jo"
          legs="#5068A8"
          face={{ eyes: 'wide', brows: 'up', mouth: 'bigO', look: [2, 2.2] }}
          headClass={s.jump}
          arms={[
            withPose(POSE.down, { pts: [[-38, 58], [-54, 96], [-58, 116]], hand: 'fist', rot: 0 }),
            withPose(mirror(POSE.mug), {
              pts: [[38, 58], [54, 100], [48, 64]],
              hand: 'grip',
              rot: 0,
              hold: (
                <g transform="translate(-2 14) scale(0.8)">
                  <Ol fill={C.ink}>
                    <rect x="4" y="-78" width="70" height="120" rx="12" />
                  </Ol>
                  <rect x="10" y="-70" width="58" height="104" rx="6" fill={C.white} />
                  <rect x="16" y="-62" width="34" height="7" rx="3.5" fill={C.ink} />
                  {[0, 1, 2].map((i) => (
                    <g key={i}>
                      <rect x="16" y={-44 + i * 22} width="22" height="6" rx="3" fill="#D8D1E4" />
                      <rect x="44" y={-47 + i * 22} width="18" height="12" rx="4" fill={i === 1 ? C.green : C.sun} stroke={C.ink} strokeWidth={1.6} />
                    </g>
                  ))}
                </g>
              ),
            }),
          ]}
        />
      </g>
      {/* The leash, from her hand to the collar. */}
      <path d="M58 126 C58 176 110 168 142 194" fill="none" stroke={C.ink} strokeWidth={2.4} strokeLinecap="round" />
      <g className={s.jump} style={{ animationDelay: '-.2s' }}>
        <T x={40} y={34} size={26} weight={800} fill={C.red}>?!</T>
      </g>
    </>
  );
}

export default function MessScene() {
  return (
    <svg viewBox="0 0 560 522" className={s.art} role="img" aria-label="Four panels. One: Priya grimaces next to her laptop, which shows a live Stripe key pasted into code on a personal account. Two: the intern waves goodbye on his way out the exit, the laptop with the app under his arm. Three: Lena, tired, next to a tall pile of code reviews; the one on top was requested three weeks ago and has a cobweb. Four: outside, a stranger walking a dachshund stares open-mouthed at Harbor's supplier payments on her phone.">
      <rect width="560" height="522" fill={C.peach} />
      <Panel x={12} y={14} n={1} rot={-8} bg="#FFF8F3" floor="#FBE6D8" floorAt={192}><KeyInCode /></Panel>
      <Panel x={286} y={14} n={2} rot={6} bg="#FFF8F3" floor="#FBE6D8" floorAt={210}><InternLeaves /></Panel>
      <Panel x={12} y={266} n={3} rot={-4} bg="#FFF8F3" floor="#F2C38C" floorAt={214}><ReviewPile /></Panel>
      <Panel x={286} y={266} n={4} rot={7} bg="#E4EFFF" floor="#D3DCEC" floorAt={214}><StrangerSees /></Panel>
    </svg>
  );
}

