// The people at Harbor, as face stickers: head, neck and shoulders, each with
// their own hair and the shirt they always wear. Dot eyes like the snail's,
// a short smile, a blush. The same faces come back all down the page.
// Drawn in a 100 x 112 box; the head is centred at (50, 42).

import type { ReactNode } from 'react';
import { C, Blob } from './kit';

export type Who = 'priya' | 'tom' | 'lena' | 'sam' | 'mia' | 'jo' | 'ade' | 'stranger';

const SKIN: [string, string][] = [
  ['#F5D0B5', '#E4B896'],
  ['#E0A87F', '#C98E66'],
  ['#B97850', '#A0633E'],
  ['#7A4A2E', '#653B23'],
];

type Person = {
  name: string;
  skin: number;
  shirt: [string, string];
  hair: string;
  collar: 'crew' | 'shirt' | 'hood' | 'none';
  blink: number;
};

export const PEOPLE: Record<Who, Person> = {
  priya: { name: 'Priya N.', skin: 2, shirt: [C.tomato, C.tomatoDark], hair: '#2A2320', collar: 'crew', blink: 4.4 },
  tom: { name: 'Tom A.', skin: 0, shirt: [C.sun, C.sunDark], hair: '#6B3E23', collar: 'crew', blink: 5.3 },
  lena: { name: 'Lena K.', skin: 1, shirt: [C.cobalt, C.cobaltDark], hair: '#E0A63A', collar: 'shirt', blink: 6.1 },
  sam: { name: 'Sam O.', skin: 3, shirt: [C.green, C.greenDark], hair: '#2A2320', collar: 'crew', blink: 4.9 },
  mia: { name: 'Mia R.', skin: 0, shirt: [C.lilac, C.lilacDark], hair: '#6B3E23', collar: 'shirt', blink: 5.7 },
  jo: { name: 'Jo P.', skin: 1, shirt: [C.sky, C.skyDark], hair: '#6B3E23', collar: 'hood', blink: 4.6 },
  ade: { name: 'Ade B.', skin: 3, shirt: [C.gum, C.gumDark], hair: '#2A2320', collar: 'crew', blink: 5.1 },
  stranger: { name: 'Stranger', skin: 1, shirt: ['#8C929B', '#737982'], hair: '#8C929B', collar: 'none', blink: 5 },
};

