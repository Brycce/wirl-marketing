// The home page as a sticker book. Each section's picture is a page of
// die-cut stickers of real things; the words sit beside it on the plain
// off-white ground.

import Link from 'next/link';
import Wordmark from '@/components/Wordmark';
import { copy } from '@/components/copy';
import { CSS } from './styles';
import { StickerDefs } from './kit';
import LogoRow from './LogoRow';
import Connect from './Connect';
import Slap from './Slap';
import { HeroArt } from './scenes/Hero';

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
      <section className="sb-wrap pt-8 md:pt-14 pb-16 md:pb-24">
        <div className="sb-split top">
          <div className="t6 min-w-0">
            <h1 className="font-extrabold leading-[1.04] tracking-[-0.04em] text-[38px] sm:text-[50px] lg:text-[58px] xl:text-[62px]">
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
    </div>
  );
}
