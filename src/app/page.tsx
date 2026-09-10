import Link from 'next/link';
import Wordmark from '@/components/Wordmark';
import HeroPile from '@/components/HeroPile';
import MessPills from '@/components/MessPills';
import ProductWindow from '@/components/ProductWindow';
import WaitlistForm from '@/components/WaitlistForm';
import { LoginPicture, PermissionsPicture, LogPicture, ListPicture } from '@/components/Illustrations';

const guarantees = [
  {
    term: 'Login on every app',
    body: 'Every app opens behind your company sign-in from its first deploy. There is no public URL unless you make one. No one can forget to add auth, because adding auth is not a step.',
    Picture: LoginPicture,
  },
  {
    term: 'Team permissions',
    body: 'Teams are defined for the workspace, and every app checks against them. Remove someone from a team and they are out of every tool that team could open.',
    Picture: PermissionsPicture,
  },
  {
    term: 'Audit log',
    body: 'Who opened which tool, what they looked at, what they changed. The access review becomes a query instead of a week of Slack messages.',
    Picture: LogPicture,
  },
  {
    term: 'One list',
    body: 'Everything your team has shipped, on one screen, with who can reach each one. Not scattered across whichever accounts the builders were logged into.',
    Picture: ListPicture,
  },
];

const steps = [
  {
    title: 'Connect your agent',
    body: 'One command adds Wirl as an MCP server to Claude Code, Cursor, or anything else that speaks MCP. There is a dashboard too.',
  },
  {
    title: 'Ask for the tool',
    body: 'The agent writes it, creates the app, picks which teams can open it, and deploys to a URL. Nothing to provision first.',
  },
  {
    title: 'Approve, don’t build',
    body: 'Login, permissions, and logging are already there. The agent chooses who can see the tool. It cannot choose nobody.',
  },
];

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
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-14">
          <HeroPile />
        </div>
      </section>

      {/* The problem */}
      <section className={`${wrap} py-16 md:py-24`}>
        <MessPills>
          <h2 className="display text-3xl md:text-[2.75rem] leading-[1.08] max-w-[22ch] mx-auto text-balance">
            Internal tools are getting built faster than anyone can keep track of them.
          </h2>
          <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[54ch] mx-auto">
            Coding agents turned a dashboard or an admin tool into a one-hour job, so people build them. Each one lands wherever the builder was logged in. Nobody has the list, nobody knows which ones can read customer data, and engineering gets asked to retrofit auth after the fact.
          </p>
        </MessPills>
      </section>

      {/* What Wirl gives you instead */}
      <section className={`${wrap} pb-16 md:pb-24 text-center`}>
        <h2 className="display text-3xl md:text-[2.75rem] leading-[1.08]">What Wirl gives you instead.</h2>
        <p className="mt-4 text-[15px] md:text-base text-dim max-w-[54ch] mx-auto leading-relaxed">
          Every app your team ships, in one list, behind one login. Every open, export, deploy, and denied request, written down.
        </p>
        <div className="mt-10 rounded-3xl bg-panel p-3 md:p-8 text-left">
          <ProductWindow />
        </div>
      </section>

      {/* Guarantees */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <div className="text-center">
          <h2 className="display text-3xl md:text-[2.75rem] leading-[1.08] max-w-[22ch] mx-auto text-balance">
            Auth, permissions, and logging, handled once for every app.
          </h2>
          <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[58ch] mx-auto">
            A tool built anywhere else needs someone to wire up a login, decide who can see it, and remember to log what happens inside. Most never get any of that. On Wirl those three things belong to the workspace, not to the app. A new tool doesn&apos;t bring its own, it gets the workspace&apos;s, so there is nothing to add and nothing to forget. That is why the safe way is also the fast way.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {guarantees.map(({ term, body, Picture }) => (
            <div key={term} className="rounded-3xl bg-panel p-8 md:p-10">
              <div className="py-4"><Picture /></div>
              <h3 className="mt-6 text-xl font-bold tracking-tight">{term}</h3>
              <p className="mt-2 text-[15px] text-dim leading-relaxed max-w-[48ch]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className={`${wrap} pb-16 md:pb-24 scroll-mt-8`}>
        <h2 className="display text-3xl md:text-[2.75rem] leading-[1.08] text-center">How it works.</h2>
        <ol className="mt-12 grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-3xl bg-panel p-8">
              <div className="w-7 h-7 rounded-full bg-white border border-rule text-[12px] font-bold inline-flex items-center justify-center">{i + 1}</div>
              <h3 className="mt-4 text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[15px] text-dim leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-4 rounded-3xl bg-ink text-white p-6 md:p-8 font-mono text-[13px] leading-relaxed overflow-x-auto">
          <pre>
            <span className="text-white/50">$</span>{' claude mcp add --transport http wirl https://app.wirl.dev/mcp'}{'\n\n'}
            <span className="text-white/50">{'> '}</span>
            <span className="italic">Build a supplier payments tool for finance and deploy it</span>{'\n\n'}
            <span className="text-tape">{'  created'}</span>{'   supplier-payments'}{'\n'}
            <span className="text-tape">{'  login'}</span>{'     harbor.co'}{'\n'}
            <span className="text-tape">{'  access'}</span>{'    Finance, Ops'}{'\n'}
            <span className="text-tape">{'  live'}</span>{'      supplier-payments.harbor.wirl.app'}
          </pre>
        </div>
      </section>

      {/* Three situations */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <div className="grid md:grid-cols-3 gap-8 border-t border-rule pt-12">
          {situations.map((p) => (
            <div key={p.title}>
              <h3 className="display text-2xl leading-tight">{p.title}</h3>
              <p className="mt-3 text-[15px] text-dim leading-relaxed">{p.body}</p>
            </div>
          ))}
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
