import { useTranslation } from "react-i18next";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import SectionHeader from "./SectionHeader";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function FeaturedProjects() {
    const { t } = useTranslation();
    const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

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
                        number="03."
                        title={t("projects.title")}
                        subtitle={t("projects.subtitle")}
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            {projects.map((project, index) => {
                                const tags = t(`projects.items.${project.id}.tags`).split(", ");
                                return (
                                    <div
                                        key={project.id}
                                        className={`project-card group relative rounded-lg overflow-hidden bg-light-navy/40 border border-lightest-navy/50 hover:border-green/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_0_40px_rgba(100,255,218,0.08)] ${
                                            isVisible
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-8"
                                        }`}
                                        style={{
                                            transitionDelay: isVisible ? `${200 + index * 100}ms` : "0ms",
                                        }}
                                    >
                                        {/* Image container with overlay effects */}
                                        <div className="project-image-container h-44 w-full relative bg-navy">
                                            <img
                                                src={project.image}
                                                alt={t(`projects.items.${project.id}.title`)}
                                                loading="lazy"
                                                decoding="async"
                                                className="absolute inset-0 w-full h-full object-top object-cover"
                                            />
                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-light-navy/90 via-light-navy/20 to-transparent" />
                                            {/* Dot pattern overlay */}
                                            <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#64ffda_1px,transparent_1px)] bg-[size:20px_20px] group-hover:opacity-[0.1] transition-opacity duration-500" />
                                            {/* Hover glow */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-green/0 to-green/0 group-hover:from-green/5 group-hover:to-transparent transition-all duration-500" />
                                        </div>

                                        <div className="p-6 relative">
                                            {/* Project number badge */}
                                            <div className="absolute -top-4 right-6 w-8 h-8 rounded-full bg-green/10 border border-green/30 flex items-center justify-center">
                                                <span className="text-green text-xs font-mono font-bold">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="space-y-2">
                                                    <h3 className="text-xl sm:text-2xl font-bold text-lightest-slate group-hover:text-green transition-colors duration-300 flex items-center gap-2">
                                                        {t(`projects.items.${project.id}.title`)}
                                                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                    </h3>
                                                </div>

                                                <p className="text-slate/85 text-sm leading-relaxed line-clamp-2">
                                                    {t(`projects.items.${project.id}.desc`)}
                                                </p>

                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    {tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2.5 py-1 text-xs font-mono rounded-md border border-lightest-navy/40 text-slate/80 bg-lightest-navy/15 group-hover:border-green/20 group-hover:text-slate/90 transition-all duration-300"
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
                                                            className="inline-flex items-center gap-2 rounded-md border border-lightest-navy/50 bg-light-navy/30 px-4 py-2.5 text-sm font-mono text-slate/90 hover:border-green/50 hover:text-green hover:bg-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/40 transition-all duration-300"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                            {t("projects.demo")}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card shine effect on hover */}
                                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: "linear-gradient(105deg, transparent 40%, rgba(100, 255, 218, 0.03) 45%, rgba(100, 255, 218, 0.05) 50%, rgba(100, 255, 218, 0.03) 55%, transparent 60%)",
                                                }}
                                            />
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
