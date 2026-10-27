import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, ChevronDown } from "lucide-react";
import { profile, papers } from "../data/portfolio";

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

const METRICS = [
    { value: "0.906",  label: "val_auc",   note: "RSNA knee MRI" },
    { value: "97.48%", label: "val_acc",   note: "AgroVision-7" },
    { value: "250K",   label: "samples",   note: "KIC-COCO dataset" },
    { value: `${papers.length}`, label: "papers", note: "research" },
];

// ── Network geometry (SVG viewBox 420 × 340) ───────────────────────────
const H = 340;
const spread = (n, gap) => Array.from({ length: n }, (_, i) => H / 2 + (i - (n - 1) / 2) * gap);
const INPUTS = ["pixels", "DICOM", "tokens", "signals"];
const LAYERS = [
    { x: 78,  ys: spread(4, 62), name: "input" },
    { x: 168, ys: spread(6, 46), name: "conv" },
    { x: 256, ys: spread(5, 52), name: "attn" },
];
const OUT = { x: 352, y: H / 2, r: 54 };

const EDGES = [];
LAYERS.forEach((layer, li) => {
    const next = LAYERS[li + 1];
    layer.ys.forEach((y1) => {
        if (next) next.ys.forEach((y2) => EDGES.push([layer.x, y1, next.x, y2]));
        else EDGES.push([layer.x, y1, OUT.x - OUT.r, OUT.y]);
    });
});

// Deterministic subset of edges that carry an animated "signal".
const PULSES = EDGES.filter((_, i) => i % 3 === 0).map((e, i) => ({
    e,
    dur: 1.6 + ((i * 37) % 10) / 10,
    begin: ((i * 53) % 30) / 10,
    color: i % 2 ? "#a78bfa" : "#22d3ee",
}));

