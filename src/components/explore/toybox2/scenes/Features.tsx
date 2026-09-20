// The built-in features, each drawn as the real screen it is: the Google
// account chooser, the who-can-open setting, the vault form, the rollback,
// and a colleague pulling the code.

import { K, Win, Term, LinkBar, Btn, Hand, Avatar, AvatarStack, Harbor, GoogleG, Globe, Padlock, CheckBadge, DieCut,
  RoundSticker, NamedCursor, Sparkle, Stamp, CastShadow, MiniLock, Bars, Arrow } from '../kit';
import { LogoSticker } from '../marks';

const LINK = 'harbor--supplier-payments.wirl.run';
const MUTED = '#5E5A4C';

/* ---------- Sign-in: the Google account chooser ---------- */
function AccountRow({ y, who, flash }: { y: number; who: 'priya' | 'tom'; flash?: boolean }) {
  const name = who === 'priya' ? 'Priya Nair' : 'Tom Abara';
  const email = `${who}@harbor.co`;
  return (
    <g>
      {flash && <rect className="tb-si-flash" x={38} y={y} width={372} height={70} rx={14} fill={K.blueWash} stroke={K.blue} strokeWidth={2.5} />}
      <Avatar who={who} x={80} y={y + 35} r={23} />
      <text x={116} y={y + 30} fontSize={18} fontWeight={800} fill={K.ink}>{name}</text>
      <text x={116} y={y + 53} fontSize={15} fontWeight={600} fill={MUTED}>{email}</text>
    </g>
  );
}

export function SigninScene() {
  return (
    <svg viewBox="0 0 560 500" className="tb-art" role="img" aria-label="A Google account chooser: Choose an account to continue to supplier-payments, with Priya Nair and Tom Abara at harbor.co. A hand taps Priya. A No invites sticker is slapped on the corner." strokeLinecap="round" strokeLinejoin="round">
      {/* The app it's signing in to, peeking out behind */}
      <Win x={176} y={20} w={370} h={190} bar={K.green} barH={44}>
        <LinkBar x={186} y={70} w={350} h={30} text={LINK} size={14.5} />
        <Harbor x={206} y={130} r={12} />
        <text x={226} y={136} fontSize={17} fontWeight={800} fill={K.ink}>Supplier payments</text>
      </Win>
      <CastShadow x={22} y={96} w={410} h={380} r={20} dx={14} dy={16} />
      {/* The chooser */}
      <Win x={22} y={96} w={410} h={380} r={20} barH={52} bar={K.paper} dots={false}>
        <GoogleG x={50} y={122} r={9} />
        <text x={70} y={128} fontSize={15} fontWeight={700} fill={MUTED}>Sign in with Google</text>
        <text x={44} y={188} fontSize={27} fontWeight={800} fill={K.ink} letterSpacing="-0.02em">Choose an account</text>
        <text x={44} y={216} fontSize={16} fontWeight={600} fill={MUTED}>to continue to <tspan fill={K.ink} fontWeight={800}>supplier-payments</tspan></text>
        <AccountRow y={236} who="priya" flash />
        <path d="M44 316 H410" stroke={K.edge} strokeWidth={2} />
        <AccountRow y={322} who="tom" />
        <path d="M44 402 H410" stroke={K.edge} strokeWidth={2} />
        <g transform="translate(80 438)">
          <circle r={20} fill={K.wash} stroke={K.ink} strokeWidth={2} />
          <circle cx={-2} cy={-5} r={5} fill="none" stroke={K.ink} strokeWidth={2} />
          <path d="M-11 9 Q-2 -2 7 9" fill="none" stroke={K.ink} strokeWidth={2} />
          <path d="M9 -8 V0 M5 -4 H13" stroke={K.ink} strokeWidth={2} />
        </g>
        <text x={116} y={444} fontSize={16} fontWeight={700} fill={K.ink}>Use another account</text>
      </Win>
      <CheckBadge x={384} y={271} r={14} className="tb-si-check" />
      <Hand x={318} y={282} s={1.05} className="tb-si-hand" />
      {/* No invites */}
      <DieCut tilt={-8} cx={452} cy={356} cut={<rect x={376} y={330} width={152} height={52} rx={26} />} big>
        <rect x={376} y={330} width={152} height={52} rx={26} fill={K.sun} stroke={K.ink} strokeWidth={3} />
        <g transform="translate(404 356)">
          <rect x={-11} y={-8} width={22} height={16} rx={2.5} fill={K.paper} stroke={K.ink} strokeWidth={2} />
          <path d="M-10 -6.5 L0 1 L10 -6.5" fill="none" stroke={K.ink} strokeWidth={2} />
          <path d="M-14 12 L14 -12" stroke={K.tomato} strokeWidth={3.2} />
        </g>
        <text x={424} y={362.5} fontSize={18} fontWeight={900} fill={K.ink}>No invites</text>
      </DieCut>
    </svg>
  );
}

