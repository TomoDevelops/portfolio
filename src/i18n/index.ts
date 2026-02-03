import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import ja from "../locales/ja.json";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        ja: { translation: ja },
    },
    lng: "ja",
    fallbackLng: "ja",
    interpolation: {
        escapeValue: false,
    },
});

if (typeof window !== "undefined") {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale && storedLocale !== i18n.language) {
        i18n.changeLanguage(storedLocale);
    }
}

export default i18n;
