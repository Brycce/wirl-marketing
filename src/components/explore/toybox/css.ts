// Every Toybox style, scoped under .tbx. Keyframes are prefixed tb-.
export const CSS = String.raw`
.tbx {
  --ink: #1B2420; --cream: #F7F1E4; --paper: #FFFDF7; --edge: #E4D9C3; --wash: #F3ECDD;
  --sun: #FFD23F; --sun-edge: #D9A514; --coral: #FF9A76; --mint: #A6E6BE; --sky: #A9D8F7; --lilac: #CDBFFF;
  --green: #2E9D5B; --tomato: #E5483B; --blue: #3F6FE8; --pink: #FF8FB8;
  background: var(--cream); color: var(--ink); min-height: 100vh; overflow-x: clip;
  font-feature-settings: 'cv11', 'ss03';
}
.tbx *, .tbx *::before, .tbx *::after { box-sizing: border-box; }
.tbx ::selection { background: var(--sun); color: var(--ink); }
.tbx :focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 8px; }
.tbx svg text { font-family: Inter, system-ui, sans-serif; font-weight: 700; }
.tbx svg .mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace; font-weight: 600; }
.tbx .tb-art { display: block; width: 100%; height: auto; overflow: visible; }

.tbx .wrap { max-width: 1232px; margin: 0 auto; padding: 0 24px; }
@media (max-width: 640px) { .tbx .wrap { padding: 0 18px; } }

/* Type */
.tbx .tb-h1 { font-weight: 800; font-size: clamp(40px, 4.3vw, 60px); line-height: 1.02; letter-spacing: -0.04em; text-wrap: balance; }
.tbx .tb-h2 { font-weight: 800; font-size: clamp(34px, 3.7vw, 52px); line-height: 1.03; letter-spacing: -0.035em; text-wrap: balance; }
.tbx .tb-lede { margin-top: 20px; font-size: 18px; line-height: 1.55; max-width: 42ch; }
.tbx .tb-lede strong { font-weight: 750; }
@media (max-width: 640px) { .tbx .tb-lede { font-size: 17px; } }
.tbx .tb-list { margin-top: 20px; display: grid; gap: 10px; font-size: 17.5px; line-height: 1.5; max-width: 44ch; }
.tbx .tb-list li { position: relative; padding-left: 30px; }
.tbx .tb-list li::before {
  content: ''; position: absolute; left: 2px; top: .42em; width: 14px; height: 14px; border-radius: 99px;
  background: var(--dot, var(--green)); border: 2px solid var(--ink);
}
.tbx .tb-kicker {
  display: inline-flex; align-items: center; gap: 8px; margin-bottom: 18px;
  font-size: 14px; font-weight: 750; letter-spacing: .01em;
  background: var(--paper); border: 2px solid var(--ink); border-radius: 99px; padding: 6px 12px 6px 8px;
  box-shadow: 0 3px 0 var(--ink);
}
.tbx .tb-kicker svg { width: 20px; height: 20px; flex: none; }

/* Slabs: big rounded blocks of colour, stacked with cream gaps like toy blocks. */
.tbx .slab { margin: 16px 16px 0; border-radius: 40px; position: relative; isolation: isolate; overflow: hidden; padding: 104px 0; }
.tbx .slab-in { max-width: 1232px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 64px); }
.tbx .bg-coral { background: var(--coral); }
.tbx .bg-mint { background: var(--mint); }
.tbx .bg-sky { background: var(--sky); }
.tbx .bg-lilac { background: var(--lilac); }
.tbx .bg-sun { background: var(--sun); }
.tbx .bg-ink { background: var(--ink); color: var(--cream); }
@media (max-width: 640px) {
  .tbx .slab { margin: 12px 10px 0; border-radius: 28px; padding: 60px 0 44px; }
}

/* Text beside the picture, alternating sides; on a phone, text first. */
.tbx .split { display: grid; gap: 44px; align-items: center; }
.tbx .split > * { min-width: 0; }
@media (min-width: 960px) {
  .tbx .split { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; }
  .tbx .split.flip { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
  .tbx .split.flip > .art { order: -1; }
}

/* Toy buttons: a pill on a 4px ink edge that squashes when pressed. */
.tbx .tbtn {
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font: inherit; font-weight: 750; font-size: 16px; line-height: 1; white-space: nowrap; letter-spacing: -0.005em;
  color: var(--ink); background: var(--sun); border: 2px solid var(--ink); border-radius: 999px;
  padding: 13px 20px; box-shadow: 0 4px 0 var(--ink); cursor: pointer; text-decoration: none;
  transition: transform .09s ease, box-shadow .09s ease, background-color .15s ease;
}
.tbx .tbtn:hover { transform: translateY(-1px); box-shadow: 0 5px 0 var(--ink); }
.tbx .tbtn:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--ink); }
.tbx .tbtn:disabled { opacity: .7; cursor: default; }
.tbx .tbtn-sm { font-size: 15px; padding: 10px 16px; }
.tbx .tbtn-paper { background: var(--paper); }
.tbx .tbtn-ink { background: var(--ink); color: var(--cream); box-shadow: 0 4px 0 #000; }
.tbx .tbtn-ink:hover { box-shadow: 0 5px 0 #000; }
.tbx .tbtn-ink:active { box-shadow: 0 1px 0 #000; }

/* Nav */
.tbx .tb-nav { display: flex; align-items: center; justify-content: space-between; padding-top: 20px; padding-bottom: 20px; }
.tbx .tb-nav a { color: var(--ink); text-decoration: none; }
.tbx .tb-nav-links { display: flex; align-items: center; gap: 22px; font-size: 15.5px; font-weight: 650; }
.tbx .tb-nav-links .tb-plain { opacity: .85; }
.tbx .tb-nav-links .tb-plain:hover { opacity: 1; text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 2px; }
.tbx .tb-nav .tbtn { padding: 11px 16px; font-size: 15px; }
@media (max-width: 639px) { .tbx .tb-nav-links .tb-plain { display: none; } }

/* Hero */
.tbx .tb-hero { padding-top: 36px; padding-bottom: 72px; display: grid; gap: 40px; align-items: center; }
@media (min-width: 1024px) { .tbx .tb-hero { grid-template-columns: minmax(0, 54fr) minmax(0, 46fr); gap: 48px; padding-top: 48px; padding-bottom: 88px; } }
.tbx .tb-hero .tb-lede { font-size: 19px; max-width: 44ch; margin-top: 24px; }
@media (max-width: 640px) { .tbx .tb-hero { padding-top: 16px; padding-bottom: 36px; } .tbx .tb-hero .tb-lede { font-size: 17.5px; } }
.tbx .tb-hero-art-wrap { position: relative; }

/* Connect block */
.tbx .tb-connect { margin-top: 32px; max-width: 580px; scroll-margin-top: 24px; }
.tbx .tb-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
.tbx .tb-tab {
  display: inline-flex; align-items: center; gap: 7px; font: inherit; font-size: 14.5px; font-weight: 700; line-height: 1;
  color: var(--ink); background: var(--paper); border: 2px solid var(--ink); border-radius: 999px; padding: 8px 13px;
  box-shadow: 0 3px 0 var(--ink); cursor: pointer; transition: transform .09s ease, box-shadow .09s ease, background-color .15s;
}
.tbx .tb-tab:hover { background: #FFF6D6; }
.tbx .tb-tab:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--ink); }
.tbx .tb-tab[aria-selected='true'] { background: var(--ink); color: var(--cream); transform: translateY(2px); box-shadow: 0 1px 0 var(--ink); }
.tbx .tb-tab-mark { width: 16px; height: 16px; flex: none; margin-left: -2px; }
.tbx .tb-term {
  background: #28342E; color: #E9F1EA; border: 3px solid var(--ink); border-radius: 18px; overflow: hidden;
  box-shadow: 0 3px 0 #101713, 0 6px 0 var(--ink);
}
.tbx .tb-term-bar { display: flex; align-items: center; gap: 7px; background: var(--ink); padding: 10px 14px; border-bottom: 2px solid #101713; }
.tbx .tb-term-bar i { width: 11px; height: 11px; border-radius: 99px; background: #3B4A42; border: 2px solid #101713; }
.tbx .tb-term-bar span { margin-left: 8px; font-size: 13px; font-weight: 650; color: #B9C6BD; }
.tbx .tb-term-body { padding: 18px 20px 20px; }
.tbx .tb-term pre { margin: 0; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 15px; line-height: 1.6; white-space: pre-wrap; word-break: break-all; color: #E9F1EA; }
.tbx .tb-term-row { margin-top: 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px 14px; }
.tbx .tb-hint { font-size: 14px; line-height: 1.45; color: #C9D6CD; max-width: 44ch; flex: 1 1 220px; }
.tbx .tb-copy { min-width: 92px; }
.tbx .tb-copy[data-copied='yes'] { background: #A6E6BE; }
.tbx .tb-burst { position: absolute; left: 50%; top: 50%; width: 0; height: 0; pointer-events: none; }
.tbx .tb-burst i {
  position: absolute; left: -7px; top: -7px; width: 14px; height: 14px; background: var(--sun);
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
  animation: tb-burst .6s cubic-bezier(.2,.8,.2,1) both;
}
.tbx .tb-burst i:nth-child(1) { --bx: -48px; --by: -26px; }
.tbx .tb-burst i:nth-child(2) { --bx: 6px; --by: -40px; animation-delay: .04s; }
.tbx .tb-burst i:nth-child(3) { --bx: 50px; --by: -22px; animation-delay: .08s; }
@keyframes tb-burst {
  0% { transform: translate(0, 0) scale(.3) rotate(0); opacity: 0; }
  25% { opacity: 1; }
  100% { transform: translate(var(--bx), var(--by)) scale(1.15) rotate(90deg); opacity: 0; }
}
.tbx .tb-after { margin-top: 18px; font-size: 15px; line-height: 1.5; max-width: 52ch; }
.tbx .tb-after a { color: var(--ink); font-weight: 700; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 2px; }

/* ---------- Hero motion: a 12s story that rests on its final frame. ---------- */
.tbx .tb-h-typecover { transform-box: fill-box; transform-origin: 100% 50%; transform: scaleX(0); animation: tb-h-type 12s steps(24, end) infinite; }
@keyframes tb-h-type { 0%, 3% { transform: scaleX(1); } 13%, 97% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
.tbx .tb-h-reply { transform-box: fill-box; transform-origin: 0 0; animation: tb-h-reply 12s cubic-bezier(.2,.9,.3,1.2) infinite; }
@keyframes tb-h-reply { 0%, 14% { opacity: 0; transform: scale(.92); } 18%, 96% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1); } }
.tbx .tb-h-linkcover { transform-box: fill-box; transform-origin: 100% 50%; transform: scaleX(0); animation: tb-h-link 12s cubic-bezier(.6,0,.3,1) infinite; }
@keyframes tb-h-link { 0%, 19% { transform: scaleX(1); } 25%, 97% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
.tbx .tb-h-sticker { transform-box: fill-box; transform-origin: 50% 50%; animation: tb-h-slap 12s cubic-bezier(.3,1.4,.5,1) infinite; }
@keyframes tb-h-slap {
  0%, 26% { opacity: 0; transform: scale(1.35) rotate(-10deg); }
  27% { opacity: 1; }
  30%, 96% { opacity: 1; transform: scale(1) rotate(0); }
  100% { opacity: 0; transform: scale(1) rotate(0); }
}
.tbx .tb-h-ticks { opacity: 0; transform-box: fill-box; transform-origin: 100% 50%; animation: tb-h-ticks 12s ease-out infinite; }
@keyframes tb-h-ticks { 0%, 29% { opacity: 0; transform: translateX(10px) scale(.6); } 31% { opacity: 1; } 36%, 100% { opacity: 0; transform: translateX(-4px) scale(1.1); } }
.tbx .tb-h-cursor { animation: tb-h-cursor 12s cubic-bezier(.45,0,.3,1) infinite; }
@keyframes tb-h-cursor {
  0%, 33% { transform: translate(-40px, 26px); }
  41% { transform: translate(0, 0); }
  43% { transform: translate(0, 3px); }
  46%, 100% { transform: translate(0, 0); }
}
.tbx .tb-h-pay { animation: tb-h-pay 12s ease infinite; }
@keyframes tb-h-pay { 0%, 42% { transform: translateY(0); } 43.5%, 45% { transform: translateY(4px); } 47%, 100% { transform: translateY(0); } }
.tbx .tb-twinkle { transform-box: fill-box; transform-origin: 50% 50%; animation: tb-twinkle 2.8s ease-in-out infinite; }
.tbx .tb-twinkle-2 { animation-delay: -1s; }
.tbx .tb-twinkle-3 { animation-delay: -1.9s; animation-duration: 2.2s; }
@keyframes tb-twinkle { 0%, 100% { transform: scale(1) rotate(0); } 50% { transform: scale(.7) rotate(20deg); } }

@media (prefers-reduced-motion: reduce) {
  .tbx *, .tbx *::before, .tbx *::after { animation: none !important; transition: none !important; }
}
`;