/* ---------- Company-only: the setting, and what an outsider sees ---------- */
export function OnlyScene() {
  return (
    <svg viewBox="0 0 560 500" className="tb-art" role="img" aria-label="A setting titled Who can open supplier-payments, set to Everyone at harbor.co, with Only these people and Anyone with the link as the other choices. Behind it, what someone outside Harbor, alex@gmail.com, sees at the same link: a big padlock and Only people at harbor.co can open this." strokeLinecap="round" strokeLinejoin="round">
      {/* The outsider's view */}
      <CastShadow x={214} y={16} w={332} h={290} dx={14} dy={16} />
      <Win x={214} y={16} w={332} h={290} bar={K.edge} barH={44} dots={false}>
        <LinkBar x={224} y={23} w={312} h={30} text={LINK} size={13.6} />
        <Padlock x={342} y={80} s={1.25} shackleClass="tb-rattle" />
        <text x={380} y={242} fontSize={17} fontWeight={800} fill={K.ink} textAnchor="middle">Only people</text>
        <text x={380} y={264} fontSize={17} fontWeight={800} fill={K.ink} textAnchor="middle">at harbor.co</text>
        <text x={380} y={286} fontSize={17} fontWeight={800} fill={K.ink} textAnchor="middle">can open this.</text>
      </Win>
      {/* Someone outside Harbor, trying the door */}
      <g className="tb-knock">
        <Arrow x={410} y={158} color="#B07CE8" rot={-14} />
        <rect x={424} y={196} width={122} height={24} rx={12} fill="#B07CE8" stroke={K.ink} strokeWidth={2.2} />
        <text x={485} y={212.5} fontSize={13} fontWeight={800} fill={K.ink} textAnchor="middle">alex@gmail.com</text>
      </g>
      {/* The setting */}
      <g>
        <rect x={10} y={184} width={298} height={306} rx={20} fill={K.edge} stroke={K.ink} strokeWidth={3} />
        <rect x={10} y={178} width={298} height={306} rx={20} fill={K.paper} stroke={K.ink} strokeWidth={3} />
        <text x={30} y={214} fontSize={19} fontWeight={800} fill={K.ink}>Who can open</text>
        <text x={30} y={238} fontSize={19} fontWeight={800} fill={K.ink}>supplier-payments?</text>
        {/* Everyone at harbor.co (selected) */}
        <rect x={24} y={256} width={270} height={80} rx={16} fill={K.greenEdge} stroke={K.ink} strokeWidth={2.5} transform="translate(0 4)" />
        <rect x={24} y={256} width={270} height={80} rx={16} fill={K.green} stroke={K.ink} strokeWidth={2.5} />
        <g className="tb-only-check">
          <circle cx={48} cy={282} r={12} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
          <path d="M42.5 282.5 l3.6 3.6 l6.6 -7.2" fill="none" stroke={K.green} strokeWidth={3} />
        </g>
        <text x={70} y={288} fontSize={17} fontWeight={800} fill={K.paper}>Everyone at harbor.co</text>
        <AvatarStack x={82} y={314} r={11} who={['mia', 'sam', 'lena']} />
        <text x={126} y={319.5} fontSize={15} fontWeight={800} fill={K.paper}>+209</text>
        {/* Only these people */}
        <rect x={24} y={350} width={270} height={58} rx={16} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <circle cx={48} cy={379} r={11} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <text x={70} y={385} fontSize={17} fontWeight={800} fill={K.ink}>Only these people</text>
        <AvatarStack x={240} y={379} r={11} who={['priya', 'tom', 'lena']} step={15} />
        {/* Anyone with the link */}
        <rect x={24} y={418} width={270} height={56} rx={16} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <circle cx={48} cy={446} r={11} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
        <text x={70} y={452} fontSize={17} fontWeight={800} fill={K.ink}>Anyone with the link</text>
        <Globe x={272} y={446} r={9} color={K.ink} />
      </g>
    </svg>
  );
}

