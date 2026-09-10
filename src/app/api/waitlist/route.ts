import { NextResponse } from 'next/server';

const NOTIFY_TO = 'bryce@oimo.tech';
const NOTIFY_FROM = 'Wirl Waitlist <waitlist@wirl.dev>';

// Light in-memory rate limit. Resets on cold start, which is fine — this is
// a speed bump against casual abuse, not a security control.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429 });
  }

  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Never report success for an address we did not actually deliver.
    console.error('waitlist: RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Signup is temporarily unavailable.' }, { status: 503 });
  }

  const company = typeof request.headers.get('referer') === 'string' ? request.headers.get('referer') : '';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: [NOTIFY_TO],
      reply_to: email,
      subject: `Wirl waitlist: ${email}`,
      text: `${email} joined the Wirl waitlist.\n\nFrom: ${company || 'unknown page'}`,
    }),
  });

  if (!res.ok) {
    console.error('waitlist: resend responded', res.status);
    return NextResponse.json({ error: 'Something went wrong. Try again.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
