// Treatment C: die-cut stickers. Each logo is printed on its own sticker,
// cut around its outline with a thick paper border, slapped on at a slight
// tilt and lifted off the page by a soft shadow. The Cursor sticker has one
// corner peeling up. The marks themselves are drawn untouched on top: the
// paper feel comes from the cut edge, the shadow and the tilt, never from
// bending the logos. Drop-in for <AgentIcons /> inside the headline.

import { Children, isValidElement, useId, type ReactNode } from 'react';
import { AGENT_MARKS, AGENT_NAMES } from '@/components/AgentIcons';

const STICKER = '#FFFCF5'; // a shade brighter than the paper tone so it lifts off the cream page
const BACKSIDE = '#E6DFCB'; // sand: the back of the sticker, seen where it peels
const INK = '#1F2A1F';

// All in the logos' own 24-unit space. The border is a stroke centred on the
// outline, so 6 gives 3 units of paper around the mark; the viewBox leaves
// 4 units so the cut edge never touches the box.
const BORDER = 6;
const PAD = 4;

type Peel = { x: number; y: number; angle: number; depth: number };

// Tilt and edge noise per sticker, so no two are cut quite the same.
// The peel folds back the border just past one corner of the mark
// (x, y is that corner, angle points outward, depth is how far past it the
// fold sits), so the flap never covers the logo.
const LOOK: Record<string, { tilt: number; seed: number; peel?: Peel }> = {
  claude: { tilt: -6, seed: 7 },
  codex: { tilt: 5, seed: 4 },
  cursor: { tilt: -3, seed: 9, peel: { x: 22.53, y: 17.59, angle: 30, depth: 1.3 } },
};

// The sticker is cut around the outside of the mark, so holes in a logo
// (Codex's prompt, Cursor's arrow) show sticker paper, not the page. That
// outside is the first subpath of the mark's path.
function outline(node: ReactNode): string {
  for (const child of Children.toArray(node)) {
    if (!isValidElement(child)) continue;
    const props = child.props as { d?: unknown; children?: ReactNode };
    if (child.type === 'path' && typeof props.d === 'string') {
      const end = props.d.search(/z/i);
      return end < 0 ? props.d : props.d.slice(0, end + 1);
    }
    const inner = outline(props.children);
    if (inner) return inner;
  }
  return '';
}

const r2 = (n: number) => Math.round(n * 100) / 100;

// Shadows are CSS so they can grow on hover, and they sit on the untilted
// wrapper so the light always comes from straight above.
const CSS = `
.agent-sticker-c { display: inline-flex; align-items: center; gap: .03em; vertical-align: -.32em; margin-left: .04em; }
.agent-sticker-c-s {
  display: block; flex: none; width: .92em; height: .92em;
  filter: drop-shadow(0 .01em .017em rgba(31,42,31,.14)) drop-shadow(0 .037em .072em rgba(31,42,31,.26));
  transition: transform .22s cubic-bezier(.2,.8,.2,1), filter .22s cubic-bezier(.2,.8,.2,1);
}
.agent-sticker-c-s > svg {
  display: block; width: 100%; height: 100%; overflow: visible;
  transform: rotate(var(--tilt, 0deg)); transition: transform .22s cubic-bezier(.2,.8,.2,1);
}
.agent-sticker-c-more {
  width: .6em; height: .6em; color: ${INK};
  filter: drop-shadow(0 .008em .014em rgba(31,42,31,.12)) drop-shadow(0 .024em .05em rgba(31,42,31,.2));
}
@media (hover: hover) {
  .agent-sticker-c-s:not(.agent-sticker-c-more):hover {
    transform: translateY(-.05em);
    filter: drop-shadow(0 .012em .02em rgba(31,42,31,.12)) drop-shadow(0 .08em .11em rgba(31,42,31,.24));
  }
  .agent-sticker-c-s:not(.agent-sticker-c-more):hover > svg { transform: rotate(calc(var(--tilt, 0deg) * .4)); }
}
@media (prefers-reduced-motion: reduce) {
  .agent-sticker-c-s, .agent-sticker-c-s > svg { transition: none; }
}
`;

