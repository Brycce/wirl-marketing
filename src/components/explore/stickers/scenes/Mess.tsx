// Where internal tools live today, four sticker clusters on the tomato page,
// each captioned with label tape: an app on someone's personal Vercel with a
// Stripe key stuck to it; the intern's laptop, on their last day; a pull
// request that has waited three weeks; and an app full of customer data that
// anyone can open, with a stranger reading it.

import { C, Scene, Sticker, tapeWidth, type Place } from '../kit';
import { Face, FACE_W, FACE_H } from '../people';
import { AppWindow, BranchIcon, Clock, FONT, Globe, LaptopFront, MONO, Tape, tapeH } from '../objects';

/* Places a cluster's stickers inside one cell of the 2 x 2, on both layouts.
   Phones shrink the cluster by k but keep the caption at full size. */
function cell(ox: number, oy: number, mox: number, moy: number, k: number) {
  return (x: number, y: number, s = 1, r = 0): { d: Place; m: Place } => ({
    d: [ox + x, oy + y, s, r],
    m: [mox + x * k, moy + y * k, s * k, r],
  });
}

const K = 0.6;
const CELL = 262;
const cells = [
  cell(10, 8, 6, 6, K),
  cell(276, 8, 174, 6, K),
  cell(10, 274, 6, 222, K),
  cell(276, 274, 174, 222, K),
];

function Caption({ at, text, lines, d, mo }: { at: number; text: string; lines: string[]; d: Place; mo: Place }) {
  const w = tapeWidth(text, 14) + 26;
  const mw = Math.max(...lines.map((l) => tapeWidth(l, 13))) + 20;
  return (
    <>
      <Sticker w={w} h={tapeH(1)} d={[d[0] - w / 2, d[1], 1, d[3]]} m={false} i={at} pad={9}>
        <Tape w={w} text={text} />
      </Sticker>
      <Sticker w={mw} h={tapeH(lines.length, 13)} d={false} m={[mo[0] - mw / 2, mo[1], 1, mo[3]]} i={at} pad={9}>
        <Tape w={mw} lines={lines} size={13} />
      </Sticker>
    </>
  );
}

/* A key on a sticky note. 124 x 70 */
function StickyNote() {
  return (
    <g>
      <path d="M0 3 Q0 0 3 0 H121 Q124 0 124 3 V56 L110 70 H3 Q0 70 0 67 Z" fill="#FFE27A" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M110 70 V60 Q110 56 114 56 H124 Z" fill={C.sunDark} stroke={C.ink} strokeWidth={2} strokeLinejoin="round" />
      <text x={10} y={27} fontSize={12.5} fontWeight={700} fill={C.ink} style={MONO}>STRIPE_KEY=</text>
      <text x={10} y={47} fontSize={12.5} fontWeight={500} fill={C.ink} style={MONO}>sk_live_4eC…</text>
    </g>
  );
}

/* HELLO my name is. 112 x 72 */
function NameTag() {
  return (
    <g>
      <rect x={0} y={0} width={112} height={72} rx={9} fill={C.white} />
      <path d="M0 9 Q0 0 9 0 H103 Q112 0 112 9 V30 H0 Z" fill="#E8412F" />
      <rect x={0} y={0} width={112} height={72} rx={9} fill="none" stroke={C.ink} strokeWidth={2.5} />
      <path d="M0 30 H112" stroke={C.ink} strokeWidth={2} />
      <text x={56} y={16} fontSize={13} fontWeight={800} fill="#FFFFFF" textAnchor="middle" style={FONT} letterSpacing="0.06em">HELLO</text>
      <text x={56} y={26.5} fontSize={8.5} fontWeight={600} fill="#FFFFFF" textAnchor="middle" style={FONT}>my name is</text>
      <text x={56} y={56} fontSize={15} fontWeight={700} fill={C.ink} textAnchor="middle" style={FONT} fontStyle="italic">Alex (intern)</text>
    </g>
  );
}

