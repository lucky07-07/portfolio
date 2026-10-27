/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        // Attention-heatmap palette (magma-like: plum black → violet → rose → ember → gold)
        void:    "#0b0910",
        abyss:   "#120e19",
        panel:   "#181221",
        line:    "rgba(220,200,255,0.10)",

        ember:   "#ff8a4c",
        rose:    "#f2508f",
        violet:  "#9d7bff",
        signal:  "#5eead4",
        warn:    "#ffcc66",

        ink:     "#f6f0fb",
        ink2:    "#cfc5dd",
        ink3:    "#9488aa",
        ink4:    "#5f5475",
      },

      boxShadow: {
        card:  "0 18px 50px -20px rgba(0,0,0,0.75)",
        glow:  "0 0 0 1px rgba(255,138,76,0.3), 0 0 40px -8px rgba(255,138,76,0.45)",
        glowV: "0 0 0 1px rgba(157,123,255,0.3), 0 0 40px -8px rgba(157,123,255,0.45)",
      },

      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        mono:    ["JetBrains Mono", "ui-monospace", "monospace"],
      },

      keyframes: {
        blink:   { "0%,50%": { opacity: "1" }, "51%,100%": { opacity: "0" } },
        spinSlow:{ to: { transform: "rotate(360deg)" } },
        pulseDot:{ "0%,100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
        scan:    { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
      },

      animation: {
        blink:    "blink 1s steps(1) infinite",
        "spin-slow": "spinSlow 18s linear infinite",
        "spin-rev":  "spinSlow 26s linear infinite reverse",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        scan:     "scan 6s linear infinite",
      },

    },
  },

  plugins: [],
};
