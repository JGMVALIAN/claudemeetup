/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        turia: {
          gold: '#8B7355',
          dark: '#5C4D3C',
          cream: '#F5F0E8',
          amber: '#D4A84B',
        }
      }
    },
  },
  plugins: [],
}
