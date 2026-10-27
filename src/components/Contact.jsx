import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Copy, Check } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { GithubMark } from "./Projects";
import { profile } from "../data/portfolio";

// lucide-react (this version) ships no LinkedIn brand glyph either.
function LinkedinMark({ size = 16 }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
    );
}

export default function Contact() {
    const [copied, setCopied] = useState(false);

    const contacts = [
        { label: "Email",    value: profile.email,                          href: `mailto:${profile.email}`, icon: Mail },
        { label: "LinkedIn", value: "in/anil-kumar-29884a17a",              href: profile.linkedin,          icon: LinkedinMark },
        { label: "GitHub",   value: "github.com/lucky07-07",                href: profile.github,            icon: GithubMark },
    ];

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch { /* clipboard unavailable */ }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            <SectionHeader index="06" tag="contact" title="Let's build something intelligent." />

            <div className="panel overflow-hidden p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan/15 blur-[90px]" />
                <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                    <div>
                        <p className="text-[15px] leading-relaxed text-ink2">
                            Open to <span className="text-ink">AI/ML engineering roles, internships</span> and{" "}
                            <span className="text-ink">research collaborations</span> in computer vision, medical
                            imaging, LLMs and agentic systems.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href={`mailto:${profile.email}`} className="btn-primary"><Mail size={15} /> Send an email</a>
                            <button onClick={copyEmail} className="btn-ghost">
                                {copied ? <Check size={15} className="text-signal" /> : <Copy size={15} />}
                                {copied ? "Copied" : "Copy address"}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {contacts.map(({ label, value, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 rounded-xl border border-line bg-void/50 px-4 py-3 transition-colors hover:border-cyan/40"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-cyan">
                                    <Icon size={16} />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink4">{label}</p>
                                    <p className="truncate text-sm text-ink">{value}</p>
                                </div>
                                <ArrowUpRight size={15} className="text-ink4 transition-colors group-hover:text-cyan" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
