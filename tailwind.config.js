// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.teal,
        gray: colors.gray,
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
      keyframes: {
        'flutter-left': {
          '10%': {
            transform: 'scale(1, 0.9)',
          },
          '20%': {
            transform: 'scale(0.5, 1)',
          },
          '40%': {
            transform: 'scale(0.9, 0.95)',
          },
          '60%': {
            transform: 'scale(0.3, 1)',
          },
          '80%': {
            transform: 'scale(0.9, 0.95)',
          },
          '100%': {
            transform: 'scale(1, 1)',
          },
        },
        'flutter-right': {
          '10%': {
            transform: 'scale(-1, 0.9)',
          },
          '20%': {
            transform: 'scale(-0.5, 1)',
          },
          '40%': {
            transform: 'scale(-0.9, 0.95)',
          },
          '60%': {
            transform: 'scale(-0.3, 1)',
          },
          '80%': {
            transform: 'scale(-0.9, 0.95)',
          },
          '100%': {
            transform: 'scale(-1, 1)',
          },
        },
      },
      animation: {
        'flutter-left': 'flutter-left 430ms ease-in-out',
        'flutter-right': 'flutter-right 500ms ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
