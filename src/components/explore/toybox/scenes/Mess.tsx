// The mess: four die-cut stickers, each a literal cartoon of where internal
// tools live today. A pasted key, a laptop about to leave, a stale PR, and a
// public page crowded by strangers.

import { K, Win, LinkBar, DieCut, Arrow } from '../kit';

const box = '0 0 280 230';

/* Someone's personal Vercel, with a Stripe key pasted in. */
function PersonalVercel() {
  return (
    <svg viewBox={box} className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <DieCut cut={<rect x={22} y={26} width={236} height={176} rx={16} />} tilt={-3} cx={140} cy={115}>
        <Win x={26} y={30} w={228} h={164} barH={34} bar={K.edge}>
          <LinkBar x={36} y={72} w={208} h={28} text="priyas-app.vercel.app" size={14} lockColor="#8A8474" />
          <rect x={36} y={112} width={208} height={70} rx={10} fill={K.term} stroke={K.ink} strokeWidth={2} />
          <text className="mono" x={50} y={138} fontSize={14} fill={K.termText}>STRIPE_KEY =</text>
          <text className="mono" x={50} y={164} fontSize={14} fill={K.sun}>&quot;sk_live_51H…&quot;</text>
        </Win>
        <path
          className="tb-scribble"
          pathLength={100}
          d="M72 178 C34 176 30 147 104 145 C176 143 214 152 203 168 C193 183 118 184 72 178 C52 175 46 166 60 156"
          fill="none"
          stroke={K.tomato}
          strokeWidth={4.5}
        />
      </DieCut>
    </svg>
  );
}

/* The intern's laptop, until the intern leaves. */
function InternLaptop() {
  return (
    <svg viewBox={box} className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <DieCut
        tilt={3}
        cx={140}
        cy={115}
        cut={
          <>
            <rect x={48} y={34} width={178} height={130} rx={14} />
            <rect x={26} y={160} width={222} height={22} rx={10} />
            <rect x={160} y={12} width={78} height={70} rx={4} />
            <rect x={238} y={132} width={20} height={46} rx={6} />
          </>
        }
      >
        {/* Lid */}
        <rect x={48} y={34} width={178} height={130} rx={14} fill={K.term} stroke={K.ink} strokeWidth={3} />
        <rect x={60} y={46} width={154} height={106} rx={6} fill={K.paper} stroke={K.ink} strokeWidth={2} />
        <rect x={68} y={54} width={138} height={24} rx={12} fill={K.wash} stroke={K.ink} strokeWidth={2} />
        <text className="mono" x={80} y={71} fontSize={14} fill={K.ink}>localhost:3000</text>
        <rect x={70} y={90} width={60} height={8} rx={4} fill={K.edge} />
        <rect x={70} y={106} width={124} height={8} rx={4} fill={K.edge} />
        <rect x={70} y={122} width={96} height={8} rx={4} fill={K.edge} />
        {/* Base */}
        <path d="M30 164 H244 V172 Q244 182 232 182 H42 Q30 182 30 172 Z" fill={K.edge} stroke={K.ink} strokeWidth={3} />
        <path d="M118 164 V168 Q118 172 122 172 H152 Q156 172 156 168 V164" fill="none" stroke={K.ink} strokeWidth={2} />
        {/* Sticky note on the bezel */}
        <g className="tb-flutter">
          <g transform="rotate(7 199 48)">
            <rect x={164} y={16} width={72} height={64} rx={3} fill="#FFE66B" stroke={K.ink} strokeWidth={2.5} />
            <rect x={164} y={16} width={72} height={12} fill="#F5D640" />
            <path d="M164 28 H236" stroke={K.ink} strokeWidth={1.5} opacity={0.3} />
            <text x={200} y={49} fontSize={14} fontWeight={800} fill={K.ink} textAnchor="middle">Last day</text>
            <text x={200} y={67} fontSize={14} fontWeight={800} fill={K.tomato} textAnchor="middle">Friday!</text>
          </g>
        </g>
        {/* Coffee */}
        <path d="M240 136 H258 L256 172 Q256 178 250 178 H248 Q242 178 242 172 Z" fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <path d="M240 146 H258" stroke={K.coral} strokeWidth={4} strokeLinecap="butt" />
        <path className="tb-steam" d="M246 128 q-4 -6 0 -12 M253 126 q4 -6 0 -12" fill="none" stroke={K.ink} strokeWidth={2} opacity={0.5} />
      </DieCut>
    </svg>
  );
}

