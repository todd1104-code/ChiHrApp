import tailwindForms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-green": {
          "DEFAULT": "#4CAF50",
          "dark": "#388E3C",
          "light": "#E8F5E9"
        },
        "primary": {
          "DEFAULT": "#2979FF",
          "dark": "#448AFF"
        },
        "surface": {
          "selected": "#E3F2FD",
          "selected-dark": "#1E2A38",
          "light": "#FFFFFF",
          "card": "#FFFFFF",
          "card-dark": "#1E1E1E"
        },
        "status": {
          "success": "#4CAF50",
          "success-dark": "#66BB6A",
          "warning": "#FF9800",
          "warning-dark": "#FFA726",
          "info": "#536DFE",
          "info-dark": "#8C9EFF",
          "danger": "#EF4444"
        },
        "background": {
          "page": "#F5F7FA",
          "page-dark": "#121212"
        },
        "text": {
          "primary": "#333333",
          "primary-dark": "#E0E0E0",
          "secondary": "#666666",
          "secondary-dark": "#B0B0B0"
        },
        "border": {
          "light": "#EEEEEE",
          "dark": "#333333"
        },
        "accent-red": "#EF4444",
        "accent-blue": "#3B82F6"
      },
      fontFamily: {
        "display": ["Manrope", "Noto Sans TC", "sans-serif"],
        "body": ["Noto Sans TC", "sans-serif"]
      },
      boxShadow: {
        "card": "0 4px 20px rgba(0,0,0,0.05)",
        "card-hover": "0 10px 25px rgba(0,0,0,0.08)",
        "glow": "0 0 15px rgba(76, 175, 80, 0.3)"
      }
    }
  },
  plugins: [
    tailwindForms,
  ],
}
