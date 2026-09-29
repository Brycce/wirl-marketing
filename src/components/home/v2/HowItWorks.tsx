// How it works: the whole product in one section, straight after the hero.
// Three steps anyone can follow, then what it means for the two people who
// care: the one who builds the tool, and the one who runs IT. Colours come
// from the page's theme variables, so it follows night mode; the little
// drawings keep their own colours like every other picture on the page.

import { K, GoogleG, MiniLock } from '../kit';
import { LogoSticker } from '../marks';

const STEPS = [
  {
    title: 'Ask your agent',
    body: 'Anyone describes the tool they need to Claude Code, Codex or Cursor, and the agent builds it.',
    art: 'ask',
  },
  {
    title: 'Tell it to deploy',
    body: 'Wirl hosts it at its own link. Keys go into a vault in the browser, never into the code.',
    art: 'deploy',
  },
  {
    title: 'Your company opens it',
    body: 'Coworkers sign in with the Google work account they already have. Nobody outside gets in.',
    art: 'open',
  },
] as const;

const BUILDER = {
  who: 'For the people who build',
  title: 'Ship the tool today, not after a ticket.',
  points: [
    'No servers, DNS or login code to set up.',
    'Company-only from the first deploy.',
    'Keys in a vault, never in the code or the chat.',
    'A deploy that fails in its first half hour rolls itself back.',
    'Anyone who can open it can pull the code and ship a change.',
  ],
};

const ADMIN = {
  who: 'For the people who run IT',
  title: 'Every internal app, in one place.',
  points: [
    'Every app that is running, who built it, and with which agent.',
    'What each app connects to, and who can open it.',
    'A log of every call an app makes, by host.',
    'Nothing to configure per app: company-only is the default.',
  ],
};

/* ---------- The three little drawings ---------- */

function AskArt() {
  return (
    <svg viewBox="0 0 280 150" className="hw-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <rect x="24" y="16" width="232" height="46" rx="16" fill={K.pinkWash} stroke={K.ink} strokeWidth="2.5" />
      <text x="42" y="45" fontSize="16" fontWeight="700" fill={K.ink}>Make us a payments tool.</text>
      <rect x="44" y="78" width="212" height="54" rx="16" fill={K.wash} stroke={K.ink} strokeWidth="2.5" />
      <text x="66" y="103" fontSize="15" fontWeight="700" fill={K.ink}>On it. Building</text>
      <text x="66" y="122" fontSize="15" fontWeight="700" fill={K.ink}>supplier-payments…</text>
      <LogoSticker agent="claude" x={42} y={80} size={30} uid="hw-ask" />
    </svg>
  );
}

function DeployArt() {
  return (
    <svg viewBox="0 0 280 150" className="hw-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="24" width="264" height="42" rx="21" fill={K.paper} stroke={K.ink} strokeWidth="2.5" />
      <MiniLock x={27} y={45} />
      <text x="41" y="50" fontSize="14" fontWeight="700" fill={K.ink} textLength="216" lengthAdjust="spacingAndGlyphs">acme--supplier-payments.wirl.run</text>
      <rect x="62" y="86" width="156" height="42" rx="21" fill={K.green} stroke={K.ink} strokeWidth="2.5" />
      <path d="M82 107 l7 7 l13 -14" fill="none" stroke={K.paper} strokeWidth="3.4" />
      <text x="112" y="113" fontSize="17" fontWeight="800" fill={K.paper}>Deployed</text>
    </svg>
  );
}

function OpenArt() {
  return (
    <svg viewBox="0 0 280 150" className="hw-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <rect x="20" y="14" width="240" height="122" rx="16" fill={K.paper} stroke={K.ink} strokeWidth="2.5" />
      <GoogleG x={42} y={38} r={9} />
      <text x="58" y="43.5" fontSize="14" fontWeight="700" fill={K.ink} opacity="0.75">Sign in with Google</text>
      <path d="M20 58 H260" stroke={K.edge} strokeWidth="2" />
      <text x="40" y="86" fontSize="15" fontWeight="700" fill={K.ink}>tom@acme.co</text>
      <circle cx="234" cy="81" r="12" fill={K.green} stroke={K.ink} strokeWidth="2.2" />
      <path d="M228 81 l4 4 l8 -8" fill="none" stroke={K.paper} strokeWidth="2.8" />
      <text x="40" y="120" fontSize="15" fontWeight="700" fill={K.ink} opacity="0.5">alex@gmail.com</text>
      <circle cx="234" cy="115" r="12" fill={K.tomato} stroke={K.ink} strokeWidth="2.2" />
      <path d="M229 110 l10 10 M239 110 l-10 10" fill="none" stroke={K.paper} strokeWidth="2.8" />
    </svg>
  );
}

const ART = { ask: <AskArt />, deploy: <DeployArt />, open: <OpenArt /> };

/* ---------- The two persona cards' little marks ---------- */

