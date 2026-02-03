import { useTranslation } from "react-i18next";
import { Gamepad2, Tv, Dribbble } from "lucide-react";
import SectionHeader from "./SectionHeader";

const cards = [
    {
        icon: Gamepad2,
        color: "text-slate/80",
        bg: "bg-lightest-navy/18",
        key: "gaming",
    },
    {
        icon: Tv,
        color: "text-slate/80",
        bg: "bg-lightest-navy/18",
        key: "anime",
    },
    {
        icon: Dribbble,
        color: "text-slate/80",
        bg: "bg-lightest-navy/18",
        key: "basketball",
    },
];

export default function AboutSection() {
    const { t } = useTranslation();
    const values = t("about.values", { returnObjects: true }) as string[];

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
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
                                        className="flex items-start gap-2 text-slate"
                                    >
                                        <span className="text-green/80 font-bold leading-6">
                                            ▹
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
                            <div className="grid md:grid-cols-3 gap-5">
                                {cards.map((card) => {
                                    const IconComponent = card.icon;
                                    return (
                                        <div
                                            key={card.key}
                                            className="p-4 rounded-md border border-lightest-navy/35 bg-light-navy/20"
                                        >
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 grayscale opacity-60 ${card.bg}`}
                                            >
                                                <IconComponent
                                                    className={`w-5 h-5 ${card.color}`}
                                                />
                                            </div>
                                            <h3 className="text-base font-bold text-lightest-slate">
                                                {t(`about.${card.key}.title`)}
                                            </h3>
                                            <p className="mt-2 text-slate/85 text-sm leading-relaxed">
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
        </section>
    );
}
