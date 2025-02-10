import data from '../../prebuild/music/data.json' assert { type: 'json' };
import { generatePageMetadata } from '../seo';
import { Music } from '../../components/Music';

export const metadata = generatePageMetadata({ title: 'Music' });

export type Music = (typeof data)[0];

export default async function MusicPage() {
  const filteredData = data
    .filter((dataset) => dataset.visible)
    .sort((a, b) => {
      const acquired = new Date(b.acquired).getTime() - new Date(a.acquired).getTime();

      if (acquired !== 0) {
        return acquired;
      }

      const artist = b.artist.localeCompare(b.artist);

      if (artist !== 0) {
        return artist;
      }

      return b.album.localeCompare(a.album);
    });

  const genresByOccurence = filteredData.reduce<Record<string, number>>((acc, album) => {
    if (!album.metadata) {
      return acc;
    }

    if (album.metadata.genres.length > 0) {
      album.metadata.genres.forEach((genre) => {
        if (genre in acc) {
          acc[genre] += 1;
        } else {
          acc[genre] = 1;
        }
      });
    }

    return acc;
  }, {});

  const readableGenresCombinedWithAnd = Object.entries(genresByOccurence)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .reduce<string[]>((acc, [genre], index, arr) => {
      if (index === 0) {
        acc.push(genre);
        return acc;
      }

      if (index !== arr.length - 1) {
        acc.push(`, ${genre}`);
        return acc;
      }

      acc.push('and ' + genre);
      return acc;
    }, [])
    .join(' ');

  return (
    <section className="px-2">
      <h1 className="pb-6 text-3xl leading-9 font-bold tracking-tight text-gray-700 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-300">
        Music
      </h1>

      <p>
        Albums I own either on LP or CD. The most common genres among these {filteredData.length}{' '}
        albums are <b>{readableGenresCombinedWithAnd}</b>. Beyond that, I enjoy{' '}
        <b>Vaporwave, Goth Rock and some Trance</b>. Ordered by acquisition date, beginning with the
        latest.
      </p>

      <Music data={filteredData} />
    </section>
  );
}
