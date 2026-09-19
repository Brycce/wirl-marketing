// The headline, drawn. Priya, peeking over her laptop (covered in agent
// stickers), asks the agent to deploy; it answers with a link; the link opens
// the app behind Harbor's Google sign-in and a padlock. A pointer clicks the
// sign-in, and the app itself appears.

import { C, Scene, Sticker } from '../kit';
import { Face, FACE_W, FACE_H } from '../people';
import {
  AppWindow, Bubble, FONT, GoogleButton, GOOGLE_W, LaptopBack, LinkTag, LINK_W, MarkSticker, MiniLock,
  Padlock, Pointer, SnailSticker, MONO,
} from '../objects';

const WIN_W = 360;
const WIN_H = 272;

/* What a colleague sees at the link: Harbor's sign-in, then the app. */
export function SupplierWindow({ loop = false, w = WIN_W, h = WIN_H }: { loop?: boolean; w?: number; h?: number }) {
  const cx = w / 2;
  return (
    <AppWindow w={w} h={h} name="supplier-payments" bar={C.green}>
      <g className={loop ? 'sb-loop-signin' : undefined}>
        <HarborMark x={cx - 58} y={62} />
        <text x={cx - 30} y={82} fontSize={19} fontWeight={750} fill={C.ink} style={FONT} letterSpacing="-0.02em">harbor.co</text>
        <g transform={`translate(${cx - GOOGLE_W / 2} 110)`}>
          <GoogleButton className={loop ? 'sb-loop-press' : undefined} />
        </g>
        <MiniLock x={cx - 118} y={186} s={0.95} />
        <text x={cx - 96} y={200} fontSize={13.5} fontWeight={500} fill={C.dim} style={FONT}>Only people at harbor.co can open this</text>
      </g>
      {loop && (
        <g className="sb-loop-app">
          <text x={18} y={64} fontSize={16} fontWeight={750} fill={C.ink} style={FONT} letterSpacing="-0.01em">Supplier payments</text>
          <g transform={`translate(${w - 124} 49)`}>
            <rect x={0} y={0} width={108} height={24} rx={12} fill="#EEF8F2" stroke={C.ink} strokeWidth={1.8} />
            <circle cx={13} cy={12} r={5} fill={C.sun} stroke={C.ink} strokeWidth={1.4} />
            <text x={23} y={16.3} fontSize={12} fontWeight={600} fill={C.ink} style={FONT}>tom@harbor.co</text>
          </g>
          {[
            ['Northwind Freight', '$12,400'],
            ['Coastal Paper Co.', '$3,180'],
            ['Pier 9 Supplies', '$860'],
          ].map(([name, amt], i) => (
            <g key={name} transform={`translate(0 ${86 + i * 52})`}>
              <path d={`M16 0 H${w - 16}`} stroke="#ECE9E2" strokeWidth={1.5} />
              <text x={18} y={31} fontSize={14.5} fontWeight={600} fill={C.ink} style={FONT}>{name}</text>
              <text x={w - 92} y={31} fontSize={14} fontWeight={600} fill={C.ink} style={MONO} textAnchor="end">{amt}</text>
              <rect x={w - 76} y={12} width={58} height={28} rx={14} fill={C.sun} stroke={C.ink} strokeWidth={2} />
              <text x={w - 47} y={31} fontSize={13.5} fontWeight={700} fill={C.ink} style={FONT} textAnchor="middle">Pay</text>
            </g>
          ))}
        </g>
      )}
    </AppWindow>
  );
}

/* Harbor's own little logo: a wave on a cobalt tile. 22 x 22 */
export function HarborMark({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={0} y={0} width={22} height={22} rx={6} fill={C.cobalt} stroke={C.ink} strokeWidth={2} />
      <path d="M4 13 C6.5 10 8.5 10 11 13 C13.5 16 15.5 16 18 13" fill="none" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" />
    </g>
  );
}

