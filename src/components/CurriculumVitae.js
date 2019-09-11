import React, { useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { achievementLengths } from '../i18n';
import i18next from 'i18next';
import { CurriculumVitaeItem, LanguageChange } from '.';

/**
 *
 * @param {string|undefined} employer
 * @param {string|undefined} location
 */
const getEmploymentLocationText = (employer, location) =>
  employer && location
    ? `${employer}, ${location}`
    : location || employer || '';

const TRANSLATE_INDICATOR = 't.';

const cv = require('./../cv.json');

const CurriculumVitae = () => {
  const { t } = useTranslation('cv');

  const handleLanguageChange = e => i18next.changeLanguage(e.target.value);

  const translatedAchievements = t('achievements');

  // translate achievements
  for (const [position, amount] of Object.entries(achievementLengths)) {
    const index = cv.findIndex(({ key }) => key === position);

    for (let i = 1; i <= amount; ++i) {
      // usage of i here instead of push because cv isnt redefined on language change
      // .push would add translated strings additionally, instead we want to overwrite
      cv[index].achievements[i] = t(`${position}-${i}`);
    }
  }

  const translateCVDataset = useCallback(
    dataset => {
      // proxy returned value because of static cv import via json
      const response = {
        employer: dataset.employer,
        position: dataset.position
      };

      Object.keys(response).forEach(key => {
        if (
          dataset[key] !== null &&
          dataset[key].indexOf(TRANSLATE_INDICATOR) > -1
        ) {
          response[key] = t(dataset[key].split(TRANSLATE_INDICATOR)[1]);
        }
      });

      return response;
    },
    [t]
  );

  return (
    <div className="mt-4">
      <LanguageChange
        currentLanguage={i18next.language}
        handleChange={handleLanguageChange}
      />
      <h2 className="f4 mb-2 text-normal">Curriculum Vitae</h2>
      <ol className="pinned-items-list mb-4">
        {cv.map((dataset, key) => {
          const {
            url,
            dates,
            location,
            icon,
            achievements,
            tags,
            talks
          } = dataset;
          const { employer, position } = translateCVDataset(dataset);

          const employmentLocation = getEmploymentLocationText(
            employer,
            location
          );

          const employmentTitle = `${position}${
            employer ? ` at ${employmentLocation}` : ''
          }`;

          const itemProps = {
            employmentLocation,
            employmentTitle,
            icon,
            language: i18next.language,
            achievements,
            url,
            tags,
            dates,
            translatedAchievements,
            position,
            talks,
            key
          };

          return <CurriculumVitaeItem {...itemProps} />;
        })}
      </ol>
    </div>
  );
};

export default CurriculumVitae;