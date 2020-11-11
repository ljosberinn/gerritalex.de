import { PostPreviewList } from '@/components/Blog/Post/PostPreviewList';
import { PageMetaTags } from '@/components/PageMetaTags';

import { PageTitle } from '../components/PageTitle';

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
