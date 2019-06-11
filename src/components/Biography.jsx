import React from 'react';
import { useTranslation } from 'react-i18next';

export const Biography = () => {
  const { t } = useTranslation();

  return <div className="p-note user-profile-bio">{t('biography')}</div>;
};
