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
        custom: '#2d6a7d',
        secondary: '#14171a', 
        accent: '#657786', 
        background: '#ffffff', 
        surface: '#ffffff', 
        error: '#e0245e', 
        gray50: '#808080',
        gray300: '#696969',
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          600: '#4f46e5',
          700: '#4338ca',
        },
        purple: {
          600: '#9333ea',
          700: '#7e22ce',
        },
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      spacing: {
        '128': '32rem',
      },
      backgroundImage: {
        'water-pattern': "url('/assets/water-pattern.svg')",
      },
      boxShadow: {
        'soft': '0 4px 24px -2px rgba(99, 102, 241, 0.1)',
      }

    }
  },
  plugins: [
    
  ],
}
