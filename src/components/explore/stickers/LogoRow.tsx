// The agents in the headline, as die-cut stickers. Each exact mark is drawn
// untouched on a white sticker cut around its outline, slapped on at a tilt.
// The Cursor sticker has one corner peeled back. After them, a small quiet
// round '+' for every other agent. Sized in em, so they follow the headline.
// (The AgentTilesC treatment, rebuilt with a clean machine cut.)

import { useId } from 'react';
import { AGENT_MARKS, AGENT_NAMES } from '@/components/AgentIcons';
import { markOutline } from './objects';

const BACKSIDE = '#E4E0D6';
const INK = '#1F2A1F';
// In the marks' 24-unit space: the border is a stroke centred on the outline,
// so 7.5 leaves 3.75 units of white around the mark.
const BORDER = 7.5;
const PAD = 5;

type Peel = { x: number; y: number; angle: number; depth: number };
const LOOK: Record<string, { tilt: number; peel?: Peel }> = {
  claude: { tilt: -6 },
  codex: { tilt: 5 },
  cursor: { tilt: -3, peel: { x: 22.53, y: 17.59, angle: 30, depth: 1.9 } },
};

const r2 = (n: number) => Math.round(n * 100) / 100;

export default function LogoRow() {
  const uid = `sbl${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const box = `${-PAD} ${-PAD} ${24 + PAD * 2} ${24 + PAD * 2}`;
  return (
    <span className="sb-logos">
      <span className="sr-only">{AGENT_NAMES}</span>
      {AGENT_MARKS.map(({ id, name, icon }) => {
        const look = LOOK[id] ?? { tilt: 0 };
        const key = `${uid}-${id}`;
        const outline = markOutline(id);
        let fold: { x: number; y: number; a: number } | null = null;
        if (look.peel) {
          const { x, y, angle, depth } = look.peel;
          const rad = (angle * Math.PI) / 180;
          fold = { x: r2(x + depth * Math.cos(rad)), y: r2(y + depth * Math.sin(rad)), a: angle };
        }
        return (
          <span key={id} className="sb-logo" title={name} aria-hidden="true" style={{ ['--tilt' as string]: `${look.tilt}deg` }}>
            <svg viewBox={box} focusable="false">
              {fold && (
                <defs>
                  <clipPath id={`${key}-keep`}>
                    <rect x="-60" y="-60" width="60" height="120" transform={`translate(${fold.x} ${fold.y}) rotate(${fold.a})`} />
                  </clipPath>
                  <filter id={`${key}-flap`} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
                    <feDropShadow dx="0" dy="0.35" stdDeviation="0.35" floodColor={INK} floodOpacity="0.32" />
                  </filter>
                </defs>
              )}
              <g clipPath={fold ? `url(#${key}-keep)` : undefined}>
                <path d={outline} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={BORDER} strokeLinejoin="round" />
                {icon(uid)}
              </g>
              {fold && (
                <g clipPath={`url(#${key}-keep)`}>
                  <g filter={`url(#${key}-flap)`}>
                    <path
                      d={outline}
                      fill={BACKSIDE}
                      stroke={BACKSIDE}
                      strokeWidth={BORDER}
                      strokeLinejoin="round"
                      transform={`translate(${fold.x} ${fold.y}) rotate(${fold.a}) scale(-1 1) rotate(${-fold.a}) translate(${-fold.x} ${-fold.y})`}
                    />
                  </g>
                </g>
              )}
            </svg>
          </span>
        );
      })}
      <span className="sb-logo sb-logo-more" title="Any agent that speaks MCP" aria-hidden="true" style={{ ['--tilt' as string]: '4deg' }}>
        <svg viewBox="0 0 24 24" focusable="false">
          <circle cx="12" cy="12" r="11.5" fill="#FFFFFF" />
          <path d="M12 6.8v10.4M6.8 12h10.4" fill="none" stroke={INK} strokeOpacity={0.5} strokeWidth={2.6} strokeLinecap="round" />
        </svg>
      </span>
    </span>
  );
}