export function HeroArt() {
  const uid = 'hero';
  return (
    <Scene
      W={548} H={560} MW={340} MH={540}
      tone={C.cobalt}
      className="sb-hero"
      label="Priya, at a laptop with Claude, Codex and Cursor stickers on it, asks her agent to deploy supplier-payments. It answers with a link, harbor--supplier-payments.wirl.run, which opens the app behind a Google sign-in that only people at harbor.co can use."
    >
      {/* Priya, peeking over her laptop. */}
      <Sticker w={FACE_W} h={FACE_H} d={[82, 26, 1.06, 3]} m={[46, 18, 0.9, 3]} i={0}>
        <Face who="priya" />
      </Sticker>
      <Sticker w={220} h={128} d={[26, 104, 1, -3]} m={[16, 86, 0.82, -3]} i={0}>
        <LaptopBack w={220} h={128}>
          <MarkSticker id="claude" x={24} y={20} size={24} uid={`${uid}-l1`} r={-12} back />
          <MarkSticker id="codex" x={160} y={18} size={24} uid={`${uid}-l2`} r={10} back />
          <MarkSticker id="cursor" x={112} y={66} size={24} uid={`${uid}-l3`} r={-6} back />
          <SnailSticker x={42} y={74} size={17} r={8} border={3} />
        </LaptopBack>
      </Sticker>

      {/* Her message. One line on wide screens, two on a phone. */}
      <Sticker w={244} h={48} d={[252, 34, 1, -2]} m={false} i={1}>
        <Bubble w={244} h={48} tail="bl">
          <text x={20} y={30} fontSize={16} fontWeight={600} fill={C.ink} style={FONT}>Deploy supplier-payments</text>
        </Bubble>
      </Sticker>
      <Sticker w={150} h={64} d={false} m={[178, 18, 1, -2]} i={1}>
        <Bubble w={150} h={64} tail="bl">
          <text x={16} y={27} fontSize={15} fontWeight={600} fill={C.ink} style={FONT}>Deploy</text>
          <text x={16} y={47} fontSize={15} fontWeight={600} fill={C.ink} style={FONT}>supplier-payments</text>
        </Bubble>
      </Sticker>

      {/* The agent's answer, with the link slapped half over it. */}
      <Sticker w={168} h={48} d={[300, 104, 1, 2]} m={[150, 106, 0.92, 2]} i={2}>
        <Bubble w={168} h={48} tail="br">
          <text x={18} y={30} fontSize={16} fontWeight={600} fill={C.ink} style={FONT}>Done. It&apos;s live:</text>
        </Bubble>
      </Sticker>
      <Sticker w={36} h={36} pad={8} d={[482, 128, 1, 8]} m={[298, 140, 0.9, 8]} i={2} cut={<circle cx={18} cy={18} r={16} />}>
        <circle cx={18} cy={18} r={18} fill={C.white} />
        <MarkSticker id="claude" x={4} y={4} size={28} uid={`${uid}-av`} border={0} />
      </Sticker>
      <Sticker w={LINK_W} h={40} d={[222, 144, 1, -3]} m={[18, 196, 0.98, -3]} i={3} peel={{ a: 20, mode: 'loop', radius: 10 }}>
        <LinkTag />
      </Sticker>

      {/* The app at that link. */}
      <Sticker w={WIN_W} h={WIN_H} d={[104, 250, 1, 1.5]} m={[14, 262, 0.86, 1.5]} i={4} hover={false}>
        <SupplierWindow loop />
      </Sticker>
      <Sticker w={44} h={54} d={[438, 226, 1.05, 10]} m={[282, 244, 0.9, 10]} i={5}>
        <Padlock />
      </Sticker>

      {/* The pointer rests by the link, then goes and signs in. */}
      <Sticker
        w={22} h={30} pad={9}
        d={[500, 176, 1, 0]} m={[300, 226, 1, 0]}
        i={5}
        inner="sb-loop-ptr"
        hover={false}
        style={{ ['--dpdx' as string]: -202, ['--dpdy' as string]: 208, ['--mpdx' as string]: -127, ['--mpdy' as string]: 152 }}
        className="sb-ptr"
      >
        <Pointer />
      </Sticker>
    </Scene>
  );
}
