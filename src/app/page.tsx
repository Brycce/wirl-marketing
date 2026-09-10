import Link from 'next/link';
import Wordmark from '@/components/Wordmark';
import Spiral from '@/components/Spiral';
import ProductWindow from '@/components/ProductWindow';
import WaitlistForm from '@/components/WaitlistForm';

const guarantees = [
  {
    term: 'Login by default',
    body: 'Every app opens behind your company sign-in from its first deploy. No one can forget to add auth, because adding auth is not a step.',
  },
  {
    term: 'Team permissions',
    body: 'Define teams once. Every app inherits them and can check them in code. Remove someone in one place and they are out of everything.',
  },
  {
    term: 'Audit log',
    body: 'Who opened which tool, what they looked at, what they changed. The access review becomes a query instead of a week of Slack messages.',
  },
  {
    term: 'One list',
    body: 'Everything your team has shipped, on one screen, with who can reach each one. Not scattered across whichever accounts the builders were logged into.',
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

const h2 = 'font-extrabold tracking-[-0.03em] leading-[1.02] text-balance';

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Hero */}
      <section className="bg-tape text-ink">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-6">
          <Link href="/"><Wordmark size={30} /></Link>
          <div className="flex items-center gap-4 sm:gap-6 text-[15px]">
            <Link href="/docs" className="hidden sm:inline hover:underline underline-offset-4">Docs</Link>
            <a href="https://app.wirl.dev/login" className="hidden sm:inline hover:underline underline-offset-4">Log in</a>
            <a href="#waitlist" className="bg-ink text-tape px-4 py-2 rounded-md font-bold hover:bg-black transition-colors">
              Join the waitlist
            </a>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <h1
              className="font-extrabold tracking-[-0.04em] leading-[0.92] text-balance"
              style={{ fontSize: 'clamp(3.25rem, 7.2vw, 6.75rem)' }}
            >
              One place to ship every internal tool.
            </h1>
            <p className="mt-7 text-xl md:text-2xl leading-snug max-w-[34ch]">
              Wirl hosts the internal apps your team builds, by hand or with agents. Every one launches behind your company login, with team permissions and an audit log.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-snug max-w-[34ch] text-ink/75">
              Let everyone build. Keep track of what exists and who can open it.
            </p>
            <div className="mt-9">
              <WaitlistForm tone="tape" id="waitlist-email-hero" />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Spiral className="w-full max-w-[640px] mx-auto lg:ml-auto" />
          </div>
        </div>
      </section>

      {/* The problem, and the thing itself */}
      <section className="bg-ink text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <h2 className={`lg:col-span-6 text-4xl md:text-5xl ${h2}`}>
              Internal tools are getting built faster than anyone can keep track of them.
            </h2>
            <div className="lg:col-span-6 text-lg md:text-xl text-white/75 leading-relaxed space-y-5 max-w-[52ch]">
              <p>
                Coding agents turned a dashboard or an admin tool into a one-hour job, so people build them. Each one lands wherever the builder was logged in: a personal Vercel account, a Notion page with a shared password, a public URL nobody meant to be public.
              </p>
              <p>
                Nobody has the list. Nobody knows which ones can read customer data. Engineering finds out when something goes wrong, and gets asked to retrofit auth after the fact.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <p className="text-tape font-bold text-lg mb-5">What Wirl gives you instead</p>
            <ProductWindow />
            <p className="mt-5 text-white/60 max-w-[62ch] leading-relaxed">
              Every app your team ships, in one list, behind one login. Every open, export, deploy, and denied request, written down.
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
          <h2 className={`text-4xl md:text-5xl ${h2} max-w-[22ch]`}>
            Auth, permissions, and logging, handled once for every app.
          </h2>
          <dl className="mt-14 divide-y-2 divide-ink border-y-2 border-ink">
            {guarantees.map((g) => (
              <div key={g.term} className="grid md:grid-cols-12 gap-3 md:gap-8 py-8">
                <dt className="md:col-span-4 text-2xl font-extrabold tracking-tight">{g.term}</dt>
                <dd className="md:col-span-7 text-lg text-dim leading-relaxed max-w-[56ch]">{g.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-paper scroll-mt-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
          <h2 className={`text-4xl md:text-5xl ${h2}`}>How it works</h2>
          <ol className="mt-12 grid md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.title}>
                <div className="text-tape bg-ink inline-flex w-9 h-9 items-center justify-center rounded-md font-extrabold text-lg mb-4">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-lg text-dim leading-relaxed max-w-[36ch]">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 rounded-xl bg-ink text-paper p-6 md:p-8 font-mono text-[13.5px] leading-relaxed overflow-x-auto">
            <pre>
              <span className="text-paper/50">$</span>{' claude mcp add --transport http wirl https://app.wirl.dev/mcp'}{'\n\n'}
              <span className="text-paper/50">{'> '}</span>
              <span className="italic">Build a vendor payouts tool for finance and deploy it</span>{'\n\n'}
              <span className="text-tape">{'  created'}</span>{'   vendor-payouts'}{'\n'}
              <span className="text-tape">{'  login'}</span>{'     acme.com'}{'\n'}
              <span className="text-tape">{'  access'}</span>{'    Finance, Ops'}{'\n'}
              <span className="text-tape">{'  live'}</span>{'      vendor-payouts.acme.wirl.app'}
            </pre>
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="bg-paper border-t-2 border-ink">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className={`text-3xl md:text-4xl ${h2}`}>If you run engineering</h2>
            <p className="mt-5 text-lg text-dim leading-relaxed max-w-[46ch]">
              Your team is already shipping internal software. Wirl is a place to let them, where every app inherits your login and your permissions and you can see the whole list. You stop being the person who retrofits auth.
            </p>
          </div>
          <div>
            <h2 className={`text-3xl md:text-4xl ${h2}`}>If you build the tools</h2>
            <p className="mt-5 text-lg text-dim leading-relaxed max-w-[46ch]">
              Point your agent at Wirl and ask for what you need. It comes back deployed, behind the company login, visible to the team you named. No auth to wire up, no one to ask for a server.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section id="waitlist" className="bg-tape text-ink scroll-mt-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-6">
            <h2 className={`text-5xl md:text-6xl ${h2}`}>
              Let everyone build. Keep the list.
            </h2>
            <p className="mt-5 text-xl max-w-[36ch]">
              Wirl is in private beta. Leave your email and we&apos;ll get you in.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <WaitlistForm tone="tape" id="waitlist-email-footer" />
          </div>
        </div>
      </section>

      <footer className="bg-ink text-white/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex items-center justify-between text-sm">
          <span className="text-white"><Wordmark size={20} onDark /></span>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <a href="#waitlist" className="hover:text-white transition-colors">Waitlist</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
