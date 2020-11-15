import { writeFileSync } from 'fs';
import RSS from 'rss';

import { getAllPostPreviews } from '../src/blog/getAllPostPreviews';
import config from '../src/config.json';

const feed = new RSS({
  feed_url: `${config.domain}/feed.xml`,
  site_url: config.domain,
  title: config.domain.split('//')[1],
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
    url: `${config.domain}${link}`,
  });
});

writeFileSync('./.next/static/feed.xml', feed.xml({ indent: true }));
