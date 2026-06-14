/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c7c7ff',
          300: '#a5a5ff',
          400: '#8181ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        cosmic: {
          950: '#0a0a0f',
          900: '#111116',
          800: '#1a1a22',
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px -1px rgb(0 0 0 / 0.05), 0 1px 2px -2px rgb(0 0 0 / 0.05)',
        'lift': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'glow': '0 0 0 1px rgb(99 102 241 / 0.1), 0 10px 15px -3px rgb(99 102 241 / 0.1)',
      }
    },
  },
  plugins: [],
}
