// A pile of internal tools on a table. Each is a small, real-looking app
// window with the team that can open it and the login it sits behind.
// Also in the pile: the audit log, the agent's terminal, and one sticky note.

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
  return <span className={`inline-block rounded-full px-1.5 py-[1px] text-[10px] font-semibold leading-4 ${t}`}>{children}</span>;
}

function Card({
  title, team, style, bob, children, width,
}: { title: string; team: string; style: React.CSSProperties; bob: string; children: React.ReactNode; width: number }) {
  return (
    <div className="absolute" style={{ ...style, width }}>
      <div className={`${bob} bg-white rounded-lg border border-rule shadow-card overflow-hidden`}>
        <div className="flex items-center gap-2 px-3 py-2 border-b border-rule">
          <span className="text-[12px] font-bold">{title}</span>
          <Pill>{team}</Pill>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-dim"><Lock /> harbor.co</span>
        </div>
        <div className="p-3 text-[11px] leading-4 text-ink/80">{children}</div>
      </div>
    </div>
  );
}

function Row({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex items-center gap-2 py-1 border-b border-rule last:border-0 ${className}`}>{children}</div>;
}

export default function HeroPile() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-panel h-[320px] sm:h-[440px] lg:h-[540px]" aria-hidden="true">
      <div className="absolute left-1/2 top-0 w-[1240px] h-[600px] -translate-x-1/2 origin-top scale-50 sm:scale-75 lg:scale-100">
        <div className="absolute inset-0" style={{ transform: 'perspective(1800px) rotateX(14deg)', transformOrigin: '50% 0%' }}>

          {/* Refunds queue */}
          <Card title="customer-credits" team="Support" width={330} bob="bob-1" style={{ left: 60, top: 110, transform: 'rotate(-6deg)' }}>
            <Row><span className="w-12 text-dim">#4821</span><span className="flex-1">Late delivery, goodwill</span><span>£120.00</span><Pill tone="ink">Approve</Pill></Row>
            <Row><span className="w-12 text-dim">#4819</span><span className="flex-1">Double-billed in March</span><span>£39.50</span><Pill tone="ink">Approve</Pill></Row>
            <Row><span className="w-12 text-dim">#4816</span><span className="flex-1">Outage credit</span><span>£210.00</span><Pill tone="ok">Approved</Pill></Row>
            <Row><span className="w-12 text-dim">#4811</span><span className="flex-1">Downgrade refund</span><span>£64.00</span><Pill tone="ok">Approved</Pill></Row>
          </Card>

          {/* Payouts */}
          <Card title="supplier-payments" team="Finance" width={300} bob="bob-2" style={{ left: 380, top: 30, transform: 'rotate(3deg)' }}>
            <Row><span className="flex-1">Northwind Print</span><span className="text-dim">Fri</span><span>$8,400</span></Row>
            <Row><span className="flex-1">Lumen Studio</span><span className="text-dim">Fri</span><span>$2,150</span></Row>
            <Row><span className="flex-1">Haverford Freight</span><span className="text-dim">Mon</span><span>$12,900</span></Row>
            <div className="mt-2 flex items-center justify-between text-[10px] text-dim">
              <span>deployed 2 min ago by claude</span>
              <Pill tone="ink">Run payouts</Pill>
            </div>
          </Card>

          {/* Hiring board */}
          <Card title="candidate-pipeline" team="People" width={370} bob="bob-3" style={{ left: 680, top: 90, transform: 'rotate(-3deg)' }}>
            <div className="grid grid-cols-3 gap-2">
              {[
                ['Phone screen', ['M. Okafor', 'J. Lindqvist']],
                ['Onsite', ['R. Patel', 'A. Moreau', 'T. Nakamura']],
                ['Offer', ['S. Alvarez']],
              ].map(([col, names]) => (
                <div key={col as string}>
                  <div className="text-[10px] text-dim mb-1">{col as string}</div>
                  {(names as string[]).map((n) => (
                    <div key={n} className="bg-panel rounded px-1.5 py-1 mb-1">{n}</div>
                  ))}
                </div>
              ))}
            </div>
          </Card>

          {/* On-call doc */}
          <Card title="incident-handover" team="Engineering" width={270} bob="bob-4" style={{ left: 1000, top: 160, transform: 'rotate(6deg)' }}>
            <div className="font-bold text-[12px] mb-1">Tue 9 Sep · handover</div>
            <p className="text-ink/70">Queue backlog cleared 03:10. Watch the EU region, latency spiked twice. Runbook link updated.</p>
            <div className="mt-2 flex gap-1"><Pill>p1 · 0</Pill><Pill>p2 · 2</Pill></div>
          </Card>

          {/* Expense approvals */}
          <Card title="spend-requests" team="Finance" width={260} bob="bob-3" style={{ left: 20, top: 350, transform: 'rotate(4deg)' }}>
            <Row><span className="flex-1">Team offsite, catering</span><span>$1,240</span><Pill tone="ink">Approve</Pill></Row>
            <Row><span className="flex-1">Conference travel</span><span>$860</span><Pill tone="ok">Approved</Pill></Row>
          </Card>

          {/* Audit log */}
          <div className="absolute" style={{ left: 330, top: 380, width: 350, transform: 'rotate(2deg)' }}>
            <div className="bob-2 bg-white rounded-lg border border-rule shadow-card p-3 font-mono text-[10.5px] leading-[18px]">
              <div className="text-dim mb-1">audit log · live</div>
              <div><span className="text-dim">09:41:02</span> dana@harbor.co <span className="text-ok">opened</span> budget-lines</div>
              <div><span className="text-dim">09:41:09</span> claude <span className="text-ok">deployed</span> supplier-payments</div>
              <div><span className="text-dim">09:42:05</span> priya@harbor.co <span className="text-bad">denied</span> nda-lookup</div>
              <div><span className="text-dim">09:43:01</span> wirl <span className="text-bad">revoked</span> lee@harbor.co</div>
            </div>
          </div>

          {/* The agent's terminal */}
          <div className="absolute" style={{ left: 700, top: 350, width: 400, transform: 'rotate(-4deg)' }}>
            <div className="bob-3 bg-ink text-white rounded-lg shadow-card p-3 font-mono text-[10.5px] leading-[18px]">
              <div><span className="text-white/50">› </span>Build a supplier payments tool for finance and deploy it</div>
              <div className="mt-1"><span className="text-tape">created</span>   supplier-payments</div>
              <div><span className="text-tape">login</span>     harbor.co</div>
              <div><span className="text-tape">access</span>    Finance, Ops</div>
              <div><span className="text-tape">live</span>      supplier-payments.harbor.wirl.app <span className="text-white/40">· 47s after you asked</span></div>
            </div>
          </div>

          {/* Sticky note */}
          <div className="absolute" style={{ left: 1040, top: 330, width: 200, transform: 'rotate(-7deg)' }}>
            <div className="bob-1 bg-tape rounded-sm shadow-card p-4 display text-[17px] leading-snug" style={{ fontVariationSettings: '"opsz" 20, "SOFT" 60' }}>
              <em>Who can open budget-lines?</em>
              <br />
              Finance. Only Finance.
            </div>
          </div>

          {/* Small facts */}
          <div className="absolute" style={{ left: 40, top: 30, transform: 'rotate(4deg)' }}>
            <div className="bob-4 bg-white rounded-full border border-rule shadow-card px-3 py-1.5 text-[11px] inline-flex items-center gap-1.5">
              <Lock /> 15 apps, all behind harbor.co login
            </div>
          </div>
          <div className="absolute" style={{ left: 1040, top: 20, transform: 'rotate(-5deg)' }}>
            <div className="bob-2 bg-white rounded-lg border border-rule shadow-card px-3 py-2 flex flex-wrap gap-1 w-[190px]">
              {['Support', 'Finance', 'Engineering', 'People', 'Ops'].map((t) => <Pill key={t}>{t}</Pill>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
