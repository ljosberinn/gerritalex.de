import fs from 'fs';
import RSS from 'rss';
import getAllPostPreviews from '../src/blog/getAllPostPreviews';

const feed = new RSS({
  title: 'gerritalex.de',
  site_url: 'https://gerritalex.de',
  feed_url: 'https://gerritalex.de/feed.xml',
});

getAllPostPreviews().forEach(({ link, module: { meta } }) => {
  feed.item({
    title: meta.title,
    guid: link,
    url: `https://gerritalex.de${link}`,
    date: meta.date,
    description: meta.description,
    custom_elements: [].concat(
      meta.authors.map((author) => ({ author: [{ name: author.name }] })),
    ),
  });
});

fs.writeFileSync('./.next/static/feed.xml', feed.xml({ indent: true }));
