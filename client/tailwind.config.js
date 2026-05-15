/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#172033',
        mist: '#f5f7fb',
        line: '#dfe5ef',
        brand: {
          50: '#eef8ff',
          100: '#d8eeff',
          500: '#2179d5',
          600: '#155fb0',
          700: '#104d91',
        },
      },
      boxShadow: {
        soft: '0 18px 50px -28px rgba(23, 32, 51, 0.38)',
      },
    },
  },
  plugins: [],
};
