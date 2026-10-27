/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        // Neural / terminal palette
        void:    "#05070d",
        abyss:   "#0a0f1c",
        panel:   "#0d1426",
        line:    "rgba(148,163,184,0.12)",

        cyan:    "#22d3ee",
        violet:  "#a78bfa",
        signal:  "#34d399",
        warn:    "#fbbf24",

        ink:     "#e6edf7",
        ink2:    "#b4bfd2",
        ink3:    "#7d8aa3",
        ink4:    "#4b5670",
      },

      boxShadow: {
        card:  "0 10px 40px -12px rgba(0,0,0,0.6)",
        glow:  "0 0 0 1px rgba(34,211,238,0.25), 0 0 32px -6px rgba(34,211,238,0.35)",
        glowV: "0 0 0 1px rgba(167,139,250,0.25), 0 0 32px -6px rgba(167,139,250,0.35)",
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
