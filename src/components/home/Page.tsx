// Toybox: Wirl's real screens redrawn as chunky cartoon toys. Thick ink
// outlines, bold flat colour, a toy edge under everything, and die-cut
// stickers and rubber stamps slapped on top. Every picture is a thing that
// really exists in Wirl, just bigger and more fun.
//
// Setup is told twice at most: the connect block in the hero, then one
// section that carries the three steps and the any-MCP-agent point. The
// badge row under it is an index into the bands below, not a second telling.
// Band colours run coral, sky, blush, lilac, ink, coral, mint, sky, sun. The
// sign-in band is the quiet beat: pink next to coral and lilac was a third
// shout in a row, so it is a warm neutral now and the arc reads loud, mid,
// quiet, loud, dark, loud, mid, mid, loud rather than a parade.

import Link from 'next/link';
import type { ReactNode } from 'react';
import Wordmark from '@/components/Wordmark';
import ThemeToggle from '@/components/ThemeToggle';
import { SnailMark } from '@/components/paper/Snail';
import { CSS } from './css';
import { tb } from './copy';
import { GlobalDefs, K } from './kit';
import { HeadlineStickers } from './marks';
import Connect from './Connect';
import Waitlist from './Waitlist';
import HeroScene from './scenes/Hero';
import MessStickers from './scenes/Mess';
import SetupScene from './scenes/Setup';
import AgentSheet from './scenes/Agents';
import { SigninScene, OnlyScene, KeysScene, RollbackScene, ShareScene } from './scenes/Features';
import { AdminTable, LogCard } from './scenes/Admin';
import { APPS, AppStickerArt, FEATURE_BADGES } from './scenes/Small';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: tb.faq.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

/* The hero headline: one line per \n, and [icons] becomes the row of logo
   stickers. The word before the stickers stays on their line. */
export function Headline({ text }: { text: string }) {
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
            <span className="whitespace-nowrap">{last}{' '}<HeadlineStickers />{after || <span className="sr-only">.</span>}</span>
          </span>
        );
      })}
    </>
  );
}

/* Hyphenated words (sign-in, Company-only) never break at the hyphen. */
function Keep({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\S+-\S+)/).map((part, i) =>
        i % 2 === 1 ? <span key={i} className="whitespace-nowrap">{part}</span> : part
      )}
    </>
  );
}

/* Text beside the picture, alternating sides; on a phone, text first. */
function Split({ text, art, flip = false }: { text: ReactNode; art: ReactNode; flip?: boolean }) {
  return (
    <div className={`split ${flip ? 'flip' : ''}`}>
      <div className="text">{text}</div>
      <div className="art">{art}</div>
    </div>
  );
}

function Slab({ id, tone, children, className = '' }: { id?: string; tone: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`slab ${tone} ${className}`}>
      <div className="slab-in">{children}</div>
    </section>
  );
}

