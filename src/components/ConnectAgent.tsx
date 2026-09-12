'use client';

import { useState } from 'react';

// Getting started is connecting your coding agent to Wirl's MCP server.
// One block, one tab per agent, one copy button. These are today's stdio
// commands; when the hosted endpoint ships, this list is the only thing to change.

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

export default function ConnectAgent({ id = 'connect' }: { id?: string }) {
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
    <div id={id} className="max-w-2xl mx-auto text-center scroll-mt-8">
      <div className="flex flex-wrap justify-center gap-2 mb-3" role="tablist" aria-label="Choose your coding agent">
        {AGENTS.map((a) => (
          <button
            key={a.id}
            role="tab"
            aria-selected={a.id === active}
            onClick={() => { setActive(a.id); setCopied(false); }}
            className={`px-tag px-3 py-1.5 font-pixel text-[16px] leading-none transition-colors ${a.id === active ? 'bg-ink text-cream' : 'bg-card hover:bg-sand'}`}
          >
            {a.label}
          </button>
        ))}
      </div>
      <div className="px-window-green p-4 md:p-5">
        <pre className="font-term text-[20px] md:text-[22px] leading-tight whitespace-pre-wrap break-all scanlines text-center">{agent.snippet}</pre>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button onClick={copy} className="px-btn px-btn-sun px-4 py-2 font-pixel text-[16px] leading-none">
            {copied ? 'Copied' : 'Copy'}
          </button>
          {agent.id === 'cursor' && (
            <a href={CURSOR_DEEPLINK} className="px-btn px-4 py-2 font-pixel text-[16px] leading-none">
              Add to Cursor
            </a>
          )}
          <span className="font-sans text-[13px] text-gb-light/80 max-w-[44ch]">{agent.hint}</span>
        </div>
      </div>
      <p className="mt-3 text-[13px] text-dim">
        Then ask your agent to build something and deploy it. Not on an agent yet? <a href="#waitlist" className="underline underline-offset-4 hover:text-ink">Join the waitlist</a>.
      </p>
    </div>
  );
}
