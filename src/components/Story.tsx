'use client';

import { useEffect, useRef } from 'react';
import { CAPTIONS } from './data';

// One stage, six chapters. The block pins once it is in view and the reader
// scrolls through the outer wrapper's extra height. Each chapter gets a share
// of that travel. This sets a handful of CSS variables and a data attribute;
// the stage and the captions are CSS reading them.
//
//   --p        chapter 1: the pile becomes the app window (0..1)
//   --p5       chapter 5: the agent's terminal, for its typed lines (0..1)
//   --b2..--b5 a bell per overlay chapter: up during it, down as the next begins
//   --ov       how much to dim the grid behind an overlay
//   data-chapter which caption is showing

const STICKY_TOP = 72;
const N = 5; // animated chapters
const SEG = N + 1; // plus a hold on the mess before anything moves

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function Story({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const block = blockRef.current;
    if (!outer || !block) return;

    const set = (name: string, v: number) => outer.style.setProperty(name, v.toFixed(4));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      outer.style.height = '';
      set('--p', 1); set('--p5', 1);
      set('--b2', 0); set('--b3', 0); set('--b4', 0); set('--b5', 1);
      set('--ov', 0); set('--ov5', 0);
      outer.dataset.chapter = String(N);
      return;
    }

    let travel = 0;
    const size = () => {
      const step = Math.round(Math.min(600, Math.max(380, window.innerHeight * 0.62)));
      travel = step * SEG;
      outer.style.height = `${block.offsetHeight + travel}px`;
    };

    let raf = 0;
    let current = 0;

    const apply = (raw: number) => {
      const c = raw * SEG;
      const p: number[] = [0];
      for (let k = 1; k <= N; k++) {
        const t = clamp(c - k);
        p[k] = smooth(clamp((t - 0.12) / 0.76));
      }
      // An overlay rises in the second half of its chapter and is fully gone
      // by the middle of the next, so two are never on stage at once.
      const bell = (k: number) => Math.min(clamp((p[k] - 0.5) * 2), 1 - clamp((p[k + 1] ?? 0) * 2));
      set('--p', p[1]);
      set('--p5', p[5]);
      set('--b2', bell(2)); set('--b3', bell(3)); set('--b4', bell(4)); set('--b5', bell(5));
      set('--ov', Math.max(bell(2), bell(3), bell(4)));
      set('--ov5', bell(5));
      outer.dataset.chapter = String(p.filter((v) => v >= 0.5).length);
    };

    const tick = () => {
      const target = travel > 0 ? clamp((STICKY_TOP - outer.getBoundingClientRect().top) / travel) : 1;
      current += (target - current) * 0.25;
      if (Math.abs(target - current) < 0.0015) current = target;
      apply(current);
      if (current !== target) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      size();
      onScroll();
    };

    size();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={outerRef} className="story relative" data-chapter="0">
      <div ref={blockRef} className="sticky" style={{ top: STICKY_TOP }}>
        <div className="pile-panel relative overflow-hidden rounded-3xl bg-panel">{children}</div>
        <div className="relative h-[190px] sm:h-[160px] mt-5 text-center" aria-live="polite">
          {CAPTIONS.map((c, i) => (
            <div key={i} className={`cap cap-${i} absolute inset-0 px-4`}>
              <h2 className="display text-[1.6rem] md:text-[2rem] leading-[1.15] max-w-[26ch] mx-auto text-balance">{c.title}</h2>
              <p className="mt-3 text-[15px] text-dim leading-relaxed max-w-[56ch] mx-auto">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
