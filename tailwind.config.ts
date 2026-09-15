import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#A0D2C8",
          red: "#FF3C3C",
          green: "#61CE70",
          orange: "#FFBC7D",
          dark: "#000000",
          bg: "#FAFAFA",
          cardBg: "#F5F5F7",
        },
      },
      fontFamily: {
        sans: ["Galano Grotesque", "Inter", "sans-serif"],
        serif: ["Stag", "Georgia", "serif"],
        light: ["Galano Grotesque Light", "sans-serif"],
      },
      maxWidth: {
        site: "1320px",
        content: "1140px",
        narrow: "820px",
      },
    },
  },
  plugins: [],
};
export default config;
