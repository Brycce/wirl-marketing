import { TOOLS } from './Spiral';

// The two things Wirl gives you that you do not have today:
// the list of every internal app with who can open it, and a log of
// everything that happens inside them. An agent's request sits on top,
// because that is how most of these apps get made now.
const LOG: [string, string, string, string][] = [
  ['09:41:02', 'dana@acme.com', 'opened', 'payroll-export'],
  ['09:41:09', 'claude', 'deployed', 'vendor-payouts'],
  ['09:41:10', 'wirl', 'granted', 'Finance → vendor-payouts'],
  ['09:41:31', 'sam@acme.com', 'exported', 'churn-report · 1,204 rows'],
  ['09:42:05', 'priya@acme.com', 'denied', 'contract-search · not in Legal'],
  ['09:42:44', 'cursor', 'deployed', 'seat-planner'],
  ['09:43:01', 'wirl', 'revoked', 'lee@acme.com · left Finance'],
  ['09:43:20', 'omar@acme.com', 'opened', 'oncall-notes'],
];

export default function ProductWindow() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#1C1C20] overflow-hidden font-mono text-[12.5px] leading-relaxed">
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3 whitespace-nowrap overflow-hidden">
        <span className="text-tape">›</span>
        <span className="text-white truncate">Build a vendor payouts tool for finance and deploy it</span>
        <span className="blink inline-block w-2 h-4 bg-tape shrink-0" />
      </div>
      <div className="grid md:grid-cols-2">
        <div className="p-4 border-b md:border-b-0 md:border-r border-white/10">
          <div className="text-white/40 mb-3">apps · {TOOLS.length} · all behind acme.com login</div>
          {TOOLS.slice(0, 9).map(([name, team], i) => (
            <div key={name} className={`flex items-center justify-between py-1.5 whitespace-nowrap ${i === 3 ? 'text-tape' : 'text-white/85'}`}>
              <span>{i === 3 ? '● ' : '  '}{name}</span>
              <span className="text-white/40">{team}</span>
            </div>
          ))}
        </div>
        <div className="p-4">
          <div className="text-white/40 mb-3">audit log · live</div>
          <div className="relative h-[300px] overflow-hidden">
            <div className="stream">
              {[...LOG, ...LOG].map((row, i) => (
                <div key={i} className="flex gap-3 py-1.5 whitespace-nowrap">
                  <span className="text-white/35">{row[0]}</span>
                  <span className="text-white">{row[1]}</span>
                  <span className={row[2] === 'denied' || row[2] === 'revoked' ? 'text-[#FF8A7A]' : 'text-tape'}>{row[2]}</span>
                  <span className="text-white/60 truncate">{row[3]}</span>
                </div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1C1C20] to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
