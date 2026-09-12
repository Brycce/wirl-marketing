import Sprite from './Sprite';
import {
  SWIRL, APP, APP_BLANK, DUST, HAMMER, HARDHAT, BANG, CRANE, HOOK, DESK_A, DESK_B, PERSON, ROBOT, CLOUD, LAPTOP, SIGN, PULL_REQUEST, CLOCK,
  LOCK_OPEN, LOCK_CLOSED, SKULL, WARN, FLAME, CHECK, HEART,
} from './sprites';

function Stage({ h, children, className = '' }: { h: number; children: React.ReactNode; className?: string }) {
  return (
    <div className={`stage hidden sm:block ${className}`} style={{ '--h': `${h}px` } as React.CSSProperties} aria-hidden="true">
      <div className="stage-inner">{children}</div>
    </div>
  );
}

// The same scene, laid out again for a phone: 380px wide, full pixel size.
function StageM({ h, children, className = '' }: { h: number; children: React.ReactNode; className?: string }) {
  return (
    <div className={`stage-m sm:hidden ${className}`} style={{ '--h': `${h}px` } as React.CSSProperties} aria-hidden="true">
      <div className="stage-inner">{children}</div>
    </div>
  );
}

function At({ x, y, children, className = '' }: { x: number; y: number; children: React.ReactNode; className?: string }) {
  return <div className={`absolute ${className}`} style={{ left: x, top: y }}>{children}</div>;
}

function Ground({ y, h = 4 }: { y: number; h?: number }) {
  return <div className="absolute left-0 right-0 bg-ink" style={{ top: y, height: h }} />;
}

function Bubble({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <At x={x} y={y}>
      <div className="px-window px-3 py-1 font-pixel text-[15px] leading-none whitespace-nowrap">{children}</div>
    </At>
  );
}

function Label({ x, y, children, size = 16 }: { x: number; y: number; children: React.ReactNode; size?: number }) {
  return (
    <At x={x} y={y}>
      <div className="font-pixel leading-none whitespace-nowrap" style={{ fontSize: size }}>{children}</div>
    </At>
  );
}

function Desk({ x, y, shirt, hair = 'H', scale = 4 }: { x: number; y: number; shirt: string; hair?: string; scale?: number }) {
  const swap = { b: shirt, H: hair };
  return (
    <At x={x} y={y}>
      <div className="relative" style={{ width: 30 * scale, height: 16 * scale }}>
        <Sprite rows={DESK_A} scale={scale} swap={swap} className="frame-a absolute left-0 top-0" />
        <Sprite rows={DESK_B} scale={scale} swap={swap} className="frame-b absolute left-0 top-0" />
      </div>
    </At>
  );
}

/* Four people, four terminals, four things being built. */
export function HeroScene() {
  return (
    <>
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
    <StageM h={230}>
      <Ground y={200} h={3} />
      <Desk x={30} y={152} shirt="b" scale={3} />
      <Desk x={230} y={152} shirt="R" hair="h" scale={3} />
      <At x={44} y={112} className="bob-1"><Sprite rows={APP} scale={2.5} /></At>
      <At x={244} y={112} className="bob-2"><Sprite rows={APP} scale={2.5} swap={{ b: 'R' }} /></At>
      <Bubble x={60} y={62}>refunds thing, done</Bubble>
      <Bubble x={250} y={70}>it works?!</Bubble>
    </StageM>
    </>
  );
}

/* Where it all ends up today. */
export function MessScene() {
  return (
    <>
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
    <StageM h={380}>
      <Ground y={170} h={3} />
      <At x={30} y={138}><Sprite rows={CLOUD} scale={4} /></At>
      <At x={44} y={108} className="bob-1"><Sprite rows={APP} scale={2} /></At>
      <At x={76} y={106}><Sprite rows={LOCK_OPEN} scale={2} /></At>
      <At x={100} y={118}><Sprite rows={SKULL} scale={2} /></At>
      <Label x={20} y={180} size={14}>someone&apos;s personal vercel</Label>

      <At x={250} y={138}><Sprite rows={LAPTOP} scale={4} /></At>
      <At x={262} y={108} className="bob-2"><Sprite rows={APP} scale={2} swap={{ b: 'R' }} /></At>
      <At x={300} y={98} className="flicker"><Sprite rows={FLAME} scale={2} /></At>
      <Label x={242} y={180} size={14}>the intern&apos;s laptop</Label>

      <Ground y={340} h={3} />
      <At x={36} y={292}><Sprite rows={PULL_REQUEST} scale={4} /></At>
      <At x={46} y={262} className="bob-3"><Sprite rows={APP} scale={2} swap={{ b: 'P' }} /></At>
      <At x={94} y={262} className="flicker"><Sprite rows={CLOCK} scale={2} /></At>
      <Label x={14} y={350} size={14}>a PR waiting on an engineer</Label>

      <At x={262} y={300}><Sprite rows={SIGN} scale={4} /></At>
      <At x={272} y={268} className="bob-4"><Sprite rows={APP} scale={2} swap={{ b: 'O' }} /></At>
      <At x={312} y={256} className="flicker"><Sprite rows={WARN} scale={2} /></At>
      <Label x={212} y={350} size={14}>a public URL, by accident</Label>
    </StageM>
    </>
  );
}

