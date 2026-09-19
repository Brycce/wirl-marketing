'use client';

import { useState } from 'react';
import { CheckSticker } from './Connect';

// The waitlist form from the home page, same request and states, dressed for
// the sticker book: a white field with an ink border, an ink sticker button,
// and a green check that slaps on when you're in.

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
      <div className="max-w-md flex items-center gap-3.5">
        <span className="sb-pop shrink-0"><CheckSticker size={40} /></span>
        <div>
          <p className="font-bold text-[20px] leading-tight tracking-[-0.02em]">You&apos;re on the list.</p>
          <p className="text-[#5A6057] text-[15px] mt-1">We&apos;ll write when your workspace is ready.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md">
      <div className="flex flex-col sm:flex-row gap-3.5">
        <label htmlFor={id} className="sr-only">Work email</label>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={state === 'submitting'}
          className="flex-1 min-w-0 rounded-full bg-white border-2 border-[#1F2A1F] px-5 py-[11px] text-[16px] placeholder:text-[#5A6057]/80 disabled:opacity-60 focus:outline-none focus:ring-4 focus:ring-[#FFCC3D]"
        />
        <button type="submit" disabled={state === 'submitting'} className="sb-btn disabled:opacity-60">
          {state === 'submitting' ? 'Joining' : 'Join the waitlist'}
        </button>
      </div>
      <p className="text-[14px] text-[#5A6057] mt-3.5 min-h-[1.25rem]" aria-live="polite">
        {state === 'error' ? <span className="text-[#C8433D]">{message}</span> : 'Private beta. No spam, no drip campaign.'}
      </p>
    </form>
  );
}
