import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('../public/home-background.png')",
      },
      fontFamily: {
        sans: ['Poppins', 'sans'],
      }
    },
  },
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar-hide'),
    nextui({
    themes: {
      dark: {
        colors: {
          background: "#040714",
          primary: {
            DEFAULT: "#0072F5",
            foreground: "#000000",
          },
          focus: "#0072F5",
        },
      },
    }
  })],
}
