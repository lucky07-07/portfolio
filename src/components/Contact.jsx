import { useState } from "react";
import { ArrowUpRight, Mail, Copy, Check, Award } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { GithubMark, LinkedinMark } from "./Icons";
import { profile } from "../data/portfolio";

export default function Contact() {
    const [copied, setCopied] = useState(false);

    const contacts = [
        { label: "Email",    value: profile.email,                          href: `mailto:${profile.email}`, icon: Mail },
        { label: "LinkedIn", value: "in/anil-kumar-29884a17a",              href: profile.linkedin,          icon: LinkedinMark },
        { label: "GitHub",   value: "github.com/lucky07-07",                href: profile.github,            icon: GithubMark },
        { label: "Kaggle",   value: "kaggle.com/anilkumarluck",             href: profile.kaggle,            icon: Award },
    ];

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch { /* clipboard unavailable */ }
    };

    return (
        <div>
            <SectionHeader index="08" tag="contact" title={<>Let&apos;s build something <span className="em">intelligent.</span></>} />

            <div className="card-dark overflow-hidden p-7 sm:p-12">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
                    <div>
                        <p className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulseDot" /> Open to work
                        </p>
                        <p className="mt-6 font-display text-[1.75rem] leading-[1.25] text-fog sm:text-[2.2rem]">
                            Open to <span className="text-paper">AI/ML engineering roles, internships</span> and{" "}
                            <span className="text-paper">research collaborations</span> in computer vision, medical
                            imaging, LLMs and agentic systems.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <button onClick={copyEmail} className="btn-light">
                                {copied ? <Check size={15} /> : <Copy size={15} />}
                                {copied ? "Copied" : "Copy address"}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        {contacts.map(({ label, value, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 border-t border-white/10 py-5 last:border-b"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-paper transition-colors group-hover:border-accent group-hover:bg-accent">
                                    <Icon size={15} />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog/70">{label}</p>
                                    <p className="mt-0.5 truncate text-[15px] text-paper">{value}</p>
                                </div>
                                <ArrowUpRight size={16} className="shrink-0 text-fog transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
