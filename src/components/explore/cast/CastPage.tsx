// Cartoon cast: a day at Harbor. Each section is one scene from that day.
import Link from 'next/link';
import type { ReactNode } from 'react';
import Wordmark from '@/components/Wordmark';
import s from './cast.module.css';
import { copy } from './copy';
import StickerRow from './StickerRow';
import Connect from './Connect';
import Waitlist from './Waitlist';
import HeroScene from './HeroScene';
import MessScene from './MessScene';
import DeployScene from './DeployScene';
import { SPOTS } from './Spots';
import ShareScene from './ShareScene';
import AgentsScene from './AgentsScene';
import AdminScene from './AdminScene';
import FaqJonah from './FaqJonah';
import TeamScene from './TeamScene';
import { C, Sticker, type StickerKind } from './kit';

const wrap = 'mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8';
const h2 = 'font-extrabold leading-[1.04] tracking-[-0.035em] text-balance text-[2.05rem] md:text-[2.7rem]';
const lede = 'mt-5 text-[17px] md:text-[18px] leading-relaxed text-[#544A5E] max-w-[46ch]';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: copy.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

/* Text on one side, the scene on the other. On a phone the text comes first. */
function Split({ text, art, flip = false, cols = '5/7', center = true, gap = 'gap-10 md:gap-12 lg:gap-16' }: { text: ReactNode; art: ReactNode; flip?: boolean; cols?: '5/7' | '6/6' | '4/8'; center?: boolean; gap?: string }) {
  const [t, a] = cols === '6/6' ? ['md:col-span-6', 'md:col-span-6'] : cols === '4/8' ? ['md:col-span-4', 'md:col-span-8'] : ['md:col-span-5', 'md:col-span-7'];
  return (
    <div className={`grid md:grid-cols-12 ${gap} ${center ? 'items-center' : 'items-start'}`}>
      <div className={`min-w-0 ${t} ${flip ? 'md:order-2' : ''}`}>{text}</div>
      <div className={`min-w-0 ${a} ${flip ? 'md:order-1' : ''}`}>{art}</div>
    </div>
  );
}

function Stage({ children, tone, className = '' }: { children: ReactNode; tone: string; className?: string }) {
  return <div className={`${s.stage} ${className}`} style={{ background: tone }}>{children}</div>;
}

// A small die-cut logo sticker for use in text, like the list of agents.
export function MiniSticker({ kind, size = 26, rot = 0 }: { kind: StickerKind; size?: number; rot?: number }) {
  return (
    <svg viewBox="-17 -17 34 34" width={size} height={size} aria-hidden="true" className="shrink-0 overflow-visible">
      <Sticker kind={kind} x={0} y={0} size={22} rot={rot} />
    </svg>
  );
}

/* The hero headline: [icons] becomes the sticker row, and "company login"
   gets the sunflower underline. The word before the stickers stays with them. */
function Headline({ text }: { text: string }) {
  const [l1, l2] = text.split('\n');
  const [before] = l1.split('[icons]');
  const words = before.trimEnd().split(' ');
  const last = words.pop();
  const at = l2.indexOf('company login');
  return (
    <>
      <span className="block">
        {words.join(' ')}{' '}
        <span className="whitespace-nowrap">{last}{' '}<StickerRow /><span className="sr-only">.</span></span>
      </span>
      <span className="block">
        {' '}{l2.slice(0, at)}
        <span className={s.uwrap}>
          company login
          <svg className={s.uline} viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
            <path d="M3 13 C 38 6.5, 96 5.5, 138 8.5 S 186 12.5, 197 7" pathLength={100} fill="none" stroke={C.sun} strokeWidth={6.5} strokeLinecap="round" />
          </svg>
        </span>
        {l2.slice(at + 'company login'.length)}
      </span>
    </>
  );
}

const AGENT_STICKER: StickerKind[] = ['claude', 'codex', 'cursor', 'plus', 'doc'];

