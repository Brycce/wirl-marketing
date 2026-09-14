import { Scene, Piece, Ground, Person, Robot, AppCard, Cloud, Laptop, Desk, Warn, Flame, Clock, Spark, Defs, P, Road, Flag, Barrier, RainCloud, Doorway } from './Paper';
import { PaperSnail } from './Snail';

/* The snail is the app. The hero: the company's door, and its apps streaming
   out of it onto the link. Each snail is one app; the lock on the door is the
   sign-in every one of them passes. */
export function HeroScene() {
  const id = 'hero';
  return (
    <Scene id={id} w={380} h={330}>
      <Road id={id} x={-10} y={228} w={400} h={64} label="harbor--supplier-payments.wirl.run" />
      <Person id={id} x={18} y={140} shirt={P.coral} skin={3} hair={3} style="curly" />
      <Person id={id} x={70} y={140} shirt={P.lilac} skin={2} hair={2} style="bun" />
      <Piece id={id} x={258} y={78} flat><rect x="8" y="8" width="44" height="150" fill={P.ink} /></Piece>
      <g className="lane lane-1"><PaperSnail id={id} x={318} y={172} s={0.82} fast locked /></g>
      <g className="lane lane-2"><PaperSnail id={id} x={318} y={172} s={0.82} fast locked shell={P.coral} body="#BFD9EA" spiral={P.paper} /></g>
      <g className="lane lane-3"><PaperSnail id={id} x={318} y={172} s={0.82} fast locked shell={P.lilac} body="#F0C9BC" /></g>
      <Doorway id={id} x={258} y={78} h={158} wall={130} name="harbor.co" hollow />
    </Scene>
  );
}

/* Kept for the concept page. */
export function DeskScene() {
  const id = 'desk';
  return (
    <Scene id={id} w={380} h={330}>
      <Cloud id={id} x={236} y={14} s={0.5} tone="#FFFFFF" />
      <AppCard id={id} x={168} y={40} tone={P.coral} r={3} className="float-2" />
      <Person id={id} x={70} y={178} shirt={P.coral} skin={0} hair={0} style="cap" sit />
      <Desk id={id} x={28} y={228} w={250} />
      <Laptop id={id} x={150} y={181} />
      <Robot id={id} x={296} y={190} />
      <Ground id={id} y={258} x={14} w={352} />
    </Scene>
  );
}

/* Point the agent at Wirl: the agent walks a new app up to the door, it goes
   in, and it comes out the other side wearing its lock, over to the person
   who asked for it. Ten seconds. */
export function WirlScene() {
  const id = 'wirl';
  return (
    <Scene id={id} w={420} h={300}>
      <Road id={id} x={-10} y={228} w={440} h={56} />
      <Piece id={id} x={196} y={70} flat><rect x="8" y="8" width="44" height="152" fill={P.ink} /></Piece>
      <g className="door-in"><PaperSnail id={id} x={56} y={175} s={0.75} flip fast shell={P.coral} body="#BFD9EA" spiral={P.paper} /></g>
      <g className="door-out"><PaperSnail id={id} x={236} y={175} s={0.75} flip fast locked shell={P.coral} body="#BFD9EA" spiral={P.paper} /></g>
      <Doorway id={id} x={196} y={70} h={160} wall={70} name="harbor.co" hollow />
      <Robot id={id} x={16} y={150} arms="up" />
      <Person id={id} x={364} y={138} shirt={P.blue} skin={1} hair={1} style="long" />
      <Spark id={id} x={290} y={160} className="spark-a" />
    </Scene>
  );
}

/* Share: one colleague sends the app over, the other improves it, and it comes
   back with a star on its shell. Eight seconds. */
export function ShareScene() {
  const id = 'share';
  return (
    <Scene id={id} w={400} h={240}>
      <Road id={id} x={-10} y={176} w={420} h={50} />
      <Person id={id} x={40} y={86} shirt={P.coral} skin={3} hair={3} style="curly" />
      <Person id={id} x={316} y={86} shirt={P.lilac} skin={2} hair={2} style="cap" />
      <Spark id={id} x={300} y={72} className="spark-c" />
      <g className="ferry"><PaperSnail id={id} x={92} y={130} s={0.7} flip fast locked star shell={P.lilac} body="#F0C9BC" /></g>
    </Scene>
  );
}

