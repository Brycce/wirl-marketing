import Image from 'next/image';

// A ribbon of internal tools, each with the team that can open it,
// wound around the mark. Turns slowly. This is the one decoration on the page.
export const TOOLS: [string, string][] = [
  ['refunds-admin', 'Support'], ['churn-report', 'Growth'], ['payroll-export', 'Finance'],
  ['vendor-payouts', 'Finance'], ['oncall-notes', 'Engineering'], ['hiring-tracker', 'People'],
  ['inventory-sync', 'Ops'], ['contract-search', 'Legal'], ['lead-router', 'Sales'],
  ['sla-monitor', 'Engineering'], ['invoice-tool', 'Finance'], ['ops-dashboard', 'Ops'],
  ['expense-approvals', 'Finance'], ['seat-planner', 'People'], ['deal-desk', 'Sales'],
];

function spiralPath() {
  const pts: string[] = [];
  const steps = 240;
  for (let k = 0; k <= steps; k++) {
    const t = k / steps;
    const th = t * Math.PI * 2 * 3.2;
    const r = 62 + 300 * t;
    pts.push(`${(400 + r * Math.cos(th)).toFixed(1)} ${(400 + r * Math.sin(th)).toFixed(1)}`);
  }
  return `M ${pts.join(' L ')}`;
}

export default function Spiral({ className = '' }: { className?: string }) {
  const ribbon = TOOLS.map(([name, team]) => `${name}  ·  ${team}`).join('   ·   ');
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      <svg viewBox="0 0 800 800" className="absolute inset-0 w-full h-full">
        <defs>
          <path id="spiral" d={spiralPath()} />
        </defs>
        <g className="turn" style={{ transformOrigin: '400px 400px' }}>
          <text fontSize="25" fontWeight="700" fill="currentColor" letterSpacing="0.5">
            <textPath href="#spiral">{ribbon}   ·   {ribbon}</textPath>
          </text>
        </g>
      </svg>
      <div className="absolute left-1/2 top-1/2 w-[19%] -translate-x-1/2 -translate-y-1/2">
        <Image src="/logo.png" alt="" width={320} height={320} priority className="w-full h-auto" />
      </div>
    </div>
  );
}
