import Link from 'next/link';
import type { ReactNode } from 'react';
import Wordmark from '@/components/Wordmark';
import WaitlistForm from '@/components/WaitlistForm';
import ConnectAgent from '@/components/ConnectAgent';
import { HeroScene, MessTiles, WirlScene, ShareScene, AdminTable, RobotIcon, RaceScene } from '@/components/paper/Scenes';
import { copy } from '@/components/copy';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: copy.faq.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

// Robot colours for the agent cards, in the order the copy lists them.
const agentArt: [string, string][] = [
  ['bot-claude', '#D9A377'],
  ['bot-codex', '#A9B8C4'],
  ['bot-cursor', '#B9AEDD'],
  ['bot-mcp', '#8FD39A'],
  ['bot-skill', '#F2C14E'],
];

const wrap = 'max-w-6xl mx-auto px-6';
const h2 = 'font-display font-bold leading-[1.1] tracking-[-0.03em] text-balance text-[1.9rem] md:text-[2.4rem]';
const lede = 'mt-5 text-[17px] leading-relaxed text-ink/80';

/* Text on one side, the picture on the other. Flip swaps them on wide screens;
   on a phone the text always comes first. */
function Split({ text, art, flip = false }: { text: ReactNode; art: ReactNode; flip?: boolean }) {
  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div className={`min-w-0 ${flip ? 'md:order-2' : ''}`}>{text}</div>
      <div className={`min-w-0 ${flip ? 'md:order-1' : ''}`}>{art}</div>
    </div>
  );
}

function Panel({ tone, children }: { tone: string; children: ReactNode }) {
  return <div className={`panel grain ${tone}`}>{children}</div>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <nav className={`${wrap} flex items-center justify-between py-5`}>
        <Link href="/" className="text-ink"><Wordmark /></Link>
        <div className="flex items-center gap-5 text-[15px] font-medium">
          <Link href="/docs" className="hidden sm:inline text-dim hover:text-ink">Docs</Link>
          <a href="https://app.wirl.dev/login" className="hidden sm:inline text-dim hover:text-ink">Log in</a>
          <a href="#connect" className="btn"><span className="sm:hidden">Connect</span><span className="hidden sm:inline">{copy.nav_cta}</span></a>
        </div>
      </nav>

      {/* Hero */}
      <section className={`${wrap} pt-10 md:pt-16 pb-10`}>
        <Split
          text={
            <div>
              <h1 className="font-display font-bold leading-[1.06] tracking-[-0.035em] text-balance text-[2.4rem] sm:text-[3rem] lg:text-[3.4rem]">
                {copy.hero_h1}
              </h1>
              <p className="mt-6 text-[17px] md:text-[18px] leading-relaxed text-ink/85 max-w-[46ch]">{copy.hero_p}</p>
              {copy.hero_tag && <p className="mt-3 text-[15px] text-dim">{copy.hero_tag}</p>}
              <div className="mt-8">
                <ConnectAgent after={copy.connect_after} />
              </div>
            </div>
          }
          art={<Panel tone="bg-sky"><HeroScene /></Panel>}
        />
      </section>

      {/* The mess */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          flip
          text={
            <div>
              <h2 className={h2}>{copy.mess_h2}</h2>
              <p className={lede}>{copy.mess_p}</p>
            </div>
          }
          art={<Panel tone="bg-blush"><MessTiles labels={copy.mess_tiles} /></Panel>}
        />
      </section>

      {/* Wirl */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          text={
            <div>
              <h2 className={h2}>{copy.wirl_h2}</h2>
              <p className={lede}>{copy.wirl_p}</p>
              <p className="mt-6 text-[12px] uppercase tracking-wider text-dim font-semibold">Governance, built in</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {copy.chips.map((c) => <span key={c} className="chip">{c}</span>)}
              </div>
            </div>
          }
          art={<Panel tone="bg-mint"><WirlScene /></Panel>}
        />
      </section>

      {/* Bring your own coding agent */}
      <section className={`${wrap} py-14 md:py-20`}>
        <div className="max-w-[60ch]">
          <h2 className={h2}>{copy.agents_h2}</h2>
          <p className={lede}>{copy.agents_p}</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {copy.agent_notes.map(({ name, note }, i) => (
            <div key={name} className="paper p-4 flex items-start gap-3">
              <div className="shrink-0"><RobotIcon id={agentArt[i][0]} tone={agentArt[i][1]} /></div>
              <div>
                <div className="font-semibold text-[16px] leading-tight">{name}</div>
                <div className="mt-1.5 text-[14px] text-dim leading-snug">{note}</div>
              </div>
            </div>
          ))}
        </div>
        <a href="#connect" className="btn btn-sun mt-8">Connect yours</a>
      </section>

      {/* Built in */}
      <section className={`${wrap} py-14 md:py-20`}>
        <h2 className={h2}>{copy.builtin_h2}</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {copy.builtin_cards.map(({ title, body }) => (
            <div key={title} className="paper p-5">
              <div className="font-display font-bold text-[18px] leading-tight tracking-[-0.02em]">{title}</div>
              <p className="mt-2.5 text-[15px] text-ink/75 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Share */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          flip
          text={
            <div>
              <h2 className={h2}>{copy.share_h2}</h2>
              <p className={lede}>{copy.share_p}</p>
              <div className="mt-6 paper-dark inline-block px-4 py-3 font-mono text-[14.5px] leading-none text-[#DDEBDD]">
                <span className="text-mint/60">$</span> npx wirl pull supplier-payments
              </div>
            </div>
          }
          art={<Panel tone="bg-butter"><ShareScene /></Panel>}
        />
      </section>

      {/* Admin */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          text={
            <div>
              <h2 className={h2}>{copy.admin_h2}</h2>
              <p className={lede}>{copy.admin_p}</p>
            </div>
          }
          art={<Panel tone="bg-lilac"><AdminTable /></Panel>}
        />
      </section>

      {/* FAQ */}
      <section className={`${wrap} py-14 md:py-20 border-t border-sand`}>
        <h2 className={h2}>Questions people ask.</h2>
        <div className="mt-8 max-w-3xl space-y-3">
          {copy.faq.map(({ q, a }) => (
            <details key={q} className="paper group">
              <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-[16px] flex items-center justify-between gap-4">
                <span>{q}</span>
                <span className="text-xl leading-none text-dim group-open:hidden" aria-hidden="true">+</span>
                <span className="text-xl leading-none text-dim hidden group-open:inline" aria-hidden="true">&minus;</span>
              </summary>
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink/75">{a}</p>
            </details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>

      {/* Closing */}
      <section id="waitlist" className={`${wrap} pb-16 scroll-mt-8`}>
        <div className="panel grain bg-butter px-6 pt-4 pb-14 md:pb-20 text-center overflow-hidden">
          <div className="max-w-3xl mx-auto"><RaceScene /></div>
          <h2 className={h2}>{copy.closing_h2}</h2>
          <p className="mt-4 text-[16px] text-ink/75 max-w-[44ch] mx-auto">{copy.closing_p}</p>
          <div className="mt-8">
            <WaitlistForm id="waitlist-email-footer" center />
          </div>
        </div>
      </section>

      <footer className={`${wrap} py-10 flex items-center justify-between text-[14px] text-dim`}>
        <span className="text-ink"><Wordmark size={22} /></span>
        <div className="flex gap-6">
          <Link href="/docs" className="hover:text-ink">Docs</Link>
          <a href="#waitlist" className="hover:text-ink">Waitlist</a>
          <span>© 2026 Wirl</span>
        </div>
      </footer>
    </div>
  );
}
