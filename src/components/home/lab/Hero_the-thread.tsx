// Hero concept "Asked at 9:02, linked at 9:14" (the-thread). Exploration only.
//
// One plain chat card, the most familiar screen at any company: in # finance,
// Tom asks for a way to approve supplier payments at 9:02, and at 9:14 Priya
// answers with a link. The two timestamps carry the claim (twelve minutes
// from ask to a live tool) without printing a stat; the link's preview says
// who can open it. A green tick with four faces under it says it landed.
//
// Deliberately not Slack: no aubergine, no sidebar, no logo, no threads. One
// emoji only, the Claude mark as a custom emoji after "with Claude".
//
// Motion, once: the tick count goes 3 to 4 with a small pop as Lena's face
// slides onto the stack. The resting (no-motion) state is the finished one.

import { K, Win, CastShadow, Avatar, Acme, MiniLock, Padlock, Check } from '../kit';
import { LogoStickerArt } from '../marks';

const MUTED = '#5E5A4C';
const LINK = 'acme--supplier-payments.wirl.run';

const LABEL =
  'A chat channel called # finance. At 9:02 Tom Abara asks: Could we get a way to approve supplier payments? At 9:14 Priya Nair replies: Made us one with Claude, with a link to acme--supplier-payments.wirl.run. The link preview reads Supplier payments, Only people at acme.co can open it, with a padlock. Four people have reacted with a tick.';

const CSS = `
.hx-the-thread-n3 { opacity: 0; }
.hx-the-thread-pop, .hx-the-thread-n4 { transform-box: fill-box; transform-origin: 50% 50%; }
@media (prefers-reduced-motion: no-preference) {
  .hx-the-thread-n3 { animation: hx-the-thread-out .22s ease-in 1.5s both; }
  .hx-the-thread-n4 { animation: hx-the-thread-in .42s cubic-bezier(.3,1.7,.5,1) 1.62s both; }
  .hx-the-thread-pop { animation: hx-the-thread-pop .5s cubic-bezier(.3,1.6,.5,1) 1.5s both; }
  .hx-the-thread-lena { animation: hx-the-thread-slide .5s cubic-bezier(.2,.9,.3,1.15) 1.4s both; }
}
@keyframes hx-the-thread-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-7px); } }
@keyframes hx-the-thread-in { from { opacity: 0; transform: translateY(8px) scale(.6); } to { opacity: 1; transform: none; } }
@keyframes hx-the-thread-pop { 0% { transform: scale(1); } 40% { transform: scale(1.14); } 100% { transform: scale(1); } }
@keyframes hx-the-thread-slide { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }
`;

/* One message: the face, the name with its time beside it, then the body. */
function Header({ who, name, time, y }: { who: 'tom' | 'priya'; name: string; time: string; y: number }) {
  return (
    <g>
      <Avatar who={who} x={66} y={y + 6} r={20} />
      <text x={98} y={y} fontSize={16} fontWeight={800} fill={K.ink}>
        {name}
        <tspan dx={9} fontSize={14.5} fontWeight={600} fill={MUTED}>{time}</tspan>
      </text>
    </g>
  );
}

/* The Claude mark as a custom emoji: the die-cut logo sticker, text-sized.
   Its own shadow filter, because the kit's is tuned for big stickers and its
   blur gets squared off by the filter region at this size. */
function ClaudeEmoji({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <filter id="hx-the-thread-emo" x="-60%" y="-60%" width="220%" height="240%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="0.7" stdDeviation="0.6" floodColor={K.ink} floodOpacity="0.24" />
          <feDropShadow dx="0" dy="2.2" stdDeviation="1.8" floodColor={K.ink} floodOpacity="0.2" />
        </filter>
      </defs>
      <g filter="url(#hx-the-thread-emo)">
        <g transform={`rotate(-6) scale(${size / 24}) translate(-12 -12)`}>
          <LogoStickerArt agent="claude" uid="hx-the-thread" peel={null} />
        </g>
      </g>
    </g>
  );
}

