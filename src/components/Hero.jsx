import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, ArrowDown } from "lucide-react";
import { TokenAttention } from "./AttentionViz";
import AskConsole from "./AskConsole";
import { useMachine } from "../lib/machine";
import { typewriter } from "../lib/machines";

const ROLES = [
    "Computer Vision",
    "Medical Imaging",
    "LLMs & RAG",
    "Autonomous Agents",
    "Multimodal NLP",
];

const ROLE_MACHINE = typewriter(ROLES);
const ROLE_DELAY = { typing: 70, holding: 1400, deleting: 35 };

// Types each role, holds it, deletes it, moves to the next.
// With reduced motion the first role is simply shown.
function useRole() {
    const reduced = useReducedMotion();
    const [state, send, ctx] = useMachine(ROLE_MACHINE);

    useEffect(() => {
        if (reduced) return;
        const t = setTimeout(() => send("TICK"), ROLE_DELAY[state]);
        return () => clearTimeout(t);
    }, [state, ctx, reduced, send]);

    return reduced
        ? { state: "holding", text: ROLES[0] }
        : { state, text: ROLES[ctx.word].slice(0, ctx.chars) };
}

// Staggered blur-in used for every hero element.
const rise = (delay) => ({
    initial: { opacity: 0, y: 22, filter: "blur(12px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] },
});

export default function Hero({ onNavigate }) {
    const role = useRole();

    return (
        <div className="relative pb-10">
            {/* INTRO */}
            <div className="flex min-h-[92vh] flex-col items-center justify-center pb-16 pt-32 text-center">
                <motion.p {...rise(0.05)} className="inline-flex items-center gap-2.5 rounded-full border border-line2 bg-raised/70 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink3 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulseDot" />
                    M.Tech Data Science · Amrita
                </motion.p>

                <h1 className="mt-9 text-[4rem] leading-[0.92] tracking-[-0.02em] sm:text-[6.5rem] lg:text-[8.5rem]">
                    <motion.span {...rise(0.15)} className="block">Anil Kumar</motion.span>
                    <motion.span {...rise(0.3)} className="mt-2 block text-[0.52em] italic leading-[1.1] text-ink3">
                        AI / ML Engineer
                    </motion.span>
                </h1>

                <motion.p {...rise(0.45)} data-state={role.state} className="mt-9 font-mono text-[13.5px] text-ink3">
                    attending to <span className="text-ink4">→</span>{" "}
                    <span className="text-accent">{role.text}</span>
                    <span className="ml-0.5 inline-block h-[15px] w-[2px] translate-y-[2px] bg-accent animate-blink" />
                </motion.p>

                <motion.p {...rise(0.55)} className="mt-6 max-w-[620px] text-[17px] leading-[1.7] text-ink2 sm:text-[18px]">
                    I build models that see, read and reason:
                    LLM-labelled medical imaging, transformer ensembles and self-verifying RAG agents,
                    each evaluated honestly on held-out data.
                </motion.p>

                <motion.div {...rise(0.65)} className="mt-10 flex flex-wrap justify-center gap-3">
                    <button onClick={() => onNavigate("projects")} className="btn-primary">
                        View projects <ArrowRight size={15} />
                    </button>
                    <button onClick={() => onNavigate("research")} className="btn-ghost">
                        <FileText size={15} /> Papers
                    </button>
                </motion.div>

                <motion.button
                    {...rise(0.85)}
                    onClick={() => onNavigate("about")}
                    className="mt-16 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink4 hover:text-accent"
                >
                    forward pass <ArrowDown size={13} className="animate-bounce" />
                </motion.button>
            </div>

            {/* CONSOLE */}
            <motion.div
                initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                className="mx-auto max-w-[880px]"
            >
                <AskConsole onNavigate={onNavigate} />
            </motion.div>

            {/* self-attention over a sentence */}
            <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                className="mx-auto mt-5 max-w-[880px] rounded-[22px] border border-line bg-soft/60 px-4 pb-10 pt-6 sm:px-8"
            >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="eyebrow">Self-attention · hover a token to set the query</p>
                    <p className="font-mono text-[11px] text-ink4">Attention(Q, K, V) = softmax(QKᵀ/√d)·V</p>
                </div>
                <TokenAttention />
            </motion.div>
        </div>
    );
}
