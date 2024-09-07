/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',

  content: [ "./index.html",
    "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [],
}

