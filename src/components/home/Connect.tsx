'use client';

// Getting started is connecting your coding agent to Wirl's MCP server.
// One block, one tab per agent, one copy button, styled as a toy: chunky
// tabs, the snippet in a dark window, and a sun-yellow Copy key that presses
// down and bursts three sparks when it says Copied.
//
// These are today's stdio commands; when the hosted endpoint ships, this list
// is the only thing to change.

import { useState } from 'react';
import { AgentMark } from '@/components/AgentIcons';

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
    hint: "Add this to your client's MCP config. Sign in once.",
    snippet: '{ "mcpServers": { "wirl": { "command": "npx", "args": ["-y", "@wirl/mcp"] } } }',
  },
  {
    id: 'skill',
    label: 'No MCP',
    hint: 'Writes the skill file Claude Code reads. No MCP needed.',
    snippet: 'npx wirl skill',
  },
];

export default function Connect({ id = 'connect', after }: { id?: string; after: string }) {
  const [active, setActive] = useState('claude');
  const [copied, setCopied] = useState(0);
  const agent = AGENTS.find((a) => a.id === active) ?? AGENTS[0];

  async function copy() {
    try {
      await navigator.clipboard.writeText(agent.snippet);
      const stamp = Date.now();
      setCopied(stamp);
      setTimeout(() => setCopied((c) => (c === stamp ? 0 : c)), 1600);
    } catch {
      /* clipboard blocked; the text is selectable */
    }
  }

  return (
    <div id={id} className="tb-connect">
      <div className="tb-tabs" role="tablist" aria-label="Choose your coding agent">
        {AGENTS.map((a) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={a.id === active}
            onClick={() => { setActive(a.id); setCopied(0); }}
            className="tb-tab"
          >
            <AgentMark id={a.id} className="tb-tab-mark" />
            {a.label}
          </button>
        ))}
      </div>
      <div className="tb-term">
        <div className="tb-term-bar" aria-hidden="true"><i /><i /><i /><span>{agent.label === 'No MCP' ? 'terminal' : agent.id === 'other' ? 'mcp.json' : agent.label}</span></div>
        <div className="tb-term-body">
          <pre>{agent.snippet}</pre>
          <div className="tb-term-row">
            <button type="button" onClick={copy} className="tbtn tbtn-sm tb-copy" data-copied={copied ? 'yes' : 'no'}>
              {copied ? 'Copied' : 'Copy'}
              {copied ? (
                <span key={copied} className="tb-burst" aria-hidden="true"><i /><i /><i /></span>
              ) : null}
            </button>
            {agent.id === 'cursor' && (
              <a href={CURSOR_DEEPLINK} className="tbtn tbtn-sm tbtn-paper">Add to Cursor</a>
            )}
            <span className="tb-hint">{agent.hint}</span>
          </div>
        </div>
      </div>
      <p className="tb-after">
        {after.split(/(waitlist)/i).map((part, i) =>
          /^waitlist$/i.test(part)
            ? <a key={i} href="#waitlist">{part}</a>
            : <span key={i}>{part}</span>
        )}
      </p>
    </div>
  );
}
