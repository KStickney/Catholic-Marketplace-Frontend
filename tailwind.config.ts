import colors from 'tailwindcss/colors';
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/forms')],
  important: '#app',

  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Quicksand',
          'Montserrat',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
      colors: {
        primary: {
          50: '#fdf6f0',
          100: '#fae8d7',
          200: '#f5c7a9',
          300: '#f2a97a',
          400: '#ee8a4c',
          500: '#e26a1b', // Etsy orange
          600: '#b95415',
          700: '#8f3e0f',
          800: '#652809',
          900: '#3b1303',
        },
        secondary: {
          50: '#f3f7f6',
          100: '#dbeeea',
          200: '#b7ded5',
          300: '#93cec0',
          400: '#6fbfab',
          500: '#4baf96', // Minty green
          600: '#3c8c77',
          700: '#2d6958',
          800: '#1e4639',
          900: '#0f231a',
        },
        accent: {
          100: '#f9e5ef',
          200: '#e7c6e3',
          300: '#d3a6d7',
          400: '#bf86cb',
          500: '#ab66bf', // Pastel purple
        },
        gray: colors.zinc,
        white: '#fff',
      },
      animation: {
        dropIn: 'dropIn 0.2s ease-out',
      },
      keyframes: {
        dropIn: {
          '0%': { transform: 'translateY(-100px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
} satisfies Config;