/* Agents build an app and throw it into Wirl. Connections are checked on the way in; the app comes out locked. */
export function WirlScene() {
  const policy = ['login required', 'company-only by default', 'keys never in the app', 'audit log on', 'rolls back on its own'];
  return (
    <>
    <Stage h={340}>
      <Ground y={290} />

      {/* Two agents build something in a cartoon dust cloud, then throw it into Wirl. */}
      <At x={0} y={146}><Sprite rows={CRANE} scale={4} /></At>
      <At x={140} y={166}>
        <div className="relative overflow-hidden" style={{ width: 16, height: 70 }}>
          <div className="hook-drop absolute left-0 top-0" style={{ width: 16, height: 70 }}>
            <div className="absolute bg-ink" style={{ left: 6, top: 0, width: 3, height: 52 }} />
            <Sprite rows={HOOK} scale={3} className="absolute" style={{ left: 0, top: 52 }} />
          </div>
        </div>
      </At>
      <At x={60} y={238} className="jig">
        <div className="relative">
          <Sprite rows={ROBOT} scale={4} />
          <Sprite rows={HARDHAT} scale={4} className="absolute" style={{ left: 4, top: -8 }} />
        </div>
      </At>
      <At x={170} y={238} className="jig">
        <div className="hop-b relative">
          <Sprite rows={ROBOT} scale={4} swap={{ B: 'P' }} />
          <Sprite rows={HARDHAT} scale={4} className="absolute" style={{ left: 4, top: -8 }} />
        </div>
      </At>
      <At x={176} y={196} className="fly-in"><Sprite rows={APP} scale={3} /></At>

      <At x={30} y={186} className="dust"><Sprite rows={DUST} scale={9} /></At>
      <At x={196} y={160} className="hammer"><Sprite rows={HAMMER} scale={4} /></At>
      <At x={52} y={172} className="bang-1"><Sprite rows={BANG} scale={3} /></At>
      <At x={150} y={150} className="bang-2"><Sprite rows={BANG} scale={3} /></At>
      <At x={236} y={210} className="bang-3"><Sprite rows={BANG} scale={3} /></At>
      <At x={120} y={176} className="hat-fly"><Sprite rows={HARDHAT} scale={4} /></At>

      <Label x={60} y={302}>your agents</Label>

      {/* Wirl: the cloud shakes when the app goes in. */}
      <At x={380} y={150} className="cloud-shake">
        <div className="relative">
          <Sprite rows={CLOUD} scale={11} swap={{ W: 'L' }} />
          <Sprite rows={SWIRL} scale={5} swap={{ K: 'k' }} className="absolute" style={{ left: 80, top: 22 }} />
          <Sprite rows={LOCK_CLOSED} scale={6} className="absolute" style={{ left: 160, top: -30 }} />
        </div>
      </At>
      <Label x={510} y={302}>Wirl</Label>

      {/* Sparks where it comes out. */}
      <At x={606} y={178} className="spark"><div className="w-2 h-2 bg-ink" /></At>
      <At x={620} y={196} className="spark"><div className="w-2 h-2 bg-ink" /></At>
      <At x={598} y={206} className="spark"><div className="w-2 h-2 bg-ink" /></At>

      {/* The app, on Wirl: green bar, the mark on it, a lock over it. */}
      <At x={596} y={190} className="spit">
        <div className="relative" style={{ width: 60, height: 45 }}>
          <Sprite rows={APP_BLANK} scale={5} swap={{ b: 'g' }} />
          <Sprite rows={SWIRL} scale={2} className="absolute" style={{ left: 18, top: 18 }} />
          <Sprite rows={LOCK_CLOSED} scale={3} className="pop absolute" style={{ left: 18, top: -30 }} />
        </div>
      </At>
      <Label x={650} y={302}>the app, on Wirl</Label>

      <At x={790} y={64}>
        <div className="px-window w-[300px] p-4">
          <div className="font-pixel text-[20px] leading-none mb-3">governance, built in</div>
          {policy.map((p) => (
            <div key={p} className="flex items-center gap-3 py-1.5 border-t-2 border-ink/15 font-pixel text-[17px] leading-none">
              <Sprite rows={CHECK} scale={3} /> {p}
            </div>
          ))}
          <div className="mt-3 font-term text-[20px] leading-none text-gb-mid">deployed · company-only · 1 key needed <span className="blink">_</span></div>
        </div>
      </At>
    </Stage>
    <StageM h={500}>
      <Ground y={190} h={3} />
      <At x={0} y={64}><Sprite rows={CRANE} scale={3.5} /></At>
      <At x={122} y={80}>
        <div className="relative overflow-hidden" style={{ width: 16, height: 70 }}>
          <div className="hook-drop absolute left-0 top-0" style={{ width: 16, height: 70 }}>
            <div className="absolute bg-ink" style={{ left: 6, top: 0, width: 3, height: 52 }} />
            <Sprite rows={HOOK} scale={3} className="absolute" style={{ left: 0, top: 52 }} />
          </div>
        </div>
      </At>
      <At x={60} y={151} className="jig">
        <div className="relative">
          <Sprite rows={ROBOT} scale={3} />
          <Sprite rows={HARDHAT} scale={3} className="absolute" style={{ left: 3, top: -6 }} />
        </div>
      </At>
      <At x={120} y={151} className="jig">
        <div className="hop-b relative">
          <Sprite rows={ROBOT} scale={3} swap={{ B: 'P' }} />
          <Sprite rows={HARDHAT} scale={3} className="absolute" style={{ left: 3, top: -6 }} />
        </div>
      </At>
      <At x={126} y={118} className="fly-in-m"><Sprite rows={APP} scale={2.5} /></At>
      <At x={30} y={110} className="dust"><Sprite rows={DUST} scale={6} /></At>
      <At x={150} y={96} className="hammer"><Sprite rows={HAMMER} scale={3} /></At>
      <At x={44} y={100} className="bang-1"><Sprite rows={BANG} scale={2} /></At>
      <At x={110} y={88} className="bang-2"><Sprite rows={BANG} scale={2} /></At>
      <At x={170} y={140} className="bang-3"><Sprite rows={BANG} scale={2} /></At>
      <At x={90} y={100} className="hat-fly"><Sprite rows={HARDHAT} scale={3} /></At>
      <Label x={56} y={198} size={14}>your agents</Label>

      <At x={200} y={20} className="cloud-shake">
        <div className="relative">
          <Sprite rows={CLOUD} scale={7} swap={{ W: 'L' }} />
          <Sprite rows={SWIRL} scale={3} swap={{ K: 'k' }} className="absolute" style={{ left: 50, top: 12 }} />
          <Sprite rows={LOCK_CLOSED} scale={4} className="absolute" style={{ left: 112, top: -18 }} />
        </div>
      </At>
      <Label x={258} y={84} size={14}>Wirl</Label>

      <At x={330} y={62} className="spark"><div className="w-1.5 h-1.5 bg-ink" /></At>
      <At x={340} y={76} className="spark"><div className="w-1.5 h-1.5 bg-ink" /></At>
      <At x={326} y={88} className="spark"><div className="w-1.5 h-1.5 bg-ink" /></At>
      <At x={330} y={70} className="spit-m">
        <div className="relative" style={{ width: 30, height: 22 }}>
          <Sprite rows={APP_BLANK} scale={2.5} swap={{ b: 'g' }} />
          <Sprite rows={SWIRL} scale={1} className="absolute" style={{ left: 9, top: 9 }} />
          <Sprite rows={LOCK_CLOSED} scale={2} className="pop absolute" style={{ left: 7, top: -18 }} />
        </div>
      </At>
      <Label x={252} y={198} size={14}>the app, on Wirl</Label>

      <At x={20} y={232}>
        <div className="px-window w-[340px] p-4">
          <div className="font-pixel text-[20px] leading-none mb-3">governance, built in</div>
          {policy.map((p) => (
            <div key={p} className="flex items-center gap-3 py-1.5 border-t-2 border-ink/15 font-pixel text-[17px] leading-none">
              <Sprite rows={CHECK} scale={3} /> {p}
            </div>
          ))}
          <div className="mt-3 font-term text-[20px] leading-none text-gb-mid">deployed · company-only · 1 key needed <span className="blink">_</span></div>
        </div>
      </At>
    </StageM>
    </>
  );
}

