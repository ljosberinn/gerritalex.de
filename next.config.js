// @ts-check

const date = new Date();

/**
 * @type {import('next/dist/server/config-shared').NextConfig}
 **/
const config = {
  typescript: {
    /**
     * `yarn lint:types` ran in CI already so we can safely assume no errors
     *  here, conveniently reducing build time by ~55%
     * @see https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
     */
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  env: {
    // Make the COMMIT_SHA available to the client so that Sentry events can be
    // marked for the release they belong to. It may be undefined if running
    // outside of Vercel
    NEXT_PUBLIC_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
    NEXT_PUBLIC_BUILD_TIME: date.toISOString(),
    NEXT_PUBLIC_BUILD_TIMESTAMP: Number(date).toString(),
  },
  experimental: {
    reactRoot: true,
  },
  future: {
    strictPostcssConfiguration: true,
  },
  webpack: (config, options) => {
    // disables transpiling all `__tests__` files, speeding up build process
    // this reduces build time by ~ 25%
    config.plugins.push(
      new options.webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\//u })
    );

    return config;
  },

  swcMinify: true,
};

module.exports = config;
