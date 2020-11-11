import { PostPreviewList } from '@/components/Blog/Post/PostPreviewList';
import { PageMetaTags } from '@/components/Seo/PageMetaTags';
import { SectionTitle } from '@/components/Typography/SectionTitle';

import { HorizontalDivider } from '../components/Divider';
import { ExternalLink } from '../components/Typography/ExternalLink';
import { InternalLink } from '../components/Typography/InternalLink';
import { PageTitle } from '../components/Typography/PageTitle';
import { Paragraph } from '../components/Typography/Paragraph';

// eslint-disable-next-line import/no-default-export
export default function Home(): JSX.Element {
  return (
    <div>
      <PageMetaTags />
      <PageTitle>Hi, I am Gerrit! 👋</PageTitle>
      <Paragraph>
        I am a software engineer working with JavaScript and on all-things-web.
        I am currently taking a short break before continuing to next adventure.
        You might know me from my works with{' '}
        <ExternalLink href="https://www.tokopedia.com">Tokopedia</ExternalLink>.
        I previously worked in the web platform team there. I am currently based
        in Indonesia (🇮🇩).
      </Paragraph>

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
