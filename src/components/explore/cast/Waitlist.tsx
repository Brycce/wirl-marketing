'use client';

// The waitlist form from WaitlistForm.tsx: same POST to /api/waitlist, same
// states, restyled.

import { useState } from 'react';
import s from './cast.module.css';

type State = 'idle' | 'submitting' | 'done' | 'error';

export default function Waitlist({ id = 'waitlist-email' }: { id?: string }) {
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
      <div className="max-w-md flex items-start gap-3">
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" className="shrink-0">
          <circle cx="16" cy="16" r="14" fill="#1E9E5A" stroke="#2B2233" strokeWidth="2.5" />
          <path d="M9.5 16.5 l4.5 4.5 l8.5 -9.5" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <p className="font-extrabold text-[22px] leading-none tracking-[-0.02em]">You&apos;re on the list.</p>
          <p className="text-[#544A5E] text-[15px] mt-2">We&apos;ll write when your workspace is ready.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md">
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
          className={`${s.input} flex-1 min-w-0 px-4 py-3 text-[16px] disabled:opacity-60`}
        />
        <button type="submit" disabled={state === 'submitting'} className={`${s.btn} disabled:opacity-60`}>
          {state === 'submitting' ? 'Joining' : 'Join the waitlist'}
        </button>
      </div>
      <p className="text-[14px] text-[#544A5E] mt-3 min-h-[1.25rem]" aria-live="polite">
        {state === 'error' ? <span className="text-[#C4302F] font-semibold">{message}</span> : 'Private beta. No spam, no drip campaign.'}
      </p>
    </form>
  );
}
