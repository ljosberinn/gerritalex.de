import { useTranslation } from 'react-i18next';

import { OcticonLocation, OcticonPhone } from './icons';

const mobile = '+49 (0)176 64 74 84 14';
const sanitizedMobile = 4917664748414;

export function Meta() {
  const { t } = useTranslation();

  return (
    <ul className="vcard-details mb-3">
      <li
        itemProp="phoneNumber"
        aria-label={`${t('aria-phone')}: ${mobile}}`}
        className="vcard-detail pt-1 css-truncate css-truncate-target"
      >
        <OcticonPhone />
        <span className="p-label">
          <a href={`tel:+${sanitizedMobile}`}>{mobile}</a>
        </span>
      </li>
      <li
        itemProp="homeLocation"
        aria-label="Home location: Augsburg, Bavaria"
        className="vcard-detail pt-1 css-truncate css-truncate-target"
      >
        <OcticonLocation />
        <span className="p-label">{t('location')}</span>
      </li>
    </ul>
  );
}
