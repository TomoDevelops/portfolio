import { useState, useEffect } from "react";
import "../i18n";
import LocaleSwitcher from "./LocaleSwitcher";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import TechStackSection from "./TechStackSection";
import FeaturedProjects from "./FeaturedProjects";
import FooterSection from "./FooterSection";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const minVisibleMs = 900;
        const maxVisibleMs = 2500;
        let finished = false;
        let minElapsed = false;
        let loadFinished = false;

        const hide = () => {
            if (finished) return;
            finished = true;
            setIsLoading(false);
        };

        const tryHide = () => {
            if (minElapsed && loadFinished) {
                hide();
            }
        };

        const onLoad = () => {
            loadFinished = true;
            tryHide();
        };

        if (document.readyState === "complete") {
            loadFinished = true;
        } else {
            window.addEventListener("load", onLoad, { once: true });
        }

        const minTimer = window.setTimeout(() => {
            minElapsed = true;
            tryHide();
        }, minVisibleMs);

        const maxTimer = window.setTimeout(hide, maxVisibleMs);

        return () => {
            window.removeEventListener("load", onLoad);
            window.clearTimeout(minTimer);
            window.clearTimeout(maxTimer);
        };
    }, []);

    return (
        <div
            className={`min-h-screen ${isLoading ? "overflow-hidden" : ""}`}
            aria-busy={isLoading ? "true" : "false"}
        >
            {/* Subtle noise texture overlay for depth */}
            <div className="noise-overlay" aria-hidden="true" />

            {isLoading && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-navy transition-opacity duration-300"
                    role="status"
                    aria-live="polite"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(100,255,218,0.18),_transparent_55%)]" />
                    <div className="relative flex flex-col items-center gap-6">
                        <div className="text-[10px] uppercase tracking-[0.5em] text-slate/70">
                            Loading
                        </div>
                        <div className="loader-bars" aria-hidden="true">
                            <span className="loader-bar loader-bar-1" />
                            <span className="loader-bar loader-bar-2" />
                            <span className="loader-bar loader-bar-3" />
                            <span className="loader-bar loader-bar-4" />
                        </div>
                        <div className="text-xs text-slate/60 font-mono">
                            Initializing
                        </div>
                    </div>
                </div>
            )}
            <LocaleSwitcher />
            <HeroSection />
            <AboutSection />
            <TechStackSection />
            <FeaturedProjects />
            <FooterSection />
        </div>
    );
}
