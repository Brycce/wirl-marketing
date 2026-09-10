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
        pixel: ['"Pixelify Sans"', 'system-ui', 'sans-serif'],
        term: ['VT323', '"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: '#1F2A1F',
        cream: '#F6F1DF',
        card: '#FBF7E9',
        sand: '#E9E2C6',
        dim: '#6E6A58',
        gb: { dark: '#0F380F', mid: '#306230', green: '#8BAC0F', light: '#9BBC0F', pale: '#E3ECC4' },
        sky: '#7CC8E8',
        red: '#D9534F',
        sun: '#F2C14E',
      },
    },
  },
  plugins: [],
};
export default config;
