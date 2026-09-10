import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: '#161616',
        panel: '#F4F4F1',
        rule: '#E6E6E1',
        dim: '#6B6B66',
        tape: '#FFE04A',
        ok: { DEFAULT: '#146C3A', bg: '#DDF3E4' },
        bad: { DEFAULT: '#A32D22', bg: '#FBE3E0' },
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 18px 40px -22px rgba(0,0,0,0.28)',
      },
    },
  },
  plugins: [],
};
export default config;
