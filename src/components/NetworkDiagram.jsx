import { profile } from "../data/portfolio";

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
    color: i % 2 ? "#9d7bff" : "#ff8a4c",
}));

// Feed-forward network diagram whose output neuron is the profile photo.
export default function NetworkDiagram() {
    return (
        <div className="relative mx-auto w-full max-w-[480px]">
            <svg viewBox={`0 0 420 ${H}`} className="w-full" aria-hidden="true">
                <defs>
                    <linearGradient id="edge" x1="0" x2="1">
                        <stop offset="0" stopColor="#ff8a4c" stopOpacity="0.35" />
                        <stop offset="1" stopColor="#9d7bff" stopOpacity="0.35" />
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
                            <circle cx={l.x} cy={y} r="8" fill="#181221" stroke={li === 0 ? "#ff8a4c" : "#f2508f"} strokeWidth="1.4" />
                            <circle cx={l.x} cy={y} r="3" fill={li === 0 ? "#ff8a4c" : "#9d7bff"}>
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
                <circle cx={OUT.x} cy={OUT.y} r={OUT.r + 6} fill="none" stroke="#ff8a4c" strokeOpacity="0.35" strokeDasharray="3 5">
                    <animateTransform attributeName="transform" type="rotate" from={`0 ${OUT.x} ${OUT.y}`} to={`360 ${OUT.x} ${OUT.y}`} dur="20s" repeatCount="indefinite" />
                </circle>
                <text x={OUT.x} y={OUT.y + OUT.r + 24} textAnchor="middle" className="fill-ember font-mono" fontSize="10.5">
                    ŷ = &quot;ml_engineer&quot;
                </text>
                <text x={OUT.x} y={OUT.y + OUT.r + 38} textAnchor="middle" className="fill-ink4 font-mono" fontSize="9">
                    p = 0.997
                </text>
            </svg>

            {/* photo sits on the output neuron */}
            <div
                className="absolute overflow-hidden rounded-full border-2 border-ember/60 bg-abyss shadow-glow"
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
