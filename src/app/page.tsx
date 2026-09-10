import Link from 'next/link';
import Wordmark from '@/components/Wordmark';
import WaitlistForm from '@/components/WaitlistForm';
import { HeroScene, MessScene, WirlScene, ShareScene, AdminPanel, Terminal } from '@/components/pixel/Scenes';

const situations = [
  {
    title: 'Finance needs a tool by Friday.',
    body: 'Someone describes it to an agent on Tuesday. It is live behind the company sign-in that afternoon, and only Finance can open it. Nobody filed a ticket, and nobody had to wire up a login.',
  },
  {
    title: 'An agent ships something at 2am.',
    body: 'It cannot ship it public, and it cannot ship it to everyone. Whatever it built is a wirl by morning, with the team it picked and a record of what it did.',
  },
  {
    title: 'Security asks for the list.',
    body: 'You send the list. Every wirl, who can open it, and what happened inside each one. It took a minute, not a week of asking around.',
  },
];

const wrap = 'max-w-6xl mx-auto px-6';
const h2 = 'font-pixel font-bold leading-[1.05] text-balance';

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <nav className={`${wrap} flex items-center justify-between py-5`}>
        <Link href="/"><Wordmark /></Link>
        <div className="flex items-center gap-5 font-pixel text-[17px] leading-none">
          <Link href="/docs" className="hidden sm:inline text-dim hover:text-ink">Docs</Link>
          <a href="https://app.wirl.dev/login" className="hidden sm:inline text-dim hover:text-ink">Log in</a>
          <a href="#waitlist" className="px-btn px-4 py-2">Join the waitlist</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-12 md:pt-20 pb-6 text-center">
        <div className={wrap}>
          <h1 className={`${h2} text-[2.75rem] sm:text-6xl md:text-[4.5rem] max-w-[14ch] mx-auto`}>
            Let your people build.
          </h1>
          <p className="mt-6 text-[17px] md:text-lg leading-relaxed max-w-[48ch] mx-auto text-ink/85">
            Wirl hosts the internal tools your team builds, by hand or with agents. Each ships as a wirl: a URL behind your login, a team that can open it, and a log of what happens.
          </p>
          <p className="mt-3 font-pixel text-[18px] text-dim leading-none">
            Fun for the people building. Boring for the people responsible. On purpose.
          </p>
          <div className="mt-8">
            <WaitlistForm id="waitlist-email-hero" center />
          </div>
        </div>
        <div className="mt-12 overflow-hidden">
          <HeroScene />
        </div>
      </section>

      {/* The mess */}
      <section className="bg-sand border-y-[3px] border-ink">
        <div className={`${wrap} py-16 md:py-20 text-center`}>
          <h2 className={`${h2} text-3xl md:text-5xl max-w-[22ch] mx-auto`}>Right now their apps live everywhere.</h2>
          <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[54ch] mx-auto">
            A dashboard on a personal Vercel account. A tool on the intern&apos;s laptop. A password in a Notion page. A URL that was never meant to be public. Nobody has the list, and nobody knows which of them can read customer data.
          </p>
          <div className="mt-10 overflow-hidden">
            <MessScene />
          </div>
        </div>
      </section>

      {/* Wirl */}
      <section className={`${wrap} py-16 md:py-24 text-center`}>
        <h2 className={`${h2} text-3xl md:text-5xl max-w-[22ch] mx-auto`}>Give their agents a place to ship.</h2>
        <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[56ch] mx-auto">
          Point Claude Code or Cursor at Wirl. When it deploys, the app lands as a wirl: behind your login, open only to the teams you pick, logged. Your governance policy is checked at deploy time, not in a review three weeks later.
        </p>
        <div className="mt-10 overflow-hidden">
          <WirlScene />
        </div>
        <div className="mt-10">
          <Terminal />
        </div>
      </section>

      {/* Share */}
      <section className="bg-gb-pale border-y-[3px] border-ink">
        <div className={`${wrap} py-16 md:py-20 text-center`}>
          <h2 className={`${h2} text-3xl md:text-5xl max-w-[22ch] mx-auto`}>Share it. Improve it. Wirl it again.</h2>
          <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[54ch] mx-auto">
            A wirl has a URL your colleagues can open with the login they already have. They can fork it, fix it, and ship it back. Every version is a wirl too, and every one of them is on the list.
          </p>
          <div className="mt-8 overflow-hidden">
            <ShareScene />
          </div>
        </div>
      </section>

      {/* Admin */}
      <section className={`${wrap} py-16 md:py-24 text-center`}>
        <h2 className={`${h2} text-3xl md:text-5xl max-w-[22ch] mx-auto`}>You decide who can open what.</h2>
        <p className="mt-5 text-[15px] md:text-base text-dim leading-relaxed max-w-[56ch] mx-auto">
          One screen with every wirl, the teams that can reach it, and everything that happened inside. Turn a team off and they are out of every wirl that team could open. Export the log when security asks.
        </p>
        <div className="mt-10">
          <AdminPanel />
        </div>
      </section>

      {/* Three situations */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <div className="grid md:grid-cols-3 gap-8 border-t-[3px] border-ink pt-12">
          {situations.map((p) => (
            <div key={p.title}>
              <h3 className="font-pixel font-bold text-2xl leading-tight">{p.title}</h3>
              <p className="mt-3 text-[15px] text-dim leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section id="waitlist" className={`${wrap} pb-16 scroll-mt-8`}>
        <div className="px-window px-6 py-14 md:py-20 text-center">
          <h2 className={`${h2} text-4xl md:text-5xl`}>Say yes to the builders.</h2>
          <p className="mt-4 text-[15px] md:text-base text-dim max-w-[40ch] mx-auto">
            Wirl is in private beta. Leave your email and we&apos;ll get you in.
          </p>
          <div className="mt-8">
            <WaitlistForm id="waitlist-email-footer" center />
          </div>
        </div>
      </section>

      <footer className={`${wrap} py-10 flex items-center justify-between font-pixel text-[16px] leading-none text-dim`}>
        <span className="text-ink"><Wordmark size={2} /></span>
        <div className="flex gap-6">
          <Link href="/docs" className="hover:text-ink">Docs</Link>
          <a href="#waitlist" className="hover:text-ink">Waitlist</a>
          <span>© 2026 Wirl</span>
        </div>
      </footer>
    </div>
  );
}
