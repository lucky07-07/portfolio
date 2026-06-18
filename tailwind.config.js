/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        accent:      "#f0c674",
        "accent-ho": "#e6b85c",
        "accent-dk": "#d9a441",

        surface:   "#0f0f10",
        surface1:  "#131314",
        surface2:  "#1a1a1d",
        card:      "#1e1e21",
        cardHi:    "#232326",

        ink:     "#ffffff",
        ink2:    "#d1d1d1",
        ink3:    "#9f9f9f",
        ink4:    "#5a5a5a",
      },

      boxShadow: {
        card:      "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        "card-lg": "0 10px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        gold:      "0 0 16px rgba(240,198,116,0.14)",
      },

      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },

      backdropBlur: {
        xs: "2px",
      },

      borderRadius: {
        "4xl": "2rem",
      },

    },
  },

  plugins: [],
};
