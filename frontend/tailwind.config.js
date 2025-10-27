/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#16a34a', // green-600
          foreground: '#ffffff'
        }
      },
      borderRadius: {
        lg: '12px',
      }
    },
  },
  plugins: [],
}


