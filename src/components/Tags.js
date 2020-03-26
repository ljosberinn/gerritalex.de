import React from 'react';
import { useTranslation } from 'react-i18next';

function Tag({ text }) {
  return (
    <button className="btn-link topic-tag topic-tag-link" type="button">
      {text}
    </button>
  );
}

export default function Tags({ tags }) {
  const { t } = useTranslation();

  if (tags.length === 0) {
    return null;
  }

  return (
    <>
      <p className="pinned-item-desc mt-2 text-gray">{t('tools-used')}:</p>
      <p className="mb-0 f6 text-gray d-inline-flex flex-wrap flex-items-center f6 my-1">
        {tags.map((text, key) => (
          <Tag text={text} key={key} />
        ))}
      </p>
    </>
  );
}
