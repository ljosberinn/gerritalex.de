import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import { type Blog } from '../.contentlayer/generated';
import { CustomLink } from '../components/CustomLink';
import { Image } from '../components/Image';
import { PageTitle } from '../components/PageTitle';
import { ScrollTop } from '../components/ScrollTop';

interface LayoutProps {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export default function PostMinimal({ content, next, prev, children }: LayoutProps) {
  const { title, images } = content;
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400';

  return (
    <>
      <ScrollTop />
      <article>
        <div className="pb-10 text-center dark:border-gray-700">
          <div className="relative aspect-3/1 w-full">
            <Image src={displayImage} alt={title} className="object-cover" />
          </div>
          <div className="relative pt-10">
            <PageTitle>{title}</PageTitle>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none px-2 py-4">{children}</div>
        <footer className="mb-8">
          <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
            {prev && prev.path && (
              <div className="pt-4 xl:pt-8">
                <CustomLink
                  href={`/${prev.path}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label={`Previous post: ${prev.title}`}
                >
                  &larr; {prev.title}
                </CustomLink>
              </div>
            )}
            {next && next.path && (
              <div className="pt-4 xl:pt-8">
                <CustomLink
                  href={`/${next.path}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label={`Next post: ${next.title}`}
                >
                  {next.title} &rarr;
                </CustomLink>
              </div>
            )}
          </div>
        </footer>
      </article>
    </>
  );
}
