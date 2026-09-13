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
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: '#1F2A1F',
        cream: '#F5EFE3',
        card: '#FCF8F0',
        sand: '#E6DFCB',
        dim: '#5E5A4C',
        green: '#2F7D4F',
        mint: '#DCEBDD',
        sky: '#D6E6F1',
        butter: '#F6E8BE',
        blush: '#F3DCD2',
        lilac: '#E1DBEE',
        sun: '#F2C14E',
        coral: '#E4795C',
        blue: '#4F86C6',
        red: '#C8433D',
      },
    },
  },
  plugins: [],
};
export default config;
