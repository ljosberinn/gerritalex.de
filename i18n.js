import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanduageDetector from 'i18next-browser-languagedetector';

const translations = require('./translation.json');

// finds occurences of "-number"
const regExp = new RegExp(/[-]\d+/);

export const achievementLengths = Object.keys(translations.de.cv)
  .map(key => (regExp.test(key) ? key : null))
  .filter(Boolean)
  .reduce((carry, value) => {
    const parts = value.split('-');
    // take all save the affix
    const position = parts.length > 2 ? parts.slice(0, -1).join('-') : parts[0];

    if (!carry[position]) {
      carry[position] = 1;
    } else {
      carry[position] += 1;
    }

    return carry;
  }, {});

export default i18n
  .use(initReactI18next)
  .use(LanduageDetector)
  .init({
    resources: translations,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: process.env.NODE_ENV === 'development',
    load: 'languageOnly',
  });
