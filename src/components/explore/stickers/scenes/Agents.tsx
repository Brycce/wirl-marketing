// Bring your own coding agent: a real sticker sheet, five big die-cut stickers
// with their names printed underneath, and one empty snail-shaped spot where a
// sticker has already been used. Then three small steps, as stickers.

import { AGENT_MARKS } from '@/components/AgentIcons';
import { C, Scene, Sticker } from '../kit';
import { Bubble, FONT, LinkTag, MONO, markOutline, SnailHole, Terminal } from '../objects';
import { HarborMark } from './Hero';

type Kind = 'claude' | 'codex' | 'cursor' | 'plus' | 'term';

// The fold for each sticker's hover curl, in its 24-unit space: a point on
// the edge, the direction the corner lifts toward, and how far inside the
// fold line sits.
const FOLD: Record<Kind, { x: number; y: number; angle: number; depth: number }> = {
  claude: { x: 20.6, y: 20.2, angle: 45, depth: -1.8 },
  codex: { x: 20.4, y: 19.6, angle: 42, depth: -1.4 },
  cursor: { x: 22.53, y: 17.59, angle: 30, depth: -0.8 },
  plus: { x: 19.8, y: 19.8, angle: 45, depth: -1.4 },
  term: { x: 22, y: 22, angle: 45, depth: -1.4 },
};

const BORDER = 5.2; // stroke width in 24-unit space: 2.6 units of white round the mark
const PAD = 4.5;

function outlineFor(kind: Kind) {
  if (kind === 'plus') return 'M1 12 A11 11 0 1 0 23 12 A11 11 0 1 0 1 12 Z';
  if (kind === 'term') return 'M6 1 H18 Q23 1 23 6 V18 Q23 23 18 23 H6 Q1 23 1 18 V6 Q1 1 6 1 Z';
  return markOutline(kind);
}

