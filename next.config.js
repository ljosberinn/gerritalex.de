const withSass = require('@zeit/next-sass');

module.exports = (phase, { defaultConfig }) =>
  withSass({
    ...defaultConfig,
    experimental: {
      modern: true,
      polyfillsOptimization: true,
    },

    webpack: (config, { dev, isServer }) => {
      const splitChunks =
        config.optimization && config.optimization.splitChunks;
      if (splitChunks) {
        const cacheGroups = splitChunks.cacheGroups;
        const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;
        if (cacheGroups.framework) {
          cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
            test: preactModules,
          });
          cacheGroups.commons.name = 'framework';
        } else {
          cacheGroups.preact = {
            name: 'commons',
            chunks: 'all',
            test: preactModules,
          };
        }
      }

      const aliases = config.resolve.alias || (config.resolve.alias = {});
      aliases.react = aliases['react-dom'] = 'preact/compat';

      if (dev && !isServer) {
        const entry = config.entry;
        config.entry = () =>
          entry().then((entries) => {
            entries['main.js'] = ['preact/debug'].concat(
              entries['main.js'] || [],
            );
            return entries;
          });
      }

      return config;
    },
  });
