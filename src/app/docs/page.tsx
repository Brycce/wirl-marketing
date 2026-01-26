import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-gray-900">wirl</Link>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-sm text-gray-900 font-medium">Docs</Link>
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

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="w-64 fixed left-0 top-16 bottom-0 border-r border-gray-100 p-6 overflow-y-auto hidden lg:block">
          <nav className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Getting Started</h3>
              <ul className="space-y-2">
                <li><a href="#installation" className="text-sm text-gray-600 hover:text-gray-900">Installation</a></li>
                <li><a href="#quick-start" className="text-sm text-gray-600 hover:text-gray-900">Quick Start</a></li>
                <li><a href="#configuration" className="text-sm text-gray-600 hover:text-gray-900">Configuration</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">SDK Reference</h3>
              <ul className="space-y-2">
                <li><a href="#track" className="text-sm text-gray-600 hover:text-gray-900">track()</a></li>
                <li><a href="#identify" className="text-sm text-gray-600 hover:text-gray-900">identify()</a></li>
                <li><a href="#trigger" className="text-sm text-gray-600 hover:text-gray-900">trigger()</a></li>
                <li><a href="#exit" className="text-sm text-gray-600 hover:text-gray-900">exit()</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">API Reference</h3>
              <ul className="space-y-2">
                <li><a href="#api-events" className="text-sm text-gray-600 hover:text-gray-900">Events API</a></li>
                <li><a href="#api-contacts" className="text-sm text-gray-600 hover:text-gray-900">Contacts API</a></li>
                <li><a href="#api-sequences" className="text-sm text-gray-600 hover:text-gray-900">Sequences API</a></li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 lg:ml-64 p-8 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">Documentation</h1>
            <p className="text-xl text-gray-600 mb-12">
              Learn how to integrate Wirl into your application.
            </p>

            {/* Installation */}
            <section id="installation" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Installation</h2>
              <p className="text-gray-600 mb-4">
                Install the Wirl SDK using npm, yarn, or pnpm:
              </p>
              <div className="bg-gray-950 rounded-xl p-4 font-mono text-sm text-gray-300 mb-4">
                npm install wirl
              </div>
              <div className="bg-gray-950 rounded-xl p-4 font-mono text-sm text-gray-300 mb-4">
                yarn add wirl
              </div>
              <div className="bg-gray-950 rounded-xl p-4 font-mono text-sm text-gray-300">
                pnpm add wirl
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Start</h2>
              <p className="text-gray-600 mb-4">
                Initialize the SDK with your API key and start tracking events:
              </p>
              <div className="bg-gray-950 rounded-xl p-6 font-mono text-sm overflow-x-auto mb-6">
                <pre className="text-gray-300">
{`import Wirl from 'wirl';

const wirl = new Wirl({
  apiKey: 'sk_live_your_api_key',
  // baseUrl: 'https://wirl.vercel.app' // optional, defaults to production
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
              <p className="text-gray-600">
                Get your API key from the <a href="https://wirl.vercel.app/dashboard/settings" className="text-gray-900 underline">Settings page</a> in your dashboard.
              </p>
            </section>

            {/* Configuration */}
            <section id="configuration" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Configuration</h2>
              <p className="text-gray-600 mb-4">
                The Wirl constructor accepts the following options:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-semibold text-gray-900">Option</th>
                      <th className="text-left py-2 font-semibold text-gray-900">Type</th>
                      <th className="text-left py-2 font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 font-mono text-purple-600">apiKey</td>
                      <td className="py-3 text-gray-600">string</td>
                      <td className="py-3 text-gray-600">Required. Your Wirl API key.</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-purple-600">baseUrl</td>
                      <td className="py-3 text-gray-600">string</td>
                      <td className="py-3 text-gray-600">Optional. API base URL. Defaults to production.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* track() */}
            <section id="track" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">track()</h2>
              <p className="text-gray-600 mb-4">
                Track an event for a contact. If the contact doesn&apos;t exist, it will be created automatically.
                This is the primary method for triggering email sequences.
              </p>
              <div className="bg-gray-950 rounded-xl p-6 font-mono text-sm overflow-x-auto mb-6">
                <pre className="text-gray-300">
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
              <h4 className="font-semibold text-gray-900 mb-2">Parameters</h4>
              <div className="bg-gray-50 rounded-xl p-6">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 font-mono text-purple-600">email</td>
                      <td className="py-3 text-gray-600">Contact&apos;s email address</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 font-mono text-purple-600">event</td>
                      <td className="py-3 text-gray-600">Event name (e.g., &quot;user.signup&quot;, &quot;order.completed&quot;)</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-purple-600">properties</td>
                      <td className="py-3 text-gray-600">Optional object with additional data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* identify() */}
            <section id="identify" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">identify()</h2>
              <p className="text-gray-600 mb-4">
                Update a contact&apos;s properties without tracking an event. Useful for enriching contact data.
              </p>
              <div className="bg-gray-950 rounded-xl p-6 font-mono text-sm overflow-x-auto mb-6">
                <pre className="text-gray-300">
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
            <section id="trigger" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">trigger()</h2>
              <p className="text-gray-600 mb-4">
                Manually enroll a contact in a specific sequence. Use this when you want to start a sequence
                without tracking an event.
              </p>
              <div className="bg-gray-950 rounded-xl p-6 font-mono text-sm overflow-x-auto mb-6">
                <pre className="text-gray-300">
{`await wirl.trigger({
  email: 'user@example.com',
  sequence: 'onboarding'  // Sequence name or ID
});`}
                </pre>
              </div>
            </section>

            {/* exit() */}
            <section id="exit" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">exit()</h2>
              <p className="text-gray-600 mb-4">
                Remove a contact from a sequence early. Useful when a user takes an action that should
                stop the sequence (e.g., they upgraded, so stop the upgrade reminder emails).
              </p>
              <div className="bg-gray-950 rounded-xl p-6 font-mono text-sm overflow-x-auto mb-6">
                <pre className="text-gray-300">
{`await wirl.exit({
  email: 'user@example.com',
  sequence: 'trial-reminder'
});`}
                </pre>
              </div>
            </section>

            {/* API Events */}
            <section id="api-events" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Events API</h2>
              <p className="text-gray-600 mb-4">
                If you prefer to use the REST API directly instead of the SDK:
              </p>
              <div className="bg-gray-950 rounded-xl p-6 font-mono text-sm overflow-x-auto mb-6">
                <pre className="text-gray-300">
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
            <section id="api-contacts" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacts API</h2>
              <div className="bg-gray-950 rounded-xl p-6 font-mono text-sm overflow-x-auto mb-6">
                <pre className="text-gray-300">
{`# Get a contact
GET https://wirl.vercel.app/api/v1/contacts/:id

# Update a contact
PATCH https://wirl.vercel.app/api/v1/contacts/:id
Body: { "properties": { "name": "Jane" } }`}
                </pre>
              </div>
            </section>

            {/* API Sequences */}
            <section id="api-sequences" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sequences API</h2>
              <div className="bg-gray-950 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-gray-300">
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
            <section className="bg-gray-50 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Need help?</h2>
              <p className="text-gray-600 mb-4">
                Check out the source code or open an issue on GitHub.
              </p>
              <a
                href="https://github.com/Brycce/wirl"
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
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
