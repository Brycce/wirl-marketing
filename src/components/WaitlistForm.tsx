'use client';

import { useState } from 'react';

type State = 'idle' | 'submitting' | 'done' | 'error';
type Tone = 'tape' | 'ink' | 'paper';

const styles: Record<Tone, { input: string; button: string; note: string; done: string; check: string }> = {
  tape: {
    input: 'bg-white/60 border-2 border-ink text-ink placeholder:text-ink/50 focus:bg-white',
    button: 'bg-ink text-tape hover:bg-black',
    note: 'text-ink/70',
    done: 'text-ink',
    check: '#161616',
  },
  ink: {
    input: 'bg-white/5 border-2 border-white/25 text-white placeholder:text-white/40 focus:border-white',
    button: 'bg-tape text-ink hover:bg-white',
    note: 'text-white/60',
    done: 'text-white',
    check: '#FFE04A',
  },
  paper: {
    input: 'bg-white border-2 border-ink/30 text-ink placeholder:text-dim/70 focus:border-ink',
    button: 'bg-ink text-paper hover:bg-black',
    note: 'text-dim',
    done: 'text-ink',
    check: '#161616',
  },
};

export default function WaitlistForm({ tone = 'tape', id = 'waitlist-email' }: { tone?: Tone; id?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');
  const s = styles[tone];

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
      <div className={`max-w-md flex items-start gap-3 ${s.done}`}>
        <svg viewBox="0 0 40 32" className="w-9 h-7 shrink-0 mt-0.5" fill="none" aria-hidden="true">
          <path
            d="M 4 18 C 10 22, 14 28, 16 28 C 20 26, 28 8, 37 4"
            stroke={s.check}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="draw-line"
          />
        </svg>
        <div>
          <p className="font-bold text-lg">You&apos;re on the list.</p>
          <p className="opacity-70 mt-0.5">We&apos;ll write when your workspace is ready.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md">
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
          className={`flex-1 min-w-0 rounded-md px-4 py-3 transition-colors disabled:opacity-60 ${s.input}`}
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className={`px-5 py-3 rounded-md font-bold transition-colors disabled:opacity-60 whitespace-nowrap ${s.button}`}
        >
          {state === 'submitting' ? 'Joining' : 'Join the waitlist'}
        </button>
      </div>
      <p className={`text-sm mt-2 min-h-[1.25rem] ${s.note}`} aria-live="polite">
        {state === 'error' ? message : 'Private beta. No spam, no drip campaign.'}
      </p>
    </form>
  );
}
