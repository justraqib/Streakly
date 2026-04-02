/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        neutral: "var(--color-neutral)",
        "neutral-light": "var(--color-neutral-light)",
        border: "var(--color-border)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
      },
      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  plugins: [],
}
