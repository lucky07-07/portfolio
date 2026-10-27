import { ArrowUpRight, FileText } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { papers } from "../data/portfolio";

const STATUS_TONE = {
    "Published":    "text-signal border-signal/30 bg-signal/[0.08]",
    "Under review": "text-warn border-warn/30 bg-warn/[0.08]",
    "Preprint":     "text-ember border-ember/30 bg-ember/[0.08]",
    "Manuscript":   "text-violet border-violet/30 bg-violet/[0.08]",
};

export default function Research() {
    return (
        <div>
            <SectionHeader
                index="04"
                tag="research"
                title="Papers & Publications"
                subtitle="Peer-reviewed and in-review work from my research projects."
                right={<span className="chip">{papers.length} papers</span>}
            />

            <ol className="flex flex-col gap-6">
                {papers.map((p, i) => (
                    <li key={p.title} className="panel panel-hover grid gap-6 p-7 sm:grid-cols-[auto_1fr] sm:p-9">
                        <span className="font-display text-4xl font-bold text-ink4/70 sm:text-5xl">
                            {String(i + 1).padStart(2, "0")}
                        </span>

                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`rounded-md border px-2.5 py-1 font-mono text-[11px] ${STATUS_TONE[p.status] ?? "border-line text-ink3"}`}>
                                    {p.status}
                                </span>
                                <span className="font-mono text-[11.5px] text-ink4">{p.year} · {p.area}</span>
                            </div>

                            <h3 className="mt-4 text-[1.3rem] font-semibold leading-snug sm:text-[1.45rem]">{p.title}</h3>
                            <p className="mt-2 font-mono text-[12.5px] italic text-rose/90">{p.venue}</p>
                            <p className="mt-4 max-w-3xl text-[15.5px] leading-[1.7] text-ink3">{p.summary}</p>

                            {p.links.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {p.links.map((l) => (
                                        <a
                                            key={l.label}
                                            href={l.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white/[0.02] px-3.5 py-2 font-mono text-[12px] text-ink2 transition-colors hover:border-ember/50 hover:text-ember"
                                        >
                                            {l.label === "Code" ? null : <FileText size={12} />}
                                            {l.label} <ArrowUpRight size={12} />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
