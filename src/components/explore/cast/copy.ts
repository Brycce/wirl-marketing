// Every word on the Cartoon cast page. The approved home-page copy, regrouped
// for this page's sections. Nothing new is claimed here: the six cards are the
// old five bullets and four cards merged, and the one new line is the lede.
import { copy as base } from '@/components/copy';

export const copy = {
  nav_cta: base.nav_cta,
  hero_h1: base.hero_h1,
  hero_p: base.hero_p,
  connect_after: base.connect_after,

  mess_h2: base.mess_h2,
  mess_bullets: base.mess_bullets,
  mess_p: base.mess_p,

  wirl_h2: base.wirl_h2,
  wirl_p: base.wirl_p,

  rest_h2: base.builtin_h2,
  rest_lede: 'Every app on Wirl comes with these.',
  rest_cards: [
    { title: 'Company sign-in', body: "Sign in with your company's Google account, on every app. No invites: the first person creates your company's space." },
    { title: 'Company-only by default', body: 'The builder can narrow it to named people, or open it up.' },
    { title: 'Keys skip the agent', body: "A person types each key into their own browser, straight into Wirl's vault. Never into the code, never through the agent." },
    { title: 'Every call is logged', body: 'Every call an app makes is logged, by host.' },
    { title: 'Bad deploys undo themselves', body: 'Fails in its first half hour? Back to the last healthy version, and the log says so.' },
    { title: 'Same thing on your laptop', body: "npx wirl dev: production's database shape, identity headers, and API broker." },
  ],

  share_h2: base.share_h2,
  share_p: base.share_p,

  agents_h2: base.agents_h2,
  agents_p: base.agents_p,
  agent_notes: base.agent_notes,

  admin_h2: base.admin_h2,
  admin_p: base.admin_p,
  admin_bullets: base.admin_bullets,

  faq_h2: 'Questions people ask.',
  faq: base.faq,

  closing_h2: base.closing_h2,
  closing_p: base.closing_p,
};
