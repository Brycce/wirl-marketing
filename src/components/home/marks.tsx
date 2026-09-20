// The agent logos as die-cut stickers. The headline row is the sticker
// treatment Bryce liked (lab/AgentTilesC), copied here with the Toybox
// palette; the same recipe, scaled up, makes the stickers inside the scenes
// and on the agents sticker sheet. The marks themselves are drawn untouched:
// the sticker is the paper border cut round the outside of each logo.

import { Children, isValidElement, useId, type ReactNode } from 'react';
import { AGENT_MARKS, AGENT_NAMES } from '@/components/AgentIcons';
import { K } from './kit';

const STICKER = K.paper;
const BACKSIDE = K.edge;
const INK = K.ink;

// The sticker is cut around the outside of the mark, so holes in a logo
// show sticker paper, not the page. That outside is the mark's first subpath.
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
const clean = (s: string) => s.replace(/[^a-zA-Z0-9_-]/g, '');

type Peel = { x: number; y: number; angle: number; depth: number };
const LOOK: Record<string, { tilt: number; peel?: Peel }> = {
  claude: { tilt: -6 },
  codex: { tilt: 5 },
  cursor: { tilt: -3, peel: { x: 22.53, y: 17.59, angle: 30, depth: 1.3 } },
};

/* One logo sticker, drawn in the logo's own 24-unit space. Used inside any svg. */
export function LogoStickerArt({ agent, uid, border = 6, peel, flapClass }: {
  agent: string; uid: string; border?: number; peel?: Peel | null; flapClass?: string;
}) {
  const mark = AGENT_MARKS.find((m) => m.id === agent);
  if (!mark) return null;
  const key = `${uid}-${agent}`;
  const p = peel === undefined ? LOOK[agent]?.peel : peel ?? undefined;
  let fold: { x: number; y: number; a: number } | null = null;
  if (p) {
    const rad = (p.angle * Math.PI) / 180;
    fold = { x: r2(p.x + p.depth * Math.cos(rad)), y: r2(p.y + p.depth * Math.sin(rad)), a: p.angle };
  }
  const d = outline(mark.icon(uid));
  const mirror = fold ? `translate(${fold.x} ${fold.y}) rotate(${fold.a}) scale(-1 1) rotate(${-fold.a}) translate(${-fold.x} ${-fold.y})` : '';
  return (
    <>
      {fold && (
        <defs>
          <clipPath id={`${key}-keep`}>
            <rect x="-60" y="-60" width="60" height="120" transform={`translate(${fold.x} ${fold.y}) rotate(${fold.a})`} />
          </clipPath>
          <filter id={`${key}-flap`} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="0.3" stdDeviation="0.3" floodColor={INK} floodOpacity="0.3" />
          </filter>
        </defs>
      )}
      <g clipPath={fold ? `url(#${key}-keep)` : undefined}>
        <path d={d} fill={STICKER} stroke={STICKER} strokeWidth={border} strokeLinejoin="round" />
        {mark.icon(uid)}
      </g>
      {fold && (
        <g clipPath={`url(#${key}-keep)`}>
          <g filter={`url(#${key}-flap)`} className={flapClass}>
            <path d={d} fill={BACKSIDE} stroke={BACKSIDE} strokeWidth={border} strokeLinejoin="round" transform={mirror} />
          </g>
        </g>
      )}
    </>
  );
}

/* A logo sticker placed in a scene: centre (x, y), `size` units across. */
export function LogoSticker({ agent, x, y, size = 40, tilt, uid, peel = null, color = INK }: {
  agent: string; x: number; y: number; size?: number; tilt?: number; uid: string; peel?: Peel | null; color?: string;
}) {
  const s = size / 24;
  const t = tilt ?? LOOK[agent]?.tilt ?? 0;
  return (
    <g transform={`translate(${x} ${y})`} color={color}>
      <g filter="url(#tb-stk)">
        <g transform={`rotate(${t}) scale(${s}) translate(-12 -12)`}>
          <LogoStickerArt agent={agent} uid={uid} peel={peel} />
        </g>
      </g>
    </g>
  );
}

// Shadows are CSS so they can grow on hover, and sit on the untilted wrapper
// so the light always comes from straight above.
const CSS = `
/* Sized and set so the stickers match the capitals beside them: the art is
   30 of the 32 viewBox units, so .82em of box gives art about a cap tall, and
   the offset centres that art on the cap band instead of hanging it below the
   baseline. */
.tb-stickers { display: inline-flex; align-items: center; gap: .06em; vertical-align: -.046em; margin-left: .06em; }
.tb-stk-s {
  display: block; flex: none; width: .82em; height: .82em; color: ${INK};
  filter: drop-shadow(0 .01em .017em rgba(27,36,32,.16)) drop-shadow(0 .037em .072em rgba(27,36,32,.26));
  transition: transform .22s cubic-bezier(.2,.8,.2,1), filter .22s cubic-bezier(.2,.8,.2,1);
}
.tb-stk-s > svg {
  display: block; width: 100%; height: 100%; overflow: visible;
  transform: rotate(var(--tilt, 0deg)); transition: transform .22s cubic-bezier(.2,.8,.2,1);
}
.tb-stk-more {
  width: .56em; height: .56em;
  filter: drop-shadow(0 .008em .014em rgba(27,36,32,.12)) drop-shadow(0 .024em .05em rgba(27,36,32,.2));
}
@media (hover: hover) {
  .tb-stk-s:not(.tb-stk-more):hover {
    transform: translateY(-.05em);
    filter: drop-shadow(0 .012em .02em rgba(27,36,32,.12)) drop-shadow(0 .08em .11em rgba(27,36,32,.24));
  }
  .tb-stk-s:not(.tb-stk-more):hover > svg { transform: rotate(calc(var(--tilt, 0deg) * .4)); }
}
@media (prefers-reduced-motion: reduce) {
  .tb-stk-s, .tb-stk-s > svg { transition: none; }
}
`;

/* The headline's row of logo stickers, with a small round "+" for the rest. */
export function HeadlineStickers() {
  const uid = `hs${clean(useId())}`;
  return (
    <span className="tb-stickers">
      <style href="tb-stickers" precedence="default">{CSS}</style>
      <span className="sr-only">{AGENT_NAMES}</span>
      {AGENT_MARKS.map(({ id, name }) => (
        <span key={id} className="tb-stk-s" title={name} aria-hidden="true" style={{ ['--tilt' as string]: `${LOOK[id]?.tilt ?? 0}deg` }}>
          <svg viewBox="-4 -4 32 32" focusable="false">
            <LogoStickerArt agent={id} uid={uid} />
          </svg>
        </span>
      ))}
      <span className="tb-stk-s tb-stk-more" title="Any agent that speaks MCP" aria-hidden="true" style={{ ['--tilt' as string]: '4deg' }}>
        <svg viewBox="0 0 24 24" focusable="false">
          <circle cx="12" cy="12" r="11.3" fill={STICKER} />
          <path d="M12 6.5v11M6.5 12h11" fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={2.8} strokeLinecap="round" />
        </svg>
      </span>
    </span>
  );
}
