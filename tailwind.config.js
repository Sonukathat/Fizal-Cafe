/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#F5E6D3',
          100: '#E8D5C4',
          200: '#D4B8A0',
          300: '#C19B7C',
          400: '#A67C52',
          500: '#8B6F47',
          600: '#6F4E37',
          700: '#5C3D2E',
          800: '#4A2F24',
          900: '#38221A',
        },
        cream: {
          50: '#FFFBF5',
          100: '#FFF8ED',
          200: '#FEF5E6',
          300: '#FDF0D9',
          400: '#FCE8CC',
        },
        latte: {
          light: '#F5E6D3',
          DEFAULT: '#D4B8A0',
          dark: '#C19B7C',
        }
      },
    },
  },
  plugins: [],
}

