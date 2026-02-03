import { useTranslation } from "react-i18next";

export default function LocaleSwitcher() {
    const { i18n } = useTranslation();

    const toggleLocale = () => {
        const newLocale = i18n.language === "en" ? "ja" : "en";
        i18n.changeLanguage(newLocale);
        localStorage.setItem("locale", newLocale);
    };

    return (
        <button
            className="fixed top-6 right-6 z-50 px-4 py-2 border border-green text-green font-terminus hover:bg-green/10 transition-colors bg-navy/90 backdrop-blur-sm cursor-pointer"
            aria-label="Change Language"
            onClick={toggleLocale}
        >
            {i18n.language === "en" ? "JP" : "EN"}
        </button>
    );
}
