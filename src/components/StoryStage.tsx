import Image from 'next/image';
import { COMPANY, TEAMS, LOG } from './data';

// The stage. A pile of internal tools on a table, each a small real-looking
// app window with its team and the login it sits behind. As --p rises the
// pile becomes the Wirl window. Then each chapter's overlay rises over the
// grid: sign-in, teams, the audit log, the agent's terminal.

type Place = { x0: number; y0: number; r0: number; w0: number; x1: number; y1: number; w1?: number; h1?: number };

function vars(p: Place) {
  return {
    '--x0': p.x0, '--y0': p.y0, '--r0': p.r0, '--w0': p.w0,
    '--x1': p.x1, '--y1': p.y1, '--w1': p.w1 ?? 310, '--h1': p.h1 ?? 0,
  } as React.CSSProperties;
}

function Lock() {
  return (
    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="2.5" y="5.5" width="7" height="5" rx="1" />
      <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
    </svg>
  );
}

function Pill({ children, tone = 'grey' }: { children: React.ReactNode; tone?: 'grey' | 'ok' | 'bad' | 'ink' }) {
  const t = {
    grey: 'bg-panel text-ink/70',
    ok: 'bg-ok-bg text-ok',
    bad: 'bg-bad-bg text-bad',
    ink: 'bg-ink text-white',
  }[tone];
  return <span className={`inline-block rounded-full px-1.5 py-[1px] text-[10px] font-semibold leading-4 whitespace-nowrap ${t}`}>{children}</span>;
}

function LoginBadge() {
  return (
    <span className="ml-auto relative inline-flex items-center text-[10px] whitespace-nowrap">
      <span className="pile-badge-off inline-flex items-center gap-1 text-dim"><Lock /> {COMPANY}</span>
      <span className="pile-badge-on absolute right-0 inline-flex items-center gap-1 text-ok bg-ok-bg rounded-full px-1.5"><Lock /> {COMPANY} login</span>
    </span>
  );
}

function Card({
  title, team, place, bob, children, className = '',
}: { title: string; team: string; place: Place; bob: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`pile-card absolute left-0 top-0 ${className}`} style={vars(place)}>
      <div className={`${bob} pile-inner bg-white rounded-lg border border-rule shadow-card overflow-hidden`}>
        <div className="flex items-center gap-2 px-3 py-2 border-b border-rule">
          <span className="text-[12px] font-bold whitespace-nowrap">{title}</span>
          <Pill>{team}</Pill>
          <LoginBadge />
        </div>
        <div className="p-3 text-[11px] leading-4 text-ink/80">{children}</div>
      </div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2 py-1 border-b border-rule last:border-0">{children}</div>;
}

// Tidy grid: four columns, two rows, inside the window.
const COL = [-50, 280, 610, 940];
const ROW = [132, 350];

