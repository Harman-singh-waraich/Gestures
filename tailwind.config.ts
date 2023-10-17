import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        text: {
          50: "#e6fef7",
          100: "#cdfeee",
          200: "#9cfcde",
          300: "#6afbcd",
          400: "#38fabd",
          500: "#06f9ac",
          600: "#05c78a",
          700: "#049567",
          800: "#036345",
          900: "#013222",
          950: "#011911",
        },
        background: {
          50: "#e9fbf6",
          100: "#d3f8ed",
          200: "#a8f0da",
          300: "#7ce9c8",
          400: "#51e1b6",
          500: "#25daa4",
          600: "#1eae83",
          700: "#168362",
          800: "#0f5741",
          900: "#072c21",
          950: "#041610",
        },
        primary: {
          50: "#fee7ee",
          100: "#fdcedd",
          200: "#fb9dbb",
          300: "#f96c99",
          400: "#f73b77",
          500: "#f50a54",
          600: "#c40844",
          700: "#930633",
          800: "#620422",
          900: "#310211",
          950: "#180108",
        },
        secondary: {
          50: "#fef7e6",
          100: "#fdeece",
          200: "#fbdd9d",
          300: "#facd6b",
          400: "#f8bc3a",
          500: "#f6ab09",
          600: "#c58907",
          700: "#946705",
          800: "#624404",
          900: "#312202",
          950: "#191101",
        },
        accent: {
          50: "#fee6ee",
          100: "#fdcedd",
          200: "#fb9dbb",
          300: "#fa6b98",
          400: "#f83a76",
          500: "#f60954",
          600: "#c50743",
          700: "#940532",
          800: "#620422",
          900: "#310211",
          950: "#190108",
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fa7fa6",

          secondary: "#fce2ab",

          accent: "#d40848",

          neutral: "#2a323c",

          "base-100": "#1d232a",

          info: "#3abff8",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
