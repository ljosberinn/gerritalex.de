import { useTranslation } from 'react-i18next';

const currentBiographyParagraphs = 4;

export function Biography() {
  const { t } = useTranslation();

  return (
    <div className="p-note user-profile-bio">
      <ul className="vcard-details mb-3">
        {Array.from({ length: currentBiographyParagraphs }, (_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>- {t(`biography-${index + 1}`)}</li>
        ))}
      </ul>
    </div>
  );
}
