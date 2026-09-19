// Harbor's page of the sticker book: seven people and the tool each one
// built, all on Wirl (green bar, padlock), each with the sticker of the agent
// that built it.

import { Fragment, type ReactNode } from 'react';
import { C, Scene, Sticker, type Place } from '../kit';
import { Face, FACE_W, FACE_H, type Who } from '../people';
import { AppWindow, MarkSticker, MONO, Tape, tapeH } from '../objects';

const WW = 190;
const WH = 118;

function Bar({ x, y, w, fill = '#E6E3DB' }: { x: number; y: number; w: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={8} rx={4} fill={fill} />;
}

const BODIES: Record<string, ReactNode> = {
  'supplier-payments': (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${44 + i * 24})`}>
          <Bar x={12} y={0} w={[74, 60, 68][i]} />
          <rect x={146} y={-5} width={32} height={18} rx={9} fill={C.sun} stroke={C.ink} strokeWidth={1.5} />
        </g>
      ))}
    </g>
  ),
  'candidate-pipeline': (
    <g>
      {[0, 1, 2].map((c) => (
        <g key={c} transform={`translate(${12 + c * 58} 40)`}>
          <rect x={0} y={0} width={50} height={68} rx={6} fill="#F3F1EC" />
          {Array.from({ length: 3 - c }, (_, k) => (
            <rect key={k} x={5} y={6 + k * 20} width={40} height={15} rx={4} fill={[C.lilac, C.sky, C.gum][(c + k) % 3]} stroke={C.ink} strokeWidth={1.3} />
          ))}
        </g>
      ))}
    </g>
  ),
  'incident-handover': (
    <g>
      {[C.tomato, C.sun, C.green].map((col, i) => (
        <g key={col} transform={`translate(0 ${46 + i * 24})`}>
          <circle cx={18} cy={4} r={5} fill={col} stroke={C.ink} strokeWidth={1.5} />
          <Bar x={30} y={0} w={[110, 86, 98][i]} />
        </g>
      ))}
    </g>
  ),
  'nda-lookup': (
    <g>
      <rect x={12} y={40} width={166} height={24} rx={12} fill="#F3F1EC" stroke={C.ink} strokeWidth={1.5} />
      <circle cx={27} cy={51} r={5} fill="none" stroke={C.ink} strokeWidth={1.8} />
      <path d="M31 55 L35 59" stroke={C.ink} strokeWidth={1.8} strokeLinecap="round" />
      <text x={42} y={56.5} fontSize={11.5} fill={C.dim} style={MONO}>coastal paper</text>
      <g transform="translate(0 78)">
        <path d="M14 4 l3 3 l6 -6" fill="none" stroke={C.greenDark} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        <Bar x={30} y={0} w={100} />
      </g>
      <g transform="translate(0 98)">
        <Bar x={30} y={0} w={78} />
      </g>
    </g>
  ),
  'budget-lines': (
    <g>
      <path d="M14 106 H176" stroke={C.ink} strokeWidth={1.6} strokeLinecap="round" />
      {[34, 52, 26, 60, 44].map((hh, i) => (
        <rect key={i} x={22 + i * 31} y={104 - hh} width={20} height={hh} rx={3} fill={i === 3 ? C.cobalt : C.sky} stroke={C.ink} strokeWidth={1.4} />
      ))}
    </g>
  ),
  'customer-credits': (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${46 + i * 24})`}>
          <Bar x={12} y={0} w={[96, 80, 88][i]} />
          <text x={178} y={8} fontSize={11.5} fontWeight={600} fill={C.ink} textAnchor="end" style={MONO}>{['$120', '$45', '$300'][i]}</text>
        </g>
      ))}
    </g>
  ),
  'spend-requests': (
    <g>
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(0 ${48 + i * 32})`}>
          <Bar x={12} y={0} w={[84, 70][i]} />
          <Bar x={12} y={13} w={[50, 60][i]} fill="#EFECE5" />
          <rect x={120} y={-2} width={58} height={22} rx={11} fill={C.green} stroke={C.ink} strokeWidth={1.5} />
          <path d="M140 9 l4 4 l8 -8" fill="none" stroke={C.ink} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </g>
  ),
};

type Pair = { who: Who; app: string; agent: string | null; d: [number, number, number]; m: [number, number, number] };

// d and m: the pair's top-left corner and tilt, on wide screens and phones.
const PAIRS: Pair[] = [
  { who: 'priya', app: 'supplier-payments', agent: 'claude', d: [16, 22, -3], m: [4, 12, -3] },
  { who: 'tom', app: 'candidate-pipeline', agent: 'cursor', d: [226, 14, 2], m: [170, 18, 2] },
  { who: 'lena', app: 'incident-handover', agent: null, d: [436, 28, -2], m: [4, 128, 2] },
  { who: 'sam', app: 'nda-lookup', agent: 'codex', d: [96, 184, 3], m: [170, 134, -2] },
  { who: 'mia', app: 'budget-lines', agent: 'claude', d: [336, 176, -2], m: [4, 244, -2] },
  { who: 'jo', app: 'customer-credits', agent: 'cursor', d: [30, 344, -2], m: [170, 250, 3] },
  { who: 'ade', app: 'spend-requests', agent: 'codex', d: [262, 340, 3], m: [88, 358, -1] },
];

const K = 0.74;

export function ClosingArt() {
  return (
    <Scene
      W={648} H={500} MW={340} MH={458}
      tone={C.gum}
      label="Seven people at Harbor, each next to the internal tool they built, all on Wirl: supplier-payments, candidate-pipeline, incident-handover, nda-lookup, budget-lines, customer-credits and spend-requests."
      style={{ ['--gap' as string]: '60ms' }}
    >
      {PAIRS.map(({ who, app, agent, d, m }, n) => {
        const at = (x: number, y: number, s: number): { d: Place; m: Place } => ({
          d: [d[0] + x, d[1] + y, s, d[2]],
          m: [m[0] + x * K, m[1] + y * K, s * K, m[2]],
        });
        return (
          <Fragment key={app}>
            <Sticker w={WW} h={WH} {...at(16, 0, 1)} i={n}>
              <AppWindow w={WW} h={WH} name={app} bar={C.green} dots={false} lock bar_h={28} nameSize={13.5}>
                {BODIES[app]}
              </AppWindow>
            </Sticker>
            <Sticker w={FACE_W} h={FACE_H} {...at(-4, 62, 0.6)} i={n}>
              <Face who={who} />
            </Sticker>
            {agent && (
              <Sticker w={24} h={24} pad={8} {...at(42, 106, 1.05)} i={n}>
                <MarkSticker id={agent} size={24} uid={`close-${app}`} border={0} />
              </Sticker>
            )}
          </Fragment>
        );
      })}
      {/* The page's own label: whose page of the book this is. */}
      <Sticker w={110} h={tapeH(1, 15)} pad={9} d={[500, 440, 1, -4]} m={false} i={7}>
        <Tape w={110} text="harbor.co" size={15} />
      </Sticker>
    </Scene>
  );
}
