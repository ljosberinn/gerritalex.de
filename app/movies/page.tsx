import { generatePageMetadata } from 'app/seo';
import data from '../../movies.json';
import { Movies } from '@/components/Movies';

export const metadata = generatePageMetadata({ title: 'Movies' });

export type Movies = (typeof data)[0];

const description = [
  'Ordered by latest release date.',
  'Golden borders indicate favorites/recommendations.',
  'Hover image for title.',
  'Click image for more info.',
];

export default async function MoviesPage() {
  // todo: default sort by recommended
  // allow secondary grouping by year OR genre

  const genresByOccurence = data.reduce<Record<string, number>>((acc, movies) => {
    if (movies.metadata.genres.length > 0) {
      movies.metadata.genres.forEach((genre) => {
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

  const totalRuntime = data.reduce((acc, movie) => acc + movie.metadata.runtime, 0) / 60 / 24;

  return (
    <section className="px-2">
      <h1 className="pb-6 text-3xl font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-300 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
        Movies
      </h1>

      <p>
        Pretty exhaustive list of movies I've watched, ever. The most common genres among these{' '}
        {data.length} movies are <b>{readableGenresCombinedWithAnd}</b>. Total runtime amounts to{' '}
        <b>{totalRuntime.toFixed(2)}</b> days.
      </p>

      <ul className="list-disc pl-8 pt-4">
        {description.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>

      <Movies data={data} />
    </section>
  );
}