export default function CastPage() {
  return (
    <div className={`${s.root} min-h-screen`}>
      <nav className={`${wrap} flex items-center justify-between py-5`}>
        <Link href="/" className="text-[#2B2233]"><Wordmark /></Link>
        <div className="flex items-center gap-6 text-[15px] font-semibold">
          <a href="https://docs.wirl.dev" className="hidden sm:inline text-[#544A5E] hover:text-[#2B2233]">Docs</a>
          <a href="https://app.wirl.dev/login" className="hidden sm:inline text-[#544A5E] hover:text-[#2B2233]">Log in</a>
          <a href="#connect" className={s.btn}><span className="sm:hidden">Connect</span><span className="hidden sm:inline">{copy.nav_cta}</span></a>
        </div>
      </nav>

      {/* Hero */}
      <section className={`${wrap} pt-8 md:pt-14 pb-14 md:pb-20`}>
        <Split
          cols="6/6"
          center={false}
          gap="gap-10 md:gap-10 lg:gap-12"
          text={
            <div className="md:pt-6">
              <h1 className="font-extrabold leading-[1.04] tracking-[-0.035em] text-balance text-[2.4rem] sm:text-[3rem] lg:text-[3.4rem]">
                <Headline text={copy.hero_h1} />
              </h1>
              <p className="mt-6 text-[18px] leading-relaxed text-[#544A5E] max-w-[46ch]">{copy.hero_p}</p>
              <div className="mt-8">
                <Connect after={copy.connect_after} />
              </div>
            </div>
          }
          art={<Stage tone={C.sky}><HeroScene /></Stage>}
        />
      </section>

      {/* The mess */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          flip
          text={
            <div>
              <h2 className={h2}>{copy.mess_h2}</h2>
              <ol className="mt-6 space-y-3.5">
                {copy.mess_bullets.map((b, i) => (
                  <li key={b} className="flex items-start gap-3 text-[17px] leading-relaxed">
                    <span className={s.num} style={{ transform: `rotate(${[-6, 4, -3, 5][i]}deg)` }}>{i + 1}</span>
                    <span className="pt-0.5">{b}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-[17px] md:text-[18px] leading-relaxed font-semibold max-w-[46ch]">{copy.mess_p}</p>
            </div>
          }
          art={<Stage tone={C.peach}><MessScene /></Stage>}
        />
      </section>

      {/* Point the agent at Wirl */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          text={
            <div>
              <h2 className={h2}>{copy.wirl_h2}</h2>
              <p className={lede}>{copy.wirl_p}</p>
            </div>
          }
          art={<Stage tone={C.mint}><DeployScene /></Stage>}
        />
      </section>

      {/* What you don't have to build */}
      <section className={`${wrap} py-14 md:py-20`}>
        <h2 className={h2}>{copy.rest_h2}</h2>
        <p className={lede}>{copy.rest_lede}</p>
        <div className="mt-10 grid md:grid-cols-2 gap-5 md:gap-6">
          {copy.rest_cards.map(({ title, body }, i) => {
            const Art = SPOTS[i];
            return (
            <div key={title} className={`${s.card} p-4 flex flex-col sm:flex-row sm:items-center gap-4 md:gap-5`}>
              <div className={`${s.stage} ${s.stageSm} order-2 sm:order-1 w-full sm:shrink-0 sm:w-[190px] lg:w-[224px]`}><Art /></div>
              <div className="min-w-0 order-1 sm:order-2 px-1 pt-1 sm:p-0">
                <h3 className="font-extrabold text-[18px] md:text-[19px] leading-tight tracking-[-0.02em]">{title}</h3>
                <p className="mt-1.5 text-[15.5px] md:text-[16px] leading-snug text-[#544A5E]">{body}</p>
              </div>
            </div>
            );
          })}
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
              <div className={`${s.chipDark} mt-7 font-mono`}>
                <span className="text-[#FFC53D]">$</span> npx wirl pull supplier-payments
              </div>
            </div>
          }
          art={
            <>
              <Stage tone={C.pink} className="hidden sm:block"><ShareScene /></Stage>
              {/* Phones: the two desks one above the other, so the screens stay readable. */}
              <Stage tone={C.pink} className="sm:hidden">
                <ShareScene half="link" />
                <div className="border-t-[2.5px] border-dashed border-[#2B2233]" />
                <ShareScene half="code" />
              </Stage>
            </>
          }
        />
      </section>

      {/* Bring your own agent */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          text={
            <div>
              <h2 className={h2}>{copy.agents_h2}</h2>
              <p className={lede}>{copy.agents_p}</p>
              <ul className="mt-6 space-y-3">
                {copy.agent_notes.map(({ name, note }, i) => (
                  <li key={name} className="flex items-center gap-3 text-[16.5px] leading-snug">
                    <MiniSticker kind={AGENT_STICKER[i]} rot={[-6, 5, -3, 4, -4][i]} />
                    <span><span className="font-bold">{name}</span> <span className="text-[#544A5E]">{note}</span></span>
                  </li>
                ))}
              </ul>
              <a href="#connect" className={`${s.btn} mt-8`}>Connect yours</a>
            </div>
          }
          art={<Stage tone={C.butter}><AgentsScene /></Stage>}
        />
      </section>

      {/* Admin */}
      <section className={`${wrap} py-14 md:py-20`}>
        <Split
          flip
          cols="4/8"
          text={
            <div>
              <h2 className={h2}>{copy.admin_h2}</h2>
              <p className={lede}>{copy.admin_p}</p>
              <ul className="mt-5 space-y-2.5">
                {copy.admin_bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[17px] leading-relaxed">
                    <svg viewBox="0 0 20 20" width="20" height="20" className="mt-1 shrink-0" aria-hidden="true">
                      <circle cx="10" cy="10" r="8.5" fill={C.violet} stroke={C.ink} strokeWidth="2" />
                      <path d="M6 10.2 l2.6 2.6 l5.2 -5.6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          }
          art={<AdminScene />}
        />
      </section>

      {/* FAQ */}
      <section className={`${wrap} ${s.faqWrap} py-14 md:py-20`}>
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4 flex md:block items-end gap-4">
            <h2 className={`${h2} flex-1`}>{copy.faq_h2}</h2>
            <div className="w-[76px] md:w-[210px] shrink-0 md:mt-10 md:ml-2">
              <FaqJonah />
            </div>
          </div>
          <div className="md:col-span-8 space-y-4">
            {copy.faq.map(({ q, a }) => (
              <details key={q} className={`${s.card} ${s.faq} group`}>
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-[17px] flex items-center justify-between gap-4">
                  <span>{q}</span>
                  <span className={s.faqPlus} aria-hidden="true">+</span>
                </summary>
                <p className="px-5 pb-5 -mt-1 text-[16px] leading-relaxed text-[#544A5E]">{a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>

      {/* Closing */}
      <section id="waitlist" className={`${wrap} pb-16 pt-6 scroll-mt-8`}>
        <div className={`${s.card} px-4 pt-7 pb-4 sm:p-6 md:p-10 lg:p-12`}>
          <Split
            text={
              <div>
                <h2 className={h2}>{copy.closing_h2}</h2>
                <p className={lede}>{copy.closing_p}</p>
                <div className="mt-7">
                  <Waitlist id="waitlist-email-footer" />
                </div>
              </div>
            }
            art={<Stage tone={C.sky}><TeamScene /></Stage>}
          />
        </div>
      </section>

      <footer className={`${wrap} pb-10`}>
        <div className="border-t-[2.5px] border-[#2B2233] pt-6 flex flex-wrap items-center justify-between gap-4 text-[15px] text-[#544A5E]">
          <span className="text-[#2B2233]"><Wordmark size={22} /></span>
          <div className="flex flex-wrap gap-6">
            <a href="https://docs.wirl.dev" className="hover:text-[#2B2233]">Docs</a>
            <a href="#waitlist" className="hover:text-[#2B2233]">Waitlist</a>
            <span>© 2026 Wirl</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
