import Link from 'next/link';
import Wordmark from '@/components/Wordmark';
import PageLine from '@/components/PageLine';
import Whirl from '@/components/Whirl';
import WaitlistForm from '@/components/WaitlistForm';

const guarantees = [
  {
    term: 'Login',
    body: 'Every app opens behind your company sign-in from the first deploy. There is no step where someone forgets to add auth, because adding auth is not a step.',
  },
  {
    term: 'Roles',
    body: 'Define teams once. Every app inherits them and checks them in code against whoever is signed in. Pull someone’s access in one place and it is gone everywhere.',
  },
  {
    term: 'Audit log',
    body: 'Who opened which tool, what they looked at, what they changed. The access review becomes a query instead of a week of Slack messages.',
  },
  {
    term: 'The list',
    body: 'Everything your team has shipped, on one screen, with who can reach it. Not scattered across whichever accounts the builders were logged into.',
  },
];

const steps = [
  {
    title: 'Point your agent at Wirl',
    body: 'One command adds Wirl as an MCP server to Claude Code, Cursor, or anything else that speaks MCP.',
  },
  {
    title: 'It builds and ships',
    body: 'The agent writes the tool, creates the app, picks which teams can see it, and deploys to a URL. Nothing to provision first.',
  },
  {
    title: 'You approve, not build',
    body: 'Login, roles, and logging come from the workspace. The agent chooses who can see the tool. It cannot choose nobody.',
  },
];

const section = 'px-6 md:px-10 md:pl-28 py-20 border-t border-rule md:border-0';
const h2 = 'text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-balance';

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="relative max-w-7xl mx-auto">
        <PageLine />

        <nav className="relative flex items-center justify-between px-6 md:px-10 py-5">
          <Link href="/" className="text-ink" data-line-start>
            <Wordmark size={30} />
          </Link>
          <div className="flex items-center gap-4 sm:gap-6 text-[15px]">
            <Link href="/docs" className="hidden sm:inline text-dim hover:text-ink transition-colors">Docs</Link>
            <a href="https://app.wirl.dev/login" className="hidden sm:inline text-dim hover:text-ink transition-colors">Log in</a>
            <a href="#waitlist" className="bg-ink text-paper px-4 py-2 rounded-md font-semibold hover:bg-cobalt transition-colors">
              Join the waitlist
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative px-6 md:px-10 md:pl-28 pt-12 md:pt-16 pb-16 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-6">
            <h1
              data-loop
              className="text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-[-0.03em] text-balance"
            >
              The tools your agents build, wirled into one place.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-dim max-w-[38ch] leading-snug">
              Wirl is where internal software gets deployed. Behind your login, with roles and an audit log, whoever wrote it.
            </p>
            <div className="mt-8">
              <WaitlistForm />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Whirl />
          </div>
        </section>

        {/* The mess */}
        <section className={`relative ${section} grid md:grid-cols-12 gap-8`}>
          <h2 data-loop className={`md:col-span-5 ${h2}`}>
            The tools exist already. The list of them doesn&apos;t.
          </h2>
          <div className="md:col-span-6 md:col-start-7 text-lg text-dim leading-relaxed space-y-4 max-w-[52ch]">
            <p>
              Ops has a dashboard on someone&apos;s personal Vercel account. Finance has a tool behind a password in a Notion page. Nobody is sure which of them can read customer data.
            </p>
            <p>
              Agents made building internal tools close to free, so people build them. What did not get cheaper is knowing what exists and who can open it.
            </p>
          </div>
        </section>

        {/* Governance */}
        <section className={`relative ${section}`}>
          <h2 data-loop className={`${h2} max-w-[24ch]`}>
            Login, roles, and the audit log belong to the workspace, not the app.
          </h2>
          <dl className="mt-12 divide-y divide-rule border-y border-rule">
            {guarantees.map((g) => (
              <div key={g.term} className="grid md:grid-cols-12 gap-3 md:gap-8 py-7">
                <dt className="md:col-span-3 text-xl font-bold tracking-tight">{g.term}</dt>
                <dd className="md:col-span-7 text-dim leading-relaxed max-w-[58ch]">{g.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* How it works */}
        <section id="how-it-works" className={`relative ${section} scroll-mt-8`}>
          <h2 data-loop className={h2}>How it works</h2>
          <ol className="relative mt-12 grid md:grid-cols-3 gap-10 md:gap-8">
            <svg
              aria-hidden="true"
              className="hidden md:block absolute left-0 right-0 top-[9px] h-6 w-full"
              viewBox="0 0 1200 24"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M8 12 C 200 12, 240 -8, 400 12 S 600 32, 800 12 S 1000 -8, 1192 12"
                stroke="#161616"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength={1}
                vectorEffect="non-scaling-stroke"
                className="draw-line"
              />
            </svg>
            {steps.map((s) => (
              <li key={s.title} className="relative pt-8">
                <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-dim leading-relaxed max-w-[38ch]">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 rounded-lg bg-ink text-paper p-6 md:p-8 font-mono text-[13.5px] leading-relaxed overflow-x-auto">
            <pre>
              <span className="text-paper/50">$</span>{' claude mcp add --transport http wirl https://app.wirl.dev/mcp'}{'\n\n'}
              <span className="text-paper/50">{'> '}</span>
              <span className="italic">Build a vendor payouts tool for finance and ship it</span>{'\n\n'}
              <span className="text-[#98A0FF]">{'  created'}</span>{'   vendor-payouts'}{'\n'}
              <span className="text-[#98A0FF]">{'  login'}</span>{'     acme.com'}{'\n'}
              <span className="text-[#98A0FF]">{'  access'}</span>{'    Finance, Ops'}{'\n'}
              <span className="text-[#98A0FF]">{'  wirled'}</span>{'    vendor-payouts.acme.wirl.app'}
            </pre>
          </div>
        </section>

        {/* Closing */}
        <section id="waitlist" className={`relative ${section} py-24 grid md:grid-cols-12 gap-8 items-end scroll-mt-8`}>
          <div className="md:col-span-6">
            <h2 data-loop className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1] text-balance">
              Everything your team ships, wirled in.
            </h2>
            <p className="mt-4 text-lg text-dim max-w-[36ch]">
              Wirl is in private beta. Leave your email and we&apos;ll get you in.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7" data-line-end>
            <WaitlistForm />
          </div>
        </section>

        <footer className="relative border-t border-rule px-6 md:px-10 py-8 flex items-center justify-between text-sm text-dim">
          <span className="text-ink"><Wordmark size={20} /></span>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-ink transition-colors">Docs</Link>
            <a href="#waitlist" className="hover:text-ink transition-colors">Waitlist</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
