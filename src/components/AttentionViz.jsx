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
