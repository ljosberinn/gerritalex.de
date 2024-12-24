import { Series } from '@/components/Series';
import { generatePageMetadata } from 'app/seo';
import data from 'data/series.json';

export const metadata = generatePageMetadata({ title: 'Series' });

export type Series = (typeof data)[0];

const description = [
  'Ordered by latest episode release date.',
  'Golden borders indicate favorites/recommendations.',
  'Red borders indicate abandonment, usually due to poor quality.',
  'Grayscale progress indicates how much of the series has been watched.',
  'Hover image for title.',
  'Click image for more info.',
];

export default async function SeriesPage() {
  // todo: default sort by recommended
  // allow secondary grouping by year OR genre

  const genresByOccurence = data.reduce<Record<string, number>>((acc, series) => {
    if (series.metadata.genres.length > 0) {
      series.metadata.genres.forEach((genre) => {
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
    <section>
      <h1 className="pb-6 text-3xl font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-300 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
        Series
      </h1>

      <p>
        Pretty exhaustive list of series I've watched, ever. The most common genres among these{' '}
        {data.length} series are <b>{readableGenresCombinedWithAnd}</b>.
      </p>

      <ul className="list-disc pl-8 pt-4">
        {description.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>

      <Series data={data} />
    </section>
  );
}
