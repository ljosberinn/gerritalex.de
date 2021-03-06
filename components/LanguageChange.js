import i18next from 'i18next';
import { useState, useEffect } from 'react';

const languages = ['en', 'de'];

export function LanguageChange() {
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language);

  const handleLanguageChange = ({ target: { value } }) => {
    i18next.changeLanguage(value);
    setCurrentLanguage(value);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      document.querySelector('html').setAttribute('lang', currentLanguage);
    }
  }, [currentLanguage]);

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
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
