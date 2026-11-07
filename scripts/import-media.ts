import { createWriteStream } from 'fs';
import { generateThumbnails } from '../prebuild/thumbnails.ts';

type ImageDownload = { from: string; to: string };

const importers = {
  discogs: false,
  movies: false,
  series: true,
};

async function downloadAndStoreImage(url: string, storagePath: string): Promise<void> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url);

    if (response.ok) {
      const stream = createWriteStream(storagePath);

      stream.on('finish', resolve);
      stream.on('close', reject);
      stream.on('error', reject);

      response.body?.pipeTo(
        new WritableStream({
          write(chunk) {
            stream.write(chunk);
          },
          close() {
            stream.end();
          },
        })
      );
    } else {
      console.error(`Response for ${url} was not ok [${response.status}]`);
      resolve();
    }
  });
}

// `node scripts/import-media.ts movies series` runs only the named importers instead of the defaults above
const requested = process.argv.slice(2);
const enabled =
  requested.length > 0
    ? Object.fromEntries(Object.keys(importers).map((name) => [name, requested.includes(name)]))
    : importers;

const promises: Promise<ImageDownload[]>[] = [];

if (enabled.movies) {
  const { doMoviesImport } = await import('../prebuild/movies/index.ts');
  promises.push(doMoviesImport());
}

if (enabled.series) {
  const { doSeriesImport } = await import('../prebuild/series/index.ts');
  promises.push(doSeriesImport());
}

if (enabled.discogs) {
  const { doDiscogsImport } = await import('../prebuild/music/index.ts');
  promises.push(doDiscogsImport());
}

const images = (await Promise.all(promises)).flat();

await Promise.all(images.map((image) => downloadAndStoreImage(image.from, image.to)));

await generateThumbnails();
