// The Wirl machine. Apps are marbles. They drop in from whoever built them,
// swirl through the intake, and roll past the same stations every time:
// login, who can open it, keys, the log, rollback. Nobody reviews a marble.
// The machine is the governance. Everything here is SVG and CSS.

const W = 1200;
const H = 640;

// The whirlpool intake, centred at the top. An Archimedean spiral inward.
function spiral(cx: number, cy: number, r0: number, r1: number, turns: number, steps = 120) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const th = -Math.PI / 2 + t * turns * Math.PI * 2;
    const r = r0 + (r1 - r0) * t;
    pts.push(`${(cx + r * Math.cos(th)).toFixed(1)} ${(cy + r * Math.sin(th)).toFixed(1)}`);
  }
  return pts;
}

const CX = 600;
const CY = 160;
const SPIRAL = spiral(CX, CY, 78, 6, 1.75);

// One path a marble follows from the intake to the tray.
const RUN =
  `M ${SPIRAL.join(' L ')}` +
  ` L ${CX} ${CY + 60}` + // drops out of the funnel's throat
  ` L 600 250 L 170 330` + // ramp one, down-left
  ` L 170 352 L 1030 452` + // ramp two, down-right
  ` L 1030 474 L 330 580` + // ramp three, down-left
  ` L 290 586`; // into the tray

// Three ways in. Each funnel's marbles fall onto the rim of the intake.
const FUNNELS = [
  { x: 250, label: 'Claude Code', drop: `M 250 54 L 250 96 Q 250 120 ${CX - 80} ${CY - 20}` },
  { x: 600, label: 'Cursor', drop: `M 600 54 L 600 82` },
  { x: 950, label: 'by hand', drop: `M 950 54 L 950 96 Q 950 120 ${CX + 80} ${CY - 20}` },
];

const MARBLES = ['#D95D39', '#2A9D8F', '#E9B44C', '#6B4E9B', '#D95D39', '#2A9D8F'];
const LOOP = 15; // seconds for one marble, intake to tray

function Ramp({ d }: { d: string }) {
  return (
    <>
      <path d={d} stroke="#1E1B16" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d={d} stroke="#D9C9A5" strokeWidth="9" strokeLinecap="round" fill="none" />
    </>
  );
}

