/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0B0C10',
        'dark-surface': '#1F2833',
        'neon-cyan': '#66FCF1',
        'neon-teal': '#45A29E',
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'sans-serif'],
        'display': ['Syne', 'sans-serif'],
      }
    },
  },
  plugins: [],
}