function Art({ kind, uid }: { kind: Kind; uid: string }) {
  if (kind === 'plus') {
    return (
      <g>
        <circle cx={12} cy={12} r={11} fill="#FFFFFF" stroke={C.ink} strokeWidth={0.9} />
        <path d="M12 6.5v11M6.5 12h11" stroke={C.ink} strokeWidth={2.2} strokeLinecap="round" />
      </g>
    );
  }
  if (kind === 'term') {
    return (
      <g>
        <path d="M6 1 H18 Q23 1 23 6 V18 Q23 23 18 23 H6 Q1 23 1 18 V6 Q1 1 6 1 Z" fill={C.ink} />
        <path d="M6.5 8.5 l4 3.5 -4 3.5 M12.5 16 H17.5" fill="none" stroke="#FFFFFF" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  }
  const m = AGENT_MARKS.find((a) => a.id === kind);
  return <g style={{ color: C.ink }}>{m?.icon(uid)}</g>;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/* One big sticker on the sheet: flat, with its kiss-cut line showing; on
   hover it lifts and a corner curls up, showing the grey back. */
export function SheetSticker({ kind, uid }: { kind: Kind; uid: string }) {
  const outline = outlineFor(kind);
  const f = FOLD[kind];
  const rad = (f.angle * Math.PI) / 180;
  const fx = r2(f.x + f.depth * Math.cos(rad));
  const fy = r2(f.y + f.depth * Math.sin(rad));
  const box = `${-PAD} ${-PAD} ${24 + PAD * 2} ${24 + PAD * 2}`;
  const key = `${uid}-${kind}`;
  const mirror = `translate(${fx} ${fy}) rotate(${f.angle}) scale(-1 1) rotate(${-f.angle}) translate(${-fx} ${-fy})`;
  return (
    <span className="sb-sheet-stk" aria-hidden="true">
      {/* The kiss-cut in the sheet, which stays behind when the sticker lifts. */}
      <svg viewBox={box} className="sb-kiss" focusable="false">
        <path d={outline} fill="#EEEBE4" stroke="#D5D0C4" strokeWidth={BORDER + 0.8} strokeLinejoin="round" />
        <path d={outline} fill="#EEEBE4" stroke="#EEEBE4" strokeWidth={BORDER - 0.2} strokeLinejoin="round" />
      </svg>
      <span className="sb-lift">
        <svg viewBox={box} focusable="false">
          <defs>
            <clipPath id={`${key}-keep`}>
              <rect x="-60" y="-60" width="60" height="120" transform={`translate(${fx} ${fy}) rotate(${f.angle})`} />
            </clipPath>
            <filter id={`${key}-flap`} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
              <feDropShadow dx="0" dy="0.3" stdDeviation="0.35" floodColor={C.ink} floodOpacity="0.35" />
            </filter>
          </defs>
          <g className="sb-flat">
            <path d={outline} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={BORDER} strokeLinejoin="round" />
            <Art kind={kind} uid={`${key}-a`} />
          </g>
          <g className="sb-curl">
            <g clipPath={`url(#${key}-keep)`}>
              <path d={outline} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={BORDER} strokeLinejoin="round" />
              <Art kind={kind} uid={`${key}-b`} />
            </g>
            <g clipPath={`url(#${key}-keep)`}>
              <g filter={`url(#${key}-flap)`}>
                <path d={outline} fill={C.back} stroke={C.back} strokeWidth={BORDER} strokeLinejoin="round" transform={mirror} />
              </g>
            </g>
          </g>
        </svg>
      </span>
    </span>
  );
}

const SHEET: { kind: Kind }[] = [{ kind: 'claude' }, { kind: 'codex' }, { kind: 'cursor' }, { kind: 'plus' }, { kind: 'term' }];

export function AgentSheet({ notes }: { notes: { name: string; note: string }[] }) {
  return (
    <div className="sb-sheet relative px-5 py-7 sm:px-8 sm:py-9">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-4 sm:gap-y-9">
        {notes.map(({ name, note }, i) => (
          <a key={name} href="#connect" className={`sb-sheet-item ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`} aria-label={`${name}: ${note} Connect it.`}>
            <SheetSticker kind={SHEET[i].kind} uid={`sheet${i}`} />
            <span className="block min-w-0 sm:mt-4">
              <span className="block font-bold text-[17px] leading-tight tracking-[-0.01em]">{name}</span>
              <span className="mt-1.5 block text-[15px] leading-snug text-[#5A6057]">{note}</span>
            </span>
          </a>
        ))}
      </div>
      {/* One sticker already used: the snail on Priya's laptop, up top. */}
      <svg viewBox="0 0 70 50" className="absolute right-5 top-4 w-[52px]" aria-hidden="true" focusable="false">
        <SnailHole x={10} y={8} size={32} border={3.2} />
      </svg>
    </div>
  );
}

/* The three steps, each a little sticker scene on the page itself. */
export function StepInstall() {
  return (
    <Scene W={340} H={150} tone="transparent" label="A terminal running: claude mcp add wirl -- npx -y @wirl/mcp">
      <Sticker w={316} h={96} d={[12, 26, 1, -1.5]} i={0}>
        <Terminal w={316} h={96} lines={[['$ ', 'claude mcp add wirl \\'], '    -- npx -y @wirl/mcp']} size={13.5} />
        <text x={14} y={84} fontSize={12.5} fill={C.green} style={MONO}>✓ added wirl</text>
      </Sticker>
    </Scene>
  );
}

export function StepApprove() {
  return (
    <Scene W={340} H={150} tone="transparent" label="A browser page asking: Approve Claude Code for harbor.co? with the code KPLM-4821 and an Approve button.">
      <Sticker w={300} h={128} d={[20, 10, 1, 1.5]} i={0}>
        <g>
          <rect x={0} y={0} width={300} height={128} rx={12} fill={C.white} stroke={C.ink} strokeWidth={2.5} />
          <path d="M0 28 V12 Q0 0 12 0 H288 Q300 0 300 12 V28 Z" fill="#EFECE5" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
          {[14, 26, 38].map((x) => <circle key={x} cx={x} cy={14} r={3.4} fill={C.white} stroke={C.ink} strokeWidth={1.5} />)}
          <rect x={52} y={6} width={168} height={16} rx={8} fill={C.white} stroke={C.ink} strokeWidth={1.3} />
          <text x={62} y={17.5} fontSize={10.5} fontWeight={500} fill={C.dim} style={FONT}>app.wirl.dev</text>
          <HarborMark x={16} y={42} s={0.9} />
          <text x={44} y={57} fontSize={15} fontWeight={700} fill={C.ink} style={FONT}>Approve Claude Code</text>
          <text x={44} y={75} fontSize={13} fontWeight={500} fill={C.dim} style={FONT}>for harbor.co?</text>
          <rect x={16} y={88} width={120} height={28} rx={8} fill="#F4F2EC" stroke={C.ink} strokeWidth={1.6} strokeDasharray="4 3" />
          <text x={76} y={107} fontSize={14} fontWeight={700} fill={C.ink} textAnchor="middle" style={MONO} letterSpacing="0.06em">KPLM-4821</text>
          <rect x={186} y={86} width={98} height={32} rx={16} fill={C.ink} />
          <text x={235} y={106.5} fontSize={14} fontWeight={650} fill="#FFFFFF" textAnchor="middle" style={FONT}>Approve</text>
        </g>
      </Sticker>
    </Scene>
  );
}

export function StepDeploy() {
  return (
    <Scene W={340} H={150} tone="transparent" label="A chat message, deploy this, answered by the link harbor--supplier-payments.wirl.run.">
      <Sticker w={132} h={46} d={[186, 10, 1, 3]} i={0}>
        <Bubble w={132} h={46} tail="br">
          <text x={20} y={29} fontSize={16} fontWeight={600} fill={C.ink} style={FONT}>deploy this</text>
        </Bubble>
      </Sticker>
      <Sticker w={306} h={40} d={[16, 94, 1, -3]} i={1}>
        <LinkTag />
      </Sticker>
    </Scene>
  );
}
