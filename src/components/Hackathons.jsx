import { ArrowUpRight, Trophy } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { hackathons } from "../data/portfolio";
import { openProject } from "../lib/openProject";

export default function Hackathons() {
    // The one result without a project card of its own leads; entries built
    // around a portfolio project follow as a ledger that links to that card.
    const [lead, ...rest] = hackathons;

    return (
        <div>
            <SectionHeader
                index="04"
                tag="hackathons"
                title={<>Hackathons <span className="em">&amp; competitions.</span></>}
                subtitle="Time-boxed builds against real constraints: tight deadlines, hidden test sets and live users."
            />

            <article className="card-dark card-hover overflow-hidden p-7 sm:p-9">
                <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-fog">
                    <span className="inline-flex items-center gap-2">
                        <Trophy size={13} className="text-accent" /> {lead.format}
                    </span>
                    <span>{lead.year}</span>
                </div>
                <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
                    <div className="max-w-xl">
                        <h3 className="text-[2.4rem] leading-[1.02] sm:text-[3.4rem]">{lead.event}</h3>
                        <p className="mt-3 font-mono text-[12px] text-fog">{lead.track}</p>
                        <p className="mt-5 text-[16px] leading-[1.7] text-fog">{lead.summary}</p>
                    </div>
                    <div className="sm:text-right">
                        <p className="font-display text-[5.5rem] italic leading-[0.85] text-paper sm:text-[8rem]">{lead.result.value}</p>
                        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">{lead.result.label}</p>
                    </div>
                </div>
            </article>

            <ol className="mt-6 border-b border-line2">
                {rest.map((h) => (
                    <li
                        key={h.event}
                        className="grid items-center gap-x-8 gap-y-3 border-t border-line2 py-7 sm:px-4 lg:grid-cols-[150px_1fr_200px_auto]"
                    >
                        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink3">
                            <Trophy size={12} className="mr-1.5 inline -translate-y-px text-accent" />
                            {h.format} · {h.year}
                        </p>

                        <div>
                            <h3 className="text-[1.6rem] leading-[1.1] sm:text-[1.85rem]">{h.event}</h3>
                            <p className="mt-1.5 font-mono text-[11.5px] text-ink3">{h.track}</p>
                        </div>

                        <p>
                            <span className="font-display text-[2.2rem] leading-none text-ink">{h.result.value}</span>
                            <span className="ml-2 font-mono text-[10.5px] text-ink3">{h.result.label}</span>
                        </p>

                        <div className="flex flex-wrap gap-2">
                            <button type="button" onClick={() => openProject(h.project)} className="pill-link">
                                {h.project.split(" · ")[0]} <ArrowUpRight size={12} />
                            </button>
                            {h.links.map((l) => (
                                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="pill-link">
                                    {l.label} <ArrowUpRight size={12} />
                                </a>
                            ))}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
