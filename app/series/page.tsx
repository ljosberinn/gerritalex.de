import { generatePageMetadata } from 'app/seo';
import data from 'data/series.json';
import Image from 'components/Image';
import clsx from 'clsx';
import { globSync } from 'glob';
import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';

export const metadata = generatePageMetadata({ title: 'Series' });

const getImages = async (pattern: string): Promise<Record<string, string>> => {
  return Promise.all(
    globSync(pattern).map(async (file) => {
      const src = file.replace('./public', '').split('\\');
      const buffer = await fs.readFile(file);

      const plaiceholder = await getPlaiceholder(buffer);

      return {
        src: src[src.length - 1],
        base64: plaiceholder.base64,
      };
    })
  ).then((images) =>
    images.reduce((acc, image) => {
      acc[image.src] = image.base64;
      return acc;
    }, {})
  );
};

export default async function SeriesPage() {
  const images = await getImages('./public/static/images/series/*-cover.jpg');

  // todo: default sort by recommended
  // allow secondary grouping by year OR genre

  return (
    <div className="center flex justify-center sm:block">
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
        {data
          .sort((a, b) => {
            if (a.metadata.release.year !== b.metadata.release.year) {
              return b.metadata.release.year - a.metadata.release.year;
            }

            if (a.metadata.release.month !== b.metadata.release.month) {
              return b.metadata.release.month - a.metadata.release.month;
            }

            return b.metadata.release.day - a.metadata.release.day;
          })
          .map((series) => {
            const classes = clsx({
              'opacity-25 grayscale hover:grayscale-0': !series.completed,
              'rounded-md border-2 transition ease-in-out hover:opacity-100 shadow-inner hover:shadow-none':
                true,
              'opacity-75': series.completed,
              'border-yellow-500 hover:border-yellow-600 dark:border-amber-400 hover:dark:border-amber-500':
                series.favorite,
              'border-slate-300 dark:border-slate-700 hover:border-slate-800 hover:dark:border-primary-700':
                !series.favorite,
            });

            if (series.id === null) {
              return (
                <span key={series.id}>
                  <Image
                    title={series.title}
                    alt={series.title}
                    width={125}
                    height={175}
                    className={classes}
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCACWAGQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUGAQIHCP/EACwQAQABAwMDAQcFAQAAAAAAAAABAgMEBQYREhMhMRQWIjIzYZEHQVFxgcH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9lgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6Boe3dC0Hb9O5dyY/tFdymKrdmqOYiJ+WOmfEzP39Ac/HQtL17ZOv5UaVl7XxsKb89Fq5RRTHM/tHVTETTP5Vnd+3fdvVZxbddVePdp7lmqr14/ifvAIMAAAAAAAAABI6huLWdUw7WBn5s3bFiYm3R0UxxMRxHmI5nwjmaKeqqKeqI5njmfSAWjZG1crV821qd6JtYWNciubk+OuqmeeI/HmWv6g67ja1rNNOHVFdnFo7cVx6V1c8zMfZMb313ExNFwdD0HULFdmqiab3s92mr4aYj4Z4nxzz/vCgAAAAAAAAAAAN7Hb71vvfT6o6/658+jQBZN2e5vZxvdf6nVPe+r6cePn/4rYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k="
                  />
                </span>
              );
            }

            const base64 = images[`${series.id}-cover.jpg`];

            return (
              <a
                href={`https://www.themoviedb.org/tv/${series.id}`}
                target="_blank"
                key={series.id}
              >
                <Image
                  title={series.title}
                  alt={series.title}
                  width={125}
                  height={175}
                  placeholder={base64 ? 'blur' : undefined}
                  blurDataURL={base64}
                  className={classes}
                  loading="lazy"
                  quality={75}
                  src={`/static/images/series/${series.id}-cover.jpg`}
                />
                <span className="sr-only">{series.metadata.tagline}</span>
              </a>
            );
          })}
      </div>
    </div>
  );
}
