// The built-in features, each drawn as the real screen it is, and each at a
// different scale so the middle of the page does not turn into a row of
// identical windows: a chooser with a hand in it, a settings card in front of
// a locked door, a close-up of one input, two versions side by side, and a
// link being handed over. Nothing inside a picture is below 17 units in a
// 560-wide box, which is about 11px when the picture is the width of a phone.

import { K, Win, Term, LinkBar, Btn, Hand, Avatar, AvatarStack, Harbor, GoogleG, Globe, Padlock, CheckBadge, DieCut,
  RoundSticker, NamedCursor, Stamp, CastShadow, MiniLock, Arrow } from '../kit';

const LINK = 'harbor--supplier-payments.wirl.run';
const MUTED = '#5E5A4C';

/* ---------- Sign-in: the Google account chooser, cropped close ---------- */
function AccountRow({ y, who, flash }: { y: number; who: 'priya' | 'tom'; flash?: boolean }) {
  const name = who === 'priya' ? 'Priya Nair' : 'Tom Abara';
  const email = `${who}@harbor.co`;
  return (
    <g>
      {flash && <rect className="tb-si-flash" x={34} y={y} width={388} height={72} rx={14} fill={K.blueWash} stroke={K.blue} strokeWidth={2.5} />}
      <Avatar who={who} x={76} y={y + 36} r={24} />
      <text x={114} y={y + 30} fontSize={20} fontWeight={800} fill={K.ink}>{name}</text>
      <text x={114} y={y + 55} fontSize={17.5} fontWeight={600} fill={MUTED}>{email}</text>
    </g>
  );
}

/* The card is drawn whole: the last row, Use another account, finishes well
   inside the bottom edge, so nothing reads as accidentally clipped. One
   sticker only, and it crosses one edge of the card, in the blank right half
   of Tom's row. (The tab sticker went: the card already says which app you
   are signing in to.) */
export function SigninScene() {
  return (
    <svg viewBox="0 0 560 400" className="tb-art" role="img" aria-label="A Google account chooser: Choose an account to continue to supplier-payments, with Priya Nair and Tom Abara at harbor.co. A hand taps Priya's row. A No invites sticker sits on the edge of the card." strokeLinecap="round" strokeLinejoin="round">
      {/* The chooser, close up */}
      <CastShadow x={18} y={22} w={420} h={358} r={20} dx={14} dy={16} />
      <Win x={18} y={22} w={420} h={358} r={20} barH={46} bar={K.paper} dots={false}>
        <GoogleG x={46} y={45} r={10} />
        <text x={68} y={51} fontSize={17.5} fontWeight={700} fill={MUTED}>Sign in with Google</text>
        <text x={42} y={108} fontSize={29} fontWeight={800} fill={K.ink} letterSpacing="-0.02em">Choose an account</text>
        <text x={42} y={136} fontSize={18} fontWeight={600} fill={MUTED}>to continue to <tspan fill={K.ink} fontWeight={800}>supplier-payments</tspan></text>
        <AccountRow y={154} who="priya" flash />
        <path d="M42 236 H416" stroke={K.edge} strokeWidth={2} />
        <AccountRow y={244} who="tom" />
        <path d="M42 324 H416" stroke={K.edge} strokeWidth={2} />
        <g transform="translate(76 347)">
          <circle r={19} fill={K.wash} stroke={K.ink} strokeWidth={2} />
          <circle cx={-2} cy={-5} r={5} fill="none" stroke={K.ink} strokeWidth={2} />
          <path d="M-11 9 Q-2 -2 7 9" fill="none" stroke={K.ink} strokeWidth={2} />
          <path d="M9 -8 V0 M5 -4 H13" stroke={K.ink} strokeWidth={2} />
        </g>
        <text x={114} y={354} fontSize={18} fontWeight={700} fill={K.ink}>Use another account</text>
      </Win>
      {/* Both on Priya's row: the hand choosing it, the tick confirming it. */}
      <CheckBadge x={390} y={190} r={15} className="tb-si-check" />
      <Hand x={296} y={182} s={1.05} className="tb-si-hand" />
      {/* No invites, over the card's right edge beside Tom */}
      <DieCut tilt={-8} cx={459} cy={274} cut={<rect x={376} y={246} width={166} height={56} rx={28} />} big>
        <rect x={376} y={246} width={166} height={56} rx={28} fill={K.sun} stroke={K.ink} strokeWidth={3} />
        <g transform="translate(404 274)">
          <rect x={-12} y={-9} width={24} height={18} rx={2.5} fill={K.paper} stroke={K.ink} strokeWidth={2} />
          <path d="M-11 -7.5 L0 1 L11 -7.5" fill="none" stroke={K.ink} strokeWidth={2} />
          <path d="M-15 13 L15 -13" stroke={K.tomato} strokeWidth={3.4} />
        </g>
        <text x={426} y={281} fontSize={19} fontWeight={900} fill={K.ink}>No invites</text>
      </DieCut>
    </svg>
  );
}

