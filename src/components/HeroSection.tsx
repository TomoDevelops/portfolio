import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    const titleSuffix = t("hero.title_suffix");

    useEffect(() => {
        // Trigger entrance animation after mount
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
            <div className="absolute inset-0 hero-grid" aria-hidden="true" />

            {/* Floating orbs */}
            <div
                className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(100, 255, 218, 0.3), transparent 70%)" }}
                aria-hidden="true"
            />
            <div
                className="absolute bottom-1/3 left-1/6 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(196, 181, 253, 0.3), transparent 70%)" }}
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto px-6 sm:px-8 min-h-screen flex flex-col justify-center pt-16 pb-16 sm:pt-24 sm:pb-16 relative z-10">
                <div className="flex items-start gap-3">
                    <div className="w-6 shrink-0" aria-hidden="true" />
                    <div className="relative z-10 max-w-3xl flex-1 space-y-10">
                        <div className="space-y-6">
                            <div
                                className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            >
                                <span className="inline-block font-mono text-green text-sm tracking-wider mb-4 opacity-80">
                                    {">"} Hello, I'm
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-none">
                                <span
                                    className={`text-lightest-slate block hero-title-glow transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}
                                >
                                    {t("hero.title_prefix")}
                                </span>
                                {titleSuffix && (
                                    <span
                                        className={`text-slate block mt-3 transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                        }`}
                                    >
                                        {titleSuffix}
                                        <span className="typing-cursor" aria-hidden="true" />
                                    </span>
                                )}
                            </h1>

                            <p
                                className={`text-lg sm:text-xl text-slate leading-relaxed whitespace-pre-line max-w-2xl transition-all duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            >
                                {t("hero.subtitle")}
                            </p>
                        </div>

                        <p
                            className={`text-slate/80 font-mono text-xs sm:text-sm transition-all duration-700 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                        >
                            {t("hero.intro")}
                        </p>

                        <div
                            className={`pt-2 transition-all duration-700 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                        >
                            <a
                                href="#contact-form"
                                className="btn-primary inline-flex items-center justify-center rounded border border-green/70 bg-green/5 px-7 py-3.5 font-mono text-sm sm:text-base text-green hover:bg-green/10 hover:border-green hover:shadow-[0_0_30px_rgba(100,255,218,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/40 transition-all duration-300"
                            >
                                {t("hero.contact_me")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate/70 transition-all duration-700 delay-700 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
                <div className="scroll-indicator">
                    <div className="w-6 h-10 rounded-full border border-lightest-navy/70 flex items-start justify-center pt-2">
                        <div className="w-1 h-2.5 rounded-full bg-green/60 animate-pulse" />
                    </div>
                </div>
                <ChevronDown className="w-4 h-4 text-green/50" />
            </div>
        </section>
    );
}
