import { gerritalex } from '@/blog/authors';
import type { ViewData } from '@/components/Blog/Post/PostPreviewList';
import { PostPreviewList } from '@/components/Blog/Post/PostPreviewList';
import { PageMetaTags } from '@/components/PageMetaTags';
import { usePageView } from '@/hooks/usePageView';
import { getStaticBlogViewData } from '@/utils/db';

import { HorizontalDivider } from '../components/HorizontalDivider';
import { InternalLink } from '../components/InternalLink';
import { Paragraph } from '../components/Paragraph';

type HomeProps = { viewData: ViewData[] };

// eslint-disable-next-line import/no-default-export
export default function Home({ viewData }: HomeProps): JSX.Element {
  usePageView();

  return (
    <>
      <PageMetaTags />
      <Paragraph>
        My name is {gerritalex.name}, I'm a self-taught Full Stack Web Software
        Engineer working in the JavaScript ecosystem.
      </Paragraph>

      <Paragraph>
        <InternalLink href="/about">More about me &rarr;</InternalLink>
      </Paragraph>

      <HorizontalDivider />

      <PostPreviewList onlyPopular viewData={viewData} />
    </>
  );
}

export const getStaticProps = getStaticBlogViewData;
