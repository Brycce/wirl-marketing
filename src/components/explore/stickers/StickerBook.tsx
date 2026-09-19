// The home page as a sticker book. Each section's picture is a page of
// die-cut stickers of real things; the words sit beside it on the plain
// off-white ground.

import Link from 'next/link';
import type { ReactNode } from 'react';
import Wordmark from '@/components/Wordmark';
import { copy } from '@/components/copy';
import { CSS } from './styles';
import { StickerDefs } from './kit';
import { SnailSticker } from './objects';
import LogoRow from './LogoRow';
import Connect from './Connect';
import Waitlist from './Waitlist';
import Slap from './Slap';
import { steps } from './words';
import { HeroArt } from './scenes/Hero';
import { MessArt } from './scenes/Mess';
import { WirlArt, Marker } from './scenes/Wirl';
import { AgentSheet, StepInstall, StepApprove, StepDeploy } from './scenes/Agents';
import { NoInvitesArt, LaptopArt, KeysArt, RollbackArt } from './scenes/Builtin';
import { ShareArt } from './scenes/Share';
import { AdminArt } from './scenes/Admin';
import { ClosingArt } from './scenes/Closing';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: copy.faq.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

/* The hero headline: one line per \n; [icons] becomes the logo stickers.
   The word before them stays on their line. No period after the logos. */
function Headline({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => {
        const [before, after] = line.split('[icons]');
        if (after === undefined) return <span key={line} className="block">{i > 0 && ' '}{line}</span>;
        const words = before.trimEnd().split(' ');
        const last = words.pop();
        return (
          <span key={line} className="block">
            {i > 0 && ' '}{words.join(' ')}{' '}
            <span className="whitespace-nowrap">{last}{' '}<LogoRow />{after}</span>
          </span>
        );
      })}
    </>
  );
}

function Section({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`sb-wrap py-16 md:py-24 ${className}`}>{children}</section>;
}

const WIRL_MARKERS = ['google', 'people', 'safe', 'log', 'back'] as const;
const BUILTIN_ART = [NoInvitesArt, LaptopArt, KeysArt, RollbackArt];
const STEP_ART = [StepInstall, StepApprove, StepDeploy];

