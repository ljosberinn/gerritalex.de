import type { Config } from 'tailwindcss';

// Theme tokens live in css/tailwind.css; raw prose overrides are only supported through a JS config,
// see @tailwindcss/typography's README ("Customizing the CSS")
export default {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: 'var(--color-primary-500)',
              '&:hover': {
                color: 'var(--color-primary-600)',
              },
              code: { color: 'var(--color-primary-400)' },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: 'var(--tracking-tight)',
            },
            h3: {
              fontWeight: '600',
            },
            h5: {
              fontWeight: '500',
            },
            code: {
              color: 'var(--color-indigo-500)',
            },
          },
        },
        invert: {
          css: {
            a: {
              color: 'var(--color-primary-500)',
              '&:hover': {
                color: 'var(--color-primary-400)',
              },
              code: { color: 'var(--color-primary-400)' },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: 'var(--color-gray-100)',
            },
          },
        },
      },
    },
  },
} satisfies Config;
