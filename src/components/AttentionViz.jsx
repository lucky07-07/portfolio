import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Magma-like colour ramp for attention weights in [0, 1].
const RAMP = [
    [24, 18, 33],
    [86, 36, 120],
    [182, 54, 121],
    [242, 80, 143],
    [255, 138, 76],
    [255, 204, 102],
];
function heat(w) {
    const x = Math.min(1, Math.max(0, w)) * (RAMP.length - 1);
    const i = Math.min(RAMP.length - 2, Math.floor(x));
    const t = x - i;
    const c = RAMP[i].map((v, k) => Math.round(v + (RAMP[i + 1][k] - v) * t));
    return `rgb(${c.join(",")})`;
}

const softmax = (row) => {
    const m = Math.max(...row);
    const e = row.map((v) => Math.exp(v - m));
    const s = e.reduce((a, b) => a + b, 0);
    return e.map((v) => v / s);
};

// Small deterministic PRNG so every head looks the same on every load.
const rand = (seed) => () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
};

const AXIS = ["vision", "language", "agents", "data", "research", "deploy"];
const HEAD_NAMES = ["local", "semantic", "global", "cross-domain"];

// Four heads with different "personalities": diagonal, block, broad, off-diagonal.
const HEADS = HEAD_NAMES.map((_, h) => {
    const r = rand(17 + h * 31);
    return AXIS.map((_, i) =>
        softmax(
            AXIS.map((_, j) => {
                const base = r() * 1.2;
                if (h === 0) return base + (i === j ? 3 : -Math.abs(i - j) * 0.6);
                if (h === 1) return base + (Math.floor(i / 2) === Math.floor(j / 2) ? 2.4 : 0);
                if (h === 2) return base + (j === 4 ? 1.8 : 0.4);
                return base + (j === (i + 3) % AXIS.length ? 2.8 : 0);
            })
        )
    );
});

