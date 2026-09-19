// The agent logos in the headline, as die-cut stickers: lab treatment C,
// recoloured for this page. Each exact logo sits on a white sticker cut
// around its outline, tilted a little, lifted by a soft two-layer shadow.
// Cursor's corner is peeling. Hover lifts one. The marks are never redrawn.

import { Children, isValidElement, useId, type ReactNode } from 'react';
import { AGENT_MARKS, AGENT_NAMES } from '@/components/AgentIcons';
import s from './cast.module.css';

const STICKER = '#FFFFFF';
const BACKSIDE = '#E9E3F2';
const INK = '#2B2233';
const BORDER = 6;
const PAD = 4;

type Peel = { x: number; y: number; angle: number; depth: number };
const LOOK: Record<string, { tilt: number; seed: number; peel?: Peel }> = {
  claude: { tilt: -6, seed: 7 },
  codex: { tilt: 5, seed: 4 },
  cursor: { tilt: -3, seed: 9, peel: { x: 22.53, y: 17.59, angle: 30, depth: 1.3 } },
};

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

export default function StickerRow() {
  const uid = `hs${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const box = `${-PAD} ${-PAD} ${24 + PAD * 2} ${24 + PAD * 2}`;
  return (
    <span className={s.stkRow}>
      <span className="sr-only">{AGENT_NAMES}</span>
      {AGENT_MARKS.map(({ id, name, tilt, icon }) => {
        const look = LOOK[id] ?? { tilt, seed: 5 };
        const key = `${uid}-${id}`;
        let fold: { x: number; y: number; a: number } | null = null;
        if (look.peel) {
          const { x, y, angle, depth } = look.peel;
          const rad = (angle * Math.PI) / 180;
          fold = { x: r2(x + depth * Math.cos(rad)), y: r2(y + depth * Math.sin(rad)), a: angle };
        }
        return (
          <span key={id} className={s.stk} title={name} aria-hidden="true" style={{ ['--tilt' as string]: `${look.tilt}deg` }}>
            <svg viewBox={box} focusable="false">
              <defs>
                <filter id={`${key}-cut`} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
                  <feTurbulence type="fractalNoise" baseFrequency="0.11" numOctaves={2} seed={look.seed} result="warp" />
                  <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.1" xChannelSelector="R" yChannelSelector="G" />
                </filter>
                <g id={`${key}-sheet`} filter={`url(#${key}-cut)`}>
                  <path d={outline(icon(uid))} strokeWidth={BORDER} strokeLinejoin="round" />
                </g>
                {fold && (
                  <>
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
                <use href={`#${key}-sheet`} fill={STICKER} stroke={STICKER} />
                <g color={INK}>{icon(uid)}</g>
              </g>
              {fold && (
                <g clipPath={`url(#${key}-keep)`}>
                  <g filter={`url(#${key}-flap)`}>
                    <use
                      href={`#${key}-sheet`}
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
      <span className={`${s.stk} ${s.stkMore}`} title="Any agent that speaks MCP" aria-hidden="true" style={{ ['--tilt' as string]: '4deg' }}>
        <svg viewBox="0 0 24 24" focusable="false">
          <circle cx="12" cy="12" r="11.3" fill={STICKER} />
          <path d="M12 6.5v11M6.5 12h11" fill="none" stroke={INK} strokeOpacity={0.5} strokeWidth={2.8} strokeLinecap="round" />
        </svg>
      </span>
    </span>
  );
}
