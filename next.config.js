const rehypePrism = require('@mapbox/rehype-prism');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withPlugins } = require('next-compose-plugins');
const withImages = require('next-images');
const withOffline = require('next-offline');
const { createLoader } = require('simple-functional-loader');
const visit = require('unist-util-visit');

const tokenClassNames = require('./code-highlighter-token.js');

// eslint-disable-next-line no-console
console.debug(`> Building on NODE_ENV="${process.env.NODE_ENV}"`);

/**
 * @see https://github.com/hanford/next-offline#customizing-service-worker
 */
const offlineConfig = {
  dontAutoRegisterSw: true,

  generateInDevMode: false,
  // add the homepage to the cache
  transformManifest: (manifest) => ['/'].concat(manifest),
  workboxOpts: {
    // swDest: '../public/service-worker.js',
    clientsClaim: true,

    exclude: [
      // clients that support service workers most likely support modules too
      // so it makes no sense to cache non-modules for them as they wouldn't
      // even load them in the first place
      /^(?!.*\.module\.js$).*\.js$/u,
      // don't cache source maps
      /\.js\.map$/u,
      // eslint-disable-next-line inclusive-language/use-inclusive-words
      /**
       * default values from next-offline which aren't merged in and aren't
       * exported either
       * @see https://github.com/hanford/next-offline/blob/master/packages/next-offline/index.js#L10
       */
      'react-loadable-manifest.json',
      'build-manifest.json',
    ],
    runtimeCaching: [
      {
        handler: 'CacheFirst',
        urlPattern: /.(png|jpg|jpeg|webp|svg)$/u,
      },
      {
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
        urlPattern: /^https?.*/u,
      },
    ],
    skipWaiting: true,
    swDest: 'static/service-worker.js',
  },
};

/**
 * replaces React with Preact in prod
 * this reduces the bundle size by approx. 32 kB
 */
const withPreact = (config, options) => {
  if (!options.dev) {
    // Move Preact into the framework chunk instead of duplicating in routes:
    const splitChunks = config.optimization && config.optimization.splitChunks;

    if (splitChunks) {
      const { cacheGroups } = splitChunks;
      const test = /[/\\]node_modules[/\\](preact|preact-render-to-string|preact-context-provider)[/\\]/u;
      if (cacheGroups.framework) {
        cacheGroups.preact = { ...cacheGroups.framework, test };
        // if you want to merge the 2 small commons+framework chunks:
        // cacheGroups.commons.name = 'framework';
      }
    }

    if (options.isServer) {
      // mark `preact` stuffs as external for server bundle to prevent duplicate copies of preact
      config.externals.push(
        /^(preact|preact-render-to-string|preact-context-provider)([/\\]|$)/u,
      );
    }

    // Install webpack aliases:
    const aliases = config.resolve.alias || (config.resolve.alias = {});
    // eslint-disable-next-line no-multi-assign
    aliases.react = aliases['react-dom'] = 'preact/compat';
  }
};

// eslint-disable-next-line inclusive-language/use-inclusive-words
/**
 * @see https://github.com/tailwindlabs/blog.tailwindcss.com/blob/master/next.config.js
 */
const withMdx = (config, options) => {
  const mdx = [
    options.defaultLoaders.babel,
    {
      loader: '@mdx-js/loader',
      options: {
        rehypePlugins: [
          rehypePrism,
          () => {
            return (tree) => {
              visit(tree, 'element', (node) => {
                const [token, type] = node.properties.className || [];

                // console.log({ token, type, children: JSON.stringify(node.children.map(({ value }) => value).join(' | '), null, 2) });

                if (token === 'token') {
                  node.properties.className = [tokenClassNames[type]];
                }
              });
            };
          },
        ],
      },
    },
  ];

  const more = '<!--more-->';

  config.module.rules.push({
    oneOf: [
      {
        resourceQuery: /preview/u,
        use: [
          ...mdx,
          // eslint-disable-next-line func-names
          createLoader(function (src) {
            // this part will cut down the mdx content for previews, so we don't load too many content into
            // pages that are showing list of post previews
            if (src.includes(more)) {
              const [preview] = src.split(more);
              // eslint-disable-next-line no-invalid-this
              return this.callback(null, preview);
            }

            const [preview] = src.split('<!--/excerpt-->');
            // eslint-disable-next-line no-invalid-this
            return this.callback(null, preview.replace('<!--excerpt-->', ''));
          }),
        ],
      },
      {
        use: [
          ...mdx,
          // eslint-disable-next-line func-names
          createLoader(function (src) {
            // we add getStaticProps function to get the post contents for each posts
            const content = [
              'import { Post } from "@/components/Blog/Post/Post"',
              'export { getStaticProps } from "@/blog/getStaticProps"',
              src,
              'export default (props) => <Post meta={meta} {...props} />',
            ].join('\n');

            if (content.includes(more)) {
              // eslint-disable-next-line no-invalid-this
              return this.callback(null, content.split(more).join('\n'));
            }

            // eslint-disable-next-line no-invalid-this
            return this.callback(
              null,
              content.replace(/<!--excerpt-->.*<!--\/excerpt-->/su, ''),
            );
          }),
        ],
      },
    ],
    test: /\.mdx$/u,
  });

  if (!options.dev && options.isServer) {
    const originalEntry = config.entry;

    config.entry = async () => {
      const entries = await originalEntry();

      // we want to build this script as well, and run it on build to generate feed.xml file
      entries['./scripts/build-rss.js'] = './scripts/build-rss.js';

      return entries;
    };
  }

  return config;
};

const defaultConfig = {
  experimental: {
    // enable experimental module/nomodule optimisation
    modern: true,
    // bugged with Sentry, see https://github.com/vercel/next.js/issues/17073
    // scrollRestoration: true,
    productionBrowserSourceMaps: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  target: 'serverless',
  typescript: {
    /**
     * `yarn lint:types` ran in CI already so we can safely assume no errors
     *  here, conveniently reducing build time by ~55%
     * @see https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
     */
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    withPreact(config, options);
    withMdx(config, options);

    return config;
  },
};

module.exports = withPlugins(
  [withImages, [withOffline, offlineConfig], withBundleAnalyzer],
  defaultConfig,
);
