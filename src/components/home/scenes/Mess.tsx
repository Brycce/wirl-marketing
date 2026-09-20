// The mess: four die-cut stickers, each a literal cartoon of where internal
// tools live today. A pasted key, a laptop about to leave, a stale PR, and a
// public page crowded by strangers. Nothing inside them is below 17 units in
// a 280-wide box, which is about 11px when two tiles sit side by side on a
// phone.

import { K, Win, LinkBar, DieCut, Arrow } from '../kit';

const box = '0 0 280 230';

/* Someone's personal Vercel, with a Stripe key pasted in. */
function PersonalVercel() {
  return (
    <svg viewBox={box} className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <DieCut cut={<rect x={22} y={26} width={236} height={176} rx={16} />} tilt={-3} cx={140} cy={115}>
        <Win x={26} y={30} w={228} h={164} barH={34} bar={K.edge}>
          <LinkBar x={34} y={70} w={212} h={32} text="priya.vercel.app" size={17} lockColor="#8A8474" />
          <rect x={36} y={112} width={208} height={74} rx={10} fill={K.term} stroke={K.ink} strokeWidth={2} />
          <text className="mono" x={50} y={142} fontSize={17} fill={K.termText}>STRIPE_KEY =</text>
          <text className="mono" x={62} y={172} fontSize={17} fill={K.sun}>&quot;sk_live_51H…&quot;</text>
        </Win>
        <path
          className="tb-scribble"
          pathLength={100}
          d="M84 182 C40 181 36 148 116 146 C196 144 232 154 222 170 C212 186 136 188 84 182 C60 179 52 168 68 158"
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
            <rect x={44} y={34} width={184} height={130} rx={14} />
            <rect x={26} y={160} width={222} height={22} rx={10} />
            <rect x={192} y={12} width={82} height={78} rx={4} />
            <rect x={236} y={128} width={30} height={52} rx={8} />
          </>
        }
      >
        {/* Lid */}
        <rect x={44} y={34} width={184} height={130} rx={14} fill={K.term} stroke={K.ink} strokeWidth={3} />
        <rect x={56} y={46} width={160} height={106} rx={6} fill={K.paper} stroke={K.ink} strokeWidth={2} />
        <rect x={62} y={54} width={118} height={28} rx={14} fill={K.wash} stroke={K.ink} strokeWidth={2} />
        <text className="mono" x={70} y={73} fontSize={17} fill={K.ink}>localhost</text>
        <rect x={68} y={94} width={60} height={8} rx={4} fill={K.edge} />
        <rect x={68} y={110} width={126} height={8} rx={4} fill={K.edge} />
        <rect x={68} y={126} width={96} height={8} rx={4} fill={K.edge} />
        {/* Base */}
        <path d="M30 164 H244 V172 Q244 182 232 182 H42 Q30 182 30 172 Z" fill={K.edge} stroke={K.ink} strokeWidth={3} />
        <path d="M118 164 V168 Q118 172 122 172 H152 Q156 172 156 168 V164" fill="none" stroke={K.ink} strokeWidth={2} />
        {/* Sticky note on the bezel */}
        <g className="tb-flutter">
          <g transform="rotate(8 226 50)">
            <rect x={192} y={18} width={82} height={72} rx={3} fill="#FFE66B" stroke={K.ink} strokeWidth={2.5} />
            <rect x={192} y={18} width={82} height={13} fill="#F5D640" />
            <path d="M192 31 H274" stroke={K.ink} strokeWidth={1.5} opacity={0.3} />
            <text x={233} y={57} fontSize={17} fontWeight={800} fill={K.ink} textAnchor="middle">Last day</text>
            <text x={233} y={79} fontSize={17} fontWeight={800} fill={K.tomato} textAnchor="middle">Friday!</text>
          </g>
        </g>
        {/* Coffee */}
        <path d="M252 150 h4 a6 6 0 0 1 0 14 h-4" fill="none" stroke={K.ink} strokeWidth={2.5} />
        <path d="M234 144 H254 V172 Q254 178 248 178 H240 Q234 178 234 172 Z" fill={K.coral} stroke={K.ink} strokeWidth={2.5} />
        <path d="M238 150 V160" stroke={K.paper} strokeWidth={2} opacity={0.8} />
        <path className="tb-steam" d="M240 136 q-4 -6 0 -12 M248 134 q4 -6 0 -12" fill="none" stroke={K.ink} strokeWidth={2} opacity={0.5} />
      </DieCut>
    </svg>
  );
}

