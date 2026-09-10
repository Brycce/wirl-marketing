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
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: '#161616',
        paper: '#FBFBF9',
        tape: '#FFE04A',
        rule: '#E4E4DE',
        dim: '#6B6B66',
      },
    },
  },
  plugins: [],
};
export default config;
