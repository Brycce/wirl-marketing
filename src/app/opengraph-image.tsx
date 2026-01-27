import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Wirl – Email automation built for developers';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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
          padding: '40px 60px',
          position: 'relative',
        }}
      >
        {/* Domain top right */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 50,
            fontSize: 36,
            fontWeight: 900,
            color: '#18181b',
          }}
        >
          wirl.dev
        </div>

        {/* Logo */}
        <img
          src="https://wirl.dev/logo.png"
          width={120}
          height={120}
          style={{ marginBottom: 28 }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: '#18181b',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Email automation
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: '#18181b',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          built for developers
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#71717a',
            marginTop: 24,
          }}
        >
          Track events. Trigger sequences. Send emails.
        </div>

        {/* Pills */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 40,
          }}
        >
          {['Event-driven', 'API-first', 'No drag & drop'].map((text) => (
            <div
              key={text}
              style={{
                background: '#f4f4f5',
                padding: '18px 36px',
                borderRadius: 100,
                fontSize: 28,
                color: '#52525b',
                fontWeight: 700,
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
    }
  );
}
