import axios from 'axios';
import DOMParser from 'dom-parser';

const URI = 'https://github.com/ljosberinn';

const fixExternalLinks = string =>
  string
    .replace(newLinePattern, '')
    .replace(
      new RegExp('href="/ljosberinn', 'g'),
      'target="_blank" rel="noopener noreferrer" href="https://github.com/ljosberinn',
    )
    .trim();

const newLinePattern = /\r?\n|\r/g;

const extractContributionActivity = document => {
  return fixExternalLinks(
    document.getElementsByClassName('contribution-activity-listing')[0]
      .innerHTML,
  );
};

const extractContributionHistory = document =>
  fixExternalLinks(
    document.getElementsByClassName('js-calendar-graph-svg')[0].innerHTML,
  );

const extractContributionAmount = document => {
  const strToLookFor = ' contributions\n in the last year\n';

  return parseInt(
    Array.from(document.getElementsByTagName('h2'))
      .find(h2 => h2.textContent.indexOf(strToLookFor) > -1)
      .textContent.replace(strToLookFor, '')
      .replace(newLinePattern, '') // kill new lines
      .trim(), // leading & trailing spaces
  );
};

const extractRepositories = document =>
  fixExternalLinks(
    Array.from(document.getElementsByTagName('ol'))[0].innerHTML,
  );

export async function handler() {
  let body = {
    contributionActivity: '',
    contributionHistory: '',
    contributionAmount: '',
    repositories: '',
  };

  try {
    const { data: html } = await axios.get(URI, { responseType: 'text' });

    const parser = new DOMParser();
    const document = parser.parseFromString(html);

    body.contributionActivity = extractContributionActivity(document);
    body.contributionHistory = extractContributionHistory(document);
    body.contributionAmount = extractContributionAmount(document);
    body.repositories = extractRepositories(document);

    return {
      statusCode: 200,
      body: JSON.stringify(body)
        .replace(/(\s)+/gs, ' ')
        .replace(/(js-\w+)/g, ''),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(body),
    };
  }
}