export default function AgentTilesC() {
  // Ids must be unique per copy; strip React's delimiters so url(#...) is plain.
  const uid = `stk${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const box = `${-PAD} ${-PAD} ${24 + PAD * 2} ${24 + PAD * 2}`;

  return (
    <span className="agent-sticker-c">
      <style href="agent-sticker-c" precedence="default">{CSS}</style>
      <span className="sr-only">{AGENT_NAMES}</span>
      {AGENT_MARKS.map(({ id, name, tilt, icon }) => {
        const look = LOOK[id] ?? { tilt, seed: 5 };
        const key = `${uid}-${id}`;
        const sheet = `#${key}-sheet`;
        let fold: { x: number; y: number; a: number } | null = null;
        if (look.peel) {
          const { x, y, angle, depth } = look.peel;
          const rad = (angle * Math.PI) / 180;
          fold = { x: r2(x + depth * Math.cos(rad)), y: r2(y + depth * Math.sin(rad)), a: angle };
        }
        return (
          <span key={id} className="agent-sticker-c-s" title={name} aria-hidden="true" style={{ ['--tilt' as string]: `${look.tilt}deg` }}>
            <svg viewBox={box} focusable="false">
              <defs>
                {/* A slightly uneven cut edge: same recipe as the scene pieces, scaled down for a 38px sticker. */}
                <filter id={`${key}-cut`} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
                  <feTurbulence type="fractalNoise" baseFrequency="0.11" numOctaves={2} seed={look.seed} result="warp" />
                  <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
                </filter>
                {/* The sticker sheet: the mark's outline, grown by a round-jointed stroke. Colour comes from each <use>. */}
                <g id={`${key}-sheet`} filter={`url(#${key}-cut)`}>
                  <path d={outline(icon(uid))} strokeWidth={BORDER} strokeLinejoin="round" />
                </g>
                {fold && (
                  <>
                    {/* Everything on the near side of the fold line. */}
                    <clipPath id={`${key}-keep`}>
                      <rect x="-60" y="-60" width="60" height="120" transform={`translate(${fold.x} ${fold.y}) rotate(${fold.a})`} />
                    </clipPath>
                    <filter id={`${key}-flap`} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
                      <feDropShadow dx="0" dy="0.3" stdDeviation="0.3" floodColor={INK} floodOpacity="0.3" />
                    </filter>
                  </>
                )}
              </defs>
              <g clipPath={fold ? `url(#${key}-keep)` : undefined}>
                <use href={sheet} fill={STICKER} stroke={STICKER} />
                {icon(uid)}
              </g>
              {fold && (
                // The corner that came up, mirrored across the fold so we see its back.
                <g clipPath={`url(#${key}-keep)`}>
                  <g filter={`url(#${key}-flap)`}>
                    <use
                      href={sheet}
                      fill={BACKSIDE}
                      stroke={BACKSIDE}
                      transform={`translate(${fold.x} ${fold.y}) rotate(${fold.a}) scale(-1 1) rotate(${-fold.a}) translate(${-fold.x} ${-fold.y})`}
                    />
                  </g>
                </g>
              )}
            </svg>
          </span>
        );
      })}
      {/* And the rest: a small plain round sticker, no logo, quieter shadow. */}
      <span className="agent-sticker-c-s agent-sticker-c-more" title="Any agent that speaks MCP" aria-hidden="true" style={{ ['--tilt' as string]: '4deg' }}>
        <svg viewBox="0 0 24 24" focusable="false">
          <defs>
            <filter id={`${uid}-more-cut`} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.11" numOctaves={2} seed={11} result="warp" />
              <feDisplacementMap in="SourceGraphic" in2="warp" scale="1" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <circle cx="12" cy="12" r="11.3" fill={STICKER} filter={`url(#${uid}-more-cut)`} />
          <path d="M12 6.5v11M6.5 12h11" fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={2.8} strokeLinecap="round" />
        </svg>
      </span>
    </span>
  );
}
