import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import ru from '../../shared/i18n/ru.json';
import en from '../../shared/i18n/en.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: { translation: { ...en } },
    ru: { translation: { ...ru } },
  },
});

export default i18n;
