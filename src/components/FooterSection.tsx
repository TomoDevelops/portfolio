import { useTranslation } from "react-i18next";
import { Github, Linkedin, Twitter } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ContactForm from "./ContactForm";

export default function FooterSection() {
    const { t } = useTranslation();

    return (
        <footer className="py-16 sm:py-20 bg-navy">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
                <SectionHeader
                    number="04."
                    title={t("contact.title")}
                    subtitle={t("contact.subtitle")}
                >
                    <div className="space-y-8">
                        <ContactForm />
                    </div>
                </SectionHeader>

                <div className="mt-16 sm:mt-20 pt-8 border-t border-lightest-navy/60">
                    <div className="flex items-start gap-3">
                        <div className="w-6 shrink-0" aria-hidden="true" />
                        <div className="flex-1 flex flex-col gap-4 text-xs text-slate font-mono">
                            <div className="flex gap-5">
                                <a
                                    href="https://github.com/TomoDevelops"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate/70 hover:text-green transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/tomokiota/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate/70 hover:text-green transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://twitter.com/TomoDevelops"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate/70 hover:text-green transition-colors"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                            <p>{t("footer.built_with")}</p>
                            <p>{t("footer.copyright")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
