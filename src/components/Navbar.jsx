import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { profile } from "../data/portfolio";
import { useMachine } from "../lib/machine";
import { disclosure } from "../lib/machines";

const DESKTOP = "(min-width: 1024px)";

export default function Navbar({ items, activeSection, onNavigate }) {

    const navRef = useRef(null);
    const [menu, send] = useMachine(disclosure);
    const [scrolled, setScrolled] = useState(false);
    const open = menu === "open";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // While the menu is open: Escape, a tap outside the bar, or widening to the
    // desktop layout all close it.
    useEffect(() => {
        if (!open) return;
        const close = () => send("CLOSE");
        const onKey = (e) => e.key === "Escape" && close();
        const onOutside = (e) => !navRef.current?.contains(e.target) && close();
        const desktop = window.matchMedia(DESKTOP);

        window.addEventListener("keydown", onKey);
        document.addEventListener("pointerdown", onOutside);
        desktop.addEventListener("change", close);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.removeEventListener("pointerdown", onOutside);
            desktop.removeEventListener("change", close);
        };
    }, [open, send]);

    const handleNav = (id) => {
        send("CLOSE");
        onNavigate(id);
    };

    return (
        <nav
            ref={navRef}
            data-surface={scrolled || open ? "solid" : "clear"}
            className={`fixed left-0 right-0 top-0 z-40 border-b transition-colors duration-300 ${
                scrolled || open ? "border-line bg-paper/90 backdrop-blur-xl" : "border-transparent"
            }`}
        >
            <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-5 sm:px-8">
                <button type="button" onClick={() => handleNav("overview")} className="flex min-h-11 items-center gap-2.5">
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
                                type="button"
                                key={id}
                                onClick={() => handleNav(id)}
                                aria-current={on ? "true" : undefined}
                                className={`relative whitespace-nowrap py-2 text-[13.5px] transition-colors ${on ? "text-ink" : "text-ink3 hover:text-ink"}`}
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
                    <a
                        href={profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary min-h-11 touch-manipulation !px-4 !py-2 !text-[13px] lg:min-h-0"
                    >
                        <Download size={13} /> CV
                    </a>
                    <button
                        type="button"
                        onClick={() => send("TOGGLE")}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        data-state={menu}
                        className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-line2 text-ink lg:hidden"
                    >
                        {open ? <X size={17} /> : <Menu size={17} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu: a plain CSS height transition driven by data-state. */}
            <div
                id="mobile-menu"
                data-state={menu}
                inert={!open}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="mx-auto flex max-h-[calc(100dvh-4rem)] max-w-[1160px] flex-col overflow-y-auto px-5 pb-5 sm:px-8">
                        {items.map(({ name, id }, i) => (
                            <button
                                type="button"
                                key={id}
                                onClick={() => handleNav(id)}
                                className="flex touch-manipulation items-baseline gap-4 border-t border-line py-3.5 text-left"
                            >
                                <span className={`font-mono text-[10.5px] ${activeSection === id ? "text-accent" : "text-ink4"}`}>0{i + 1}</span>
                                <span className={`font-display text-[22px] leading-none ${activeSection === id ? "italic text-accent" : "text-ink"}`}>{name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
