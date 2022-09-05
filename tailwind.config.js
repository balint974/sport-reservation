/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white':'#FFF',
        'yellow': '#fce24e',
        'yellow-sec':'#c1ee4c',
        'green-dark':'#1c3d44',
        'green-dark-sec': '#2a6c50',
        'green': '#78ba72'

      },
    },
  },
  plugins: [],
}