/* The unfurled link: a rail, the app's name, who can open it, a lock thumbnail. */
function Preview() {
  const x = 98;
  const y = 242;
  const w = 440;
  const h = 96;
  return (
    <g>
      <defs>
        <clipPath id="hx-the-thread-pv">
          <rect x={x} y={y} width={w} height={h} rx={12} />
        </clipPath>
      </defs>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={K.wash} />
      <g clipPath="url(#hx-the-thread-pv)">
        <rect x={x} y={y} width={7} height={h} fill={K.green} />
        <path d={`M${x + 7} ${y} V${y + h}`} stroke={K.ink} strokeWidth={2} />
      </g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="none" stroke={K.ink} strokeWidth={2} />

      <Acme x={124} y={268} r={12} />
      <text x={144} y={275} fontSize={19} fontWeight={800} fill={K.ink}>Supplier payments</text>
      <MiniLock x={124} y={302} s={1.05} color={K.greenEdge} />
      <text x={144} y={309} fontSize={16} fontWeight={700} fill={K.greenEdge}>Only people at acme.co can open it</text>

      <rect x={460} y={256} width={64} height={68} rx={10} fill={K.greenWash} stroke={K.ink} strokeWidth={2} />
      <Padlock x={460 + 32 - 16.5} y={256 + 34 - 23.65} s={0.55} />
    </g>
  );
}

/* The reaction: a tick, a count, and the faces of who pressed it. */
function Reactions() {
  const x = 98;
  const y = 348;
  return (
    <g>
      <g className="hx-the-thread-pop">
        <rect x={x} y={y} width={60} height={30} rx={15} fill={K.greenWash} stroke={K.ink} strokeWidth={2} />
        <Check x={x + 21} y={y + 15} s={1.05} color={K.ink} w={2.8} />
        <text className="hx-the-thread-n3" x={x + 36} y={y + 21.2} fontSize={17} fontWeight={800} fill={K.ink}>3</text>
        <text className="hx-the-thread-n4" x={x + 36} y={y + 21.2} fontSize={17} fontWeight={800} fill={K.ink}>4</text>
      </g>
      <Avatar who="tom" x={x + 81} y={y + 15} r={11} />
      <Avatar who="sam" x={x + 96} y={y + 15} r={11} />
      <g className="hx-the-thread-lena">
        <Avatar who="lena" x={x + 111} y={y + 15} r={11} />
      </g>
    </g>
  );
}

export default function HeroTheThread() {
  return (
    <svg viewBox="0 0 600 412" className="tb-art tb-hero-art" role="img" aria-label={LABEL} strokeLinecap="round" strokeLinejoin="round">
      <style>{CSS}</style>
      <circle cx={300} cy={206} r={206} fill={K.sun} />
      <CastShadow x={24} y={20} w={540} h={372} r={20} dx={12} dy={16} />
      <Win x={24} y={20} w={540} h={372} r={20} bar={K.lilac} barH={46} dots={false}>
        <text x={48} y={49} fontSize={17} fontWeight={800} fill={K.ink}># finance</text>

        <Header who="tom" name="Tom Abara" time="9:02" y={92} />
        <text x={98} y={116} fontSize={17} fontWeight={600} fill={K.ink}>Could we get a way to approve</text>
        <text x={98} y={138} fontSize={17} fontWeight={600} fill={K.ink}>supplier payments?</text>

        <Header who="priya" name="Priya Nair" time="9:14" y={180} />
        <text x={98} y={204} fontSize={17} fontWeight={600} fill={K.ink}>Made us one with Claude</text>
        <ClaudeEmoji x={321} y={197.5} size={20} />
        <text className="mono" x={98} y={228} fontSize={16} fill={K.blue}>{LINK}</text>
        <path d={`M98 231.5 H${98 + LINK.length * 16 * 0.6}`} stroke={K.blue} strokeWidth={1.6} />

        <Preview />
        <Reactions />
      </Win>
    </svg>
  );
}
