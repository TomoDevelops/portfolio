import { useTranslation } from "react-i18next";
import { Monitor, Server, Wrench } from "lucide-react";
import { stack } from "../data/techStack";
import SectionHeader from "./SectionHeader";

export default function TechStackSection() {
    const { t } = useTranslation();

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
                <SectionHeader
                    number="02."
                    title={t("tech_stack.title")}
                    subtitle={t("tech_stack.subtitle")}
                >
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-md border border-lightest-navy/70 bg-light-navy/55 hover:border-green/40 transition-colors">
                            <h3 className="text-lg sm:text-xl font-bold text-lightest-slate mb-5 border-b border-lightest-navy/70 pb-4 flex items-center gap-2">
                                <Monitor className="w-4 h-4 text-green/80" />
                                {t("tech_stack.frontend")}
                            </h3>
                            <div className="flex flex-wrap gap-2.5">
                                {stack.frontend.map((tech) => (
                                    <span
                                        key={tech.name}
                                        className="px-3 py-1.5 rounded text-sm font-mono border border-lightest-navy/60 text-slate/85 bg-lightest-navy/15"
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-md border border-lightest-navy/70 bg-light-navy/55 hover:border-green/40 transition-colors">
                            <h3 className="text-lg sm:text-xl font-bold text-lightest-slate mb-5 border-b border-lightest-navy/70 pb-4 flex items-center gap-2">
                                <Server className="w-4 h-4 text-green/80" />
                                {t("tech_stack.backend")}
                            </h3>
                            <div className="flex flex-wrap gap-2.5">
                                {stack.backend.map((tech) => (
                                    <span
                                        key={tech.name}
                                        className="px-3 py-1.5 rounded text-sm font-mono border border-lightest-navy/60 text-slate/85 bg-lightest-navy/15"
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-md border border-lightest-navy/70 bg-light-navy/55 hover:border-green/40 transition-colors">
                            <h3 className="text-lg sm:text-xl font-bold text-lightest-slate mb-5 border-b border-lightest-navy/70 pb-4 flex items-center gap-2">
                                <Wrench className="w-4 h-4 text-green/80" />
                                {t("tech_stack.tools")}
                            </h3>
                            <div className="flex flex-wrap gap-2.5">
                                {stack.tools.map((tech) => (
                                    <span
                                        key={tech.name}
                                        className="px-3 py-1.5 rounded text-sm font-mono border border-lightest-navy/60 text-slate/85 bg-lightest-navy/15"
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </SectionHeader>
            </div>
        </section>
    );
}
