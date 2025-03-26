import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationRU from '../../public/locales/ru/translation.json';
import translationKZ from '../../public/locales/kz/translation.json'

// the translations
const resources = {
  kz: {
    translation: translationKZ
  },
  ru: {
    translation: translationRU
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "kz",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;