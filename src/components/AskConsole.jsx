import { useEffect, useRef, useState } from "react";
import { CornerDownLeft } from "lucide-react";

// Pre-written, factual answers streamed like an LLM response, each grounded
// in a section of the page (the "sources" act like RAG citations).
const QA = [
    {
        q: "What do you build?",
        a: "End-to-end ML systems that go from raw data to a deployed result: medical imaging from multi-series MRI, multimodal NLP such as the first COCO-scale Kannada captioning dataset, and LLM agents that verify their own claims before answering.",
        sources: [["projects", "projects"], ["about", "about"]],
    },
    {
        q: "Best results?",
        a: "Top 3% in the Amazon ML Challenge 2026. 0.906 private AUC on the RSNA knee MRI Kaggle challenge against 6,425 teams. 97.48% accuracy with a transformer ensemble on AgroVision-7.",
        sources: [["hackathons", "hackathons"], ["projects", "projects"]],
    },
    {
        q: "Any publications?",
        a: "A paper on wildfire occurrence prediction is published at ICICT 2026, and KIC-COCO is under review at ICMLDE 2026. AgroVision-7 and SustainSched are written up as IEEE-format papers.",
        sources: [["research", "research"]],
    },
    {
        q: "Open to work?",
        a: "Yes: AI / ML engineering roles, internships and research collaborations in vision, medical imaging, LLMs and agents. The fastest route is anilkumarlucky07@gmail.com.",
        sources: [["contact", "contact"]],
    },
];

const tokenize = (s) => s.match(/\S+\s*/g) ?? [];

export default function AskConsole({ onNavigate }) {
    const [active, setActive] = useState(0);
    const [shown, setShown] = useState(0);
    const timer = useRef(null);

    const tokens = tokenize(QA[active].a);
    const done = shown >= tokens.length;

    // Stream tokens with a slightly irregular cadence, like real sampling.
    useEffect(() => {
        let n = 0;
        const tick = () => {
            n += 1;
            setShown(n);
            if (n < tokens.length) timer.current = setTimeout(tick, 35 + ((n * 37) % 60));
        };
        timer.current = setTimeout(tick, 350);
        return () => clearTimeout(timer.current);
    }, [active, tokens.length]);

    return (
        <div className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5 font-mono text-[11.5px]">
                <span className="flex items-center gap-2 text-ink2">
                    <span className="h-2 w-2 rounded-full bg-signal animate-pulseDot" />
                    anil-llm
                </span>
                <span className="text-ink4">grounded on this page · temp 0</span>
            </div>

            <div className="p-5 sm:p-7">
                {/* prompt */}
                <div className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-[12px] text-ember">you</span>
                    <p className="text-[15px] font-medium text-ink">{QA[active].q}</p>
                </div>

                {/* streamed answer */}
                <div className="mt-5 flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-[12px] text-rose">llm</span>
                    <p className="min-h-[7.5rem] text-[15px] leading-[1.75] text-ink2" aria-live="polite">
                        {tokens.slice(0, shown).map((t, i) => (
                            <span
                                key={`${active}-${i}`}
                                className={i >= shown - 2 && !done ? "rounded bg-ember/20 text-ink transition-colors duration-300" : "transition-colors duration-700"}
                            >
                                {t}
                            </span>
                        ))}
                        {!done && <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-[2px] bg-rose animate-blink" />}
                    </p>
                </div>

                {/* citations */}
                <div className={`mt-4 flex flex-wrap items-center gap-2 pl-9 transition-opacity duration-300 ${done ? "opacity-100" : "opacity-0"}`}>
                    <span className="font-mono text-[10.5px] text-ink4">sources</span>
                    {QA[active].sources.map(([label, id], i) => (
                        <button
                            key={id}
                            onClick={() => onNavigate(id)}
                            className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-ink3 hover:border-ember/50 hover:text-ember"
                        >
                            [{i + 1}] {label}
                        </button>
                    ))}
                    <span className="ml-auto font-mono text-[10.5px] text-ink4">{tokens.length} tokens</span>
                </div>
            </div>

            {/* suggested prompts */}
            <div className="flex flex-wrap gap-2 border-t border-line bg-void/40 px-5 py-4">
                {QA.map((item, i) => (
                    <button
                        key={item.q}
                        onClick={() => { if (i !== active) { setShown(0); setActive(i); } }}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] ${
                            i === active
                                ? "border-ember/50 bg-ember/[0.1] text-ember"
                                : "border-line text-ink3 hover:border-ink4 hover:text-ink"
                        }`}
                    >
                        {item.q}
                        {i === active && <CornerDownLeft size={12} />}
                    </button>
                ))}
            </div>
        </div>
    );
}