/* A desk calendar, turned to Friday. 62 x 66 */
function DeskCalendar() {
  return (
    <g>
      <rect x={0} y={4} width={62} height={62} rx={9} fill={C.white} stroke={C.ink} strokeWidth={2.5} />
      <path d="M0 13 Q0 4 9 4 H53 Q62 4 62 13 V24 H0 Z" fill={C.cobalt} stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M17 0 V9 M45 0 V9" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <text x={31} y={19.5} fontSize={11} fontWeight={800} fill="#FFFFFF" textAnchor="middle" style={FONT} letterSpacing="0.08em">FRI</text>
      <text x={31} y={43} fontSize={13} fontWeight={800} fill={C.ink} textAnchor="middle" style={FONT}>last</text>
      <text x={31} y={58} fontSize={13} fontWeight={800} fill={C.ink} textAnchor="middle" style={FONT}>day</text>
    </g>
  );
}

/* The pull request, still waiting. 230 x 112 */
function PRCard() {
  return (
    <g>
      <rect x={0} y={0} width={230} height={112} rx={12} fill={C.white} stroke={C.ink} strokeWidth={2.5} />
      <BranchIcon x={16} y={16} />
      <text x={44} y={33} fontSize={15} fontWeight={750} fill={C.ink} style={FONT} letterSpacing="-0.01em">Add candidate-pipeline</text>
      <rect x={44} y={46} width={140} height={25} rx={12.5} fill="#FFF1C2" stroke={C.ink} strokeWidth={1.8} />
      <circle cx={57} cy={58.5} r={4} fill={C.sunDark} />
      <text x={67} y={63} fontSize={12.5} fontWeight={650} fill={C.ink} style={FONT}>Review requested</text>
      <text x={44} y={96} fontSize={12.5} fontWeight={600} style={MONO}>
        <tspan fill={C.greenDark}>+412</tspan><tspan fill={C.dim}> </tspan><tspan fill={C.tomatoDark}>−3</tspan>
      </text>
      <text x={214} y={96} fontSize={12.5} fontWeight={600} fill={C.dim} textAnchor="end" style={FONT}>#214</text>
    </g>
  );
}

