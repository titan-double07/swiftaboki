import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        purple: {
          100: "#2E004F",
          200: "#4B0082",
        },
        red: {
          100: "#EF476F",
        },
        blue: {
          100: "#C0D8FC",
          200: "#2B468B",
        },
        grey: {
          100: "#808080",
          200: "#D9D9D9",
          300: "#22003A",
          400: "#EFEFEF",
          500: "#1E1E1E",
          600: "#D9D9D9",
        },
        dark: {
          100: "#1E1E1E",
          200: "#263238",
        },
        green: {
          100: "#008753",
          200: "#005937",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "1.75rem",
        "3xl": "2rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.5rem",
        "7xl": "64px",
        "8xl": "68px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        primary: "0.6rem",
        secondary: "1.25rem",
      },
      height: {
        12: "3rem",
        24: "6rem",
        36: "9rem",
        48: "12rem",
        60: "15rem",
        72: "18rem",
        84: "21rem",
        96: "24rem",
        108: "27rem",
        120: "30rem",
        132: "33rem",
        144: "36rem",
        158: "39rem",
        170: "42rem",
        182: "45rem",
        194: "48rem",
        206: "51rem",
      },
      width: {
        12: "3rem",
        24: "6rem",
        36: "9rem",
        48: "12rem",
        60: "15rem",
        72: "18rem",
        84: "21rem",
        96: "24rem",
        108: "27rem",
        120: "30rem",
        132: "33rem",
        144: "36rem",
        158: "39rem",
        170: "42rem",
        182: "45rem",
        194: "48rem",
        206: "51rem",
        209: "60rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(10%)", opacity: "0.5" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        fade: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideUp: "slideUp .5s ease-in-out ",
        fade: "fade 1.5s ease ",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config