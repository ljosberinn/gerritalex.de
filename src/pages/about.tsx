import { ExternalLink } from '@/components/ExternalLink';
import { PageMetaTags } from '@/components/PageMetaTags';

// import { GitHubList } from '../components/GitHubList';
import { HorizontalDivider } from '../components/HorizontalDivider';
import { PageTitle } from '../components/PageTitle';
import { Paragraph } from '../components/Paragraph';
import { SectionTitle } from '../components/SectionTitle';

// eslint-disable-next-line import/no-default-export
export default function About(): JSX.Element {
  return (
    <>
      <PageMetaTags />

      <section id="about-me">
        <PageTitle>About me</PageTitle>
        <Paragraph>
          I'm currently a Frontend Engineer at Interhyp working on{' '}
          <ExternalLink href="//home.interhyp.de">Interhyp Home</ExternalLink>.
        </Paragraph>

        <Paragraph>
          My personal focus is clearly very technical, although I have an eye
          for good UI/UX and am not afraid to debate standard violations, e.g.
          dark patterns, a11y or UX concerns. We should strive for a better web!
          I'm also well versed with testing, especially React.
        </Paragraph>

        <Paragraph>
          Knowing the pains of bad or nonexistant developer tooling, this has
          recently moved more into my focus. This is something I can see myself
          working in the future with.
        </Paragraph>

        <Paragraph>
          Outside of work I help maintain{' '}
          <ExternalLink href="//chakra-ui.com/">@chakra-ui/react</ExternalLink>{' '}
          as well as moderate multiple developer related Discord server, such as
          Next.js, /r/webdev and webdesign and of course Chakra.
        </Paragraph>

        <Paragraph>
          I have a background in educational sciences and philosophy, although I
          never completed my studies. What remains however is an inherent
          interest in teaching and as such regularily mentor beginner and
          intermediate learners of web basics, TypeScript, React and Next.js.
        </Paragraph>

        <Paragraph>I remain an eternal learner myself though.</Paragraph>
      </section>

      <HorizontalDivider />

      <section id="personal-about-me">
        <SectionTitle>
          That was still technical, oops. Actually about me
        </SectionTitle>

        <Paragraph>
          Yeah well. I'm big into all kinds of obscure music, turns out getting
          socialized with Black Metal and Neofolk does that. Currently I'm
          exploring Dark Ambient, apparently there's quite a lot
          Lovecraft-inspired music out there.
        </Paragraph>

        <Paragraph>
          I like red wine, good movies and good series. In fact, if it's a
          mentionworthy series of the last 20 years, chances are I've either
          already seen it or it's at the very least on my list.
        </Paragraph>

        <Paragraph>
          Favorites? Sure!
          <br />
          <strong>Series</strong> Mr Robot and Dark come first, no real debate
          here.
          <br />
          <strong>Movies</strong> Interstellar and Drive are still uncontested.
          <br />
          <strong>Music</strong>{' '}
          <ExternalLink href="//www.last.fm/user/XHS207GA">
            best you find out yourself
          </ExternalLink>
        </Paragraph>
      </section>

      <HorizontalDivider />

      <section id="professional-summary">
        <SectionTitle>Professional summary</SectionTitle>
        <Paragraph>
          Beginning 2020, I joined the Advisory Excellence team at Interhyp in
          Munich, which is responsible for the shell of{' '}
          <ExternalLink href="//home.interhyp.de">Interhyp Home</ExternalLink>{' '}
          as well as two top-level routes.
        </Paragraph>

        <Paragraph>
          I eliminated most tech debt leftovers still present from the MVP phase
          and developed a configurable and extensible routing solution based on
          react-router 5 which has found its way into other internal apps too.
        </Paragraph>

        <Paragraph>
          Together with four colleagues I participated in the{' '}
          <ExternalLink href="//devpost.com/software/01_010_a_analogeunterstutzung_help-at-home">
            #wirvsvirus-hackathon
          </ExternalLink>{' '}
          hosted by the German gov in March 2020.
        </Paragraph>

        <Paragraph>
          Later on I picked up ownership of the company internal ESLint
          configuration and overhauled it, based on modern best practices. This
          led to the creation of my own{' '}
          <ExternalLink href="//github.com/ljosberinn/eslint-config-galex">
            eslint-config-galex
          </ExternalLink>
          .
        </Paragraph>

        <Paragraph>
          Over the months I established myself as unblocker for not only my
          team, but anyone who would ask and was stuck with anything
          JavaScript/TypeScript/React or testing related.
        </Paragraph>
        <HorizontalDivider />

        <Paragraph>
          From summer 2018 to late 2019 I worked at mpunkt in Augsburg as Web
          Developer.
        </Paragraph>
        <Paragraph>
          At mpunkt, I quickly took over the lead developer position of an
          ongoing customer-tailored web application built with the LAMP stack.
          Our process was a mix of waterfall and agile.
        </Paragraph>
        <Paragraph>
          During my stay, I modernized the development processes with tools such
          as IDE plugins, npm, composer, Sentry, SCSS, React, TypeScript,
          webpack and Jenkins, greatly improving productivity, reducing common
          pain points and increasing shipping confidence left and right.
        </Paragraph>
      </section>

      <HorizontalDivider />

      <section id="open-source">
        <SectionTitle>Open Source</SectionTitle>
        <Paragraph>
          I learnt and still learn most of what I know through reading open
          source. Naturally, my own projects are open source too.
        </Paragraph>
        {/* <GitHubList /> */}
      </section>

      <HorizontalDivider />

      <section id="talks">
        <SectionTitle>Talks</SectionTitle>
        <Paragraph>TypeScript (Interhyp, 12/2020)</Paragraph>
        <Paragraph>Sessions in React via Context API (mpunkt, 2019)</Paragraph>
        <Paragraph>React Crashcourse (mpunkt, 2019)</Paragraph>
        <Paragraph>Chrome Developer Tools Deep Dive (mpunkt, 2019)</Paragraph>
        <Paragraph>
          Component Based Software Engineering (mpunkt, 2019)
        </Paragraph>
        <Paragraph>Jenkins (mpunkt, 2019)</Paragraph>
        <Paragraph>ES2015+ (mpunkt, 10/2018)</Paragraph>
      </section>
    </>
  );
}
