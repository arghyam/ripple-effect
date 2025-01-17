/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        primary: '#4798af', 
        secondary: '#14171a', 
        accent: '#657786', 
        background: '#ffffff', 
        surface: '#ffffff', 
        error: '#e0245e', 
        gray50: '#808080',
        gray300: '#696969'
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [],
}
