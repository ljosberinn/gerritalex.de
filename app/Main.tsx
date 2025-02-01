import Link from '@/components/Link';
import RestrainedMaxWidth from '@/components/RestrainedMaxWidth';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import { formatDate } from 'pliny/utils/formatDate';

const MAX_DISPLAY = 5;

function RandomLyrics() {
  const lyrics = [
    {
      lines: [
        'On the other side, I have survived',
        "Didn't think it'd be",
        "The hardest path I've ever walked",
        'Alive again... alive as me',
      ],
      source: 'Nachtmystium - On The Other Side',
      link: 'https://www.youtube.com/watch?v=JIcxAbkHElI',
    },
    {
      lines: [
        'So go and kneel and wait',
        'And join the herd',
        'You know a million sheep',
        'Will be dispersed',
        "By one lion's roar",
      ],
      source: "Rome - One Lion's Roar",
      link: 'https://www.youtube.com/watch?v=eKafdEM3z5I',
    },
    {
      lines: [
        "Remember you're unique",
        'Just like anybody else',
        "So don't grow wishbones",
        'Where the backbone ought to be',
        'Before all else be armed',
      ],
      source: 'Rome - Der Wolfsmantel',
      link: 'https://www.youtube.com/watch?v=O2crwL7yw5c',
    },
    {
      lines: [
        'You can find the answer',
        'The solution lies within the problem',
        'The answer is in every question',
        'Dig it?',
        'An attitude is all you need to rise and walk away',
        'Inspire yourself',
        'Your life is yours',
        'It fits you like your skin',
      ],
      source: 'Funkadelic - Good Thoughts, Bad Thoughts',
      link: 'https://www.youtube.com/watch?v=UGGVy4RkUs0',
    },
  ];

  // pick a random entry from the lyrics array
  const randomIndex = Math.floor(Math.random() * lyrics.length);
  const randomLyrics = lyrics[randomIndex];

  return (
    <>
      {randomLyrics.lines.map((line, index) => (
        <span key={index} className="block italic">
          {line}
        </span>
      ))}
      <br />
      <a href={randomLyrics.link}>{randomLyrics.source}</a>
    </>
  );
}

export default function Home({ posts }) {
  return (
    <RestrainedMaxWidth>
      <div className="pt-6">
        <h1 className="pb-6 text-3xl font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-300 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Hi, I'm Xeph!
        </h1>
        <div className="text-right text-lg text-gray-600 dark:text-gray-300">
          <RandomLyrics />
        </div>
      </div>
      <div className="divide-y divide-gray-300 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5" />
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.length === 0
            ? 'No posts found.'
            : posts.slice(0, MAX_DISPLAY).map(({ slug, date, title, summary, tags }) => {
                return (
                  <li key={slug} className="py-12">
                    <article>
                      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-300">
                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          </dd>
                        </dl>
                        <div className="space-y-5 xl:col-span-3">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                <Link
                                  href={`/blog/${slug}`}
                                  className="text-red-500 dark:text-yellow-100 hover:dark:text-blue-200"
                                >
                                  {title}
                                </Link>
                              </h2>
                              {tags.length > 0 ? (
                                <div className="flex flex-wrap">
                                  {tags.map((tag) => (
                                    <Tag key={tag} text={tag} />
                                  ))}
                                </div>
                              ) : null}
                            </div>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-300">
                              {summary}
                            </div>
                          </div>
                          <div className="text-base font-medium leading-6">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-blue-700 hover:text-yellow-900 dark:text-blue-200 dark:hover:text-yellow-100"
                              aria-label={`Read more: "${title}"`}
                            >
                              Read more &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </RestrainedMaxWidth>
  );
}
