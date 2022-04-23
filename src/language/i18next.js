import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: {
      translation: require("./languages/en.json"),
    },
    tr: {
      translation: require("./languages/tr.json"),
    },
    fr: {
      translation: require("./languages/fr.json"),
    },
  },
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
