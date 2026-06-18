import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar({ activeSection, onNavigate }) {

    const [mobileOpen, setMobileOpen] = useState(false);

    const links = [
        { label: "About",     id: "about"     },
        { label: "Skills",    id: "skills"    },
        { label: "Projects",  id: "projects"  },
        { label: "Education", id: "education" },
        { label: "Contact",   id: "contact"   },
    ];

    const handleNav = (id) => {
        onNavigate(id);
        setMobileOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-2.5 sm:py-3.5"
        >
            <div className="max-w-[1800px] mx-auto">
                <div className="
                    futuristic-card
                    px-4 sm:px-5 py-2.5 sm:py-3
                    flex items-center justify-between
                ">

                    {/* Logo */}
                    <button
                        onClick={() => handleNav("overview")}
                        className="flex items-center gap-2.5 sm:gap-3 group"
                    >
                        <div className="
                            w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] sm:rounded-[14px]
                            bg-white/[0.04] border border-white/[0.07]
                            flex items-center justify-center
                            group-hover:border-white/[0.11]
                            transition-colors duration-200
                        ">
                            <span className="text-white font-bold text-xs sm:text-sm">A</span>
                        </div>
                        <div className="text-left">
                            <p className="text-[13px] sm:text-sm font-bold text-[#f5f5f5] leading-tight tracking-[-0.01em]">Anil Kumar</p>
                            <p className="text-[10px] sm:text-[11px] text-[#c8c8c8] leading-tight">AI • ML • Data Science</p>
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-7">
                        {links.map(({ label, id }) => {
                            const isActive = activeSection === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => handleNav(id)}
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

                    <div className="flex items-center gap-2">
                        {/* Hire Me — desktop */}
                        <button
                            onClick={() => handleNav("contact")}
                            className="
                                hidden sm:block
                                bg-[#f0c674] text-[#0f0f10]
                                px-5 py-2 rounded-[16px]
                                font-medium text-sm
                                hover:bg-[#e6b85c]
                                transition-colors duration-200
                            "
                        >
                            Hire Me
                        </button>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen((v) => !v)}
                            className="
                                lg:hidden
                                w-9 h-9 rounded-[12px]
                                bg-white/[0.04] border border-white/[0.07]
                                flex items-center justify-center
                                hover:bg-white/[0.07]
                                transition-colors duration-200
                            "
                        >
                            {mobileOpen ? <X size={16} className="text-[#d1d1d1]" /> : <Menu size={16} className="text-[#d1d1d1]" />}
                        </button>
                    </div>

                </div>

                {/* Mobile dropdown */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden mt-2 futuristic-card p-3 flex flex-col gap-1"
                        >
                            {links.map(({ label, id }) => {
                                const isActive = activeSection === id;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => handleNav(id)}
                                        className={`
                                            w-full text-left px-4 py-2.5 rounded-[14px] text-sm
                                            transition-all duration-200
                                            ${isActive
                                                ? "text-[#f0c674] bg-[#f0c674]/[0.07]"
                                                : "text-[#c8c8c8] hover:text-[#f0c674] hover:bg-white/[0.04]"
                                            }
                                        `}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => handleNav("contact")}
                                className="
                                    sm:hidden mt-1
                                    bg-[#f0c674] text-[#0f0f10]
                                    py-2.5 rounded-[14px]
                                    font-medium text-sm
                                    hover:bg-[#e6b85c]
                                    transition-colors duration-200
                                "
                            >
                                Hire Me
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
