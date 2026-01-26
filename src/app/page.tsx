import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-900">wirl</div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block">Features</a>
            <Link href="/docs" className="text-sm text-gray-600 hover:text-gray-900">Docs</Link>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block">Pricing</a>
            <a
              href="https://wirl.vercel.app/login"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign in
            </a>
            <a
              href="https://wirl.vercel.app/signup"
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600">
            npm install wirl
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold text-gray-900 leading-tight mb-6">
            Email automation
            <br />
            <span className="text-gray-400">in one line of code</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Turn user actions into automated email sequences. Track events from your backend,
            trigger personalized emails. No complex workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wirl.vercel.app/signup"
              className="bg-gray-900 text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-gray-800 transition-colors"
            >
              Start for free
            </a>
            <Link
              href="/docs"
              className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-base font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      {/* Install */}
      <section className="py-8 px-6">
        <div className="max-w-xl mx-auto">
          <div className="bg-gray-950 rounded-xl p-4 flex items-center justify-between">
            <code className="text-gray-300 font-mono">npm install wirl</code>
            <a
              href="https://www.npmjs.com/package/wirl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300 text-sm"
            >
              v0.1.1
            </a>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-950 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-500 text-sm ml-4 font-mono">signup.ts</span>
            </div>
            <pre className="text-sm sm:text-base font-mono overflow-x-auto">
              <code>
                <span className="text-purple-400">import</span>{" "}
                <span className="text-gray-300">Wirl</span>{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-green-400">&apos;wirl&apos;</span>
                <span className="text-gray-500">;</span>
                {"\n\n"}
                <span className="text-purple-400">const</span>{" "}
                <span className="text-blue-400">wirl</span>{" "}
                <span className="text-gray-500">=</span>{" "}
                <span className="text-purple-400">new</span>{" "}
                <span className="text-yellow-400">Wirl</span>
                <span className="text-gray-300">({"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-gray-300">apiKey:</span>{" "}
                <span className="text-green-400">&apos;sk_live_...&apos;</span>
                {"\n"}
                <span className="text-gray-300">{"})"}</span>
                <span className="text-gray-500">;</span>
                {"\n\n"}
                <span className="text-gray-500">// When a user signs up</span>
                {"\n"}
                <span className="text-purple-400">await</span>{" "}
                <span className="text-blue-400">wirl</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-400">track</span>
                <span className="text-gray-300">({"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-gray-300">email:</span>{" "}
                <span className="text-green-400">&apos;user@example.com&apos;</span>
                <span className="text-gray-500">,</span>
                {"\n"}
                {"  "}
                <span className="text-gray-300">event:</span>{" "}
                <span className="text-green-400">&apos;user.signup&apos;</span>
                {"\n"}
                <span className="text-gray-300">{"})"}</span>
                <span className="text-gray-500">;</span>
                {"\n\n"}
                <span className="text-gray-500">// Welcome sequence starts automatically</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Focus on building your product. We handle the email automation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Event-driven</h3>
              <p className="text-gray-600">
                Track events from your backend. When users sign up, upgrade, or take any action - trigger the right sequence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Developer-first</h3>
              <p className="text-gray-600">
                TypeScript SDK on npm. Clean API. No drag-and-drop builders. Define sequences in code or the dashboard.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your email provider</h3>
              <p className="text-gray-600">
                Bring your own Resend account. Full control over deliverability, domain, and sender reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-gray-600">
              Three steps to automated email sequences
            </p>
          </div>

          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Install & track events</h3>
                <p className="text-gray-600 mb-4">
                  Add the SDK to your project and track events when users take actions.
                </p>
                <div className="bg-gray-950 rounded-xl p-4 font-mono text-sm text-gray-300 space-y-2">
                  <div><span className="text-gray-500">$</span> npm install wirl</div>
                  <div className="text-gray-500 mt-2"># Then in your code:</div>
                  <div>await wirl.track({"{"} email, event: &apos;user.signup&apos; {"}"})</div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Create sequences</h3>
                <p className="text-gray-600 mb-4">
                  Build email sequences in the dashboard. Set triggers, delays, and templates.
                </p>
                <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-700">
                  When <code className="bg-white px-2 py-0.5 rounded">user.signup</code> → Send welcome email → Wait 2 days → Send tips email
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Emails send automatically</h3>
                <p className="text-gray-600">
                  When users trigger events, sequences run. Personalized emails delivered via Resend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Methods */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Simple SDK
            </h2>
            <p className="text-gray-600">
              Four methods. That&apos;s all you need.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <code className="text-purple-600 font-mono font-medium">track()</code>
              <p className="text-gray-600 mt-2 text-sm">
                Track an event and associate it with a contact. Creates the contact if they don&apos;t exist.
              </p>
              <pre className="mt-4 text-xs bg-gray-50 p-3 rounded-lg font-mono text-gray-700 overflow-x-auto">
{`await wirl.track({
  email: 'user@example.com',
  event: 'user.signup',
  properties: { plan: 'pro' }
})`}
              </pre>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <code className="text-purple-600 font-mono font-medium">identify()</code>
              <p className="text-gray-600 mt-2 text-sm">
                Update contact properties without tracking an event.
              </p>
              <pre className="mt-4 text-xs bg-gray-50 p-3 rounded-lg font-mono text-gray-700 overflow-x-auto">
{`await wirl.identify({
  email: 'user@example.com',
  properties: { name: 'Jane' }
})`}
              </pre>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <code className="text-purple-600 font-mono font-medium">trigger()</code>
              <p className="text-gray-600 mt-2 text-sm">
                Manually start a specific sequence for a contact.
              </p>
              <pre className="mt-4 text-xs bg-gray-50 p-3 rounded-lg font-mono text-gray-700 overflow-x-auto">
{`await wirl.trigger({
  email: 'user@example.com',
  sequence: 'onboarding'
})`}
              </pre>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <code className="text-purple-600 font-mono font-medium">exit()</code>
              <p className="text-gray-600 mt-2 text-sm">
                Remove a contact from a sequence early.
              </p>
              <pre className="mt-4 text-xs bg-gray-50 p-3 rounded-lg font-mono text-gray-700 overflow-x-auto">
{`await wirl.exit({
  email: 'user@example.com',
  sequence: 'trial-reminder'
})`}
              </pre>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/docs" className="text-gray-900 font-medium hover:underline">
              Read full documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Simple pricing
            </h2>
            <p className="text-gray-600">
              Free while in beta. Pay only for emails via Resend.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md mx-auto text-center">
            <div className="text-5xl font-semibold text-gray-900 mb-2">$0</div>
            <div className="text-gray-500 mb-6">Free during beta</div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited sequences
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited contacts
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited events
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Your Resend account
              </li>
            </ul>
            <a
              href="https://wirl.vercel.app/signup"
              className="block w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Get started free
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Ready to automate your emails?
          </h2>
          <p className="text-gray-600 mb-8">
            Set up in 5 minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wirl.vercel.app/signup"
              className="bg-gray-900 text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-gray-800 transition-colors"
            >
              Start for free
            </a>
            <Link
              href="/docs"
              className="border border-gray-200 bg-white text-gray-700 px-8 py-4 rounded-xl text-base font-medium hover:border-gray-300 transition-colors"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xl font-semibold text-gray-900">wirl</div>
            <div className="flex items-center gap-8">
              <Link href="/docs" className="text-gray-500 hover:text-gray-700 text-sm">
                Documentation
              </Link>
              <a href="https://github.com/Brycce/wirl" className="text-gray-500 hover:text-gray-700 text-sm">
                GitHub
              </a>
              <a href="https://www.npmjs.com/package/wirl" className="text-gray-500 hover:text-gray-700 text-sm">
                npm
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
