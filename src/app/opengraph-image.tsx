import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Wirl. Let your people build.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fraunces = await fetch(
    'https://fonts.gstatic.com/s/fraunces/v38/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58njr1a03gg7S2nfgRYIctxujDg.ttf'
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'Fraunces',
          color: '#161616',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://wirl.dev/logo.png" alt="" width={96} height={96} style={{ marginBottom: 36 }} />
        <div style={{ fontSize: 76, lineHeight: 1.05, textAlign: 'center', letterSpacing: '-1.5px', maxWidth: 800 }}>
          Let your people build.
        </div>
        <div style={{ fontSize: 30, color: '#6B6B66', marginTop: 28, textAlign: 'center' }}>
          A secure place for internal tools, governance built in.
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 44 }}>
          {['Anyone can ship', 'Login on every app', 'Team permissions', 'Audit log'].map((text) => (
            <div key={text} style={{ background: '#F4F4F1', padding: '12px 24px', borderRadius: 100, fontSize: 24 }}>
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Fraunces', data: fraunces, weight: 400, style: 'normal' }] }
  );
}
