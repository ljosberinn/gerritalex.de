import { withContentlayer } from 'next-contentlayer2';
import type { NextConfig } from 'next';

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src wow.zamimg.com counterscale.gerritalex.workers.dev 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' wow.zamimg.com 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com 'self';
  connect-src *;
  frame-src clips.twitch.tv;
  font-src 'self';
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const output = process.env.EXPORT ? 'export' : undefined;
const basePath = process.env.BASE_PATH || undefined;

const config = (): NextConfig => {
  const plugins = [withContentlayer];

  return plugins.reduce((acc, next) => next(acc), {
    // experimental: {
    //   turbopackFileSystemCacheForDev: true,
    // },
    // turbopack: {},
    // reactCompiler: true,
    output,
    basePath,
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'wow.zamimg.com',
        },
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
      ],
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
        {
          source: '/static/images/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=604800, immutable',
            },
          ],
        },
      ];
    },
    async redirects() {
      return [
        {
          source: '/blog/zephyr',
          destination: '/blog/tww-s2-zephyr',
          permanent: true,
        },
        {
          source: '/blog/mn-s1-zephyr',
          destination: '/blog/midnight-s1-aoe',
          permanent: true,
        },
      ];
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      config.module.rules.push({
        test: /\.node/,
        use: {
          loader: 'raw-loader',
        },
      });

      return config;
    },
  });
};

export default config;
