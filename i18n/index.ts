// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en.json';
import es from './es.json';

const resources = {
  en: { translation: en },
  es: { translation: es }
};

// Obtener el idioma principal, por ejemplo: "es-419" → "es"
const languageCode = Localization.getLocales()[0]?.languageCode?.split('-')[0] || 'es';
console.log(languageCode)

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: languageCode,
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  });

export default i18n;
