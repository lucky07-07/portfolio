import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
        <div className="overflow-x-auto overflow-y-hidden pb-7">
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
                                    stroke="#C4532D"
                                    strokeOpacity={Math.min(0.95, 0.12 + w[k] * 2.4)}
                                    strokeWidth={0.8 + w[k] * 8}
                                    strokeLinecap="round"
                                    className="transition-all duration-500"
                                />
                            );
                        })}
                </svg>

                <div className="flex justify-center gap-2 sm:gap-3">
                    {TOKENS.map((tok, k) => (
                        <button
                            key={tok}
                            ref={(el) => (refs.current[k] = el)}
                            onMouseEnter={() => { setPinned(true); setFocus(k); }}
                            onMouseLeave={() => setPinned(false)}
                            onFocus={() => { setPinned(true); setFocus(k); }}
                            onBlur={() => setPinned(false)}
                            className={`relative rounded-full border px-3.5 py-2 font-mono transition-colors text-[13px] sm:px-4 sm:text-[14px] ${
                                k === focus
                                    ? "border-ink bg-ink text-paper"
                                    : "border-line2 bg-raised text-ink2 hover:border-ink hover:text-ink"
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
