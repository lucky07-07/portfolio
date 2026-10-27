import { ArrowUpRight, Trophy } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { hackathons } from "../data/portfolio";

export default function Hackathons() {
    return (
        <div>
            <SectionHeader
                index="03"
                tag="hackathons"
                title="Hackathons & Competitions"
                subtitle="Time-boxed builds against real constraints: tight deadlines, hidden test sets and live users."
            />

            <div className="grid gap-6 lg:grid-cols-2">
                {hackathons.map((h, i) => {
                    // The top result leads as a full-width card with its headline stat on the right.
                    const lead = i === 0;
                    return (
                    <article key={h.event} className={`panel panel-hover flex flex-col overflow-hidden p-7 sm:p-9 ${lead ? "lg:col-span-2" : ""}`}>
                        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose/10 blur-[80px]" />

                        <div className="flex items-center justify-between gap-3">
                            <span className="inline-flex items-center gap-2 rounded-lg border border-warn/30 bg-warn/[0.08] px-2.5 py-1 font-mono text-[11px] text-warn">
                                <Trophy size={13} /> {h.format}
                            </span>
                            <span className="font-mono text-[12px] text-ink4">{h.year}</span>
                        </div>

                        {lead ? (
                            <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
                                <div className="max-w-xl">
                                    <h3 className="text-[1.9rem] font-bold leading-tight sm:text-[2.3rem]">{h.event}</h3>
                                    <p className="mt-2 font-mono text-[12.5px] text-rose">{h.track}</p>
                                    <p className="mt-5 text-[16px] leading-[1.7] text-ink3">{h.summary}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-display text-6xl font-bold leading-none text-grad sm:text-7xl">{h.stats[0].value}</p>
                                    <p className="mt-2 font-mono text-[12px] text-ink4">{h.stats[0].label}</p>
                                </div>
                            </div>
                        ) : (
                        <>
                        <h3 className="mt-6 text-[1.6rem] font-bold leading-tight">{h.event}</h3>
                        <p className="mt-2 font-mono text-[12.5px] text-rose">{h.track}</p>

                        <p className="mt-5 text-[15.5px] leading-[1.7] text-ink3">
                            {h.project && <span className="text-ink">{h.project}. </span>}{h.summary}
                        </p>

                        <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
                            {h.stats.map((s) => (
                                <div key={s.label} className="bg-void/90 px-4 py-4">
                                    <p className="font-display text-xl font-bold text-grad sm:text-2xl">{s.value}</p>
                                    <p className="mt-1 font-mono text-[10.5px] text-ink4">{s.label}</p>
                                </div>
                            ))}
                        </div>
                        </>
                        )}

                        <div className="flex-1 min-h-6" />
                        {h.links.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {h.links.map((l) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white/[0.02] px-3.5 py-2 font-mono text-[12px] text-ink2 transition-colors hover:border-ember/50 hover:text-ember"
                                >
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
