'use client';

// The working waitlist form from components/WaitlistForm.tsx, restyled: a
// paper input on a toy edge and an ink toy button.

import { useState } from 'react';

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
      <div className="tb-done" role="status">
        <svg viewBox="0 0 36 36" width="36" height="36" aria-hidden="true">
          <circle cx="18" cy="18" r="15.5" fill="#2E9D5B" stroke="#1B2420" strokeWidth="3" />
          <path d="M11 18.5 l4.6 4.6 l9.4 -10" fill="none" stroke="#FFFDF7" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <p className="tb-done-h">You&apos;re on the list.</p>
          <p className="tb-done-p">We&apos;ll write when your workspace is ready.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="tb-form">
      <div className="tb-form-row">
        <label htmlFor={id} className="sr-only">Work email</label>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={state === 'submitting'}
          className="tb-input"
        />
        <button type="submit" disabled={state === 'submitting'} className="tbtn tbtn-ink">
          {state === 'submitting' ? 'Joining' : 'Join the waitlist'}
        </button>
      </div>
      <p className="tb-form-note" aria-live="polite">
        {state === 'error' ? <span className="tb-err">{message}</span> : 'Private beta. No spam, no drip campaign.'}
      </p>
    </form>
  );
}
