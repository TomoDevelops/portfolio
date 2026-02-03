import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { projects } from "../data/projects";
import SectionHeader from "./SectionHeader";

export default function FeaturedProjects() {
    const { t } = useTranslation();

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
                <SectionHeader
                    number="03."
                    title={t("projects.title")}
                    subtitle={t("projects.subtitle")}
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        {projects.map((project) => {
                            const tags = t(`projects.items.${project.id}.tags`).split(", ");
                            return (
                                <div
                                    key={project.id}
                                    className="group relative rounded-md overflow-hidden bg-light-navy/55 border border-lightest-navy/70 hover:border-green/40 transition-colors"
                                >
                                    <div className="h-40 w-full relative overflow-hidden bg-navy">
                                        <img
                                            src={project.image}
                                            alt={t(`projects.items.${project.id}.title`)}
                                            className="absolute inset-0 w-full h-full object-top object-cover"
                                        />
                                        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#64ffda_1px,transparent_1px)] bg-[size:16px_16px]" />
                                    </div>

                                    <div className="p-6">
                                        <div className="space-y-3">
                                            <div className="space-y-2">
                                                <h3 className="text-xl sm:text-2xl font-bold text-lightest-slate group-hover:text-green transition-colors">
                                                    {t(`projects.items.${project.id}.title`)}
                                                </h3>
                                            </div>

                                            <p className="text-slate/85 text-sm leading-relaxed line-clamp-2">
                                                {t(`projects.items.${project.id}.desc`)}
                                            </p>

                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2.5 py-1 text-xs font-mono rounded border border-lightest-navy/60 text-slate/80 bg-lightest-navy/10"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-3 pt-4">
                                                {project.demoUrl && (
                                                    <a
                                                        href={project.demoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 rounded border border-lightest-navy/70 bg-light-navy/25 px-3.5 py-2 text-sm font-mono text-slate/90 hover:border-green/50 hover:text-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/40 transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        {t("projects.demo")}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </SectionHeader>
            </div>
        </section>
    );
}
