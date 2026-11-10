// Small generative figure for each project card, one motif per kind of work.
// Drawn in currentColor so it works on both paper and charcoal cards.

const ACCENT = "#C4532D";

// Deterministic pseudo-random stream so each project keeps its own figure.
function rng(seed) {
    let s = (seed * 7919 + 104729) % 233280;
    return () => (s = (s * 9301 + 49297) % 233280) / 233280;
}

// Stacked image slices with a detection box: vision / medical imaging.
function Slices({ r }) {
    const cells = [];
    for (let y = 0; y < 6; y++) for (let x = 0; x < 6; x++) cells.push([x, y, r()]);
    const bx = 1 + Math.floor(r() * 3);
    const by = 1 + Math.floor(r() * 3);
    return (
        <g transform="translate(44 12)">
            {[0, 1, 2].map((i) => (
                <rect key={i} x={i * 30} y={i * 8} width="72" height="72" rx="7" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity={0.18 + i * 0.1} />
            ))}
            <g transform="translate(90 24)">
                <rect width="72" height="72" rx="7" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.5" />
                {cells.map(([x, y, v], i) => (
                    <rect key={i} x={7 + x * 10} y={7 + y * 10} width="8" height="8" rx="1.5" fill="currentColor" fillOpacity={0.05 + v * 0.4} />
                ))}
                <rect x={5 + bx * 10} y={5 + by * 10} width="22" height="22" rx="3" fill="none" stroke={ACCENT} strokeWidth="1.6" />
            </g>
        </g>
    );
}

// Rows of token blocks with a few attended ones: language models.
function Tokens({ r }) {
    const rows = [];
    for (let row = 0; row < 5; row++) {
        let x = 24;
        while (x < 196) {
            const w = 12 + Math.round(r() * 30);
            rows.push({ x, y: 18 + row * 19, w: Math.min(w, 216 - x), hot: r() < 0.16 });
            x += w + 6;
        }
    }
    return (
        <g>
            {rows.map((t, i) => (
                <rect key={i} x={t.x} y={t.y} width={t.w} height="10" rx="5" fill={t.hot ? ACCENT : "currentColor"} fillOpacity={t.hot ? 0.9 : 0.16} />
            ))}
        </g>
    );
}

// A small agent graph with a signal travelling through it: agents & systems.
function Graph({ r }) {
    const nodes = [[30, 60], [86, 28 + r() * 8], [86, 92 - r() * 8], [146, 60], [204, 30 + r() * 10], [204, 90 - r() * 10]];
    const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [1, 4]];
    const route = [0, 1, 3, 5].map((i) => nodes[i].join(",")).join(" L");
    return (
        <g>
            {edges.map(([a, b], i) => (
                <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="currentColor" strokeOpacity="0.28" />
            ))}
            <path d={`M146,60 C170,${10 + r() * 10} 120,8 146,${44}`} fill="none" stroke="currentColor" strokeOpacity="0.28" strokeDasharray="2 3" />
            {nodes.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i === 3 ? 9 : 6} fill={i === 3 ? ACCENT : "none"} stroke={i === 3 ? ACCENT : "currentColor"} strokeOpacity={i === 3 ? 1 : 0.55} strokeWidth="1.3" />
            ))}
            <circle r="3" fill={ACCENT}>
                <animateMotion dur="3.2s" repeatCount="indefinite" path={`M${route}`} />
            </circle>
        </g>
    );
}

// Bars with a fitted curve: applied ML & analytics.
function Bars({ r }) {
    const n = 14;
    const hs = Array.from({ length: n }, (_, i) => 16 + (1 - Math.exp(-i / 4)) * 56 + (r() - 0.5) * 18);
    const pts = hs.map((h, i) => `${30 + i * 13.5},${102 - (22 + (1 - Math.exp(-i / 4)) * 56)}`).join(" ");
    return (
        <g>
            <line x1="20" y1="102" x2="220" y2="102" stroke="currentColor" strokeOpacity="0.3" />
            {hs.map((h, i) => (
                <rect key={i} x={26 + i * 13.5} y={102 - h} width="8" height={h} rx="2" fill="currentColor" fillOpacity={0.12 + (i / n) * 0.18} />
            ))}
            <polyline points={pts} fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    );
}

// A call waveform with the flagged stretch picked out: speech & audio.
function Wave({ r }) {
    const n = 44;
    const from = 24 + Math.floor(r() * 6);
    const bars = Array.from({ length: n }, (_, i) => {
        const env = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.33 + r() * 0.6));
        return 6 + env * (20 + r() * 26);
    });
    return (
        <g>
            <rect x={18 + from * 4.7 - 3} y="14" width={10 * 4.7 + 3} height="92" rx="6" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeOpacity="0.5" strokeDasharray="2 3" />
            {bars.map((h, i) => {
                const hot = i >= from && i < from + 10;
                return <rect key={i} x={18 + i * 4.7} y={60 - h / 2} width="2.6" height={h} rx="1.3" fill={hot ? ACCENT : "currentColor"} fillOpacity={hot ? 0.95 : 0.3} />;
            })}
        </g>
    );
}

const MOTIF = { cv: Slices, nlp: Tokens, agents: Graph, data: Bars, wave: Wave };

export default function ProjectGlyph({ kind, seed = 1, className = "" }) {
    const Motif = MOTIF[kind] ?? Tokens;
    return (
        <svg viewBox="0 0 240 120" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
            <Motif r={rng(seed)} />
        </svg>
    );
}
