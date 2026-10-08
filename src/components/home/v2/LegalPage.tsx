// A legal page (terms, privacy): the site's nav and footer around a Markdown
// document rendered as prose. Headings, lists, tables, inline code and links
// come through as written; tables scroll sideways on a phone instead of
// breaking the layout. Colours follow the page's theme variables, so night
// mode works.

import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Wordmark from '@/components/Wordmark';
import ThemeToggle from '@/components/ThemeToggle';
import { SnailMark } from '@/components/paper/Snail';
import { CSS } from '../css';
import { tb } from '../copy';
import { GlobalDefs } from '../kit';

const LEGAL_CSS = `
.tbx .legal { max-width: 760px; margin: 0 auto; padding: 28px 0 72px; color: var(--text); }
.tbx .legal h1 { font-weight: 800; font-size: clamp(34px, 4vw, 52px); line-height: 1.04; letter-spacing: -0.035em; color: var(--heading); }
.tbx .legal h2 { margin-top: 48px; font-weight: 800; font-size: 28px; line-height: 1.15; letter-spacing: -0.025em; color: var(--heading); }
.tbx .legal h3 { margin-top: 30px; font-weight: 800; font-size: 20px; line-height: 1.25; letter-spacing: -0.015em; color: var(--heading); }
.tbx .legal p, .tbx .legal li { font-size: 17px; line-height: 1.6; }
.tbx .legal p { margin-top: 16px; }
.tbx .legal h1 + p { margin-top: 20px; }
.tbx .legal ul, .tbx .legal ol { margin-top: 14px; padding-left: 24px; display: grid; gap: 8px; }
.tbx .legal ul { list-style: disc; }
.tbx .legal ol { list-style: decimal; }
.tbx .legal li::marker { color: var(--muted); }
.tbx .legal strong { font-weight: 750; color: var(--heading); }
.tbx .legal a { color: var(--link); font-weight: 650; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 2px; }
.tbx .legal code { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: .9em; background: var(--card); border: 1.5px solid var(--card-edge); border-radius: 6px; padding: 1px 6px; white-space: nowrap; }
.tbx .legal .tbl { margin-top: 18px; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.tbx .legal table { width: 100%; min-width: 560px; border-collapse: separate; border-spacing: 0; font-size: 15.5px; line-height: 1.5; background: var(--card); border: 2.5px solid var(--line); border-radius: 16px; }
.tbx .legal th, .tbx .legal td { text-align: left; vertical-align: top; padding: 11px 14px; border-top: 1.5px solid var(--card-edge); }
.tbx .legal thead th { border-top: 0; font-size: 13px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
.tbx .legal td code { white-space: normal; }
.tbx .legal hr { margin: 40px 0; border: 0; border-top: 2px dashed var(--rule); }
@media (max-width: 640px) {
  .tbx .legal { padding-top: 12px; }
  .tbx .legal p, .tbx .legal li { font-size: 16.5px; }
  .tbx .legal h2 { font-size: 25px; margin-top: 40px; }
}
`;

export default function LegalPage({ markdown }: { markdown: string }) {
  return (
    <div className="tbx">
      <style href="tbx" precedence="default">{CSS}</style>
      <style href="tbx-legal" precedence="default">{LEGAL_CSS}</style>
      <GlobalDefs />

      <nav className="wrap tb-nav" aria-label="Main">
        <Link href="/" aria-label="Wirl home"><Wordmark /></Link>
        <div className="tb-nav-links">
          <ThemeToggle />
          <a href="https://docs.wirl.dev" className="tb-plain">Docs</a>
          <a href="https://app.wirl.dev/login" className="tb-plain">Log in</a>
          <Link href="/#connect" className="tbtn"><span className="tb-phone">Connect</span><span className="tb-wide">{tb.nav_cta}</span></Link>
        </div>
      </nav>

      <main className="wrap">
        <article className="legal">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children }) => <div className="tbl"><table>{children}</table></div>,
            }}
          >
            {markdown}
          </Markdown>
        </article>
      </main>

      <footer className="wrap tb-foot">
        <div className="tb-ground" aria-hidden="true">
          <span className="tb-crawl"><span className="tb-inch"><SnailMark size={14} /></span></span>
        </div>
        <div className="tb-foot-row">
          <Link href="/" aria-label="Wirl home"><Wordmark size={24} /></Link>
          <div className="tb-foot-links">
            <a href="https://docs.wirl.dev">Docs</a>
            <Link href="/#waitlist">Waitlist</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <span>© 2026 Wirl</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
