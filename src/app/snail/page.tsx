import Link from 'next/link';
import type { Metadata } from 'next';
import Wordmark from '@/components/Wordmark';
import { SnailMark, SnailWordmark, PaperSnail } from '@/components/paper/Snail';
import { Scene, Cloud, AppCard, Person, Desk, Laptop, Robot, Ground, Defs, P } from '@/components/paper/Paper';

export const metadata: Metadata = {
  title: 'Concept: the shell',
  robots: { index: false, follow: false },
};

const wrap = 'max-w-6xl mx-auto px-6';
const h2 = 'font-display font-bold leading-[1.1] tracking-[-0.03em] text-[1.6rem] md:text-[2rem]';

/* The hero scene with a snail on the floor, carrying an app. It crawls, slowly. */
function HeroWithSnail() {
  const id = 'hero-snail';
  return (
    <Scene id={id} w={380} h={330}>
      <Cloud id={id} x={236} y={14} s={0.5} tone="#FFFFFF" />
      <AppCard id={id} x={168} y={40} tone={P.coral} r={3} className="float-2" />
      <Person id={id} x={70} y={178} shirt={P.coral} skin={0} hair={0} style="cap" sit />
      <Desk id={id} x={28} y={228} w={250} />
      <Laptop id={id} x={150} y={181} />
      <Robot id={id} x={296} y={190} />
      <Ground id={id} y={258} x={14} w={352} />
      <g className="crawl">
        <PaperSnail id={id} x={232} y={186} s={0.6} />
        <AppCard id={id} x={254} y={165} w={40} h={30} tone={P.blue} r={-8} />
      </g>
    </Scene>
  );
}

