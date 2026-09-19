// Bring your own agent: a sticker sheet. Five big die-cut stickers on a
// white backing with kiss-cut lines round each one, the names printed
// underneath. Cursor's is half peeled off, and one outline in the corner is
// empty, as if that sticker had already gone up into the headline.

import { Children, isValidElement, type ReactNode } from 'react';
import { AGENT_MARKS } from '@/components/AgentIcons';
import { K } from '../kit';
import { LogoStickerArt } from '../marks';

const SHEET = K.paper;
const CUT = '#C9BFA8';

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

/* A dashed kiss-cut line round a shape: a wide dashed stroke with a narrower
   solid one in sheet colour on top, so only a thin dashed rim shows. */
function KissCut({ d, border, gap = 2.2 }: { d: string; border: number; gap?: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke={CUT} strokeWidth={border + gap * 2 + 1.2} strokeDasharray="1.6 1.6" strokeLinejoin="round" />
      <path d={d} fill={SHEET} stroke={SHEET} strokeWidth={border + gap * 2} strokeLinejoin="round" />
    </g>
  );
}

function LogoCell({ id }: { id: string }) {
  const mark = AGENT_MARKS.find((m) => m.id === id)!;
  const d = outline(mark.icon(`sheet-${id}`));
  const tilt = id === 'claude' ? -6 : id === 'codex' ? 5 : -3;
  const peel = id === 'cursor' ? { x: 22.53, y: 17.59, angle: 34, depth: -3.2 } : null;
  return (
    <svg viewBox="-7 -7 38 38" className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <g transform={`rotate(${tilt} 12 12)`}>
        <KissCut d={d} border={5} gap={1.6} />
      </g>
      <g className="tb-sheet-lift">
        <g filter="url(#tb-sheet-shadow)">
          <g transform={`rotate(${tilt} 12 12)`} className={id === 'cursor' ? 'tb-peel-flap' : undefined}>
            <LogoStickerArt agent={id} uid={`sheet-${id}`} border={5} peel={peel} />
          </g>
        </g>
      </g>
    </svg>
  );
}

function PlusCell() {
  return (
    <svg viewBox="-7 -7 38 38" className="tb-art" aria-hidden="true">
      <g transform="rotate(4 12 12)">
        <KissCut d="M12 1 A11 11 0 1 1 11.99 1 Z" border={0} gap={1.6} />
      </g>
      <g className="tb-sheet-lift">
        <g filter="url(#tb-sheet-shadow)">
          <g transform="rotate(4 12 12)">
            <circle cx={12} cy={12} r={11} fill={SHEET} />
            <circle cx={12} cy={12} r={8.6} fill={K.mint} stroke={K.ink} strokeWidth={1.2} />
            <path d="M12 7.6v8.8M7.6 12h8.8" fill="none" stroke={K.ink} strokeWidth={2.2} strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
  );
}

function SkillCell() {
  const d = 'M4 1.5 H15.5 L21 7 V22.5 H4 Z';
  return (
    <svg viewBox="-7 -7 38 38" className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <g transform="rotate(-4 12 12)">
        <KissCut d={d} border={3.6} gap={1.6} />
      </g>
      <g className="tb-sheet-lift">
        <g filter="url(#tb-sheet-shadow)">
          <g transform="rotate(-4 12 12)">
            <path d={d} fill={SHEET} stroke={SHEET} strokeWidth={3.6} />
            <path d={d} fill={K.paper} stroke={K.ink} strokeWidth={1} />
            <path d="M15.5 1.5 V7 H21" fill={K.edge} stroke={K.ink} strokeWidth={1} />
            <rect x={5.6} y={10.4} width={13.8} height={5.2} rx={1.2} fill={K.sun} stroke={K.ink} strokeWidth={0.8} />
            <text className="mono" x={12.5} y={14.3} fontSize={3.6} fontWeight={800} fill={K.ink} textAnchor="middle">SKILL.md</text>
            <path d="M6.5 18.4 H16 M6.5 20.4 H12.5" stroke={K.edge} strokeWidth={1} />
          </g>
        </g>
      </g>
    </svg>
  );
}

/* The empty kiss-cut outline: the Claude spark, already taken. */
function EmptySlot() {
  const mark = AGENT_MARKS.find((m) => m.id === 'claude')!;
  const d = outline(mark.icon('sheet-empty'));
  return (
    <svg viewBox="-7 -7 38 38" className="tb-sheet-empty" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <g transform="rotate(-6 12 12)">
        <KissCut d={d} border={5} gap={1.6} />
      </g>
    </svg>
  );
}

export default function AgentSheet({ notes }: { notes: readonly { name: string; note: string }[] }) {
  const cells = [<LogoCell key="c" id="claude" />, <LogoCell key="x" id="codex" />, <LogoCell key="u" id="cursor" />, <PlusCell key="p" />, <SkillCell key="s" />];
  return (
    <div className="tb-sheet">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="tb-sheet-shadow" x="-30%" y="-30%" width="160%" height="170%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="0.25" stdDeviation="0.25" floodColor={K.ink} floodOpacity="0.22" />
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor={K.ink} floodOpacity="0.2" />
          </filter>
        </defs>
      </svg>
      <EmptySlot />
      <ul className="tb-sheet-grid">
        {notes.map(({ name, note }, i) => (
          <li key={name} className="tb-sheet-cell">
            <div className="tb-sheet-art">{cells[i]}</div>
            <div className="tb-sheet-name">{name}</div>
            <div className="tb-sheet-note">{note}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