const O = { stroke: C.ink, strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

function Torso({ p }: { p: Person }) {
  const [shirt, dark] = p.shirt;
  const v = p.collar === 'shirt';
  // Shoulders with a neckline: a scoop for a sweater, a V under a shirt collar.
  const neck = v ? 'L50 88 L62 74.5' : 'C44 84 56 84 62 74.5';
  return (
    <g>
      <path d={`M7 104 C7 86 22 77 38 74.5 ${neck} C78 77 93 86 93 104 V106 Q93 112 87 112 H13 Q7 112 7 106 Z`} fill={shirt} {...O} />
      {p.collar === 'crew' && <path d="M38 74.5 C44 84 56 84 62 74.5" fill="none" stroke={dark} strokeWidth={5} strokeLinecap="round" />}
      {p.collar === 'crew' && <path d="M35.5 75.5 C43 88 57 88 64.5 75.5" fill="none" stroke={C.ink} strokeWidth={2} strokeLinecap="round" opacity={0.9} />}
      {v && (
        <>
          <path d="M37 73 L50 87 L43 93 L33 78 Z" fill={C.white} {...O} />
          <path d="M63 73 L50 87 L57 93 L67 78 Z" fill={C.white} {...O} />
        </>
      )}
      {p.collar === 'hood' && (
        <>
          <path d="M28 80 C34 70 42 72 50 82 C58 72 66 70 72 80" fill="none" stroke={dark} strokeWidth={6} strokeLinecap="round" />
          <path d="M45 86 V99 M55 86 V99" stroke={C.ink} strokeWidth={2} strokeLinecap="round" />
          <circle cx={45} cy={100.5} r={1.8} fill={C.ink} />
          <circle cx={55} cy={100.5} r={1.8} fill={C.ink} />
        </>
      )}
      {/* A soft fold at each shoulder, the one band of depth on the sweater. */}
      <path d="M22 100 C22 94 24 90 27 87" fill="none" stroke={dark} strokeWidth={3} strokeLinecap="round" />
      <path d="M78 100 C78 94 76 90 73 87" fill="none" stroke={dark} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

function HairBack({ who, p }: { who: Who; p: Person }) {
  const f = p.hair;
  switch (who) {
    case 'priya':
      return <path d="M22.5 46 C21 23 33 12.5 50 12.5 C67 12.5 79 23 77.5 46 L78.5 66 C78.5 70.5 76 72.5 72 72.5 L28 72.5 C24 72.5 21.5 70.5 21.5 66 Z" fill={f} {...O} />;
    case 'mia':
      return <path d="M23 46 C21 22 34 12.5 50 12.5 C66 12.5 79 22 77 46 L80 86 C80.5 91 77 93 73 93 L63 93 C60 93 58 90 58 86 L42 86 C42 90 40 93 37 93 L27 93 C23 93 19.5 91 20 86 Z" fill={f} {...O} />;
    case 'ade':
      return (
        <Blob fill={f}>
          <path d="M23 44 C21 23 34 12 50 12 C66 12 79 23 77 44 Z" />
          <rect x={18} y={30} width={8.5} height={58} rx={4.25} />
          <rect x={26.5} y={40} width={7.5} height={50} rx={3.75} />
          <rect x={73.5} y={30} width={8.5} height={58} rx={4.25} />
          <rect x={66} y={40} width={7.5} height={50} rx={3.75} />
        </Blob>
      );
    case 'lena':
      return (
        <g>
          <circle cx={50} cy={13} r={11.5} fill={f} {...O} />
          <path d="M44 9 C47 7 53 7 56 9" fill="none" stroke="#C88A22" strokeWidth={2.5} strokeLinecap="round" />
        </g>
      );
    case 'stranger':
      return <path d="M15 64 C12 28 29 8 50 8 C71 8 88 28 85 64 L87 86 C87 90 85 92 81 92 H19 C15 92 13 90 13 86 Z" fill={f} {...O} />;
    default:
      return null;
  }
}

function HairFront({ who, p }: { who: Who; p: Person }) {
  const f = p.hair;
  switch (who) {
    case 'priya':
      // A blunt fringe, cut straight across.
      return <path d="M25 44 C24 25 35 15.5 50 15.5 C65 15.5 76 25 75 44 C73 38 70 34.5 64 33.5 C56 34.5 44 34.5 36 33.5 C30 34.5 27 38 25 44 Z" fill={f} {...O} />;
    case 'tom':
      return (
        <Blob fill={f}>
          <path d="M25 42 C25 26 36 17 50 17 C64 17 75 26 75 42 C70 35 60 31.5 50 31.5 C40 31.5 30 35 25 42 Z" />
          <circle cx={27} cy={34} r={7.5} />
          <circle cx={32} cy={24.5} r={8.5} />
          <circle cx={42} cy={18} r={9} />
          <circle cx={53} cy={16} r={9} />
          <circle cx={63} cy={19.5} r={8.5} />
          <circle cx={70.5} cy={27} r={8} />
          <circle cx={74} cy={36} r={6.5} />
        </Blob>
      );
    case 'lena':
      // Pulled back into the bun: a smooth cap with a soft hairline.
      return (
        <g>
          <path d="M25 44 C24 25 35 16 50 16 C65 16 76 25 75 44 C73 34 64 27.5 50 27.5 C36 27.5 27 34 25 44 Z" fill={f} {...O} />
          <path d="M40 19.5 C44 22 46 25 47 27.5 M57 19 C55 22 54 25 53.5 27.5" fill="none" stroke="#C88A22" strokeWidth={2} strokeLinecap="round" />
        </g>
      );
    case 'sam':
      // A buzz cut hugging the head.
      return <path d="M25.5 39 C25.5 25 36 17 50 17 C64 17 74.5 25 74.5 39 C71 32 62 28.5 50 28.5 C38 28.5 29 32 25.5 39 Z" fill={f} {...O} />;
    case 'mia':
      // Parted on one side, swept across.
      return (
        <g>
          <path d="M25 46 C23.5 25 35 15.5 50 15.5 C65 15.5 76.5 25 75 44 C72 36 63 30 52 29 C43 30 34 35 25 46 Z" fill={f} {...O} />
          <path d="M40 17 C41 22 44 26 50 29" fill="none" stroke="#4E2C18" strokeWidth={2} strokeLinecap="round" />
        </g>
      );
    case 'jo':
      // A cap, peak to the front, a little hair showing at the sides.
      return (
        <g>
          <path d="M24.5 36 L24 50 C24 52 27.5 52 27.5 50 L28 38 Z M75.5 36 L76 50 C76 52 72.5 52 72.5 50 L72 38 Z" fill={f} {...O} />
          <Blob fill={C.tomato}>
            <path d="M23.5 37 C23.5 21 35 13.5 50 13.5 C65 13.5 76.5 21 76.5 37 Z" />
          </Blob>
          <path d="M50 14 V36" stroke={C.tomatoDark} strokeWidth={2} />
          <circle cx={50} cy={13.5} r={2.6} fill={C.tomatoDark} {...O} strokeWidth={2} />
          <path d="M19 36.5 C30 33 70 33 81 36.5 C82 42 76 44.5 70 43 C60 40.5 40 40.5 30 43 C24 44.5 18 42 19 36.5 Z" fill={C.tomatoDark} {...O} />
        </g>
      );
    case 'ade':
      return (
        <Blob fill={f}>
          <path d="M25 42 C24 25 35 15.5 50 15.5 C65 15.5 76 25 75 42 C70 34 60 30.5 50 30.5 C40 30.5 30 34 25 42 Z" />
          <rect x={25} y={24} width={7} height={30} rx={3.5} />
          <rect x={68} y={24} width={7} height={30} rx={3.5} />
          <rect x={41} y={10} width={7} height={16} rx={3.5} transform="rotate(-18 44.5 18)" />
          <rect x={52} y={10} width={7} height={16} rx={3.5} transform="rotate(18 55.5 18)" />
        </Blob>
      );
    default:
      return null;
  }
}

function Eyes({ p, children }: { p: Person; children?: ReactNode }) {
  return (
    <g className="sb-blink" style={{ animationDuration: `${p.blink}s`, animationDelay: `${-p.blink * 0.37}s` }}>
      {children ?? (
        <>
          <circle cx={41} cy={46} r={2.7} fill={C.ink} />
          <circle cx={59} cy={46} r={2.7} fill={C.ink} />
        </>
      )}
    </g>
  );
}

export function Face({ who }: { who: Who }) {
  const p = PEOPLE[who];
  const [skin, shade] = SKIN[p.skin];
  if (who === 'stranger') {
    return (
      <g>
        <Torso p={p} />
        <HairBack who={who} p={p} />
        <path d="M41 58 V76 C41 81 59 81 59 76 V58 Z" fill={shade} {...O} />
        <circle cx={50} cy={44} r={24} fill={skin} {...O} />
        {/* The inside of the hood, shading the brow. */}
        <path d="M25.5 44 C25.5 28 36 20 50 20 C64 20 74.5 28 74.5 44 C70 34 62 30 50 30 C38 30 30 34 25.5 44 Z" fill="#737982" {...O} />
        <g className="sb-shifty">
          <path d="M33 42.5 H48 V47 C48 51 45 52.5 41 52.5 C36.5 52.5 33 51 33 47 Z" fill={C.ink} {...O} strokeWidth={2} />
          <path d="M52 42.5 H67 V47 C67 51 63.5 52.5 59 52.5 C55 52.5 52 51 52 47 Z" fill={C.ink} {...O} strokeWidth={2} />
          <path d="M48 44 H52" stroke={C.ink} strokeWidth={2.5} />
          <path d="M36 45 L39 45" stroke="#FFFFFF" strokeWidth={1.6} strokeLinecap="round" opacity={0.7} />
          <path d="M55 45 L58 45" stroke="#FFFFFF" strokeWidth={1.6} strokeLinecap="round" opacity={0.7} />
        </g>
        <path d="M45.5 59 H54.5" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g>
      <Torso p={p} />
      <HairBack who={who} p={p} />
      <path d="M41 56 V76 C41 81 59 81 59 76 V56 Z" fill={shade} {...O} />
      {p.collar === 'crew' && <path d="M38 74.5 C44 84 56 84 62 74.5" fill="none" stroke={p.shirt[1]} strokeWidth={5} strokeLinecap="round" />}
      <circle cx={25} cy={46} r={5.5} fill={skin} {...O} />
      <circle cx={75} cy={46} r={5.5} fill={skin} {...O} />
      <circle cx={50} cy={42} r={25} fill={skin} {...O} />
      <HairFront who={who} p={p} />
      <circle cx={35} cy={53} r={4.6} fill={C.gum} opacity={0.4} />
      <circle cx={65} cy={53} r={4.6} fill={C.gum} opacity={0.4} />
      <Eyes p={p} />
      <path d="M44.5 55 Q50 60 55.5 55" fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
}

/* Just the head, for small places (the admin table, the closing page).
   Drawn in the same box; use viewBox "14 4 72 72" to crop it. */
export function Head({ who }: { who: Who }) {
  const p = PEOPLE[who];
  const [skin] = SKIN[p.skin];
  return (
    <g>
      <HairBack who={who} p={p} />
      <circle cx={25} cy={46} r={5.5} fill={skin} {...O} />
      <circle cx={75} cy={46} r={5.5} fill={skin} {...O} />
      <circle cx={50} cy={42} r={25} fill={skin} {...O} />
      <HairFront who={who} p={p} />
      <circle cx={35} cy={53} r={4.6} fill={C.gum} opacity={0.4} />
      <circle cx={65} cy={53} r={4.6} fill={C.gum} opacity={0.4} />
      <Eyes p={p} />
      <path d="M44.5 55 Q50 60 55.5 55" fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
}

export const FACE_W = 100;
export const FACE_H = 112;
