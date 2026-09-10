import Link from 'next/link';
import Image from 'next/image';
import Whirl from '@/components/Whirl';
import WaitlistForm from '@/components/WaitlistForm';

const guarantees = [
  {
    term: 'Login',
    body: 'Every app opens behind your company sign-in from the first deploy. There is no step where someone forgets to add auth, because adding auth is not a step.',
  },
  {
    term: 'Roles',
    body: 'Define teams once for the workspace. Every app inherits them and checks them in code against whoever is signed in. Pull someone’s access in one place and it is gone everywhere.',
  },
  {
    term: 'Audit log',
    body: 'Who opened which tool, what they looked at, what they changed. The access review becomes a query instead of a week of Slack messages.',
  },
  {
    term: 'One list',
    body: 'Everything your team has shipped, on one screen, with who can reach it. Not spread across whichever accounts the builders happened to be logged into.',
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

function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-5 max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src="/logo.png" alt="" width={30} height={30} />
        <span className="font-bold text-lg text-ink tracking-tight">wirl</span>
      </Link>
      <div className="flex items-center gap-6 text-[15px]">
        <Link href="/docs" className="text-dim hover:text-ink transition-colors">Docs</Link>
        <a href="https://app.wirl.dev/login" className="text-dim hover:text-ink transition-colors">Log in</a>
        <a
          href="#waitlist"
          className="bg-ink text-paper px-4 py-2 rounded-md font-semibold hover:bg-cobalt transition-colors"
        >
          Join the waitlist
        </a>
      </div>
    </nav>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-16 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        <div className="lg:col-span-6">
          <h1 className="text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-[-0.03em] text-balance">
            The tools your agents build, pulled into one place.
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
      <section className="border-t border-rule">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-12 gap-8">
          <h2 className="md:col-span-5 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-balance">
            Your team is already shipping this software. You just can&apos;t see it.
          </h2>
          <div className="md:col-span-6 md:col-start-7 text-lg text-dim leading-relaxed space-y-4 max-w-[52ch]">
            <p>
              Ops has a dashboard on someone&apos;s personal Vercel account. Finance has a tool behind a password in a Notion page. Nobody is sure which of them can read customer data.
            </p>
            <p>
              Agents made building internal tools close to free, so people build them. What did not get cheaper is knowing what exists and who can open it.
            </p>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="border-t border-rule">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-[22ch] text-balance">
            Set it once for the workspace. Every app inherits it.
          </h2>
          <dl className="mt-12 divide-y divide-rule border-y border-rule">
            {guarantees.map((g) => (
              <div key={g.term} className="grid md:grid-cols-12 gap-3 md:gap-8 py-7">
                <dt className="md:col-span-3 text-xl font-bold tracking-tight">{g.term}</dt>
                <dd className="md:col-span-7 text-dim leading-relaxed max-w-[58ch]">{g.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works: three stops on one line */}
      <section id="how-it-works" className="border-t border-rule scroll-mt-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            How it works
          </h2>
          <ol className="relative mt-12 grid md:grid-cols-3 gap-10 md:gap-8">
            {/* One continuous stroke joining the three steps, like the mark. */}
            <svg
              aria-hidden="true"
              className="hidden md:block absolute left-0 right-0 top-[9px] h-6 w-full"
              viewBox="0 0 1200 24"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M8 12 C 200 12, 240 -8, 400 12 S 600 32, 800 12 S 1000 -8, 1192 12"
                stroke="#2B38F5"
                strokeWidth="2"
                pathLength={1}
                vectorEffect="non-scaling-stroke"
                className="draw-line"
              />
            </svg>
            {steps.map((s) => (
              <li key={s.title} className="relative pt-8">
                <span className="absolute left-0 top-0 block w-5 h-5 rounded-full bg-paper border-2 border-cobalt" />
                <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-dim leading-relaxed max-w-[38ch]">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 rounded-lg bg-ink text-paper p-6 md:p-8 font-mono text-[13.5px] leading-relaxed overflow-x-auto">
            <pre>
              <span className="text-paper/50">$</span>{' claude mcp add --transport http wirl https://app.wirl.dev/mcp'}{'\n\n'}
              <span className="text-paper/50">{'> '}</span>
              <span className="italic">Build a refunds tool for support and ship it</span>{'\n\n'}
              <span className="text-[#98A0FF]">{'  created'}</span>{'   refunds-admin'}{'\n'}
              <span className="text-[#98A0FF]">{'  login'}</span>{'     acme.com'}{'\n'}
              <span className="text-[#98A0FF]">{'  access'}</span>{'    Support, Finance'}{'\n'}
              <span className="text-[#98A0FF]">{'  live'}</span>{'      refunds-admin.acme.wirl.app'}
            </pre>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section id="waitlist" className="border-t border-rule scroll-mt-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-6">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1] text-balance">
              Set your builders loose.
            </h2>
            <p className="mt-4 text-lg text-dim max-w-[36ch]">
              Wirl is in private beta. Leave your email and we&apos;ll get you in.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <WaitlistForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-rule">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex items-center justify-between text-sm text-dim">
          <span className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={18} height={18} />
            wirl.dev
          </span>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-ink transition-colors">Docs</Link>
            <a href="#waitlist" className="hover:text-ink transition-colors">Waitlist</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
