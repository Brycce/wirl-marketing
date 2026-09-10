'use client';

import { useState } from 'react';

type State = 'idle' | 'submitting' | 'done' | 'error';

export default function WaitlistForm({ align = 'left' }: { align?: 'left' | 'center' }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setState('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setMessage(body.error ?? 'Something went wrong. Try again.');
        setState('error');
        return;
      }

      setState('done');
    } catch {
      setMessage('Could not reach the server. Try again.');
      setState('error');
    }
  }

  const alignClass = align === 'center' ? 'mx-auto text-center' : '';

  if (state === 'done') {
    return (
      <div className={`max-w-md flex items-start gap-3 ${alignClass}`}>
        <svg viewBox="0 0 40 32" className="w-9 h-7 shrink-0 mt-0.5" fill="none" aria-hidden="true">
          <path
            d="M 4 18 C 10 22, 14 28, 16 28 C 20 26, 28 8, 37 4"
            stroke="#2B38F5"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="draw-line"
          />
        </svg>
        <div>
          <p className="text-ink font-semibold text-lg">Wirled in.</p>
          <p className="text-dim mt-1">We&apos;ll write when your workspace is ready.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`max-w-md ${alignClass}`}>
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor={`waitlist-email-${align}`} className="sr-only">
          Work email
        </label>
        <input
          id={`waitlist-email-${align}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={state === 'submitting'}
          className="flex-1 min-w-0 border border-ink/30 bg-white rounded-md px-4 py-3 text-ink placeholder:text-dim/70 focus:border-ink transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="bg-cobalt text-white px-5 py-3 rounded-md font-semibold hover:bg-ink transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {state === 'submitting' ? 'Joining' : 'Join the waitlist'}
        </button>
      </div>
      <p className="text-sm mt-2 min-h-[1.25rem]" aria-live="polite">
        {state === 'error' ? <span className="text-cobalt">{message}</span> : <span className="text-dim">Private beta. No spam, no drip campaign.</span>}
      </p>
    </form>
  );
}