/* ---------- Company-only: the setting in front of the locked door ---------- */
export function OnlyScene() {
  return (
    <svg viewBox="0 0 560 418" className="tb-art" role="img" aria-label="A setting titled Who can open supplier-payments, set to Everyone at harbor.co, with Only these people and Anyone with the link as the other choices. Behind it, what someone outside Harbor, alex@gmail.com, sees at the same link: a big padlock and Only people at harbor.co can open this." strokeLinecap="round" strokeLinejoin="round">
      {/* The outsider's view. Everything in it sits right of the card in front. */}
      <CastShadow x={158} y={10} w={396} h={254} dx={12} dy={14} />
      <Win x={158} y={10} w={396} h={254} bar={K.edge} barH={40} dots={false}>
        <LinkBar x={168} y={16} w={376} h={30} text={LINK} size={16.6} />
        <Padlock x={406} y={48} s={1} shackleClass="tb-rattle" />
        <text x={436} y={196} fontSize={17.5} fontWeight={800} fill={K.ink} textAnchor="middle">Only people</text>
        <text x={436} y={218} fontSize={17.5} fontWeight={800} fill={K.ink} textAnchor="middle">at harbor.co</text>
        <text x={436} y={240} fontSize={17.5} fontWeight={800} fill={K.ink} textAnchor="middle">can open this.</text>
      </Win>
      {/* Someone outside Harbor, trying the door */}
      <g className="tb-knock">
        <Arrow x={398} y={96} color="#B07CE8" rot={-14} />
        <rect x={402} y={140} width={150} height={28} rx={14} fill="#B07CE8" stroke={K.ink} strokeWidth={2.2} />
        <text x={477} y={160} fontSize={17} fontWeight={800} fill={K.ink} textAnchor="middle">alex@gmail.com</text>
      </g>
      {/* The setting, in front */}
      <g>
        <rect x={14} y={146} width={330} height={270} rx={20} fill={K.edge} stroke={K.ink} strokeWidth={3} />
        <rect x={14} y={140} width={330} height={270} rx={20} fill={K.paper} stroke={K.ink} strokeWidth={3} />
        <text x={38} y={170} fontSize={20} fontWeight={800} fill={K.ink}>Who can open</text>
        <text x={38} y={194} fontSize={20} fontWeight={800} fill={K.ink}>supplier-payments?</text>
        {/* Everyone at harbor.co (selected). The three rows finish 12 above the
            card's own bottom edge, so the last one is not flush with it. */}
        <rect x={30} y={200} width={298} height={74} rx={16} fill={K.greenEdge} stroke={K.ink} strokeWidth={2.5} transform="translate(0 4)" />
        <rect x={30} y={200} width={298} height={74} rx={16} fill={K.green} stroke={K.ink} strokeWidth={2.5} />
        <g className="tb-only-check">
          <circle cx={56} cy={224} r={13} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
          <path d="M50 224.5 l4 4 l7.2 -7.8" fill="none" stroke={K.green} strokeWidth={3.2} />
        </g>
        <text x={80} y={231} fontSize={18} fontWeight={800} fill={K.paper}>Everyone at harbor.co</text>
        <AvatarStack x={90} y={254} r={11} who={['mia', 'sam', 'lena']} />
        <text x={136} y={260} fontSize={17} fontWeight={800} fill={K.paper}>+209</text>
        {/* Only these people */}
        <rect x={30} y={282} width={298} height={54} rx={16} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <circle cx={56} cy={309} r={12} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <text x={80} y={316} fontSize={18} fontWeight={800} fill={K.ink}>Only these people</text>
        <AvatarStack x={268} y={309} r={11} who={['priya', 'tom', 'lena']} step={15} />
        {/* Anyone with the link */}
        <rect x={30} y={344} width={298} height={54} rx={16} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <circle cx={56} cy={371} r={12} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <text x={80} y={378} fontSize={17.5} fontWeight={800} fill={K.ink}>Anyone with the link</text>
        <Globe x={302} y={371} r={10} color={K.ink} />
      </g>
    </svg>
  );
}

