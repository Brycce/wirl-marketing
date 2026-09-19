// Treatment A: no tiles. Each logo is itself a sheet of coloured paper, cut to
// the mark's exact silhouette and laid straight into the headline at a slight
// tilt. Paper-ness comes from the same recipe as the scenes (a faintly uneven
// cut edge and a lifted shadow), scaled down so a 24 unit mark reads as cut,
// not melted. Interior details are real paper too: Codex's >_ is a second,
// lighter strip laid on top; Cursor's facet is cut clean out of the dark sheet
// so the page shows through. The + is a small sand-grey plus, flatter than the
// logos so it reads as "and the rest".
//
// Scale: one viewBox unit is 0.03em, so about 1.1px on a 38px phone headline
// and 1.6px at 54px. The marks are 24 units (0.72em, about cap height).

import { useId, type ReactNode } from 'react';
import { AGENT_MARKS, AGENT_NAMES } from '@/components/AgentIcons';

const INK = '#1F2A1F';
const PAPER = '#FCF8F0';
const STONE = '#C9C3B4'; // the scenes' warm grey: quiet next to the logos
const U = 0.03; // em per viewBox unit
const em = (units: number) => `${+(units * U).toFixed(3)}em`;

type Shadow = [dy: number, blur: number, opacity: number];

/* One sheet's worth of paper: a slightly uneven cut edge, then a soft lifted
   shadow with a tighter contact shadow under it so small pieces keep a crisp
   edge. Numbers are in viewBox units. */
function Cut({ id, seed, edge, lift, contact }: { id: string; seed: number; edge: number; lift: Shadow; contact: Shadow }) {
  return (
    <filter id={id} filterUnits="userSpaceOnUse" x="-4" y="-4" width="32" height="34" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves={2} seed={seed} result="warp" />
      <feDisplacementMap in="SourceGraphic" in2="warp" scale={edge} xChannelSelector="R" yChannelSelector="G" />
      <feDropShadow dx="0" dy={lift[0]} stdDeviation={lift[1]} floodColor={INK} floodOpacity={lift[2]} />
      <feDropShadow dx="0" dy={contact[0]} stdDeviation={contact[1]} floodColor={INK} floodOpacity={contact[2]} />
    </filter>
  );
}

const SHEET = { edge: 1.2, lift: [1.1, 1, 0.2] as Shadow, contact: [0.35, 0.3, 0.22] as Shadow };

// Codex, split into its two sheets. Same path data as AGENT_MARKS, with the
// evenodd holes pulled out as their own subpaths so the >_ can sit on top.
const CODEX_BODY =
  'M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457z';
const CODEX_PROMPT =
  'M7.282 8.307a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zM12.728 14.547a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z';

type Layers = (u: string) => ReactNode;

const markOf = (id: string) => AGENT_MARKS.find((m) => m.id === id)!;

// Each piece: which mark, and its sheets. Every sheet gets its own noise seed
// so no two pieces share the same wobble.
const PIECES: { id: string; layers: Layers }[] = [
  {
    // One orange sheet. The rays are thin, so its edge is a touch gentler.
    id: 'claude',
    layers: (u) => (
      <>
        <defs><Cut id={`${u}-claude`} seed={4} {...SHEET} edge={0.9} /></defs>
        <g filter={`url(#${u}-claude)`}>{markOf('claude').icon(u)}</g>
      </>
    ),
  },
  {
    // The gradient sheet, then the >_ as a lighter strip laid on top.
    id: 'codex',
    layers: (u) => (
      <>
        <defs>
          <linearGradient id={`${u}-codex-g`} gradientUnits="userSpaceOnUse" x1="12" x2="12" y1="0" y2="24">
            <stop stopColor="#B1A7FF" />
            <stop offset=".5" stopColor="#7A9DFF" />
            <stop offset="1" stopColor="#3941FF" />
          </linearGradient>
          <Cut id={`${u}-codex`} seed={11} {...SHEET} />
          <Cut id={`${u}-codex-top`} seed={5} edge={0.5} lift={[0.3, 0.3, 0.2]} contact={[0.2, 0.15, 0.3]} />
        </defs>
        <g filter={`url(#${u}-codex)`}><path fill={`url(#${u}-codex-g)`} d={CODEX_BODY} /></g>
        <g filter={`url(#${u}-codex-top)`}><path fill={PAPER} d={CODEX_PROMPT} /></g>
      </>
    ),
  },
  {
    // A dark sheet with the facet cut out, so the page shows through the hole.
    id: 'cursor',
    layers: (u) => (
      <>
        {/* Straight edges show wobble most, so this one is cut as gently as Claude. */}
        <defs><Cut id={`${u}-cursor`} seed={23} {...SHEET} edge={0.9} /></defs>
        <g filter={`url(#${u}-cursor)`} color={INK}>{markOf('cursor').icon(u)}</g>
      </>
    ),
  },
];

const CSS = `
.agent-paper-a { display: inline-flex; align-items: center; gap: .02em; vertical-align: -.07em; }
.agent-paper-a-piece {
  display: block; transform: rotate(var(--tilt, 0deg));
  transition: transform .2s cubic-bezier(.2,.8,.2,1);
}
.agent-paper-a-piece svg { display: block; overflow: visible; height: ${em(28)}; }
@media (hover: hover) {
  .agent-paper-a-piece:not(.agent-paper-a-more):hover { transform: rotate(0deg) translateY(-.05em); }
}
@media (prefers-reduced-motion: reduce) { .agent-paper-a-piece { transition: none; } }
`;

export default function AgentTilesA() {
  // useId can contain characters that are awkward inside url(#...); keep it plain.
  const u = `apa${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <span className="agent-paper-a">
      <style href="agent-paper-a" precedence="default">{CSS}</style>
      <span className="sr-only">{AGENT_NAMES}</span>
      {PIECES.map(({ id, layers }) => {
        const { name, tilt } = markOf(id);
        return (
          <span key={id} className="agent-paper-a-piece" title={name} aria-hidden="true" style={{ ['--tilt' as string]: `${tilt}deg` }}>
            <svg viewBox="-2 -2 28 28" style={{ width: em(28) }} focusable="false">{layers(u)}</svg>
          </span>
        );
      })}
      {/* And the rest: a small plus in stone, flatter than the logos. */}
      <span className="agent-paper-a-piece agent-paper-a-more" title="Any agent that speaks MCP" aria-hidden="true" style={{ ['--tilt' as string]: '4deg' }}>
        <svg viewBox="3.8 -2 16.4 28" style={{ width: em(16.4) }} focusable="false">
          <defs><Cut id={`${u}-more`} seed={17} edge={0.8} lift={[0.7, 0.7, 0.14]} contact={[0.25, 0.25, 0.2]} /></defs>
          <g filter={`url(#${u}-more)`} fill={STONE}>
            <rect x="10" y="5.8" width="4" height="12.4" rx="1.1" />
            <rect x="5.8" y="10" width="12.4" height="4" rx="1.1" />
          </g>
        </svg>
      </span>
    </span>
  );
}
