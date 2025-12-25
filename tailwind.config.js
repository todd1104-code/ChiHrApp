import tailwindForms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Arbitrary background colors used in components
    'bg-[#FF9800]',
    'bg-[#1E1E1E]',
    'bg-[#2563EB]',
    'bg-[#93C5FD]',
    'bg-[#EF4444]',
    'bg-[#2979FF]',
    // Dark mode variants
    'dark:bg-[#1E1E1E]',
    'dark:border-[#1E1E1E]',
    // Text colors
    'text-[#2563EB]',
    'text-[#EF4444]',
    // Border colors
    'border-[#2563EB]',
    // Focus states
    'focus:border-[#2563EB]',
    // Hover states
    'hover:bg-[#2563EB]',
    // Ring offset
    'dark:ring-offset-[#1E1E1E]',
    // Transform classes
    '-translate-x-full',
    'translate-x-0',
    // Shadow classes
    'shadow-lg',
    'shadow-2xl',
    'shadow-md',
    'shadow-sm',
    'shadow-orange-500/30',
    // Z-index
    'z-[70]',
    'z-[60]',
    // Width
    'w-[300px]',
    // Gradient
    'to-[#2a3627]',
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
