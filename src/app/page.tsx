import Link from 'next/link';
import type { ReactNode } from 'react';
import Wordmark from '@/components/Wordmark';
import WaitlistForm from '@/components/WaitlistForm';
import ConnectAgent from '@/components/ConnectAgent';
import { HeroScene, MessTiles, WirlScene, ShareScene, AdminTable, RobotIcon } from '@/components/paper/Scenes';

const situations = [
  {
    title: 'Finance needs a tool by Friday.',
    body: 'Someone describes it to an agent on Tuesday. It is live behind the company sign-in that afternoon, open to everyone at the company or only to the people she names. Nobody filed a ticket, and nobody had to wire up a login.',
  },
  {
    title: 'An agent ships something at 2am.',
    body: 'It cannot ship it public unless someone chooses that. Whatever it built is on Wirl by morning, company-only, with a record of what it did. If what it shipped breaks, Wirl rolls it back to the last version that worked, and the record says so.',
  },
  {
    title: 'Security asks for the list.',
    body: 'You send the list. Every app, who built it, what it connects to, who can open it, and what happened inside. It is the Connections and Activity pages, and it took a minute rather than a week of asking around.',
  },
];

const faqs: [string, string][] = [
  [
    'What is Wirl?',
    'A place to put the internal tools your team builds, by hand or with a coding agent. Every app lands behind your company\'s sign-in, open to your company or to the people you name, with a record of who built it, what it connects to, and what happened inside.',
  ],
  [
    'Does it work with apps built by AI agents?',
    'It is built for them. Add Wirl to Claude Code, Codex, Cursor, or anything that speaks MCP, and ask the agent to deploy. It gets a URL back, and the keys for any API the app needs go from your browser into Wirl\'s vault, never through the agent.',
  ],
  [
    'Who can open an app on Wirl?',
    'By default, everyone who signs in with your company\'s Google account, and nobody else. The person who built it can narrow that to named people, or open it to anyone with the link. Every change is on the record.',
  ],
  [
    'What does the audit log record?',
    'Who deployed, shared, opened, was refused, changed a key, or was removed, and what each app called through its connections, by host. Never the contents of a request or a response, and never a key.',
  ],
  [
    'Is Wirl a replacement for Vercel?',
    'No. Vercel is for the site you show the world. Wirl is for the tools you show your colleagues: private by default, connected to your internal systems, with an admin who can see all of it. Static apps and server-side apps written as one module both work; it is not a general host.',
  ],
  [
    'When can I use it?',
    'Private beta now. Connect your coding agent and ask it to deploy something, or leave a work email and we will get you in.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const agents: [string, string, string, string][] = [
  ['Claude Code', 'One command in the terminal.', 'bot-claude', '#D9A377'],
  ['Codex', 'Three lines in config.toml.', 'bot-codex', '#A9B8C4'],
  ['Cursor', 'One click, or one JSON file.', 'bot-cursor', '#B9AEDD'],
  ['Anything with MCP', 'Run the command. Sign in once.', 'bot-mcp', '#8FD39A'],
  ['No MCP needed', 'npx wirl skill writes the file Claude Code reads.', 'bot-skill', '#F2C14E'],
];

const builtIn: [string, string][] = [
  ['The agent never sees your keys.', 'Declare the connection, deploy, follow one link, and type the key in your own browser. It goes straight into Wirl\'s vault. Every call the app makes through it is logged by host.'],
  ['Your company is already in.', 'Sign in with your work Google account and everyone at your company is in. No invites, no admin setup. The first person from a company makes the company\'s space.'],
  ['It runs on your machine the same way.', 'npx wirl dev gives you the same database shape, the same identity headers, and the same broker for your API calls as the deployed app.'],
  ['Fork it.', 'npx wirl pull gives anyone who can open an app its source, to keep building.'],
  ['Rolls back on its own.', 'A deploy that starts failing in its first half hour goes back to the last healthy version, and the record says so.'],
  ['Company-only by default.', 'Private for a personal account, company-wide for a work one. Public only when an owner chooses it, and that choice is on the record too.'],
];

const chips = ['login required', 'company-only by default', 'keys never in the app', 'audit log on', 'rolls back on its own'];

const wrap = 'max-w-6xl mx-auto px-6';
const h2 = 'font-display font-semibold leading-[1.08] tracking-[-0.01em] text-balance text-[2rem] md:text-[2.6rem]';
const lede = 'mt-5 text-[17px] leading-relaxed text-ink/80';

/* Text on one side, the picture on the other. Flip swaps them on wide screens;
   on a phone the text always comes first. */
function Split({ text, art, flip = false }: { text: ReactNode; art: ReactNode; flip?: boolean }) {
  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div className={`min-w-0 ${flip ? 'md:order-2' : ''}`}>{text}</div>
      <div className={`min-w-0 ${flip ? 'md:order-1' : ''}`}>{art}</div>
    </div>
  );
}