/* A pull request, waiting on an engineer. */
function StalePR() {
  return (
    <svg viewBox={box} className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <DieCut cut={<rect x={20} y={24} width={240} height={184} rx={16} />} tilt={-2} cx={140} cy={115}>
        <rect x={24} y={34} width={232} height={172} rx={16} fill={K.edge} stroke={K.ink} strokeWidth={3} />
        <rect x={24} y={28} width={232} height={172} rx={16} fill={K.paper} stroke={K.ink} strokeWidth={3} />
        {/* Open pill with the branch icon */}
        <rect x={38} y={44} width={92} height={30} rx={15} fill={K.green} stroke={K.ink} strokeWidth={2} />
        <g fill="none" stroke={K.paper} strokeWidth={2}>
          <circle cx={54} cy={53} r={2.8} />
          <circle cx={54} cy={65} r={2.8} />
          <circle cx={65} cy={65} r={2.8} />
          <path d="M54 55.8 V62.2 M65 62.2 V57 Q65 53 61 53 H59" />
        </g>
        <text x={76} y={65} fontSize={18} fontWeight={800} fill={K.paper}>Open</text>
        <text x={38} y={108} fontSize={17} fontWeight={800} fill={K.ink}>Add supplier payments</text>
        <text x={38} y={130} fontSize={17} fontWeight={800} fill={K.ink}>tool <tspan fill="#8A8474" fontWeight={600}>#412</tspan></text>
        {/* 23 days */}
        <g transform="translate(47 155)" fill="none" stroke={K.ink} strokeWidth={2}>
          <circle r={8} />
          <path d="M0 -4 V0 L3 2" />
        </g>
        <text x={62} y={161} fontSize={17} fontWeight={700} fill={K.ink}>23 days</text>
        <rect x={38} y={170} width={178} height={26} rx={13} fill={K.wash} stroke="#B3AB98" strokeWidth={2} />
        <text x={127} y={188} fontSize={17} fontWeight={700} fill="#77705F" textAnchor="middle">Review requested</text>
        {/* Cobweb in the corner */}
        <g className="tb-web" fill="none" stroke={K.ink} strokeWidth={1.6} opacity={0.7}>
          <path d="M254 30 L206 32 M254 30 L214 52 M254 30 L230 68 M254 30 L252 76" />
          <path d="M222 31 Q231 40 225 44 Q236 50 236 56 Q244 58 252 62" />
          <path d="M236 30.6 Q240 37 237 40 Q243 43 243 47 Q248 48 253 49" />
          <path d="M250 58 V84" strokeWidth={1.2} />
          <g transform="translate(250 89)" stroke="none" fill={K.ink}>
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
  const rows: [number, string, number][] = [[118, '$82,000', 54], [146, '$71,500', 70], [174, '$64,000', 46]];
  return (
    <svg viewBox={box} className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <DieCut cut={<rect x={20} y={20} width={240} height={184} rx={16} />} tilt={2} cx={140} cy={115}>
        <Win x={26} y={26} w={228} h={168} barH={32} bar={K.edge}>
          <LinkBar x={34} y={68} w={212} h={30} text="salary-review.app" size={17} globe />
          {rows.map(([y, amt, w]) => (
            <g key={y}>
              <rect x={38} y={y - 10} width={w} height={9} rx={4.5} fill={K.edge} />
              <text className="mono" x={244} y={y} fontSize={17} fill={K.ink} textAnchor="end">{amt}</text>
            </g>
          ))}
        </Win>
        {/* Strangers, crowding round */}
        <Arrow x={140} y={98} color="#7FD1C9" s={0.72} rot={-14} className="tb-jit tb-jit-1" />
        <Arrow x={122} y={140} color="#F2A541" s={0.72} rot={6} className="tb-jit tb-jit-2" />
        <Arrow x={252} y={112} color="#B07CE8" s={0.72} rot={-8} className="tb-jit tb-jit-3" />
        <Arrow x={196} y={172} color="#9BD35A" s={0.72} rot={-20} className="tb-jit tb-jit-4" />
        <Arrow x={70} y={156} color="#F07A9A" s={0.72} rot={-4} className="tb-jit tb-jit-5" />
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
