'use client';

import { useState } from 'react';

type State = 'idle' | 'submitting' | 'done' | 'error';

export default function WaitlistForm({ id = 'waitlist-email', center = false }: { id?: string; center?: boolean }) {
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

  const align = center ? 'mx-auto text-center' : '';

  if (state === 'done') {
    return (
      <div className={`max-w-md flex items-start gap-3 ${center ? 'mx-auto justify-center' : ''}`}>
        <svg viewBox="0 0 40 32" className="w-8 h-6 shrink-0 mt-0.5" fill="none" aria-hidden="true">
          <path d="M 4 18 C 10 22, 14 28, 16 28 C 20 26, 28 8, 37 4" stroke="#161616" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="draw-line" />
        </svg>
        <div className="text-left">
          <p className="font-bold">You&apos;re on the list.</p>
          <p className="text-dim text-sm mt-0.5">We&apos;ll write when your workspace is ready.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`max-w-md ${align}`}>
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor={id} className="sr-only">Work email</label>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={state === 'submitting'}
          className="flex-1 min-w-0 rounded-lg border border-rule bg-white px-4 py-2.5 text-[15px] placeholder:text-dim/70 focus:border-ink transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="bg-ink text-white px-5 py-2.5 rounded-lg text-[15px] font-semibold hover:bg-black transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {state === 'submitting' ? 'Joining' : 'Join the waitlist'}
        </button>
      </div>
      <p className="text-[13px] text-dim mt-2 min-h-[1.25rem]" aria-live="polite">
        {state === 'error' ? <span className="text-bad">{message}</span> : 'Private beta. No spam, no drip campaign.'}
      </p>
    </form>
  );
}
