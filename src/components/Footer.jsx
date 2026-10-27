import { profile } from "../data/portfolio";

export default function Footer() {

    const links = [
        { label: "github",   href: profile.github   },
        { label: "linkedin", href: profile.linkedin },
        { label: "resume",   href: profile.resume   },
    ];

    return (
        <footer className="mt-4 border-t border-line pb-3 pt-5">
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                <p className="font-mono text-[11px] text-ink4">
                    © 2026 {profile.name} · <span className="text-ink3">built with React + Tailwind</span>
                </p>
                <div className="flex items-center gap-5">
                    {links.map(({ label, href }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="link-mono">
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
