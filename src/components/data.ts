// A fictional company, harbor.co, and its internal tools. None of these are anyone else's examples.
export const COMPANY = 'harbor.co';

export const TOOLS: [string, string][] = [
  ['customer-credits', 'Support'], ['trial-extensions', 'Growth'], ['budget-lines', 'Finance'],
  ['supplier-payments', 'Finance'], ['incident-handover', 'Engineering'], ['candidate-pipeline', 'People'],
  ['warehouse-counts', 'Ops'], ['nda-lookup', 'Legal'], ['territory-map', 'Sales'],
  ['uptime-board', 'Engineering'], ['fx-rates', 'Finance'], ['shift-roster', 'Ops'],
  ['spend-requests', 'Finance'], ['desk-booking', 'People'], ['quote-builder', 'Sales'],
];

export const TEAMS: [string, string[]][] = [
  ['Finance', ['supplier-payments', 'budget-lines', 'spend-requests', 'fx-rates']],
  ['Support', ['customer-credits']],
  ['People', ['candidate-pipeline', 'desk-booking']],
  ['Engineering', ['incident-handover', 'uptime-board']],
  ['Legal', ['nda-lookup']],
];

export const LOG: [string, string, string, string][] = [
  ['09:41:02', 'dana@harbor.co', 'opened', 'budget-lines'],
  ['09:41:09', 'claude', 'deployed', 'supplier-payments'],
  ['09:41:10', 'wirl', 'granted', 'Finance → supplier-payments'],
  ['09:41:31', 'sam@harbor.co', 'exported', 'trial-extensions · 1,204 rows'],
  ['09:42:05', 'priya@harbor.co', 'denied', 'nda-lookup · not in Legal'],
  ['09:42:44', 'cursor', 'deployed', 'desk-booking'],
  ['09:43:01', 'wirl', 'revoked', 'lee@harbor.co · left Finance'],
  ['09:43:20', 'omar@harbor.co', 'opened', 'incident-handover'],
  ['09:43:52', 'mei@harbor.co', 'changed', 'fx-rates · EUR 1.08 → 1.09'],
  ['09:44:15', 'wirl', 'granted', 'Ops → shift-roster'],
];

// The story the stage tells, one caption per chapter.
export const CAPTIONS: { title: string; body: string }[] = [
  {
    title: 'Internal tools are getting built faster than anyone can keep track of them.',
    body: 'Agents turned a dashboard or an admin tool into a one-hour job, so people build them. Each one lands wherever the builder was logged in. Nobody has the list.',
  },
  {
    title: 'One place to ship every one of them.',
    body: 'Every app your team ships, in one list, behind one login. Whoever built it, however fast.',
  },
  {
    title: 'Login on every app.',
    body: 'Every app opens behind your company sign-in from its first deploy. There is no public URL unless you make one. Adding auth is not a step, so no one can forget it.',
  },
  {
    title: 'Permissions set for the workspace, not the app.',
    body: 'Teams are defined once and every app checks against them. Remove someone from a team and they are out of every tool that team could open.',
  },
  {
    title: 'A record of everything.',
    body: 'Who opened which tool, what they looked at, what they changed. The access review becomes a query instead of a week of Slack messages.',
  },
  {
    title: 'Ask your agent. Approve, don’t build.',
    body: 'Point Claude Code or Cursor at Wirl. It writes the tool, picks who can open it, and deploys. Login, permissions, and logging are already there. It cannot choose nobody.',
  },
];
