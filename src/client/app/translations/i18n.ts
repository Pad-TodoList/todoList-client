import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { Language } from "./enums/languages.ts";
import translationEN from "./i18n/en.json";
import translationFR from "./i18n/fr.json";

const defaultLanguage = Language.FR;

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("pad-todolist-language") || defaultLanguage,

    keySeparator: ".",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
