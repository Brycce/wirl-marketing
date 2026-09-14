import { Scene, Piece, Ground, Person, Robot, AppCard, Cloud, Lock, Laptop, Desk, Warn, Flame, Clock, Skull, Spark, Defs, P } from './Paper';
import { PaperSnail } from './Snail';

/* One person at a desk, an agent beside them, and the apps they are making.
   Fewer, bigger pieces: the panel is small, so every sheet has to read. */
export function HeroScene() {
  const id = 'hero';
  return (
    <Scene id={id} w={380} h={330}>
      <Cloud id={id} x={236} y={14} s={0.5} tone="#FFFFFF" />
      <AppCard id={id} x={54} y={82} tone={P.blue} r={-5} className="float-1" />
      <AppCard id={id} x={168} y={40} tone={P.coral} r={3} className="float-2" />
      <Person id={id} x={70} y={178} shirt={P.coral} skin={0} hair={0} style="cap" sit />
      <Desk id={id} x={28} y={228} w={250} />
      <Laptop id={id} x={150} y={181} />
      <Robot id={id} x={296} y={190} />
      <Ground id={id} y={258} x={14} w={352} />
      <g className="idle idle-1"><PaperSnail id={id} x={236} y={207} s={0.3} /></g>
    </Scene>
  );
}

/* The agent hands the app up, the cloud takes it, and it comes back out on Wirl. */
export function WirlScene() {
  const id = 'wirl';
  return (
    <Scene id={id} w={420} h={300}>
      <g className="cloud-puff">
        <Cloud id={id} x={100} y={30} />
        <Lock id={id} x={194} y={72} s={0.9} />
      </g>
      <Spark id={id} x={82} y={40} className="spark-a" />
      <Spark id={id} x={334} y={26} className="spark-b" />
      <Robot id={id} x={30} y={200} arms="up" />
      <AppCard id={id} x={70} y={168} tone={P.coral} r={-6} className="ship-in" />
      <AppCard id={id} x={174} y={96} onWirl className="ship-out" />
      <Person id={id} x={356} y={180} shirt={P.blue} skin={1} hair={1} style="long" />
      <Ground id={id} y={270} x={14} w={392} />
      <g className="idle idle-2"><PaperSnail id={id} x={2} y={252} s={0.25} flip shell={P.coral} body="#BFD9EA" spiral={P.paper} /></g>
    </Scene>
  );
}

/* One colleague hands an app to another; it comes back with one more thing in it. */
export function ShareScene() {
  const id = 'share';
  return (
    <Scene id={id} w={400} h={240}>
      <Person id={id} x={40} y={110} shirt={P.coral} skin={3} hair={3} style="curly" />
      <Person id={id} x={316} y={110} shirt={P.lilac} skin={2} hair={2} style="cap" />
      <AppCard id={id} x={96} y={124} onWirl r={-4} className="pass-a" />
      <AppCard id={id} x={96} y={124} onWirl extra r={-4} className="pass-b" />
      <Spark id={id} x={342} y={86} className="spark-c" />
      <Ground id={id} y={200} x={10} w={380} />
      <g className="idle idle-3"><PaperSnail id={id} x={262} y={182} s={0.25} shell={P.lilac} body="#F0C9BC" /></g>
    </Scene>
  );
}