function Rows({ x, y, w, n, gap = 20 }: { x: number; y: number; w: number; n: number; gap?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${x} ${y + i * gap})`}>
          <rect x={0} y={0} width={w * (0.5 + ((i * 37) % 30) / 100)} height={8} rx={4} fill="#E4E1D9" />
          <rect x={w - 34} y={0} width={34} height={8} rx={4} fill="#E4E1D9" />
        </g>
      ))}
    </g>
  );
}

export function MessArt() {
  const [a, b, c, d] = cells;
  const tapeY = 222;
  const mTapeY = 150;
  const cap = (n: number): { d: Place; mo: Place } => {
    const ox = n % 2 === 0 ? 10 : 276;
    const oy = n < 2 ? 8 : 274;
    const mox = n % 2 === 0 ? 6 : 174;
    const moy = n < 2 ? 6 : 222;
    return { d: [ox + CELL / 2, oy + tapeY, 1, n % 2 ? 2 : -2], mo: [mox + 80, moy + mTapeY, 1, n % 2 ? 2 : -2] };
  };
  return (
    <Scene
      W={548} H={540} MW={340} MH={440}
      tone={C.tomato}
      label="Four places internal tools live today: an app on someone's personal Vercel with a Stripe key stuck to it; an app on the intern's laptop, on their last day; a pull request that has been waiting three weeks for review; and an app full of customer emails that is public, with a stranger reading it."
    >
      {/* (a) Someone's personal Vercel, with a key pasted in */}
      <Sticker w={230} h={150} {...a(12, 26, 1, -3)} i={0}>
        <AppWindow w={230} h={150} name="spend-requests" bar={C.grey} url="spend-requests-jake.vercel.app">
          <Rows x={16} y={84} w={198} n={3} />
        </AppWindow>
      </Sticker>
      <Sticker w={124} h={70} {...a(118, 120, 1, 7)} i={1}>
        <StickyNote />
      </Sticker>
      <Caption at={2} text="Someone's personal Vercel" lines={["Someone's", 'personal Vercel']} {...cap(0)} />

      {/* (b) The intern's laptop, until the intern leaves */}
      <Sticker w={196} h={146} {...b(40, 18, 1, 2)} i={2}>
        <LaptopFront w={196} h={146}>
          <g transform="translate(22 20)">
            <rect x={0} y={0} width={152} height={84} rx={6} fill={C.white} stroke={C.ink} strokeWidth={2} />
            <path d="M0 18 V6 Q0 0 6 0 H146 Q152 0 152 6 V18 Z" fill={C.lilac} stroke={C.ink} strokeWidth={2} strokeLinejoin="round" />
            <text x={10} y={13.5} fontSize={10.5} fontWeight={650} fill={C.ink} style={FONT}>desk-booking</text>
            <Rows x={10} y={30} w={132} n={3} gap={16} />
          </g>
        </LaptopFront>
      </Sticker>
      <Sticker w={62} h={66} {...b(0, 96, 1, -8)} i={3}>
        <DeskCalendar />
      </Sticker>
      <Sticker w={112} h={72} {...b(150, 128, 0.88, -7)} i={3} peel={{ a: 22, mode: 'loop', radius: 9 }} className="peel-slow">
        <NameTag />
      </Sticker>
      <Caption at={4} text="The intern's laptop" lines={["The intern's", 'laptop']} {...cap(1)} />

      {/* (c) A pull request, waiting on an engineer */}
      <Sticker w={230} h={112} {...c(10, 58, 1, 2)} i={4}>
        <PRCard />
      </Sticker>
      <Sticker
        w={166} h={58} {...c(90, 14, 1, 5)} i={5}
        cut={<><rect x={0} y={17} width={124} height={24} rx={6} /><circle cx={137} cy={29} r={27} /></>}
      >
        <rect x={0} y={17} width={124} height={24} rx={5} fill={C.ink} />
        <text x={56} y={33.5} fontSize={12.5} fontWeight={650} fill="#FFFFFF" textAnchor="middle" style={FONT}>waiting 3 weeks</text>
        <g transform="translate(108 0)"><Clock handClass="sb-hand" /></g>
      </Sticker>
      <Caption at={6} text="A PR waiting on an engineer" lines={['A PR waiting', 'on an engineer']} {...cap(2)} />

      {/* (d) Public by accident, and someone is reading it */}
      <Sticker w={FACE_W} h={FACE_H} {...d(22, -14, 0.8, -4)} i={6}>
        <Face who="stranger" />
      </Sticker>
      <Sticker w={232} h={146} {...d(12, 60, 1, 2)} i={7}>
        <AppWindow w={232} h={146} name="customer-credits" bar={C.sky}>
          {[
            ['ana@kitefoods.com', '$120'],
            ['li.wei@parcel.io', '$45'],
            ['rob@maplebank.co', '$300'],
            ['sofia@tinytrain.eu', '$80'],
          ].map(([e, amt], i) => (
            <g key={e} transform={`translate(0 ${44 + i * 25})`}>
              <text x={14} y={12} fontSize={12} fontWeight={500} fill={C.ink} style={MONO}>{e}</text>
              <text x={218} y={12} fontSize={12} fontWeight={600} fill={C.ink} style={MONO} textAnchor="end">{amt}</text>
            </g>
          ))}
        </AppWindow>
      </Sticker>
      <Sticker w={78} h={30} {...d(134, 30, 1, -8)} i={8}>
        <rect x={0} y={0} width={78} height={30} rx={15} fill="#E8412F" stroke={C.ink} strokeWidth={2.5} />
        <text x={39} y={20.5} fontSize={14.5} fontWeight={750} fill="#FFFFFF" textAnchor="middle" style={FONT}>Public</text>
      </Sticker>
      <Sticker w={40} h={40} {...d(222, 12, 1.05, 10)} i={8}>
        <Globe />
      </Sticker>
      <Caption at={8} text="Public by accident" lines={['Public by', 'accident']} {...cap(3)} />
    </Scene>
  );
}