/* Where internal tools live today: four small sheets, each a bad idea. */
const mess: { tilt: string; art: React.ReactNode }[] = [
  {
    tilt: '-rotate-1',
    art: (
      <Scene id="m1" w={120} h={92}>
        <RainCloud id="m1" x={18} y={0} s={0.8} />
        <PaperSnail id="m1" x={14} y={44} s={0.7} shell={P.blue} body={P.slate} spiral={P.paper} />
      </Scene>
    ),
  },
  {
    tilt: 'rotate-1',
    art: (
      <Scene id="m2" w={120} h={92}>
        <Laptop id="m2" x={22} y={40} s={1.05} />
        <PaperSnail id="m2" x={30} y={2} s={0.5} shell={P.coral} body="#F0C9BC" spiral={P.paper} />
        <Flame id="m2" x={88} y={14} s={1} className="flicker-soft" />
      </Scene>
    ),
  },
  {
    tilt: 'rotate-2',
    art: (
      <Scene id="m3" w={120} h={92}>
        <Barrier id="m3" x={66} y={36} s={0.65} />
        <PaperSnail id="m3" x={0} y={40} s={0.62} flip shell={P.lilac} body="#BFDCC5" />
        <Clock id="m3" x={92} y={4} s={0.9} />
      </Scene>
    ),
  },
  {
    tilt: '-rotate-2',
    art: (
      <Scene id="m4" w={120} h={92}>
        <Road id="m4" x={-20} y={60} w={80} h={24} />
        <PaperSnail id="m4" x={56} y={38} s={0.6} flip shell={P.sun} body="#9CC5A5" />
        <Warn id="m4" x={90} y={6} />
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
const shells = [P.blue, P.coral, P.lilac, P.sun, '#8FD39A'];

function MiniSnail({ id, shell }: { id: string; shell: string }) {
  return (
    <svg viewBox="0 0 120 80" width="30" height="20" aria-hidden="true" focusable="false" className="block">
      <Defs id={id} />
      <PaperSnail id={id} x={0} y={4} s={0.95} flip shell={shell} spiral={shell === P.sun || shell === '#8FD39A' ? P.ink : P.paper} locked />
    </svg>
  );
}

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
            <col className="w-[30px]" /><col className="w-[21%]" /><col className="w-[22%]" /><col className="w-[18%]" /><col className="w-[14%]" /><col className="w-[15%]" />
          </colgroup>
          <thead>
            <tr className="text-[10.5px] uppercase tracking-wider text-dim">
              {['', 'app', 'built by', 'uses', 'who can open it', 'last called'].map((h) => (
                <th key={h || 'snail'} className="text-left font-semibold pb-2 pr-2 border-b border-sand align-bottom">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r[0]} className="border-b border-sand/70 last:border-0">
                <td className="py-2 pr-1"><MiniSnail id={`row-${i}`} shell={shells[i]} /></td>
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

/* The finish. The company's apps cross the line in half a second. */
export function RaceScene() {
  const id = 'race';
  return (
    <svg viewBox="0 0 560 130" width="100%" className="block h-auto" aria-hidden="true" focusable="false">
      <Defs id={id} />
      <Road id={id} x={-10} y={54} w={580} h={76} tone="#E9D9A8" />
      <Piece id={id} x={60} y={54} flat><rect width="14" height="76" fill={P.ink} opacity="0.85" /><rect width="14" height="76" fill="url(#check)" /></Piece>
      <Flag id={id} x={40} y={-30} s={0.9} />
      <g className="race-1"><PaperSnail id={id} x={420} y={6} s={0.55} fast locked /></g>
      <g className="race-2"><PaperSnail id={id} x={470} y={44} s={0.55} fast locked shell={P.coral} body="#BFD9EA" spiral={P.paper} /></g>
      <g className="race-3"><PaperSnail id={id} x={440} y={82} s={0.55} fast locked shell={P.lilac} body="#F0C9BC" /></g>
    </svg>
  );
}
