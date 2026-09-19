// The stickers stuck on the corners of the 'What you don't have to build'
// cards. Each reuses a sticker from further up the page, so they read at once.

import { C, Scene, Sticker } from '../kit';
import { Face, FACE_W, FACE_H } from '../people';
import { FONT, GoogleButton, LaptopFront, MONO, Safe, Versions } from '../objects';

export function NoInvitesArt() {
  return (
    <Scene W={200} H={120} tone="transparent" label="A Sign in with Google button, with three people from Harbor behind it.">
      <Sticker w={FACE_W} h={FACE_H} d={[26, 4, 0.5, -12]} i={0}><Face who="tom" /></Sticker>
      <Sticker w={FACE_W} h={FACE_H} d={[124, 4, 0.5, 12]} i={0}><Face who="sam" /></Sticker>
      <Sticker w={FACE_W} h={FACE_H} d={[74, -4, 0.52, 0]} i={0}><Face who="lena" /></Sticker>
      <Sticker w={206} h={40} d={[14, 62, 0.84, -4]} i={1}><GoogleButton /></Sticker>
    </Scene>
  );
}

export function LaptopArt() {
  return (
    <Scene W={200} H={120} tone="transparent" label="A laptop whose screen shows the command npx wirl dev, with a localhost tag.">
      <Sticker w={160} h={112} d={[22, 6, 1, 3]} i={0}>
        <LaptopFront w={160} h={112} screen={C.ink}>
          <text x={20} y={36} fontSize={12.5} fill={C.green} style={MONO}>$</text>
          <text x={32} y={36} fontSize={12.5} fill="#E8F1E8" style={MONO}>npx wirl dev</text>
          <rect x={20} y={48} width={70} height={7} rx={3.5} fill="#3E4A3E" />
          <rect x={20} y={62} width={96} height={7} rx={3.5} fill="#3E4A3E" />
        </LaptopFront>
      </Sticker>
      <Sticker w={104} h={28} d={[92, 84, 1, -6]} i={1}>
        <rect x={0} y={0} width={104} height={28} rx={14} fill={C.sky} stroke={C.ink} strokeWidth={2.5} />
        <text x={52} y={18.8} fontSize={13} fontWeight={700} fill={C.ink} textAnchor="middle" style={FONT}>localhost</text>
      </Sticker>
    </Scene>
  );
}

export function KeysArt() {
  return (
    <Scene W={200} H={120} tone="transparent" label="A password field with a key icon, and an arrow into the safe.">
      <Sticker w={62} h={65} pad={9} d={[132, 44, 1, 5]} i={1} cut={<rect x={0} y={0} width={62} height={65} rx={8} />}>
        <g transform="scale(0.646)"><Safe /></g>
      </Sticker>
      <Sticker w={150} h={70} d={[4, 14, 1, -4]} i={0} cut={<rect x={0} y={0} width={150} height={40} rx={10} />}>
        <rect x={0} y={0} width={150} height={40} rx={10} fill={C.white} stroke={C.ink} strokeWidth={2.5} />
        <g transform="translate(12 12)" stroke={C.ink} strokeWidth={2.2} fill="none" strokeLinecap="round">
          <circle cx={6} cy={8} r={5} fill={C.sun} />
          <path d="M11 8 H22 M18 8 V12 M22 8 V11" />
        </g>
        {[0, 1, 2, 3, 4, 5, 6].map((k) => <circle key={k} cx={50 + k * 12} cy={20} r={3.6} fill={C.ink} />)}
      </Sticker>
      <Sticker w={40} h={30} pad={8} d={[104, 60, 1, 0]} i={1} hover={false}>
        <path d="M2 2 C8 20 20 26 34 24" fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
        <path d="M27 17 L35 24 L27 30" fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </Sticker>
    </Scene>
  );
}

export function RollbackArt() {
  return (
    <Scene W={200} H={120} tone="transparent" label="Version v4 marked failed, with an arrow back to version v3, marked good.">
      <Sticker w={196} h={64} d={[14, 30, 0.88, -4]} i={0}>
        <Versions />
      </Sticker>
    </Scene>
  );
}