/* ---------- Keys: a close-up of the one field, and the code that never holds it ---------- */
export function KeysScene() {
  const dots = Array.from({ length: 10 }, (_, i) => i);
  return (
    <svg viewBox="0 0 560 400" className="tb-art" role="img" aria-label="A browser at app.wirl.dev titled Keys, supplier-payments: a STRIPE_KEY field full of dots, a Save to vault button, and a Saved to vault toast. Above it the code only names env.STRIPE_KEY, and a sticker says the agent never sees it." strokeLinecap="round" strokeLinejoin="round">
      {/* The code: only the name. It clears the vault window below it rather
          than kissing its title bar, so neither window looks sliced. */}
      <Win x={8} y={4} w={316} h={104} barH={32} bar={K.edge}>
        <text className="mono" x={80} y={26} fontSize={17} fill={K.ink}>pay.ts</text>
        <rect x={130} y={52} width={160} height={26} rx={6} fill={K.sun} />
        <text className="mono" x={24} y={72} fontSize={17} fill={K.ink}><tspan fill="#8E7CF0">new</tspan> Stripe(env.STRIPE_KEY)</text>
        <text className="mono" x={24} y={98} fontSize={17} fill="#8A8474">{'// no key in here'}</text>
      </Win>
      {/* The vault form, close up */}
      <CastShadow x={110} y={120} w={420} h={256} r={16} dx={14} dy={16} light />
      <Win x={110} y={120} w={420} h={256} bar={K.sun} barH={42}>
        <LinkBar x={172} y={126} w={190} h={30} text="app.wirl.dev" size={17} />
        <text x={140} y={204} fontSize={21} fontWeight={800} fill={K.ink}>Keys · <tspan fontWeight={700}>supplier-payments</tspan></text>
        <text className="mono" x={140} y={236} fontSize={17.5} fontWeight={700} fill={MUTED}>STRIPE_KEY</text>
        <rect x={140} y={248} width={372} height={50} rx={14} fill={K.wash} stroke={K.ink} strokeWidth={2.5} />
        {dots.map((i) => <circle key={i} className={`tb-k-dot tb-k-dot-${i}`} cx={166 + i * 24} cy={273} r={7} fill={K.ink} />)}
        <rect className="tb-k-caret" x={400} y={258} width={3} height={30} fill={K.blue} />
        <Btn x={362} y={314} w={150} h={44} label="Save to vault" size={18} faceClass="tb-k-save" />
      </Win>
      {/* Agent never sees it, slapped on the vault window's top-right corner */}
      <RoundSticker
        x={496}
        y={86}
        r={48}
        border={6}
        tilt={10}
        big
        face={
          <g>
            <circle r={47} fill={K.lilac} stroke={K.ink} strokeWidth={3} />
            <g transform="translate(0 -26)" fill="none" stroke={K.ink} strokeWidth={2.4}>
              <path d="M-12 0 Q0 -10 12 0 Q0 10 -12 0 Z" fill={K.paper} />
              <circle r={3.6} fill={K.ink} />
              <path d="M-13 9 L13 -9" stroke={K.tomato} strokeWidth={3.2} />
            </g>
            <text x={0} y={-1} fontSize={17} fontWeight={900} fill={K.ink} textAnchor="middle">AGENT</text>
            <text x={0} y={18} fontSize={17} fontWeight={900} fill={K.ink} textAnchor="middle">NEVER</text>
            <text x={0} y={37} fontSize={17} fontWeight={900} fill={K.ink} textAnchor="middle">SEES IT</text>
          </g>
        }
      />
      {/* The toast, on the vault's bottom-left corner. It used to sit level
          with Save to vault and twenty units from it: two green pills of the
          same size side by side, which read as a crowd rather than as a
          button and its answer. Now there is a whole card between them. */}
      <g className="tb-k-toast">
        <rect x={62} y={348} width={216} height={46} rx={23} fill={K.greenEdge} stroke={K.ink} strokeWidth={2.5} transform="translate(0 4)" />
        <rect x={62} y={348} width={216} height={46} rx={23} fill={K.green} stroke={K.ink} strokeWidth={2.5} />
        <MiniLock x={90} y={369} s={1.5} color={K.paper} />
        <text x={112} y={378} fontSize={17.5} fontWeight={800} fill={K.paper}>Saved to vault</text>
      </g>
    </svg>
  );
}

