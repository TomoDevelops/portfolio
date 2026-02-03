import { useState, type FormEvent, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Send, LoaderCircle } from "lucide-react";

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
    const { t } = useTranslation();

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "", // honeypot field
    });

    const [status, setStatus] = useState<FormStatus>("idle");
    const [statusText, setStatusText] = useState("");

    const resetStatus = () => {
        if (status !== "idle") {
            setStatus("idle");
            setStatusText("");
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        resetStatus();
    };

    const submitContactForm = async (e: FormEvent) => {
        e.preventDefault();
        resetStatus();

        const name = form.name.trim();
        const email = form.email.trim();
        const subject = form.subject.trim();
        const message = form.message.trim();
        const website = form.website.trim();

        if (!name || !email || !message) {
            setStatus("error");
            setStatusText(t("contact.form.error_required"));
            return;
        }

        setStatus("sending");

        try {
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message, website }),
            });

            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
                website: "",
            });

            setStatus("sent");
            setStatusText(t("contact.form.success"));
        } catch {
            setStatus("error");
            setStatusText(t("contact.form.error_generic"));
        }
    };

    return (
        <form
            id="contact-form"
            className="grid gap-5 max-w-xl"
            onSubmit={submitContactForm}
        >
            <div className="grid gap-2 sm:grid-cols-2">
                <label className="grid gap-2">
                    <span className="font-mono text-xs tracking-wide text-slate/90">
                        {t("contact.form.name")}
                    </span>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        className="h-12 rounded-md border border-lightest-navy/50 bg-light-navy/30 px-4 font-mono text-sm text-lightest-slate placeholder:text-slate/50 outline-none focus:border-green/60 focus:ring-2 focus:ring-green/20 focus:bg-light-navy/40 transition-all duration-300"
                        placeholder={t("contact.form.name_placeholder")}
                    />
                </label>

                <label className="grid gap-2">
                    <span className="font-mono text-xs tracking-wide text-slate/90">
                        {t("contact.form.email")}
                    </span>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        inputMode="email"
                        className="h-12 rounded-md border border-lightest-navy/50 bg-light-navy/30 px-4 font-mono text-sm text-lightest-slate placeholder:text-slate/50 outline-none focus:border-green/60 focus:ring-2 focus:ring-green/20 focus:bg-light-navy/40 transition-all duration-300"
                        placeholder={t("contact.form.email_placeholder")}
                    />
                </label>
            </div>

            <label className="grid gap-2">
                <span className="font-mono text-xs tracking-wide text-slate/90">
                    {t("contact.form.subject")}
                </span>
                <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    autoComplete="off"
                    className="h-12 rounded-md border border-lightest-navy/50 bg-light-navy/30 px-4 font-mono text-sm text-lightest-slate placeholder:text-slate/50 outline-none focus:border-green/60 focus:ring-2 focus:ring-green/20 focus:bg-light-navy/40 transition-all duration-300"
                    placeholder={t("contact.form.subject_placeholder")}
                />
            </label>

            <label className="grid gap-2">
                <span className="font-mono text-xs tracking-wide text-slate/90">
                    {t("contact.form.message")}
                </span>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="min-h-[10rem] resize-y rounded-md border border-lightest-navy/50 bg-light-navy/30 px-4 py-3 font-mono text-sm text-lightest-slate placeholder:text-slate/50 outline-none focus:border-green/60 focus:ring-2 focus:ring-green/20 focus:bg-light-navy/40 transition-all duration-300"
                    placeholder={t("contact.form.message_placeholder")}
                />
            </label>

            {/* Honeypot field - invisible to humans */}
            <div className="sr-only" aria-hidden="true">
                <label htmlFor="website-field">
                    Website
                    <input
                        id="website-field"
                        type="text"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </label>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="submit"
                    className="btn-primary inline-flex items-center gap-2 rounded-md border border-green/70 bg-green/5 px-7 py-3.5 font-mono text-sm sm:text-base text-green hover:bg-green/10 hover:border-green hover:shadow-[0_0_25px_rgba(100,255,218,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/40 transition-all duration-300 disabled:opacity-60 disabled:hover:bg-green/5 disabled:hover:border-green/70 disabled:hover:shadow-none"
                    disabled={status === "sending"}
                >
                    {status === "sending" ? (
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                    ) : (
                        <Send className="w-4 h-4" />
                    )}
                    {status === "sending"
                        ? t("contact.form.sending")
                        : t("contact.send_message")}
                </button>

                <p
                    className={`font-mono text-xs ${
                        status === "sent"
                            ? "text-green"
                            : status === "error"
                            ? "text-red-300"
                            : "text-slate/80"
                    }`}
                    aria-live="polite"
                >
                    {statusText}
                </p>
            </div>
        </form>
    );
}
