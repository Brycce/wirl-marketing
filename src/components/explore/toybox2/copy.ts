// Toybox copy. The approved words from components/copy.ts, regrouped for this
// section plan: each Wirl bullet gets its own slab and picture, and the
// built-in cards are folded into those slabs, so nothing approved is lost.
// The few new lines are plain and true.

import { copy } from '@/components/copy';

export const tb = {
  nav_cta: copy.nav_cta,
  hero_h1: copy.hero_h1,
  hero_p: copy.hero_p,
  connect_after: copy.connect_after,

  mess_h2: copy.mess_h2,
  mess_bullets: copy.mess_bullets,
  mess_p: copy.mess_p,
  mess_tiles: copy.mess_tiles,

  wirl_h2: copy.wirl_h2,
  wirl_p: copy.wirl_p,
  // New: how setup really goes. Install, approve once, deploy.
  steps: [
    { title: 'Install Wirl in your agent.', body: 'One command.' },
    { title: 'Approve it in your browser.', body: 'The first time only, with a link and a code.' },
    { title: 'Ask it to deploy.', body: 'You get a link only your company can open.' },
  ],

  agents_h2: copy.agents_h2,
  agents_p: copy.agents_p,
  agent_notes: copy.agent_notes,

  builtin_h2: copy.builtin_h2,
  builtin_p: 'Every app on Wirl gets these. Nobody has to write them.',

  signin_h2: "Your company's Google sign-in, on every app.",
  signin_p: copy.builtin_cards[0].body, // No invites
  signin_kicker: copy.builtin_cards[0].title,

  only_h2: 'Company-only by default.',
  only_p: 'The builder can narrow it to named people, or open it up.',

  keys_h2: 'Keys go into a vault.',
  keys_p: "A person types each key into their own browser, straight into Wirl's vault. Never into the code, never through the agent.",
  keys_kicker: copy.builtin_cards[2].title, // Keys skip the agent

  rollback_h2: copy.builtin_cards[3].title, // Bad deploys undo themselves
  rollback_p: 'A deploy that fails in its first half hour goes back to the last healthy version, and the log says so.',

  share_h2: copy.share_h2,
  share_p: copy.share_p,
  share_cmd: 'npx wirl pull supplier-payments',
  share_laptop_title: copy.builtin_cards[1].title, // Same thing on your laptop
  share_laptop: "npx wirl dev gives you production's database shape, identity headers, and API broker.",

  admin_h2: copy.admin_h2,
  admin_p: copy.admin_p,
  admin_bullets: [
    'Who built it, and with which agent.',
    'What data it connects to.',
    'Who can open it.',
    'When it was last used.',
    'Every call it makes, logged by host.',
  ],

  faq_h2: 'Questions people ask.',
  faq: copy.faq,

  closing_h2: copy.closing_h2,
  closing_p: copy.closing_p,
};
