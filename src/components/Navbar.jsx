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
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed left-0 right-0 top-0 z-40 border-b transition-colors duration-300 ${
                scrolled || mobileOpen ? "border-line bg-paper/80 backdrop-blur-xl" : "border-transparent"
            }`}
        >
            <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-5 sm:px-8">
                <button onClick={() => handleNav("overview")} className="flex items-baseline gap-2.5">
                    <span className="font-display text-[24px] leading-none text-ink">
                        Anil <span className="italic">Kumar</span>
                    </span>
                    <span className="hidden rounded-full border border-line2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink3 sm:inline">
                        / ml
                    </span>
                </button>

                {/* Desktop links */}
                <div className="hidden items-center gap-5 lg:flex xl:gap-7">
                    {items.map(({ name, id }) => {
                        const on = activeSection === id;
                        return (
                            <button
                                key={id}
                                onClick={() => handleNav(id)}
                                className={`relative py-2 whitespace-nowrap text-[13.5px] transition-colors ${on ? "text-ink" : "text-ink3 hover:text-ink"}`}
                            >
                                {name}
                                {on && (
                                    <motion.span
                                        layoutId="nav-mark"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        className="absolute -bottom-0.5 left-0 right-0 mx-auto h-[1.5px] w-full bg-accent"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2">
                    <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4 !py-2 !text-[13px]">
                        <Download size={13} /> CV
                    </a>
                    <button
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-line2 text-ink lg:hidden"
                    >
                        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden lg:hidden"
                    >
                        <div className="mx-auto flex max-w-[1160px] flex-col px-5 pb-5 sm:px-8">
                            {items.map(({ name, id }, i) => (
                                <button
                                    key={id}
                                    onClick={() => handleNav(id)}
                                    className="flex items-baseline gap-4 border-t border-line py-3.5 text-left"
                                >
                                    <span className={`font-mono text-[10.5px] ${activeSection === id ? "text-accent" : "text-ink4"}`}>0{i + 1}</span>
                                    <span className={`font-display text-[22px] leading-none ${activeSection === id ? "italic text-accent" : "text-ink"}`}>{name}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
