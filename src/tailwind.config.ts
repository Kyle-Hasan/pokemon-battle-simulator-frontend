import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables dark mode support
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Adjust path as needed
  theme: {
    extend: {
      colors: {
        background: "hsl(240, 10%, 3.9%)", // ShadCN default bg
        foreground: "hsl(0, 0%, 98%)", // ShadCN default text
        border: "hsl(240, 4.9%, 83.9%)", // ShadCN default border
      },
    },
  },
  plugins: [],
};

export default config;
