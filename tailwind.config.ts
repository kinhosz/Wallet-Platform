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
      },
      fontFamily: {
        wallet_primary: ['Inter', 'sans-serif'],
        wallet_secondary: ['Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;
