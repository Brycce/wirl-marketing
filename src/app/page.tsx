import Link from 'next/link';
import Wordmark from '@/components/Wordmark';
import WaitlistForm from '@/components/WaitlistForm';
import ConnectAgent from '@/components/ConnectAgent';
import Sprite from '@/components/pixel/Sprite';
import { ROBOT } from '@/components/pixel/sprites';
import { HeroScene, MessScene, WirlScene, ShareScene, AdminPanel, Terminal } from '@/components/pixel/Scenes';

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

const wrap = 'max-w-6xl mx-auto px-6';
const h2 = 'font-pixel font-bold leading-[1.05] text-balance';


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

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <nav className={`${wrap} flex items-center justify-between py-5`}>
        <Link href="/"><Wordmark /></Link>
        <div className="flex items-center gap-5 font-pixel text-[17px] leading-none">
          <Link href="/docs" className="hidden sm:inline text-dim hover:text-ink">Docs</Link>
          <a href="https://app.wirl.dev/login" className="hidden sm:inline text-dim hover:text-ink">Log in</a>
          <a href="#connect" className="px-btn px-4 py-2">Connect your agent</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-12 md:pt-20 pb-6 text-center">
        <div className={wrap}>
          <h1 className={`${h2} text-[2.75rem] sm:text-6xl md:text-[4.5rem] max-w-[14ch] mx-auto`}>
            Let your people build.
          </h1>
          <p className="mt-6 text-[17px] md:text-lg leading-relaxed max-w-[48ch] mx-auto text-ink/85">
            Wirl hosts the internal tools your team builds, by hand or with agents. Every app lands behind your company&apos;s sign-in, open to your company or to the people you name, with a record of who built it, what it connects to, and what happened inside.
          </p>
          <p className="mt-3 font-pixel text-[18px] text-dim leading-none">
            Fun for the people building. Boring for the people responsible. On purpose.
          </p>
          <div className="mt-8">
            <ConnectAgent />
          </div>
        </div>
        <div className="mt-12 overflow-hidden">
          <HeroScene />
        </div>
      </section>

      {/* The mess */}
      <section className="bg-sand border-y-[3px] border-ink">
        <div className={`${wrap} py-16 md:py-20 text-center`}>
          <h2 className={`${h2} text-3xl md:text-5xl max-w-[22ch] mx-auto`}>Right now their apps live everywhere.</h2>
          <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[54ch] mx-auto">
            A dashboard on a personal Vercel account. A tool on the intern&apos;s laptop. A pull request that sits until an engineer finds time to review it. A URL that was never meant to be public. Nobody has the list, and nobody knows which of them can read customer data.
          </p>
          <div className="mt-10 overflow-hidden">
            <MessScene />
          </div>
        </div>
      </section>

      {/* Wirl */}
      <section className={`${wrap} py-16 md:py-24 text-center`}>
        <h2 className={`${h2} text-3xl md:text-5xl max-w-[22ch] mx-auto`}>Give their agents a place to ship.</h2>
        <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[56ch] mx-auto">
          Point Claude Code, Codex, or Cursor at Wirl and ask it to deploy. The app lands behind your company&apos;s sign-in, open to everyone at your company or only to the people you name. What it connects to is declared and checked at deploy time, its keys never pass through the agent, and every call is logged.
        </p>
        <div className="mt-10 overflow-hidden">
          <WirlScene />
        </div>
        <div className="mt-10">
          <Terminal />
        </div>
      </section>

      {/* Bring your own coding agent */}
      <section className="bg-sand border-y-[3px] border-ink">
        <div className={`${wrap} py-16 md:py-24 text-center`}>
          <h2 className="font-pixel font-bold text-4xl md:text-5xl leading-none text-balance">Bring your own coding agent.</h2>
          <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[56ch] mx-auto">
            Wirl is an MCP server. Whatever your team already writes code with can deploy to it, and every app gets the same sign-in, the same sharing, and the same record.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
            {[
              ['Claude Code', 'One command in the terminal.', 'B'],
              ['Codex', 'Three lines in config.toml.', 'P'],
              ['Cursor', 'One click, or one JSON file.', 'O'],
              ['Anything with MCP', 'Run the command. Sign in once.', 'g'],
              ['No MCP needed', 'npx wirl skill writes the file Claude Code reads.', 'Y'],
            ].map(([name, note, tone]) => (
              <div key={name} className="px-window p-4 flex items-start gap-3">
                <Sprite rows={ROBOT} scale={3} swap={{ B: tone }} className="shrink-0" />
                <div>
                  <div className="font-pixel text-[20px] leading-none">{name}</div>
                  <div className="mt-2 text-[14px] text-dim leading-snug">{note}</div>
                </div>
              </div>
            ))}
          </div>
          <a href="#connect" className="inline-block mt-8 px-btn px-btn-sun px-5 py-2.5 font-pixel text-[18px] leading-none">Connect yours</a>
        </div>
      </section>

      {/* Built in */}
      <section className={`${wrap} py-16 md:py-24`}>
        <h2 className={`${h2} text-3xl md:text-5xl max-w-[22ch] mx-auto text-center`}>Built in, not bolted on.</h2>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ['The agent never sees your keys.', 'Declare the connection, deploy, follow one link, and type the key in your own browser. It goes straight into Wirl\'s vault. Every call the app makes through it is logged by host.'],
            ['Your company is already in.', 'Sign in with your work Google account and everyone at your company is in. No invites, no admin setup. The first person from a company makes the company\'s space.'],
            ['It runs on your machine the same way.', 'npx wirl dev gives you the same database shape, the same identity headers, and the same broker for your API calls as the deployed app.'],
            ['Fork it.', 'npx wirl pull gives anyone who can open an app its source, to keep building.'],
            ['Rolls back on its own.', 'A deploy that starts failing in its first half hour goes back to the last healthy version, and the record says so.'],
            ['Company-only by default.', 'Private for a personal account, company-wide for a work one. Public only when an owner chooses it, and that choice is on the record too.'],
          ].map(([title, body]) => (
            <div key={title} className="px-window p-5">
              <div className="font-pixel text-[21px] leading-none">{title}</div>
              <p className="mt-3 text-[14.5px] text-dim leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Share */}
      <section className="bg-gb-pale border-y-[3px] border-ink">
        <div className={`${wrap} py-16 md:py-20 text-center`}>
          <h2 className={`${h2} text-3xl md:text-5xl max-w-[22ch] mx-auto`}>Share it. Improve it.<br />Ship it again.</h2>
          <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[54ch] mx-auto">
            Every app has a URL your colleagues can open with the sign-in they already have. Anyone who can open it can pull the source, fix it, and ship it again. Every version lands on the list.
          </p>
          <div className="mt-6 px-window-green inline-block px-5 py-3 font-term text-[20px] md:text-[22px] leading-none scanlines">
            <span className="text-gb-green">$</span> npx wirl pull supplier-payments
          </div>
          <div className="mt-8 overflow-hidden">
            <ShareScene />
          </div>
        </div>
      </section>

      {/* Admin */}
      <section className={`${wrap} py-16 md:py-24 text-center`}>
        <h2 className={`${h2} text-3xl md:text-5xl max-w-[22ch] mx-auto`}>You get the full picture.</h2>
        <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[56ch] mx-auto">
          One screen with every internal app people have shipped: who built it, what it connects to and whether it still needs a key, who can open it, and what it called last. When security asks, you send the screen.
        </p>
        <div className="mt-10">
          <AdminPanel />
        </div>
      </section>

      {/* Three situations */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <div className="grid md:grid-cols-3 gap-8 border-t-[3px] border-ink pt-12">
          {situations.map((p) => (
            <div key={p.title}>
              <h3 className="font-pixel font-bold text-2xl leading-tight">{p.title}</h3>
              <p className="mt-3 text-[15px] text-dim leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <h2 className="font-pixel font-bold text-4xl md:text-5xl leading-none text-center text-balance">Questions people ask.</h2>
        <div className="mt-10 max-w-3xl mx-auto space-y-4">
          {faqs.map(([q, a]) => (
            <details key={q} className="px-window group">
              <summary className="cursor-pointer list-none px-5 py-4 font-pixel text-[20px] leading-none flex items-center justify-between gap-4">
                <span>{q}</span>
                <span className="font-pixel text-2xl leading-none group-open:hidden" aria-hidden="true">+</span>
                <span className="font-pixel text-2xl leading-none hidden group-open:inline" aria-hidden="true">-</span>
              </summary>
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-dim border-t-[3px] border-ink pt-4">{a}</p>
            </details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>

      {/* Closing */}
      <section id="waitlist" className={`${wrap} pb-16 scroll-mt-8`}>
        <div className="px-window px-6 py-14 md:py-20 text-center">
          <h2 className={`${h2} text-4xl md:text-5xl`}>Say yes to the builders.</h2>
          <p className="mt-4 text-[15px] md:text-base text-dim max-w-[40ch] mx-auto">
            Wirl is in private beta. Leave your email and we&apos;ll get you in.
          </p>
          <div className="mt-8">
            <WaitlistForm id="waitlist-email-footer" center />
          </div>
        </div>
      </section>

      <footer className={`${wrap} py-10 flex items-center justify-between font-pixel text-[16px] leading-none text-dim`}>
        <span className="text-ink"><Wordmark size={2} /></span>
        <div className="flex gap-6">
          <Link href="/docs" className="hover:text-ink">Docs</Link>
          <a href="#waitlist" className="hover:text-ink">Waitlist</a>
          <span>© 2026 Wirl</span>
        </div>
      </footer>
    </div>
  );
}
