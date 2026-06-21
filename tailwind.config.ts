import type { Config } from "tailwindcss";

// Flat, minimalist palette for didactic scenes.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1e2233",
        canvas: "#f6f7fb",
        accent: "#5b8def",
        accentSoft: "#dbe6ff",
        highlight: "#ffcf5c",
        muted: "#8a90a6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