/* ---------- Rollback: v4 broke, it went back to v3, and the log says so ---------- */
function AppWin({ x, y, v, broken }: { x: number; y: number; v: string; broken?: boolean }) {
  return (
    <Win x={x} y={y} w={236} h={200} bar={K.green} barH={40}>
      <rect x={x + 164} y={y + 8} width={58} height={24} rx={12} fill={K.paper} stroke={K.ink} strokeWidth={2} />
      <text className="mono" x={x + 193} y={y + 26} fontSize={18} fontWeight={800} fill={K.ink} textAnchor="middle">{v}</text>
      <Harbor x={x + 26} y={y + 64} r={11} />
      <text x={x + 44} y={y + 71} fontSize={17} fontWeight={800} fill={K.ink}>Supplier payments</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x + 14} y={y + 88 + i * 34} width={208} height={26} rx={8} fill={broken ? '#F6E3DC' : K.wash} />
          <rect x={x + 24} y={y + 97 + i * 34} width={[80, 56, 70][i]} height={8} rx={4} fill={broken ? '#E9C4B8' : K.edge} />
          <rect x={x + 170} y={y + 94 + i * 34} width={42} height={14} rx={7} fill={broken ? '#E9C4B8' : i === 0 ? K.green : K.sun} />
        </g>
      ))}
      {broken && <path d={`M${x + 20} ${y + 186} l12 -8 l10 6 l12 -9`} fill="none" stroke={K.tomato} strokeWidth={2.5} opacity={0.6} />}
    </Win>
  );
}

function Err({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <g className="tb-rb-err">
        <rect x={-32} y={-16} width={64} height={32} rx={16} fill={K.tomatoEdge} stroke={K.ink} strokeWidth={2.5} transform="translate(0 4)" />
        <rect x={-32} y={-16} width={64} height={32} rx={16} fill={K.tomato} stroke={K.ink} strokeWidth={2.5} />
        <text className="mono" x={0} y={7} fontSize={18} fontWeight={800} fill={K.paper} textAnchor="middle">500</text>
      </g>
    </g>
  );
}

export function RollbackScene() {
  const arrow = 'M478 112 C462 26 202 16 172 92';
  return (
    <svg viewBox="0 0 560 384" className="tb-art" role="img" aria-label="Two versions of supplier-payments. The new v4 throws a 500 and is stamped ROLLED BACK; a big arrow swings back to v3, which wears the Live badge." strokeLinecap="round" strokeLinejoin="round">
      <AppWin x={20} y={124} v="v3" />
      <g className="tb-rb-shake">
        <AppWin x={296} y={124} v="v4" broken />
        {/* One 500, on v4's own top edge in the clear run between the version
            badge and the Live pill's seat over on the left, so it is never
            under the Live pill on its way across. The second one hung off the
            right edge, where it cut the K off ROLLED BACK and met the band's
            edge on a phone; the count below already says how many. */}
        <Err x={417} y={124} rot={-10} />
        <g className="tb-rb-fail">
          <rect x={322} y={328} width={222} height={34} rx={17} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
          <text x={433} y={352} fontSize={18} fontWeight={800} fill={K.ink} textAnchor="middle">5 failures in 12 min</text>
        </g>
        <Stamp x={414} y={244} text="ROLLED BACK" size={22} rot={-12} className="tb-rb-stamp" />
      </g>
      {/* The arrow back. It leaves v4's own top edge and lands clear to the
          right of the Live badge instead of through it. Drawn at rest, so the
          picture never reads as empty. */}
      <g className="tb-rb-arrow">
        <path d={arrow} fill="none" stroke={K.ink} strokeWidth={22} />
        <path d={arrow} fill="none" stroke={K.sun} strokeWidth={13} />
        <path d="M146 78 L176 118 L200 76 Z" fill={K.sun} stroke={K.ink} strokeWidth={3.5} />
      </g>
      {/* Live, back on v3 */}
      <g className="tb-rb-live">
        <rect x={30} y={92} width={92} height={36} rx={18} fill={K.greenEdge} stroke={K.ink} strokeWidth={2.5} transform="translate(0 4)" />
        <rect x={30} y={92} width={92} height={36} rx={18} fill={K.green} stroke={K.ink} strokeWidth={2.5} />
        <circle cx={53} cy={110} r={6} fill={K.mint} stroke={K.ink} strokeWidth={1.6} />
        <text x={66} y={117} fontSize={18} fontWeight={800} fill={K.paper}>Live</text>
      </g>
    </svg>
  );
}

