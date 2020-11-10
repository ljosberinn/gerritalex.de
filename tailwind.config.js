const mdx = require('@mdx-js/mdx');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
    require('tailwindcss-typography')({
      
      // whether to generate utilities to unset text properties
componentPrefix: 'c-', 
      
// all these options default to the values specified here
ellipsis: true, 
      
// whether to generate ellipsis utilities
hyphens: true, 
      
// whether to generate hyphenation utilities
kerning: true, 
      // whether to generate kerning utilities
textUnset: true, // the prefix to use for text style classes
    }),
  ],
  purge: {
    content: [
      /**
       * We need to extract the classnames used for mdx tokens to a separate `code-highlighter-token.js` file
       * Previously, we put it in the `next.config.js` file, but the token got purged.
       * It was caused by vercel renaming our original next.config.js file during build.
       *
       * Log from debugging:
       * 16:27:51.948  	-rw-r--r--   1 root root    908 Sep 26 09:27 next.config.js
       * 16:27:51.948  	-rw-r--r--   1 root root   6595 Sep 26 09:27 next.config.original.1601112471648.js
       * https://vercel.com/jackyef/jackyef/ekvzdkthq
       * https://github.com/tailwindlabs/blog.tailwindcss.com/issues/13#issuecomment-699470309
       */
      './next.config.js',
      './code-highlighter-token.js',
      './src/**/*.{ts,tsx,js,jsx,mdx}',
    ],
    mode: 'all',
    options: {
      extractors: [
        {
          extensions: ['mdx'],
          extractor: (content) => {
            content = mdx.sync(content);

            // Capture as liberally as possible, including things like `h-(screen-1.5)`
            const broadMatches = content.match(/[^\s"'<>`]*[^\s"':<>`]/gu) || [];

            // Capture classes within other delimiters like .block(class="w-1/2") in Pug
            const innerMatches =
              content.match(/[^\s"#%'().<=>[\]`{}]*[^\s"#%'().:<=>[\]`{}]/gu) ||
              [];

            return broadMatches.concat(innerMatches);
          },
        },
      ],
    },
  },
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        flyInTop: 'flyInTop 0.3s ease-in-out',
        halfFadeIn: 'halfFadeIn 0.3s ease-in-out',
      },
      boxShadow: {
        md: 'var(--shadow-md)',
      },
      colors: {
        code: {
          blue: '#93ddfd',
          green: '#b5f4a5',
          purple: '#d9a9ff',
          red: '#ff8383',
          teal: '#7fdbca',
          white: '#fff',
          yellow: '#ffe484',
        },
        theme: {
          background: 'var(--color-bg)',
          heading: 'var(--color-heading)',
          backgroundOffset: 'var(--color-bg-offset)',
          link: 'var(--color-link)',
          subtitle: 'var(--color-subtitle)',
          text: 'var(--color-text)',
        },
      },
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        flyInTop: {
          '0%': {
            transform: 'translateY(-10px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        halfFadeIn: {
          '0%': {
            opacity: 0.5,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      lineHeight: {
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
      },
      spacing: {
        '9/16': '56.25%',
      },
      textShadow: {
        // defaults to {}
        default: '0 2px 5px rgba(0, 0, 0, 0.5)',
        lg: '0 2px 10px rgba(0, 0, 0, 0.5)',
      },
      typography: (theme) => ({
        default: {
          css: {
            a: {
              '&:hover': {
                color: theme('colors.theme.link'),
              },
              color: theme('colors.theme.link'),
            },
            blockquote: {
              borderLeftColor: theme('colors.theme.subtitle'),
              color: theme('colors.theme.text'),
              quotes: 'none',
            },
            code: {
              color: theme('colors.theme.text'),
            },
            color: theme('colors.theme.text'),
            h2: {
              color: theme('colors.theme.text'),
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              color: theme('colors.theme.text'),
              fontWeight: '600',
            },
            'ol li:before': {
              color: theme('colors.theme.subtitle'),
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.200'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.theme.subtitle'),
            },
          },
        },
      }),
    },
  },
  variants: {},
};
