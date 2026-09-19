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

const WIN_W = 390;
const WIN_H = 236;

/* What a colleague sees at the link: Harbor's sign-in, then the app. */
export function SupplierWindow({ loop = false, w = WIN_W, h = WIN_H }: { loop?: boolean; w?: number; h?: number }) {
  const cx = w / 2;
  return (
    <AppWindow w={w} h={h} name="supplier-payments" bar={C.green}>
      <g className={loop ? 'sb-loop-signin' : undefined}>
        <HarborMark x={cx - 58} y={58} />
        <text x={cx - 30} y={77} fontSize={19} fontWeight={750} fill={C.ink} style={FONT} letterSpacing="-0.02em">harbor.co</text>
        <g transform={`translate(${cx - GOOGLE_W / 2} 100)`}>
          <GoogleButton className={loop ? 'sb-loop-press' : undefined} />
        </g>
        <MiniLock x={cx - 132} y={171} s={0.95} />
        <text x={cx - 110} y={185} fontSize={14.5} fontWeight={500} fill={C.dim} style={FONT}>Only people at harbor.co can open this</text>
      </g>
      {loop && (
        <g className="sb-loop-app">
          <text x={18} y={62} fontSize={16} fontWeight={750} fill={C.ink} style={FONT} letterSpacing="-0.01em">Supplier payments</text>
          <g transform={`translate(${w - 154} 45)`}>
            <rect x={0} y={0} width={138} height={26} rx={13} fill="#EEF8F2" stroke={C.ink} strokeWidth={1.8} />
            <circle cx={14} cy={13} r={5.5} fill={C.sun} stroke={C.ink} strokeWidth={1.4} />
            <text x={25} y={17.8} fontSize={13} fontWeight={600} fill={C.ink} style={FONT}>tom@harbor.co</text>
          </g>
          {[
            ['Northwind Freight', '$12,400'],
            ['Coastal Paper Co.', '$3,180'],
            ['Pier 9 Supplies', '$860'],
          ].map(([name, amt], i) => (
            <g key={name} transform={`translate(0 ${78 + i * 48})`}>
              <path d={`M16 0 H${w - 16}`} stroke="#ECE9E2" strokeWidth={1.5} />
              <text x={18} y={29} fontSize={15} fontWeight={600} fill={C.ink} style={FONT}>{name}</text>
              <text x={w - 92} y={29} fontSize={14.5} fontWeight={600} fill={C.ink} style={MONO} textAnchor="end">{amt}</text>
              <rect x={w - 76} y={10} width={58} height={28} rx={14} fill={C.sun} stroke={C.ink} strokeWidth={2} />
              <text x={w - 47} y={29} fontSize={14} fontWeight={700} fill={C.ink} style={FONT} textAnchor="middle">Pay</text>
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
      W={548} H={520} MW={340} MH={524}
      tone={C.cobalt}
      className="sb-hero"
      label="Priya, at a laptop with Claude, Codex and Cursor stickers on it, asks her agent to deploy supplier-payments. It answers with a link, harbor--supplier-payments.wirl.run, which opens the app behind a Google sign-in that only people at harbor.co can use."
    >
      {/* Priya, peeking over her laptop. */}
      <Sticker w={FACE_W} h={FACE_H} d={[76, 14, 1.3, 3]} m={[44, 12, 1.04, 3]} i={0}>
        <Face who="priya" />
      </Sticker>
      <Sticker w={250} h={146} d={[16, 100, 1, -3]} m={[8, 88, 0.72, -3]} i={0}>
        <LaptopBack w={250} h={146}>
          <MarkSticker id="claude" x={28} y={24} size={26} uid={`${uid}-l1`} r={-12} back />
          <MarkSticker id="codex" x={186} y={20} size={26} uid={`${uid}-l2`} r={10} back />
          <MarkSticker id="cursor" x={128} y={76} size={26} uid={`${uid}-l3`} r={-6} back />
          <SnailSticker x={48} y={86} size={19} r={8} border={3} />
        </LaptopBack>
      </Sticker>

      {/* Her message. One line on wide screens, two on a phone. */}
      <Sticker w={244} h={48} d={[222, 22, 1, -2]} m={false} i={1}>
        <Bubble w={244} h={48} tail="bl">
          <text x={20} y={30} fontSize={16} fontWeight={600} fill={C.ink} style={FONT}>Deploy supplier-payments</text>
        </Bubble>
      </Sticker>
      <Sticker w={168} h={64} d={false} m={[160, 18, 1, -2]} i={1}>
        <Bubble w={168} h={64} tail="bl">
          <text x={16} y={27} fontSize={15} fontWeight={600} fill={C.ink} style={FONT}>Deploy</text>
          <text x={16} y={47} fontSize={15} fontWeight={600} fill={C.ink} style={FONT}>supplier-payments</text>
        </Bubble>
      </Sticker>

      {/* The agent's answer, with the link slapped half over it. */}
      <Sticker w={36} h={36} pad={8} d={[278, 100, 1, -6]} m={[16, 204, 0.95, -6]} i={2} cut={<circle cx={18} cy={18} r={17} />}>
        <circle cx={18} cy={18} r={18} fill={C.white} />
        <MarkSticker id="claude" x={4} y={4} size={28} uid={`${uid}-av`} border={0} />
      </Sticker>
      <Sticker w={200} h={76} d={[324, 96, 1, 2]} m={[60, 198, 0.9, 2]} i={2}>
        <Bubble w={200} h={76} tail="none">
          <text x={18} y={31} fontSize={16} fontWeight={600} fill={C.ink} style={FONT}>Done. It&apos;s live:</text>
        </Bubble>
      </Sticker>
      <Sticker w={LINK_W} h={40} d={[224, 146, 1, -3]} m={[18, 244, 0.98, -3]} i={3} peel={{ a: 20, mode: 'loop', radius: 10 }}>
        <LinkTag />
      </Sticker>

      {/* The app at that link. */}
      <Sticker w={WIN_W} h={WIN_H} d={[80, 250, 1, 1.5]} m={[12, 314, 0.8, 1.5]} i={4} hover={false}>
        <SupplierWindow loop />
      </Sticker>
      <Sticker w={44} h={54} d={[444, 228, 1.05, 10]} m={[290, 298, 0.86, 10]} i={5}>
        <Padlock />
      </Sticker>

      {/* The pointer rests by the link, then goes and signs in. */}
      <Sticker
        w={22} h={30} pad={9}
        d={[504, 188, 1, 0]} m={[240, 280, 1, 0]}
        i={5}
        inner="sb-loop-ptr"
        hover={false}
        style={{ ['--dpdx' as string]: -226, ['--dpdy' as string]: 184, ['--mpdx' as string]: -66, ['--mpdy' as string]: 132 }}
        className="sb-ptr"
      >
        <Pointer />
      </Sticker>
    </Scene>
  );
}
