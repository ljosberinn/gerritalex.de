import React from 'react';

export const LanguageChange = ({ currentLanguage, handleChange }) => {
  const languages =
    currentLanguage.indexOf('-') > -1 ? ['en-US', 'de-DE'] : ['en', 'de'];

  return (
    <div className="input-group-radio">
      {languages.map(language => {
        const classList = [
          'float-right',
          'mt-1',
          language === currentLanguage ? 'active' : null
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
              onChange={handleChange}
            />{' '}
            {language.split('-')[0].toUpperCase()}
          </label>
        );
      })}
    </div>
  );
};