function BuilderMark() {
  return (
    <svg viewBox="0 0 48 48" className="hw-mark" aria-hidden="true">
      <circle cx="24" cy="24" r="21" fill={K.sun} stroke={K.ink} strokeWidth="2.5" />
      <path d="M16 30 l6 -6 l-6 -6 M25 31 h9" fill="none" stroke={K.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AdminMark() {
  return (
    <svg viewBox="0 0 48 48" className="hw-mark" aria-hidden="true">
      <circle cx="24" cy="24" r="21" fill={K.sky} stroke={K.ink} strokeWidth="2.5" />
      <rect x="13" y="15" width="22" height="18" rx="3" fill={K.paper} stroke={K.ink} strokeWidth="2.4" />
      <path d="M13 21 H35 M13 27 H35 M20 21 V33" stroke={K.ink} strokeWidth="2" />
    </svg>
  );
}

const CSS = `
.tbx .hw { padding-top: 24px; padding-bottom: 40px; }
.tbx .hw-head { text-align: center; max-width: 760px; margin: 0 auto; }
.tbx .hw-kicker { display: inline-block; font-size: 14px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.tbx .hw-head .tb-lede { margin: 16px auto 0; max-width: 56ch; }
.tbx .hw-steps { list-style: none; padding: 0; margin: 40px 0 0; display: grid; gap: 18px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.tbx .hw-step, .tbx .hw-card {
  background: var(--card); color: var(--text); border: 3px solid var(--line); border-radius: 24px;
  box-shadow: 0 6px 0 var(--card-edge), 0 6px 0 3px var(--line);
}
.tbx .hw-step { padding: 18px 20px 22px; display: flex; flex-direction: column; }
/* Number and words first, the drawing under them, pinned to the bottom so the
   three drawings line up even when a description runs longer. */
.tbx .hw-art { display: block; width: 100%; height: auto; margin-top: auto; padding-top: 16px; }
.tbx .hw-art .mono { font-family: ui-monospace, 'JetBrains Mono', Menlo, monospace; }
.tbx .hw-step-title { display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: var(--heading); }
.tbx .hw-num {
  flex: none; width: 30px; height: 30px; border-radius: 999px; display: grid; place-items: center; font-size: 15px; font-weight: 800;
  background: var(--sun); color: #1B2420; border: 2.5px solid var(--line); box-shadow: 0 3px 0 var(--lift);
}
.tbx .hw-step p { margin-top: 8px; font-size: 16px; line-height: 1.5; }
.tbx .hw-cards { margin-top: 26px; display: grid; gap: 18px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.tbx .hw-card { padding: 24px 26px 26px; }
.tbx .hw-card-head { display: flex; align-items: center; gap: 12px; }
.tbx .hw-mark { width: 44px; height: 44px; flex: none; }
.tbx .hw-who { font-size: 14px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
.tbx .hw-card-title { margin-top: 14px; font-size: 26px; font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; color: var(--heading); }
.tbx .hw-card ul { list-style: none; padding: 0; margin: 14px 0 0; display: grid; gap: 9px; }
.tbx .hw-card li { position: relative; padding-left: 28px; font-size: 16.5px; line-height: 1.45; }
.tbx .hw-card li::before {
  content: ''; position: absolute; left: 0; top: 3px; width: 18px; height: 18px; border-radius: 999px;
  background: var(--green) no-repeat center / 11px url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 6.4l2.6 2.5L10 3.4' fill='none' stroke='%23FFFDF7' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
@media (max-width: 900px) {
  .tbx .hw-steps { grid-template-columns: minmax(0, 1fr); }
  .tbx .hw-step { display: grid; grid-template-columns: minmax(0, 1fr) 180px; gap: 4px 18px; align-items: center; }
  .tbx .hw-art { grid-column: 2; grid-row: 1 / span 2; margin: 0; padding-top: 0; }
  .tbx .hw-cards { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 560px) {
  .tbx .hw-step { display: flex; align-items: stretch; }
  .tbx .hw-art { grid-column: auto; grid-row: auto; padding-top: 14px; }
  .tbx .hw-card-title { font-size: 23px; }
}
`;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="wrap hw" aria-labelledby="hw-title">
      <style href="tbx-hw" precedence="default">{CSS}</style>
      <div className="hw-head">
        <h2 id="hw-title" className="tb-h2">How it works</h2>
        <p className="tb-lede">Your people build the tool with the agent they already use. Wirl hosts it behind your company login, and IT can see all of it.</p>
      </div>

      <ol className="hw-steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="hw-step">
            <h3 className="hw-step-title"><span className="hw-num" aria-hidden="true">{i + 1}</span>{s.title}</h3>
            <p>{s.body}</p>
            {ART[s.art]}
          </li>
        ))}
      </ol>

      <div className="hw-cards">
        {[{ ...BUILDER, mark: <BuilderMark /> }, { ...ADMIN, mark: <AdminMark /> }].map((c) => (
          <article key={c.who} className="hw-card">
            <div className="hw-card-head">
              {c.mark}
              <span className="hw-who">{c.who}</span>
            </div>
            <h3 className="hw-card-title">{c.title}</h3>
            <ul>
              {c.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

