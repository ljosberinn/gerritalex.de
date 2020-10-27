/**
 * replaces React with Preact in prod
 * this reduces the bundle size by approx. 32 kB
 */
const withPreact = (config, options) => {
  if (!options.dev) {
    const splitChunks = config.optimization && config.optimization.splitChunks;

    if (splitChunks) {
      const { cacheGroups } = splitChunks;
      const test = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/u;
      if (cacheGroups.framework) {
        cacheGroups.preact = {
          ...cacheGroups.framework,
          test,
        };

        cacheGroups.commons.name = 'framework';
      } else {
        cacheGroups.preact = {
          chunks: 'all',
          name: 'commons',
          test,
        };
      }
    }

    const aliases = config.resolve.alias || (config.resolve.alias = {});
    // eslint-disable-next-line no-multi-assign
    aliases.react = aliases['react-dom'] = 'preact/compat';
    aliases['react-ssr-prepass'] = 'preact-ssr-prepass';
  }
};

module.exports = {
  images: {
    domains: ['avatars3.githubusercontent.com'],
  },
  webpack: (config, options) => {
    withPreact(config, options);

    return config;
  },
};
