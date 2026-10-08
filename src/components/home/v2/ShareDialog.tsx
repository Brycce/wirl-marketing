// A share dialog for an app, drawn the way people know it from shared docs:
// who has access, who can open it, and Copy link. It is a picture of a
// screen, so it keeps its own light colours in night mode, like every other
// drawing on the page.

import { K, GoogleG, Acme, Avatar } from '../kit';

function Mark({ children, size = 22 }: { children: React.ReactNode; size?: number }) {
  return <svg viewBox="-12 -12 24 24" width={size} height={size} aria-hidden="true" style={{ flex: 'none' }}>{children}</svg>;
}

const CSS = `
.tbx .sd {
  --sd-ink: #1B2420; --sd-muted: #5E5A4C; --sd-wash: #F3ECDD;
  position: relative; text-align: left; background: #FFFDF7; color: var(--sd-ink);
  border: 3px solid var(--sd-ink); border-radius: 22px; padding: 22px 24px 20px;
  box-shadow: 0 8px 0 #E4D9C3, 0 8px 0 3px var(--sd-ink);
}
.tbx .sd-title { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
.tbx .sd-title code { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: .86em; font-weight: 700; }
.tbx .sd-add { margin-top: 14px; border: 2.5px solid var(--sd-ink); border-radius: 12px; padding: 10px 14px; color: var(--sd-muted); font-size: 15.5px; font-weight: 600; }
.tbx .sd-h { margin-top: 18px; font-size: 13px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: var(--sd-muted); }
.tbx .sd-row { display: flex; align-items: center; gap: 12px; margin-top: 10px; }
.tbx .sd-row b { font-size: 16px; font-weight: 750; }
.tbx .sd-row small { display: block; font-size: 14px; color: var(--sd-muted); font-weight: 500; }
.tbx .sd-row .sd-role { margin-left: auto; font-size: 14px; font-weight: 650; color: var(--sd-muted); }
.tbx .sd-access { display: flex; align-items: center; gap: 12px; margin-top: 10px; background: var(--sd-wash); border-radius: 14px; padding: 10px 12px; }
.tbx .sd-access-icon { width: 38px; height: 38px; border-radius: 999px; background: #DDF3E4; border: 2.5px solid var(--sd-ink); display: grid; place-items: center; flex: none; }
.tbx .sd-select { display: inline-flex; align-items: center; gap: 6px; font-size: 16px; font-weight: 800; }
.tbx .sd-select::after { content: ''; width: 8px; height: 8px; border-right: 2.5px solid var(--sd-ink); border-bottom: 2.5px solid var(--sd-ink); transform: rotate(45deg) translateY(-3px); }
.tbx .sd-foot { display: flex; align-items: center; gap: 10px; margin-top: 20px; }
.tbx .sd-copy {
  display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 800; padding: 9px 16px; border-radius: 999px;
  background: #FFFDF7; border: 2.5px solid var(--sd-ink); box-shadow: 0 3px 0 var(--sd-ink);
}
.tbx .sd-link { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13.5px; color: var(--sd-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; flex: 1; }
.tbx .sd-done { margin-left: auto; font-size: 15px; font-weight: 800; padding: 9px 20px; border-radius: 999px; background: #3F6FE8; color: #fff; border: 2.5px solid var(--sd-ink); box-shadow: 0 3px 0 var(--sd-ink); }
.tbx .sd-stamp {
  position: absolute; right: -18px; top: -20px; transform: rotate(8deg); background: #FFD23F; color: #1B2420;
  border: 2.5px solid #1B2420; border-radius: 999px; padding: 7px 14px; font-size: 14px; font-weight: 800; box-shadow: 0 3px 0 #1B2420;
}
@media (max-width: 560px) {
  .tbx .sd { padding: 18px 16px 16px; }
  .tbx .sd-title { font-size: 19px; }
  .tbx .sd-link { display: none; }
  .tbx .sd-stamp { right: -6px; top: -18px; }
}
`;

export default function ShareDialog({ stamp }: { stamp?: string }) {
  return (
    <div className="sd" role="img" aria-label="A share dialog for the supplier-payments app: Priya owns it, anyone at Acme can open it, with Copy link and the link acme--supplier-payments.wirl.run.">
      <style href="tbx-sd" precedence="default">{CSS}</style>
      {stamp && <span className="sd-stamp" aria-hidden="true">{stamp}</span>}
      <div aria-hidden="true">
        <div className="sd-title">Share <code>supplier-payments</code></div>
        <div className="sd-add">Add people by name or email</div>

        <div className="sd-h">People with access</div>
        <div className="sd-row">
          <Mark size={38}><Avatar who="priya" x={0} y={0} r={11} /></Mark>
          <div><b>Priya Nair (you)</b><small>priya@acme.co</small></div>
          <span className="sd-role">Owner</span>
        </div>

        <div className="sd-h">Who can open it</div>
        <div className="sd-access">
          <span className="sd-access-icon"><Mark><Acme x={0} y={0} r={10} /></Mark></span>
          <div>
            <span className="sd-select">Anyone at Acme</span>
            <small style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#5E5A4C', fontWeight: 500 }}>
              <svg viewBox="-10 -10 20 20" width="15" height="15" aria-hidden="true"><GoogleG x={0} y={0} r={8} /></svg>
              Signs in with their Acme Google account
            </small>
          </div>
        </div>

        <div className="sd-foot">
          <span className="sd-copy">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1" fill="none" stroke={K.ink} strokeWidth="2.4" strokeLinecap="round" /></svg>
            Copy link
          </span>
          <span className="sd-link">acme--supplier-payments.wirl.run</span>
          <span className="sd-done">Done</span>
        </div>
      </div>
    </div>
  );
}
