import { motion } from "framer-motion";

export default function Navbar({ activeSection, onNavigate }) {

    const links = [
        { label: "About",     id: "about"     },
        { label: "Skills",    id: "skills"    },
        { label: "Projects",  id: "projects"  },
        { label: "Education", id: "education" },
        { label: "Contact",   id: "contact"   },
    ];

    return (
        <motion.nav
            initial={{ y: -36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-4 py-3.5"
        >
            <div className="max-w-[1800px] mx-auto">
                <div className="
                    futuristic-card
                    px-5 py-3
                    flex items-center justify-between
                ">

                    {/* Logo */}
                    <button
                        onClick={() => onNavigate("overview")}
                        className="flex items-center gap-3 group"
                    >
                        <div className="
                            w-9 h-9 rounded-[14px]
                            bg-white/[0.04] border border-white/[0.07]
                            flex items-center justify-center
                            group-hover:border-white/[0.11]
                            transition-colors duration-200
                        ">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-[#f5f5f5] leading-tight tracking-[-0.01em]">Anil Kumar</p>
                            <p className="text-[11px] text-[#c8c8c8] leading-tight">AI • ML • Data Science</p>
                        </div>
                    </button>

                    {/* Navigation */}
                    <div className="hidden lg:flex items-center gap-7">
                        {links.map(({ label, id }) => {
                            const isActive = activeSection === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => onNavigate(id)}
                                    className={`
                                        text-sm relative group
                                        transition-colors duration-250
                                        ${isActive ? "text-[#f0c674]" : "text-[#c8c8c8] hover:text-[#e8e8e8]"}
                                    `}
                                >
                                    {label}
                                    <span className={`
                                        absolute left-0 -bottom-[3px]
                                        h-[1.5px] rounded-full bg-[#f0c674]/60
                                        transition-all duration-250
                                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                                    `} />
                                </button>
                            );
                        })}
                    </div>

                    {/* Hire Me */}
                    <button
                        onClick={() => onNavigate("contact")}
                        className="
                            bg-[#f0c674] text-[#0f0f10]
                            px-5 py-2 rounded-[16px]
                            font-medium text-sm
                            hover:bg-[#e6b85c]
                            transition-colors duration-200
                        "
                    >
                        Hire Me
                    </button>

                </div>
            </div>
        </motion.nav>
    );
}