export default function StoryStage() {
  return (
    <>
      <div className="pile-tint absolute inset-0 rounded-3xl" aria-hidden="true" />
      <div className="absolute left-1/2 top-0 w-[1240px] h-[600px] -translate-x-1/2 origin-top scale-50 sm:scale-75 lg:scale-100" aria-hidden="true">
        <div className="pile-stage absolute inset-0">

          {/* The workspace: Wirl's own window, which the pile becomes. */}
          <div className="pile-fade-in absolute rounded-xl bg-white border border-rule shadow-card" style={{ left: -50, top: 40, width: 1340, height: 505 }}>
            <div className="h-11 px-4 border-b border-rule flex items-center gap-5 text-[11.5px]">
              <span className="inline-flex items-center gap-2 font-bold"><Image src="/logo.png" alt="" width={16} height={16} /> {COMPANY}</span>
              <span className="inline-flex items-center gap-4 text-dim h-full">
                <span className="relative h-full inline-flex items-center">Apps <span className="ml-1">15</span><span className="tab-apps absolute left-0 right-0 bottom-0 h-[2px] bg-ink" /></span>
                <span className="relative h-full inline-flex items-center">Teams <span className="ml-1">5</span><span className="tab-teams absolute left-0 right-0 bottom-0 h-[2px] bg-ink" /></span>
                <span className="relative h-full inline-flex items-center">Audit log<span className="tab-audit absolute left-0 right-0 bottom-0 h-[2px] bg-ink" /></span>
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 text-ok"><span className="w-1.5 h-1.5 rounded-full bg-ok" /> everyone signed in</span>
            </div>
          </div>

          {/* Customer credits */}
          <Card title="customer-credits" team="Support" bob="bob-1" place={{ x0: 60, y0: 110, r0: -6, w0: 330, x1: COL[0], y1: ROW[0], h1: 164 }}>
            <Row><span className="w-12 text-dim">#4821</span><span className="flex-1 truncate">Late delivery</span><span>£120.00</span><Pill tone="ink">Approve</Pill></Row>
            <Row><span className="w-12 text-dim">#4819</span><span className="flex-1 truncate">Double-billed</span><span>£39.50</span><Pill tone="ink">Approve</Pill></Row>
            <Row><span className="w-12 text-dim">#4816</span><span className="flex-1 truncate">Outage credit</span><span>£210.00</span><Pill tone="ok">Approved</Pill></Row>
            <Row><span className="w-12 text-dim">#4811</span><span className="flex-1 truncate">Downgrade refund</span><span>£64.00</span><Pill tone="ok">Approved</Pill></Row>
          </Card>

          {/* Supplier payments: the one the agent builds in the last chapter */}
          <Card title="supplier-payments" team="Finance" bob="bob-2" className="keep-bright" place={{ x0: 380, y0: 30, r0: 3, w0: 300, x1: COL[1], y1: ROW[0], h1: 164 }}>
            <div className="ring-5 rounded-md -m-1 p-1">
              <Row><span className="flex-1 truncate">Northwind Print</span><span className="text-dim">Fri</span><span>$8,400</span></Row>
              <Row><span className="flex-1 truncate">Lumen Studio</span><span className="text-dim">Fri</span><span>$2,150</span></Row>
              <Row><span className="flex-1 truncate">Haverford Freight</span><span className="text-dim">Mon</span><span>$12,900</span></Row>
              <div className="mt-2 flex items-center justify-between text-[10px] text-dim">
                <span className="truncate">deployed 2 min ago by claude</span>
                <Pill tone="ink">Run payments</Pill>
              </div>
            </div>
          </Card>

          {/* Candidate pipeline */}
          <Card title="candidate-pipeline" team="People" bob="bob-3" place={{ x0: 680, y0: 90, r0: -3, w0: 370, x1: COL[2], y1: ROW[0], h1: 164 }}>
            <div className="grid grid-cols-3 gap-2">
              {[
                ['Phone screen', ['M. Okafor', 'J. Lindqvist']],
                ['Onsite', ['R. Patel', 'A. Moreau', 'T. Nakamura']],
                ['Offer', ['S. Alvarez']],
              ].map(([col, names]) => (
                <div key={col as string}>
                  <div className="text-[10px] text-dim mb-1 truncate">{col as string}</div>
                  {(names as string[]).map((n) => (
                    <div key={n} className="bg-panel rounded px-1.5 py-1 mb-1 truncate">{n}</div>
                  ))}
                </div>
              ))}
            </div>
          </Card>

          {/* Incident handover */}
          <Card title="incident-handover" team="Engineering" bob="bob-4" place={{ x0: 1000, y0: 160, r0: 6, w0: 270, x1: COL[3], y1: ROW[0], h1: 164 }}>
            <div className="font-bold text-[12px] mb-1">Tue 9 Sep · handover</div>
            <p className="text-ink/70">Queue backlog cleared 03:10. Watch the EU region, latency spiked twice. Runbook link updated.</p>
            <div className="mt-2 flex gap-1"><Pill>p1 · 0</Pill><Pill>p2 · 2</Pill></div>
          </Card>

          {/* Spend requests */}
          <Card title="spend-requests" team="Finance" bob="bob-3" place={{ x0: 20, y0: 350, r0: 4, w0: 260, x1: COL[0], y1: ROW[1], h1: 130 }}>
            <Row><span className="flex-1 truncate">Team offsite, catering</span><span>$1,240</span><Pill tone="ink">Approve</Pill></Row>
            <Row><span className="flex-1 truncate">Conference travel</span><span>$860</span><Pill tone="ok">Approved</Pill></Row>
          </Card>

          {/* Audit log */}
          <div className="pile-card absolute left-0 top-0" style={vars({ x0: 330, y0: 380, r0: 2, w0: 350, x1: COL[1], y1: ROW[1], h1: 130 })}>
            <div className="bob-2 pile-inner bg-white rounded-lg border border-rule shadow-card p-3 font-mono text-[10.5px] leading-[18px] whitespace-nowrap overflow-hidden">
              <div className="text-dim mb-1">audit log · live</div>
              <div><span className="text-dim">09:41:02</span> dana@harbor.co <span className="text-ok">opened</span> budget-lines</div>
              <div><span className="text-dim">09:41:09</span> claude <span className="text-ok">deployed</span> supplier-payments</div>
              <div><span className="text-dim">09:42:05</span> priya@harbor.co <span className="text-bad">denied</span> nda-lookup</div>
              <div><span className="text-dim">09:43:01</span> wirl <span className="text-bad">revoked</span> lee@harbor.co</div>
            </div>
          </div>

          {/* The agent's terminal, small */}
          <div className="pile-card absolute left-0 top-0" style={vars({ x0: 700, y0: 350, r0: -4, w0: 400, x1: COL[2], y1: ROW[1], h1: 130 })}>
            <div className="bob-3 pile-inner bg-ink text-white rounded-lg shadow-card border border-white/10 p-3 font-mono text-[10.5px] leading-[18px] whitespace-nowrap overflow-hidden">
              <div><span className="text-white/50">› </span>Build a supplier payments tool for finance</div>
              <div className="mt-1"><span className="text-tape">created</span>   supplier-payments</div>
              <div><span className="text-tape">login</span>     {COMPANY}</div>
              <div><span className="text-tape">access</span>    Finance, Ops</div>
              <div><span className="text-tape">live</span>      supplier-payments.harbor.wirl.app</div>
            </div>
          </div>

          {/* Sticky note */}
          <div className="pile-card absolute left-0 top-0" style={vars({ x0: 1040, y0: 330, r0: -7, w0: 200, x1: COL[3], y1: ROW[1], w1: 310, h1: 130 })}>
            <div className="bob-1 pile-inner bg-tape rounded-sm shadow-card p-4 display text-[17px] leading-snug" style={{ fontVariationSettings: '"opsz" 20, "SOFT" 60' }}>
              <em>Who can open budget-lines?</em>
              <br />
              Finance. Only Finance.
            </div>
          </div>

          {/* Loose facts. They leave as the workspace takes over. */}
          <div className="pile-fade-out-fast absolute" style={{ left: 40, top: 30, transform: 'rotate(4deg)' }}>
            <div className="bob-4 bg-white rounded-full border border-rule shadow-card px-3 py-1.5 text-[11px] inline-flex items-center gap-1.5 whitespace-nowrap">
              <Lock /> 15 apps, all behind {COMPANY} login
            </div>
          </div>
          <div className="pile-fade-out-fast absolute" style={{ left: 1040, top: 20, transform: 'rotate(-5deg)' }}>
            <div className="bob-2 bg-white rounded-lg border border-rule shadow-card px-3 py-2 flex flex-wrap gap-1 w-[190px]">
              {['Support', 'Finance', 'Engineering', 'People', 'Ops'].map((t) => <Pill key={t}>{t}</Pill>)}
            </div>
          </div>

          {/* Chapter 3: sign in */}
          <div className="ov ov-2 absolute" style={{ left: 450, top: 200, width: 340 }}>
            <div className="bg-white rounded-xl border border-rule shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] p-6 text-center">
              <Image src="/logo.png" alt="" width={26} height={26} className="mx-auto" />
              <div className="mt-3 text-[13px] font-bold">customer-credits</div>
              <div className="text-[11px] text-dim mt-0.5">Sign in to continue</div>
              <div className="mt-4 bg-ink text-white rounded-md py-2 text-[12px] font-semibold inline-flex items-center justify-center gap-2 w-full"><Lock /> Continue with {COMPANY}</div>
              <div className="mt-3 text-[10.5px] text-dim">Not public. Never was.</div>
            </div>
          </div>

          {/* Chapter 4: teams */}
          <div className="ov ov-3 absolute" style={{ left: 240, top: 120, width: 760 }}>
            <div className="bg-white rounded-xl border border-rule shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] p-5 text-[11.5px]">
              <div className="text-dim mb-3">Teams · who can open what</div>
              {TEAMS.map(([team, apps]) => (
                <div key={team} className="flex items-center gap-3 py-2 border-t border-rule">
                  <span className="w-24 font-bold">{team}</span>
                  <span className="flex flex-wrap gap-1.5">{apps.map((a) => <Pill key={a} tone="ok">{a}</Pill>)}</span>
                </div>
              ))}
              <div className="mt-3 flex items-center gap-3 rounded-md bg-bad-bg text-bad px-3 py-2 font-mono text-[11px]">
                <span className="opacity-70">09:42:05</span> priya@harbor.co tried nda-lookup <span className="font-bold">· denied</span> <span className="opacity-70">· not in Legal</span>
              </div>
            </div>
          </div>

          {/* Chapter 5: audit log, full */}
          <div className="ov ov-4 absolute" style={{ left: 170, top: 110, width: 900 }}>
            <div className="bg-white rounded-xl border border-rule shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] p-5 font-mono text-[11.5px] leading-[22px]">
              <div className="text-dim mb-2">audit log · live · {COMPANY}</div>
              <div className="relative h-[264px] overflow-hidden">
                <div className="stream">
                  {[...LOG, ...LOG].map((row, i) => (
                    <div key={i} className="flex gap-3 whitespace-nowrap">
                      <span className="text-dim">{row[0]}</span>
                      <span className="w-36 truncate">{row[1]}</span>
                      <span className={`w-16 ${row[2] === 'denied' || row[2] === 'revoked' ? 'text-bad' : 'text-ok'}`}>{row[2]}</span>
                      <span className="text-dim truncate">{row[3]}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
              </div>
            </div>
          </div>

          {/* Chapter 6: the agent */}
          <div className="ov ov-5 absolute" style={{ left: 240, top: 318, width: 760 }}>
            <div className="bg-ink text-white rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] p-5 font-mono text-[12px] leading-[22px]">
              <div className="whitespace-nowrap"><span className="text-white/50">› </span><span className="typed inline-block align-top">Build a supplier payments tool for finance and deploy it</span></div>
              <div className="mt-2 line-1"><span className="text-tape">created</span>   supplier-payments</div>
              <div className="line-2"><span className="text-tape">login</span>     {COMPANY} · nothing public</div>
              <div className="line-3"><span className="text-tape">access</span>    Finance, Ops</div>
              <div className="line-4 flex items-center gap-3"><span><span className="text-tape">live</span>      supplier-payments.harbor.wirl.app</span><span className="live-chip inline-flex items-center gap-1.5 rounded-full bg-ok-bg text-ok px-2 text-[11px] leading-5"><span className="w-1.5 h-1.5 rounded-full bg-ok" /> 47s after you asked</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
