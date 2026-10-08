// What Wirl is, said plainly, straight after the list of where internal tools
// live today: each problem in that list, and what changes on Wirl. Colours
// come from the band and the page's theme variables, so it follows night mode.

import { Keep } from '../Page';

const ROWS: { now: string; wirl: string }[] = [
  { now: "Someone's personal Vercel, with a Stripe key pasted in.", wirl: 'Hosted on Wirl, with the key in a vault, never in the code.' },
  { now: "The intern's laptop, until the intern leaves.", wirl: "At a company link, not on one person's laptop." },
  { now: 'A pull request, waiting for an engineer.', wirl: 'The person who built it deploys it from their agent.' },
  { now: 'A public URL by accident.', wirl: 'Company-only by default, behind your Google sign-in.' },
  { now: 'Nobody has the list.', wirl: 'Admins see every app, who built it, and what it reads.' },
];

const CSS = `
.tbx .wi-head { text-align: center; max-width: 820px; margin: 0 auto; }
.tbx .wi-head .tb-lede { margin: 16px auto 0; max-width: 54ch; }
.tbx .wi-rows { list-style: none; padding: 0; margin: 34px auto 0; max-width: 1000px; display: grid; gap: 12px; }
.tbx .wi-row {
  display: grid; grid-template-columns: minmax(0, 1fr) 44px minmax(0, 1fr); align-items: center; gap: 10px;
  background: var(--card); color: var(--text); border: 3px solid var(--line); border-radius: 20px; padding: 14px 20px;
  box-shadow: 0 5px 0 var(--card-edge), 0 5px 0 3px var(--line);
}
.tbx .wi-now, .tbx .wi-wirl { display: flex; align-items: flex-start; gap: 10px; font-size: 16.5px; line-height: 1.4; }
.tbx .wi-now { color: var(--muted); }
.tbx .wi-wirl { font-weight: 700; color: var(--heading); }
.tbx .wi-dot { flex: none; width: 20px; height: 20px; border-radius: 999px; margin-top: 1px; display: grid; place-items: center; border: 2px solid #1B2420; }
.tbx .wi-now .wi-dot { background: #E5483B; }
.tbx .wi-wirl .wi-dot { background: #2E9D5B; }
.tbx .wi-arrow { justify-self: center; width: 28px; height: 28px; color: var(--muted); }
.tbx .wi-labels { display: grid; grid-template-columns: minmax(0, 1fr) 44px minmax(0, 1fr); gap: 10px; max-width: 1000px; margin: 30px auto 0; padding: 0 23px; }
.tbx .wi-labels span { font-size: 13px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; color: var(--muted); }
.tbx .wi-labels span:last-child { grid-column: 3; }
.tbx .wi-labels + .wi-rows { margin-top: 10px; }
@media (max-width: 760px) {
  .tbx .wi-labels { display: none; }
  .tbx .wi-row { grid-template-columns: minmax(0, 1fr); gap: 8px; padding: 14px 16px; }
  .tbx .wi-arrow { justify-self: start; transform: rotate(90deg); width: 22px; height: 22px; margin-left: 1px; }
}
`;

function Cross() {
  return <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M3 3l6 6M9 3l-6 6" stroke="#FFFDF7" strokeWidth="2.2" strokeLinecap="round" /></svg>;
}
function Tick() {
  return <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><path d="M2 6.4l2.6 2.5L10 3.4" fill="none" stroke="#FFFDF7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function WhatItIs({ title, lede }: { title: string; lede: string }) {
  return (
    <>
      <style href="tbx-wi" precedence="default">{CSS}</style>
      <div className="wi-head">
        <h2 className="tb-h2"><Keep text={title} /></h2>
        <p className="tb-lede">{lede}</p>
      </div>
      <div className="wi-labels" aria-hidden="true"><span>Today</span><span>On Wirl</span></div>
      <ul className="wi-rows">
        {ROWS.map((r) => (
          <li key={r.now} className="wi-row">
            <span className="wi-now"><span className="wi-dot"><Cross /></span><span><span className="sr-only">Today: </span><Keep text={r.now} /></span></span>
            <svg className="wi-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="wi-wirl"><span className="wi-dot"><Tick /></span><span><span className="sr-only">On Wirl: </span><Keep text={r.wirl} /></span></span>
          </li>
        ))}
      </ul>
    </>
  );
}
