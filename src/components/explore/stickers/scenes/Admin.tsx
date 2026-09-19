// Admins get the complete view: the admin screen as one big table sticker on
// the sun page, with the log stuck over its corner. Real HTML, so the text is
// crisp and selectable. On a phone the table becomes a stack of row cards.

import { useId } from 'react';
import { AGENT_MARKS } from '@/components/AgentIcons';
import { C } from '../kit';
import { Head, PEOPLE, type Who } from '../people';
import { markOutline } from '../objects';

type Row = { app: string; who: Who; agent: string | null; uses: string[]; open: 'everyone' | Who[]; last: string };

const ROWS: Row[] = [
  { app: 'supplier-payments', who: 'priya', agent: 'claude', uses: ['Stripe', 'Postgres'], open: ['priya', 'tom', 'mia', 'sam'], last: '2 min ago' },
  { app: 'candidate-pipeline', who: 'tom', agent: 'cursor', uses: ['Greenhouse'], open: 'everyone', last: '1 h ago' },
  { app: 'incident-handover', who: 'lena', agent: null, uses: ['PagerDuty', 'Slack'], open: ['lena', 'sam', 'jo'], last: '3 h ago' },
  { app: 'nda-lookup', who: 'sam', agent: 'codex', uses: ['Drive'], open: ['sam', 'ade', 'lena'], last: 'yesterday' },
  { app: 'budget-lines', who: 'mia', agent: 'claude', uses: ['Postgres'], open: 'everyone', last: '4 days ago' },
];

const AGENT_NAME: Record<string, string> = { claude: 'Claude Code', codex: 'Codex', cursor: 'Cursor' };

const LOG: [string, string, string][] = [
  [C.green, 'rollback', 'supplier-payments back to v3 · 5 failures in 12 min'],
  [C.sun, 'key', 'priya@harbor.co set the Stripe key · browser to vault'],
  [C.tomato, 'refused', 'sam@harbor.co at incident-handover'],
];

/* A face as a tiny round sticker. */
export function MiniFace({ who, size = 26 }: { who: Who; size?: number }) {
  const id = `mf${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg viewBox="12 2 76 76" width={size} height={size} className="shrink-0" aria-hidden="true" focusable="false" style={{ filter: 'drop-shadow(0 1px 1px rgba(31,42,31,.2))' }}>
      <defs><clipPath id={id}><circle cx={50} cy={40} r={31} /></clipPath></defs>
      <circle cx={50} cy={40} r={37} fill="#FFFFFF" />
      <g clipPath={`url(#${id})`}>
        <circle cx={50} cy={40} r={31} fill={PEOPLE[who].shirt[0]} />
        <g transform="translate(50 46) scale(1.08) translate(-50 -42)"><Head who={who} /></g>
      </g>
      <circle cx={50} cy={40} r={31} fill="none" stroke="#1F2A1F" strokeWidth={3} />
    </svg>
  );
}

