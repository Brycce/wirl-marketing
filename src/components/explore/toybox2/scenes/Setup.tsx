// Setup, in one frame: the browser asking to connect the agent, drawn close
// up so the code and the Approve key are the size of the picture. The same
// code sits in the terminal peeking out behind, and the link you get back is
// slapped across the bottom like a sticker. Nothing here is below 17px in a
// 560-wide box, so it still reads at phone size.

import { K, Win, Term, LinkBar, Btn, Hand, MiniLock, CheckBadge, DieCut, textW } from '../kit';

const LINK = 'harbor--supplier-payments.wirl.run';

export default function SetupScene() {
  const pillW = textW(LINK, 17.5, true) + 76;
  const pillX = 280 - pillW / 2;
  return (
    <svg
      viewBox="0 0 560 374"
      className="tb-art"
      role="img"
      aria-label="A browser at app.wirl.dev asking Connect Claude Code to harbor.co, with the code KTQM-4821 and a hand pressing Approve. The same code shows in the terminal behind it, and the link you get back, harbor--supplier-payments.wirl.run, is slapped across the bottom."
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* The terminal behind, showing the same code */}
      <Term x={430} y={84} w={116} h={132} barH={28}>
        <text className="mono" x={452} y={140} fontSize={17} fill="#B9C6BD">code</text>
        <text className="mono" x={452} y={172} fontSize={18} fill={K.sun} fontWeight={700}>KTQM-</text>
        <text className="mono" x={452} y={196} fontSize={18} fill={K.sun} fontWeight={700}>4821</text>
      </Term>

      {/* The approve screen, close up */}
      <Win x={16} y={30} w={420} h={272} bar={K.sun} barH={42}>
        <LinkBar x={78} y={36} w={186} h={30} text="app.wirl.dev" size={17} />
        <text x={46} y={122} fontSize={25} fontWeight={800} fill={K.ink}>Connect Claude Code</text>
        <text x={46} y={152} fontSize={25} fontWeight={800} fill={K.ink}>to harbor.co?</text>
        <rect x={46} y={172} width={224} height={60} rx={14} fill={K.wash} stroke={K.ink} strokeWidth={2.5} strokeDasharray="7 6" />
        <text className="mono" x={158} y={213} fontSize={31} fontWeight={700} fill={K.ink} textAnchor="middle" letterSpacing="0.03em">KTQM-4821</text>
        <text x={46} y={268} fontSize={17.5} fontWeight={600} fill="#5E5A4C">Same code as your terminal.</text>
        <Btn x={288} y={180} w={132} h={44} faceClass="tb-s-approve" label="Approve" size={20} />
        <CheckBadge x={302} y={174} r={13} className="tb-s-check" />
      </Win>
      <Hand x={352} y={210} s={1.15} className="tb-s-hand" />

      {/* What comes back: the link, as a die-cut sticker over the corner */}
      <g className="tb-s-pill">
        <DieCut tilt={-2.5} cx={280} cy={318} border={8} cut={<rect x={pillX} y={296} width={pillW} height={46} rx={23} />}>
          <rect x={pillX} y={296} width={pillW} height={46} rx={23} fill={K.paper} stroke={K.ink} strokeWidth={3} />
          <MiniLock x={pillX + 28} y={317} s={1.4} />
          <text className="mono" x={pillX + 48} y={325} fontSize={17.5} fill={K.ink}>{LINK}</text>
        </DieCut>
      </g>
      <g className="tb-s-confetti">
        <rect x={452} y={272} width={11} height={17} rx={2.5} fill={K.coral} stroke={K.ink} strokeWidth={2} transform="rotate(24 457 280)" />
        <circle cx={492} cy={300} r={6} fill={K.sun} stroke={K.ink} strokeWidth={2} />
        <rect x={506} y={252} width={11} height={17} rx={2.5} fill={K.mint} stroke={K.ink} strokeWidth={2} transform="rotate(-30 511 260)" />
        <path d="M478 246 l6 -11 l6 11 z" fill={K.pink} stroke={K.ink} strokeWidth={2} />
      </g>
    </svg>
  );
}
