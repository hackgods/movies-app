const { nextui } = require('@nextui-org/theme');

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
        'login': "url('../public/login-background.jpg')",
      },
      fontFamily: {
        sans: ['Poppins', 'sans'],
      },
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: 0,
            transform: 'translateY(30px) scale(0.9)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0px) scale(1)',
          },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-in-out forwards',
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar-hide'),
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#10121B",
            primary: {
              DEFAULT: "#0072F5",
              foreground: "#000000",
            },
            focus: "#0072F5",
            secondary: "bg-cyan-500",
          },
        },
      },
    }),
  ],
};