/* Colleagues pass an app around and make it better. */
export function ShareScene() {
  return (
    <>
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
    <StageM h={220}>
      <Ground y={180} h={3} />
      <At x={40} y={138}><Sprite rows={PERSON} scale={3} /></At>
      <At x={175} y={138}><Sprite rows={PERSON} scale={3} swap={{ b: 'R', H: 'h' }} /></At>
      <At x={310} y={138}><Sprite rows={PERSON} scale={3} swap={{ b: 'P' }} /></At>
      <At x={108} y={118} className="bob-1"><Sprite rows={APP_BLANK} scale={2.5} swap={{ b: 'g' }} /></At>
      <At x={244} y={118} className="bob-3"><Sprite rows={APP_BLANK} scale={2.5} swap={{ b: 'g' }} /></At>
      <At x={190} y={108} className="bob-2"><Sprite rows={HEART} scale={2} /></At>
      <Bubble x={8} y={70}>fixed the export</Bubble>
      <Bubble x={128} y={34}>nice. added a filter</Bubble>
      <Bubble x={246} y={74}>shipped it again</Bubble>
    </StageM>
    </>
  );
}

/* The admin's screen: every app, who can open it, and the log. */
// The product's own columns. "Built by" is a person; the agent is how, not who.
const ROWS: [string, string, string, string, string][] = [
  ['customer-credits', 'sam · via Claude Code', 'stripe · postgres', 'Company', 'api.stripe.com · 09:41'],
  ['supplier-payments', 'dana · via Claude Code', 'stripe · netsuite (needs a key)', '3 people', '—'],
  ['candidate-pipeline', 'mei · via Cursor', 'greenhouse', 'Company', 'api.greenhouse.io · 09:12'],
  ['incident-handover', 'omar · via Claude Code', 'pagerduty · slack', 'Company', 'events.pagerduty.com · 09:03'],
  ['nda-lookup', 'priya · by hand', 'google-drive', '2 people', 'www.googleapis.com · 08:55'],
];

