import DOMParser from 'dom-parser';
import React from 'react';

import { CurriculumVitae, DynamicContent } from '../components';

export default function Index({ data }) {
  console.log(data.repositories);
  return (
    <>
      <CurriculumVitae />
      <DynamicContent {...data} />
    </>
  );
}

const URI = 'https://github.com/ljosberinn';

const fixExternalLinks = (string) =>
  string
    .replace(newLinePattern, '')
    .replace(
      new RegExp('href="/ljosberinn', 'g'),
      'target="_blank" rel="noopener noreferrer" href="https://github.com/ljosberinn',
    )
    .trim();

const newLinePattern = /\r?\n|\r/g;

const extractContributionActivity = (document) => {
  return fixExternalLinks(
    document.getElementsByClassName('contribution-activity-listing')[0]
      .innerHTML,
  );
};

const extractContributionHistory = (document) =>
  fixExternalLinks(
    document.getElementsByClassName('js-calendar-graph-svg')[0].innerHTML,
  );

const extractContributionAmount = (document) => {
  const strToLookFor = ' contributions\n in the last year\n';

  return parseInt(
    Array.from(document.getElementsByTagName('h2'))
      .find((h2) => h2.textContent.indexOf(strToLookFor) > -1)
      .textContent.replace(strToLookFor, '')
      .replace(newLinePattern, '') // kill new lines
      .replace(',', '') // kill thousands separator
      .trim(), // leading & trailing spaces
  );
};

const extractRepositories = (document) =>
  fixExternalLinks(
    Array.from(document.getElementsByTagName('ol'))[0].innerHTML,
  );

export async function getServerSideProps() {
  try {
    const response = await fetch(URI);
    const html = await response.text();

    const parser = new DOMParser();
    const document = parser.parseFromString(html);

    const data = {
      contributionActivity: extractContributionActivity(document),
      contributionAmount: extractContributionAmount(document),
      contributionHistory: extractContributionHistory(document),
      repositories: extractRepositories(document),
    };

    return {
      props: {
        data: JSON.parse(
          JSON.stringify(data)
            .replace(/(\s)+/gs, ' ')
            .replace(/(js-\w+)/g, ''),
        ),
      },
    };
  } catch (error) {
    return {
      props: {
        data: {
          contributionActivity: '',
          contributionAmount: '',
          contributionHistory: '',
          repositories: [],
        },
      },
    };
  }
}
