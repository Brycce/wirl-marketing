'use client';

import { useState } from 'react';
import { AgentMark } from '@/components/AgentIcons';

// The connect block from the home page (same agents, commands, copy button
// and Cursor deeplink), dressed as stickers: white pill tabs with the logos,
// the command on an ink terminal sticker, and a green check that slaps on
// when it's copied.

const CURSOR_DEEPLINK = 'cursor://anysphere.cursor-deeplink/mcp/install?name=wirl&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkB3aXJsL21jcCJdfQ==';

const AGENTS: { id: string; label: string; hint: string; snippet: string }[] = [
  {
    id: 'claude',
    label: 'Claude Code',
    hint: 'Run this once. The first time you ask your agent to deploy, it shows you a link and a code; approve it in the browser and you are in.',
    snippet: 'claude mcp add wirl -- npx -y @wirl/mcp',
  },
  {
    id: 'codex',
    label: 'Codex',
    hint: 'Add these three lines to ~/.codex/config.toml.',
    snippet: '[mcp_servers.wirl]\ncommand = "npx"\nargs = ["-y", "@wirl/mcp"]',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    hint: 'Add this to .cursor/mcp.json, or use the button.',
    snippet: '{ "mcpServers": { "wirl": { "command": "npx", "args": ["-y", "@wirl/mcp"] } } }',
  },
  {
    id: 'other',
    label: 'Other MCP',
    hint: 'Any client that speaks MCP. Run the command. Sign in once.',
    snippet: '{ "mcpServers": { "wirl": { "command": "npx", "args": ["-y", "@wirl/mcp"] } } }',
  },
  {
    id: 'skill',
    label: 'No MCP',
    hint: 'Writes the skill file Claude Code reads. No MCP needed.',
    snippet: 'npx wirl skill',
  },
];

function TabIcon({ id }: { id: string }) {
  if (id === 'other') {
    return (
      <svg viewBox="0 0 24 24" className="sb-tab-ic" aria-hidden="true" focusable="false">
        <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'skill') {
    return (
      <svg viewBox="0 0 24 24" className="sb-tab-ic" aria-hidden="true" focusable="false">
        <path d="M5 7l5 5-5 5M12.5 17.5H19" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return <AgentMark id={id} className={id === 'cursor' ? 'sb-tab-ic' : ''} />;
}

export function CheckSticker({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 30 30" width={size} height={size} aria-hidden="true" focusable="false">
      <circle cx="15" cy="15" r="14.5" fill="#FFFFFF" />
      <circle cx="15" cy="15" r="11" fill="#22A861" stroke="#1F2A1F" strokeWidth="2" />
      <path d="M10 15.5 l3.4 3.4 l6.6 -7.2" fill="none" stroke="#1F2A1F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Connect({ id = 'connect', after }: { id?: string; after: string }) {
  const [active, setActive] = useState('claude');
  const [copied, setCopied] = useState(false);
  const agent = AGENTS.find((a) => a.id === active) ?? AGENTS[0];

  async function copy() {
    try {
      await navigator.clipboard.writeText(agent.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked; the text is selectable */
    }
  }

  return (
    <div id={id} className="max-w-[36rem] scroll-mt-8">
      <div className="flex flex-wrap gap-2.5 mb-5" role="tablist" aria-label="Choose your coding agent">
        {AGENTS.map((a) => (
          <button
            key={a.id}
            role="tab"
            aria-selected={a.id === active}
            onClick={() => { setActive(a.id); setCopied(false); }}
            className="sb-tab"
          >
            <TabIcon id={a.id} />
            {a.label}
          </button>
        ))}
      </div>
      <div className="sb-code p-4 md:p-5">
        <pre className="sb-mono text-[14.5px] md:text-[15px] leading-relaxed whitespace-pre-wrap break-all">
          <span className="text-[#22A861] select-none">{agent.id === 'codex' || agent.id === 'cursor' || agent.id === 'other' ? '' : '$ '}</span>{agent.snippet}
        </pre>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button onClick={copy} className="sb-btn sb-btn-sun sb-btn-sm">
            {copied ? 'Copied' : 'Copy'}
          </button>
          {copied && <span className="sb-pop -ml-1" aria-hidden="true"><CheckSticker /></span>}
          {agent.id === 'cursor' && (
            <a href={CURSOR_DEEPLINK} className="sb-btn sb-btn-sm" style={{ background: '#33402F' }}>
              Add to Cursor
            </a>
          )}
          <span className="text-[13.5px] leading-snug text-[#E8F1E8]/75 max-w-[44ch]">{agent.hint}</span>
        </div>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5A6057]">
        {after.split(/(waitlist)/i).map((part, i) =>
          /^waitlist$/i.test(part)
            ? <a key={i} href="#waitlist" className="underline underline-offset-4 decoration-2 decoration-[#FFCC3D] hover:text-[#1F2A1F]">{part}</a>
            : <span key={i}>{part}</span>
        )}
      </p>
    </div>
  );
}
