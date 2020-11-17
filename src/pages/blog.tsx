import type { ViewData } from '@/components/Blog/Post/PostPreviewList';
import { PostPreviewList } from '@/components/Blog/Post/PostPreviewList';
import { PageMetaTags } from '@/components/PageMetaTags';
import { usePageView } from '@/hooks/usePageView';
import { getStaticBlogViewData } from '@/utils/db';

import { PageTitle } from '../components/PageTitle';

type BlogProps = { viewData: ViewData[] };

// eslint-disable-next-line import/no-default-export
export default function Blog({ viewData }: BlogProps): JSX.Element {
  usePageView();

  return (
    <>
      <PageMetaTags />
      <PageTitle>Blog</PageTitle>
      <PostPreviewList viewData={viewData} />
    </>
  );
}

export const getStaticProps = getStaticBlogViewData;
