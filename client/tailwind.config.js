/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--inter-font)", "sans-serif"],
        montserrat: ["var(--montserrat-font)", "sans-serif"],
      },
      colors: {
        background: "var(--background-color)",
        foreground: "var(--foreground-color)",
        "foreground-light": "var(--foreground-light-color)",
        "text-background": "var(--text-background-color)",
        primary: "var(--primary-color)",
        "primary-light": "var( --primary-light-color)",
        "primary-dark": "var( --primary-dark-color)",
        "text-muted": "var(--text-muted-color)",
        "text-light": "var(--text-light-color)",
        border: "var(--border-color)",
        accent: "var(--accent-color)",
        "accent-dark": "var(--accent-color-dark)",
      },
    },
  },
  plugins: [],
};
