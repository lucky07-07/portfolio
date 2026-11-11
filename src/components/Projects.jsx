import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, FileText, PlayCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ProjectGlyph from "./ProjectGlyph";
import { GithubMark } from "./Icons";
import { projects, categories, contributions } from "../data/portfolio";
import { useMachine } from "../lib/machine";
import { dialog } from "../lib/machines";

const CATEGORY_DOT = {
    dl:         "bg-accent",
    aiml:       "bg-moss",
    data:       "bg-ochre",
    blockchain: "bg-ink",
    research:   "bg-indigo",
};

const categoryLabel = (id) => categories.find((c) => c.id === id)?.label;
const numberOf = (p) => String(projects.indexOf(p) + 1).padStart(2, "0");

// Every category a project belongs to, each with its colour dot.
function CategoryTags({ ids }) {
    return (
        <span className="inline-flex flex-wrap items-center gap-x-3.5 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.12em]">
            {ids.map((id) => (
                <span key={id} className="inline-flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ring-1 ring-white/30 ${CATEGORY_DOT[id]}`} />
                    {categoryLabel(id)}
                </span>
            ))}
        </span>
    );
}

// Three numbers that carry the result, set as a ruled strip.
function Highlights({ items, dark = false }) {
    return (
        <dl className={`grid grid-cols-3 overflow-hidden rounded-2xl border ${dark ? "border-white/10 bg-white/10" : "border-line bg-line"}`} style={{ gap: 1 }}>
            {items.map((h) => (
                <div key={h.label} className={`px-4 py-4 ${dark ? "bg-char" : "bg-paper"}`}>
                    <dd className={`font-display text-[1.6rem] leading-none sm:text-[1.9rem] ${dark ? "text-paper" : "text-ink"}`}>{h.value}</dd>
                    <dt className={`mt-2 font-mono text-[10px] leading-snug ${dark ? "text-fog" : "text-ink3"}`}>{h.label}</dt>
                </div>
            ))}
        </dl>
    );
}

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

