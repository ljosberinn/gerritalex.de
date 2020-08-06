import React from 'react';

import { OcticonBook, OcticonRepo, OcticonCode, OcticonStar } from './icons';

import { Achievements, Time, Tags, Talks, Articles } from '.';

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

export function CurriculumVitaeItem({
  employmentTitle,
  position,
  dates,
  language,
  employmentLocation,
  achievements,
  translatedAchievements,
  icon,
  url,
  tags,
  talks,
  articles,
}) {
  return (
    <li className="pinned-item-list-item d-flex p-3 border border-gray-dark rounded-1 cv">
      <div className="pinned-item-list-item-content">
        <div className="d-flex width-full flex-items-center position-relative">
          {resolveIcon(icon)}
          <span className="text-bold flex-auto" title={`${employmentTitle}`}>
            {position}
          </span>
          <Time dates={dates} currentLanguage={language} />
        </div>

        {employmentLocation.length > 0 && (
          <strong className="pinned-item-desc text-gray text-small d-block mt-2 mb-1">
            {url ? (
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
        <Articles articles={articles} />
        <Talks data={talks} />
        <Tags tags={tags} />
      </div>
    </li>
  );
}
