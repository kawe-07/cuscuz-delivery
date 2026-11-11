/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],

  theme: {
    extend: {
      colors: {
        primary: '#F4B400',
        secondary: '#E76F00',
        background: '#FFF8E7',
        text: '#633B24',
        success: '#2F6B3D',
        surface: '#FFFFFF',
      },
    },
  },

  plugins: [],
};