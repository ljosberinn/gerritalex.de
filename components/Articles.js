import { useTranslation } from 'react-i18next';

import { ExternalLink } from './ExternalLink';

export function Articles({ articles }) {
  const { t } = useTranslation();

  if (articles.length === 0) {
    return null;
  }

  return (
    <>
      <p className="pinned-item-desc mt-2 text-gray">
        {t('articles-published')}:
      </p>

      <ul className="pinned-item-desc text-gray text-small d-block mb-3 dashed">
        {articles.map(({ title, url }) => (
          <li key={title}>
            <ExternalLink href={url}>{title}</ExternalLink>
          </li>
        ))}
      </ul>
    </>
  );
}
