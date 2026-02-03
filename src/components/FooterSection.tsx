import { useTranslation } from "react-i18next";
import { Github, Linkedin, Twitter } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ContactForm from "./ContactForm";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function FooterSection() {
    const { t } = useTranslation();
    const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

    const socialLinks = [
        { icon: Github, href: "https://github.com/TomoDevelops", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/tomokiota/", label: "LinkedIn" },
        { icon: Twitter, href: "https://twitter.com/TomoDevelops", label: "Twitter" },
    ];

    return (
        <footer className="py-16 sm:py-20 bg-navy relative">
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
                        number="04."
                        title={t("contact.title")}
                        subtitle={t("contact.subtitle")}
                    >
                        <div className="space-y-8">
                            <ContactForm />
                        </div>
                    </SectionHeader>
                </div>

                <div className="mt-16 sm:mt-20 pt-8 border-t border-lightest-navy/40">
                    <div className="flex items-start gap-3">
                        <div className="w-6 shrink-0" aria-hidden="true" />
                        <div className="flex-1 flex flex-col gap-6 text-xs text-slate font-mono">
                            <div className="flex gap-4">
                                {socialLinks.map((link, index) => {
                                    const IconComponent = link.icon;
                                    return (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.label}
                                            className={`w-10 h-10 rounded-lg border border-lightest-navy/40 bg-light-navy/20 flex items-center justify-center text-slate/60 hover:text-green hover:border-green/40 hover:bg-green/5 transition-all duration-300 ${
                                                isVisible
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-4"
                                            }`}
                                            style={{
                                                transitionDelay: isVisible ? `${600 + index * 80}ms` : "0ms",
                                            }}
                                        >
                                            <IconComponent className="w-5 h-5" aria-hidden="true" />
                                        </a>
                                    );
                                })}
                            </div>
                            <div className="space-y-2 text-slate/60">
                                <p>{t("footer.built_with")}</p>
                                <p>{t("footer.copyright")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