/* A pull request, waiting on an engineer. */
function StalePR() {
  return (
    <svg viewBox={box} className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <DieCut cut={<rect x={20} y={24} width={240} height={178} rx={16} />} tilt={-2} cx={140} cy={115}>
        <rect x={24} y={34} width={232} height={164} rx={16} fill={K.edge} stroke={K.ink} strokeWidth={3} />
        <rect x={24} y={28} width={232} height={164} rx={16} fill={K.paper} stroke={K.ink} strokeWidth={3} />
        {/* Open pill with the branch icon */}
        <rect x={40} y={46} width={82} height={28} rx={14} fill={K.green} stroke={K.ink} strokeWidth={2} />
        <g fill="none" stroke={K.paper} strokeWidth={2}>
          <circle cx={55} cy={54} r={2.6} />
          <circle cx={55} cy={66} r={2.6} />
          <circle cx={66} cy={66} r={2.6} />
          <path d="M55 56.6 V63.4 M66 63.4 V58 Q66 54 62 54 H60" />
        </g>
        <text x={76} y={65.5} fontSize={15} fontWeight={800} fill={K.paper}>Open</text>
        <text x={40} y={102} fontSize={16} fontWeight={800} fill={K.ink}>Add supplier payments</text>
        <text x={40} y={123} fontSize={16} fontWeight={800} fill={K.ink}>tool <tspan fill="#8A8474" fontWeight={600}>#412</tspan></text>
        {/* 23 days */}
        <g transform="translate(47 148)" fill="none" stroke={K.ink} strokeWidth={2}>
          <circle r={7} />
          <path d="M0 -3.6 V0 L2.6 1.8" />
        </g>
        <text x={60} y={153.5} fontSize={15} fontWeight={700} fill={K.ink}>23 days</text>
        <rect x={40} y={164} width={152} height={24} rx={12} fill={K.wash} stroke="#B3AB98" strokeWidth={2} />
        <text x={116} y={180.5} fontSize={13.5} fontWeight={700} fill="#77705F" textAnchor="middle">Review requested</text>
        {/* Cobweb in the corner */}
        <g className="tb-web" fill="none" stroke={K.ink} strokeWidth={1.6} opacity={0.7}>
          <path d="M254 30 L206 32 M254 30 L214 52 M254 30 L230 68 M254 30 L252 76" />
          <path d="M222 31 Q231 40 225 44 Q236 50 236 56 Q244 58 252 62" />
          <path d="M236 30.6 Q240 37 237 40 Q243 43 243 47 Q248 48 253 49" />
          <path d="M240 60 V92" strokeWidth={1.2} />
          <g transform="translate(240 97)" stroke="none" fill={K.ink}>
            <circle r={4.4} />
            <path d="M-4 -1 L-9 -4 M-4 1 L-9 3 M4 -1 L9 -4 M4 1 L9 3" stroke={K.ink} strokeWidth={1.4} />
          </g>
        </g>
      </DieCut>
    </svg>
  );
}

/* A public URL that was never meant to be public. */
function PublicAccident() {
  const rows: [number, string, number][] = [[112, '£82,000', 54], [136, '£71,500', 70], [160, '£64,000', 46]];
  return (
    <svg viewBox={box} className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <DieCut cut={<rect x={20} y={20} width={240} height={184} rx={16} />} tilt={2} cx={140} cy={115}>
        <Win x={30} y={30} w={220} h={160} barH={32} bar={K.edge}>
          <LinkBar x={40} y={70} w={200} h={26} text="salary-review.app" size={14} globe />
          {rows.map(([y, amt, w]) => (
            <g key={y}>
              <rect x={42} y={y - 10} width={w} height={9} rx={4.5} fill={K.edge} />
              <text className="mono" x={234} y={y} fontSize={14} fill={K.ink} textAnchor="end">{amt}</text>
            </g>
          ))}
        </Win>
        {/* Strangers, crowding round */}
        <Arrow x={206} y={122} color="#7FD1C9" s={0.72} rot={-14} className="tb-jit tb-jit-1" />
        <Arrow x={168} y={146} color="#F2A541" s={0.72} rot={6} className="tb-jit tb-jit-2" />
        <Arrow x={246} y={150} color="#B07CE8" s={0.72} rot={-30} className="tb-jit tb-jit-3" />
        <Arrow x={200} y={170} color="#9BD35A" s={0.72} rot={10} className="tb-jit tb-jit-4" />
        <Arrow x={128} y={116} color="#F07A9A" s={0.72} rot={-4} className="tb-jit tb-jit-5" />
      </DieCut>
    </svg>
  );
}

export default function MessStickers({ labels }: { labels: readonly string[] }) {
  const art = [<PersonalVercel key="a" />, <InternLaptop key="b" />, <StalePR key="c" />, <PublicAccident key="d" />];
  return (
    <ul className="tb-mess">
      {art.map((a, i) => (
        <li key={labels[i]}>
          {a}
          <span>{labels[i]}</span>
        </li>
      ))}
    </ul>
  );
}

