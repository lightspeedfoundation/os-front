import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx,css}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07080c",
        mist: "#e8eefb",
        surface: "#f6f8fd",
        panel: "#ffffff",
        primary: "#0057ff",
        "primary-soft": "#e8f1ff",
        accent: "#22f39c",
        "accent-dim": "#0a2a20",
        border: "rgba(15, 23, 42, 0.09)",
        /** Dark terminal theme (reference landing) */
        void: "#060608",
        void2: "#0d0d10",
        void3: "#131318",
        void4: "#1a1a22",
        surf: "#1e1e28",
        neon: "#00FF87",
        "neon-dim": "rgba(0,255,135,0.15)",
        "neon-glow": "rgba(0,255,135,0.4)",
        borderw: "rgba(255,255,255,0.06)",
        borderw2: "rgba(255,255,255,0.1)",
        soft: "#F0F0F8",
        /** Muted text on dark backgrounds (typo-tolerant aliases) */
        mutedd: "rgba(255,255,255,0.35)",
        mutedd2: "rgba(255,255,255,0.55)",
        mutted: "rgba(255,255,255,0.35)",
        mutted2: "rgba(255,255,255,0.55)",
        cyan: "#00D4FF",
      },
      fontFamily: {
        sans: ["var(--font-space-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "fluid-xl": ["clamp(2rem, 4.5vw, 3.5rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "fluid-lg": ["clamp(1.35rem, 2.6vw, 1.85rem)", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "fluid-hero": ["clamp(2.5rem, 6.5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "fluid-display": ["clamp(2.85rem, 7.5vw, 4.35rem)", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 23, 42, 0.07)",
        lift: "0 18px 50px rgba(15, 23, 42, 0.11)",
        glow: "0 0 0 1px rgba(0, 87, 255, 0.08), 0 24px 80px rgba(0, 87, 255, 0.12)",
        insetHighlight: "inset 0 1px 0 rgba(255,255,255,0.72)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.25rem",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        wordflip: {
          "0%, 28%": { opacity: "1", transform: "translateY(0)" },
          "33%, 61%": { opacity: "0", transform: "translateY(-8px)" },
          "66%, 94%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "hero-blob": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(2%, -3%) scale(1.04)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.7)" },
        },
      },
      animation: {
        wordflip: "wordflip 9s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
        "hero-blob": "hero-blob 14s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
        float: "float 4s ease-in-out infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
