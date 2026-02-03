import Link from 'next/link';
import Image from 'next/image';
import CodeBlock from '@/components/CodeBlock';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="wirl" width={28} height={28} />
            <span className="font-semibold text-gray-900">wirl.dev</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-sm text-gray-900 font-medium">docs</Link>
            <a href="https://app.wirl.dev/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">login</a>
            <a
              href="https://app.wirl.dev/signup"
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Start for free
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="w-64 fixed left-0 top-16 bottom-0 border-r border-gray-100 p-6 overflow-y-auto hidden lg:block bg-white">
          <nav className="space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Getting Started</h3>
              <ul className="space-y-2">
                <li><a href="#installation" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Installation</a></li>
                <li><a href="#quick-start" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Quick Start</a></li>
                <li><a href="#configuration" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Configuration</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">SDK Reference</h3>
              <ul className="space-y-2">
                <li><a href="#track" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">track()</a></li>
                <li><a href="#identify" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">identify()</a></li>
                <li><a href="#trigger" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">trigger()</a></li>
                <li><a href="#exit" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">exit()</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">API Reference</h3>
              <ul className="space-y-2">
                <li><a href="#api-events" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Events API</a></li>
                <li><a href="#api-contacts" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contacts API</a></li>
                <li><a href="#api-properties" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Properties API</a></li>
                <li><a href="#api-templates" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Templates API</a></li>
                <li><a href="#api-sequences" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Sequences API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">MCP Integration</h3>
              <ul className="space-y-2">
                <li><a href="#mcp-setup" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Setup</a></li>
                <li><a href="#mcp-auth" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Authentication</a></li>
                <li><a href="#mcp-tools" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Available Tools</a></li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 lg:ml-64 p-8 max-w-4xl">
          <div className="max-w-none">
            <h1 className="text-5xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-gray-500 mb-16">
              Learn how to integrate Wirl into your application.
            </p>

            {/* Installation */}
            <section id="installation" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Installation</h2>
              <p className="text-gray-500 mb-6">
                Install the Wirl SDK using your preferred package manager:
              </p>
              <div className="space-y-3">
                <CodeBlock code="npm install wirl" />
                <CodeBlock code="yarn add wirl" />
                <CodeBlock code="pnpm add wirl" />
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
              <p className="text-gray-500 mb-6">
                Initialize the SDK with your API key and start tracking events:
              </p>
              <CodeBlock code={`import Wirl from 'wirl';

const wirl = new Wirl({
  apiKey: 'sk_live_your_api_key',
});

await wirl.track({
  email: 'user@example.com',
  event: 'user.signup',
  properties: {
    plan: 'pro',
    source: 'landing-page'
  }
});`} filename="app.ts" />
              <p className="text-gray-500 mt-6">
                Get your API key from the{' '}
                <a href="https://app.wirl.dev/dashboard/settings" className="text-violet-600 hover:underline">
                  Settings page
                </a>{' '}
                in your dashboard.
              </p>
            </section>

            {/* Configuration */}
            <section id="configuration" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Configuration</h2>
              <p className="text-gray-500 mb-6">
                The Wirl constructor accepts the following options:
              </p>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 font-semibold text-gray-900">Option</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Type</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-mono text-violet-600">apiKey</td>
                      <td className="p-4 text-gray-500">string</td>
                      <td className="p-4 text-gray-500">Required. Your Wirl API key.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-violet-600">baseUrl</td>
                      <td className="p-4 text-gray-500">string</td>
                      <td className="p-4 text-gray-500">Optional. API base URL. Defaults to production.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* track() */}
            <section id="track" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">
                <code className="text-violet-600">track()</code>
              </h2>
              <p className="text-gray-500 mb-6">
                Track an event for a contact. If the contact doesn&apos;t exist, it will be created automatically.
                This is the primary method for triggering email sequences.
              </p>
              <CodeBlock code={`await wirl.track({
  email: 'user@example.com',      // Required
  event: 'user.signup',           // Required
  properties: {                   // Optional
    plan: 'pro',
    company: 'Acme Inc'
  }
});`} />
              <h4 className="font-semibold mb-4 mt-6">Parameters</h4>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-mono text-violet-600">email</td>
                      <td className="p-4 text-gray-500">Contact&apos;s email address</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-mono text-violet-600">event</td>
                      <td className="p-4 text-gray-500">Event name (e.g., &quot;user.signup&quot;, &quot;order.completed&quot;)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-violet-600">properties</td>
                      <td className="p-4 text-gray-500">Optional object with additional data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* identify() */}
            <section id="identify" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">
                <code className="text-fuchsia-600">identify()</code>
              </h2>
              <p className="text-gray-500 mb-6">
                Update a contact&apos;s properties without tracking an event. Useful for enriching contact data.
              </p>
              <CodeBlock code={`await wirl.identify({
  email: 'user@example.com',
  properties: {
    name: 'Jane Smith',
    company: 'Acme Inc',
    role: 'Developer'
  }
});`} />
            </section>

            {/* trigger() */}
            <section id="trigger" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">
                <code className="text-pink-600">trigger()</code>
              </h2>
              <p className="text-gray-500 mb-6">
                Manually enroll a contact in a specific sequence. Use this when you want to start a sequence
                without tracking an event.
              </p>
              <CodeBlock code={`await wirl.trigger({
  email: 'user@example.com',
  sequence: 'onboarding'  // Sequence name or ID
});`} />
            </section>

            {/* exit() */}
            <section id="exit" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">
                <code className="text-emerald-600">exit()</code>
              </h2>
              <p className="text-gray-500 mb-6">
                Remove a contact from a sequence early. Useful when a user takes an action that should
                stop the sequence (e.g., they upgraded, so stop the upgrade reminder emails).
              </p>
              <CodeBlock code={`await wirl.exit({
  email: 'user@example.com',
  sequence: 'trial-reminder'
});`} />
            </section>

            {/* API Events */}
            <section id="api-events" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Events API</h2>
              <p className="text-gray-500 mb-6">
                If you prefer to use the REST API directly instead of the SDK:
              </p>
              <CodeBlock code={`POST https://app.wirl.dev/api/v1/events

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
}`} filename="HTTP" />
            </section>

            {/* API Contacts */}
            <section id="api-contacts" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Contacts API</h2>
              <CodeBlock code={`GET https://app.wirl.dev/api/v1/contacts/:id

PATCH https://app.wirl.dev/api/v1/contacts/:id
Body: { "properties": { "name": "Jane" } }`} filename="HTTP" />
            </section>

            {/* API Properties */}
            <section id="api-properties" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Contact Properties API</h2>
              <p className="text-gray-500 mb-6">
                Pre-register contact properties so they appear as template variables in the editor.
                Properties set via <code className="bg-gray-100 px-2 py-1 rounded">identify()</code> or <code className="bg-gray-100 px-2 py-1 rounded">track()</code> are auto-discovered,
                but registering them adds type info and descriptions.
              </p>
              <CodeBlock code={`GET https://app.wirl.dev/api/v1/contacts/properties

POST https://app.wirl.dev/api/v1/contacts/properties
Body: {
  "name": "plan",
  "type": "string",
  "description": "User's plan tier"
}

Supported types: string, number, boolean, date
Use in templates as {{contact.plan}}`} filename="HTTP" />
            </section>

            {/* API Templates */}
            <section id="api-templates" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Templates API</h2>
              <CodeBlock code={`GET https://app.wirl.dev/api/v1/templates

POST https://app.wirl.dev/api/v1/templates
Body: {
  "name": "Welcome Email",
  "subject": "Welcome to {{workspace.name}}!",
  "body_html": "<h1>Welcome!</h1><p>Hi {{contact.name}},</p>"
}

PATCH https://app.wirl.dev/api/v1/templates/:id
Body: { "subject": "New subject line" }

DELETE https://app.wirl.dev/api/v1/templates/:id`} filename="HTTP" />
              <p className="text-gray-500 mt-4 text-sm">
                Use <code className="bg-gray-100 px-2 py-1 rounded">{'{{contact.email}}'}</code>, <code className="bg-gray-100 px-2 py-1 rounded">{'{{contact.name}}'}</code>, <code className="bg-gray-100 px-2 py-1 rounded">{'{{workspace.name}}'}</code>, or any registered property like <code className="bg-gray-100 px-2 py-1 rounded">{'{{contact.plan}}'}</code> as template variables.
              </p>
            </section>

            {/* API Sequences */}
            <section id="api-sequences" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Sequences API</h2>
              <CodeBlock code={`GET https://app.wirl.dev/api/v1/sequences

GET https://app.wirl.dev/api/v1/sequences/:id

POST https://app.wirl.dev/api/v1/sequences
Body: {
  "name": "Welcome Sequence",
  "trigger_event": "user.signup",
  "status": "active",
  "steps": [
    { "type": "send", "template_id": "..." },
    { "type": "wait", "duration": 2, "unit": "days" },
    { "type": "send", "template_id": "..." }
  ]
}

PATCH https://app.wirl.dev/api/v1/sequences/:id
Body: { "status": "paused" }

DELETE https://app.wirl.dev/api/v1/sequences/:id

GET https://app.wirl.dev/api/v1/sequences/:id/stats`} filename="HTTP" />
              <h4 className="font-semibold mt-6 mb-3">Step types</h4>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 font-semibold text-gray-900">Type</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Fields</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-mono text-violet-600">send</td>
                      <td className="p-4 text-gray-500 font-mono text-xs">template_id</td>
                      <td className="p-4 text-gray-500">Send an email using a template</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-violet-600">wait</td>
                      <td className="p-4 text-gray-500 font-mono text-xs">duration, unit</td>
                      <td className="p-4 text-gray-500">Wait before next step. Units: minutes, hours, days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* MCP Setup */}
            <section id="mcp-setup" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">MCP Integration</h2>
              <p className="text-gray-500 mb-6">
                Wirl provides an MCP (Model Context Protocol) server that lets AI assistants like Claude
                manage your email sequences, templates, and contacts directly.
              </p>

              <h3 className="text-lg font-semibold mb-4">Claude Code</h3>
              <p className="text-gray-500 mb-4">Run this command in your terminal:</p>
              <CodeBlock code="claude mcp add --transport http wirl https://app.wirl.dev/mcp" filename="terminal" />

              <h3 className="text-lg font-semibold mb-4 mt-8">Cursor</h3>
              <p className="text-gray-500 mb-4">Add to <code className="bg-gray-100 px-2 py-1 rounded">.cursor/mcp.json</code>:</p>
              <CodeBlock code={`{
  "mcpServers": {
    "wirl": {
      "url": "https://app.wirl.dev/mcp"
    }
  }
}`} filename=".cursor/mcp.json" />
            </section>

            {/* MCP Auth */}
            <section id="mcp-auth" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">MCP Authentication</h2>
              <p className="text-gray-500 mb-6">
                After adding the MCP config, authenticate using the <code className="bg-gray-100 px-2 py-1 rounded">/mcp</code> command:
              </p>
              <CodeBlock code={`claude /mcp
Select "wirl" → "Authenticate"`} filename="terminal" />
              <p className="text-gray-500 mb-4 mt-6">This will:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-500 mb-6">
                <li>Open a browser window</li>
                <li>Log in to your Wirl account</li>
                <li>Grant access to Claude</li>
              </ol>
              <p className="text-gray-500">
                Once authenticated, Claude can manage your sequences, templates, and contacts.
              </p>
            </section>

            {/* MCP Tools */}
            <section id="mcp-tools" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Available MCP Tools</h2>
              <p className="text-gray-500 mb-6">
                Once connected, Claude can use these tools to manage your email automation:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Sequences</h4>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>list_sequences</li>
                    <li>get_sequence</li>
                    <li>create_sequence</li>
                    <li>update_sequence</li>
                    <li>delete_sequence</li>
                    <li>get_sequence_stats</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Templates</h4>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>list_templates</li>
                    <li>get_template</li>
                    <li>create_template</li>
                    <li>update_template</li>
                    <li>delete_template</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Contacts</h4>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>list_contacts</li>
                    <li>get_contact</li>
                    <li>find_contact_by_email</li>
                    <li>update_contact</li>
                    <li>list_properties</li>
                    <li>register_property</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Events</h4>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>track_event</li>
                    <li>list_events</li>
                    <li>trigger_sequence</li>
                    <li>exit_sequence</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-500">
                Example prompts: &quot;Create a welcome sequence triggered by user.signup&quot; or
                &quot;Why isn&apos;t user@example.com receiving emails?&quot;
              </p>
            </section>

            {/* Need Help */}
            <section className="border border-gray-200 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold mb-2">Need help?</h2>
              <p className="text-gray-500 mb-6">
                Get started for free or reach out if you have questions.
              </p>
              <a
                href="https://app.wirl.dev/signup"
                className="inline-block bg-gray-900 text-white text-sm px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Start for free
              </a>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
