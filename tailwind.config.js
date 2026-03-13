/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: '#F5F0E8',
        ink: '#1A1A1A',
        blush: '#E8C4B8',
        rust: '#C4622D',
        sage: '#8FA68E',
      },
      gridTemplateColumns: {
        'gallery-desktop': 'repeat(4, 1fr)',
        'gallery-tablet': 'repeat(2, 1fr)',
        'gallery-mobile': 'repeat(1, 1fr)',
      }
    },
  },
  plugins: [],
}
