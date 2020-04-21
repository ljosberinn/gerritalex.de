import fetch from 'node-fetch';
import DOMParser from 'dom-parser';

const cache = {
  contributionActivity: '',
  contributionAmount: '',
  contributionHistory: '',
  repositories: [],
  timestamp: null,
};

const needsUpdate = () =>
  !cache.timestamp || Date.now() - 24 * 60 * 60 * 1000 > cache.timestamp;

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
      .trim(), // leading & trailing spaces
  );
};

const extractRepositories = (document) =>
  fixExternalLinks(
    Array.from(document.getElementsByTagName('ol'))[0].innerHTML,
  );

export default async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (!needsUpdate()) {
    res.json(cache);
    res.end();
  }

  try {
    const response = await fetch(URI);
    const html = await response.text();

    const parser = new DOMParser();
    const document = parser.parseFromString(html);

    cache.contributionActivity = extractContributionActivity(document);
    cache.contributionHistory = extractContributionHistory(document);
    cache.contributionAmount = extractContributionAmount(document);
    cache.repositories = extractRepositories(document);
    cache.timestamp = Date.now();

    res.end(
      JSON.stringify(cache)
        .replace(/(\s)+/gs, ' ')
        .replace(/(js-\w+)/g, ''),
    );
  } catch (error) {
    console.error(error);
    res.json(cache);
  }
}