/* Where internal tools live today: four small sheets, each a bad idea. */
const mess: { tilt: string; art: React.ReactNode }[] = [
  {
    tilt: '-rotate-1',
    art: (
      <Scene id="m1" w={120} h={92}>
        <Cloud id="m1" x={2} y={28} s={0.5} />
        <AppCard id="m1" x={30} y={6} w={52} h={40} tone={P.blue} r={-4} />
        <Lock id="m1" x={80} y={40} s={0.55} open />
        <Skull id="m1" x={12} y={56} s={0.9} />
      </Scene>
    ),
  },
  {
    tilt: 'rotate-1',
    art: (
      <Scene id="m2" w={120} h={92}>
        <Laptop id="m2" x={16} y={36} s={1.05} />
        <Flame id="m2" x={80} y={8} s={1.1} className="flicker-soft" />
      </Scene>
    ),
  },
  {
    tilt: 'rotate-2',
    art: (
      <Scene id="m3" w={120} h={92}>
        <AppCard id="m3" x={16} y={18} w={70} h={54} tone={P.grey} r={-2} />
        <Clock id="m3" x={82} y={8} />
      </Scene>
    ),
  },
  {
    tilt: '-rotate-2',
    art: (
      <Scene id="m4" w={120} h={92}>
        <Piece id="m4" x={54} y={34}><rect width="7" height="58" fill={P.dark} /></Piece>
        <Piece id="m4" x={18} y={16}>
          <rect width="78" height="30" rx="5" fill={P.coral} />
          <circle cx="17" cy="15" r="8" fill={P.sky} />
          <ellipse cx="17" cy="15" rx="3.5" ry="8" fill={P.blue} opacity="0.55" />
          <rect x="31" y="11" width="38" height="8" rx="4" fill={P.paper} />
        </Piece>
        <Warn id="m4" x={90} y={2} />
      </Scene>
    ),
  },
];

export function MessTiles({ labels }: { labels: [string, string, string, string] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5">
      {mess.map((t, i) => (
        <div key={labels[i]} className={`paper p-4 ${t.tilt}`}>
          <div className="mx-auto w-[120px]">{t.art}</div>
          <p className="mt-3 text-center text-[13.5px] font-medium leading-snug">{labels[i]}</p>
        </div>
      ))}
    </div>
  );
}

/* A small robot for the agent cards. */
export function RobotIcon({ id, tone }: { id: string; tone: string }) {
  return (
    <svg viewBox="0 0 48 72" width="34" height="51" aria-hidden="true" focusable="false">
      <Defs id={id} />
      <Robot id={id} x={0} y={2} tone={tone} />
    </svg>
  );
}

/* The admin's screen: every app, who built it, what it uses, who can open it. */
const rows: [string, string, string, string, string][] = [
  ['supplier-payments', 'Priya N. · Claude Code', 'Stripe, Postgres', '4 people', '2 min ago'],
  ['candidate-pipeline', 'Tom A. · Cursor', 'Greenhouse', 'everyone', '1 h ago'],
  ['incident-handover', 'Lena K. · by hand', 'PagerDuty, Slack', '9 people', '3 h ago'],
  ['nda-lookup', 'Sam O. · Codex', 'Drive · key needed', '3 people', 'yesterday'],
  ['budget-lines', 'Mia R. · Claude Code', 'Postgres', 'everyone', '4 days ago'],
];

const log = [
  ['09:41', 'wirl rolled supplier-payments back to v3 · 5 failures in 12 min'],
  ['09:12', 'priya@harbor.co set the Stripe key for supplier-payments · browser to vault'],
  ['08:58', 'sam@harbor.co was refused at incident-handover'],
];

export function AdminTable() {
  return (
    <div className="paper p-5 md:p-6 text-left">
      <div className="flex items-center justify-between text-[13px]">
        <span className="font-semibold">harbor.co</span>
        <span className="text-dim">5 apps · 3 admins</span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[440px] md:min-w-0 table-fixed text-[12.5px] leading-snug">
          <colgroup>
            <col className="w-[25%]" /><col className="w-[25%]" /><col className="w-[20%]" /><col className="w-[15%]" /><col className="w-[15%]" />
          </colgroup>
          <thead>
            <tr className="text-[10.5px] uppercase tracking-wider text-dim">
              {['app', 'built by', 'uses', 'who can open it', 'last called'].map((h) => (
                <th key={h} className="text-left font-semibold pb-2 pr-2 border-b border-sand align-bottom">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-sand/70 last:border-0">
                <td className="py-2 pr-2 font-mono text-[11.5px] break-words">{r[0]}</td>
                <td className="py-2 pr-2 text-ink/85">{r[1]}</td>
                <td className="py-2 pr-2 text-ink/85">{r[2]}</td>
                <td className="py-2 pr-2 text-ink/85">{r[3]}</td>
                <td className="py-2 text-dim">{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 paper-dark px-4 py-3 font-mono text-[12px] leading-relaxed">
        {log.map(([t, line]) => (
          <div key={line} className="flex gap-3">
            <span className="text-mint/60">{t}</span>
            <span className="text-mint">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