export default function StickerBook() {
  return (
    <div className="sb">
      <style href="sb-stickers" precedence="default">{CSS}</style>
      <StickerDefs />
      <Slap />

      <nav className="sb-wrap flex items-center justify-between py-5">
        <Link href="/" className="text-[#1F2A1F]"><Wordmark /></Link>
        <div className="flex items-center gap-6 text-[15px] font-medium">
          <a href="https://docs.wirl.dev" className="hidden sm:inline text-[#5A6057] hover:text-[#1F2A1F]">Docs</a>
          <a href="https://app.wirl.dev/login" className="hidden sm:inline text-[#5A6057] hover:text-[#1F2A1F]">Log in</a>
          <a href="#connect" className="sb-btn sb-btn-sm"><span className="sm:hidden">Connect</span><span className="hidden sm:inline">{copy.nav_cta}</span></a>
        </div>
      </nav>

      {/* Hero */}
      <section className="sb-wrap pt-8 md:pt-14 pb-12 md:pb-20">
        <div className="sb-split top">
          <div className="t6 min-w-0">
            <h1 className="font-extrabold leading-[1.04] tracking-[-0.04em] text-[38px] sm:text-[50px] lg:text-[50px] xl:text-[62px]">
              <Headline text={copy.hero_h1} />
            </h1>
            <p className="mt-7 text-[18px] leading-relaxed text-[#1F2A1F]/85 max-w-[46ch]">{copy.hero_p}</p>
            <div className="mt-9">
              <Connect after={copy.connect_after} />
            </div>
          </div>
          <div className="a6 art min-w-0">
            <HeroArt />
          </div>
        </div>
      </section>

      {/* The mess */}
      <Section>
        <div className="sb-split flip">
          <div className="t6 min-w-0">
            <h2 className="sb-h2">{copy.mess_h2}</h2>
            <ul className="sb-bullets">
              {copy.mess_bullets.map((b) => <li key={b}><span className="sb-dot" aria-hidden="true" />{b}</li>)}
            </ul>
            <p className="sb-lede font-medium text-[#1F2A1F]">{copy.mess_p}</p>
          </div>
          <div className="a6 art min-w-0">
            <MessArt />
          </div>
        </div>
      </Section>

      {/* Point the agent at Wirl */}
      <Section>
        <div className="sb-split">
          <div className="t5 min-w-0">
            <h2 className="sb-h2">{copy.wirl_h2}</h2>
            <p className="sb-lede">{copy.wirl_p}</p>
            <ul className="sb-bullets">
              {copy.wirl_bullets.map((b, i) => <li key={b}><Marker kind={WIRL_MARKERS[i]} />{b}</li>)}
            </ul>
          </div>
          <div className="a7 art min-w-0">
            <WirlArt />
          </div>
        </div>
      </Section>

      {/* Bring your own coding agent */}
      <Section>
        <div className="max-w-[60ch]">
          <h2 className="sb-h2">{copy.agents_h2}</h2>
          <p className="sb-lede">{copy.agents_p}</p>
        </div>
        <div className="mt-10">
          <AgentSheet notes={copy.agent_notes} />
        </div>
        <ol className="mt-14 grid md:grid-cols-3 gap-x-8 gap-y-8">
          {steps.map((s, i) => {
            const Art = STEP_ART[i];
            return (
              <li key={s} className="min-w-0">
                <div className="max-w-[360px]"><Art /></div>
                <p className="mt-3 flex items-baseline gap-3 text-[17px] leading-snug font-semibold">
                  <span className="sb-num" aria-hidden="true">{i + 1}</span>
                  <span>{s}</span>
                </p>
              </li>
            );
          })}
        </ol>
        <a href="#connect" className="sb-btn sb-btn-sun mt-12">Connect yours</a>
      </Section>

      {/* What you don't have to build */}
      <Section>
        <h2 className="sb-h2">{copy.builtin_h2}</h2>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-14">
          {copy.builtin_cards.map(({ title, body }, i) => {
            const Art = BUILTIN_ART[i];
            return (
              <div key={title} className="sb-bcard sb-card relative px-5 pb-6 pt-[104px]">
                <div className="absolute -top-8 right-0 sm:-right-3 w-[200px]"><Art /></div>
                <h3 className="font-bold text-[19px] leading-tight tracking-[-0.02em]">{title}</h3>
                <p className="mt-2.5 text-[16px] text-[#1F2A1F]/78 leading-relaxed">{body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Share */}
      <Section>
        <div className="sb-split flip">
          <div className="t6 min-w-0">
            <h2 className="sb-h2">{copy.share_h2}</h2>
            <p className="sb-lede">{copy.share_p}</p>
            <div className="mt-7 sb-code inline-block px-4 py-3 sb-mono text-[14.5px] leading-none">
              <span className="text-[#22A861]">$</span> npx wirl pull supplier-payments
            </div>
          </div>
          <div className="a6 art min-w-0">
            <ShareArt />
          </div>
        </div>
      </Section>

      {/* Admin */}
      <Section>
        <div className="sb-split">
          <div className="t5 min-w-0">
            <h2 className="sb-h2">{copy.admin_h2}</h2>
            <p className="sb-lede">{copy.admin_p}</p>
            <ul className="sb-bullets">
              {copy.admin_bullets.map((b) => <li key={b}><span className="sb-dot" style={{ background: '#FFCC3D' }} aria-hidden="true" />{b}</li>)}
            </ul>
          </div>
          <div className="a7 art min-w-0">
            <AdminArt />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="max-w-[760px] mx-auto">
          <h2 className="sb-h2">
            Questions people <span className="whitespace-nowrap">ask.
            <svg viewBox="-6 -6 60 56" className="inline-block w-[44px] ml-3 -my-4 align-[0.16em] rotate-[8deg]" aria-hidden="true" focusable="false" style={{ filter: 'drop-shadow(0 1px 1px rgba(31,42,31,.18)) drop-shadow(0 5px 8px rgba(31,42,31,.18))' }}>
              <path d="M8 0 H40 Q48 0 48 8 V28 Q48 36 40 36 H22 L10 44 L12 36 H8 Q0 36 0 28 V8 Q0 0 8 0 Z" fill="#fff" stroke="#fff" strokeWidth={12} strokeLinejoin="round" />
              <path d="M8 0 H40 Q48 0 48 8 V28 Q48 36 40 36 H22 L10 44 L12 36 H8 Q0 36 0 28 V8 Q0 0 8 0 Z" fill="#FFCC3D" stroke="#1F2A1F" strokeWidth={2.5} strokeLinejoin="round" />
              <text x={24} y={27.5} fontSize={24} fontWeight={800} fill="#1F2A1F" textAnchor="middle">?</text>
            </svg></span>
          </h2>
          <div className="sb-faq mt-9 space-y-3.5">
            {copy.faq.map(({ q, a }) => (
              <details key={q} className="sb-card group">
                <summary className="cursor-pointer px-5 py-4 sm:px-6 font-semibold text-[17px] flex items-center justify-between gap-4">
                  <span>{q}</span>
                  <span className="sb-toggle" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 4v16M4 12h16" stroke="#1F2A1F" strokeWidth="3" strokeLinecap="round" /></svg>
                  </span>
                </summary>
                <p className="px-5 sm:px-6 pb-5 -mt-1 text-[16px] leading-relaxed text-[#1F2A1F]/80">{a}</p>
              </details>
            ))}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        </div>
      </Section>

      {/* Closing */}
      <Section id="waitlist" className="scroll-mt-8">
        <div className="sb-split">
          <div className="t5 min-w-0">
            <h2 className="sb-h2">{copy.closing_h2}</h2>
            <p className="sb-lede">{copy.closing_p}</p>
            <div className="mt-8">
              <Waitlist id="waitlist-email-footer" />
            </div>
          </div>
          <div className="a7 art min-w-0">
            <ClosingArt />
          </div>
        </div>
      </Section>

      <footer className="sb-wrap pb-12">
        <div className="relative border-t-[1.5px] border-[#DDD8CC] pt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between text-[15px] text-[#5A6057]">
          <span className="sb-foot-snail" aria-hidden="true">
            <span className="sb-face">
              <span className="sb-restick">
                <svg viewBox="-6 -6 60 48" width="27" height="22" focusable="false">
                  <SnailSticker x={0} y={0} size={34} border={5} />
                </svg>
              </span>
            </span>
          </span>
          <span className="text-[#1F2A1F]"><Wordmark size={22} /></span>
          <div className="flex gap-6">
            <a href="https://docs.wirl.dev" className="hover:text-[#1F2A1F]">Docs</a>
            <a href="#waitlist" className="hover:text-[#1F2A1F]">Waitlist</a>
            <span>© 2026 Wirl</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
