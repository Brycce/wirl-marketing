// The built-in features, each drawn as the real screen it is, and each at a
// different scale so the middle of the page does not turn into a row of
// identical windows: a chooser with a hand in it, a settings card in front of
// a locked door, a close-up of one input, two versions side by side, and a
// link being handed over. Nothing inside a picture is below 17 units in a
// 560-wide box, which is about 11px when the picture is the width of a phone.

import { K, Win, Term, LinkBar, Btn, Hand, Avatar, AvatarStack, Harbor, GoogleG, Globe, Padlock, CheckBadge, DieCut,
  RoundSticker, NamedCursor, Sparkle, Stamp, CastShadow, MiniLock, Arrow } from '../kit';

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

export function SigninScene() {
  return (
    <svg viewBox="0 0 560 390" className="tb-art" role="img" aria-label="A Google account chooser: Choose an account to continue to supplier-payments, with Priya Nair and Tom Abara at harbor.co. A hand taps Priya. A No invites sticker is slapped on the corner." strokeLinecap="round" strokeLinejoin="round">
      {/* The chooser, close up */}
      <CastShadow x={18} y={22} w={420} h={352} r={20} dx={14} dy={16} />
      <Win x={18} y={22} w={420} h={352} r={20} barH={50} bar={K.paper} dots={false}>
        <GoogleG x={46} y={48} r={10} />
        <text x={68} y={54} fontSize={17.5} fontWeight={700} fill={MUTED}>Sign in with Google</text>
        <text x={42} y={118} fontSize={29} fontWeight={800} fill={K.ink} letterSpacing="-0.02em">Choose an account</text>
        <text x={42} y={146} fontSize={18} fontWeight={600} fill={MUTED}>to continue to <tspan fill={K.ink} fontWeight={800}>supplier-payments</tspan></text>
        <AccountRow y={166} who="priya" flash />
        <path d="M42 250 H416" stroke={K.edge} strokeWidth={2} />
        <AccountRow y={258} who="tom" />
        <path d="M42 340 H416" stroke={K.edge} strokeWidth={2} />
        <g transform="translate(76 356)">
          <circle r={19} fill={K.wash} stroke={K.ink} strokeWidth={2} />
          <circle cx={-2} cy={-5} r={5} fill="none" stroke={K.ink} strokeWidth={2} />
          <path d="M-11 9 Q-2 -2 7 9" fill="none" stroke={K.ink} strokeWidth={2} />
          <path d="M9 -8 V0 M5 -4 H13" stroke={K.ink} strokeWidth={2} />
        </g>
        <text x={114} y={363} fontSize={18} fontWeight={700} fill={K.ink}>Use another account</text>
      </Win>
      <CheckBadge x={390} y={196} r={15} className="tb-si-check" />
      <Hand x={298} y={206} s={1.05} className="tb-si-hand" />
      {/* The tab you came from, as a sticker on the corner */}
      <DieCut tilt={4} cx={444} cy={30} cut={<rect x={336} y={6} width={216} height={46} rx={16} />}>
        <rect x={336} y={6} width={216} height={46} rx={16} fill={K.paper} stroke={K.ink} strokeWidth={3} />
        <Harbor x={362} y={29} r={13} />
        <text x={384} y={36} fontSize={17} fontWeight={800} fill={K.ink}>supplier-payments</text>
      </DieCut>
      {/* No invites */}
      <DieCut tilt={-8} cx={467} cy={334} cut={<rect x={384} y={306} width={166} height={56} rx={28} />} big>
        <rect x={384} y={306} width={166} height={56} rx={28} fill={K.sun} stroke={K.ink} strokeWidth={3} />
        <g transform="translate(412 334)">
          <rect x={-12} y={-9} width={24} height={18} rx={2.5} fill={K.paper} stroke={K.ink} strokeWidth={2} />
          <path d="M-11 -7.5 L0 1 L11 -7.5" fill="none" stroke={K.ink} strokeWidth={2} />
          <path d="M-15 13 L15 -13" stroke={K.tomato} strokeWidth={3.4} />
        </g>
        <text x={434} y={341} fontSize={19} fontWeight={900} fill={K.ink}>No invites</text>
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
        <text x={38} y={172} fontSize={20} fontWeight={800} fill={K.ink}>Who can open</text>
        <text x={38} y={198} fontSize={20} fontWeight={800} fill={K.ink}>supplier-payments?</text>
        {/* Everyone at harbor.co (selected) */}
        <rect x={30} y={212} width={298} height={74} rx={16} fill={K.greenEdge} stroke={K.ink} strokeWidth={2.5} transform="translate(0 4)" />
        <rect x={30} y={212} width={298} height={74} rx={16} fill={K.green} stroke={K.ink} strokeWidth={2.5} />
        <g className="tb-only-check">
          <circle cx={56} cy={236} r={13} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
          <path d="M50 236.5 l4 4 l7.2 -7.8" fill="none" stroke={K.green} strokeWidth={3.2} />
        </g>
        <text x={80} y={243} fontSize={18} fontWeight={800} fill={K.paper}>Everyone at harbor.co</text>
        <AvatarStack x={90} y={266} r={11} who={['mia', 'sam', 'lena']} />
        <text x={136} y={272} fontSize={17} fontWeight={800} fill={K.paper}>+209</text>
        {/* Only these people */}
        <rect x={30} y={294} width={298} height={54} rx={16} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <circle cx={56} cy={321} r={12} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <text x={80} y={328} fontSize={18} fontWeight={800} fill={K.ink}>Only these people</text>
        <AvatarStack x={268} y={321} r={11} who={['priya', 'tom', 'lena']} step={15} />
        {/* Anyone with the link */}
        <rect x={30} y={356} width={298} height={54} rx={16} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <circle cx={56} cy={383} r={12} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <text x={80} y={390} fontSize={17.5} fontWeight={800} fill={K.ink}>Anyone with the link</text>
        <Globe x={302} y={383} r={10} color={K.ink} />
      </g>
    </svg>
  );
}

