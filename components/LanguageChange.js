import React, { useState } from 'react';
import i18next from 'i18next';

const languages = ['en', 'de'];

export default function LanguageChange() {
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language);

  const handleLanguageChange = ({ target: { value } }) => {
    i18next.changeLanguage(value);
    setCurrentLanguage(value);
  };

  return (
    <div className="input-group-radio">
      {languages.map(language => {
        const classList = [
          'float-right',
          'mt-1',
          language === currentLanguage ? 'active' : null,
        ]
          .join(' ')
          .trim();

        return (
          <label key={language} className={classList}>
            <input
              type="radio"
              name="language"
              value={language}
              checked={language === currentLanguage}
              onChange={handleLanguageChange}
            />{' '}
            {language.toUpperCase()}
          </label>
        );
      })}
    </div>
  );
}
