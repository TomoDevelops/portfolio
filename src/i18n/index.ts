import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import ja from "../locales/ja.json";

const storedLocale = typeof window !== "undefined"
    ? localStorage.getItem("locale")
    : null;

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        ja: { translation: ja },
    },
    lng: storedLocale || "ja",
    fallbackLng: "ja",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
