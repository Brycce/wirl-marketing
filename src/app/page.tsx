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
    title: 'Ask your agent, or push the code',
    body: 'One command connects Wirl to Claude Code, Cursor, or anything else that speaks MCP. Or deploy from the dashboard.',
  },
  {
    title: 'Get a URL that already works',
    body: 'It comes back live, behind the company login. No auth to wire up, no server to ask for, no ticket.',
  },
  {
    title: 'Pick who can open it',
    body: 'Choose the teams. That is the whole permissions setup. Everything else was already on.',
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
            Let your people build.
          </h1>
          <p className="mt-6 text-[17px] md:text-lg leading-relaxed max-w-[46ch] mx-auto text-ink/85">
            Wirl is a secure place to run the internal tools your team makes, with agents or by hand. Anyone can ship an app. Every app lands behind your company login, open to the right teams, with a record of what happens inside.
          </p>
          <p className="mt-2 text-[15px] text-dim">
            Fun for the people building. Boring for the people responsible. On purpose.
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
            Your people are already building.
          </h2>
          <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[54ch] mx-auto">
            Ops has a dashboard. Finance has a tool. Support built something on Tuesday with an agent, and it works. This is the best thing to happen to internal tools in a decade. The only problem is where it all lives: personal accounts, shared passwords, links in Slack. Nobody has the list.
          </p>
        </MessPills>
      </section>

      {/* What Wirl is */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <h2 className="display text-3xl md:text-[2.75rem] leading-[1.08] text-center">Give them somewhere to ship.</h2>
        <dl className="mt-10 grid md:grid-cols-3 gap-8 md:gap-10">
          <div>
            <dt className="text-lg font-bold tracking-tight">What it is</dt>
            <dd className="mt-2 text-[15px] text-dim leading-relaxed">
              A secure place to run internal tools. You push an app, or your agent does, and it comes back at a URL behind your company login.
            </dd>
          </div>
          <div>
            <dt className="text-lg font-bold tracking-tight">What you get</dt>
            <dd className="mt-2 text-[15px] text-dim leading-relaxed">
              One list of every internal tool, who can open each one, and a log of everything that happened inside. Login, permissions, and logging on every app, without anyone setting them up.
            </dd>
          </div>
          <div>
            <dt className="text-lg font-bold tracking-tight">How it helps</dt>
            <dd className="mt-2 text-[15px] text-dim leading-relaxed">
              Anyone can ship without asking. Engineering stops retrofitting auth onto things it didn&apos;t build. Security gets the list without chasing anyone. You get to say yes.
            </dd>
          </div>
        </dl>
        <div className="mt-10 rounded-3xl bg-panel p-3 md:p-8">
          <ProductWindow />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className={`${wrap} pb-16 md:pb-24 scroll-mt-8`}>
        <h2 className="display text-3xl md:text-[2.75rem] leading-[1.08] text-center">For the people building.</h2>
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

      {/* Guarantees */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <div className="text-center">
          <h2 className="display text-3xl md:text-[2.75rem] leading-[1.08] max-w-[22ch] mx-auto text-balance">
            For the people who have to say yes.
          </h2>
          <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[58ch] mx-auto">
            Governance on Wirl is infrastructure, not a process. Login, permissions, and logging are properties of the workspace, and every app gets them whether or not the builder thought about it. Nothing to add, nothing to forget, nothing to audit for after the fact. That is what makes it safe to let everyone build.
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
          <h2 className="display text-4xl md:text-5xl leading-[1.05]">Say yes to the builders.</h2>
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
