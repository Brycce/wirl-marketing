// Every word on the home page, in one place. Structure lives in page.tsx.
export type Copy = {
  nav_cta: string;
  hero_h1: string;
  hero_p: string;
  hero_tag: string;
  connect_after: string;
  mess_h2: string;
  mess_bullets: string[];
  mess_p: string;
  mess_tiles: [string, string, string, string];
  wirl_h2: string;
  wirl_p: string;
  wirl_bullets: string[];
  agents_h2: string;
  agents_p: string;
  agent_notes: { name: string; note: string }[];
  builtin_h2: string;
  builtin_cards: { title: string; body: string }[];
  share_h2: string;
  share_p: string;
  admin_h2: string;
  admin_p: string;
  admin_bullets: string[];
  faq: { q: string; a: string }[];
  closing_h2: string;
  closing_p: string;
};

export const copy: Copy = {
  nav_cta: 'Connect your agent',
  hero_h1: 'Build internal tools with [icons]\nDeploy them behind your company login.',
  hero_p: 'Tell your agent to deploy. Wirl hosts the app at a link only people at your company can open, with the Google account they already have.',
  hero_tag: '',
  connect_after: 'Install once, then ask the agent to deploy. The first time, approve it in the browser. No agent yet? Join the waitlist.',
  mess_h2: 'Right now, internal tools live wherever they can.',
  mess_bullets: [
    'On someone\'s personal Vercel account, with a Stripe key pasted in.',
    'On the intern\'s laptop, until the intern leaves.',
    'In a pull request, waiting for an engineer to find time.',
    'On a public URL that was never meant to be public.',
  ],
  mess_p: 'Nobody has the list, and nobody knows which of them can read customer data.',
  mess_tiles: ["Someone's personal Vercel", "The intern's laptop", 'A PR waiting on an engineer', 'Public by accident'],
  wirl_h2: 'Point the agent at Wirl instead.',
  wirl_p: 'Tell your coding agent to deploy. Wirl does the rest.',
  wirl_bullets: [
    'Sign-in with your company\'s Google account, on every app.',
    'Company-only by default. The builder can narrow it to named people or open it up.',
    'Keys go into a vault, never into the code and never through the agent.',
    'Every call the app makes is logged, by host.',
    'A deploy that fails in its first half hour rolls itself back.',
  ],
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
  admin_p: 'Every internal app on one screen.',
  admin_bullets: [
    'Who built it, and with which agent.',
    'What data it connects to.',
    'Who can open it.',
    'What it did, in the log.',
  ],
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