/* An agent's mark as a tiny die-cut sticker. */
function MiniMark({ id, size = 18 }: { id: string; size?: number }) {
  const uid = `mm${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const m = AGENT_MARKS.find((a) => a.id === id);
  if (!m) return null;
  return (
    <svg viewBox="-4 -4 32 32" width={size} height={size} className="shrink-0" aria-hidden="true" focusable="false" style={{ filter: 'drop-shadow(0 1px .8px rgba(31,42,31,.25))', color: C.ink }}>
      <path d={markOutline(id)} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={7} strokeLinejoin="round" />
      {m.icon(uid)}
    </svg>
  );
}

function Builder({ r }: { r: Row }) {
  return (
    <span className="flex items-center gap-2 min-w-0">
      <MiniFace who={r.who} />
      <span className="min-w-0">
        <span className="block font-semibold leading-tight whitespace-nowrap">{PEOPLE[r.who].name}</span>
        <span className="flex items-center gap-1 text-[12px] text-[#5A6057] leading-tight mt-0.5 whitespace-nowrap">
          {r.agent ? <><MiniMark id={r.agent} size={14} />{AGENT_NAME[r.agent]}</> : 'by hand'}
        </span>
      </span>
    </span>
  );
}

function Open({ r }: { r: Row }) {
  if (r.open === 'everyone') {
    return <span className="inline-flex items-center rounded-full bg-[#22A861] border-[1.5px] border-[#1F2A1F] px-2.5 py-[3px] text-[12px] font-semibold leading-none">everyone</span>;
  }
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span className="flex -space-x-2">
        {r.open.slice(0, 3).map((w) => <MiniFace key={w} who={w} size={22} />)}
      </span>
      <span className="text-[12.5px] font-semibold">{r.open.length} people</span>
    </span>
  );
}

function Uses({ r }: { r: Row }) {
  return (
    <span className="flex flex-wrap gap-1">
      {r.uses.map((u) => (
        <span key={u} className="rounded-md bg-[#F2F0EA] border border-[#DEDAD0] px-1.5 py-[2px] text-[12px] font-medium leading-none whitespace-nowrap">{u}</span>
      ))}
    </span>
  );
}

function Log({ className = '' }: { className?: string }) {
  const lines = [...LOG, ...LOG];
  return (
    <div className={`sb-logstk ${className}`}>
      <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.08em] text-[#E8F1E8]/60 mb-2">
        <span>LOG</span><span className="sb-live"><i />live</span>
      </div>
      <div className="sb-log-view">
        <div className="sb-log-list">
          {lines.map(([c, tag, text], i) => (
            <div key={i} className="sb-log-row">
              <span className="sb-log-tag" style={{ background: c }}>{tag}</span>
              <span className="truncate">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminArt() {
  return (
    <div
      className="sb-admin relative rounded-[24px] md:rounded-[30px] px-3.5 pt-5 pb-6 sm:p-7"
      style={{ background: C.sun }}
      data-slap=""
      role="group"
      aria-label="The admin screen for harbor.co: every app, who built it and with which agent, what it uses, who can open it, and when it was last called, with the log below."
    >
      <div className="sb-tablestk">
        <div className="sb-tablewin">
          <div className="flex items-center gap-2 px-4 h-[38px] border-b-[2.5px] border-[#1F2A1F] bg-[#F4F2EC] rounded-t-[10px]">
            <span className="flex gap-[5px]">{[0, 1, 2].map((k) => <i key={k} className="block w-[9px] h-[9px] rounded-full bg-white border-[1.6px] border-[#1F2A1F]" />)}</span>
            <span className="ml-2 font-bold text-[14px]">harbor.co</span>
            <span className="text-[13px] text-[#5A6057]">· 7 apps</span>
            <span className="ml-auto text-[12px] font-semibold text-[#5A6057] hidden sm:inline">Admin</span>
          </div>
          {/* Wide: a table. */}
          <table className="sb-table sb-adm-table w-full">
            <thead>
              <tr>{['app · last called', 'built by', 'uses', 'who can open it'].map((h) => <th key={h} className="pt-3 whitespace-nowrap">{h}</th>)}</tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.app}>
                  <td>
                    <span className="block sb-mono text-[12.5px] font-semibold whitespace-nowrap">{r.app}</span>
                    <span className="block text-[12px] text-[#5A6057] mt-0.5">{r.last}</span>
                  </td>
                  <td><Builder r={r} /></td>
                  <td><Uses r={r} /></td>
                  <td><Open r={r} /></td>
                </tr>
              ))}
              <tr><td colSpan={4} className="text-[12.5px] text-[#5A6057]">+ 2 more</td></tr>
            </tbody>
          </table>
          {/* Phone: one card per app. */}
          <ul className="sb-adm-cards divide-y-[1.5px] divide-[#ECE9E2]">
            {ROWS.map((r) => (
              <li key={r.app} className="px-3.5 py-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="sb-mono text-[13px] font-semibold">{r.app}</span>
                  <Open r={r} />
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 text-[13px]">
                  <Builder r={r} />
                </div>
                <div className="mt-2 text-[12.5px] text-[#5A6057]">{r.uses.join(', ')} · {r.last}</div>
              </li>
            ))}
            <li className="px-3.5 py-2.5 text-[12.5px] text-[#5A6057]">+ 2 more</li>
          </ul>
        </div>
      </div>
      <Log className="sb-log-pos" />
    </div>
  );
}
