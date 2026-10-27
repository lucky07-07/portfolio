import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, FileText, PlayCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { projects, domains } from "../data/portfolio";

// lucide-react (this version) ships no GitHub brand glyph, so render the mark inline.
export function GithubMark({ size = 12 }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
        </svg>
    );
}

const DOMAIN_TONE = {
    cv:     "text-ember border-ember/30 bg-ember/[0.07]",
    nlp:    "text-violet border-violet/30 bg-violet/[0.07]",
    agents: "text-signal border-signal/30 bg-signal/[0.07]",
    data:   "text-warn border-warn/30 bg-warn/[0.07]",
};

const domainLabel = (id) => domains.find((d) => d.id === id)?.label;

function ProjectLinks({ links, size = 11 }) {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="link-mono" onClick={(e) => e.stopPropagation()}>
                <GithubMark size={size} /> code <ArrowUpRight size={10} />
            </a>
            {links.paper && (
                <a href={links.paper} target="_blank" rel="noopener noreferrer" className="link-mono" onClick={(e) => e.stopPropagation()}>
                    <FileText size={size} /> paper <ArrowUpRight size={10} />
                </a>
            )}
            {links.demo && (
                <a href={links.demo} target="_blank" rel="noopener noreferrer" className="link-mono" onClick={(e) => e.stopPropagation()}>
                    <PlayCircle size={size} /> demo <ArrowUpRight size={10} />
                </a>
            )}
        </div>
    );
}

export default function Projects() {
    const [filter, setFilter] = useState("all");
    const [active, setActive] = useState(null);

    const visible = filter === "all" ? projects : projects.filter((p) => p.domain === filter);

    useEffect(() => {
        if (!active) return;
        const onKey = (e) => e.key === "Escape" && setActive(null);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active]);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            <SectionHeader
                index="02"
                tag="projects"
                title="Selected Work"
                subtitle="Research-grade ML projects, each with a reproducible pipeline and a headline metric on held-out data. Click a card for the full write-up."
            />

            {/* Domain filter */}
            <div className="mb-10 flex flex-wrap gap-2">
                {domains.map((d) => {
                    const count = d.id === "all" ? projects.length : projects.filter((p) => p.domain === d.id).length;
                    const on = filter === d.id;
                    return (
                        <button
                            key={d.id}
                            onClick={() => setFilter(d.id)}
                            className={`rounded-lg border px-4 py-2 font-mono text-[12.5px] ${
                                on
                                    ? "border-ember/50 bg-ember/[0.1] text-ember"
                                    : "border-line text-ink3 hover:border-ink4 hover:text-ink2"
                            }`}
                        >
                            {d.label} <span className="text-ink4">{count}</span>
                        </button>
                    );
                })}
            </div>

            <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {visible.map((p, i) => {
                        // Bento: the lead project in the unfiltered view gets a double-width hero card.
                        const hero = filter === "all" && i === 0;
                        return (
                        <motion.article
                            layout
                            key={p.title}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setActive(p)}
                            className={`panel panel-hover group flex cursor-pointer flex-col overflow-hidden p-7 ${hero ? "md:col-span-2 sm:p-9" : ""}`}
                        >
                            {hero && <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-ember/15 blur-[80px]" />}

                            <div className="flex items-center justify-between gap-3">
                                <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${DOMAIN_TONE[p.domain]}`}>
                                    {domainLabel(p.domain)}
                                </span>
                                <span className="font-mono text-[10px] text-ink4">
                                    {p.featured && <span className="text-warn">★ </span>}checkpoint_{String(projects.indexOf(p) + 1).padStart(2, "0")}.pt
                                </span>
                            </div>

                            <h3 className={`mt-6 font-semibold leading-snug transition-colors group-hover:text-ember ${hero ? "text-2xl sm:text-[1.7rem]" : "text-[19px]"}`}>
                                {p.title}
                            </h3>

                            {/* headline metric */}
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className={`font-display font-bold text-grad ${hero ? "text-4xl sm:text-5xl" : "text-2xl"}`}>{p.metric.value}</span>
                                <span className="font-mono text-[10.5px] text-ink3">{p.metric.label}</span>
                            </div>

                            <p className={`mt-4 leading-[1.7] text-ink3 ${hero ? "max-w-2xl text-[16.5px]" : "text-[15px]"}`}>{p.description}</p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {p.tech.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}
                                {p.tech.length > 4 && <span className="chip text-ink4">+{p.tech.length - 4}</span>}
                            </div>

                            <div className="flex-1 min-h-7" />
                            <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
                                <ProjectLinks links={p.links} />
                                <span className="font-mono text-[11px] text-ink4 transition-colors group-hover:text-ember">
                                    details →
                                </span>
                            </div>
                        </motion.article>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {/* Detail modal */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 p-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActive(null)}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={active.title}
                            initial={{ opacity: 0, y: 16, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 16, scale: 0.97 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="panel max-h-[88vh] w-full max-w-2xl overflow-y-auto"
                        >
                            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-panel/95 px-5 py-3 backdrop-blur">
                                <span className="font-mono text-[11px] text-ink4">
                                    ~/projects/<span className="text-ember">{active.links.github.split("/").pop()}</span>/README.md
                                </span>
                                <button onClick={() => setActive(null)} aria-label="Close" className="text-ink3 hover:text-ember">
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-5 p-5 sm:p-6">
                                <div>
                                    <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${DOMAIN_TONE[active.domain]}`}>
                                        {domainLabel(active.domain)}
                                    </span>
                                    <h3 className="mt-3 text-2xl font-bold leading-tight">{active.title}</h3>
                                    <div className="mt-3 inline-flex items-baseline gap-2 rounded-lg border border-line bg-void/60 px-3 py-2">
                                        <span className="font-display text-xl font-bold text-grad">{active.metric.value}</span>
                                        <span className="font-mono text-[11px] text-ink3">{active.metric.label}</span>
                                    </div>
                                </div>

                                {[
                                    ["problem", active.problemStatement],
                                    ["approach", active.approach],
                                ].map(([k, v]) => (
                                    <div key={k}>
                                        <p className="eyebrow mb-2"># {k}</p>
                                        <p className="text-[14px] leading-relaxed text-ink2">{v}</p>
                                    </div>
                                ))}

                                <div>
                                    <p className="eyebrow mb-2"># results</p>
                                    <ul className="flex flex-col gap-2">
                                        {active.results
                                            .split(/\.\s+/)
                                            .map((l) => l.replace(/\.$/, "").trim())
                                            .filter(Boolean)
                                            .map((l, i) => (
                                                <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-ink2">
                                                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                                                    <span>{l}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className="eyebrow mb-2"># stack</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {active.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                                    </div>
                                </div>

                                <div className="border-t border-line pt-4">
                                    <ProjectLinks links={active.links} size={13} />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
