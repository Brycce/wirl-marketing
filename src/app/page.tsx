import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-semibold">wirl</div>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">Features</a>
            <Link href="/docs" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Docs</Link>
            <a href="https://github.com/Brycce/wirl" className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">GitHub</a>
            <a
              href="https://wirl.vercel.app/signup"
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Now in public beta
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            Email sequences
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text">
              that write themselves
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Track events from your backend, trigger automated email sequences.
            One line of code. No complex workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="https://wirl.vercel.app/signup"
              className="bg-gray-900 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-gray-800 transition-colors"
            >
              Start for free
            </a>
            <Link
              href="/docs"
              className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-base font-medium hover:bg-gray-50 transition-colors"
            >
              Documentation
            </Link>
          </div>

          {/* Install Command */}
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                <span className="text-xs text-gray-500 ml-2 font-mono">terminal</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <span className="text-gray-500">$</span>{' '}
                <span className="text-gray-300">npm install</span>{' '}
                <span className="text-violet-400">wirl</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              <span className="text-xs text-gray-500 ml-4 font-mono">signup.ts</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <div className="text-gray-500">// When a user signs up to your app</div>
              <div className="mt-4">
                <span className="text-violet-400">await</span>{' '}
                <span className="text-cyan-400">wirl</span>
                <span className="text-white">.track</span>
                <span className="text-gray-400">(</span>
                <span className="text-yellow-400">{'{'}</span>
              </div>
              <div className="pl-4">
                <span className="text-gray-300">email</span>
                <span className="text-gray-500">:</span>{' '}
                <span className="text-emerald-400">&apos;user@example.com&apos;</span>
                <span className="text-gray-500">,</span>
              </div>
              <div className="pl-4">
                <span className="text-gray-300">event</span>
                <span className="text-gray-500">:</span>{' '}
                <span className="text-emerald-400">&apos;user.signup&apos;</span>
              </div>
              <div>
                <span className="text-yellow-400">{'}'}</span>
                <span className="text-gray-400">)</span>
                <span className="text-gray-500">;</span>
              </div>
              <div className="mt-4 text-gray-500">// That&apos;s it. Welcome sequence starts automatically.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 px-6 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-gray-400 mb-8">WORKS WITH YOUR STACK</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            <span className="text-2xl font-semibold text-gray-500">Next.js</span>
            <span className="text-2xl font-semibold text-gray-500">Express</span>
            <span className="text-2xl font-semibold text-gray-500">Remix</span>
            <span className="text-2xl font-semibold text-gray-500">Hono</span>
            <span className="text-2xl font-semibold text-gray-500">Fastify</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Built for developers
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              No visual workflow builders. No learning curve.
              Just code that works.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:border-gray-200 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-violet-500/5 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">Event-driven</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Track events from your backend. When users sign up, upgrade, or take any action — trigger the right sequence.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:border-gray-200 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-500/5 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">TypeScript SDK</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Full TypeScript support with autocomplete. Published on npm. Four methods is all you need.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:border-gray-200 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-pink-500/5 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">Your Resend account</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Bring your own Resend API key. Full control over deliverability, domain, and sender reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How it works</h2>
            <p className="text-gray-500 text-lg">Three steps to automated emails</p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center font-bold text-white">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Track events</h3>
                <p className="text-gray-500 mb-4">
                  Add one line to your signup, purchase, or any user action.
                </p>
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#28c840]"></div>
                  </div>
                  <div className="p-4 font-mono text-sm">
                    <span className="text-violet-400">await</span>{' '}
                    <span className="text-cyan-400">wirl</span>
                    <span className="text-white">.track</span>
                    <span className="text-gray-400">(</span>
                    <span className="text-yellow-400">{'{'}</span>{' '}
                    <span className="text-gray-300">email, event:</span>{' '}
                    <span className="text-emerald-400">&apos;user.signup&apos;</span>{' '}
                    <span className="text-yellow-400">{'}'}</span>
                    <span className="text-gray-400">)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 flex items-center justify-center font-bold text-white">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Create sequences</h3>
                <p className="text-gray-500 mb-4">
                  Build email sequences in the dashboard. Set triggers, delays, and templates.
                </p>
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
                  When <code className="bg-gray-100 px-2 py-1 rounded text-violet-600">user.signup</code> → Send welcome → Wait 2 days → Send tips
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center font-bold text-white">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Emails send automatically</h3>
                <p className="text-gray-500">
                  When users trigger events, sequences run. Personalized emails delivered via Resend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDK */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple SDK</h2>
            <p className="text-gray-500 text-lg">Four methods. That&apos;s all you need.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: 'track()', desc: 'Track an event for a contact', color: 'violet' },
              { name: 'identify()', desc: 'Update contact properties', color: 'fuchsia' },
              { name: 'trigger()', desc: 'Start a sequence manually', color: 'pink' },
              { name: 'exit()', desc: 'Remove from a sequence', color: 'emerald' },
            ].map((method) => (
              <div key={method.name} className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:border-gray-200 transition-colors">
                <code className={`text-${method.color}-600 font-mono font-semibold`}>{method.name}</code>
                <p className="text-gray-500 text-sm mt-2">{method.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/docs" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
              Read full documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple pricing</h2>
            <p className="text-gray-500 text-lg">Free while in beta. Pay only for emails via Resend.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md mx-auto text-center shadow-sm">
            <div className="text-6xl font-bold mb-2">$0</div>
            <div className="text-gray-400 mb-8">Free during beta</div>
            <ul className="text-left space-y-4 mb-8">
              {['Unlimited sequences', 'Unlimited contacts', 'Unlimited events', 'Your Resend account'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://wirl.vercel.app/signup"
              className="block w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Get started free
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to automate?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Set up in 5 minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wirl.vercel.app/signup"
              className="bg-gray-900 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-gray-800 transition-colors"
            >
              Start for free
            </a>
            <a
              href="https://github.com/Brycce/wirl"
              className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-base font-medium hover:bg-gray-50 transition-colors"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xl font-semibold">wirl</div>
            <div className="flex items-center gap-8">
              <Link href="/docs" className="text-gray-400 hover:text-gray-900 transition-colors text-sm">
                Docs
              </Link>
              <a href="https://github.com/Brycce/wirl" className="text-gray-400 hover:text-gray-900 transition-colors text-sm">
                GitHub
              </a>
              <a href="https://www.npmjs.com/package/wirl" className="text-gray-400 hover:text-gray-900 transition-colors text-sm">
                npm
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
