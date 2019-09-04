import React from 'react';
import { useTranslation } from 'react-i18next';

const currentBiographyParagraphs = 5;

const Biography = () => {
  const { t } = useTranslation();

  return (
    <div className="p-note user-profile-bio">
      <ul className="vcard-details mb-3">
        {[...new Array(currentBiographyParagraphs)].map((_, index) => (
          <li key={index}>- {t(`biography-${index + 1}`)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Biography;
