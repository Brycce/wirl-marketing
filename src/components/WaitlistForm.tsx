'use client';

import { useState } from 'react';

type State = 'idle' | 'submitting' | 'done' | 'error';

export default function WaitlistForm({ id }: { id?: string }) {
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
      <div id={id} className="max-w-md mx-auto text-center">
        <p className="text-gray-900 font-medium">You&apos;re on the list.</p>
        <p className="text-sm text-gray-500 mt-1">We&apos;ll email you when Wirl opens up.</p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={onSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="waitlist-email" className="sr-only">
          Work email
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={state === 'submitting'}
          className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="bg-gray-900 text-white text-sm px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {state === 'submitting' ? 'Joining…' : 'Join the waitlist'}
        </button>
      </div>
      {state === 'error' && <p className="text-sm text-red-600 mt-3 text-center sm:text-left">{message}</p>}
    </form>
  );
}
