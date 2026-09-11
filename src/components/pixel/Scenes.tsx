import Sprite from './Sprite';
import {
  SWIRL, APP, DESK_A, DESK_B, PERSON, ROBOT, CLOUD, LAPTOP, SIGN, PULL_REQUEST, CLOCK,
  LOCK_OPEN, LOCK_CLOSED, SKULL, WARN, FLAME, ARROW, CHECK, HEART,
} from './sprites';

function Stage({ h, children, className = '' }: { h: number; children: React.ReactNode; className?: string }) {
  return (
    <div className={`stage ${className}`} style={{ '--h': `${h}px` } as React.CSSProperties} aria-hidden="true">
      <div className="stage-inner">{children}</div>
    </div>
  );
}

function At({ x, y, children, className = '' }: { x: number; y: number; children: React.ReactNode; className?: string }) {
  return <div className={`absolute ${className}`} style={{ left: x, top: y }}>{children}</div>;
}

function Ground({ y }: { y: number }) {
  return <div className="absolute left-0 right-0 bg-ink" style={{ top: y, height: 4 }} />;
}

function Bubble({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <At x={x} y={y}>
      <div className="px-window px-3 py-1 font-pixel text-[15px] leading-none whitespace-nowrap">{children}</div>
    </At>
  );
}

function Label({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <At x={x} y={y}>
      <div className="font-pixel text-[16px] leading-none whitespace-nowrap">{children}</div>
    </At>
  );
}

function Desk({ x, y, shirt, hair = 'H' }: { x: number; y: number; shirt: string; hair?: string }) {
  const swap = { b: shirt, H: hair };
  return (
    <At x={x} y={y}>
      <div className="relative" style={{ width: 120, height: 64 }}>
        <Sprite rows={DESK_A} scale={4} swap={swap} className="frame-a absolute left-0 top-0" />
        <Sprite rows={DESK_B} scale={4} swap={swap} className="frame-b absolute left-0 top-0" />
      </div>
    </At>
  );
}

/* Four people, four terminals, four things being built. */
export function HeroScene() {
  return (
    <Stage h={300}>
      <Ground y={250} />
      <Desk x={20} y={186} shirt="b" />
      <Desk x={300} y={186} shirt="R" hair="h" />
      <Desk x={580} y={186} shirt="P" />
      <Desk x={860} y={186} shirt="O" hair="h" />
      <At x={40} y={122} className="bob-1"><Sprite rows={APP} scale={3} /></At>
      <At x={320} y={118} className="bob-2"><Sprite rows={APP} scale={3} swap={{ b: 'R' }} /></At>
      <At x={600} y={126} className="bob-3"><Sprite rows={APP} scale={3} swap={{ b: 'P' }} /></At>
      <At x={880} y={120} className="bob-4"><Sprite rows={APP} scale={3} swap={{ b: 'O' }} /></At>
      <Bubble x={120} y={70}>refunds thing, done</Bubble>
      <Bubble x={410} y={60}>shipping!!</Bubble>
      <Bubble x={690} y={76}>one more feature</Bubble>
      <Bubble x={960} y={66}>it works?!</Bubble>
    </Stage>
  );
}

/* Where it all ends up today. */
export function MessScene() {
  return (
    <Stage h={300}>
      <Ground y={250} />

      <At x={40} y={168}><Sprite rows={CLOUD} scale={5} /></At>
      <At x={70} y={132} className="bob-1"><Sprite rows={APP} scale={3} /></At>
      <At x={118} y={128}><Sprite rows={LOCK_OPEN} scale={3} /></At>
      <At x={150} y={150}><Sprite rows={SKULL} scale={3} /></At>
      <Label x={40} y={266}>someone&apos;s personal vercel</Label>

      <At x={330} y={210}><Sprite rows={LAPTOP} scale={5} /></At>
      <At x={352} y={174} className="bob-2"><Sprite rows={APP} scale={3} swap={{ b: 'R' }} /></At>
      <At x={396} y={150} className="flicker"><Sprite rows={FLAME} scale={3} /></At>
      <Label x={330} y={266}>the intern&apos;s laptop</Label>

      <At x={600} y={190}><Sprite rows={PULL_REQUEST} scale={5} /></At>
      <At x={612} y={150} className="bob-3"><Sprite rows={APP} scale={3} swap={{ b: 'P' }} /></At>
      <At x={676} y={152} className="flicker"><Sprite rows={CLOCK} scale={3} /></At>
      <Label x={594} y={266}>a PR waiting on an engineer</Label>

      <At x={880} y={200}><Sprite rows={SIGN} scale={5} /></At>
      <At x={892} y={162} className="bob-4"><Sprite rows={APP} scale={3} swap={{ b: 'O' }} /></At>
      <At x={946} y={150} className="flicker"><Sprite rows={WARN} scale={3} /></At>
      <Label x={870} y={266}>a public URL, by accident</Label>
    </Stage>
  );
}