function Panel({ tone, children }: { tone: string; children: ReactNode }) {
  return <div className={`panel grain ${tone}`}>{children}</div>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <nav className={`${wrap} flex items-center justify-between py-5`}>
        <Link href="/" className="text-ink"><Wordmark /></Link>
        <div className="flex items-center gap-5 text-[15px] font-medium">
          <Link href="/docs" className="hidden sm:inline text-dim hover:text-ink">Docs</Link>
          <a href="https://app.wirl.dev/login" className="hidden sm:inline text-dim hover:text-ink">Log in</a>
          <a href="#connect" className="btn"><span className="sm:hidden">Connect</span><span className="hidden sm:inline">Connect your agent</span></a>
        </div>
      </nav>

      {/* Hero */}
      <section className={`${wrap} pt-10 md:pt-16 pb-10`}>
        <Split
          text={
            <div>
              <h1 className="font-display font-semibold leading-[1.02] tracking-[-0.015em] text-balance text-[2.9rem] sm:text-[3.5rem] lg:text-[4.1rem]">
                Let your people build.
              </h1>
              <p className="mt-6 text-[17px] md:text-[18px] leading-relaxed text-ink/85 max-w-[46ch]">
                Wirl hosts the internal tools your team builds, by hand or with agents. Every app lands behind your company&apos;s sign-in, open to your company or to the people you name, with a record of who built it, what it connects to, and what happened inside.
              </p>
              <p className="mt-3 text-[15px] text-dim">
                Fun for the people building. Boring for the people responsible. On purpose.
              </p>
              <div className="mt-8">
                <ConnectAgent />
              </div>
            </div>
          }
          art={<Panel tone="bg-sky"><HeroScene /></Panel>}
        />
      </section>

      {/* The mess */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          flip
          text={
            <div>
              <h2 className={h2}>Right now their apps live everywhere.</h2>
              <p className={lede}>
                A dashboard on a personal Vercel account. A tool on the intern&apos;s laptop. A pull request that sits until an engineer finds time to review it. A URL that was never meant to be public. Nobody has the list, and nobody knows which of them can read customer data.
              </p>
            </div>
          }
          art={<Panel tone="bg-blush"><MessTiles /></Panel>}
        />
      </section>

      {/* Wirl */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          text={
            <div>
              <h2 className={h2}>Give their agents a place to ship.</h2>
              <p className={lede}>
                Point Claude Code, Codex, or Cursor at Wirl and ask it to deploy. The app lands behind your company&apos;s sign-in, open to everyone at your company or only to the people you name. What it connects to is declared and checked at deploy time, its keys never pass through the agent, and every call is logged.
              </p>
              <p className="mt-6 text-[12px] uppercase tracking-wider text-dim font-semibold">Governance, built in</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {chips.map((c) => <span key={c} className="chip">{c}</span>)}
              </div>
            </div>
          }
          art={<Panel tone="bg-mint"><WirlScene /></Panel>}
        />
      </section>

      {/* Bring your own coding agent */}
      <section className={`${wrap} py-14 md:py-20`}>
        <div className="max-w-[60ch]">
          <h2 className={h2}>Bring your own coding agent.</h2>
          <p className={lede}>
            Wirl is an MCP server. Whatever your team already writes code with can deploy to it, and every app gets the same sign-in, the same sharing, and the same record.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {agents.map(([name, note, id, tone]) => (
            <div key={name} className="paper p-4 flex items-start gap-3">
              <div className="shrink-0"><RobotIcon id={id} tone={tone} /></div>
              <div>
                <div className="font-semibold text-[16px] leading-tight">{name}</div>
                <div className="mt-1.5 text-[14px] text-dim leading-snug">{note}</div>
              </div>
            </div>
          ))}
        </div>
        <a href="#connect" className="btn btn-sun mt-8">Connect yours</a>
      </section>

      {/* Built in */}
      <section className={`${wrap} py-14 md:py-20`}>
        <h2 className={h2}>Built in, not bolted on.</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {builtIn.map(([title, body]) => (
            <div key={title} className="paper p-5">
              <div className="font-display font-semibold text-[20px] leading-tight">{title}</div>
              <p className="mt-2.5 text-[15px] text-ink/75 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Share */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          flip
          text={
            <div>
              <h2 className={h2}>Share it. Improve it. Ship it again.</h2>
              <p className={lede}>
                Every app has a URL your colleagues can open with the sign-in they already have. Anyone who can open it can pull the source, fix it, and ship it again. Every version lands on the list.
              </p>
              <div className="mt-6 paper-dark inline-block px-4 py-3 font-mono text-[14.5px] leading-none text-[#DDEBDD]">
                <span className="text-mint/60">$</span> npx wirl pull supplier-payments
              </div>
            </div>
          }
          art={<Panel tone="bg-butter"><ShareScene /></Panel>}
        />
      </section>

      {/* Admin */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          text={
            <div>
              <h2 className={h2}>You get the full picture.</h2>
              <p className={lede}>
                One screen with every internal app people have shipped: who built it, what it connects to and whether it still needs a key, who can open it, and what it called last. When security asks, you send the screen.
              </p>
            </div>
          }
          art={<Panel tone="bg-lilac"><AdminTable /></Panel>}
        />
      </section>

      {/* Three situations */}
      <section className={`${wrap} py-14 md:py-20`}>
        <div className="grid md:grid-cols-3 gap-8 border-t border-sand pt-12">
          {situations.map((p) => (
            <div key={p.title}>
              <h3 className="font-display font-semibold text-[22px] leading-tight">{p.title}</h3>
              <p className="mt-3 text-[15px] text-ink/75 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={`${wrap} pb-14 md:pb-20`}>
        <h2 className={h2}>Questions people ask.</h2>
        <div className="mt-8 max-w-3xl space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="paper group">
              <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-[16px] flex items-center justify-between gap-4">
                <span>{q}</span>
                <span className="text-xl leading-none text-dim group-open:hidden" aria-hidden="true">+</span>
                <span className="text-xl leading-none text-dim hidden group-open:inline" aria-hidden="true">&minus;</span>
              </summary>
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink/75">{a}</p>
            </details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>

      {/* Closing */}
      <section id="waitlist" className={`${wrap} pb-16 scroll-mt-8`}>
        <div className="panel grain bg-butter px-6 py-14 md:py-20 text-center">
          <h2 className={h2}>Say yes to the builders.</h2>
          <p className="mt-4 text-[16px] text-ink/75 max-w-[40ch] mx-auto">
            Wirl is in private beta. Leave your email and we&apos;ll get you in.
          </p>
          <div className="mt-8">
            <WaitlistForm id="waitlist-email-footer" center />
          </div>
        </div>
      </section>

      <footer className={`${wrap} py-10 flex items-center justify-between text-[14px] text-dim`}>
        <span className="text-ink"><Wordmark size={22} /></span>
        <div className="flex gap-6">
          <Link href="/docs" className="hover:text-ink">Docs</Link>
          <a href="#waitlist" className="hover:text-ink">Waitlist</a>
          <span>© 2026 Wirl</span>
        </div>
      </footer>
    </div>
  );
}
