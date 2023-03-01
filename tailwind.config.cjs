/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'nintendo': '#e60012',
        'playstation': '#0070d1',
        'xbox': '#107c10',
        'pc': '#1b2838'
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