export default function ToyboxPage() {
  return (
    <div className="tbx">
      <style href="tbx" precedence="default">{CSS}</style>
      <GlobalDefs />

      <nav className="wrap tb-nav" aria-label="Main">
        <Link href="/" aria-label="Wirl home"><Wordmark /></Link>
        <div className="tb-nav-links">
          <ThemeToggle />
          <a href="https://docs.wirl.dev" className="tb-plain">Docs</a>
          <a href="https://app.wirl.dev/login" className="tb-plain">Log in</a>
          <a href="#connect" className="tbtn"><span className="tb-phone">Connect</span><span className="tb-wide">{tb.nav_cta}</span></a>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <header className="wrap tb-hero">
          <div>
            <h1 className="tb-h1"><Headline text={tb.hero_h1} /></h1>
            <p className="tb-lede">{tb.hero_p}</p>
            <Connect after={tb.connect_after} />
          </div>
          <div className="tb-hero-art-wrap">
            <HeroScene />
          </div>
        </header>

        {/* The mess */}
        <Slab tone="bg-coral">
          <Split
            text={
              <>
                <h2 className="tb-h2"><Keep text={tb.mess_h2} /></h2>
                <ul className="tb-list" style={{ ['--dot' as string]: K.tomato }}>
                  {tb.mess_bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <p className="tb-lede"><strong>{tb.mess_p}</strong></p>
              </>
            }
            art={<MessStickers labels={tb.mess_tiles} />}
          />
        </Slab>

        {/* Setup, told once: the three steps, and any agent that speaks MCP */}
        <Slab tone="bg-sky">
          <Split
            flip
            text={
              <>
                <h2 className="tb-h2"><Keep text={tb.wirl_h2} /></h2>
                <p className="tb-lede">{tb.wirl_p}</p>
                <ol className="tb-steps">
                  {tb.steps.map((s, i) => (
                    <li key={s.title}>
                      <span className="tb-num" aria-hidden="true">{i + 1}</span>
                      <span><b>{s.title}</b> {s.body}</span>
                    </li>
                  ))}
                </ol>
              </>
            }
            art={<SetupScene />}
          />
          <div className="tb-byo">
            <div className="tb-byo-text">
              <h3 className="tb-h3"><Keep text={tb.agents_h2} /></h3>
              <p className="tb-byo-p">{tb.agents_p}</p>
              <a href="#connect" className="tbtn tbtn-sm">Connect yours</a>
            </div>
            <AgentSheet notes={tb.agent_notes} slim />
          </div>
        </Slab>

        {/* What you don't have to build: an index into the bands below */}
        <section className="wrap tb-index">
          <div className="tb-index-head">
            <h2 className="tb-h2">{tb.builtin_h2}</h2>
            <p className="tb-index-p">{tb.builtin_p}</p>
          </div>
          <ul className="tb-badges">
            {FEATURE_BADGES.map((b) => (
              <li key={b.href}>
                <a href={b.href}>
                  <span className="tb-badge-art">{b.art}</span>
                  <span className="tb-badge-label">{b.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Slab id="signin" tone="bg-blush">
          <Split
            text={
              <>
                <h2 className="tb-h2"><Keep text={tb.signin_h2} /></h2>
                <p className="tb-lede">{tb.signin_p}</p>
              </>
            }
            art={<SigninScene />}
          />
        </Slab>

        <Slab id="company-only" tone="bg-lilac">
          <Split
            flip
            text={
              <>
                <h2 className="tb-h2"><Keep text={tb.only_h2} /></h2>
                <p className="tb-lede">{tb.only_p}</p>
              </>
            }
            art={<OnlyScene />}
          />
        </Slab>

        <Slab id="keys" tone="bg-ink">
          <Split
            text={
              <>
                <h2 className="tb-h2"><Keep text={tb.keys_h2} /></h2>
                <p className="tb-lede">{tb.keys_p}</p>
              </>
            }
            art={<KeysScene />}
          />
        </Slab>

        <Slab id="rollback" tone="bg-coral" className="tb-rb-slab">
          <Split
            flip
            text={
              <>
                <h2 className="tb-h2"><Keep text={tb.rollback_h2} /></h2>
                <p className="tb-lede">{tb.rollback_p}</p>
              </>
            }
            art={
              <div className="tb-rb">
                <RollbackScene />
                <div className="tb-logchip"><span className="tb-log-t">09:41</span> <b>wirl</b> rolled <span className="tb-nowrap">supplier-payments</span> back to v3</div>
              </div>
            }
          />
        </Slab>

        <Slab id="share" tone="bg-mint">
          <Split
            text={
              <>
                <h2 className="tb-h2"><Keep text={tb.share_h2} /></h2>
                <p className="tb-lede">{tb.share_p}</p>
                <div className="tb-cmd"><span>$</span> {tb.share_cmd}</div>
                <p className="tb-lede tb-small"><b>{tb.share_laptop_title}.</b> {tb.share_laptop}</p>
              </>
            }
            art={<ShareScene />}
          />
        </Slab>

        <Slab id="admins" tone="bg-sky" className="tb-admin-slab">
          <div className="tb-admin-split">
            <div className="text">
              <h2 className="tb-h2"><Keep text={tb.admin_h2} /></h2>
              <p className="tb-lede">{tb.admin_p}</p>
              <ul className="tb-list" style={{ ['--dot' as string]: K.green }}>
                {tb.admin_bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
            <div className="tb-admin-art">
              <AdminTable />
              <LogCard />
            </div>
          </div>
        </Slab>

        {/* FAQ */}
        <section className="wrap tb-faq">
          <h2 className="tb-h2">
            {tb.faq_h2}
            <svg className="tb-q" viewBox="-30 -30 60 60" aria-hidden="true">
              <g filter="url(#tb-stk)" transform="rotate(8)">
                <path d="M-22 -18 H22 Q26 -18 26 -14 V10 Q26 14 22 14 H-4 L-14 24 L-12 14 H-22 Q-26 14 -26 10 V-14 Q-26 -18 -22 -18 Z" fill={K.paper} stroke={K.paper} strokeWidth={8} strokeLinejoin="round" />
                <path d="M-22 -18 H22 Q26 -18 26 -14 V10 Q26 14 22 14 H-4 L-14 24 L-12 14 H-22 Q-26 14 -26 10 V-14 Q-26 -18 -22 -18 Z" fill={K.sun} stroke={K.ink} strokeWidth={2.5} strokeLinejoin="round" />
                <text x={0} y={6} fontSize={24} fontWeight={900} fill={K.ink} textAnchor="middle">?</text>
              </g>
            </svg>
          </h2>
          <div className="tb-faq-list">
            {tb.faq.map(({ q, a }) => (
              <details key={q} className="tb-faq-item">
                <summary>
                  <span>{q}</span>
                  <span className="tb-key" aria-hidden="true">
                    <svg viewBox="0 0 20 20"><path d="M10 4.5v11M4.5 10h11" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" /></svg>
                  </span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        </section>

        {/* Closing */}
        <section id="waitlist" className="slab bg-sun tb-closing">
          <ul className="tb-cl-stickers tb-cl-a" aria-hidden="true">
            {APPS.slice(0, 4).map((app) => <li key={app.name}><AppStickerArt app={app} /></li>)}
          </ul>
          <div className="tb-cl-card">
            <h2 className="tb-h2"><Keep text={tb.closing_h2} /></h2>
            <p className="tb-lede">{tb.closing_p}</p>
            <Waitlist id="waitlist-email-footer" />
          </div>
          <ul className="tb-cl-stickers tb-cl-b" aria-hidden="true">
            {APPS.slice(4).map((app) => <li key={app.name}><AppStickerArt app={app} /></li>)}
          </ul>
        </section>
      </main>

      <footer className="wrap tb-foot">
        <div className="tb-ground" aria-hidden="true">
          <span className="tb-crawl"><span className="tb-inch"><SnailMark size={14} /></span></span>
        </div>
        <div className="tb-foot-row">
          <Link href="/" aria-label="Wirl home"><Wordmark size={24} /></Link>
          <div className="tb-foot-links">
            <a href="https://docs.wirl.dev">Docs</a>
            <a href="#waitlist">Waitlist</a>
            <span>© 2026 Wirl</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
