// Admins get the complete view: Dana from IT, leaning back with her mug, in
// front of a big monitor. The screen is real HTML, so every word reads: each
// app, who built it and with which agent (the stickers from their laptops),
// what it connects to, who can open it, when it was last used, and the log.

import s from './cast.module.css';
import { Bust, C, Head, Mug, Ol, POSE, Sticker, withPose, type StickerKind, type Who } from './kit';

type Row = { app: string; who: Who; name: string; agent: StickerKind; via: string; uses: string; open: string; everyone?: boolean; used: string };

const ROWS: Row[] = [
  { app: 'supplier-payments', who: 'priya', name: 'Priya N.', agent: 'claude', via: 'Claude Code', uses: 'Stripe, Postgres', open: 'All of Harbor', everyone: true, used: '2 min ago' },
  { app: 'spend-requests', who: 'mia', name: 'Mia R.', agent: 'claude', via: 'Claude Code', uses: 'Postgres, Slack', open: '4 people', used: '20 min ago' },
  { app: 'candidate-pipeline', who: 'tom', name: 'Tom A.', agent: 'cursor', via: 'Cursor', uses: 'Greenhouse', open: '6 people', used: '1 h ago' },
  { app: 'incident-handover', who: 'lena', name: 'Lena K.', agent: 'plus', via: 'Other MCP', uses: 'PagerDuty', open: '9 people', used: '3 h ago' },
  { app: 'nda-lookup', who: 'sam', name: 'Sam O.', agent: 'codex', via: 'Codex', uses: 'Google Drive', open: '3 people', used: 'yesterday' },
];

const LOG = [
  ['09:41', 'wirl rolled supplier-payments back to v3 · 5 failures in 12 min'],
  ['09:12', 'priya@harbor.co set the Stripe key for supplier-payments · browser to vault'],
  ['08:58', 'jo.walks@gmail.com was refused at supplier-payments'],
];

function Face({ who }: { who: Who }) {
  const clip = `adm-face-${who}`;
  return (
    <svg viewBox="-20 -20 40 40" width="26" height="26" aria-hidden="true" className="shrink-0">
      <clipPath id={clip}>
        <circle r="18" />
      </clipPath>
      <circle r="18" fill={C.lilac} />
      <g clipPath={`url(#${clip})`}>
        <g transform="translate(0 6) scale(0.46)">
          <Head who={who} face={{ mouth: 'smile' }} />
        </g>
      </g>
      <circle r="18" fill="none" stroke={C.ink} strokeWidth="2.6" />
    </svg>
  );
}

function Agent({ kind, via }: { kind: StickerKind; via: string }) {
  return (
    <svg viewBox="-16 -16 32 32" width="22" height="22" className="shrink-0 overflow-visible" role="img" aria-label={`via ${via}`}>
      <Sticker kind={kind} x={0} y={0} size={20} rot={-6} />
    </svg>
  );
}

// Dana: IT and security. Reading glasses up, IT mug in hand, leaning back.
function Dana() {
  return (
    <svg viewBox="0 0 220 240" className={s.art} role="img" aria-label="Dana from IT leans back in her chair with her IT mug, reading the admin screen.">
      {/* Her chair. */}
      <g transform="translate(112 150) rotate(-7)">
        <Ol fill="#5B5368" far={[-6, 0]}>
          <rect x="-66" y="-78" width="132" height="150" rx="30" />
        </Ol>
      </g>
      <g transform="translate(112 100) rotate(-7)">
        <Bust
          who="dana"
          height={120}
          face={{ eyes: 'open', brows: 'calm', mouth: 'smirk', look: [2.4, -1.6], blink: s.blinkDana, scan: s.scan }}
          arms={[
            withPose(mirror2(POSE.mug), { pts: [[38, 58], [50, 104], [28, 84]], hold: <Mug x={-17} y={7} kind="it" steam />, foreClass: s.sipDana }),
            withPose(POSE.down, { pts: [[-38, 58], [-50, 100], [-34, 128]] }),
          ]}
        />
      </g>
    </svg>
  );
}

