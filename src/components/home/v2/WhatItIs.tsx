// What Wirl is, said once, between the problem and the features. The list
// above it names where tools live today; the bands below go deep on each
// feature. This beat is the shortest on the page: a headline and one
// paragraph, so it reads as a statement rather than another list.

import { Keep } from '../Page';

const CSS = `
.tbx .wi { text-align: center; max-width: 880px; margin: 0 auto; padding: 14px 0 10px; }
.tbx .wi .tb-h2 { font-size: clamp(34px, 4.2vw, 58px); max-width: 18ch; margin: 0 auto; }
.tbx .wi .tb-lede { margin: 22px auto 0; max-width: 58ch; font-size: 19px; line-height: 1.55; text-wrap: pretty; }
.tbx .wi .tb-lede b { font-weight: 750; color: var(--heading); white-space: nowrap; }
@media (max-width: 640px) { .tbx .wi .tb-lede { font-size: 17px; } }
`;

export default function WhatItIs({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="wi">
      <style href="tbx-wi" precedence="default">{CSS}</style>
      <h2 className="tb-h2"><Keep text={title} /></h2>
      <p className="tb-lede">{children}</p>
    </div>
  );
}
