/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        // Warm paper + ink, one persimmon accent.
        paper:   "#F2F1EB",
        surface: "#E9E8E0",
        soft:    "#EFEEE7",
        raised:  "#F8F7F2",
        char:    "#2B2A26",
        fog:     "#B9B8AE",

        ink:     "#181713",
        ink2:    "#45443E",
        ink3:    "#71706A",
        ink4:    "#8F8E86",

        line:    "#DDDCD3",
        line2:   "#D2D1C7",

        accent:  "#C4532D",
        moss:    "#2F7D62",
        indigo:  "#4B55A8",
        ochre:   "#A9791C",
      },

      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.7) inset, 0 24px 48px -32px rgba(24,23,19,0.28)",
        lift: "0 1px 0 rgba(255,255,255,0.7) inset, 0 32px 60px -30px rgba(24,23,19,0.38)",
      },

      fontFamily: {
        sans:    ["Geist", "system-ui", "-apple-system", "sans-serif"],
        display: ["Instrument Serif", "Georgia", "serif"],
        mono:    ["Geist Mono", "ui-monospace", "monospace"],
      },

      keyframes: {
        blink:    { "0%,50%": { opacity: "1" }, "51%,100%": { opacity: "0" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
      },

      animation: {
        blink:    "blink 1s steps(1) infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
      },

    },
  },

  plugins: [],
};