/* ---------- Keys: a close-up of the one field, and the code that never holds it ---------- */
export function KeysScene() {
  const dots = Array.from({ length: 10 }, (_, i) => i);
  return (
    <svg viewBox="0 0 560 388" className="tb-art" role="img" aria-label="A browser at app.wirl.dev titled Keys, supplier-payments: a STRIPE_KEY field full of dots, a Save to vault button, and a Saved to vault toast. Above it the code only names env.STRIPE_KEY, and a sticker says the agent never sees it." strokeLinecap="round" strokeLinejoin="round">
      {/* The code: only the name */}
      <Win x={8} y={4} w={316} h={104} barH={32} bar={K.edge}>
        <text className="mono" x={80} y={26} fontSize={17} fill={K.ink}>pay.ts</text>
        <rect x={130} y={52} width={160} height={26} rx={6} fill={K.sun} />
        <text className="mono" x={24} y={72} fontSize={17} fill={K.ink}><tspan fill="#8E7CF0">new</tspan> Stripe(env.STRIPE_KEY)</text>
        <text className="mono" x={24} y={98} fontSize={17} fill="#8A8474">{'// no key in here'}</text>
      </Win>
      {/* Agent never sees it */}
      <RoundSticker
        x={496}
        y={52}
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
      {/* The vault form, close up */}
      <CastShadow x={110} y={106} w={420} h={256} r={16} dx={14} dy={16} light />
      <Win x={110} y={106} w={420} h={256} bar={K.sun} barH={42}>
        <LinkBar x={172} y={112} w={190} h={30} text="app.wirl.dev" size={17} />
        <text x={140} y={190} fontSize={21} fontWeight={800} fill={K.ink}>Keys · <tspan fontWeight={700}>supplier-payments</tspan></text>
        <text className="mono" x={140} y={222} fontSize={17.5} fontWeight={700} fill={MUTED}>STRIPE_KEY</text>
        <rect x={140} y={234} width={372} height={50} rx={14} fill={K.wash} stroke={K.ink} strokeWidth={2.5} />
        {dots.map((i) => <circle key={i} className={`tb-k-dot tb-k-dot-${i}`} cx={166 + i * 24} cy={259} r={7} fill={K.ink} />)}
        <rect className="tb-k-caret" x={400} y={244} width={3} height={30} fill={K.blue} />
        <Btn x={362} y={300} w={150} h={44} label="Save to vault" size={18} faceClass="tb-k-save" />
      </Win>
      {/* The toast */}
      <g className="tb-k-toast">
        <rect x={126} y={332} width={216} height={46} rx={23} fill={K.greenEdge} stroke={K.ink} strokeWidth={2.5} transform="translate(0 4)" />
        <rect x={126} y={332} width={216} height={46} rx={23} fill={K.green} stroke={K.ink} strokeWidth={2.5} />
        <MiniLock x={154} y={353} s={1.5} color={K.paper} />
        <text x={176} y={362} fontSize={17.5} fontWeight={800} fill={K.paper}>Saved to vault</text>
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

function Err({ x, y, rot, n }: { x: number; y: number; rot: number; n: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <g className={`tb-rb-err tb-rb-err-${n}`}>
        <rect x={-32} y={-16} width={64} height={32} rx={16} fill={K.tomatoEdge} stroke={K.ink} strokeWidth={2.5} transform="translate(0 4)" />
        <rect x={-32} y={-16} width={64} height={32} rx={16} fill={K.tomato} stroke={K.ink} strokeWidth={2.5} />
        <text className="mono" x={0} y={7} fontSize={18} fontWeight={800} fill={K.paper} textAnchor="middle">500</text>
      </g>
    </g>
  );
}

export function RollbackScene() {
  const arrow = 'M414 108 C398 26 176 18 136 92';
  return (
    <svg viewBox="0 0 560 384" className="tb-art" role="img" aria-label="Two versions of supplier-payments. The new v4 throws 500 errors and is stamped ROLLED BACK; a big arrow swings back to v3, which wears the Live badge." strokeLinecap="round" strokeLinejoin="round">
      <AppWin x={20} y={124} v="v3" />
      <g className="tb-rb-shake">
        <AppWin x={296} y={124} v="v4" broken />
        <Err x={290} y={172} rot={-12} n={1} />
        <Err x={534} y={222} rot={10} n={2} />
        <Err x={306} y={316} rot={-8} n={3} />
        <g className="tb-rb-fail">
          <rect x={322} y={328} width={222} height={34} rx={17} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
          <text x={433} y={352} fontSize={18} fontWeight={800} fill={K.ink} textAnchor="middle">5 failures in 12 min</text>
        </g>
        <Stamp x={414} y={244} text="ROLLED BACK" size={22} rot={-12} className="tb-rb-stamp" />
      </g>
      {/* The arrow back. Drawn at rest, so the picture never reads as empty. */}
      <g className="tb-rb-arrow">
        <path d={arrow} fill="none" stroke={K.ink} strokeWidth={22} />
        <path d={arrow} fill="none" stroke={K.sun} strokeWidth={13} />
        <path d="M110 78 L140 118 L164 76 Z" fill={K.sun} stroke={K.ink} strokeWidth={3.5} />
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

/* ---------- Share: the link itself, handed over ---------- */
export function ShareScene() {
  return (
    <svg viewBox="0 0 560 400" className="tb-art" role="img" aria-label="The link to supplier-payments in a big pill with a Copy link key under it and a Copied speech bubble, Priya's cursor on it. Below, Tom's terminal: npx wirl pull supplier-payments, pulled v4, npx wirl dev. Over the corner, v5 of the app with a new Export CSV button." strokeLinecap="round" strokeLinejoin="round">
      {/* The link, as the object being handed over */}
      <g>
        <rect x={20} y={28} width={440} height={54} rx={27} fill={K.edge} stroke={K.ink} strokeWidth={3} transform="translate(0 6)" />
        <rect x={20} y={28} width={440} height={54} rx={27} fill={K.paper} stroke={K.ink} strokeWidth={3} />
        <MiniLock x={52} y={53} s={1.5} />
        <text className="mono" x={74} y={62} fontSize={18} fill={K.ink}>{LINK}</text>
      </g>
      {/* tagSize 18: at 390 this picture renders 371 wide, so the default 15 would
          put "Priya" at 9.4px. 18 lands it at 11.3px, level with the band. */}
      <NamedCursor x={466} y={58} who="priya" s={0.95} tagSize={18} />
      <Btn x={20} y={104} w={148} h={44} label="Copy link" size={18} fill={K.sun} edge={K.sunEdge} color={K.ink} faceClass="tb-sh-copy" />
      <g>
        <path d="M200 100 H308 Q322 100 322 114 V128 Q322 142 308 142 H236 L220 156 L223 142 H200 Q186 142 186 128 V114 Q186 100 200 100 Z" fill={K.ink} />
        <text x={254} y={127} fontSize={18} fontWeight={800} fill={K.paper} textAnchor="middle">Copied!</text>
      </g>
      {/* Tom pulls it. The lines are there from the first frame; the caret blinks. */}
      <CastShadow x={92} y={172} w={430} h={158} dx={12} dy={14} />
      <Term x={92} y={172} w={430} h={158} barH={34}>
        <Avatar who="tom" x={134} y={189} r={12} />
        <text x={154} y={195} fontSize={17.5} fill={K.termText}>Tom&apos;s laptop</text>
        <text className="mono" x={112} y={238} fontSize={17.5} fill={K.termText}><tspan fill={K.sun}>$</tspan> npx wirl pull supplier-payments</text>
        <text className="mono" x={112} y={270} fontSize={17.5} fill={K.mint}>✓ pulled v4</text>
        <text className="mono" x={112} y={302} fontSize={17.5} fill={K.termText}><tspan fill={K.sun}>$</tspan> npx wirl dev</text>
        <rect className="tb-h-caret" x={270} y={288} width={10} height={20} fill={K.sun} />
      </Term>
      {/* And ships v5, with one new button */}
      <g className="tb-sh-new">
        <DieCut tilt={-3} cx={448} cy={322} border={8} cut={<rect x={348} y={256} width={200} height={134} rx={14} />}>
          <Win x={348} y={256} w={200} h={134} bar={K.green} barH={34}>
            <rect x={494} y={263} width={44} height={22} rx={11} fill={K.paper} stroke={K.ink} strokeWidth={2} />
            <text className="mono" x={516} y={280} fontSize={17} fontWeight={800} fill={K.ink} textAnchor="middle">v5</text>
            <Harbor x={368} y={310} r={11} />
            <text x={386} y={317} fontSize={17} fontWeight={800} fill={K.ink}>Supplier payments</text>
            <Btn x={366} y={336} w={164} h={38} label="Export CSV" size={17.5} fill={K.sun} edge={K.sunEdge} color={K.ink} />
          </Win>
        </DieCut>
      </g>
      <g className="tb-sh-sparks">
        <Sparkle x={334} y={244} r={13} />
        <Sparkle x={550} y={236} r={9} />
        <Sparkle x={326} y={384} r={8} />
      </g>
    </svg>
  );
}
