// Lab variant B: two layers of cut paper. Each tile is a cream square cut by
// hand (uneven edge, lifted off the page, tilted), and the logo is a second,
// smaller piece cut from coloured stock and glued on top, a few degrees off
// square, with its own tight contact shadow. The logos keep their exact
// silhouettes and brand colours; only the tile's edge is roughened.
// The "+" is an empty slot: a pencilled dashed outline where the next piece
// would go, so it reads as "and others" without competing with the logos.
// Drop-in for <AgentIcons /> inside the hero h1. Sized in em.

import { useId } from 'react';
import { AGENT_MARKS, AGENT_NAMES } from '@/components/AgentIcons';

const INK = '#1F2A1F';
const PAPER = '#FCF8F0';

// How each logo was glued down: rotated a little against its tile and nudged
// a hair off centre, so the two sheets read as separate pieces. The net angle
// (tile tilt + glue) stays within a couple of degrees of upright.
const GLUE: Record<string, { r: number; dx: number; dy: number; seed: number }> = {
  claude: { r: 3.5, dx: -0.35, dy: 0.25, seed: 7 },
  codex: { r: -2.5, dx: 0.3, dy: -0.2, seed: 3 },
  cursor: { r: 3, dx: 0.25, dy: 0.3, seed: 11 },
};

// Tiles are drawn in a 40-unit box (0.92em), so 1 unit is roughly 0.9px on a
// phone and 1.25px on desktop. Displacement 1.8 at this frequency moves an
// edge by about half a pixel: cut by hand, not melted.
// The live row's baseline is the bottom of the logo inside each tile (0.74em
// down), but these tiles have no inner baseline, so the row takes the tile's
// bottom edge instead. -.32em puts the tiles exactly where today's sit.
const CSS = `
.agtB{display:inline-flex;gap:.14em;vertical-align:-.32em;margin-left:.06em;color:${INK}}
.agtB-tile{display:block;flex:none;width:.92em;height:.92em;transform:rotate(var(--tilt,0deg));transition:transform .2s cubic-bezier(.2,.8,.2,1)}
.agtB-tile svg{display:block;width:100%;height:100%;overflow:visible}
@media (hover:hover){.agtB-paper:hover{transform:rotate(calc(var(--tilt,0deg) * .3)) translateY(-.06em)}}
@media (prefers-reduced-motion:reduce){.agtB-tile{transition:none}}
`;

// The tile: an uneven cut edge, then a soft lift and a tight contact rim so
// the edge still reads against the cream page at 38px.
function EdgeFilter({ id, seed }: { id: string; seed: number }) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="150%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed={seed} result="warp" />
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="cut" />
      <feFlood floodColor={INK} floodOpacity="0.24" />
      <feComposite in2="cut" operator="in" />
      <feGaussianBlur stdDeviation="1.7" />
      <feOffset dy="2" result="lift" />
      <feFlood floodColor={INK} floodOpacity="0.16" />
      <feComposite in2="cut" operator="in" />
      <feGaussianBlur stdDeviation="0.45" />
      <feOffset dy="0.35" result="rim" />
      <feMerge>
        <feMergeNode in="lift" />
        <feMergeNode in="rim" />
        <feMergeNode in="cut" />
      </feMerge>
    </filter>
  );
}

// The logo: no displacement (the silhouette stays exact), just the shadow of a
// thin sheet glued flat, plus a faint lift. It falls through the logo's own
// cut-outs too, the way it would through holes in real paper.
function GlueFilter({ id }: { id: string }) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="150%" colorInterpolationFilters="sRGB">
      <feFlood floodColor={INK} floodOpacity="0.14" />
      <feComposite in2="SourceAlpha" operator="in" />
      <feGaussianBlur stdDeviation="1.1" />
      <feOffset dy="1.3" result="lift" />
      {/* Kept tight so it doesn't fill Codex's thin >_ cut-outs at 38px. */}
      <feFlood floodColor={INK} floodOpacity="0.22" />
      <feComposite in2="SourceAlpha" operator="in" />
      <feGaussianBlur stdDeviation="0.35" />
      <feOffset dy="0.45" result="contact" />
      <feMerge>
        <feMergeNode in="lift" />
        <feMergeNode in="contact" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

export default function AgentTilesB() {
  // useId can contain characters that are awkward inside url(#...), so keep it plain.
  const uid = `agtB${useId().replace(/[^A-Za-z0-9_-]/g, '')}`;
  return (
    <span className="agtB">
      <style href="agent-tiles-b" precedence="default">{CSS}</style>
      <span className="sr-only">{AGENT_NAMES}</span>
      {AGENT_MARKS.map(({ id, name, tilt, icon }) => {
        const g = GLUE[id] ?? { r: 0, dx: 0, dy: 0, seed: 5 };
        const edge = `${uid}-${id}-edge`;
        const glue = `${uid}-${id}-glue`;
        return (
          <span key={id} className="agtB-tile agtB-paper" title={name} aria-hidden="true" style={{ ['--tilt' as string]: `${tilt}deg` }}>
            <svg viewBox="0 0 40 40" focusable="false">
              <defs>
                <EdgeFilter id={edge} seed={g.seed} />
                <GlueFilter id={glue} />
              </defs>
              <rect width="40" height="40" rx="5.5" fill={PAPER} filter={`url(#${edge})`} />
              <g transform={`rotate(${g.r} 20 20) translate(${8 + g.dx} ${8 + g.dy})`}>
                <g filter={`url(#${glue})`}>{icon(`${uid}-${id}`)}</g>
              </g>
            </svg>
          </span>
        );
      })}
      {/* And the rest: an empty slot pencilled in where the next piece would go. */}
      <span className="agtB-tile" title="Any agent that speaks MCP" aria-hidden="true" style={{ ['--tilt' as string]: '3deg' }}>
        <svg viewBox="0 0 40 40" focusable="false">
          <defs>
            <filter id={`${uid}-pencil`} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="2" seed="5" result="warp" />
              <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.1" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <g filter={`url(#${uid}-pencil)`} fill="none" stroke={INK} strokeLinecap="round">
            <rect x="1" y="1" width="38" height="38" rx="6" pathLength={120} strokeDasharray="2.8 3.2" strokeWidth="1.3" strokeOpacity="0.32" />
            <path d="M20 13.5v13M13.5 20h13" strokeWidth="1.6" strokeOpacity="0.45" />
          </g>
        </svg>
      </span>
    </span>
  );
}
