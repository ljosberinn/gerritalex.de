import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanduageDetector from 'i18next-browser-languagedetector';

const translations = require('./translation.json');

const resources = {
  'en-US': translations['en-US'],
  en: translations['en-US'],
  'de-DE': translations['de-DE'],
  de: translations['de-DE']
};

export default i18n
  .use(initReactI18next)
  .use(LanduageDetector)
  .init({
    resources,
    fallbackLng: 'en-US',
    debug: process.env.NODE_ENV === 'development'
  });
