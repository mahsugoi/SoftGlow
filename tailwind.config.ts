import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF5EC',
        sand: '#F0E6D3',
        caramel: '#C9871F',
        bark: '#7B5533',
        ink: '#1A1208',
        'green-wa': '#25D366',
        white: '#FFFDF8',
        'logo-brown': '#946F53',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        cursive: ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