/* ---------- Keys: into the vault, through the browser ---------- */
export function KeysScene() {
  const dots = Array.from({ length: 10 }, (_, i) => i);
  return (
    <svg viewBox="0 0 560 500" className="tb-art" role="img" aria-label="A browser at app.wirl.dev titled Keys, supplier-payments: a STRIPE_KEY field full of dots, a Save to vault button, and a Saved to vault toast. Behind it, the code only names env.STRIPE_KEY, and the agent's terminal wears a sticker: Agent never sees it." strokeLinecap="round" strokeLinejoin="round">
      {/* The code: only the name */}
      <Win x={14} y={30} w={300} h={130} barH={34} bar={K.edge}>
        <text className="mono" x={84} y={52.5} fontSize={14} fill={K.ink}>pay.ts</text>
        <text className="mono" x={30} y={88} fontSize={14.5} fill={K.ink}><tspan fill="#8E7CF0">const</tspan> stripe =</text>
        <rect x={139} y={100} width={126} height={24} rx={6} fill={K.sun} />
        <text className="mono" x={46} y={117} fontSize={14.5} fill={K.ink}><tspan fill="#8E7CF0">new</tspan> Stripe(env.STRIPE_KEY)</text>
        <text className="mono" x={30} y={146} fontSize={13} fill="#8A8474">{'// no key in here'}</text>
      </Win>
      {/* The agent */}
      <Term x={340} y={24} w={206} h={170} barH={34} face="#3A4A42" stroke="#6B7F73">
        <text x={436} y={46} fontSize={14} fill={K.termText}>Agent</text>
        <Bars x={358} y={78} widths={[120, 150, 90, 130]} gap={20} h={8} fill="#56685D" />
      </Term>
      <LogoSticker agent="claude" x={418} y={41} size={22} uid="keys-term" />
      <RoundSticker
        x={498}
        y={182}
        r={49}
        border={6}
        tilt={10}
        big
        face={
          <g>
            <circle r={48} fill={K.lilac} stroke={K.ink} strokeWidth={3} />
            <g transform="translate(0 -25)" fill="none" stroke={K.ink} strokeWidth={2.4}>
              <path d="M-11 0 Q0 -9 11 0 Q0 9 -11 0 Z" fill={K.paper} />
              <circle r={3.4} fill={K.ink} />
              <path d="M-12 8 L12 -8" stroke={K.tomato} strokeWidth={3} />
            </g>
            <text x={0} y={-1} fontSize={14} fontWeight={900} fill={K.ink} textAnchor="middle">AGENT</text>
            <text x={0} y={15} fontSize={14} fontWeight={900} fill={K.ink} textAnchor="middle">NEVER</text>
            <text x={0} y={31} fontSize={14} fontWeight={900} fill={K.ink} textAnchor="middle">SEES IT</text>
          </g>
        }
      />
      {/* The vault form */}
      <CastShadow x={86} y={196} w={380} h={262} r={16} dx={14} dy={16} light />
      <Win x={86} y={196} w={380} h={262} bar={K.sun} barH={42}>
        <LinkBar x={144} y={202} w={180} h={30} text="app.wirl.dev" size={15} />
        <text x={110} y={278} fontSize={20} fontWeight={800} fill={K.ink}>Keys · <tspan fontWeight={700}>supplier-payments</tspan></text>
        <text className="mono" x={110} y={310} fontSize={14} fontWeight={700} fill={MUTED}>STRIPE_KEY</text>
        <rect x={110} y={320} width={332} height={44} rx={12} fill={K.wash} stroke={K.ink} strokeWidth={2.5} />
        {dots.map((i) => <circle key={i} className={`tb-k-dot tb-k-dot-${i}`} cx={132 + i * 21} cy={342} r={6} fill={K.ink} />)}
        <rect className="tb-k-caret" x={342} y={330} width={2.5} height={24} fill={K.blue} />
        <Btn x={282} y={384} w={160} h={40} label="Save to vault" size={16} faceClass="tb-k-save" />
      </Win>
      {/* The toast */}
      <g className="tb-k-toast">
        <rect x={116} y={446} width={206} height={42} rx={21} fill={K.greenEdge} stroke={K.ink} strokeWidth={2.5} transform="translate(0 4)" />
        <rect x={116} y={446} width={206} height={42} rx={21} fill={K.green} stroke={K.ink} strokeWidth={2.5} />
        <MiniLock x={142} y={465} s={1.3} color={K.paper} />
        <text x={160} y={473} fontSize={16} fontWeight={800} fill={K.paper}>Saved to vault</text>
      </g>
    </svg>
  );
}

