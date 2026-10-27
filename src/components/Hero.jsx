import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Download, ChevronDown } from "lucide-react";
import { profile } from "../data/portfolio";
import { AttentionMatrix, TokenAttention } from "./AttentionViz";

const ROLES = [
    "Computer Vision",
    "Medical Imaging",
    "LLMs & RAG",
    "Autonomous Agents",
    "Multimodal NLP",
];

// Types each role, pauses, deletes, moves to the next.
function useTypewriter(words, speed = 70, pause = 1400) {
    const [i, setI] = useState(0);
    const [text, setText] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const word = words[i % words.length];
        const done = !deleting && text === word;
        const cleared = deleting && text === "";
        const t = setTimeout(() => {
            if (done) setDeleting(true);
            else if (cleared) { setDeleting(false); setI((v) => v + 1); }
            else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
        }, done ? pause : deleting ? speed / 2 : speed);
        return () => clearTimeout(t);
    }, [text, deleting, i, words, speed, pause]);

    return text;
}

export default function Hero({ onNavigate }) {
    const role = useTypewriter(ROLES);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex min-h-screen flex-col justify-center pb-16 pt-32"
        >
            <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-rose/10 blur-[130px]" />
            <div className="pointer-events-none absolute bottom-10 left-0 h-80 w-80 rounded-full bg-ember/10 blur-[130px]" />

            <div className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
                {/* LEFT */}
                <div>
                    <p className="font-mono text-[12.5px] text-ink4">
                        <span className="text-ember">●</span> Attention(Q, K, V) = softmax(QKᵀ/√d)·V
                    </p>

                    <h1 className="mt-7 text-[2.8rem] font-bold leading-[0.98] tracking-[-0.045em] sm:text-[3.8rem] lg:text-[4.6rem]">
                        Anil Kumar
                        <span className="mt-3 block text-grad">AI / ML Engineer</span>
                    </h1>

                    <p className="mt-7 font-mono text-[15px] text-ink2">
                        <span className="text-ink4">&gt;&gt;&gt;</span> attend_to{" "}
                        <span className="text-ink4">=</span> <span className="text-ember">&quot;{role}</span>
                        <span className="ml-px inline-block h-4 w-[7px] translate-y-[2px] bg-ember animate-blink" />
                        <span className="text-ember">&quot;</span>
                    </p>

                    <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-ink2">
                        M.Tech Data Science at Amrita. I build models that see, read and reason:
                        LLM-labelled medical imaging, transformer ensembles and self-verifying RAG agents,
                        each evaluated honestly on held-out data.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <button onClick={() => onNavigate("projects")} className="btn-primary">
                            View projects <ArrowRight size={16} />
                        </button>
                        <button onClick={() => onNavigate("research")} className="btn-ghost">
                            <FileText size={16} /> Papers
                        </button>
                        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            <Download size={16} /> CV
                        </a>
                    </div>
                </div>

                {/* RIGHT */}
                <AttentionMatrix />
            </div>

            {/* self-attention over a sentence */}
            <div className="relative mt-20">
                <p className="mb-2 text-center font-mono text-[11.5px] text-ink4">
                    self-attention · hover a token to set the query
                </p>
                <TokenAttention />
            </div>

            <button
                onClick={() => onNavigate("about")}
                className="mx-auto mt-14 flex flex-col items-center gap-1 font-mono text-[11px] text-ink4 hover:text-ember"
            >
                forward pass
                <ChevronDown size={16} className="animate-bounce" />
            </button>
        </motion.div>
    );
}
