import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
    const { t } = useTranslation();

    const titleSuffix = t("hero.title_suffix");

    return (
        <section className="relative min-h-screen overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 sm:px-8 min-h-screen flex flex-col justify-center pt-16 pb-16 sm:pt-24 sm:pb-16">
                <div className="flex items-start gap-3">
                    <div className="w-6 shrink-0" aria-hidden="true" />
                    <div className="relative z-10 max-w-3xl flex-1 space-y-10">
                        <div className="space-y-6">
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-none">
                                <span className="text-lightest-slate block">
                                    {t("hero.title_prefix")}
                                </span>
                                {titleSuffix && (
                                    <span className="text-slate block mt-3">
                                        {titleSuffix}
                                    </span>
                                )}
                            </h1>

                            <p className="text-lg sm:text-xl text-slate leading-relaxed whitespace-pre-line">
                                {t("hero.subtitle")}
                            </p>
                        </div>

                        <p className="text-slate/60 font-mono text-xs sm:text-sm">
                            {t("hero.intro")}
                        </p>

                        <div className="pt-2">
                            <a
                                href="#contact-form"
                                className="inline-flex items-center justify-center rounded border border-green/70 bg-green/5 px-7 py-3.5 font-mono text-sm sm:text-base text-green hover:bg-green/10 hover:border-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/40 transition-colors"
                            >
                                {t("hero.contact_me")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate/50">
                <div className="w-6 h-10 rounded-full border border-lightest-navy/70 flex items-start justify-center pt-2">
                    <div className="w-1 h-1.5 rounded-full bg-slate/60" />
                </div>
                <ChevronDown className="w-4 h-4" />
            </div>
        </section>
    );
}
