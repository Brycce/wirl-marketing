// Hero: Priya ships it. She cheers behind her laptop, her agent says the app
// is deployed and company-only, the app floats above with its green lock and
// harbor link, and Jonah leans in with his mug to look.

import s from './cast.module.css';
import { Bubble, Bust, C, Desk, Dots, LaptopLid, Mug, Plant, POSE, Sticker, T, Tick, Win, mirror, withPose } from './kit';

const W = 520;
const H = 600;
const DESK = 522;

const ROWS = [
  { name: 'Pier 9 Freight', amt: '$4,200', paid: false },
  { name: 'Lumen Paper', amt: '$860', paid: true },
  { name: 'Oak & Rope', amt: '$1,150', paid: false },
];

export function PayChip({ x, y, label = 'Pay', w = 62, fill = C.sun, className }: { x: number; y: number; label?: string; w?: number; fill?: string; className?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className}>
        <rect x="0" y="3" width={w} height="27" rx="9" fill={C.ink} />
        <rect x="0" y="0" width={w} height="27" rx="9" fill={fill} stroke={C.ink} strokeWidth={2.2} />
        <T x={w / 2} y={19} size={15} weight={700} anchor="middle">{label}</T>
      </g>
    </g>
  );
}

export function PaymentsApp({ w, rows = ROWS, extra }: { w: number; rows?: typeof ROWS; extra?: React.ReactNode }) {
  return (
    <g>
      <T x={22} y={36} size={22} weight={800} ls={-0.4}>Supplier payments</T>
      {extra}
      {rows.map((r, i) => {
        const y0 = 52 + i * 42;
        return (
          <g key={r.name}>
            <line x1="16" x2={w - 16} y1={y0} y2={y0} stroke="#ECE6F3" strokeWidth={2} />
            <T x={22} y={y0 + 27} size={17}>{r.name}</T>
            <T x={w - 108} y={y0 + 27} size={17} anchor="end" fill={C.dim}>{r.amt}</T>
            {r.paid ? (
              <g>
                <Tick x={w - 86} y={y0 + 21} r={8} />
                <T x={w - 72} y={y0 + 27} size={16} weight={700} fill={C.greenText}>Paid</T>
              </g>
            ) : (
              <PayChip x={w - 92} y={y0 + 7} />
            )}
          </g>
        );
      })}
    </g>
  );
}

export default function HeroScene() {
  const wall = C.sky;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={s.art} role="img" aria-label="Priya cheers behind her laptop. Her coding agent says: Deployed. Only people at Harbor can open it. Above her floats the supplier payments app with a green lock and its harbor link, and her coworker Jonah leans in with his mug to look.">
      <rect width={W} height={H} fill={wall} />

      {/* The app she just made. */}
      <g transform="translate(262 122) rotate(-2)">
        <g className={s.bob}>
          <Win x={-212} y={-110} w={424} h={216} url="harbor--supplier-payments.wirl.run" lockClass={s.shackle}>
            <PaymentsApp w={424} />
          </Win>
          <circle cx={-212 + 75} cy={-110 + 17} r={9} fill="none" stroke={C.green} strokeWidth={2.5} className={s.ring} />
        </g>
      </g>

      {/* Jonah, leaning in from the right with his mug. */}
      <g transform={`translate(454 ${DESK - 98}) rotate(-6)`}>
        <Bust
          who="jonah"
          height={180}
          face={{ eyes: 'wide', brows: 'up', mouth: 'o', look: [-2.4, -2.2], blink: s.blinkJonah }}
          arms={[
            withPose(POSE.mug, { pts: [[-38, 58], [-50, 98], [-26, 72]], hold: <Mug x={17} y={7} flip />, foreClass: s.sipJonah }),
          ]}
        />
      </g>

      {/* Priya behind her laptop, both arms up. */}
      <g transform={`translate(132 ${DESK - 150}) scale(1.06)`}>
        <Bust
          who="priya"
          height={110}
          face={{ eyes: 'happy', brows: 'up', mouth: 'grin' }}
          arms={[withPose(POSE.tada, { className: s.pumpL }), withPose(mirror(POSE.tada), { className: s.pumpR })]}
        />
      </g>

      <Desk x={10} y={DESK} w={500} panel={120} />
      <LaptopLid x={132} y={DESK} w={168} h={100}>
        <Sticker kind="claude" x={-28} y={0} size={46} rot={-8} />
        <Sticker kind="anchor" x={40} y={-24} size={24} rot={8} />
        <Sticker kind="snail" x={38} y={22} size={28} rot={-6} />
      </LaptopLid>
      <Plant x={272} y={DESK} stage={2} scale={0.95} />

      {/* The agent's reply, rising from the laptop. */}
      <Bubble x={238} y={254} w={266} h={98} tail={[262, 344, 294, 344, 224, 404]}>
        <Sticker kind="claude" x={244} y={258} size={28} rot={-8} />
        <g className={s.say}>
          <T x={268} y={288} size={20} weight={800}>Deployed.</T>
          <T x={268} y={313} size={18}>Only people at Harbor</T>
          <T x={268} y={336} size={18}>can open it.</T>
        </g>
        <Dots x={371} y={304} className={s.typing} />
      </Bubble>
    </svg>
  );
}
