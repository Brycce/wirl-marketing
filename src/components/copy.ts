// Every word on the home page, in one place. Structure lives in page.tsx.
export type Copy = {
  nav_cta: string;
  hero_h1: string;
  hero_p: string;
  hero_tag: string;
  connect_after: string;
  mess_h2: string;
  mess_p: string;
  mess_tiles: [string, string, string, string];
  wirl_h2: string;
  wirl_p: string;
  chips: string[];
  agents_h2: string;
  agents_p: string;
  agent_notes: { name: string; note: string }[];
  builtin_h2: string;
  builtin_cards: { title: string; body: string }[];
  share_h2: string;
  share_p: string;
  admin_h2: string;
  admin_p: string;
  faq: { q: string; a: string }[];
  closing_h2: string;
  closing_p: string;
};

export const copy: Copy = {
  nav_cta: 'Connect your agent',
  hero_h1: 'Ship internal tools to a link only your company can open.',
  hero_p: 'Your people vibe-code an app and tell the agent to deploy. It gets a link like harbor--supplier-payments.wirl.run that anyone at your company can open with their work Google account. Nobody else, by default.',
  hero_tag: '',
  connect_after: 'Install once, then ask the agent to deploy. The first time, approve it in the browser. No agent yet? Join the waitlist.',
  mess_h2: 'Where those apps live today.',
  mess_p: 'Wherever the builder could get a URL. Nobody has the list, or knows which of them can read customer data.',
  mess_tiles: ["Someone's personal Vercel", "The intern's laptop", 'A PR waiting on an engineer', 'Public by accident'],
  wirl_h2: 'Point the agent at Wirl instead.',
  wirl_p: 'The builder picks who can open each app: the whole company, named people, or the public. The app declares its connections (Stripe, Postgres, Drive), and every call through them is logged, by host.',
  chips: ['Google sign-in required', 'Company-only by default', 'Keys never in code', 'Audit log on', 'Every version recorded'],
  agents_h2: 'Bring your own coding agent.',
  agents_p: 'Wirl is an MCP server. Any agent your people already use can deploy to it.',
  agent_notes: [
    { name: 'Claude Code', note: 'One command, shown above.' },
    { name: 'Codex', note: 'Three lines in config.toml.' },
    { name: 'Cursor', note: 'mcp.json, or one click.' },
    { name: 'Anything with MCP', note: 'Same server, any client.' },
    { name: 'No MCP needed', note: 'npx wirl skill writes a skill file.' },
  ],
  builtin_h2: "What you don't have to build.",
  builtin_cards: [
    { title: 'No invites', body: 'One work Google sign-in and your whole company is in. The first person creates its space.' },
    { title: 'Same thing on your laptop', body: "npx wirl dev: production's database shape, identity headers, and API broker." },
    { title: 'Keys skip the agent', body: "A person types each key into their own browser, straight into Wirl's vault." },
    { title: 'Bad deploys undo themselves', body: 'Fails in its first half hour? Back to the last healthy version, and the log says so.' },
  ],
  share_h2: 'Share the link or the code.',
  share_p: 'Anyone who can open an app can pull its source, change it, and ship it again.',
  admin_h2: 'Admins get the complete view.',
  admin_p: "Every internal app that's running, who built it, what data it's accessing, and who can open it. Plus a log of what each one did.",
  faq: [
    { q: 'What is Wirl?', a: "A place to host the internal tools your people build, behind your company's Google sign-in by default." },
    { q: 'Does it work with AI coding agents?', a: 'Yes. Claude Code, Codex, Cursor, anything that speaks MCP.' },
    { q: 'Who can open an app?', a: 'Everyone at your company, unless the builder narrows it to named people or makes it public.' },
    { q: 'What does the log record?', a: 'Who deployed, shared, opened, was refused, changed a key, or was removed, and what each app called, by host. Never request contents, never a key.' },
    { q: 'Is it a Vercel replacement?', a: 'For internal tools, yes. Vercel is still for the site you show the world.' },
    { q: 'When can I use it?', a: 'Private beta now. Connect your agent and deploy something, or leave your email.' },
  ],
  closing_h2: 'Let your people build.',
  closing_p: "Private beta. Leave your email and we'll get you in.",
};
