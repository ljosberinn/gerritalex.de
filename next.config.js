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
        /^(preact|preact-render-to-string|preact-context-provider)([/\\]|$)/u
      );
    }

    // Install webpack aliases:
    const aliases = config.resolve.alias || (config.resolve.alias = {});
    // eslint-disable-next-line no-multi-assign
    aliases.react = aliases["react-dom"] = "preact/compat";
  }
};

const defaultConfig = {
  experimental: {
    // enable experimental module/nomodule optimisation
    modern: true,
    // bugged with Sentry, see https://github.com/vercel/next.js/issues/17073
    // scrollRestoration: true,
    productionBrowserSourceMaps: true,
  },
  reactStrictMode: true,
  typescript: {
    /**
     * `yarn lint:types` ran in CI already so we can safely assume no errors
     *  here, conveniently reducing build time by ~55%
     * @see https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
     */
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    // disables transpiling all `__tests__` files, speeding up build process
    // in case of a barebones karma install, this reduces build time by ~ 25%
    config.plugins.push(new options.webpack.IgnorePlugin(/\/__tests__\//u));

    // withPreact(config, options);

    return config;
  },
};

module.exports = defaultConfig;