export default function Projects({ onNavigate }) {
    const [filter, setFilter] = useState("all");
    const [modal, send, { item }] = useMachine(dialog);
    const active = modal === "open" ? item : null;
    const opener = useRef(null);      // the card that opened the dialog
    const closeButton = useRef(null);

    const open = (project, card) => {
        opener.current = card;
        send({ type: "OPEN", item: project });
    };
    const close = () => send("CLOSE");

    const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));

    useEffect(() => {
        if (!active) return;
        // While open: Escape closes, the page behind stops scrolling, and focus
        // moves into the dialog, then back to the card that opened it.
        const onKey = (e) => e.key === "Escape" && send("CLOSE");
        const card = opener.current;
        window.addEventListener("keydown", onKey);
        document.body.classList.add("overflow-hidden");
        closeButton.current?.focus({ preventScroll: true });
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.classList.remove("overflow-hidden");
            card?.focus({ preventScroll: true });
        };
    }, [active, send]);

    return (
        <div>
            <SectionHeader
                index="02"
                tag="projects"
                title={<>Selected <span className="em">work.</span></>}
                subtitle="Research-grade ML projects from my GitHub, each with a reproducible pipeline and a headline metric on held-out data. Click a card for the full write-up."
            />

            {/* Domain filter */}
            <div className="mb-9 flex flex-wrap gap-2">
                {categories.map((d) => {
                    const count = d.id === "all" ? projects.length : projects.filter((p) => p.categories.includes(d.id)).length;
                    const on = filter === d.id;
                    return (
                        <button
                            key={d.id}
                            onClick={() => setFilter(d.id)}
                            aria-pressed={on}
                            className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
                                on
                                    ? "border-ink bg-ink text-paper"
                                    : "border-line2 bg-raised/60 text-ink2 hover:border-ink hover:text-ink"
                            }`}
                        >
                            {d.label} <span className={`ml-1 font-mono text-[11px] ${on ? "text-fog" : "text-ink4"}`}>{count}</span>
                        </button>
                    );
                })}
                {/* contributions to other people's projects live in their own section */}
                <button
                    onClick={() => onNavigate("opensource")}
                    className="rounded-full border border-dashed border-line2 px-4 py-2 text-[13px] text-ink2 transition-colors hover:border-ink hover:text-ink"
                >
                    Open Source <span className="ml-1 font-mono text-[11px] text-ink4">{contributions.length} ↓</span>
                </button>
            </div>

            <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {visible.map((p, i) => {
                        // Bento: the lead project in the unfiltered view gets a double-width charcoal card.
                        const hero = filter === "all" && i === 0;
                        const seed = projects.indexOf(p) + 1;
                        return (
                        <motion.article
                            layout
                            key={p.title}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => open(p, e.currentTarget)}
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(p, e.currentTarget); } }}
                            tabIndex={0}
                            role="button"
                            aria-label={`${p.title}: open details`}
                            className={`${hero ? "card-dark md:col-span-2" : "card"} card-hover group flex cursor-pointer flex-col overflow-hidden`}
                        >
                            {hero ? (
                                <div className="grid flex-1 gap-6 p-7 sm:grid-cols-[1.15fr_1fr] sm:p-9">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-4 text-fog">
                                            <CategoryTags ids={p.categories} />
                                            <span className="font-mono text-[10.5px] text-fog/70">★ featured · {numberOf(p)}</span>
                                        </div>
                                        <h3 className="mt-6 text-[2.1rem] leading-[1.05] sm:text-[2.6rem]">{p.title}</h3>
                                        <p className="mt-4 max-w-xl text-[15.5px] leading-[1.7] text-fog">{p.description}</p>
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {p.tech.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}
                                            {p.tech.length > 4 && <span className="chip opacity-60">+{p.tech.length - 4}</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                                        <ProjectGlyph kind={p.glyph} seed={seed} className="h-40 w-full text-paper" />
                                        <div>
                                            <p className="font-display text-[4rem] leading-none text-paper sm:text-[4.8rem]">{p.metric.value}</p>
                                            <p className="mt-2 font-mono text-[11px] text-fog">{p.metric.label}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="relative m-2.5 mb-0 rounded-[14px] border border-line bg-soft">
                                        <ProjectGlyph kind={p.glyph} seed={seed} className="h-32 w-full text-ink transition-transform duration-500 group-hover:scale-[1.04]" />
                                        <span className="absolute left-3.5 top-3 font-mono text-[10.5px] text-ink4">
                                            {p.featured && <span className="text-accent">★ </span>}{numberOf(p)}
                                        </span>
                                    </div>
                                    <div className="flex flex-1 flex-col p-6 pt-5">
                                        <div className="text-ink3"><CategoryTags ids={p.categories} /></div>
                                        <h3 className="mt-3 text-[1.65rem] leading-[1.12] transition-colors group-hover:text-accent">{p.title}</h3>
                                        <div className="mt-4 flex items-baseline gap-2.5">
                                            <span className="font-display text-[2.3rem] leading-none text-ink">{p.metric.value}</span>
                                            <span className="font-mono text-[10.5px] leading-snug text-ink3">{p.metric.label}</span>
                                        </div>
                                        <p className="mt-4 text-[14.5px] leading-[1.7] text-ink3">{p.description}</p>
                                        <div className="mt-5 flex flex-wrap gap-1.5">
                                            {p.tech.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}
                                            {p.tech.length > 4 && <span className="chip text-ink4">+{p.tech.length - 4}</span>}
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className={`mt-auto flex items-center justify-between gap-3 border-t px-6 py-4 ${hero ? "border-white/10 sm:px-9" : "border-line"}`}>
                                <ProjectLinks links={p.links} />
                                <span className={`inline-flex items-center gap-1 font-mono text-[11px] transition-colors ${hero ? "text-fog group-hover:text-paper" : "text-ink4 group-hover:text-accent"}`}>
                                    details <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </div>
                        </motion.article>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {/* Detail modal, portalled so the section's reveal filter cannot trap it */}
            {createPortal(
                <AnimatePresence>
                    {active && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={close}
                        >
                            <motion.div
                                role="dialog"
                                data-state={modal}
                                aria-modal="true"
                                aria-label={active.title}
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                                transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
                                onClick={(e) => e.stopPropagation()}
                                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-[22px] border border-line bg-raised text-ink2 shadow-lift sm:rounded-[22px]"
                            >
                                <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-raised/95 px-6 py-3.5 backdrop-blur">
                                    <span className="truncate font-mono text-[11px] text-ink4">
                                        ~/projects/<span className="text-accent">{active.links.github.split("/").pop()}</span>/README.md
                                    </span>
                                    <button type="button" ref={closeButton} onClick={close} aria-label="Close" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line2 text-ink hover:border-ink">
                                        <X size={14} />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-7 p-6 sm:p-9">
                                    <div>
                                        <div className="text-ink3"><CategoryTags ids={active.categories} /></div>
                                        <h3 className="mt-3 text-[2.2rem] leading-[1.05] sm:text-[2.6rem]">{active.title}</h3>
                                        <div className="mt-5 flex items-center gap-5 rounded-2xl border border-line bg-soft p-4">
                                            <ProjectGlyph kind={active.glyph} seed={projects.indexOf(active) + 1} className="hidden h-20 w-40 shrink-0 text-ink sm:block" />
                                            <div>
                                                <p className="font-display text-[2.8rem] leading-none text-ink">{active.metric.value}</p>
                                                <p className="mt-1.5 font-mono text-[11px] text-ink3">{active.metric.label}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="eyebrow mb-2.5 !text-accent">Technical highlights</p>
                                        <Highlights items={active.highlights} />
                                    </div>

                                    {[
                                        ["Problem", active.problemStatement],
                                        ["Approach", active.approach],
                                    ].map(([k, v]) => (
                                        <div key={k}>
                                            <p className="eyebrow mb-2.5 !text-accent">{k}</p>
                                            <p className="text-[15px] leading-[1.75] text-ink2">{v}</p>
                                        </div>
                                    ))}

                                    <div>
                                        <p className="eyebrow mb-2.5 !text-accent">Results</p>
                                        <ul className="flex flex-col">
                                            {active.results
                                                .split(/\.\s+/)
                                                .map((l) => l.replace(/\.$/, "").trim())
                                                .filter(Boolean)
                                                .map((l, i) => (
                                                    <li key={i} className="flex gap-4 border-t border-line py-3 text-[15px] leading-[1.65] text-ink2">
                                                        <span className="mt-0.5 font-mono text-[10.5px] text-ink4">0{i + 1}</span>
                                                        <span>{l}</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <p className="eyebrow mb-2.5 !text-accent">Stack</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {active.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                                        </div>
                                    </div>

                                    <div className="border-t border-line pt-5">
                                        <ProjectLinks links={active.links} size={13} />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}
