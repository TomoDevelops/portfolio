import type { ReactNode } from "react";

interface SectionHeaderProps {
    number: string;
    title: string;
    subtitle?: string;
    children?: ReactNode;
}

export default function SectionHeader({ number, title, subtitle, children }: SectionHeaderProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs sm:text-sm text-slate/70">
                        {number}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-lightest-slate">
                        {title}
                    </h2>
                </div>
                {subtitle && (
                    <p className="mt-2 text-slate/90 text-base sm:text-lg max-w-2xl whitespace-pre-line">
                        {subtitle}
                    </p>
                )}
                {children && (
                    <div className="mt-6 sm:mt-8">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
