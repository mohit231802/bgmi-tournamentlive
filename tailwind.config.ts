import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6b35',
          dark: '#e55a2b',
        },
        secondary: {
          DEFAULT: '#004e89',
          dark: '#003d6e',
        },
        accent: '#ffd23f',
      },
    },
  },
  plugins: [],
};
export default config;
