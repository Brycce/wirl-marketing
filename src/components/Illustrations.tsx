// Four tiny pictures made of interface, one per guarantee.

const pill = 'inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold';

export function LoginPicture() {
  return (
    <div className="mx-auto w-[220px] bg-white rounded-lg border border-rule shadow-card p-4 text-center">
      <div className="text-[12px] font-bold">refunds-admin</div>
      <div className="text-[11px] text-dim mt-0.5">Sign in to continue</div>
      <div className="mt-3 bg-ink text-white rounded-md py-1.5 text-[11px] font-semibold">Continue with acme.com</div>
      <div className="mt-2 text-[10px] text-dim">Not public. Never was.</div>
    </div>
  );
}

export function PermissionsPicture() {
  return (
    <div className="mx-auto w-[240px] bg-white rounded-lg border border-rule shadow-card p-4">
      <div className="text-[11px] text-dim mb-2">who can open vendor-payouts</div>
      <div className="flex flex-wrap gap-1.5">
        <span className={`${pill} bg-ok-bg text-ok`}>Finance ✓</span>
        <span className={`${pill} bg-ok-bg text-ok`}>Ops ✓</span>
        <span className={`${pill} bg-panel text-dim line-through`}>Sales</span>
        <span className={`${pill} bg-panel text-dim line-through`}>Everyone</span>
      </div>
    </div>
  );
}

export function LogPicture() {
  return (
    <div className="mx-auto w-[250px] bg-white rounded-lg border border-rule shadow-card p-3 font-mono text-[10.5px] leading-[18px]">
      <div><span className="text-dim">09:41:02</span> dana <span className="text-ok">opened</span> payroll-export</div>
      <div><span className="text-dim">09:42:05</span> priya <span className="text-bad">denied</span> contract-search</div>
      <div><span className="text-dim">09:43:01</span> wirl <span className="text-bad">revoked</span> lee@acme.com</div>
    </div>
  );
}

export function ListPicture() {
  return (
    <div className="mx-auto w-[240px] bg-white rounded-lg border border-rule shadow-card p-3 text-[11px]">
      <div className="text-dim mb-1.5">15 apps · acme.com</div>
      {[['refunds-admin', 'Support'], ['payroll-export', 'Finance'], ['oncall-notes', 'Engineering']].map(([n, t]) => (
        <div key={n} className="flex items-center justify-between py-1 border-t border-rule">
          <span>{n}</span>
          <span className={`${pill} bg-panel text-dim`}>{t}</span>
        </div>
      ))}
    </div>
  );
}
