import Link from 'next/link';
import Image from 'next/image';
import CopyButton from '@/components/CopyButton';
import CodeBlock from '@/components/CodeBlock';

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
            href="https://app.wirl.dev/signup"
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Start for free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center pt-24 pb-16 px-4">
        <div className="flex flex-col items-center gap-2 mb-8">
          <Image src="/logo.png" alt="wirl" width={36} height={36} />
          <span className="text-sm font-medium text-gray-900">wirl.dev</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Send the right email at the right time.
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Automated sequences for developers who use Resend.
          <br />
          Define once, runs forever.
        </p>

        <div className="flex items-center justify-center gap-4">
          <CopyButton text="npm install wirl" />
          <a
            href="https://app.wirl.dev/signup"
            className="bg-gray-900 text-white text-sm px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Start for free
          </a>
        </div>
      </section>

      {/* Code Example */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <CodeBlock code={`await wirl.track({
  email: 'user@example.com',
  event: 'user.signup'
});`} filename="app.ts">
          <pre className="text-sm font-mono leading-relaxed overflow-x-auto">
            <span className="text-blue-400">await</span>{' '}
            <span className="text-gray-100">wirl.</span>
            <span className="text-green-400">track</span>
            <span className="text-gray-100">{'({'}</span>{'\n'}
            <span className="text-gray-100">{'  email: '}</span>
            <span className="text-amber-300">{`'user@example.com'`}</span>
            <span className="text-gray-100">,</span>{'\n'}
            <span className="text-gray-100">{'  event: '}</span>
            <span className="text-amber-300">{`'user.signup'`}</span>{'\n'}
            <span className="text-gray-100">{'});'}</span>
          </pre>
        </CodeBlock>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Event-driven</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Trigger sequences from user actions. Sign up, upgrade, cancel — each event starts the right email flow.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Built for Resend</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Bring your Resend API key. Wirl handles sequences, timing, and contact management. You keep full control of your sending.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Code-first</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              One SDK function. No drag-and-drop builders. Define sequences in the dashboard or via the API. Works with any stack.
            </p>
          </div>
        </div>
      </section>

      {/* MCP */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Works with Claude Code
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Connect Wirl as an MCP server. Create templates, build sequences, and manage contacts from your terminal.
          </p>
        </div>

        <CodeBlock code="claude mcp add --transport http wirl https://app.wirl.dev/mcp" filename="terminal">
          <pre className="text-sm font-mono leading-relaxed overflow-x-auto">
            <span className="text-gray-400">$</span>
            <span className="text-gray-100">{' claude mcp add --transport http wirl https://app.wirl.dev/mcp'}</span>{'\n\n'}
            <span className="text-gray-400 italic">{'"Create a welcome sequence that sends 3 emails over a week"'}</span>{'\n'}
            <span className="text-gray-400 italic">{'"Show me stats for the onboarding sequence"'}</span>{'\n'}
            <span className="text-gray-400 italic">{'"Add a follow-up template for churned users"'}</span>
          </pre>
        </CodeBlock>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div className="border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">20+</div>
            <div className="text-xs text-gray-500 mt-1">MCP tools</div>
          </div>
          <div className="border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">1 cmd</div>
            <div className="text-xs text-gray-500 mt-1">to connect</div>
          </div>
          <div className="border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">OAuth</div>
            <div className="text-xs text-gray-500 mt-1">browser auth</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          How it works
        </h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">1</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Connect Resend</h3>
              <p className="text-sm text-gray-500">Add your Resend API key. Set your sender email and domain.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">2</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Build sequences</h3>
              <p className="text-sm text-gray-500">Create email templates and arrange them into timed sequences. Trigger on any event you define.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">3</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Track events</h3>
              <p className="text-sm text-gray-500">Call <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">wirl.track()</code> from your app. Contacts are enrolled automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Methods */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Simple SDK
        </h2>
        <p className="text-gray-500 text-center mb-12">Four methods. That&apos;s all you need.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
            <code className="font-mono font-semibold text-gray-900">track()</code>
            <p className="text-gray-500 text-sm mt-2">Track an event for a contact</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
            <code className="font-mono font-semibold text-gray-900">identify()</code>
            <p className="text-gray-500 text-sm mt-2">Update contact properties</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
            <code className="font-mono font-semibold text-gray-900">trigger()</code>
            <p className="text-gray-500 text-sm mt-2">Start a sequence manually</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
            <code className="font-mono font-semibold text-gray-900">exit()</code>
            <p className="text-gray-500 text-sm mt-2">Remove from a sequence</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/docs" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Read full documentation →
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Simple pricing</h2>
        <p className="text-gray-500 mb-8">Free while in beta. Pay only for emails via Resend.</p>
        <div className="border border-gray-200 rounded-2xl p-8">
          <div className="text-5xl font-bold mb-1">$0</div>
          <div className="text-gray-400 text-sm mb-6">Free during beta</div>
          <ul className="text-left space-y-3 mb-8 text-sm text-gray-600">
            {['Unlimited sequences', 'Unlimited contacts', 'Unlimited events', 'Your Resend account'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <a
            href="https://app.wirl.dev/signup"
            className="block w-full bg-gray-900 text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm"
          >
            Get started free
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-24 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Start sending in minutes.
        </h2>
        <p className="text-gray-500 mb-8">Free to start. No credit card required.</p>
        <a
          href="https://app.wirl.dev/signup"
          className="bg-gray-900 text-white text-sm px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Start for free
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>wirl.dev</span>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-gray-600 transition-colors">docs</Link>
            <a href="https://www.npmjs.com/package/wirl" className="hover:text-gray-600 transition-colors">npm</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
