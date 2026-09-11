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
    body: 'Someone describes it to an agent on Tuesday. It is live behind the company sign-in that afternoon, and only Finance can open it. Nobody filed a ticket, and nobody had to wire up a login.',
  },
  {
    title: 'An agent ships something at 2am.',
    body: 'It cannot ship it public, and it cannot ship it to everyone. Whatever it built is on Wirl by morning, with the team it picked and a record of what it did.',
  },
  {
    title: 'Security asks for the list.',
    body: 'You send the list. Every app, who built it, what it connects to, who can open it, and what happened inside. It took a minute, not a week of asking around.',
  },
];

const wrap = 'max-w-6xl mx-auto px-6';
const h2 = 'font-pixel font-bold leading-[1.05] text-balance';


const faqs: [string, string][] = [
  [
    'What is Wirl?',
    'Wirl is where your team deploys the internal tools they vibe-code, and where you get the full picture: every app, who built it, which credentials and data sources it uses, and who can open it.',
  ],
  [
    'Does it work with apps built by AI agents?',
    'Yes. Connect Claude Code, Codex, Cursor, or any MCP-compatible agent to Wirl and it can deploy directly. Login, permissions, and logging apply to every app the same way, however it was built.',
  ],
  [
    'Who can open an app on Wirl?',
    'People signed in with your company login who are on a team you have granted. There is no public URL unless you make one. Remove someone from a team and they lose every app that team could open.',
  ],
  [
    'What does the audit log record?',
    'Deploys, who opened which app, what they exported or changed, denied access attempts, and permission changes. An access review becomes a query instead of a week of asking around.',
  ],
  [
    'Is Wirl a replacement for Vercel?',
    'For internal tools, yes: it is where they get deployed and hosted. Keep whatever you use for your public product. Wirl is for the apps that should never have been public in the first place.',
  ],
  [
    'When can I use it?',
    'Connect your coding agent to the Wirl MCP server and ask it to deploy something. Wirl is in private beta, so if you would rather talk first, join the waitlist and we will write when your workspace is ready.',
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
            Wirl hosts the internal tools your team builds, by hand or with agents. Every app lands behind your company login, open to the team you pick, with a log of everything that happens inside.
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
          Point Claude Code or Cursor at Wirl. When it deploys, the app lands behind your login, open only to the teams you pick, logged. Your governance policy is checked at deploy time, not in a review three weeks later.
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
            Wirl is an MCP server. Whatever your team already writes code with can deploy to it, and every app gets the same login, teams, and log.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {[
              ['Claude Code', 'One command in the terminal.', 'B'],
              ['Codex', 'Two lines in config.toml.', 'P'],
              ['Cursor', 'One click, or one JSON file.', 'O'],
              ['Anything with MCP', 'Point it at the URL. Sign in once.', 'g'],
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

      {/* Share */}
      <section className="bg-gb-pale border-y-[3px] border-ink">
        <div className={`${wrap} py-16 md:py-20 text-center`}>
          <h2 className={`${h2} text-3xl md:text-5xl max-w-[22ch] mx-auto`}>Share it. Improve it.<br />Ship it again.</h2>
          <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[54ch] mx-auto">
            Every app has a URL your colleagues can open with the login they already have. They can fork it, fix it, and ship it back. Every version lands on the list too.
          </p>
          <div className="mt-8 overflow-hidden">
            <ShareScene />
          </div>
        </div>
      </section>

      {/* Admin */}
      <section className={`${wrap} py-16 md:py-24 text-center`}>
        <h2 className={`${h2} text-3xl md:text-5xl max-w-[22ch] mx-auto`}>You get the full picture.</h2>
        <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[56ch] mx-auto">
          One screen with every internal app people have shipped: who built it, which credentials and data sources it uses, which teams can open it, and everything that happened inside. When security asks, you send the screen.
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
