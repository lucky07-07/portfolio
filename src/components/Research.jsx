import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { papers } from "../data/portfolio";

const STATUS_TONE = {
    "Under review":     "text-warn border-warn/30 bg-warn/[0.07]",
    "Preprint":         "text-cyan border-cyan/30 bg-cyan/[0.07]",
    "Manuscript":       "text-violet border-violet/30 bg-violet/[0.07]",
};

export default function Research() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            <SectionHeader
                index="03"
                tag="research"
                title="Papers & Publications"
                subtitle="Research papers from my projects, each with the paper and the code behind it."
                right={<span className="chip">{papers.length} papers</span>}
            />

            <ol className="relative flex flex-col gap-4 border-l border-line pl-5 sm:pl-7">
                {papers.map((p, i) => (
                    <motion.li
                        key={p.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.07 }}
                        className="relative"
                    >
                        {/* timeline node */}
                        <span className="absolute -left-[26px] top-6 h-3 w-3 rounded-full border-2 border-cyan bg-void shadow-[0_0_10px_#22d3ee] sm:-left-[34px]" />

                        <div className="panel panel-hover p-5 sm:p-6">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${STATUS_TONE[p.status] ?? "text-ink3 border-line"}`}>
                                    {p.status}
                                </span>
                                <span className="font-mono text-[10.5px] text-ink4">[{String(i + 1).padStart(2, "0")}] · {p.year} · {p.area}</span>
                            </div>

                            <h3 className="mt-3 flex items-start gap-2.5 text-[16.5px] font-semibold leading-snug">
                                <FileText size={17} className="mt-0.5 shrink-0 text-cyan" />
                                {p.title}
                            </h3>
                            <p className="mt-1.5 font-mono text-[11.5px] italic text-violet/90">{p.venue}</p>
                            <p className="mt-3 text-[13.5px] leading-relaxed text-ink3">{p.summary}</p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {p.links.map((l) => (
                                    <a
                                        key={l.label}
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-ink2 transition-colors hover:border-cyan/50 hover:text-cyan"
                                    >
                                        {l.label} <ArrowUpRight size={11} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ol>
        </motion.section>
    );
}
