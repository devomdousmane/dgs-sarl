/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Clash Display', 'sans-serif'],
        display: ['Clash Display', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
      },
      colors: {
        rouge: '#CC1418',
        or: '#B8966E',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
}
