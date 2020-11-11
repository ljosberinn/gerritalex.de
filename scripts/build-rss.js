import { writeFileSync } from 'fs';
import RSS from 'rss';

import { getAllPostPreviews } from '../src/blog/getAllPostPreviews';

const feed = new RSS({
  feed_url: 'https://gerritalex.de/feed.xml',
  site_url: 'https://gerritalex.de',
  title: 'gerritalex.de',
});

getAllPostPreviews().forEach(({ link, module: { meta } }) => {
  feed.item({
    custom_elements: [].concat(
      meta.authors.map((author) => ({ author: [{ name: author.name }] })),
    ),
    date: meta.date,
    description: meta.description,
    guid: link,
    title: meta.title,
    url: `https://gerritalex.de${link}`,
  });
});

writeFileSync('./.next/static/feed.xml', feed.xml({ indent: true }));
