'use client';

import { useState } from 'react';
import Sprite from './pixel/Sprite';
import { CHECK } from './pixel/sprites';

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
        <Sprite rows={CHECK} scale={4} className="shrink-0 mt-1" />
        <div className="text-left">
          <p className="font-pixel text-xl leading-none">You&apos;re on the list.</p>
          <p className="text-dim text-sm mt-1.5">We&apos;ll write when your workspace is ready.</p>
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
          className="px-input flex-1 min-w-0 px-4 py-2.5 text-[15px] placeholder:text-dim/70 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="px-btn px-5 py-2.5 font-pixel text-[18px] leading-none disabled:opacity-60 whitespace-nowrap"
        >
          {state === 'submitting' ? 'Joining' : 'Join the waitlist'}
        </button>
      </div>
      <p className="text-[13px] text-dim mt-3 min-h-[1.25rem]" aria-live="polite">
        {state === 'error' ? <span className="text-red">{message}</span> : 'Private beta. No spam, no drip campaign.'}
      </p>
    </form>
  );
}
