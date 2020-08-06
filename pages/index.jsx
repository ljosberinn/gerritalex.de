/* eslint-disable unicorn/prefer-query-selector */
import DOMParser from 'dom-parser';
import React from 'react';

import { CurriculumVitae, DynamicContent } from '../components';

// eslint-disable-next-line import/no-default-export
export default function Index({ data }) {
  return (
    <>
      <CurriculumVitae />
      <DynamicContent {...data} />
    </>
  );
}

const URI = 'https://github.com/ljosberinn';

const fixExternalLinks = string =>
  string
    .replace(newLinePattern, '')
    .replace(
      /(href="\/)/g,
      'target="_blank" rel="noopener noreferrer" href="https://github.com/'
    )

    .trim();

const newLinePattern = /\r?\n|\r/g;

const extractContributionActivity = document => {
  const content = document.getElementsByClassName(
    'contribution-activity-listing'
  )[0].innerHTML;

  return fixExternalLinks(content);
};

const extractContributionHistory = document =>
  fixExternalLinks(
    document.getElementsByClassName('js-calendar-graph-svg')[0].innerHTML
  );

const extractContributionAmount = document => {
  const strToLookFor = ' contributions\n in the last year\n';

  return Number.parseInt(
    [...document.getElementsByTagName('h2')]
      .find(h2 => h2.textContent.includes(strToLookFor))
      .textContent.replace(strToLookFor, '')
      .replace(newLinePattern, '') // kill new lines
      .replace(',', '') // kill thousands separator
      .trim() // leading & trailing spaces
  );
};

const extractRepositories = document =>
  fixExternalLinks([...document.getElementsByTagName('ol')][0].innerHTML);

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
            .replace(/(js-\w+)/g, '')
        ),
      },
    };
  } catch {
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
