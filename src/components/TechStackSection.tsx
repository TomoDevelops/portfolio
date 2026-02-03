import { useTranslation } from "react-i18next";
import { Monitor, Server, Wrench } from "lucide-react";
import { stack } from "../data/techStack";
import SectionHeader from "./SectionHeader";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function TechStackSection() {
    const { t } = useTranslation();
    const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

    const categories = [
        { key: "frontend", icon: Monitor, data: stack.frontend, label: t("tech_stack.frontend") },
        { key: "backend", icon: Server, data: stack.backend, label: t("tech_stack.backend") },
        { key: "tools", icon: Wrench, data: stack.tools, label: t("tech_stack.tools") },
    ];

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
                    <SectionHeader
                        number="02."
                        title={t("tech_stack.title")}
                        subtitle={t("tech_stack.subtitle")}
                    >
                        <div className="grid md:grid-cols-3 gap-6">
                            {categories.map((category, catIndex) => {
                                const IconComponent = category.icon;
                                return (
                                    <div
                                        key={category.key}
                                        className={`card-shine card-glow p-6 rounded-lg border border-lightest-navy/50 bg-light-navy/40 hover:border-green/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                            isVisible
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-6"
                                        }`}
                                        style={{
                                            transitionDelay: isVisible ? `${200 + catIndex * 100}ms` : "0ms",
                                        }}
                                    >
                                        <h3 className="text-lg sm:text-xl font-bold text-lightest-slate mb-5 border-b border-lightest-navy/50 pb-4 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-lg bg-green/10 flex items-center justify-center">
                                                <IconComponent className="w-4 h-4 text-green" />
                                            </span>
                                            {category.label}
                                        </h3>
                                        <div className="flex flex-wrap gap-2.5">
                                            {category.data.map((tech, techIndex) => (
                                                <span
                                                    key={tech.name}
                                                    className={`tech-tag px-3 py-1.5 rounded-md text-sm font-mono border border-lightest-navy/50 text-slate/90 bg-lightest-navy/20 cursor-default ${
                                                        isVisible
                                                            ? "opacity-100 translate-y-0"
                                                            : "opacity-0 translate-y-2"
                                                    }`}
                                                    style={{
                                                        transitionDelay: isVisible
                                                            ? `${300 + catIndex * 100 + techIndex * 30}ms`
                                                            : "0ms",
                                                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                                    }}
                                                >
                                                    {tech.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </SectionHeader>
                </div>
            </div>
        </section>
    );
}