/* ---------- Share: the link itself, handed over ----------
   Three beats, top to bottom: the link with Priya's cursor on it, the Copy
   link key with the Copied bubble pointing back at it, then Tom's terminal
   with v5 landing on its empty bottom corner. Two overlaps in the whole
   frame, no text under anything, and no loose sparkles. */
export function ShareScene() {
  return (
    <svg viewBox="0 0 560 400" className="tb-art" role="img" aria-label="The link to supplier-payments in a big pill with Priya's cursor on it, and a Copy link key under it with a Copied speech bubble pointing at it. Below, Tom's terminal: npx wirl pull supplier-payments, pulled v4, npx wirl dev. Over its corner, v5 of the app with a new Export CSV button." strokeLinecap="round" strokeLinejoin="round">
      {/* 1. The link, as the object being handed over */}
      <g>
        <rect x={20} y={28} width={440} height={54} rx={27} fill={K.edge} stroke={K.ink} strokeWidth={3} transform="translate(0 6)" />
        <rect x={20} y={28} width={440} height={54} rx={27} fill={K.paper} stroke={K.ink} strokeWidth={3} />
        <MiniLock x={52} y={53} s={1.5} />
        <text className="mono" x={74} y={62} fontSize={18} fill={K.ink}>{LINK}</text>
      </g>
      {/* tagSize 18: at 390 this picture renders 371 wide, so the default 15 would
          put "Priya" at 9.4px. 18 lands it at 11.3px, level with the band. */}
      <NamedCursor x={466} y={58} who="priya" s={0.95} tagSize={18} />
      {/* 2. Copy, with the bubble's tail aimed at the key rather than at air */}
      <Btn x={20} y={104} w={148} h={44} label="Copy link" size={18} fill={K.sun} edge={K.sunEdge} color={K.ink} faceClass="tb-sh-copy" />
      <g>
        <path d="M210 106 H316 A14 14 0 0 1 330 120 V136 A14 14 0 0 1 316 150 H210 A14 14 0 0 1 196 136 V134 L178 128 L196 122 V120 A14 14 0 0 1 210 106 Z" fill={K.ink} />
        <text x={263} y={135} fontSize={18} fontWeight={800} fill={K.paper} textAnchor="middle">Copied!</text>
      </g>
      {/* 3. Tom pulls it. The lines are there from the first frame; the caret blinks. */}
      <CastShadow x={20} y={176} w={430} h={158} dx={12} dy={14} />
      <Term x={20} y={176} w={430} h={158} barH={34}>
        <Avatar who="tom" x={62} y={193} r={12} />
        <text x={82} y={199} fontSize={17.5} fill={K.termText}>Tom&apos;s laptop</text>
        <text className="mono" x={40} y={242} fontSize={17.5} fill={K.termText}><tspan fill={K.sun}>$</tspan> npx wirl pull supplier-payments</text>
        <text className="mono" x={40} y={274} fontSize={17.5} fill={K.mint}>✓ pulled v4</text>
        <text className="mono" x={40} y={306} fontSize={17.5} fill={K.termText}><tspan fill={K.sun}>$</tspan> npx wirl dev</text>
        <rect className="tb-h-caret" x={198} y={292} width={10} height={20} fill={K.sun} />
      </Term>
      {/* 4. And ships v5, over the terminal's empty bottom-right corner only */}
      <g className="tb-sh-new">
        <DieCut tilt={-3} cx={444} cy={325} border={8} cut={<rect x={344} y={258} width={200} height={134} rx={14} />}>
          <Win x={344} y={258} w={200} h={134} bar={K.green} barH={34}>
            <rect x={490} y={265} width={44} height={22} rx={11} fill={K.paper} stroke={K.ink} strokeWidth={2} />
            <text className="mono" x={512} y={282} fontSize={17} fontWeight={800} fill={K.ink} textAnchor="middle">v5</text>
            <Harbor x={364} y={312} r={11} />
            <text x={382} y={319} fontSize={17} fontWeight={800} fill={K.ink}>Supplier payments</text>
            <Btn x={362} y={338} w={164} h={38} label="Export CSV" size={17.5} fill={K.sun} edge={K.sunEdge} color={K.ink} />
          </Win>
        </DieCut>
      </g>
    </svg>
  );
}
