/**
 * replaces React with Preact in prod
 * this reduces the bundle size by approx. 32 kB
 */
const withPreact = require('next-plugin-preact');

module.exports = withPreact({
  /* regular next.js config options here */
});
