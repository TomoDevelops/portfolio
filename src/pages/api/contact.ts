import type { APIRoute } from "astro";
import nodemailer, { type Transporter } from "nodemailer";

type ContactPayload = {
    name?: unknown;
    email?: unknown;
    subject?: unknown;
    message?: unknown;
    website?: unknown; // honeypot field
};

const rateLimitState = new Map<string, { count: number; resetAt: number }>();
let transporter: Transporter | undefined;
let transporterKey: string | undefined;

function getLimiterKey(ip: string | null) {
    return ip && ip.trim() ? ip.trim() : "unknown";
}

function enforceRateLimit(key: string): { limited: boolean } {
    const now = Date.now();
    const windowMs = 10 * 60 * 1000;
    const maxRequests = 5;

    const current = rateLimitState.get(key);
    if (!current || current.resetAt <= now) {
        rateLimitState.set(key, { count: 1, resetAt: now + windowMs });
        return { limited: false };
    }

    if (current.count >= maxRequests) {
        return { limited: true };
    }

    current.count += 1;
    return { limited: false };
}

function toTrimmedString(value: unknown, maxLen: number) {
    if (typeof value !== "string") return "";
    const trimmed = value.trim();
    return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

function isReasonableEmail(value: string) {
    if (!value) return false;
    if (value.length > 200) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
    const ip = clientAddress || request.headers.get("x-forwarded-for");
    const { limited } = enforceRateLimit(getLimiterKey(ip));

    if (limited) {
        return new Response(
            JSON.stringify({ error: "Too Many Requests" }),
            { status: 429, headers: { "Content-Type": "application/json" } }
        );
    }

    let body: ContactPayload;
    try {
        body = await request.json();
    } catch {
        return new Response(
            JSON.stringify({ error: "Invalid JSON" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    const name = toTrimmedString(body?.name, 100);
    const email = toTrimmedString(body?.email, 200);
    const subject = toTrimmedString(body?.subject, 200);
    const message = toTrimmedString(body?.message, 5000);
    const website = toTrimmedString(body?.website, 100); // honeypot field

    if (!name || !isReasonableEmail(email) || !message) {
        return new Response(
            JSON.stringify({ error: "Invalid input" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    // Honeypot check - silently reject if the hidden field is filled
    if (website) {
        // Return success response but don't actually send the email
        return new Response(
            JSON.stringify({ ok: true, delivered: false }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }

    const host = import.meta.env.SMTP_HOST?.trim() || "";
    const port = parseInt(import.meta.env.SMTP_PORT || "587", 10);
    const secure = import.meta.env.SMTP_SECURE === "true";
    const user = import.meta.env.SMTP_USER?.trim() || "";
    const pass = import.meta.env.SMTP_PASS || "";
    const to = import.meta.env.SMTP_TO?.trim() || "";
    const from = import.meta.env.SMTP_FROM?.trim() || user || to;

    const emailConfigured = Boolean(host && to && from);
    if (!emailConfigured && import.meta.env.PROD) {
        return new Response(
            JSON.stringify({ error: "Email is not configured" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    const nextTransporterKey = emailConfigured
        ? `smtp:${host}:${port}:${secure}:${user}`
        : "dev:json";

    if (!transporter || transporterKey !== nextTransporterKey) {
        transporter = emailConfigured
            ? nodemailer.createTransport({
                  host,
                  port,
                  secure,
                  auth: user && pass ? { user, pass } : undefined,
              })
            : nodemailer.createTransport({ jsonTransport: true });
        transporterKey = nextTransporterKey;
    }

    const cleanSubject = subject ? subject : "New message";
    const text = [
        "New contact form message",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        subject ? `Subject: ${subject}` : "",
        "",
        message,
    ]
        .filter(Boolean)
        .join("\n");

    try {
        await transporter.sendMail({
            from: from || "local@example.invalid",
            to: to || "local@example.invalid",
            replyTo: email,
            subject: `[Portfolio] ${cleanSubject}`,
            text,
        });

        return new Response(
            JSON.stringify({ ok: true, delivered: emailConfigured }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Email send error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to send email" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
