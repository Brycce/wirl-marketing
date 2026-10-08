// What Wirl is, between the problem and the features. The band above shows
// four tools scattered wherever they could live; this one answers with a
// picture of the same kind of tools in one place: an Acme window holding four
// apps, each with a lock, and the company sign-in underneath. The words stay
// short: a headline and one paragraph that adds what the hero has not said.
// The drawing keeps its own colours in night mode, like every other picture.

import { K, Win, DieCut, Acme, GoogleG } from '../kit';
import { Keep, Split } from '../Page';

const CSS = `
.tbx .wi-text .tb-lede b { font-weight: 750; color: var(--heading); }
.tbx .wi-art { max-width: 520px; margin-left: auto; }
@media (max-width: 959px) { .tbx .wi-art { margin: 0 auto; } }
`;

const APPS: { name: string; bar: string; x: number; y: number }[] = [
  { name: 'supplier-payments', bar: K.coral, x: 40, y: 88 },
  { name: 'candidate-pipeline', bar: K.lilac, x: 264, y: 88 },
  { name: 'budget-lines', bar: K.sun, x: 40, y: 226 },
  { name: 'nda-lookup', bar: K.mint, x: 264, y: 226 },
];

/* One app, as a small card inside the window: its name, two lines, a lock. */
function AppCard({ name, bar, x, y }: { name: string; bar: string; x: number; y: number }) {
  const w = 208;
  const h = 122;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={K.paper} />
      <path d={`M${x} ${y + 32} V${y + 12} A12 12 0 0 1 ${x + 12} ${y} H${x + w - 12} A12 12 0 0 1 ${x + w} ${y + 12} V${y + 32} Z`} fill={bar} />
      <path d={`M${x} ${y + 32} H${x + w}`} stroke={K.ink} strokeWidth={2} />
      <text className="mono" x={x + 13} y={y + 22} fontSize={17} fontWeight={700} fill={K.ink}>{name}</text>
      <rect x={x + 14} y={y + 50} width={118} height={9} rx={4.5} fill={K.edge} />
      <rect x={x + 14} y={y + 68} width={82} height={9} rx={4.5} fill={K.edge} />
      <rect x={x + 14} y={y + 86} width={100} height={9} rx={4.5} fill={K.edge} />
      <rect x={x} y={y} width={w} height={h} rx={12} fill="none" stroke={K.ink} strokeWidth={2.5} />
      {/* The lock on every one */}
      <circle cx={x + w - 24} cy={y + h - 24} r={15} fill={K.green} stroke={K.ink} strokeWidth={2.5} />
      <g transform={`translate(${x + w - 24} ${y + h - 24})`}>
        <path d="M-3.8 -1.4 V-4.2 A3.8 3.8 0 0 1 3.8 -4.2 V-1.4" fill="none" stroke={K.paper} strokeWidth={2.3} />
        <rect x={-6} y={-1.8} width={12} height={9} rx={2.2} fill={K.paper} />
      </g>
    </g>
  );
}

/* The one place: an Acme window with the four tools inside, and under it the
   sign-in that every one of them sits behind. */
function OnePlace() {
  const pill = { x: 62, y: 340, w: 396, h: 42 };
  return (
    <svg viewBox="0 0 520 404" className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <DieCut
        tilt={-2}
        cx={260}
        cy={202}
        big
        cut={
          <>
            <rect x={20} y={24} width={480} height={338} rx={18} />
            <rect x={pill.x} y={pill.y} width={pill.w} height={pill.h} rx={21} />
          </>
        }
      >
        <Win x={26} y={30} w={468} h={326} barH={44} bar={K.green} dots={false}>
          <Acme x={54} y={52} r={12} />
          <text x={74} y={58} fontSize={19} fontWeight={800} fill={K.paper}>acme.co · Internal apps</text>
          {APPS.map((a) => <AppCard key={a.name} {...a} />)}
        </Win>
        {/* The sign-in they all sit behind, stuck across the bottom edge */}
        <rect x={pill.x} y={pill.y} width={pill.w} height={pill.h} rx={21} fill={K.sun} stroke={K.ink} strokeWidth={2.5} />
        <GoogleG x={pill.x + 26} y={pill.y + 21} r={10} />
        <text x={pill.x + 46} y={pill.y + 27} fontSize={17.5} fontWeight={800} fill={K.ink}>Only people at acme.co can open these</text>
      </DieCut>
    </svg>
  );
}

export default function WhatItIs({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <style href="tbx-wi" precedence="default">{CSS}</style>
      <Split
        text={
          <div className="wi-text">
            <h2 className="tb-h2"><Keep text={title} /></h2>
            <p className="tb-lede">{children}</p>
          </div>
        }
        art={<div className="wi-art"><OnePlace /></div>}
      />
    </>
  );
}
