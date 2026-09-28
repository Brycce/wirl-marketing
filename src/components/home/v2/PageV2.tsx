// Version 2 of the home page, for comparison with the live one. Two changes:
// the hero is centred (headline, one line, the connect block), and "How it
// works" comes straight after it, covering the builder and the admin in one
// place. The steps band and the feature index it replaces are left out; the
// rest of the page is the live page's own sections.

import Link from 'next/link';
import Wordmark from '@/components/Wordmark';
import ThemeToggle from '@/components/ThemeToggle';
import { SnailMark } from '@/components/paper/Snail';
import { CSS } from '../css';
import { tb } from '../copy';
import { GlobalDefs, K } from '../kit';
import Connect from '../Connect';
import Waitlist from '../Waitlist';
import MessStickers from '../scenes/Mess';
import { SigninScene, OnlyScene, KeysScene, RollbackScene, ShareScene } from '../scenes/Features';
import { AdminTable, LogCard } from '../scenes/Admin';
import { APPS, AppStickerArt } from '../scenes/Small';
import { Headline, Keep, Split, Slab, faqJsonLd } from '../Page';
import HowItWorks from './HowItWorks';

const V2_CSS = `
.tbx .hc { text-align: center; padding-top: 44px; padding-bottom: 36px; }
.tbx .hc .tb-h1 { font-size: clamp(40px, 5.6vw, 76px); max-width: 15ch; margin: 0 auto; }
.tbx .hc .tb-lede { margin: 26px auto 0; max-width: 50ch; font-size: 20px; text-wrap: balance; }
.tbx .hc-connect { max-width: 640px; margin: 34px auto 0; text-align: left; }
.tbx .hc-connect [role=tablist] { justify-content: center; }
.tbx .hc-connect .tb-connect > p:last-child { text-align: center; margin-left: auto; margin-right: auto; }
@media (max-width: 640px) {
  .tbx .hc { padding-top: 18px; padding-bottom: 22px; }
  .tbx .hc .tb-lede { font-size: 17.5px; }
}
`;

export default function PageV2() {
  return (
    <div className="tbx">
      <style href="tbx" precedence="default">{CSS}</style>
      <style href="tbx-v2" precedence="default">{V2_CSS}</style>
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
        {/* Hero, centred */}
        <header className="wrap hc">
          <h1 className="tb-h1"><Headline text={tb.hero_h1} /></h1>
          <p className="tb-lede">{tb.hero_p}</p>
          <div className="hc-connect">
            <Connect after={tb.connect_after} />
          </div>
        </header>

        <HowItWorks />

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

        <Slab id="signin" tone="bg-blush">
          <Split
            flip
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
            flip
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
            flip
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
          <h2 className="tb-h2">{tb.faq_h2}</h2>
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
