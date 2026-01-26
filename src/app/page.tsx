export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-900">wirl</div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">How it works</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
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
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600">
            Built for developers who ship fast
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
            <a
              href="https://github.com/Brycce/wirl"
              className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-base font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              View on GitHub
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
                <span className="text-gray-500">// That&apos;s it. Welcome sequence starts automatically.</span>
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
                TypeScript SDK. Clean API. No drag-and-drop builders. Define sequences in code or the dashboard.
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Track events</h3>
                <p className="text-gray-600 mb-4">
                  Add one line to your signup, purchase, or any user action.
                </p>
                <div className="bg-gray-950 rounded-xl p-4 font-mono text-sm text-gray-300">
                  await wirl.track({"{"} email, event: &apos;user.signup&apos; {"}"})
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
                  Build email sequences in the dashboard. Set triggers, delays, and conditions.
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

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
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
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited sequences
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited contacts
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited events
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
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
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Ready to automate your emails?
          </h2>
          <p className="text-gray-600 mb-8">
            Set up in 5 minutes. No credit card required.
          </p>
          <a
            href="https://wirl.vercel.app/signup"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Start for free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">
            Built by developers, for developers.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Brycce/wirl" className="text-gray-500 hover:text-gray-700 text-sm">
              GitHub
            </a>
            <a href="https://www.npmjs.com/package/wirl" className="text-gray-500 hover:text-gray-700 text-sm">
              npm
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
