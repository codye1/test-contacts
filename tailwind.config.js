/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        'body': '0'
      },
      screens: {
        'min535': {'min': '535px'},
      },
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
        'PoppinsBold': ['PoppinsBold', 'sans-serif']
      },

    },
  },
  plugins: [],
}