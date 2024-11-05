/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        'bison': 'var(--color-bison)',
        'bone': 'var(--color-bone)',
        'lemongrass': 'var(--color-lemongrass)',
        'battleship': 'var(--color-battleship)',
        'finch': 'var(--color-finch)',
      }
    },
  },
  plugins: [],
} 