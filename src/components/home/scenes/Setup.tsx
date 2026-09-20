// Setup, in one frame: the browser asking to connect the agent, drawn close
// up so the code and the Approve key are the size of the picture. The same
// code sits in the terminal peeking out behind, and the link you get back is
// slapped across the bottom like a sticker. Nothing here is below 17px in a
// 560-wide box, so it still reads at phone size.

import { K, Win, Term, LinkBar, Btn, Hand, MiniLock, CheckBadge, DieCut, textW } from '../kit';

const LINK = 'acme--supplier-payments.wirl.run';

export default function SetupScene() {
  const pillW = textW(LINK, 17.5, true) + 76;
  const pillX = 280 - pillW / 2;
  return (
    <svg
      viewBox="0 0 560 374"
      className="tb-art"
      role="img"
      aria-label="A browser at app.wirl.dev asking Connect Claude Code to acme.co, with the code KTQM-4821 and a hand pressing Approve. The same code shows in the terminal behind it, and the link you get back, acme--supplier-payments.wirl.run, is slapped across the bottom."
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* The terminal behind, showing the same code. It tucks 14 under the
          browser, not 6, so it reads as sitting behind rather than butted up. */}
      <Term x={422} y={84} w={120} h={132} barH={28}>
        <text className="mono" x={450} y={140} fontSize={17} fill="#B9C6BD">code</text>
        <text className="mono" x={450} y={172} fontSize={18} fill={K.sun} fontWeight={700}>KTQM-</text>
        <text className="mono" x={450} y={196} fontSize={18} fill={K.sun} fontWeight={700}>4821</text>
      </Term>

      {/* The approve screen, close up */}
      <Win x={16} y={30} w={420} h={272} bar={K.sun} barH={42}>
        <LinkBar x={78} y={36} w={186} h={30} text="app.wirl.dev" size={17} />
        <text x={46} y={122} fontSize={25} fontWeight={800} fill={K.ink}>Connect Claude Code</text>
        <text x={46} y={152} fontSize={25} fontWeight={800} fill={K.ink}>to acme.co?</text>
        <rect x={46} y={172} width={224} height={60} rx={14} fill={K.wash} stroke={K.ink} strokeWidth={2.5} strokeDasharray="7 6" />
        <text className="mono" x={158} y={213} fontSize={31} fontWeight={700} fill={K.ink} textAnchor="middle" letterSpacing="0.03em">KTQM-4821</text>
        <text x={46} y={268} fontSize={17.5} fontWeight={600} fill="#5E5A4C">Same code as your terminal.</text>
        <Btn x={288} y={180} w={132} h={44} faceClass="tb-s-approve" label="Approve" size={20} />
        <CheckBadge x={302} y={174} r={13} className="tb-s-check" />
      </Win>
      {/* The finger presses the key below the word, not through the tail of
          the p: at 216 the fingertip clears the descender by seven units. */}
      <Hand x={352} y={216} s={1.15} className="tb-s-hand" />

      {/* What comes back: the link, as a die-cut sticker over the corner */}
      <g className="tb-s-pill">
        <DieCut tilt={-2.5} cx={280} cy={318} border={8} cut={<rect x={pillX} y={296} width={pillW} height={46} rx={23} />}>
          <rect x={pillX} y={296} width={pillW} height={46} rx={23} fill={K.paper} stroke={K.ink} strokeWidth={3} />
          <MiniLock x={pillX + 28} y={317} s={1.4} />
          <text className="mono" x={pillX + 48} y={325} fontSize={17.5} fill={K.ink}>{LINK}</text>
        </DieCut>
      </g>
      {/* No confetti beside the Approve key: four shapes that stood for
          nothing, at the one place the eye should be on the button. */}
    </svg>
  );
}
