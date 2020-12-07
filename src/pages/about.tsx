import { ExternalLink } from "../components/ExternalLink";

// eslint-disable-next-line import/no-default-export
export default function About(): JSX.Element {
  return (
    <article className="prose lg:prose-xl max-w-none">
      <section id="about-me">
        <h1>About me</h1>
        <p>
          I'm currently a Frontend Engineer assuming the role of Frontend Team
          Lead at Interhyp working on{" "}
          <ExternalLink href="//home.interhyp.de">Interhyp Home</ExternalLink>.
        </p>

        <p>
          My personal focus is clearly very technical, although I have an eye
          for good UI/UX and am not afraid to debate standard violations, e.g.
          dark patterns, a11y or UX concerns. We should strive for a better web!
          I'm also well versed with testing, especially React.
        </p>

        <p>
          Knowing the pains of bad or nonexistant developer tooling, this has
          recently moved more into my focus. This is something I can see myself
          working in the future with.
        </p>

        <p>
          Outside of work I help maintain{" "}
          <ExternalLink href="//chakra-ui.com/">@chakra-ui/react</ExternalLink>{" "}
          as well as moderate multiple developer related Discord server, such as{" "}
          <ExternalLink href="//discord.gg/NjCUAf4">Next.js</ExternalLink>,
          <ExternalLink href="//discord.gg/hUvVKWd">
            /r/webdev and webdesign
          </ExternalLink>{" "}
          and of course{" "}
          <ExternalLink href="//discord.gg/D6UKVxxzqN">Chakra</ExternalLink>.
        </p>

        <p>
          I have a background in educational sciences and philosophy, although I
          never completed my studies. What remains however is an inherent
          interest in teaching and as such regularily mentor beginner and
          intermediate learners of web basics, TypeScript, React and Next.js.
        </p>

        <p>I remain an eternal learner myself though.</p>
      </section>

      <hr />

      <section id="personal-about-me">
        <h2>That was still technical, oops. Actually about me</h2>

        <p>
          Yeah well. I'm big into all kinds of obscure music, turns out getting
          socialized with Black Metal and Neofolk does that. Currently I'm
          exploring Dark Ambient, apparently there's quite a lot
          Lovecraft-inspired music out there.
        </p>

        <p>
          I like red wine, good movies and good series. In fact, if it's a
          mentionworthy series of the last 20 years, chances are I've either
          already seen it or it's at the very least on my list.
        </p>

        <p>
          Favorites? Sure!
          <br />
          <strong>Series</strong> Mr Robot and Dark come first, no real debate
          here.
          <br />
          <strong>Movies</strong> Interstellar and Drive are still uncontested.
          <br />
          <strong>Music</strong>{" "}
          <ExternalLink href="//www.last.fm/user/XHS207GA">
            best you find out yourself
          </ExternalLink>
        </p>
      </section>

      <hr />

      <section id="professional-summary">
        <h2>Professional summary</h2>
        <p>
          Beginning 2020, I joined the Advisory Excellence team at{" "}
          <ExternalLink href="//interhyp.de">Interhyp</ExternalLink> in Munich,
          which is responsible for the shell of{" "}
          <ExternalLink href="//home.interhyp.de">Interhyp Home</ExternalLink>{" "}
          as well as two major features.
        </p>

        <p>
          I eliminated most tech debt leftovers still present from the MVP phase
          and developed a configurable and extensible routing solution based on
          react-router 5 which has found its way into other internal apps too.
        </p>

        <p>
          Together with four colleagues I participated in the{" "}
          <ExternalLink href="//devpost.com/software/01_010_a_analogeunterstutzung_help-at-home">
            #wirvsvirus-hackathon
          </ExternalLink>{" "}
          hosted by the German gov in March 2020.
        </p>

        <p>
          Later on I picked up ownership of the company internal ESLint
          configuration and overhauled it, based on modern best practices. This
          led to the creation of my own{" "}
          <ExternalLink href="//github.com/ljosberinn/eslint-config-galex">
            eslint-config-galex
          </ExternalLink>
          .
        </p>

        <p>
          Over the months I established myself as unblocker for not only my
          team, but anyone who would ask and was stuck with anything
          JavaScript/TypeScript/React or testing related.
        </p>
        <hr />

        <p>
          From summer 2018 to late 2019 I worked at{" "}
          <ExternalLink href="//mpunkt.de">mpunkt</ExternalLink> in Augsburg as
          Web Developer.
        </p>
        <p>
          At mpunkt, I quickly took over the lead developer position of a
          customer-tailored web application built with the LAMP stack. Our
          process was a mix of waterfall and agile.
        </p>
        <p>
          During my stay, I modernized the development processes with tools such
          as IDE plugins, npm, composer, Sentry, SCSS, React, TypeScript,
          webpack and Jenkins, greatly improving productivity, reducing common
          pain points and increasing shipping confidence left and right.
        </p>
      </section>

      <hr />

      <section id="open-source">
        <h2>Open Source</h2>
        <p>
          I learnt and still learn most of what I know through reading open
          source. Naturally, my own projects are open source too.
        </p>
        A few real world projects of the past:
        <ul>
          <li>Artifact Power World Ranking (09/16)</li>
          <li>Advanced Guild Statistics v1 (12/16)</li>
          <li>Advanced Armory Access v1 (12/16)</li>
          <li>Resources Helper v1 (12/16)</li>
          <li>Advanced Armory Access v2 (01/17)</li>
          <li>Advanced Guild Statistics v2 (02/17)</li>
          <li>Resources Helper v2 (02/17)</li>
          <li>Resources Helper v3 (05/17)</li>
          <li>
            <ExternalLink href="https://chrome.google.com/webstore/detail/github-vs-code-one-dark-v/ifhihbeapkbahaelfppkncgmmmeidapl">
              GitHub One Dark Vivid
            </ExternalLink>{" "}
            (07/18)
          </li>
          <li>
            <ExternalLink href="//github.com/ljosberinn/Wahlorientierungshilfe">
              Wahlorientierungshilfe
            </ExternalLink>{" "}
            (09/17)
          </li>
          <li>
            <ExternalLink href="//github.com/ljosberinn/AuctionCraftSniper">
              AuctionCraftSniper
            </ExternalLink>{" "}
            (12/18)
          </li>
          <li>
            <ExternalLink href="//github.com/ljosberinn/webdev-support-bot">
              WebDev Support Bot
            </ExternalLink>{" "}
            (12/19)
          </li>
          <li>
            <ExternalLink href="//github.com/ljosberinn/eslint-config-galex">
              eslint-config-galex
            </ExternalLink>{" "}
            (09/20)
          </li>
        </ul>
        {/* <GitHubList /> */}
      </section>

      <hr />

      <section id="talks">
        <h2>Talks</h2>
        <ol>
          <li>ES2015+ (mpunkt, 10/2018)</li>
          <li>Jenkins (mpunkt, 2019)</li>
          <li>Component Based Software Engineering (mpunkt, 2019)</li>
          <li>Chrome Developer Tools Deep Dive (mpunkt, 2019)</li>
          <li>React Crashcourse (mpunkt, 2019)</li>
          <li>Sessions in React via Context API (mpunkt, 2019)</li>
          <li>TypeScript (Interhyp, 12/2020)</li>
        </ol>
      </section>

      <section id="posts">
        <h2>External Blog Posts</h2>
        <ol>
          <li>
            <ExternalLink href="//digital.interhyp.de/2020/12/04/performance-mit-react-bordmitteln-verbessern/">
              Performance mit React-Bordmitteln verbessern
            </ExternalLink>{" "}
            (German only, Interhyp, 06/2020)
          </li>
        </ol>
      </section>
    </article>
  );
}
