// Admins: the one screen. Built as HTML with the cartoon styling so the text
// stays crisp and the table reflows, with SVG faces and logo stickers inside.

import { K, Avatar, Harbor, type Who, PEOPLE } from '../kit';
import { LogoStickerArt } from '../marks';

type Row = {
  app: string;
  who: Who;
  agent: 'claude' | 'cursor' | 'codex' | 'other';
  uses: string[];
  open: { everyone: true } | { people: Who[]; count: number };
  last: string;
  fresh?: boolean;
};

const ROWS: Row[] = [
  { app: 'supplier-payments', who: 'priya', agent: 'claude', uses: ['api.stripe.com'], open: { everyone: true }, last: '2 min ago', fresh: true },
  { app: 'candidate-pipeline', who: 'mia', agent: 'cursor', uses: ['Greenhouse'], open: { people: ['mia', 'lena', 'tom'], count: 6 }, last: '1 hr ago', fresh: true },
  { app: 'incident-handover', who: 'sam', agent: 'other', uses: ['PagerDuty', 'Slack'], open: { everyone: true }, last: 'Today' },
  { app: 'nda-lookup', who: 'lena', agent: 'codex', uses: ['Google Drive'], open: { people: ['lena', 'priya'], count: 3 }, last: 'Yesterday' },
  { app: 'budget-lines', who: 'tom', agent: 'claude', uses: ['Google Sheets'], open: { everyone: true }, last: '3 days ago' },
];

function Face({ who, size = 30 }: { who: Who; size?: number }) {
  return (
    <svg viewBox="-22 -22 44 44" width={size} height={size} aria-hidden="true" className="tb-face">
      <Avatar who={who} x={0} y={0} r={20} />
    </svg>
  );
}

function AgentBadge({ agent }: { agent: Row['agent'] }) {
  if (agent === 'other') {
    // Any other agent that speaks MCP: the same round "+" as the headline and the sticker sheet.
    return (
      <svg viewBox="-4 -4 32 32" width={22} height={22} aria-hidden="true" className="tb-agent-badge">
        <g transform="rotate(4 12 12)">
          <circle cx={12} cy={12} r={13} fill={K.paper} />
          <circle cx={12} cy={12} r={10} fill={K.mint} stroke={K.ink} strokeWidth={1.6} />
          <path d="M12 6.8v10.4M6.8 12h10.4" fill="none" stroke={K.ink} strokeWidth={2.6} strokeLinecap="round" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="-4 -4 32 32" width={22} height={22} aria-hidden="true" className="tb-agent-badge" style={{ color: K.ink }}>
      <g transform={`rotate(${agent === 'codex' ? 5 : -6} 12 12)`}>
        <LogoStickerArt agent={agent} uid={`adm-${agent}`} border={6} peel={null} />
      </g>
    </svg>
  );
}

const AGENT_LABEL: Record<Row['agent'], string> = { claude: 'Claude Code', cursor: 'Cursor', codex: 'Codex', other: 'Another MCP agent' };

export function AdminTable() {
  return (
    <div className="tb-admin" role="img" aria-label="The admin screen for harbor.co: every internal app, who built it and with which agent, what it connects to, who can open it, and when it was last used.">
      <div className="tb-admin-bar" aria-hidden="true">
        <span className="tb-dots"><i /><i /><i /></span>
        <svg viewBox="-13 -13 26 26" width={26} height={26}><Harbor x={0} y={0} r={12} /></svg>
        <b>harbor.co</b><span className="tb-admin-sep">·</span><span>Internal apps</span>
        <span className="tb-admin-count">7 apps</span>
      </div>
      <table className="tb-admin-table" aria-hidden="true">
        <thead>
          <tr>
            <th>App</th>
            <th><span className="tb-hide-phone">Built </span>by</th>
            <th className="tb-col-uses">Uses</th>
            <th className="tb-col-who">Who can open</th>
            <th>Last used</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => (
            <tr key={r.app} className={i === 0 ? 'tb-row-hover' : undefined}>
              <td className="tb-app">{r.app}</td>
              <td>
                <span className="tb-by">
                  <Face who={r.who} />
                  <span className="tb-by-name">{PEOPLE[r.who].name.split(' ')[0]}</span>
                  <span title={AGENT_LABEL[r.agent]}><AgentBadge agent={r.agent} /></span>
                </span>
              </td>
              <td className="tb-col-uses">
                <span className="tb-hosts">{r.uses.map((u) => <span key={u} className="tb-host">{u}</span>)}</span>
              </td>
              <td className="tb-col-who">
                {'everyone' in r.open ? (
                  <span className="tb-everyone">Everyone</span>
                ) : (
                  <span className="tb-stack">
                    {r.open.people.map((p) => <Face key={p} who={p} size={24} />)}
                    <span className="tb-stack-n">{r.open.count}</span>
                  </span>
                )}
              </td>
              <td>
                <span className="tb-last"><i className={r.fresh ? 'tb-pulse' : undefined} />{r.last}</span>
              </td>
            </tr>
          ))}
          <tr className="tb-more">
            <td colSpan={5}>+ 2 more: <span className="tb-app">customer-credits</span>, <span className="tb-app">spend-requests</span></td>
          </tr>
        </tbody>
      </table>
      <svg className="tb-admin-cursor" viewBox="-2 -2 32 44" width={30} height={42} aria-hidden="true">
        <path d="M0 0 L0 33 L8.2 25.8 L13.8 38.4 L20.4 35.6 L14.8 23.2 L25.6 23.2 Z" fill={K.paper} stroke={K.ink} strokeWidth={2.6} strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const LOG = [
  ['09:41', 'wirl', 'rolled supplier-payments back to v3'],
  ['09:12', 'priya@harbor.co', 'set the Stripe key · browser to vault'],
  ['09:02', 'supplier-payments', '→ api.stripe.com · 14 calls'],
  ['08:58', 'sam@harbor.co', 'was refused at candidate-pipeline'],
];

export function LogCard() {
  return (
    <div className="tb-log" role="img" aria-label="The log: wirl rolled supplier-payments back to v3; priya set the Stripe key from the browser to the vault; supplier-payments called api.stripe.com 14 times; sam was refused at candidate-pipeline.">
      <div className="tb-log-bar" aria-hidden="true"><span className="tb-dots"><i /><i /><i /></span><span>Log</span></div>
      <ol className="tb-log-lines" aria-hidden="true">
        {LOG.map(([t, who, what], i) => (
          <li key={t} className={i === 0 ? 'tb-log-new' : undefined}>
            <span className="tb-log-t">{t}</span> <span className="tb-log-who">{who}</span> {what}
          </li>
        ))}
      </ol>
    </div>
  );
}