/* ---------- Rollback: v4 broke, it went back to v3, and the log says so ---------- */
function AppWin({ x, y, v, broken }: { x: number; y: number; v: string; broken?: boolean }) {
  return (
    <Win x={x} y={y} w={236} h={210} bar={K.green} barH={40}>
      <rect x={x + 164} y={y + 8} width={58} height={24} rx={12} fill={K.paper} stroke={K.ink} strokeWidth={2} />
      <text className="mono" x={x + 193} y={y + 25} fontSize={15} fontWeight={800} fill={K.ink} textAnchor="middle">{v}</text>
      <Harbor x={x + 26} y={y + 64} r={11} />
      <text x={x + 44} y={y + 70} fontSize={15} fontWeight={800} fill={K.ink}>Supplier payments</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x + 14} y={y + 88 + i * 34} width={208} height={26} rx={8} fill={broken ? '#F6E3DC' : K.wash} />
          <rect x={x + 24} y={y + 97 + i * 34} width={[80, 56, 70][i]} height={8} rx={4} fill={broken ? '#E9C4B8' : K.edge} />
          <rect x={x + 170} y={y + 94 + i * 34} width={42} height={14} rx={7} fill={broken ? '#E9C4B8' : i === 0 ? K.green : K.sun} />
        </g>
      ))}
      {broken && <path d={`M${x + 20} ${y + 190} l12 -8 l10 6 l12 -9`} fill="none" stroke={K.tomato} strokeWidth={2.5} opacity={0.6} />}
    </Win>
  );
}

function Err({ x, y, rot, n }: { x: number; y: number; rot: number; n: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <g className={`tb-rb-err tb-rb-err-${n}`}>
        <rect x={-30} y={-15} width={60} height={30} rx={15} fill={K.tomatoEdge} stroke={K.ink} strokeWidth={2.5} transform="translate(0 4)" />
        <rect x={-30} y={-15} width={60} height={30} rx={15} fill={K.tomato} stroke={K.ink} strokeWidth={2.5} />
        <text className="mono" x={0} y={6} fontSize={16} fontWeight={800} fill={K.paper} textAnchor="middle">500</text>
      </g>
    </g>
  );
}

export function RollbackScene() {
  const arrow = 'M448 112 C430 26 196 18 156 96';
  return (
    <svg viewBox="0 0 600 396" className="tb-art" role="img" aria-label="Two versions of supplier-payments. The new v4 throws 500 errors and is stamped ROLLED BACK; a big arrow swings back to v3, which wears the Live badge." strokeLinecap="round" strokeLinejoin="round">
      <AppWin x={30} y={128} v="v3" />
      <g className="tb-rb-shake">
        <AppWin x={334} y={128} v="v4" broken />
        <Err x={326} y={176} rot={-12} n={1} />
        <Err x={574} y={230} rot={10} n={2} />
        <Err x={344} y={334} rot={-8} n={3} />
        <g className="tb-rb-fail">
          <rect x={362} y={352} width={180} height={30} rx={15} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
          <text x={452} y={372} fontSize={15} fontWeight={800} fill={K.ink} textAnchor="middle">5 failures in 12 min</text>
        </g>
        <Stamp x={452} y={254} text="ROLLED BACK" size={22} rot={-12} className="tb-rb-stamp" />
      </g>
      {/* The arrow back */}
      <g className="tb-rb-arrow">
        <path d={arrow} fill="none" stroke={K.ink} strokeWidth={22} pathLength={100} className="tb-rb-draw" />
        <path d={arrow} fill="none" stroke={K.sun} strokeWidth={13} pathLength={100} className="tb-rb-draw" />
        <path className="tb-rb-head" d="M130 82 L160 122 L184 80 Z" fill={K.sun} stroke={K.ink} strokeWidth={3.5} />
      </g>
      {/* Live, back on v3 */}
      <g className="tb-rb-live">
        <rect x={40} y={98} width={84} height={34} rx={17} fill={K.greenEdge} stroke={K.ink} strokeWidth={2.5} transform="translate(0 4)" />
        <rect x={40} y={98} width={84} height={34} rx={17} fill={K.green} stroke={K.ink} strokeWidth={2.5} />
        <circle cx={62} cy={115} r={5.5} fill={K.mint} stroke={K.ink} strokeWidth={1.6} />
        <text x={74} y={121} fontSize={16} fontWeight={800} fill={K.paper}>Live</text>
      </g>
    </svg>
  );
}

