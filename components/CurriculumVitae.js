import i18next from 'i18next';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { achievementLengths } from '../i18n';

import { CurriculumVitaeItem } from '.';

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

export default function CurriculumVitae() {
  const { t } = useTranslation('cv');

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
        position: dataset.position,
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
    <ol className="pinned-items-list mb-4">
      {cv.map((dataset, key) => {
        const {
          url,
          dates,
          location,
          icon,
          achievements,
          tags,
          talks,
          articles,
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
          achievements,
          articles,
          dates,
          employmentLocation,
          employmentTitle,
          icon,
          key,
          language: i18next.language,
          position,
          tags,
          talks,
          translatedAchievements,
          url,
        };

        return <CurriculumVitaeItem {...itemProps} />;
      })}
    </ol>
  );
}
