import data from '../../music.json' assert { type: 'json' };
import { generatePageMetadata } from 'app/seo';
import { Music } from '@/components/Music';

export const metadata = generatePageMetadata({ title: 'Music' });

export type Music = (typeof data)[0];

export default async function MusicPage() {
  return (
    <section>
      <h1 className="pb-6 text-3xl font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-300 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
        Music
      </h1>

      <Music data={data} />
    </section>
  );
}
