import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wallet_blue: '#344960',
        wallet_orange: '#F46524',
        wallet_orange_light: '#FF7F50',
        wallet_orange_dark: '#E65100',
        wallet_red: '#C53928',
        wallet_gray: '#D9D9D9',
      },
      fontFamily: {
        wallet_primary: ['Raleway', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontStyle: {
        italic: 'italic',
      },
    },
  },
  plugins: [],
} satisfies Config;
