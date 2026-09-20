// The hero: the whole product in one frame, on a big sun disc. The agent's
// chat says "deploy", a browser is open at the company link, and a sticker
// on it says company only. That is the headline, drawn.

import { K, Win, Term, LinkBar, Btn, Avatar, Harbor, NamedCursor, Sparkle, RoundSticker, CastShadow, textW } from '../kit';
import { LogoSticker } from '../marks';

const LINK = 'harbor--supplier-payments.wirl.run';

function Row({ y, name, amount, paid }: { y: number; name: string; amount: string; paid?: boolean }) {
  return (
    <g>
      <rect x={164} y={y} width={402} height={36} rx={10} fill={K.wash} />
      <text x={178} y={y + 23.5} fontSize={16} fill={K.ink}>{name}</text>
      <text x={446} y={y + 23.5} fontSize={16} fill={K.ink} textAnchor="end" fontWeight={600}>{amount}</text>
      {paid ? (
        <g>
          <rect x={462} y={y + 5} width={92} height={26} rx={13} fill={K.green} stroke={K.ink} strokeWidth={2} />
          <text x={478} y={y + 23} fontSize={15} fill={K.paper} fontWeight={800}>Paid</text>
          <path d={`M${522} ${y + 18} l4 4 l8 -8.4`} fill="none" stroke={K.paper} strokeWidth={2.8} />
        </g>
      ) : (
        <g>
          <rect x={462} y={y + 5} width={92} height={26} rx={13} fill={K.sun} stroke={K.ink} strokeWidth={2} />
          <text x={508} y={y + 23} fontSize={15} fill={K.ink} fontWeight={800} textAnchor="middle">Due</text>
        </g>
      )}
    </g>
  );
}

/* The supplier-payments app, in a browser at its wirl.run link. */
function Browser() {
  const x = 150;
  const y = 40;
  return (
    <g>
      <CastShadow x={x} y={y} w={430} h={318} dx={14} dy={18} />
      <Win x={x} y={y} w={430} h={318} bar={K.green} barH={46}>
        {/* The tab */}
        <path d="M214 90 V60 A10 10 0 0 1 224 50 H414 A10 10 0 0 1 424 60 V90 Z" fill={K.paper} />
        <path d="M214 86 V60 A10 10 0 0 1 224 50 H414 A10 10 0 0 1 424 60 V86" fill="none" stroke={K.ink} strokeWidth={2.5} />
        <Harbor x={235} y={68} r={10} />
        <text x={252} y={74} fontSize={16} fill={K.ink}>supplier-payments</text>
        <path d="M404 64 l8 8 M412 64 l-8 8" stroke={K.ink} strokeWidth={2} opacity={0.5} />
        {/* The link */}
        <LinkBar x={162} y={94} w={406} h={30} text={LINK} size={15} />
        <path d="M150 132 H580" stroke={K.ink} strokeWidth={2.5} />
        {/* The page */}
        <Harbor x={180} y={162} r={14} />
        <text x={203} y={169} fontSize={20} fontWeight={800} fill={K.ink}>Supplier payments</text>
        <rect x={398} y={148} width={170} height={30} rx={15} fill={K.pinkWash} stroke={K.ink} strokeWidth={2} />
        <Avatar who="priya" x={414} y={163} r={11} />
        <text x={431} y={168.5} fontSize={15} fill={K.ink} fontWeight={600}>priya@harbor.co</text>
        <Row y={186} name="Northwind Freight" amount="$4,200" paid />
        <Row y={226} name="Kelp & Co" amount="$1,180" />
        <Row y={266} name="Pier 9 Ropes" amount="$640" />
        <Btn x={466} y={312} w={100} h={34} label="Pay" size={17} faceClass="tb-h-pay" />
      </Win>
    </g>
  );
}

/* The agent's chat: "deploy", and the reply with the link. The whole exchange
   is drawn from the first frame; only the caret after the command blinks. */
