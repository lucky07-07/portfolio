import { ArrowUpRight, GitPullRequest, GitMerge, CircleDot } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { GithubMark } from "./Icons";
import { contributions, profile } from "../data/portfolio";

const STATUS = {
    "Merged":    { icon: GitMerge,       tone: "text-indigo", dot: "bg-indigo" },
    "In review": { icon: GitPullRequest, tone: "text-moss",   dot: "bg-moss" },
    "Open":      { icon: CircleDot,      tone: "text-ochre",  dot: "bg-ochre" },
};

const count = (fn) => contributions.filter(fn).length;
const TALLY = [
    { value: count((c) => c.status === "Merged"),    label: "pull requests merged" },
    { value: count((c) => c.status === "In review"), label: "pull request in review" },
    { value: count((c) => c.kind === "Bug report"),  label: "bug reports filed" },
    { value: new Set(contributions.map((c) => c.repo)).size, label: "upstream projects" },
];

// Five squares split between additions and deletions, as on a GitHub pull request.
function DiffStat({ diff }) {
    const green = Math.max(1, Math.min(5, Math.round((diff.add / (diff.add + diff.del)) * 5)));
    return (
        <span className="inline-flex items-center gap-2.5 font-mono text-[11px]">
            <span className="text-moss">+{diff.add}</span>
            <span className="text-accent">−{diff.del}</span>
            <span className="flex gap-[2px]" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className={`h-2 w-2 rounded-[2px] ${i < green ? "bg-moss" : "bg-accent"}`} />
                ))}
            </span>
            <span className="text-ink4">{diff.files} files</span>
        </span>
    );
}

export default function OpenSource() {
    return (
        <div>
            <SectionHeader
                index="03"
                tag="opensource"
                title={<>Open <span className="em">source.</span></>}
                subtitle="Pull requests and bug reports on projects I use. Every row links to its thread on GitHub."
                right={
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-mono">
                        <GithubMark size={12} /> lucky07-07 <ArrowUpRight size={10} />
                    </a>
                }
            />

            {/* tally */}
            <dl className="mb-6 grid grid-cols-2 overflow-hidden rounded-[22px] border border-line bg-line lg:grid-cols-4" style={{ gap: 1 }}>
                {TALLY.map((t) => (
                    <div key={t.label} className="bg-paper p-6 sm:p-7">
                        <dd className="font-display text-[3rem] leading-none text-ink sm:text-[3.6rem]">{t.value}</dd>
                        <dt className="mt-3 font-mono text-[11px] text-ink3">{t.label}</dt>
                    </div>
                ))}
            </dl>

            {/* contribution log */}
            <ol className="card overflow-hidden">
                {contributions.map((c, i) => {
                    const s = STATUS[c.status];
                    const Icon = s.icon;
                    return (
                        <li key={c.href} className={i > 0 ? "border-t border-line" : ""}>
                            <a
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group grid gap-x-8 gap-y-3 p-6 transition-colors hover:bg-soft sm:p-7 lg:grid-cols-[230px_1fr_auto]"
                            >
                                <div>
                                    <p className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] ${s.tone}`}>
                                        <Icon size={13} /> {c.status}
                                    </p>
                                    <p className="mt-2.5 font-mono text-[12px] text-ink">{c.repo}</p>
                                    <p className="mt-1 text-[12.5px] leading-snug text-ink3">{c.about}</p>
                                </div>

                                <div>
                                    <h3 className="text-[1.5rem] leading-[1.15] transition-colors group-hover:text-accent sm:text-[1.7rem]">{c.title}</h3>
                                    <p className="mt-2.5 max-w-2xl text-[15px] leading-[1.7] text-ink2">{c.summary}</p>
                                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                                        <span className="font-mono text-[11px] text-ink3">{c.kind} #{c.number}</span>
                                        {c.diff && <DiffStat diff={c.diff} />}
                                    </div>
                                </div>

                                <ArrowUpRight size={18} className="hidden text-ink4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent lg:block" />
                            </a>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
