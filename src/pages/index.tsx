import { gerritalex } from '@/blog/authors';
import { PostPreviewList } from '@/components/Blog/Post/PostPreviewList';
import { PageMetaTags } from '@/components/PageMetaTags';
import { SectionTitle } from '@/components/SectionTitle';

import { HorizontalDivider } from '../components/HorizontalDivider';
import { InternalLink } from '../components/InternalLink';
import { Paragraph } from '../components/Paragraph';

// eslint-disable-next-line import/no-default-export
export default function Home(): JSX.Element {
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
      <SectionTitle>Latest posts</SectionTitle>
      <PostPreviewList />
    </>
  );
}
