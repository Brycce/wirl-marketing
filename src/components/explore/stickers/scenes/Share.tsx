// Share the link or the code. Priya sends the link in chat; Tom opens the
// same app, and it gets one more button, with his name on the new version.

import { C, Scene, Sticker } from '../kit';
import { Face, FACE_W, FACE_H } from '../people';
import { AppWindow, Bubble, FONT, LinkTag, LINK_W, Padlock } from '../objects';
import { SupplierRows } from './Wirl';

export function ShareArt() {
  return (
    <Scene
      W={548} H={470} MW={340} MH={480}
      tone={C.lilac}
      label="Priya sends the link to supplier-payments in chat. Tom opens the same app, and a new Export CSV button is being added to it, tagged v5 by Tom."
    >
      <Sticker w={FACE_W} h={FACE_H} d={[20, 28, 0.98, -3]} m={[8, 14, 0.82, -3]} i={0}>
        <Face who="priya" />
      </Sticker>
      <Sticker w={250} h={48} d={[134, 30, 1, -2]} m={[98, 14, 0.9, -2]} i={1}>
        <Bubble w={250} h={48} tail="bl">
          <text x={20} y={30} fontSize={16} fontWeight={600} fill={C.ink} style={FONT}>Here&apos;s the supplier tool</text>
        </Bubble>
      </Sticker>
      <Sticker w={LINK_W} h={40} d={[128, 94, 1, -3]} m={[20, 104, 0.98, -3]} i={2}>
        <LinkTag />
      </Sticker>

      <Sticker w={320} h={210} d={[134, 188, 1, 1.5]} m={[12, 176, 0.86, 1.5]} i={3} hover={false}>
        <AppWindow w={320} h={210} name="supplier-payments" bar={C.green}>
          <SupplierRows w={320} y={60} n={3} />
          <rect x={18} y={166} width={128} height={30} rx={15} fill="none" stroke="#DAD6CC" strokeWidth={1.8} strokeDasharray="5 4" />
        </AppWindow>
      </Sticker>
      <Sticker w={44} h={54} d={[430, 170, 0.8, 10]} m={[262, 162, 0.7, 10]} i={3}>
        <Padlock />
      </Sticker>

      {/* Tom's change, going on. */}
      <Sticker w={128} h={34} d={[152, 352, 1, -4]} m={[28, 318, 0.86, -4]} i={5}>
        <rect x={0} y={0} width={128} height={34} rx={17} fill={C.tomato} stroke={C.ink} strokeWidth={2.5} />
        <path d="M22 11 V21 M17 17 L22 22 L27 17 M16 25 H28" fill="none" stroke={C.ink} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        <text x={38} y={22.3} fontSize={14.5} fontWeight={700} fill={C.ink} style={FONT}>Export CSV</text>
      </Sticker>
      <Sticker w={82} h={28} d={[296, 360, 1, 6]} m={[150, 326, 0.9, 6]} i={6}>
        <rect x={0} y={0} width={82} height={28} rx={8} fill={C.white} stroke={C.ink} strokeWidth={2.5} />
        <circle cx={14} cy={14} r={4} fill={C.green} stroke={C.ink} strokeWidth={1.5} />
        <text x={25} y={18.8} fontSize={13} fontWeight={700} fill={C.ink} style={FONT}>v5 · Tom</text>
      </Sticker>
      <Sticker w={FACE_W} h={FACE_H} d={[412, 312, 1.08, 4]} m={[238, 350, 0.9, 4]} i={4}>
        <Face who="tom" />
      </Sticker>
    </Scene>
  );
}
