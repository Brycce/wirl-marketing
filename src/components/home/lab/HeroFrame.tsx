// Exploration only: the real hero (headline, lede, connect block) with any
// picture in the art column, so a hero concept is judged where it will live.
// Nothing here ships to the home page.
import type { ReactNode } from 'react';
import Wordmark from '@/components/Wordmark';
import { CSS } from '../css';
import { tb } from '../copy';
import { GlobalDefs } from '../kit';
import Connect from '../Connect';
import { Headline } from '../Page';

export default function HeroFrame({ art, label }: { art: ReactNode; label?: string }) {
  return (
    <div className="tbx">
      <style href="tbx" precedence="default">{CSS}</style>
      <GlobalDefs />
      <nav className="wrap tb-nav" aria-label="Main">
        <Wordmark />
        {label && <span style={{ fontSize: 14, fontWeight: 700, opacity: 0.55 }}>{label}</span>}
      </nav>
      <main>
        <header className="wrap tb-hero">
          <div>
            <h1 className="tb-h1"><Headline text={tb.hero_h1} /></h1>
            <p className="tb-lede">{tb.hero_p}</p>
            <Connect after={tb.connect_after} />
          </div>
          <div className="tb-hero-art-wrap">{art}</div>
        </header>
      </main>
    </div>
  );
}