function mirror2(p: typeof POSE.mug) {
  return { ...p, pts: p.pts.map(([x, y]) => [-x, y] as [number, number]), flip: !p.flip };
}

export default function AdminScene() {
  return (
    <div className={`${s.stage} relative`} style={{ background: C.lilac }}>
      <div className="relative z-0 px-3 pt-4 sm:px-5 sm:pt-6 pb-[96px] md:pb-[128px]">
        {/* The monitor: a thick ink bezel around a real screen. */}
        <div className={s.monitor}>
          <div className="flex items-center justify-between gap-3 px-3.5 sm:px-4 py-2.5 border-b-2 border-[#E4DEEE] bg-[#F6F2FB]">
            <span className="font-extrabold text-[14px] sm:text-[15px] tracking-[-0.01em]">harbor.co · 5 apps</span>
            <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#177A45]">
              <span className={s.liveDot} aria-hidden="true" />
              live
            </span>
          </div>
          <div role="table" aria-label="Every internal app at harbor.co" className="text-[13.5px]">
            <div role="row" className={`${s.admRow} ${s.admHead}`}>
              <span role="columnheader">App</span>
              <span role="columnheader">Built by</span>
              <span role="columnheader">Connects to</span>
              <span role="columnheader">Who can open it</span>
              <span role="columnheader">Last used</span>
            </div>
            {ROWS.map((r, i) => (
              <div role="row" key={r.app} className={s.admRow}>
                <span role="cell" className={`${s.cApp} font-mono font-semibold text-[13px] md:text-[12.5px] truncate`}>{r.app}</span>
                <span role="cell" className={`${s.cBy} flex items-center gap-2 min-w-0`}>
                  <Face who={r.who} />
                  <span className="min-w-0 leading-tight">
                    <span className="block font-semibold truncate">{r.name}</span>
                    <span className="hidden md:block text-[11.5px] text-[#544A5E] truncate">{r.via}</span>
                  </span>
                  <Agent kind={r.agent} via={r.via} />
                </span>
                <span role="cell" className={`${s.cUses} text-[#544A5E] truncate`}>{r.uses}</span>
                <span role="cell" className={s.cOpen}>
                  <span className={`${s.pill} ${r.everyone ? s.pillAll : ''}`}>{r.open}</span>
                </span>
                <span role="cell" className={`${s.cUsed} flex items-center gap-1.5 text-[#544A5E] whitespace-nowrap`}>
                  <span className={i === 0 ? s.liveDot : s.idleDot} aria-hidden="true" />
                  {r.used}
                </span>
              </div>
            ))}
          </div>
          {/* The log. */}
          <div className={s.log}>
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#B9AFC6] mb-1.5">Log</div>
            {/* The newest line arrives on top every few seconds. */}
            <div className={s.logWin}>
              {[LOG.slice(0, 1), LOG.slice(1)].map((group, g) => (
                <div key={g} className={g === 0 ? s.logNew : s.logRest}>
                  {group.map(([t, line]) => (
                    <div key={t} className={s.logLine}>
                      <span className="font-mono text-[#FFC53D] mr-2">{t}</span>
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Its stand, and the desk. */}
        <svg viewBox="0 0 200 60" className={`${s.stand} absolute left-1/2 -translate-x-1/2 w-[150px] md:w-[190px]`} aria-hidden="true">
          <path d="M84 0 H116 L122 40 H78 Z" fill={C.metal} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
          <rect x="48" y="38" width="104" height="14" rx="7" fill={C.metal} stroke={C.ink} strokeWidth="3" />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[52px] md:h-[64px] border-t-[2.5px] border-[#2B2233]" style={{ background: '#D9CFF5' }} />
      <div className="absolute left-0 bottom-0 w-[132px] sm:w-[160px] md:w-[224px] z-10 pointer-events-none">
        <Dana />
      </div>
    </div>
  );
}
