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

  if (state === 'done') {
    return (
      <div className={`max-w-md flex items-start gap-3 ${center ? 'mx-auto justify-center' : ''}`}>
        <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true" className="shrink-0 mt-0.5">
          <circle cx="14" cy="14" r="14" fill="#2F7D4F" />
          <path d="M8 14.5 l4 4 l8 -9" fill="none" stroke="#FCF8F0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="text-left">
          <p className="font-display font-bold text-xl leading-none">You&apos;re on the list.</p>
          <p className="text-dim text-[14px] mt-1.5">We&apos;ll write when your workspace is ready.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`max-w-md ${center ? 'mx-auto text-center' : ''}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={id} className="sr-only">Work email</label>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={state === 'submitting'}
          className="input flex-1 min-w-0 px-4 py-2.5 text-[15px] placeholder:text-dim/70 disabled:opacity-60"
        />
        <button type="submit" disabled={state === 'submitting'} className="btn disabled:opacity-60">
          {state === 'submitting' ? 'Joining' : 'Join the waitlist'}
        </button>
      </div>
      <p className="text-[13px] text-dim mt-3 min-h-[1.25rem]" aria-live="polite">
        {state === 'error' ? <span className="text-red">{message}</span> : 'Private beta. No spam, no drip campaign.'}
      </p>
    </form>
  );
}
