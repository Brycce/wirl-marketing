'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  filename?: string;
  children?: React.ReactNode;
}

export default function CodeBlock({ code, filename, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden relative group">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          {filename && <span className="text-xs text-gray-500 ml-3 font-mono">{filename}</span>}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-300 p-1"
          aria-label="Copy code"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
          )}
        </button>
      </div>
      {children ? (
        <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
          {children}
        </div>
      ) : (
        <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">{code}</pre>
      )}
    </div>
  );
}
