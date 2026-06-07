import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-raleway)", "sans-serif"],
      },
      colors: {
        paper: {
          50:  "#faf8f4",
          100: "#f4f0e8",
          200: "#ece6d9",
          300: "#e0d9c8",
          400: "#ccc3ae",
          500: "#aea490",
          600: "#857b6a",
          700: "#5a5144",
          800: "#322d25",
          900: "#1a1612",
          950: "#0f0c08",
        },
        ink: {
          DEFAULT: "#0f0c08",
          warm: "#2c2319",
          muted: "#6b5f50",
          faint: "#a89e90",
        },
        gold: {
          DEFAULT: "#7a5c38",
          light: "#a8834f",
          pale: "#d4b896",
        },
      },
    },
  },
  plugins: [],
};

export default config;
