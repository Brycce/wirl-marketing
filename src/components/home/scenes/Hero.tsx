// The hero: the app itself, live on a big sun disc. A browser is open at the
// company link with a sticker on it saying company only, and Priya's cursor
// is on Pay. The agent's chat used to sit here too, but the connect block
// right beside it is already a Claude Code window, and two of those in one
// view read as one thing said twice.

import { K, Win, LinkBar, Btn, Avatar, Acme, NamedCursor, RoundSticker, CastShadow } from '../kit';

const LINK = 'acme--supplier-payments.wirl.run';

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
        <Acme x={235} y={68} r={10} />
        <text x={252} y={74} fontSize={16} fill={K.ink}>supplier-payments</text>
        <path d="M404 64 l8 8 M412 64 l-8 8" stroke={K.ink} strokeWidth={2} opacity={0.5} />
        {/* The link */}
        <LinkBar x={162} y={94} w={406} h={30} text={LINK} size={15} />
        <path d="M150 132 H580" stroke={K.ink} strokeWidth={2.5} />
        {/* The page */}
        <Acme x={180} y={162} r={14} />
        <text x={203} y={169} fontSize={20} fontWeight={800} fill={K.ink}>Supplier payments</text>
        <rect x={398} y={148} width={170} height={30} rx={15} fill={K.pinkWash} stroke={K.ink} strokeWidth={2} />
        <Avatar who="priya" x={414} y={163} r={11} />
        <text x={431} y={168.5} fontSize={15} fill={K.ink} fontWeight={600}>priya@acme.co</text>
        <Row y={186} name="Northwind Freight" amount="$4,200" paid />
        <Row y={226} name="Kelp & Co" amount="$1,180" />
        <Row y={266} name="Pier 9 Ropes" amount="$640" />
        <Btn x={466} y={312} w={100} h={34} label="Pay" size={17} faceClass="tb-h-pay" />
      </Win>
    </g>
  );
}

/* The round green sticker, stuck on the app's left edge. It sits in the clear
   pocket of the sun disc beside the window, overlapping nothing but the
   window's own border: the tab, the link and the rows all stay readable. */
function CompanyOnly({ v, x, y }: { v: string; x: number; y: number }) {
  return (
    <g>
      <RoundSticker
        x={x}
        y={y}
        r={45}
        tilt={-8}
        id={`hero-only-${v}`}
        big
        className="tb-h-sticker"
        peel={{ angle: -138, depth: 11 }}
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

const LABEL = 'The supplier-payments app open in a browser at acme--supplier-payments.wirl.run, with a Company only sticker on it.';
const LABEL_PHONE = 'The supplier-payments app open in a browser at acme--supplier-payments.wirl.run, with a Company only sticker on it.';

/* Wide: the browser on the sun disc, the sticker alone in the pocket to its
   left. No loose sparkles: the disc is the shine. */
function Wide() {
  return (
    <svg viewBox="0 0 600 412" className="tb-art tb-hero-art tb-hero-wide" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={336} cy={200} r={216} fill={K.sun} />
      <Browser />
      <CompanyOnly v="w" x={98} y={208} />
      <NamedCursor x={540} y={328} who="priya" className="tb-h-cursor" tagLeft />
    </svg>
  );
}

/* Phone: the same browser, bigger. With the chat gone the sticker has room
   under the window's left corner, so the phone gets it too. */
function Phone() {
  return (
    <svg viewBox="0 0 450 420" className="tb-art tb-hero-art tb-hero-phone" role="img" aria-label={LABEL_PHONE} strokeLinecap="round" strokeLinejoin="round">
      {/* Off-centre by 20: centred, the disc showed as a hairline down the
          browser's left side as well as the wedge on the right, which read as a
          mis-registered print. From 245 all of it that shows is one crescent. */}
      <circle cx={245} cy={196} r={200} fill={K.sun} />
      <g transform="translate(-140 -26)">
        <Browser />
      </g>
      <CompanyOnly v="p" x={72} y={352} />
      {/* No name tag here: her email is on the app's own header already. */}
      <g transform="translate(-140 -26)">
        <NamedCursor x={540} y={328} who="priya" className="tb-h-cursor" tag={false} />
      </g>
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