function NeuralNet() {
    return (
        <div className="relative mx-auto w-full max-w-[480px]">
            <svg viewBox={`0 0 420 ${H}`} className="w-full" aria-hidden="true">
                <defs>
                    <linearGradient id="edge" x1="0" x2="1">
                        <stop offset="0" stopColor="#22d3ee" stopOpacity="0.35" />
                        <stop offset="1" stopColor="#a78bfa" stopOpacity="0.35" />
                    </linearGradient>
                </defs>

                {/* layer names */}
                {LAYERS.map((l) => (
                    <text key={l.name} x={l.x} y="14" textAnchor="middle" className="fill-ink4 font-mono" fontSize="10">
                        {l.name}
                    </text>
                ))}
                <text x={OUT.x} y="14" textAnchor="middle" className="fill-ink4 font-mono" fontSize="10">output</text>

                {/* weights */}
                {EDGES.map(([x1, y1, x2, y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#edge)" strokeWidth="0.6" />
                ))}

                {/* forward-pass signals */}
                {PULSES.map(({ e: [x1, y1, x2, y2], dur, begin, color }, i) => (
                    <circle key={i} r="2.2" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
                        <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={`M${x1},${y1} L${x2},${y2}`} />
                        <animate attributeName="opacity" values="0;1;1;0" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
                    </circle>
                ))}

                {/* neurons */}
                {LAYERS.map((l, li) =>
                    l.ys.map((y, ni) => (
                        <g key={`${li}-${ni}`}>
                            <circle cx={l.x} cy={y} r="8" fill="#0a0f1c" stroke={li === 0 ? "#22d3ee" : "#818cf8"} strokeWidth="1.4" />
                            <circle cx={l.x} cy={y} r="3" fill={li === 0 ? "#22d3ee" : "#a78bfa"}>
                                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + ((li + ni) % 3) * 0.6}s`} repeatCount="indefinite" />
                            </circle>
                        </g>
                    ))
                )}

                {/* input feature labels */}
                {LAYERS[0].ys.map((y, i) => (
                    <text key={i} x={LAYERS[0].x - 15} y={y + 3.5} textAnchor="end" className="fill-ink3 font-mono" fontSize="10">
                        {INPUTS[i]}
                    </text>
                ))}

                {/* output ring */}
                <circle cx={OUT.x} cy={OUT.y} r={OUT.r + 6} fill="none" stroke="#22d3ee" strokeOpacity="0.35" strokeDasharray="3 5">
                    <animateTransform attributeName="transform" type="rotate" from={`0 ${OUT.x} ${OUT.y}`} to={`360 ${OUT.x} ${OUT.y}`} dur="20s" repeatCount="indefinite" />
                </circle>
                <text x={OUT.x} y={OUT.y + OUT.r + 24} textAnchor="middle" className="fill-cyan font-mono" fontSize="10.5">
                    ŷ = &quot;ml_engineer&quot;
                </text>
                <text x={OUT.x} y={OUT.y + OUT.r + 38} textAnchor="middle" className="fill-ink4 font-mono" fontSize="9">
                    p = 0.997
                </text>
            </svg>

            {/* photo sits on the output neuron */}
            <div
                className="absolute overflow-hidden rounded-full border-2 border-cyan/60 bg-abyss shadow-glow"
                style={{
                    left: `${((OUT.x - OUT.r) / 420) * 100}%`,
                    top: `${((OUT.y - OUT.r) / H) * 100}%`,
                    width: `${((OUT.r * 2) / 420) * 100}%`,
                    aspectRatio: "1",
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold text-ink">AK</div>
                <img
                    src="/profile.jpg"
                    alt={profile.name}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
            </div>
        </div>
    );
}

export default function Hero({ onNavigate }) {
    const role = useTypewriter(ROLES);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex min-h-screen flex-col justify-center pb-10 pt-28"
        >
            <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-cyan/10 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-10 left-0 h-72 w-72 rounded-full bg-violet/10 blur-[120px]" />

            <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
                {/* LEFT */}
                <div>
                    <p className="font-mono text-[12px] text-ink4">
                        <span className="text-signal">●</span> model.fit(anil, epochs=∞) <span className="text-ink3">· training in progress</span>
                    </p>

                    <h1 className="mt-6 text-[2.5rem] font-bold leading-[1] tracking-[-0.04em] sm:text-[3.4rem] lg:text-[4.1rem]">
                        Anil Kumar
                        <span className="mt-2 block text-grad">AI / ML Engineer</span>
                    </h1>

                    <p className="mt-6 font-mono text-sm text-ink2">
                        <span className="text-ink4">&gt;&gt;&gt;</span> model.focus{" "}
                        <span className="text-ink4">=</span> <span className="text-cyan">&quot;{role}</span>
                        <span className="ml-px inline-block h-4 w-[7px] translate-y-[2px] bg-cyan animate-blink" />
                        <span className="text-cyan">&quot;</span>
                    </p>

                    <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink2">
                        M.Tech Data Science at Amrita. I train models that see, read and reason, from
                        LLM-labelled medical imaging and transformer ensembles to self-verifying RAG agents,
                        and I evaluate every one of them honestly.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <button onClick={() => onNavigate("projects")} className="btn-primary">
                            View projects <ArrowRight size={15} />
                        </button>
                        <button onClick={() => onNavigate("research")} className="btn-ghost">
                            <FileText size={15} /> Read papers
                        </button>
                    </div>
                </div>

                {/* RIGHT */}
                <NeuralNet />
            </div>

            {/* metrics as a training log line */}
            <div className="relative mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
                {METRICS.map((m) => (
                    <div key={m.label} className="bg-void/90 p-4 sm:p-5">
                        <p className="font-mono text-[10.5px] text-ink4">{m.label}</p>
                        <p className="mt-1 font-display text-2xl font-bold text-ink sm:text-[1.75rem]">{m.value}</p>
                        <p className="mt-0.5 font-mono text-[10.5px] text-cyan/80">{m.note}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => onNavigate("about")}
                className="mx-auto mt-10 flex flex-col items-center gap-1 font-mono text-[10.5px] text-ink4 hover:text-cyan"
            >
                begin epoch 1
                <ChevronDown size={16} className="animate-bounce" />
            </button>
        </motion.div>
    );
}
