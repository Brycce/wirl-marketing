import Link from 'next/link';
import Image from 'next/image';
import CodeBlock from '@/components/CodeBlock';
import WaitlistForm from '@/components/WaitlistForm';

const capabilities = [
  {
    title: 'Nothing ships public',
    body: 'Every app launches behind your company login. There is no step where someone forgets to add auth, because adding auth is not a step.',
  },
  {
    title: 'Permissions set once',
    body: 'Define roles at the workspace level. Every app inherits them, and checks them in code against the signed-in user. Revoke access in one place and it is gone everywhere.',
  },
  {
    title: 'A record of everything',
    body: 'Who opened which tool, what they queried, what changed. Answer the access review without asking eight people to check their accounts.',
  },
  {
    title: 'One place they all live',
    body: 'Internal tools deploy to Wirl instead of to whichever account the builder happened to be logged into. You can see the whole surface at once.',
  },
];

const steps = [
  {
    title: 'Point your agent at Wirl',
    body: 'One command connects Wirl as an MCP server. Claude Code, Cursor, or anything else that speaks MCP.',
  },
  {
    title: 'It builds and deploys',
    body: 'The agent writes the tool, creates the app, and ships it to a URL. It does not need you to provision anything first.',
  },
  {
    title: 'Governance is already there',
    body: 'Auth, roles, and audit logging come from the workspace. The agent picks which team can see the tool. It cannot pick nobody.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="wirl" width={28} height={28} />
          <span className="font-semibold text-gray-900">wirl.dev</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">docs</Link>
          <a href="https://app.wirl.dev/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">login</a>
          <a
            href="#waitlist"
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Join the waitlist
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center pt-24 pb-16 px-4">
        <div className="flex flex-col items-center gap-2 mb-8">
          <Image src="/logo.png" alt="wirl" width={36} height={36} />
          <span className="text-sm font-medium text-gray-900">wirl.dev</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
          Ship the internal tools your agents build.
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Wirl is where coding agents deploy internal software.
          <br />
          Auth, roles, and audit logs come with it.
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="bg-gray-900 text-white text-sm px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Join the waitlist
          </a>
          <a
            href="#how-it-works"
            className="border border-gray-300 text-gray-700 text-sm px-6 py-3 rounded-full font-medium hover:border-gray-400 transition-colors"
          >
            How it works
          </a>
        </div>
      </section>

      {/* Agent block */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <CodeBlock code="claude mcp add --transport http wirl https://app.wirl.dev/mcp" filename="terminal">
          <pre className="text-sm font-mono leading-relaxed overflow-x-auto">
            <span className="text-gray-400">$</span>
            <span className="text-gray-100">{' claude mcp add --transport http wirl https://app.wirl.dev/mcp'}</span>{'\n\n'}
            <span className="text-gray-400">{'> '}</span>
            <span className="text-gray-100 italic">{'"Build a refunds tool for the support team and deploy it"'}</span>{'\n\n'}
            <span className="text-green-400">{'  ✓'}</span>
            <span className="text-gray-300">{' created app '}</span>
            <span className="text-amber-300">refunds-admin</span>{'\n'}
            <span className="text-green-400">{'  ✓'}</span>
            <span className="text-gray-300">{' auth: acme.com company login'}</span>{'\n'}
            <span className="text-green-400">{'  ✓'}</span>
            <span className="text-gray-300">{' access: '}</span>
            <span className="text-amber-300">Support</span>
            <span className="text-gray-300">, </span>
            <span className="text-amber-300">Finance</span>{'\n'}
            <span className="text-green-400">{'  ✓'}</span>
            <span className="text-gray-300">{' live at '}</span>
            <span className="text-blue-400">refunds-admin.acme.wirl.app</span>
          </pre>
        </CodeBlock>
        <p className="text-sm text-gray-500 text-center mt-6 max-w-lg mx-auto leading-relaxed">
          The agent provisions the app, its login, and who can reach it. You approve the result instead of building it.
        </p>
      </section>

      {/* The problem */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Your team is already shipping this software.
        </h2>
        <div className="text-gray-500 leading-relaxed space-y-4 max-w-2xl mx-auto text-center">
          <p>
            Someone in ops has a dashboard on their personal Vercel account. Finance has a tool behind a
            shared password in a Notion page. Nobody is certain which of them can read customer data.
          </p>
          <p>
            Agents made building internal tools nearly free, so people build them. The part that did not
            get cheaper is knowing what exists and who can see it.
          </p>
        </div>
      </section>

      {/* Governance */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Governance is the feature
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
          Configure it once for the workspace. Every app your team ships inherits it.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {capabilities.map((item) => (
            <div key={item.title} className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-3xl mx-auto px-4 py-16 scroll-mt-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          How it works
        </h2>
        <div className="space-y-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="text-center py-24 px-4 scroll-mt-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Set your builders loose.
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Wirl is in private beta. Leave your email and we&apos;ll get you in.
        </p>
        <WaitlistForm />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>wirl.dev</span>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-gray-600 transition-colors">docs</Link>
            <a href="#waitlist" className="hover:text-gray-600 transition-colors">waitlist</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
