import React from 'react';
import { Time } from './Time';
import { Achievements } from './Achievements';
import { Tags } from './Tags';
import { OcticonBook, OcticonRepo, OcticonCode, OcticonStar } from './icons';

const cv = [
  {
    position: 'Web Developer',
    employer: 'mpunkt GmbH',
    url: 'https://mpunkt.com',
    location: 'Augsburg',
    dates: {
      from: '2018-07-20',
      to: undefined
    },
    icon: 'code',
    achievements: [
      'project lead & continued development after takeover of a customer-tailored web application',
      'leading a SCRUM-like team of up to five developers',
      'using Code Review- and Pair Programming-like processes',
      'client contact concerning SDLC via mail, phone as well as on site',
      'modernizing the development processes with tools such as IDE plugins, npm, composer, Sentry, SCSS, React, TypeScript, webpack and Jenkins',
      'supervising and coordinating work students and trainees',
      'held internal trainings (e.g. ES2015+, Chrome Developer Tools Deep Dive)'
    ],
    tags: [
      'PHP 5.2-7.1',
      'jQuery',
      'MySQL',
      'HTML5',
      'CSS3',
      'SCSS',
      'composer',
      'npm',
      'PHPStorm',
      'Sentry'
    ]
  },
  {
    position: 'Self study: Web Development & Software Engineering',
    employer: undefined,
    location: undefined,
    url: undefined,
    dates: { from: '2016-09-01', to: undefined },
    icon: 'code',
    achievements: [
      'moderator of the official reddit.com/r/webdev Discord channel with several thousand learning developers',
      'built and maintained several versions of World of Warcraft-related tools (Advanced Guild Statistics, Advanced Armory Access, Artifact Power Rating)',
      'built and maintained several versions of Resources Helper, a data-driven calculation-heavy spreadsheet on steroids for a mobile game',
      'during my training as media designer, developed and improved several versions of a company internal PDF generator for time tracking'
    ],
    tags: [
      'PHP 5.6-7.3',
      'Debugging',
      'HTML5',
      'CSS3',
      'SCSS',
      'jQuery',
      'vanilla JavaScript',
      'ES2015+',
      'React',
      'TypeScript',
      'MySQL',
      'Jenkins',
      'Git',
      'Sentry',
      'npm',
      'composer',
      'webpack',
      'Performance optimization',
      'Code quality',
      'Readability',
      'Atom',
      'VSCode',
      'several APIs',
      'Node.js basics'
    ]
  },
  {
    position: 'Vocational training as media designer',
    employer: 'Printery Joh. Walch',
    url: 'https://www.walchdruck.de/',
    location: 'Haunstetten',
    dates: { from: '2015-09-01', to: '2018-07-19' },
    icon: 'book',
    achievements: [],
    tags: ['Print & digital design', 'Insight into printing processes']
  },
  {
    position: 'Philosophy',
    employer: 'University of Augsburg',
    url: undefined,
    location: 'Augsburg',
    dates: {
      from: '2014-10-01',
      to: '2015-08-30'
    },
    icon: 'book',
    achievements: [],
    tags: []
  },
  {
    position: 'Teachers Education: German language & philosophy',
    employer: 'University of Trier',
    url: undefined,
    location: 'Trier',
    dates: {
      from: '2012-10-01',
      to: '2014-09-30'
    },
    icon: 'book',
    achievements: [
      'Member of the Philosophy student council Summer 2013 - Summer 2014',
      'Website management of the Philosophy student council',
      'Poster design for Philosophy student council events'
    ],
    tags: [
      'Scientific work',
      'Educational techniques',
      'Test lesssons at school',
      'Stoicism',
      'Far-eastern philosophy',
      'Taoism',
      'Buddhism',
      'Middle high german',
      'Old high german'
    ]
  },
  {
    position: 'Graduation',
    employer: 'Gymnasium Königsbrunn',
    url: undefined,
    location: 'Königsbrunn',
    dates: {
      from: undefined,
      to: '2012-07-31'
    },
    icon: 'book',
    achievements: [],
    tags: ['English', 'Economics', 'Biology', 'German', 'Mathematics']
  },
  {
    position: 'Birth',
    employer: undefined,
    url: undefined,
    location: 'Augsburg',
    dates: {
      from: '1992-05-26',
      to: undefined
    },
    icon: 'star',
    achievements: [],
    tags: []
  }
];

/**
 *
 * @param {string|undefined} employer
 * @param {string|undefined} location
 */
const getEmploymentLocationText = (employer, location) =>
  employer && location
    ? `${employer}, ${location}`
    : location || employer || '';

const LanguageChange = () => (
  <details className="details-reset details-overlay details-overlay-dark">
    <summary className="btn-link muted-link float-right mt-1 pinned-items-setting-link ">
      Change language
    </summary>
  </details>
);

const resolveIcon = iconName => {
  switch (iconName) {
    case 'book':
      return <OcticonBook />;
    case 'code':
      return <OcticonCode />;
    case 'star':
      return <OcticonStar extraClasses="mr-2 text-gray" />;
    default:
      return <OcticonRepo />;
  }
};

export const CurriculumVitae = () => {
  const handleClick = e => e.preventDefault();

  return (
    <div className="mt-4">
      <h2 className="f4 mb-2 text-normal">Curriculum Vitae</h2>
      <ol className="pinned-items-list mb-4">
        {cv.map(
          (
            {
              position,
              employer,
              url,
              dates,
              location,
              icon,
              achievements,
              tags
            },
            key
          ) => {
            const employmentLocation = getEmploymentLocationText(
              employer,
              location
            );

            const employmentTitle = `${position}${
              employer !== undefined ? ` at ${employmentLocation}` : ''
            }`;

            return (
              <li
                className="pinned-item-list-item d-flex p-3 border border-gray-dark rounded-1 cv"
                key={key}
              >
                <div className="pinned-item-list-item-content">
                  <div className="d-flex width-full flex-items-center position-relative">
                    {resolveIcon(icon)}
                    <span
                      className="text-bold flex-auto"
                      title={`${employmentTitle}`}
                    >
                      {position}
                    </span>
                    <Time dates={dates} />
                  </div>
                  {employmentLocation.length > 0 && (
                    <strong className="pinned-item-desc text-gray text-small d-block mt-2 mb-1">
                      {url !== undefined ? (
                        <a href={url} target="_blank" rel="noreferrer noopener">
                          {employmentLocation}
                        </a>
                      ) : (
                        employmentLocation
                      )}
                    </strong>
                  )}

                  <Achievements achievements={achievements} />

                  <Tags tags={tags} handleClick={handleClick} />
                </div>
              </li>
            );
          }
        )}
      </ol>
    </div>
  );
};