/* Agents carry apps into Wirl. Policy checked on the way in; the app comes out locked. */
export function WirlScene() {
  const policy = ['login required', 'teams only', 'audit log on', 'no public URLs'];
  return (
    <Stage h={340}>
      <Ground y={290} />

      <At x={30} y={238} className="walk-1"><Sprite rows={ROBOT} scale={4} /></At>
      <At x={36} y={198} className="walk-1"><Sprite rows={APP} scale={3} /></At>
      <At x={120} y={238} className="walk-2"><Sprite rows={ROBOT} scale={4} swap={{ B: 'P' }} /></At>
      <At x={126} y={198} className="walk-2"><Sprite rows={APP} scale={3} swap={{ b: 'R' }} /></At>
      <Label x={30} y={302}>your agents</Label>

      <At x={300} y={236}><Sprite rows={ARROW} scale={5} /></At>

      <At x={380} y={150}><Sprite rows={CLOUD} scale={11} swap={{ W: 'L' }} /></At>
      <At x={460} y={172}><Sprite rows={SWIRL} scale={5} swap={{ K: 'k' }} /></At>
      <At x={540} y={120}><Sprite rows={LOCK_CLOSED} scale={6} /></At>
      <Label x={510} y={302}>Wirl</Label>

      <At x={640} y={232}><Sprite rows={ARROW} scale={4} /></At>
      <At x={684} y={212} className="bob-2"><Sprite rows={APP} scale={3} swap={{ b: 'g' }} /></At>
      <At x={700} y={176}><Sprite rows={LOCK_CLOSED} scale={3} /></At>
      <Label x={650} y={302}>the app, on Wirl</Label>

      <At x={790} y={110}>
        <div className="px-window w-[300px] p-4">
          <div className="font-pixel text-[20px] leading-none mb-3">governance policy</div>
          {policy.map((p) => (
            <div key={p} className="flex items-center gap-3 py-1.5 border-t-2 border-ink/15 font-pixel text-[17px] leading-none">
              <Sprite rows={CHECK} scale={3} /> {p}
            </div>
          ))}
          <div className="mt-3 font-term text-[20px] leading-none text-gb-mid">deploy: allowed <span className="blink">_</span></div>
        </div>
      </At>
    </Stage>
  );
}

/* Colleagues pass an app around and make it better. */
export function ShareScene() {
  return (
    <Stage h={240}>
      <Ground y={200} />
      <At x={190} y={144}><Sprite rows={PERSON} scale={4} /></At>
      <At x={520} y={144}><Sprite rows={PERSON} scale={4} swap={{ b: 'R', H: 'h' }} /></At>
      <At x={850} y={144}><Sprite rows={PERSON} scale={4} swap={{ b: 'P' }} /></At>
      <At x={366} y={124} className="bob-1"><Sprite rows={APP} scale={3} swap={{ b: 'g' }} /></At>
      <At x={696} y={124} className="bob-3"><Sprite rows={APP} scale={3} swap={{ b: 'g' }} /></At>
      <At x={580} y={112} className="bob-2"><Sprite rows={HEART} scale={3} /></At>
      <Bubble x={110} y={70}>fixed the export, try it</Bubble>
      <Bubble x={470} y={60}>nice. added a filter</Bubble>
      <Bubble x={790} y={74}>shipped it again</Bubble>
    </Stage>
  );
}

/* The admin's screen: every app, who can open it, and the log. */
const TEAMS = ['Fin', 'Sup', 'Eng', 'Ppl', 'Legal'];
const ROWS: [string, string, string, boolean[]][] = [
  ['customer-credits', 'sam', 'stripe · postgres', [false, true, false, false, false]],
  ['supplier-payments', 'claude', 'stripe · netsuite', [true, false, false, false, false]],
  ['candidate-pipeline', 'mei', 'greenhouse', [false, false, false, true, false]],
  ['incident-handover', 'omar', 'pagerduty · slack', [false, false, true, false, false]],
  ['nda-lookup', 'cursor', 'google drive', [false, false, false, false, true]],
  ['budget-lines', 'dana', 'sheets · postgres', [true, false, false, false, false]],
];

export function AdminPanel() {
  return (
    <div className="px-window max-w-4xl mx-auto">
      <div className="flex items-center justify-between px-4 py-2 border-b-[3px] border-ink bg-sand font-pixel text-[17px] leading-none">
        <span className="inline-flex items-center gap-2"><Sprite rows={SWIRL} scale={1.6} /> harbor.co · admin</span>
        <span className="inline-flex items-center gap-3"><span>apps</span><span className="text-dim">teams</span><span className="text-dim">log</span></span>
      </div>
      <div className="p-4 font-pixel text-[16px] leading-none overflow-x-auto">
        <div className="grid grid-cols-[1fr_72px_150px_repeat(5,44px)] gap-y-2 gap-x-2 items-center min-w-[660px]">
          <div className="text-dim">app</div>
          <div className="text-dim">built by</div>
          <div className="text-dim">uses</div>
          {TEAMS.map((t) => <div key={t} className="text-dim text-center">{t}</div>)}
          {ROWS.map(([name, by, uses, access]) => (
            <div key={name} className="contents">
              <div className="py-1">{name}</div>
              <div className="text-dim">{by}</div>
              <div className="text-dim truncate">{uses}</div>
              {access.map((on, i) => (
                <div key={i} className="flex justify-center">
                  <span className={`px-tag block w-5 h-5 ${on ? 'bg-gb-green' : 'bg-sand'}`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 py-3 border-t-[3px] border-ink bg-gb-dark text-gb-light font-term text-[19px] leading-tight scanlines">
        <div>09:42:05 priya@harbor.co denied nda-lookup · not in Legal</div>
        <div>09:43:01 Wirl revoked lee@harbor.co · left Finance</div>
        <div>09:43:20 omar@harbor.co opened incident-handover <span className="blink">_</span></div>
      </div>
    </div>
  );
}

/* The green screen. */
export function Terminal() {
  return (
    <div className="px-window-green max-w-3xl mx-auto p-5 font-term text-[22px] leading-tight scanlines">
      <div><span className="text-gb-green">$</span> claude mcp add --transport http wirl https://app.wirl.dev/mcp</div>
      <div className="mt-3"><span className="text-gb-green">&gt;</span> build a supplier payments tool for finance and deploy it</div>
      <div className="mt-3 pl-4">created   supplier-payments</div>
      <div className="pl-4">policy    login ok · teams ok · audit ok</div>
      <div className="pl-4">live      supplier-payments.harbor.wirl.app <span className="blink">_</span></div>
    </div>
  );
}
