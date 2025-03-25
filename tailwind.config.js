/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f5ff',
          100: '#cceaff',
          200: '#99d5ff',
          300: '#66c0ff',
          400: '#33aaff',
          500: '#0095ff',
          600: '#0077cc',
          700: '#005999',
          800: '#003c66',
          900: '#001e33',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}

