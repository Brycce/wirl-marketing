'use client';

// The connect block from ConnectAgent.tsx, same snippets, copy button and
// Cursor deeplink, restyled as chunky cartoon UI.

import { useState } from 'react';
import { AgentMark } from '@/components/AgentIcons';
import s from './cast.module.css';

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

function Glyph({ id }: { id: string }) {
  if (id === 'other') {
    return (
      <svg viewBox="0 0 24 24" className={s.tabMark} aria-hidden="true">
        <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'skill') {
    return (
      <svg viewBox="0 0 24 24" className={s.tabMark} aria-hidden="true">
        <path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  return <AgentMark id={id} className={s.tabMark} />;
}

export default function Connect({ id = 'connect', after }: { id?: string; after: string }) {
  const [active, setActive] = useState('claude');
  const [copied, setCopied] = useState(false);
  const agent = AGENTS.find((a) => a.id === active) ?? AGENTS[0];

  async function copy() {
    try {
      await navigator.clipboard.writeText(agent.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked; the text is selectable */
    }
  }

  return (
    <div id={id} className="max-w-xl scroll-mt-8">
      <div className="flex flex-wrap gap-1.5 mb-4" role="tablist" aria-label="Choose your coding agent">
        {AGENTS.map((a) => (
          <button
            key={a.id}
            role="tab"
            aria-selected={a.id === active}
            onClick={() => { setActive(a.id); setCopied(false); }}
            className={`${s.tab} ${a.id === active ? s.tabOn : ''}`}
          >
            <Glyph id={a.id} />
            {a.label}
          </button>
        ))}
      </div>
      <div className={s.code}>
        <pre className="font-mono text-[14.5px] md:text-[15px] leading-relaxed whitespace-pre-wrap break-all text-[#FFF7EA]">{agent.snippet}</pre>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button onClick={copy} className={`${s.btn} ${s.btnSm}`}>
            {copied ? 'Copied' : 'Copy'}
          </button>
          {agent.id === 'cursor' && (
            <a href={CURSOR_DEEPLINK} className={`${s.btn} ${s.btnSm} ${s.btnWhite}`}>
              Add to Cursor
            </a>
          )}
          <span className="text-[13.5px] leading-snug text-[#E4DEEE] max-w-[42ch]">{agent.hint}</span>
        </div>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-[#544A5E]">
        {after.split(/(waitlist)/i).map((part, i) =>
          /^waitlist$/i.test(part)
            ? <a key={i} href="#waitlist" className="font-semibold text-[#2B2233] underline decoration-[#FFC53D] decoration-[3px] underline-offset-4 hover:decoration-[#2B2233]">{part}</a>
            : <span key={i}>{part}</span>
        )}
      </p>
    </div>
  );
}
