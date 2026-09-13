import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { SWIRL_PATH } from '@/components/swirl';

export const dynamic = 'force-static';
export const alt = 'Wirl. Let your people build.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The fonts live in the repo so the build never depends on Google being up.
// This route is rendered once at build time, so reading from the source tree is fine.
const fontFile = (name: string) => readFile(path.join(process.cwd(), 'src/app/fonts', name));

export default async function Image() {
  const [fraunces, bricolage] = await Promise.all([fontFile('Fraunces-600.ttf'), fontFile('BricolageGrotesque-500.ttf')]);

  return new ImageResponse(
    (
      <div
        style={{
          background: '#F5EFE3',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'Fraunces',
          color: '#1F2A1F',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 36 }}>
          <svg viewBox="0 0 32 32" width="64" height="64">
            <path d={SWIRL_PATH} fill="none" stroke="#1F2A1F" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontSize: 60, fontWeight: 600, lineHeight: 1 }}>wirl</div>
        </div>
        <div style={{ fontSize: 92, lineHeight: 1, textAlign: 'center', fontWeight: 600, letterSpacing: -1 }}>Let your people build.</div>
        <div style={{ fontSize: 32, color: '#5E5A4C', marginTop: 28, textAlign: 'center', fontFamily: 'Bricolage' }}>
          A secure place for the internal tools your team makes. Governance built in.
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 44 }}>
          {['anyone can ship', 'login on every app', 'keys never in the app', 'audit log'].map((text) => (
            <div
              key={text}
              style={{
                background: '#FCF8F0',
                borderRadius: 999,
                boxShadow: '0 10px 22px -12px rgba(31,42,31,0.45)',
                padding: '12px 24px',
                fontSize: 26,
                fontFamily: 'Bricolage',
                fontWeight: 500,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: fraunces, weight: 600, style: 'normal' },
        { name: 'Bricolage', data: bricolage, weight: 500, style: 'normal' },
      ],
    }
  );
}
