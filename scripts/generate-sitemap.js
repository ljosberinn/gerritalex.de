// eslint-disable-next-line inclusive-language/use-inclusive-words
/**
 * Helpful references to read when working with sitemaps
 *
 * - https://www.sitemaps.org/protocol.html
 * - https://support.google.com/webmasters/answer/183668?hl=en
 */

const { writeFileSync } = require('fs');
const globby = require('globby');
const { resolve } = require('path');
const xmlFormat = require('xml-formatter');

const config = require('../src/config.json');

async function generateSiteMap() {
  const pages = await globby([
    'src/pages/**/*.tsx',
    'src/pages/posts/**/*.mdx',
    '!src/pages/_*.tsx',
    '!src/pages/**/[id].tsx',
    '!src/pages/api',
  ]);

  const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace('src/pages', '')
              .replace('.tsx', '')
              .replace('.mdx', '');

            // remove leading `/` and trailing `/index`
            // and change `/index` to just ''
            const route =
              path === '/index'
                ? ''
                : path.replace(/^\//u, '').replace(/\/index$/u, '');

            return `
                  <url>
                    <loc>${`${config.domain}/${route}`}</loc>
                  </url>`;
          })
          .join('')}
      </urlset>
  `;

  writeFileSync(
    resolve(__dirname, '../.next/static/sitemap.xml'),
    xmlFormat(sitemap),
  );
}

generateSiteMap();
