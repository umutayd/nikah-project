/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Raleway', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'wedding': "url('/wedding-bg.png')",
      },
    },
  },
  plugins: [],
};