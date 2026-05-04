import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F4ECDD",
          deep: "#EFE3CB",
        },
        maroon: {
          DEFAULT: "#6B1F2A",
          deep: "#54171F",
        },
        brand: {
          purple: "#7A007F",
          "purple-deep": "#5C0060",
        },
        pink: {
          DEFAULT: "#EAC5D2",
          deep: "#D9A7B7",
        },
        gold: {
          DEFAULT: "#B08838",
        },
        ink: {
          DEFAULT: "#2A1B14",
        },
        muted: {
          DEFAULT: "#7A6A56",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 7vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        prose: "65ch",
        readable: "44rem",
      },
      letterSpacing: {
        wider2: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
