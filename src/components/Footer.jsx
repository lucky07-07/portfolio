export default function Footer() {

    const links = [
        { label: "GitHub",   href: "https://github.com/lucky07-07",                    external: true },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/anil-kumar-29884a17a/", external: true },
        { label: "Resume",   href: "/resume.pdf",                                       external: true },
    ];

    return (
        <footer className="pt-5 pb-3 border-t border-white/[0.05]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                <p className="text-[11px] text-[#9f9f9f]">
                    © 2026 Anil Kumar
                </p>
                <div className="flex items-center gap-5">
                    {links.map(({ label, href, external }) => (
                        <a
                            key={label}
                            href={href}
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="text-[11px] text-[#9f9f9f] hover:text-[#c8c8c8] transition-colors duration-200"
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