export function AttentionMatrix() {
    const [head, setHead] = useState(0);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        const t = setInterval(() => setHead((h) => (h + 1) % HEADS.length), 2800);
        return () => clearInterval(t);
    }, []);

    const M = HEADS[head];

    return (
        <div className="panel p-5 sm:p-7">
            <div className="flex items-center justify-between font-mono text-[11.5px]">
                <span className="text-ink2">MultiHeadAttention</span>
                <span className="text-ink4">
                    head <span className="text-ember">{head + 1}</span>/{HEADS.length} · {HEAD_NAMES[head]}
                </span>
            </div>

            <div className="mt-5 grid grid-cols-[auto_1fr] gap-3">
                {/* query labels */}
                <div className="grid gap-1.5" style={{ gridTemplateRows: `repeat(${AXIS.length}, 1fr)` }}>
                    {AXIS.map((a, i) => (
                        <span key={a} className={`flex items-center justify-end font-mono text-[10.5px] ${hover?.[0] === i ? "text-ember" : "text-ink4"}`}>
                            {a}
                        </span>
                    ))}
                </div>

                <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${AXIS.length}, 1fr)` }}>
                    {M.map((row, i) =>
                        row.map((w, j) => (
                            <div
                                key={`${i}-${j}`}
                                onMouseEnter={() => setHover([i, j])}
                                onMouseLeave={() => setHover(null)}
                                className="relative aspect-square rounded-[5px] transition-[background-color] duration-700"
                                style={{ backgroundColor: heat(Math.pow(w, 0.6)) }}
                            >
                                {hover?.[0] === i && hover?.[1] === j && (
                                    <span className="absolute inset-0 flex items-center justify-center rounded-[5px] font-mono text-[10px] font-semibold text-void ring-2 ring-ink">
                                        {w.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <span />
                {/* key labels */}
                <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${AXIS.length}, 1fr)` }}>
                    {AXIS.map((a, j) => (
                        <span key={a} className={`truncate text-center font-mono text-[9.5px] ${hover?.[1] === j ? "text-ember" : "text-ink4"}`}>
                            {a.slice(0, 4)}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 font-mono text-[10.5px] text-ink4">
                <span>Q · Kᵀ / √d → softmax</span>
                <span className="flex items-center gap-2">
                    0
                    <span className="h-1.5 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${[0, 0.25, 0.5, 0.75, 1].map(heat).join(",")})` }} />
                    1
                </span>
            </div>
        </div>
    );
}

// ── Self-attention arcs over a sentence ──────────────────────────────
const TOKENS = ["Anil", "trains", "models", "that", "see", "read", "and", "reason"];
const LINKS = { 0: [1], 1: [0, 2], 2: [4, 5, 7, 1], 4: [2, 5], 5: [2, 4, 7], 7: [2, 5] };

const weightsFor = (q) =>
    softmax(TOKENS.map((_, k) => (k === q ? -9 : (LINKS[q]?.includes(k) ? 2.2 : 0) - Math.abs(q - k) * 0.25)));

export function TokenAttention() {
    const wrap = useRef(null);
    const refs = useRef([]);
    const [xs, setXs] = useState([]);
    const [focus, setFocus] = useState(2);
    const [pinned, setPinned] = useState(false);

    useLayoutEffect(() => {
        const measure = () => {
            const box = wrap.current?.getBoundingClientRect();
            if (!box) return;
            setXs(refs.current.map((el) => {
                const r = el.getBoundingClientRect();
                return r.left - box.left + r.width / 2;
            }));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(wrap.current);
        return () => ro.disconnect();
    }, []);

    // Walk through the content words while the visitor is not hovering.
    useEffect(() => {
        if (pinned) return;
        const order = [2, 5, 7, 4, 1];
        const t = setInterval(() => setFocus((f) => order[(order.indexOf(f) + 1) % order.length]), 1900);
        return () => clearInterval(t);
    }, [pinned]);

    const w = weightsFor(focus);
    const ARC_H = 96;

    return (
        <div className="overflow-x-auto pb-2">
            <div ref={wrap} className="relative mx-auto w-max min-w-full px-2" style={{ paddingTop: ARC_H }}>
                <svg className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-visible" aria-hidden="true">
                    {xs.length === TOKENS.length &&
                        TOKENS.map((_, k) => {
                            if (k === focus) return null;
                            const x1 = xs[focus];
                            const x2 = xs[k];
                            const h = Math.min(ARC_H - 6, 16 + Math.abs(x2 - x1) * 0.32);
                            return (
                                <path
                                    key={k}
                                    d={`M${x1},${ARC_H} Q${(x1 + x2) / 2},${ARC_H - h * 2} ${x2},${ARC_H}`}
                                    fill="none"
                                    stroke={heat(0.35 + w[k] * 1.6)}
                                    strokeOpacity={0.25 + w[k] * 2}
                                    strokeWidth={0.8 + w[k] * 9}
                                    strokeLinecap="round"
                                    className="transition-all duration-500"
                                />
                            );
                        })}
                </svg>

                <div className="flex gap-2 sm:gap-3">
                    {TOKENS.map((tok, k) => (
                        <button
                            key={tok}
                            ref={(el) => (refs.current[k] = el)}
                            onMouseEnter={() => { setPinned(true); setFocus(k); }}
                            onMouseLeave={() => setPinned(false)}
                            onFocus={() => { setPinned(true); setFocus(k); }}
                            onBlur={() => setPinned(false)}
                            className={`relative rounded-lg border px-3 py-2 font-mono text-[13px] sm:px-4 sm:text-[14px] ${
                                k === focus
                                    ? "border-ember/60 bg-ember/[0.12] text-ember"
                                    : "border-line bg-void/60 text-ink2 hover:text-ink"
                            }`}
                        >
                            {tok}
                            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9.5px] text-ink4">
                                {k === focus ? "query" : w[k].toFixed(2)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
