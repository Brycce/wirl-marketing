// Point the agent at Wirl: install, approve once, deploy. Three real screens
// stacked like a strip, each with a big yellow number sticker.

import { K, Win, Term, LinkBar, Btn, Hand, RoundSticker, MiniLock, CheckBadge, textW } from '../kit';
import { LogoSticker } from '../marks';

const LINK = 'harbor--supplier-payments.wirl.run';

function Num({ x, y, n, tilt }: { x: number; y: number; n: number; tilt: number }) {
  return (
    <RoundSticker
      x={x}
      y={y}
      r={24}
      border={5}
      tilt={tilt}
      face={
        <g>
          <circle r={23} fill={K.sun} stroke={K.ink} strokeWidth={3} />
          <text x={0} y={10.5} fontSize={30} fontWeight={900} fill={K.ink} textAnchor="middle">{n}</text>
        </g>
      }
    />
  );
}

export default function StepsScene() {
  const cmd = '$ claude mcp add wirl -- npx -y @wirl/mcp';
  return (
    <svg viewBox="0 0 560 650" className="tb-art" role="img" aria-label="Three steps: a terminal installs Wirl in Claude Code; a browser at app.wirl.dev asks to connect Claude Code to harbor.co with a code, and a hand presses Approve; the agent is asked to deploy and answers with the harbor--supplier-payments.wirl.run link." strokeLinecap="round" strokeLinejoin="round">
      {/* 1. Install */}
      <Term x={56} y={24} w={488} h={124} barH={34}>
        <text x={126} y={46} fontSize={14} fill="#B9C6BD">Terminal</text>
        <text className="mono" x={78} y={90} fontSize={15} fill={K.termText}>
          <tspan fill={K.sun}>$</tspan>{cmd.slice(1)}
        </text>
        <text className="mono" x={78} y={122} fontSize={15} fill={K.mint}>✓ Added MCP server wirl</text>
      </Term>
      <Num x={30} y={40} n={1} tilt={-8} />

      {/* 2. Approve, once. The same code shows in the terminal tucked behind. */}
      <g>
        <Term x={418} y={196} w={128} h={122} barH={28}>
          <text className="mono" x={462} y={250} fontSize={13} fill="#B9C6BD">code</text>
          <text className="mono" x={462} y={276} fontSize={14} fill={K.sun} fontWeight={700}>KTQM-</text>
          <text className="mono" x={462} y={296} fontSize={14} fill={K.sun} fontWeight={700}>4821</text>
        </Term>
        <Win x={44} y={184} w={408} h={226} bar={K.sun} barH={40}>
          <LinkBar x={102} y={189} w={200} h={30} text="app.wirl.dev" size={15} />
          <text x={66} y={266} fontSize={19} fontWeight={800} fill={K.ink}>Connect Claude Code to harbor.co?</text>
          <rect x={66} y={292} width={196} height={50} rx={12} fill={K.wash} stroke={K.ink} strokeWidth={2} strokeDasharray="6 5" />
          <text className="mono" x={164} y={326} fontSize={24} fontWeight={700} fill={K.ink} textAnchor="middle" letterSpacing="0.04em">KTQM-4821</text>
          <text x={66} y={378} fontSize={15} fontWeight={600} fill="#5E5A4C">Same code as your terminal.</text>
          <Btn x={284} y={298} w={150} h={40} faceClass="tb-s-approve" label="Approve" size={17} />
          <CheckBadge x={298} y={292} r={12} className="tb-s-check" />
        </Win>
        <Hand x={410} y={328} s={1} className="tb-s-hand" />
        <Num x={24} y={200} n={2} tilt={6} />
      </g>

      {/* 3. Deploy */}
      <g>
        <Term x={56} y={454} w={488} h={170} barH={36}>
          <text x={152} y={477.5} fontSize={15} fill={K.termText}>Claude Code</text>
          <text className="mono" x={78} y={522} fontSize={16} fill={K.termText}><tspan fill={K.sun}>you ›</tspan> deploy supplier-payments</text>
          <g className="tb-s-pill">
            <rect x={78} y={546} width={textW(LINK, 15, true) + 50} height={40} rx={20} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
            <MiniLock x={100} y={564.4} s={1.15} />
            <text className="mono" x={116} y={571.5} fontSize={15} fill={K.ink}>{LINK}</text>
          </g>
        </Term>
        <LogoSticker agent="claude" x={134} y={472} size={24} uid="steps-chat" />
        <g className="tb-s-confetti">
          <rect x={470} y={534} width={9} height={14} rx={2} fill={K.coral} stroke={K.ink} strokeWidth={1.8} transform="rotate(24 474 541)" />
          <rect x={500} y={560} width={9} height={14} rx={2} fill={K.mint} stroke={K.ink} strokeWidth={1.8} transform="rotate(-30 504 567)" />
          <circle cx={486} cy={590} r={5} fill={K.sun} stroke={K.ink} strokeWidth={1.8} />
          <rect x={454} y={596} width={9} height={14} rx={2} fill={K.pink} stroke={K.ink} strokeWidth={1.8} transform="rotate(60 458 603)" />
          <circle cx={516} cy={530} r={4.4} fill={K.blue} stroke={K.ink} strokeWidth={1.8} />
          <path d="M442 528 l5 -9 l5 9 z" fill={K.sun} stroke={K.ink} strokeWidth={1.8} />
        </g>
        <Num x={30} y={472} n={3} tilt={-5} />
      </g>
    </svg>
  );
}
