import { ArrowUpRight, FileText } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { papers } from "../data/portfolio";

const STATUS_DOT = {
    "Published":    "bg-moss",
    "Under review": "bg-ochre",
    "Preprint":     "bg-accent",
    "Manuscript":   "bg-indigo",
};

export default function Research() {
    return (
        <div>
            <SectionHeader
                index="05"
                tag="research"
                title={<>Papers <span className="em">&amp; publications.</span></>}
                subtitle="Peer-reviewed and in-review work from my research projects."
                right={<span className="chip">{papers.length} papers</span>}
            />

            {/* an index of papers, set like a journal's table of contents */}
            <ol className="border-b border-line2">
                {papers.map((p, i) => (
                    <li
                        key={p.title}
                        className="group grid gap-x-10 gap-y-4 border-t border-line2 py-9 transition-colors hover:bg-raised/70 sm:px-4 lg:grid-cols-[72px_1fr_220px] lg:py-11"
                    >
                        <span className="font-display text-[2.6rem] italic leading-none text-ink4 transition-colors group-hover:text-accent">
                            {String(i + 1).padStart(2, "0")}
                        </span>

                        <div>
                            <h3 className="max-w-3xl text-[1.6rem] leading-[1.15] sm:text-[1.95rem]">{p.title}</h3>
                            <p className="mt-3 font-display text-[1.15rem] italic text-ink3">{p.venue}</p>
                            <p className="mt-4 max-w-2xl text-[15.5px] leading-[1.7] text-ink2">{p.summary}</p>

                            {p.links.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {p.links.map((l) => (
                                        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="pill-link">
                                            {l.label === "Code" ? null : <FileText size={12} />}
                                            {l.label} <ArrowUpRight size={12} />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <dl className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11.5px] lg:flex-col lg:items-start">
                            <div>
                                <dt className="eyebrow !text-[10px] !text-ink4">Status</dt>
                                <dd className="mt-1 inline-flex items-center gap-2 text-ink">
                                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[p.status] ?? "bg-ink4"}`} />
                                    {p.status}
                                </dd>
                            </div>
                            <div>
                                <dt className="eyebrow !text-[10px] !text-ink4">Year</dt>
                                <dd className="mt-1 text-ink">{p.year}</dd>
                            </div>
                            <div>
                                <dt className="eyebrow !text-[10px] !text-ink4">Area</dt>
                                <dd className="mt-1 text-ink">{p.area}</dd>
                            </div>
                        </dl>
                    </li>
                ))}
            </ol>
        </div>
    );
}
