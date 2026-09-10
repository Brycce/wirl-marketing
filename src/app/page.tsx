import Link from 'next/link';
import Wordmark from '@/components/Wordmark';
import Story from '@/components/Story';
import StoryStage from '@/components/StoryStage';
import WaitlistForm from '@/components/WaitlistForm';

const situations = [
  {
    title: 'Finance needs a tool by Friday.',
    body: 'Someone describes it to an agent on Tuesday. It is live behind the company sign-in that afternoon, and only Finance can open it. Nobody filed a ticket, and nobody had to wire up a login.',
  },
  {
    title: 'An agent ships something at 2am.',
    body: 'It cannot ship it public, and it cannot ship it to everyone. Whatever it built is in the list by morning, with the team it picked and a record of what it did.',
  },
  {
    title: 'Security asks for the list.',
    body: 'You send the list. Every app, who can open it, and what happened inside each one. It took a minute, not a week of asking around.',
  },
];

const wrap = 'max-w-6xl mx-auto px-6';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <nav className={`${wrap} flex items-center justify-between py-5`}>
        <Link href="/"><Wordmark /></Link>
        <div className="flex items-center gap-5 text-[14px]">
          <Link href="/docs" className="hidden sm:inline text-dim hover:text-ink transition-colors">Docs</Link>
          <a href="https://app.wirl.dev/login" className="hidden sm:inline text-dim hover:text-ink transition-colors">Log in</a>
          <a href="#waitlist" className="bg-ink text-white px-4 py-2 rounded-lg font-semibold hover:bg-black transition-colors">
            Join the waitlist
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-14 md:pt-24 pb-10 text-center">
        <div className={wrap}>
          <h1 className="display text-[2.6rem] sm:text-6xl md:text-[4.25rem] leading-[1.02] max-w-[16ch] mx-auto text-balance">
            One place to ship every internal tool.
          </h1>
          <p className="mt-6 text-[17px] md:text-lg leading-relaxed max-w-[46ch] mx-auto text-ink/85">
            Wirl hosts the internal apps your team builds, by hand or with agents. Every one launches behind your company login, with team permissions and an audit log.
          </p>
          <p className="mt-2 text-[15px] text-dim">
            Everyone can build. You keep the list, the login, and the log.
          </p>
          <div className="mt-8">
            <WaitlistForm id="waitlist-email-hero" center />
          </div>
        </div>

        {/* The story: one stage, six chapters, told on scroll. */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-14">
          <Story>
            <StoryStage />
          </Story>
        </div>
      </section>

      {/* Three situations */}
      <section className={`${wrap} py-16 md:py-24`}>
        <div className="grid md:grid-cols-3 gap-8 border-t border-rule pt-12">
          {situations.map((p) => (
            <div key={p.title}>
              <h3 className="display text-2xl leading-tight">{p.title}</h3>
              <p className="mt-3 text-[15px] text-dim leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section id="how-it-works" className={`${wrap} pb-16 md:pb-24 scroll-mt-8`}>
        <div className="rounded-3xl bg-ink text-white p-6 md:p-8 font-mono text-[13px] leading-relaxed overflow-x-auto">
          <div className="font-sans text-white/60 text-[14px] mb-4">One command connects your agent. Claude Code, Cursor, or anything else that speaks MCP.</div>
          <pre>
            <span className="text-white/50">$</span>{' claude mcp add --transport http wirl https://app.wirl.dev/mcp'}
          </pre>
        </div>
      </section>

      {/* Closing */}
      <section id="waitlist" className={`${wrap} pb-16 scroll-mt-8`}>
        <div className="rounded-3xl bg-panel px-6 py-16 md:py-20 text-center">
          <h2 className="display text-4xl md:text-5xl leading-[1.05]">Let everyone build. Keep the list.</h2>
          <p className="mt-4 text-[15px] md:text-base text-dim max-w-[40ch] mx-auto">
            Wirl is in private beta. Leave your email and we&apos;ll get you in.
          </p>
          <div className="mt-8">
            <WaitlistForm id="waitlist-email-footer" center />
          </div>
        </div>
      </section>

      <footer className={`${wrap} py-10 flex items-center justify-between text-[13px] text-dim`}>
        <span className="text-ink"><Wordmark size={20} /></span>
        <div className="flex gap-6">
          <Link href="/docs" className="hover:text-ink transition-colors">Docs</Link>
          <a href="#waitlist" className="hover:text-ink transition-colors">Waitlist</a>
          <span>© 2026 Wirl</span>
        </div>
      </footer>
    </div>
  );
}
