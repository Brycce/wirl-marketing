// The problem, as things you would actually find: where the tools are today.
// Desktop gets the full scatter. Small screens get four, kept clear of the text.
const MESS: [string, string, number, number][] = [
  ['personal Vercel account', 'drift-1', 8, 22],
  ['shared password in Notion', 'drift-2', 72, 14],
  ['public URL, by accident', 'drift-3', 84, 62],
  ['no auth at all', 'drift-2', 14, 70],
  ['link is in Slack, somewhere', 'drift-1', 60, 82],
  ['"who owns this?"', 'drift-3', 5, 47],
  ['intern’s laptop', 'drift-1', 82, 34],
  ['nobody has the list', 'drift-2', 42, 12],
];

const MESS_SMALL: [string, string, number, number][] = [
  ['personal Vercel account', 'drift-1', 6, 5],
  ['shared password in Notion', 'drift-2', 40, 12],
  ['no auth at all', 'drift-3', 10, 90],
  ['nobody has the list', 'drift-1', 50, 84],
];

function Pill({ label, drift, x, y, faded, className }: { label: string; drift: string; x: number; y: number; faded: boolean; className: string }) {
  return (
    <span
      className={`${drift} ${className} absolute rounded-full bg-white border border-rule px-3 py-1 text-[13px] whitespace-nowrap ${faded ? 'opacity-50' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

export default function MessPills({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-3xl bg-panel overflow-hidden h-[420px] md:h-[420px] flex items-center justify-center">
      {MESS.map(([label, drift, x, y], i) => (
        <Pill key={label} label={label} drift={drift} x={x} y={y} faded={i % 3 === 2} className="hidden md:inline-block" />
      ))}
      {MESS_SMALL.map(([label, drift, x, y], i) => (
        <Pill key={label} label={label} drift={drift} x={x} y={y} faded={i % 2 === 1} className="md:hidden" />
      ))}
      <div className="relative z-10 text-center px-6">{children}</div>
    </div>
  );
}