/* ---------- Share: the link or the code ---------- */
function MiniApp({ x, y, v, extra }: { x: number; y: number; v: string; extra?: boolean }) {
  return (
    <Win x={x} y={y} w={290} h={196} bar={K.green} barH={40}>
      <rect x={x + 218} y={y + 8} width={58} height={24} rx={12} fill={K.paper} stroke={K.ink} strokeWidth={2} />
      <text className="mono" x={x + 247} y={y + 25} fontSize={15} fontWeight={800} fill={K.ink} textAnchor="middle">{v}</text>
      <Harbor x={x + 28} y={y + 66} r={12} />
      <text x={x + 48} y={y + 72} fontSize={16} fontWeight={800} fill={K.ink}>Supplier payments</text>
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={x + 16} y={y + 92 + i * 34} width={258} height={26} rx={8} fill={K.wash} />
          <rect x={x + 26} y={y + 101 + i * 34} width={[92, 64][i]} height={8} rx={4} fill={K.edge} />
          <rect x={x + 222} y={y + 98 + i * 34} width={42} height={14} rx={7} fill={i === 0 ? K.green : K.sun} />
        </g>
      ))}
      {extra && (
        <g className="tb-sh-new">
          <Btn x={x + 140} y={y + 150} w={132} h={32} label="Export CSV" size={15} fill={K.sun} edge={K.sunEdge} color={K.ink} />
        </g>
      )}
    </Win>
  );
}

export function ShareScene() {
  return (
    <svg viewBox="0 0 606 560" className="tb-art" role="img" aria-label="Priya copies the link to supplier-payments v4. In Tom's terminal: npx wirl pull supplier-payments, pulled v4, npx wirl dev. Then v5 of the same app, with one new Export CSV button that Tom added." strokeLinecap="round" strokeLinejoin="round">
      {/* Priya's v4, and the link copied */}
      <MiniApp x={14} y={30} v="v4" />
      <Btn x={30} y={184} w={120} h={32} label="Copy link" size={15} fill={K.paper} edge={K.edge} color={K.ink} faceClass="tb-sh-copy" />
      <g className="tb-sh-copied">
        <path d="M150 150 H232 Q244 150 244 162 V172 Q244 184 232 184 H170 L158 194 L160 184 H150 Q138 184 138 172 V162 Q138 150 150 150 Z" fill={K.ink} />
        <text x={191} y={173} fontSize={15} fontWeight={800} fill={K.paper} textAnchor="middle">Copied!</text>
      </g>
      {/* Tom's terminal */}
      <g transform="translate(14 0)">
        <CastShadow x={150} y={214} w={336} h={138} dx={12} dy={14} />
        <Term x={150} y={214} w={336} h={138} barH={32}>
          <Avatar who="tom" x={208} y={230} r={10} />
          <text x={224} y={235} fontSize={14} fill={K.termText}>Tom&apos;s laptop</text>
          <text className="mono tb-sh-l1" x={168} y={272} fontSize={14.5} fill={K.termText}><tspan fill={K.sun}>$</tspan> npx wirl pull supplier-payments</text>
          <text className="mono tb-sh-l2" x={168} y={300} fontSize={14.5} fill={K.mint}>✓ pulled v4</text>
          <text className="mono tb-sh-l3" x={168} y={328} fontSize={14.5} fill={K.termText}><tspan fill={K.sun}>$</tspan> npx wirl dev</text>
        </Term>
      </g>
      <NamedCursor x={108} y={206} who="priya" s={0.9} />
      {/* v5, one new button */}
      <MiniApp x={306} y={316} v="v5" extra />
      <g className="tb-sh-sparks">
        <Sparkle x={442} y={452} r={11} />
        <Sparkle x={592} y={486} r={9} />
        <Sparkle x={598} y={446} r={6} />
      </g>
      <NamedCursor x={540} y={494} who="tom" />
    </svg>
  );
}