export default function SnailConcept() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <style>{`
        .crawl { transform-box: fill-box; transform-origin: 50% 50%; animation: crawl 26s ease-in-out infinite alternate; }
        @keyframes crawl { from { transform: translateX(0); } to { transform: translateX(-70px); } }
        .stalk-wiggle { transform-box: fill-box; transform-origin: 50% 100%; animation: wiggle 3s ease-in-out infinite; }
        @keyframes wiggle { 0%, 100% { transform: rotate(0); } 50% { transform: rotate(-6deg); } }
      `}</style>
      <nav className={`${wrap} flex items-center justify-between py-5`}>
        <Link href="/" className="text-ink"><Wordmark /></Link>
        <span className="chip">concept · not shipped</span>
      </nav>

      <section className={`${wrap} pt-8 pb-10`}>
        <h1 className="font-display font-bold leading-[1.06] tracking-[-0.035em] text-[2.4rem] md:text-[3rem] max-w-[18ch]">The wirl is a shell.</h1>
        <p className="mt-4 text-[17px] text-ink/80 max-w-[52ch] leading-relaxed">
          The mark already ends where a body would start. One stroke leaves the spiral at the bottom, runs along the ground, and lifts into a head. Nothing else about the mark changes.
        </p>
      </section>

      {/* The mark */}
      <section className={`${wrap} py-10`}>
        <h2 className={h2}>The mark</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="paper p-8 flex items-end gap-10">
            <SnailMark size={120} />
            <SnailMark size={64} />
            <SnailMark size={32} />
            <SnailMark size={20} />
          </div>
          <div className="paper p-8 flex flex-col gap-6 justify-center">
            <div className="flex items-center gap-8">
              <span className="text-[13px] text-dim w-24">today</span>
              <Wordmark size={34} />
            </div>
            <div className="flex items-center gap-8">
              <span className="text-[13px] text-dim w-24">as a snail</span>
              <SnailWordmark size={34} />
            </div>
            <div className="flex items-center gap-8">
              <span className="text-[13px] text-dim w-24">favicon</span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-ink text-cream"><SnailMark size={16} /></span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-ink text-cream"><SnailMark size={12} /></span>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sun text-ink"><SnailMark size={20} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* The mascot */}
      <section className={`${wrap} py-10`}>
        <h2 className={h2}>In paper</h2>
        <p className="mt-3 text-[16px] text-ink/75 max-w-[52ch]">Same cut-paper hand as the rest of the site. The shell is the spiral on a disc; the app rides on its back.</p>
        <div className="mt-6 panel grain bg-sky">
          <svg viewBox="0 0 560 130" width="100%" className="block h-auto" aria-hidden="true">
            <Defs id="mascots" />
            <PaperSnail id="mascots" x={20} y={40} s={0.8} />
            <PaperSnail id="mascots" x={210} y={40} s={0.8} shell={P.coral} body="#BFD9EA" spiral={P.paper} />
            <g>
              <PaperSnail id="mascots" x={400} y={40} s={0.8} shell={P.lilac} body="#F0C9BC" />
              <AppCard id="mascots" x={428} y={14} w={56} h={42} tone={P.green} onWirl r={-6} />
            </g>
          </svg>
        </div>
      </section>

      {/* In the hero */}
      <section className={`${wrap} py-10`}>
        <h2 className={h2}>In the hero</h2>
        <p className="mt-3 text-[16px] text-ink/75 max-w-[52ch]">It carries the app along the desk. It takes twenty-six seconds to get anywhere, which is the joke, and the only slow thing on the page.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="font-display font-bold leading-[1.06] tracking-[-0.035em] text-[2.2rem] md:text-[2.6rem]">Every app carries its own shell.</h3>
            <p className="mt-4 text-[17px] text-ink/80 leading-relaxed max-w-[44ch]">Sign-in, keys, and the log travel with the app wherever it is opened. Nothing to set up, nothing to forget.</p>
          </div>
          <div className="panel grain bg-sky"><HeroWithSnail /></div>
        </div>
      </section>

      {/* Small touches */}
      <section className={`${wrap} py-10 pb-20`}>
        <h2 className={h2}>Small touches</h2>
        <p className="mt-3 text-[16px] text-ink/75 max-w-[52ch]">Where it could show up without becoming a mascot on every page.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          <div className="paper p-6">
            <div className="text-[12px] uppercase tracking-wider text-dim font-semibold">Empty state</div>
            <div className="mt-6 flex flex-col items-center text-center">
              <svg viewBox="0 0 120 80" width="120" aria-hidden="true"><Defs id="empty" /><PaperSnail id="empty" x={0} y={4} s={0.9} /></svg>
              <p className="mt-4 font-semibold">No apps yet.</p>
              <p className="mt-1 text-[14px] text-dim">Ask your agent to deploy one.</p>
            </div>
          </div>
          <div className="paper p-6">
            <div className="text-[12px] uppercase tracking-wider text-dim font-semibold">404</div>
            <div className="mt-6 flex flex-col items-center text-center">
              <svg viewBox="0 0 120 80" width="120" aria-hidden="true"><Defs id="lost" /><PaperSnail id="lost" x={0} y={4} s={0.9} flip shell={P.coral} body="#BFD9EA" spiral={P.paper} /></svg>
              <p className="mt-4 font-semibold">Nothing at this link.</p>
              <p className="mt-1 text-[14px] text-dim">Or nothing you can open.</p>
            </div>
          </div>
          <div className="paper-dark p-6 font-mono text-[13px] leading-relaxed">
            <div className="text-[12px] uppercase tracking-wider text-mint/50 font-sans font-semibold">Terminal</div>
            <div className="mt-6 text-mint/60">$ wirl deploy</div>
            <div className="text-mint">building supplier-payments · 4s</div>
            <div className="text-mint">deployed v7 · company-only</div>
            <div className="mt-2 flex items-center gap-2 text-[#F2C14E]"><SnailMark size={18} /> https://harbor--supplier-payments.wirl.run</div>
          </div>
        </div>
        <div className="mt-8 paper p-6 max-w-2xl">
          <div className="text-[12px] uppercase tracking-wider text-dim font-semibold">Lines that use it</div>
          <ul className="mt-3 space-y-2 text-[16px]">
            <li>Every app carries its own shell.</li>
            <li>Ship it with the shell on.</li>
            <li>Slow is the mascot. The deploy is not.</li>
            <li>Home is wherever it is opened.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
