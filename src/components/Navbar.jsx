import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Navbar({ items, activeSection, onNavigate }) {

    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNav = (id) => {
        onNavigate(id);
        setMobileOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed left-0 right-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4"
        >
            <div
                className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-3 py-2 transition-all duration-300 sm:px-4 ${
                    scrolled ? "border border-line bg-void/75 shadow-card backdrop-blur-xl" : "border border-transparent"
                }`}
            >
                <button onClick={() => handleNav("overview")} className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-ember/30 bg-ember/[0.08] font-display text-sm font-bold text-ember">
                        AK
                    </span>
                    <span className="hidden font-mono text-[12px] text-ink2 xl:inline">
                        anil<span className="text-ember">.</span>kumar<span className="text-ink4">/ml</span>
                    </span>
                </button>

                {/* Desktop links: pill with sliding highlight */}
                <div className="hidden items-center gap-1 rounded-full border border-line bg-void/50 p-1 backdrop-blur lg:flex">
                    {items.map(({ name, id }) => {
                        const on = activeSection === id;
                        return (
                            <button
                                key={id}
                                onClick={() => handleNav(id)}
                                className={`relative rounded-full px-3.5 py-1.5 text-[13px] ${on ? "text-void" : "text-ink3 hover:text-ink"}`}
                            >
                                {on && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-ember to-violet"
                                    />
                                )}
                                <span className="relative font-medium">{name}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2">
                    <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost hidden !px-3.5 !py-2 text-[13px] sm:inline-flex">
                        <Download size={14} /> CV
                    </a>
                    <button
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle menu"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-void/60 text-ink2 lg:hidden"
                    >
                        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="panel mx-auto mt-2 flex max-w-6xl flex-col gap-1 p-2 lg:hidden"
                    >
                        {items.map(({ name, id }, i) => (
                            <button
                                key={id}
                                onClick={() => handleNav(id)}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${
                                    activeSection === id ? "bg-ember/[0.08] text-ember" : "text-ink2 hover:bg-white/[0.03]"
                                }`}
                            >
                                <span className="font-mono text-[10px] text-ink4">0{i + 1}</span>
                                {name}
                            </button>
                        ))}
                        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-primary mt-1 justify-center">
                            <Download size={14} /> Download CV
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
