import { useTranslation } from "react-i18next";
import { Gamepad2, Tv, Dribbble } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const cards = [
    {
        icon: Gamepad2,
        color: "text-cyan",
        bgGlow: "rgba(94, 234, 212, 0.15)",
        key: "gaming",
    },
    {
        icon: Tv,
        color: "text-purple",
        bgGlow: "rgba(196, 181, 253, 0.15)",
        key: "anime",
    },
    {
        icon: Dribbble,
        color: "text-green",
        bgGlow: "rgba(100, 255, 218, 0.15)",
        key: "basketball",
    },
];

export default function AboutSection() {
    const { t } = useTranslation();
    const values = t("about.values", { returnObjects: true }) as string[];
    const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });

    return (
        <section className="py-16 sm:py-20 relative">
            {/* Section divider */}
            <div className="section-divider mb-16 sm:mb-20" aria-hidden="true" />

            <div className="max-w-5xl mx-auto px-6 sm:px-8">
                <div
                    ref={sectionRef}
                    className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    <SectionHeader number="01." title={t("about.title")}>
                        <div className="space-y-10">
                            <div className="space-y-4 max-w-3xl">
                                <p className="text-slate text-base sm:text-lg leading-relaxed whitespace-pre-line">
                                    {t("about.description")}
                                </p>
                            </div>

                            <div className="max-w-3xl">
                                <h3 className="text-lg sm:text-xl font-bold text-lightest-slate">
                                    {t("about.values_title")}
                                </h3>
                                <ul className="mt-4 space-y-3">
                                    {values.map((value, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 text-slate group"
                                        >
                                            <span className="text-green font-bold leading-6 transition-transform duration-300 group-hover:translate-x-1">
                                                {"▹"}
                                            </span>
                                            <span className="leading-relaxed">{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <div className="text-xs font-mono uppercase tracking-widest text-slate/60">
                                    Interests
                                </div>
                                <div
                                    ref={cardsRef}
                                    className="grid md:grid-cols-3 gap-5"
                                >
                                    {cards.map((card, index) => {
                                        const IconComponent = card.icon;
                                        return (
                                            <div
                                                key={card.key}
                                                className={`interest-card card-shine card-glow p-5 rounded-lg border border-lightest-navy/40 bg-light-navy/30 hover:border-green/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                                    cardsVisible
                                                        ? "opacity-100 translate-y-0"
                                                        : "opacity-0 translate-y-6"
                                                }`}
                                                style={{
                                                    transitionDelay: cardsVisible ? `${index * 100}ms` : "0ms",
                                                }}
                                            >
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${card.bgGlow}, transparent)`,
                                                    }}
                                                >
                                                    <IconComponent
                                                        className={`w-6 h-6 ${card.color} interest-icon`}
                                                    />
                                                </div>
                                                <h3 className="text-base font-bold text-lightest-slate mb-2">
                                                    {t(`about.${card.key}.title`)}
                                                </h3>
                                                <p className="text-slate/80 text-sm leading-relaxed">
                                                    {t(`about.${card.key}.desc`)}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </SectionHeader>
                </div>
            </div>
        </section>
    );
}
