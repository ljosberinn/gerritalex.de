import { PostPreviewList } from '@/components/Blog/Post/PostPreviewList';
import { PageMetaTags } from '@/components/Seo/PageMetaTags';

import { PageTitle } from '../components/Typography/PageTitle';

// eslint-disable-next-line import/no-default-export
export default function Home(): JSX.Element {
  return (
    <div>
      <PageMetaTags />
      <PageTitle>Blog ✍️</PageTitle>
      <PostPreviewList />
    </div>
  );
}