export function AdminPanel() {
  return (
    <div className="px-window max-w-5xl mx-auto">
      <div className="flex items-center justify-between px-4 py-2 border-b-[3px] border-ink bg-sand font-pixel text-[17px] leading-none">
        <span className="inline-flex items-center gap-2"><Sprite rows={SWIRL} scale={1.6} /> harbor.co · admin</span>
        <span className="inline-flex items-center gap-3"><span>apps</span><span className="text-dim">connections</span><span className="text-dim">activity</span></span>
      </div>
      <div className="p-4 font-pixel text-[16px] leading-none overflow-x-auto">
        <div className="grid grid-cols-[150px_180px_240px_100px_1fr] gap-y-2 gap-x-3 items-center min-w-[920px]">
          <div className="text-dim">app</div>
          <div className="text-dim">built by</div>
          <div className="text-dim">uses</div>
          <div className="text-dim">who can open it</div>
          <div className="text-dim">last called</div>
          {ROWS.map(([name, by, uses, who, last]) => (
            <div key={name} className="contents">
              <div className="py-1 truncate">{name}</div>
              <div className="text-dim truncate">{by}</div>
              <div className="text-dim truncate">{uses}</div>
              <div className="truncate">{who}</div>
              <div className="text-dim truncate">{last}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 py-3 border-t-[3px] border-ink bg-gb-dark text-gb-light font-term text-[19px] leading-tight scanlines">
        <div>09:42:05 priya@harbor.co denied nda-lookup · not shared</div>
        <div>09:43:01 dana@harbor.co revoked stripe for supplier-payments</div>
        <div>09:43:20 omar@harbor.co opened incident-handover</div>
        <div>09:44:10 wirl rolled supplier-payments back v4 → v3 · 5 failures <span className="blink">_</span></div>
      </div>
    </div>
  );
}

/* The green screen. */
export function Terminal() {
  return (
    <div className="px-window-green max-w-3xl mx-auto p-5 font-term text-[22px] leading-tight scanlines">
      <div><span className="text-gb-green">$</span> claude mcp add wirl -- npx -y @wirl/mcp</div>
      <div className="mt-3"><span className="text-gb-green">&gt;</span> build a supplier payments tool for finance and deploy it</div>
      <div className="mt-3 pl-4">Deployed supplier-payments v1 (3 files).</div>
      <div className="pl-4">https://harbor--supplier-payments.wirl.app</div>
      <div className="pl-4">Visible to everyone at harbor.co. Share by name to add someone outside it.</div>
      <div className="mt-3 pl-4">Needs a key: stripe. Add it here and the app starts working:</div>
      <div className="pl-4">https://app.wirl.dev/apps/harbor/supplier-payments/connections <span className="blink">_</span></div>
    </div>
  );
}
