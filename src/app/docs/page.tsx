import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">wirl</Link>
          <div className="flex items-center gap-8">
            <Link href="/docs" className="text-sm text-white font-medium">Docs</Link>
            <a href="https://github.com/Brycce/wirl" className="text-sm text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a
              href="https://wirl.vercel.app/signup"
              className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="w-64 fixed left-0 top-16 bottom-0 border-r border-white/5 p-6 overflow-y-auto hidden lg:block bg-[#0a0a0a]">
          <nav className="space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Getting Started</h3>
              <ul className="space-y-2">
                <li><a href="#installation" className="text-sm text-gray-400 hover:text-white transition-colors">Installation</a></li>
                <li><a href="#quick-start" className="text-sm text-gray-400 hover:text-white transition-colors">Quick Start</a></li>
                <li><a href="#configuration" className="text-sm text-gray-400 hover:text-white transition-colors">Configuration</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">SDK Reference</h3>
              <ul className="space-y-2">
                <li><a href="#track" className="text-sm text-gray-400 hover:text-white transition-colors">track()</a></li>
                <li><a href="#identify" className="text-sm text-gray-400 hover:text-white transition-colors">identify()</a></li>
                <li><a href="#trigger" className="text-sm text-gray-400 hover:text-white transition-colors">trigger()</a></li>
                <li><a href="#exit" className="text-sm text-gray-400 hover:text-white transition-colors">exit()</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">API Reference</h3>
              <ul className="space-y-2">
                <li><a href="#api-events" className="text-sm text-gray-400 hover:text-white transition-colors">Events API</a></li>
                <li><a href="#api-contacts" className="text-sm text-gray-400 hover:text-white transition-colors">Contacts API</a></li>
                <li><a href="#api-sequences" className="text-sm text-gray-400 hover:text-white transition-colors">Sequences API</a></li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 lg:ml-64 p-8 max-w-4xl">
          <div className="max-w-none">
            <h1 className="text-5xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-gray-400 mb-16">
              Learn how to integrate Wirl into your application.
            </p>

            {/* Installation */}
            <section id="installation" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Installation</h2>
              <p className="text-gray-400 mb-6">
                Install the Wirl SDK using your preferred package manager:
              </p>
              <div className="space-y-3">
                {['npm install wirl', 'yarn add wirl', 'pnpm add wirl'].map((cmd) => (
                  <div key={cmd} className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                      <div className="w-2 h-2 rounded-full bg-[#ff5f57]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#febc2e]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#28c840]"></div>
                    </div>
                    <div className="p-4 font-mono text-sm">
                      <span className="text-gray-500">$</span>{' '}
                      <span className="text-gray-300">{cmd}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
              <p className="text-gray-400 mb-6">
                Initialize the SDK with your API key and start tracking events:
              </p>
              <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden mb-6">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#1a1a1a]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                  <span className="text-xs text-gray-500 ml-4 font-mono">app.ts</span>
                </div>
                <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">
{`import Wirl from 'wirl';

const wirl = new Wirl({
  apiKey: 'sk_live_your_api_key',
});

// Track a signup event
await wirl.track({
  email: 'user@example.com',
  event: 'user.signup',
  properties: {
    plan: 'pro',
    source: 'landing-page'
  }
});`}
                </pre>
              </div>
              <p className="text-gray-400">
                Get your API key from the{' '}
                <a href="https://wirl.vercel.app/dashboard/settings" className="text-cyan-400 hover:underline">
                  Settings page
                </a>{' '}
                in your dashboard.
              </p>
            </section>

            {/* Configuration */}
            <section id="configuration" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Configuration</h2>
              <p className="text-gray-400 mb-6">
                The Wirl constructor accepts the following options:
              </p>
              <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left p-4 font-semibold text-white">Option</th>
                      <th className="text-left p-4 font-semibold text-white">Type</th>
                      <th className="text-left p-4 font-semibold text-white">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-mono text-cyan-400">apiKey</td>
                      <td className="p-4 text-gray-400">string</td>
                      <td className="p-4 text-gray-400">Required. Your Wirl API key.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-cyan-400">baseUrl</td>
                      <td className="p-4 text-gray-400">string</td>
                      <td className="p-4 text-gray-400">Optional. API base URL. Defaults to production.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* track() */}
            <section id="track" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">
                <code className="text-cyan-400">track()</code>
              </h2>
              <p className="text-gray-400 mb-6">
                Track an event for a contact. If the contact doesn&apos;t exist, it will be created automatically.
                This is the primary method for triggering email sequences.
              </p>
              <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden mb-6">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#1a1a1a]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">
{`await wirl.track({
  email: 'user@example.com',      // Required
  event: 'user.signup',           // Required
  properties: {                   // Optional
    plan: 'pro',
    company: 'Acme Inc'
  }
});`}
                </pre>
              </div>
              <h4 className="font-semibold mb-4">Parameters</h4>
              <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-mono text-cyan-400">email</td>
                      <td className="p-4 text-gray-400">Contact&apos;s email address</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-mono text-cyan-400">event</td>
                      <td className="p-4 text-gray-400">Event name (e.g., &quot;user.signup&quot;, &quot;order.completed&quot;)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-cyan-400">properties</td>
                      <td className="p-4 text-gray-400">Optional object with additional data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* identify() */}
            <section id="identify" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">
                <code className="text-violet-400">identify()</code>
              </h2>
              <p className="text-gray-400 mb-6">
                Update a contact&apos;s properties without tracking an event. Useful for enriching contact data.
              </p>
              <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#1a1a1a]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">
{`await wirl.identify({
  email: 'user@example.com',
  properties: {
    name: 'Jane Smith',
    company: 'Acme Inc',
    role: 'Developer'
  }
});`}
                </pre>
              </div>
            </section>

            {/* trigger() */}
            <section id="trigger" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">
                <code className="text-fuchsia-400">trigger()</code>
              </h2>
              <p className="text-gray-400 mb-6">
                Manually enroll a contact in a specific sequence. Use this when you want to start a sequence
                without tracking an event.
              </p>
              <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#1a1a1a]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">
{`await wirl.trigger({
  email: 'user@example.com',
  sequence: 'onboarding'  // Sequence name or ID
});`}
                </pre>
              </div>
            </section>

            {/* exit() */}
            <section id="exit" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">
                <code className="text-emerald-400">exit()</code>
              </h2>
              <p className="text-gray-400 mb-6">
                Remove a contact from a sequence early. Useful when a user takes an action that should
                stop the sequence (e.g., they upgraded, so stop the upgrade reminder emails).
              </p>
              <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#1a1a1a]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">
{`await wirl.exit({
  email: 'user@example.com',
  sequence: 'trial-reminder'
});`}
                </pre>
              </div>
            </section>

            {/* API Events */}
            <section id="api-events" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Events API</h2>
              <p className="text-gray-400 mb-6">
                If you prefer to use the REST API directly instead of the SDK:
              </p>
              <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#1a1a1a]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                  <span className="text-xs text-gray-500 ml-4 font-mono">HTTP</span>
                </div>
                <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">
{`POST https://wirl.vercel.app/api/v1/events

Headers:
  Authorization: Bearer sk_live_your_api_key
  Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "event": "user.signup",
  "properties": {
    "plan": "pro"
  }
}`}
                </pre>
              </div>
            </section>

            {/* API Contacts */}
            <section id="api-contacts" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Contacts API</h2>
              <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#1a1a1a]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                  <span className="text-xs text-gray-500 ml-4 font-mono">HTTP</span>
                </div>
                <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">
{`# Get a contact
GET https://wirl.vercel.app/api/v1/contacts/:id

# Update a contact
PATCH https://wirl.vercel.app/api/v1/contacts/:id
Body: { "properties": { "name": "Jane" } }`}
                </pre>
              </div>
            </section>

            {/* API Sequences */}
            <section id="api-sequences" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Sequences API</h2>
              <div className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#1a1a1a]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                  <span className="text-xs text-gray-500 ml-4 font-mono">HTTP</span>
                </div>
                <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">
{`# List sequences
GET https://wirl.vercel.app/api/v1/sequences

# Create a sequence
POST https://wirl.vercel.app/api/v1/sequences
Body: {
  "name": "Welcome Sequence",
  "trigger_event": "user.signup",
  "status": "active",
  "steps": [
    { "type": "send", "template_id": "..." },
    { "type": "wait", "duration": 2, "unit": "days" },
    { "type": "send", "template_id": "..." }
  ]
}`}
                </pre>
              </div>
            </section>

            {/* Need Help */}
            <section className="bg-[#161616] border border-white/5 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold mb-2">Need help?</h2>
              <p className="text-gray-400 mb-6">
                Check out the source code or open an issue on GitHub.
              </p>
              <a
                href="https://github.com/Brycce/wirl"
                className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                View on GitHub
              </a>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
