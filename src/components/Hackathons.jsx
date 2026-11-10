import { ArrowUpRight, Trophy } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { hackathons } from "../data/portfolio";

export default function Hackathons() {
    return (
        <div>
            <SectionHeader
                index="04"
                tag="hackathons"
                title={<>Hackathons <span className="em">&amp; competitions.</span></>}
                subtitle="Time-boxed builds against real constraints: tight deadlines, hidden test sets and live users."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {hackathons.map((h, i) => {
                    // The top result leads as a full-width charcoal card with its headline stat on the right.
                    const lead = i === 0;
                    return (
                    <article key={h.event} className={`${lead ? "card-dark md:col-span-2 lg:col-span-3" : "card"} card-hover flex flex-col overflow-hidden p-7 sm:p-9`}>
                        <div className={`flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.12em] ${lead ? "text-fog" : "text-ink3"}`}>
                            <span className="inline-flex items-center gap-2">
                                <Trophy size={13} className="text-accent" /> {h.format}
                            </span>
                            <span>{h.year}</span>
                        </div>

                        {lead ? (
                            <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
                                <div className="max-w-xl">
                                    <h3 className="text-[2.4rem] leading-[1.02] sm:text-[3.4rem]">{h.event}</h3>
                                    <p className="mt-3 font-mono text-[12px] text-fog">{h.track}</p>
                                    <p className="mt-5 text-[16px] leading-[1.7] text-fog">{h.summary}</p>
                                </div>
                                <div className="sm:text-right">
                                    <p className="font-display text-[5.5rem] italic leading-[0.85] text-paper sm:text-[8rem]">{h.stats[0].value}</p>
                                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">{h.stats[0].label}</p>
                                </div>
                            </div>
                        ) : (
                        <>
                        <h3 className="mt-7 text-[1.85rem] leading-[1.08]">{h.event}</h3>
                        <p className="mt-2 font-mono text-[12px] text-accent">{h.track}</p>

                        <p className="mt-5 text-[15.5px] leading-[1.7] text-ink3">
                            {h.project && <span className="text-ink">{h.project}. </span>}{h.summary}
                        </p>

                        <div className="mt-7 grid grid-cols-3 overflow-hidden rounded-2xl border border-line bg-line" style={{ gap: 1 }}>
                            {h.stats.map((s) => (
                                <div key={s.label} className="bg-paper px-3.5 py-4">
                                    <p className="whitespace-nowrap font-display text-[1.55rem] leading-none text-ink">{s.value}</p>
                                    <p className="mt-2 font-mono text-[10px] leading-snug text-ink3">{s.label}</p>
                                </div>
                            ))}
                        </div>
                        </>
                        )}

                        <div className="min-h-6 flex-1" />
                        {h.links.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {h.links.map((l) => (
                                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="pill-link">
                                    {l.label} <ArrowUpRight size={12} />
                                </a>
                            ))}
                        </div>
                        )}
                    </article>
                    );
                })}
            </div>
        </div>
    );
}
