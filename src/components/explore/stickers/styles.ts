// Every style for the sticker book, scoped under .sb. Rendered once as a
// <style> tag by the page.

export const CSS = String.raw`
.sb {
  --ink: #1F2A1F; --dim: #5A6057; --bg: #F6F4EF;
  --shadow: drop-shadow(0 1px 1px rgba(31,42,31,.18)) drop-shadow(0 6px 10px rgba(31,42,31,.20));
  --lift: drop-shadow(0 2px 2px rgba(31,42,31,.14)) drop-shadow(0 14px 18px rgba(31,42,31,.24));
  --far: drop-shadow(0 4px 4px rgba(31,42,31,.10)) drop-shadow(0 26px 26px rgba(31,42,31,.22));
  background: var(--bg); color: var(--ink); min-height: 100vh; overflow-x: clip;
}
.sb ::selection { background: #FFCC3D; color: #1F2A1F; }
.sb svg text { font-family: Inter, system-ui, sans-serif; }

/* ---------- Layout ---------- */
.sb-wrap { max-width: 1200px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
@media (max-width: 639px) { .sb-wrap { padding-left: 16px; padding-right: 16px; } }
.sb-h2 { font-weight: 800; font-size: clamp(2rem, 1.2rem + 2.2vw, 2.85rem); line-height: 1.06; letter-spacing: -0.035em; text-wrap: balance; }
.sb-lede { margin-top: 18px; font-size: 18px; line-height: 1.6; color: rgba(31,42,31,.86); max-width: 46ch; }
@media (max-width: 639px) { .sb-lede { font-size: 17px; } }

/* Text beside picture on wide screens, text then picture below. */
.sb-split { display: grid; gap: 40px; align-items: center; }
@media (min-width: 1024px) {
  .sb-split { grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 56px; }
  .sb-split > .t6 { grid-column: span 6; } .sb-split > .a6 { grid-column: span 6; }
  .sb-split > .t5 { grid-column: span 5; } .sb-split > .a7 { grid-column: span 7; }
  .sb-split.flip > :first-child { order: 2; }
  .sb-split.top { align-items: start; }
}
@media (min-width: 768px) and (max-width: 1023px) { .sb-split > .art { max-width: 620px; width: 100%; margin: 0 auto; } }

/* ---------- Pages and stickers ---------- */
.sb-scene {
  position: relative; width: 100%; aspect-ratio: var(--W) / var(--H);
  --SW: var(--W); --SH: var(--H);
  background: var(--page); border-radius: 30px; container-type: inline-size;
}
@media (max-width: 767px) {
  .sb-scene { aspect-ratio: var(--MW) / var(--MH); --SW: var(--MW); --SH: var(--MH); border-radius: 24px; }
}

.sb-stk { position: relative; filter: var(--shadow); pointer-events: none; }
.sb-abs {
  position: absolute; z-index: var(--z, auto);
  left: calc((var(--x) - var(--pad) * var(--s)) / var(--SW) * 100%);
  top: calc((var(--y) - var(--pad) * var(--s)) / var(--SH) * 100%);
  width: calc(var(--bw) * var(--s) / var(--SW) * 100%);
}
@media (max-width: 767px) {
  .sb-abs {
    left: calc((var(--mx) - var(--pad) * var(--ms)) / var(--SW) * 100%);
    top: calc((var(--my) - var(--pad) * var(--ms)) / var(--SH) * 100%);
    width: calc(var(--bw) * var(--ms) / var(--SW) * 100%);
  }
  .sb-abs > .sb-a > .sb-rot { rotate: calc(var(--mr) * 1deg); }
  .sb-stk.no-m { display: none; }
}
@media (min-width: 768px) { .sb-stk.no-d { display: none; } }
.sb-a { transform-origin: 50% 50%; }
.sb-rot { position: relative; rotate: calc(var(--r, 0) * 1deg); transition: rotate .22s cubic-bezier(.2,.8,.2,1), translate .22s cubic-bezier(.2,.8,.2,1); }
.sb-art { display: block; width: 100%; height: auto; overflow: visible; }
.sb-art * { pointer-events: visiblePainted; }
.sb-flap { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 1px 1.2px rgba(31,42,31,.35)); }
.sb-flap path { transform-box: fill-box; transform-origin: 100% 100%; scale: 0; }

/* The white die-cut border: the drawing again, in white, fattened by 7px all round. */
.sb-cut, .sb-cut * { fill: #FFFFFF !important; stroke: #FFFFFF !important; animation: none !important; }
.sb-cut * { stroke-width: 14px; stroke-linejoin: round; stroke-linecap: round; stroke-opacity: 1 !important; fill-opacity: 1 !important; opacity: 1 !important; }
.sb-cut text, .sb-cut .nocut { display: none; }

/* A peeled corner that stays peeled. */
.peel-still .sb-art { clip-path: var(--p1); }
.peel-still .sb-flap path { scale: 1; }
/* A corner that lifts under the pointer. */
.peel-hover .sb-art { clip-path: var(--p0); transition: clip-path .25s cubic-bezier(.2,.8,.2,1); }
.peel-hover .sb-flap path { transition: scale .25s cubic-bezier(.2,.8,.2,1); }

@media (hover: hover) {
  .sb-stk.hv:hover { filter: var(--lift); }
  .sb-stk.hv:hover > .sb-a > .sb-rot { rotate: calc(var(--r, 0) * .4deg); translate: 0 -3px; }
  @media (max-width: 767px) { .sb-abs.hv:hover > .sb-a > .sb-rot { rotate: calc(var(--mr, 0) * .4deg); } }
  .peel-hover:hover .sb-art { clip-path: var(--p1); }
  .peel-hover:hover .sb-flap path { scale: 1; }
}
.sb-stk { transition: filter .22s cubic-bezier(.2,.8,.2,1); }

/* ---------- Slapping stickers on ---------- */
@keyframes sb-slap {
  0% { opacity: 0; transform: translateY(-16px) scale(1.1) rotate(3deg); }
  55% { opacity: 1; transform: translateY(1px) scale(.985) rotate(-.3deg); }
  78% { transform: translateY(0) scale(1.006) rotate(0); }
  100% { opacity: 1; transform: none; }
}
@keyframes sb-slap-shadow { 0% { filter: var(--far); } 100% { filter: var(--shadow); } }
.sb-hero .sb-stk { animation: sb-slap-shadow .34s ease-out backwards; animation-delay: calc(var(--i, 0) * 120ms + 200ms); }
.sb-hero .sb-a { animation: sb-slap .34s cubic-bezier(.3,.7,.3,1) backwards; animation-delay: calc(var(--i, 0) * 120ms + 200ms); }
.sb-armed .sb-wait:not(.is-in) .sb-a { opacity: 0; }
.sb-armed .sb-wait.is-in .sb-stk { animation: sb-slap-shadow .34s ease-out backwards; animation-delay: calc(var(--i, 0) * var(--gap, 110ms)); }
.sb-armed .sb-wait.is-in .sb-a { animation: sb-slap .34s cubic-bezier(.3,.7,.3,1) backwards; animation-delay: calc(var(--i, 0) * var(--gap, 110ms)); }

/* ---------- Idle life ---------- */
.sb-blink { transform-box: fill-box; transform-origin: 50% 50%; animation: sb-blink 5s infinite; }
@keyframes sb-blink { 0%, 94%, 100% { transform: scaleY(1); } 96% { transform: scaleY(.12); } }
.sb-shifty { animation: sb-shifty 5s ease-in-out infinite; }
@keyframes sb-shifty { 0%, 30%, 100% { transform: translateX(0); } 36%, 52% { transform: translateX(-2.5px); } 58%, 74% { transform: translateX(2.5px); } 80% { transform: translateX(0); } }

/* Hero loop, ten seconds: the pointer goes to 'Sign in with Google', clicks,
   and the app appears; then it all goes back. */
.sb-ptr { --pdx: var(--dpdx); --pdy: var(--dpdy); }
@media (max-width: 767px) { .sb-ptr { --pdx: var(--mpdx); --pdy: var(--mpdy); } }
.sb-loop-ptr { animation: sb-ptr 10s ease-in-out 2.2s infinite; }
@keyframes sb-ptr {
  0%, 12% { transform: translate(0, 0); }
  32% { transform: translate(calc(var(--pdx) / var(--SW) * 100cqw), calc(var(--pdy) / var(--SW) * 100cqw)); }
  36% { transform: translate(calc(var(--pdx) / var(--SW) * 100cqw), calc(var(--pdy) / var(--SW) * 100cqw)) scale(.82); }
  40%, 78% { transform: translate(calc(var(--pdx) / var(--SW) * 100cqw), calc(var(--pdy) / var(--SW) * 100cqw)); }
  96%, 100% { transform: translate(0, 0); }
}
.sb-loop-press { transform-box: fill-box; transform-origin: 50% 50%; animation: sb-press 10s ease-in-out 2.2s infinite; }
@keyframes sb-press { 0%, 34% { transform: none; } 36% { transform: scale(.95); } 39%, 100% { transform: none; } }
.sb-loop-signin { animation: sb-signin 10s ease-in-out 2.2s infinite; }
@keyframes sb-signin { 0%, 41% { opacity: 1; } 47%, 82% { opacity: 0; } 88%, 100% { opacity: 1; } }
.sb-loop-app { opacity: 0; animation: sb-app 10s ease-in-out 2.2s infinite; }
@keyframes sb-app { 0%, 41% { opacity: 0; } 47%, 82% { opacity: 1; } 88%, 100% { opacity: 0; } }

/* The link's corner lifts and settles, every seven seconds. */
.peel-loop .sb-art { animation: sb-peel-clip 7s ease-in-out infinite; }
.peel-loop .sb-flap path { animation: sb-peel-flap 7s ease-in-out infinite; }
@keyframes sb-peel-clip { 0%, 62%, 100% { clip-path: var(--p0); } 72%, 84% { clip-path: var(--p1); } }
@keyframes sb-peel-flap { 0%, 62%, 100% { scale: 0; } 72%, 84% { scale: 1; } }
.peel-slow .sb-art { animation-duration: 9s; }
.peel-slow .sb-flap path { animation-duration: 9s; }

.sb-hand { transform-box: fill-box; transform-origin: 50% 100%; animation: sb-spin 12s linear infinite; }
@keyframes sb-spin { to { transform: rotate(360deg); } }
.sb-dial { animation: sb-dial 8s ease-in-out infinite; }
@keyframes sb-dial { 0%, 40% { transform: rotate(0); } 55%, 100% { transform: rotate(90deg); } }
.sb-key { animation: sb-key 8s ease-in-out infinite; }
@keyframes sb-key { 0%, 10% { transform: translateX(0); } 38%, 88% { transform: translateX(18px); } 100% { transform: translateX(0); } }
.sb-print { animation: sb-print 10s steps(1) infinite; opacity: 0; }
@keyframes sb-print { 0%, 45% { opacity: 0; } 50%, 96% { opacity: 1; } 100% { opacity: 0; } }
.sb-print-roll { animation: sb-roll 10s ease-in-out infinite; }
@keyframes sb-roll { 0%, 44% { transform: translateY(0); } 50%, 96% { transform: translateY(0); } }

/* ---------- Buttons, chips, code ---------- */
.sb-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
  background: var(--ink); color: #fff; border-radius: 999px; padding: .78rem 1.25rem;
  font-weight: 600; font-size: 15px; line-height: 1; white-space: nowrap;
  box-shadow: 0 0 0 3px #fff, 0 1px 1px 3px rgba(31,42,31,.14), 0 7px 14px rgba(31,42,31,.22);
  transition: transform .14s ease, box-shadow .14s ease;
}
.sb-btn:hover { transform: translateY(-1px); box-shadow: 0 0 0 3px #fff, 0 2px 2px 3px rgba(31,42,31,.12), 0 12px 20px rgba(31,42,31,.26); }
.sb-btn:active { transform: translateY(1px); box-shadow: 0 0 0 3px #fff, 0 1px 1px 3px rgba(31,42,31,.16), 0 2px 4px rgba(31,42,31,.2); }
.sb-btn-sun { background: #FFCC3D; color: var(--ink); }
.sb-btn-sm { padding: .6rem 1rem; font-size: 14px; }
.sb-btn:focus-visible { outline: 3px solid #3D63FF; outline-offset: 5px; }

.sb-tab {
  display: inline-flex; align-items: center; gap: 7px; border-radius: 999px; background: #fff; color: var(--ink);
  padding: .52rem .85rem .52rem .7rem; font-size: 14px; font-weight: 600; line-height: 1; white-space: nowrap;
  box-shadow: 0 1px 1px rgba(31,42,31,.16), 0 4px 8px rgba(31,42,31,.13);
  transition: transform .14s ease, box-shadow .14s ease, background .12s ease, color .12s ease;
}
.sb-tab:hover { transform: translateY(-1px); box-shadow: 0 1px 1px rgba(31,42,31,.14), 0 8px 14px rgba(31,42,31,.18); }
.sb-tab[aria-selected="true"] { background: var(--ink); color: #fff; box-shadow: 0 0 0 3px #fff, 0 1px 1px 3px rgba(31,42,31,.14), 0 6px 12px rgba(31,42,31,.22); }
.sb-tab svg { width: 16px; height: 16px; flex: none; }
.sb-tab[aria-selected="true"] .sb-tab-ic { color: #fff; }

.sb-code {
  background: var(--ink); color: #E8F1E8; border-radius: 16px;
  box-shadow: 0 0 0 4px #fff, 0 1px 1px 4px rgba(31,42,31,.14), 0 8px 16px rgba(31,42,31,.2);
}
.sb-mono { font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace; }

.sb-card { background: #fff; border-radius: 20px; box-shadow: 0 1px 1px rgba(31,42,31,.12), 0 8px 18px rgba(31,42,31,.10); }

/* A little sticker that slaps on: the 'Copied' check, the waitlist check. */
@keyframes sb-pop { 0% { opacity: 0; transform: translateY(-8px) scale(1.25) rotate(14deg); } 60% { opacity: 1; transform: scale(.94) rotate(-4deg); } 100% { opacity: 1; transform: scale(1) rotate(-6deg); } }
.sb-pop { display: inline-block; animation: sb-pop .3s cubic-bezier(.3,.7,.3,1) both; filter: drop-shadow(0 1px 1px rgba(31,42,31,.2)) drop-shadow(0 4px 6px rgba(31,42,31,.2)); }

/* Mini stickers used as list markers. */
.sb-bullets { margin-top: 22px; display: grid; gap: 12px; }
.sb-bullets li { display: flex; gap: 14px; align-items: flex-start; font-size: 17px; line-height: 1.5; color: rgba(31,42,31,.9); }
.sb-mk { flex: none; width: 30px; height: 30px; margin-top: -2px; filter: drop-shadow(0 1px 1px rgba(31,42,31,.18)) drop-shadow(0 3px 4px rgba(31,42,31,.16)); }
.sb-dot { flex: none; width: 14px; height: 14px; margin-top: 6px; border-radius: 999px; background: #FF6A48; box-shadow: 0 0 0 3px #fff, 0 2px 4px 3px rgba(31,42,31,.12); }

/* FAQ */
.sb-faq summary { list-style: none; }
.sb-faq summary::-webkit-details-marker { display: none; }
.sb-toggle { flex: none; width: 30px; height: 30px; border-radius: 999px; background: #fff; display: grid; place-items: center;
  box-shadow: 0 0 0 1px rgba(31,42,31,.06), 0 1px 1px rgba(31,42,31,.14), 0 3px 6px rgba(31,42,31,.14); transition: transform .18s cubic-bezier(.2,.8,.2,1); }
.sb-faq details[open] .sb-toggle { transform: rotate(45deg); }

/* Footer snail: every twenty seconds he's peeled up and stuck down a bit further along. */
.sb-foot-snail { position: absolute; top: -9px; left: 0; width: 26px; animation: sb-hop 200s steps(1) infinite; }
.sb-foot-snail > span { display: block; animation: sb-restick 20s ease-in-out infinite; transform-origin: 30% 80%; filter: drop-shadow(0 1px 1px rgba(31,42,31,.2)) drop-shadow(0 2px 3px rgba(31,42,31,.14)); }
@keyframes sb-restick { 0%, 90%, 100% { transform: none; } 93% { transform: translateY(-5px) rotate(-10deg); } 96% { transform: translateY(-5px) rotate(-6deg); } }

/* Headline logo stickers */
.sb-logos { display: inline-flex; align-items: center; gap: .04em; vertical-align: -.3em; margin-left: .03em; }
.sb-logo {
  display: block; flex: none; width: .96em; height: .96em;
  filter: drop-shadow(0 .01em .017em rgba(31,42,31,.16)) drop-shadow(0 .05em .08em rgba(31,42,31,.2));
  transition: transform .22s cubic-bezier(.2,.8,.2,1), filter .22s cubic-bezier(.2,.8,.2,1);
}
.sb-logo > svg { display: block; width: 100%; height: 100%; overflow: visible; transform: rotate(var(--tilt, 0deg)); transition: transform .22s cubic-bezier(.2,.8,.2,1); }
.sb-logo-more { width: .62em; height: .62em; margin-left: .02em; }
@media (hover: hover) {
  .sb-logo:not(.sb-logo-more):hover { transform: translateY(-.05em); filter: drop-shadow(0 .012em .02em rgba(31,42,31,.12)) drop-shadow(0 .1em .13em rgba(31,42,31,.24)); }
  .sb-logo:not(.sb-logo-more):hover > svg { transform: rotate(calc(var(--tilt, 0deg) * .4)); }
}

/* Sticker sheet */
.sb-sheet { background: #fff; border-radius: 26px; rotate: -.6deg; box-shadow: 0 0 0 1px rgba(31,42,31,.05), 0 1px 1px rgba(31,42,31,.12), 0 10px 24px rgba(31,42,31,.12); }
.sb-sheet-item { display: flex; flex-direction: column; align-items: flex-start; text-decoration: none; color: inherit; }
.sb-sheet-item .sb-stk { filter: none; }
@media (hover: hover) {
  .sb-sheet-item:hover .sb-stk { filter: var(--lift); }
  .sb-sheet-item:hover .sb-rot { rotate: -3deg; translate: 0 -5px; }
  .sb-sheet-item:hover .sb-art { clip-path: var(--p1); }
  .sb-sheet-item:hover .sb-flap path { scale: 1; }
  .sb-sheet-item:hover .sb-kiss { opacity: 1; }
}
.sb-sheet-item .sb-art { clip-path: var(--p0); transition: clip-path .25s cubic-bezier(.2,.8,.2,1); }
.sb-sheet-item .sb-flap path { transition: scale .25s cubic-bezier(.2,.8,.2,1); }
.sb-sheet-item:focus-visible { outline: 3px solid #3D63FF; outline-offset: 6px; border-radius: 16px; }

/* Card corner stickers lift with their card. */
@media (hover: hover) {
  .sb-bcard:hover .sb-stk { filter: var(--lift); }
  .sb-bcard:hover .sb-rot { translate: 0 -4px; rotate: calc(var(--r, 0) * .5deg); }
  .sb-bcard:hover .sb-art { clip-path: var(--p1); }
  .sb-bcard:hover .sb-flap path { scale: 1; }
}
.sb-bcard .sb-art { clip-path: var(--p0); transition: clip-path .25s cubic-bezier(.2,.8,.2,1); }
.sb-bcard .sb-flap path { transition: scale .25s cubic-bezier(.2,.8,.2,1); }

/* Admin table */
.sb-table { font-size: 13.5px; }
.sb-table th { font-size: 11.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--dim); text-align: left; padding: 0 10px 10px; }
.sb-table td { padding: 10px; border-top: 1.5px solid #ECE9E2; vertical-align: middle; }
.sb-log-line { animation: sb-logline 6s ease-in-out infinite; }
@keyframes sb-logline { 0%, 86% { transform: translateY(0); opacity: 1; } 92% { transform: translateY(-6px); opacity: 0; } 93% { transform: translateY(6px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .sb *, .sb *::before, .sb *::after { animation: none !important; transition: none !important; }
  .sb-loop-app { opacity: 0 !important; }
}
`;
