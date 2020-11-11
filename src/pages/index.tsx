import { PostPreviewList } from '@/components/Blog/Post/PostPreviewList';
import { PageMetaTags } from '@/components/PageMetaTags';
import { SectionTitle } from '@/components/SectionTitle';

import { ExternalLink } from '../components/ExternalLink';
import { HorizontalDivider } from '../components/HorizontalDivider';
import { InternalLink } from '../components/InternalLink';
import { PageTitle } from '../components/PageTitle';
import { Paragraph } from '../components/Paragraph';

// eslint-disable-next-line import/no-default-export
export default function Home(): JSX.Element {
  return (
    <div>
      <PageMetaTags />
      <PageTitle>Lorem ipsum dolor sit amet.</PageTitle>
      <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>

      <Paragraph>
        <InternalLink href="/about">More about me &rarr;</InternalLink>
      </Paragraph>

      <Paragraph>
        <ExternalLink href="https://twitter.com/gerrit_alex">
          @gerrit_alex on Twitter
        </ExternalLink>
      </Paragraph>
      <HorizontalDivider />

      <SectionTitle>Latest writings ✍️</SectionTitle>
      <PostPreviewList />
    </div>
  );
}