export default function Machine() {
  return (
    <div className="machine relative mx-auto w-full max-w-[1200px]" aria-hidden="true">
      <style>{`
        .machine .marble { offset-rotate: 0deg; animation: run ${LOOP}s linear infinite; }
        @keyframes run { from { offset-distance: 0%; } to { offset-distance: 100%; } }
        .machine .drop { animation: drop ${LOOP}s linear infinite; opacity: 0; }
        @keyframes drop { 0% { opacity: 1; offset-distance: 0%; } 6% { opacity: 1; offset-distance: 100%; } 6.1%, 100% { opacity: 0; offset-distance: 100%; } }
        .machine .turnstile { transform-origin: 430px 292px; animation: click ${LOOP / 6}s steps(1) infinite; }
        @keyframes click { 0%, 60% { transform: rotate(0deg); } 61%, 100% { transform: rotate(90deg); } }
        .machine .stamp { animation: stamp ${LOOP / 6}s ease-in-out infinite; }
        @keyframes stamp { 0%, 55%, 100% { transform: translateY(0); } 62% { transform: translateY(16px); } 70% { transform: translateY(0); } }
        .machine .tape { animation: tape ${LOOP / 6}s steps(1) infinite; }
        @keyframes tape { 0%, 61% { opacity: 0.25; } 62%, 100% { opacity: 1; } }
        .machine .key { animation: key 5s ease-in infinite; }
        @keyframes key { 0%, 20% { transform: translateY(-46px); opacity: 0; } 25% { opacity: 1; } 55% { transform: translateY(0); opacity: 1; } 60%, 100% { transform: translateY(0); opacity: 0; } }
        .machine .vaultdoor { transform-origin: 1122px 382px; animation: door 5s ease-in-out infinite; }
        @keyframes door { 0%, 20% { transform: rotate(0deg); } 30%, 55% { transform: rotate(-70deg); } 65%, 100% { transform: rotate(0deg); } }
        .machine .spring { transform-origin: 330px 578px; animation: spring ${LOOP / 6}s ease-out infinite; }
        @keyframes spring { 0%, 70% { transform: scaleX(1); } 76% { transform: scaleX(0.6); } 84% { transform: scaleX(1.08); } 90%, 100% { transform: scaleX(1); } }
        .machine .swirlspin { transform-origin: ${CX}px ${CY}px; animation: spin 18s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .machine * { animation: none !important; } .machine .drop { opacity: 0; } }
      `}</style>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" fontFamily="inherit">
        {/* Funnels */}
        {FUNNELS.map((f) => (
          <g key={f.label}>
            <text x={f.x} y={22} textAnchor="middle" fontSize="15" fill="#1E1B16" className="machine-label">{f.label}</text>
            <path d={`M ${f.x - 46} 32 L ${f.x + 46} 32 L ${f.x + 14} 60 L ${f.x - 14} 60 Z`} fill="#F3E6C9" stroke="#1E1B16" strokeWidth="4" strokeLinejoin="round" />
            <path d={f.drop} stroke="#1E1B16" strokeWidth="4" strokeDasharray="1 10" strokeLinecap="round" fill="none" opacity="0.5" />
          </g>
        ))}

        {/* The intake: the mark, as a whirlpool */}
        <circle cx={CX} cy={CY} r="88" fill="#F3E6C9" stroke="#1E1B16" strokeWidth="4" />
        <g className="swirlspin">
          <path d={`M ${SPIRAL.join(' L ')}`} stroke="#1E1B16" strokeWidth="7" strokeLinecap="round" fill="none" />
        </g>
        <path d={`M ${CX - 14} ${CY + 82} L ${CX + 14} ${CY + 82} L ${CX + 8} ${CY + 112} L ${CX - 8} ${CY + 112} Z`} fill="#1E1B16" />
        <text x={CX + 108} y={CY + 6} fontSize="15" fill="#1E1B16" fontStyle="italic">every app goes in here</text>

        {/* Ramps */}
        <Ramp d="M 600 250 L 170 330" />
        <Ramp d="M 170 352 L 1030 452" />
        <Ramp d="M 1030 474 L 330 580" />
        {/* Rim posts */}
        {[[170, 341], [1030, 463]].map(([x, y]) => (
          <rect key={x} x={x - 10} y={y - 30} width="20" height="60" rx="6" fill="#1E1B16" />
        ))}

        {/* Station: login turnstile, on ramp one */}
        <g>
          <g className="turnstile">
            <rect x="404" y="288" width="52" height="8" rx="4" fill="#1E1B16" />
            <rect x="426" y="266" width="8" height="52" rx="4" fill="#1E1B16" />
          </g>
          <circle cx="430" cy="292" r="7" fill="#D95D39" stroke="#1E1B16" strokeWidth="3" />
          <text x="430" y="248" textAnchor="middle" fontSize="15" fill="#1E1B16" fontStyle="italic">login</text>
        </g>

        {/* Station: who can open it, a lever on ramp two */}
        <g>
          <rect x="460" y="356" width="170" height="30" rx="8" fill="#F3E6C9" stroke="#1E1B16" strokeWidth="4" />
          <text x="474" y="376" fontSize="12" fill="#1E1B16" fontWeight="700">company</text>
          <text x="546" y="376" fontSize="12" fill="#1E1B16" opacity="0.45">named</text>
          <text x="600" y="376" fontSize="12" fill="#1E1B16" opacity="0.45">public</text>
          <rect x="496" y="342" width="6" height="30" rx="3" fill="#1E1B16" />
          <circle cx="499" cy="340" r="8" fill="#2A9D8F" stroke="#1E1B16" strokeWidth="3" />
          <text x="560" y="332" textAnchor="middle" fontSize="15" fill="#1E1B16" fontStyle="italic">who can open it</text>
        </g>

        {/* Station: keys go from the browser into the vault, beside the track */}
        <g>
          <rect x="1098" y="300" width="48" height="34" rx="5" fill="#fff" stroke="#1E1B16" strokeWidth="3" />
          <rect x="1098" y="300" width="48" height="9" fill="#1E1B16" />
          <text x="1122" y="292" textAnchor="middle" fontSize="12" fill="#1E1B16" fontStyle="italic">your browser</text>
          <g className="key">
            <circle cx="1122" cy="365" r="7" fill="none" stroke="#E9B44C" strokeWidth="4" />
            <rect x="1120" y="370" width="4" height="14" fill="#E9B44C" />
            <rect x="1122" y="379" width="7" height="4" fill="#E9B44C" />
          </g>
          <rect x="1090" y="380" width="64" height="52" rx="8" fill="#4A4E69" stroke="#1E1B16" strokeWidth="4" />
          <g className="vaultdoor">
            <rect x="1096" y="386" width="52" height="40" rx="6" fill="#5B6080" stroke="#1E1B16" strokeWidth="3" />
            <circle cx="1122" cy="406" r="7" fill="none" stroke="#1E1B16" strokeWidth="3" />
          </g>
          <text x="1122" y="456" textAnchor="middle" fontSize="15" fill="#1E1B16" fontStyle="italic">keys, straight to the vault</text>
        </g>

        {/* Station: the log stamp, on ramp three */}
        <g>
          <g className="stamp">
            <rect x="626" y="470" width="44" height="34" rx="6" fill="#6B4E9B" stroke="#1E1B16" strokeWidth="4" />
            <rect x="642" y="446" width="12" height="28" rx="4" fill="#1E1B16" />
          </g>
          <rect x="580" y="520" width="8" height="30" fill="#1E1B16" />
          <g className="tape">
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={690 + i * 22} y={452 + i * 4} width="16" height="4" rx="2" fill="#1E1B16" />
            ))}
          </g>
          <text x="700" y="500" textAnchor="start" fontSize="15" fill="#1E1B16" fontStyle="italic">logged</text>
        </g>

        {/* Station: rollback, a sprung catcher before the tray */}
        <g>
          <g className="spring">
            <path d="M 330 578 l 10 -8 l 10 8 l 10 -8 l 10 8 l 10 -8 l 10 8" stroke="#1E1B16" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
          <rect x="390" y="560" width="10" height="34" rx="3" fill="#1E1B16" />
          <text x="400" y="620" textAnchor="middle" fontSize="15" fill="#1E1B16" fontStyle="italic">rolls back if it breaks</text>
        </g>

        {/* The tray: live apps, each with a lock */}
        <g>
          <path d="M 150 604 L 150 626 L 300 626 L 300 604" stroke="#1E1B16" strokeWidth="6" fill="#F3E6C9" strokeLinejoin="round" />
          {[[180, '#2A9D8F'], [214, '#E9B44C'], [248, '#D95D39']].map(([x, c]) => (
            <g key={String(x)}>
              <circle cx={Number(x)} cy={607} r="14" fill={String(c)} stroke="#1E1B16" strokeWidth="3" />
              <rect x={Number(x) + 4} y={594} width="12" height="10" rx="2" fill="#1E1B16" />
              <path d={`M ${Number(x) + 6} 594 v -4 a 4 4 0 0 1 8 0 v 4`} stroke="#1E1B16" strokeWidth="2.5" fill="none" />
            </g>
          ))}
          <text x="225" y="560" textAnchor="middle" fontSize="15" fill="#1E1B16" fontStyle="italic">live, behind your login</text>
        </g>

        {/* Marbles on the run, staggered so one passes each station every few seconds */}
        {MARBLES.map((c, i) => (
          <g key={i} className="marble" style={{ offsetPath: `path('${RUN}')`, animationDelay: `${-(i * LOOP) / MARBLES.length}s` }}>
            <circle r="14" fill={c} stroke="#1E1B16" strokeWidth="3" />
            <circle cx="-5" cy="-5" r="4" fill="#fff" opacity="0.7" />
          </g>
        ))}
        {/* Marbles dropping in from the funnels, timed to feed the run */}
        {FUNNELS.map((f, i) => (
          <g key={f.label} className="drop" style={{ offsetPath: `path('${f.drop}')`, animationDelay: `${-((i * 2) * LOOP) / MARBLES.length - 0.9}s` }}>
            <circle r="14" fill={MARBLES[i * 2]} stroke="#1E1B16" strokeWidth="3" />
          </g>
        ))}
      </svg>
    </div>
  );
}
