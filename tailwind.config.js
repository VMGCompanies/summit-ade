/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f8f6f4',
          100: '#ece8e6',
          200: '#b3c3e5',
          300: '#8da5d8',
          400: '#6687cb',
          500: '#4069be',
          600: '#2d54a8',
          700: '#1e3d8a',
          800: '#343231',
          900: '#2B2B2B',
          950: '#1a1919',
        },
        orange: {
          100: '#fce8e8',
          400: '#cc3333',
          500: '#B22222',
          600: '#8b1a1a',
          700: '#701515',
        },
      },
    },
  },
  plugins: [],
}