function Chat({ v }: { v: string }) {
  const x = 20;
  const y = 316;
  const cmdW = textW('you › deploy supplier-payments', 16, true);
  return (
    <g>
      <Term x={x} y={y} w={384} h={196} barH={38}>
        <text x={120} y={340} fontSize={15} fill={K.termText}>Claude Code</text>
        <text className="mono" x={40} y={384} fontSize={16} fill={K.termText}>
          <tspan fill={K.sun}>you ›</tspan> deploy supplier-payments
        </text>
        <rect className="tb-h-caret" x={40 + cmdW + 3} y={370} width={9} height={18} fill={K.sun} />
        <g>
          <circle cx={45} cy={415} r={4.5} fill="#D97757" />
          <text x={58} y={421} fontSize={16} fill={K.termText} fontWeight={600}>Live at</text>
          <text className="mono" x={58} y={447} fontSize={15} fill="#A9CCFF">{LINK}</text>
          <path d={`M58 452 H${58 + textW(LINK, 15, true)}`} stroke="#A9CCFF" strokeWidth={1.6} />
          <text x={58} y={477} fontSize={16} fill={K.termText} fontWeight={600}>Only people at harbor.co can open it.</text>
        </g>
      </Term>
      <LogoSticker agent="claude" x={98} y={335} size={24} uid={`hero-chat-${v}`} />
    </g>
  );
}

/* The round green sticker slapped on the browser's corner. */
function CompanyOnly({ v }: { v: string }) {
  return (
    <g>
      <RoundSticker
        x={538}
        y={64}
        r={45}
        tilt={-8}
        id={`hero-only-${v}`}
        big
        className="tb-h-sticker"
        peel={{ angle: -42, depth: 11 }}
        face={
          <g>
            <circle r={44} fill={K.green} stroke={K.ink} strokeWidth={3} />
            <circle r={36} fill="none" stroke={K.paper} strokeWidth={1.6} strokeDasharray="3 5" opacity={0.7} />
            <g transform="translate(0 -18)">
              <path d="M-5.4 -2 V-6 A5.4 5.4 0 0 1 5.4 -6 V-2" fill="none" stroke={K.paper} strokeWidth={3} />
              <rect x={-8.5} y={-3} width={17} height={13} rx={3.4} fill={K.paper} />
              <circle cx={0} cy={2.6} r={1.8} fill={K.green} />
            </g>
            <text x={0} y={13} fontSize={15} fontWeight={900} fill={K.paper} textAnchor="middle" letterSpacing="0.04em">COMPANY</text>
            <text x={0} y={30} fontSize={15} fontWeight={900} fill={K.paper} textAnchor="middle" letterSpacing="0.04em">ONLY</text>
          </g>
        }
      />
    </g>
  );
}

const LABEL = 'An agent chat says deploy supplier-payments; the app opens in a browser at harbor--supplier-payments.wirl.run with a Company only sticker on it.';

/* Wide: the browser back right, the chat overlapping its lower left. */
function Wide() {
  return (
    <svg viewBox="0 0 600 540" className="tb-art tb-hero-art tb-hero-wide" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={330} cy={262} r={252} fill={K.sun} />
      <Browser />
      <Chat v="w" />
      <CompanyOnly v="w" />
      <NamedCursor x={540} y={328} who="priya" className="tb-h-cursor" tagLeft />
      <Sparkle x={112} y={188} r={15} fill={K.paper} className="tb-twinkle" />
      <Sparkle x={452} y={508} r={12} fill={K.paper} className="tb-twinkle tb-twinkle-2" />
      <Sparkle x={86} y={236} r={8} fill={K.paper} className="tb-twinkle tb-twinkle-3" />
    </svg>
  );
}

/* Phone: the same pieces, bigger, the chat tucked under the browser. */
function Phone() {
  return (
    <svg viewBox="0 0 450 545" className="tb-art tb-hero-art tb-hero-phone" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={225} cy={270} r={222} fill={K.sun} />
      <g transform="translate(-140 -26)">
        <Browser />
      </g>
      <g transform="translate(-6 14)">
        <Chat v="p" />
      </g>
      <g transform="translate(-140 -26)">
        <CompanyOnly v="p" />
        {/* No name tag here: it would land on the chat, and her email is on the page already. */}
        <NamedCursor x={540} y={328} who="priya" className="tb-h-cursor" tag={false} />
      </g>
      <Sparkle x={420} y={420} r={13} fill={K.paper} className="tb-twinkle" />
      <Sparkle x={24} y={300} r={9} fill={K.paper} className="tb-twinkle tb-twinkle-2" />
    </svg>
  );
}

export default function HeroScene() {
  return (
    <>
      <Wide />
      <Phone />
    </>
  );
}
