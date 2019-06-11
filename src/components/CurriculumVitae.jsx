import React from 'react';
import { Time } from './Time';
import { Achievements } from './Achievements';
import { Tags } from './Tags';
import { LanguageChange } from './LanguageChange';
import { OcticonBook, OcticonRepo, OcticonCode, OcticonStar } from './icons';
import { useTranslation } from 'react-i18next';
import { achievementLengths } from '../i18n';
import i18next from 'i18next';

/**
 *
 * @param {string|undefined} employer
 * @param {string|undefined} location
 */
const getEmploymentLocationText = (employer, location) =>
  employer && location
    ? `${employer}, ${location}`
    : location || employer || '';

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
  const { t } = useTranslation('cv');

  const handleLanguageChange = e => i18next.changeLanguage(e.target.value);

  const translatedAchievements = t('achievements');

  const cv = [
    {
      key: 'mpunkt',
      position: t('mpunkt-title'),
      employer: 'mpunkt GmbH',
      url: 'https://mpunkt.com',
      location: 'Augsburg',
      dates: {
        from: '2018-07-20',
        to: undefined
      },
      icon: 'code',
      achievements: [],
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
      key: 'self-study',
      position: t('self-study-title'),
      employer: undefined,
      location: undefined,
      url: undefined,
      dates: { from: '2016-09-01', to: undefined },
      icon: 'code',
      achievements: [],
      tags: [
        'PHP 5.6-7.3',
        'Debugging',
        'HTML5',
        'CSS3',
        'SCSS',
        'jQuery',
        'Vanilla JavaScript',
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
      key: 'walch',
      position: t('walch-title'),
      employer: t('walch-employer'),
      url: 'https://www.walchdruck.de/',
      location: 'Haunstetten',
      dates: { from: '2015-09-01', to: '2018-07-19' },
      icon: 'book',
      achievements: [],
      tags: ['Print & digital design', 'Insight into printing processes']
    },
    {
      key: 'uni-augsbug',
      position: t('uni-augsburg-title'),
      employer: t('uni-augsburg-employer'),
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
      key: 'uni-trier',
      position: t('uni-trier-title'),
      employer: t('uni-trier-employer'),
      url: undefined,
      location: 'Trier',
      dates: {
        from: '2012-10-01',
        to: '2014-09-30'
      },
      icon: 'book',
      achievements: [],
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
      key: 'abitur',
      position: t('abitur-title'),
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
      key: 'birth',
      position: t('birth-title'),
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

  // translate achievements
  for (const [position, amount] of Object.entries(achievementLengths)) {
    const index = cv.findIndex(obj => obj.key === position);

    for (let i = 1; i <= amount; ++i) {
      cv[index].achievements.push(t(`${position}-${i}`));
    }
  }

  return (
    <div className="mt-4">
      <LanguageChange
        currentLanguage={i18next.language}
        handleChange={handleLanguageChange}
      />
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
                    <Time dates={dates} currentLanguage={i18next.language} />
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

                  <Achievements
                    achievements={achievements}
                    translatedAchievements={translatedAchievements}
                  />

                  <Tags tags={tags} />
                </div>
              </li>
            );
          }
        )}
      </ol>
    </div>
  );
};
