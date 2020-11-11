import { PageMetaTags } from '@/components/PageMetaTags';

import { GitHubList } from '../components/GitHubList';
import { HorizontalDivider } from '../components/HorizontalDivider';
import { PageTitle } from '../components/PageTitle';
import { Paragraph } from '../components/Paragraph';
import { SectionTitle } from '../components/SectionTitle';

// eslint-disable-next-line import/no-default-export
export default function About(): JSX.Element {
  return (
    <>
      <PageMetaTags />
      <PageTitle>About me</PageTitle>
      <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
      <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>

      <HorizontalDivider />

      <SectionTitle>Professional summary 💼</SectionTitle>
      <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>

      <HorizontalDivider />

      <SectionTitle>I write, kinda ✍️</SectionTitle>
      <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>

      <HorizontalDivider />

      <SectionTitle>I build stuffs 🛠️</SectionTitle>
      <Paragraph>
        Lorem ipsum dolor sit amet.
        <GitHubList />
      </Paragraph>

      <HorizontalDivider />

      <SectionTitle>I speak too, sometimes 🎤</SectionTitle>
      <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
    </>
  );
}
