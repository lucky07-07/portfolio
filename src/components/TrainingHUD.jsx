import { useEffect, useState } from "react";

const EPOCH_OF = { about: 1, projects: 2, hackathons: 3, research: 4, skills: 5, education: 6, contact: 7 };

// Synthetic but plausible training curves, parameterised by scroll progress t ∈ [0, 1].
const lossAt = (t) => 2.3 * Math.exp(-4.2 * t) + 0.04 + 0.025 * Math.sin(t * 40) * (1 - t);
const accAt = (t) => Math.min(0.995, 0.1 + 0.895 * (1 - Math.exp(-4.5 * t)));

const W = 90;
const HGT = 22;
const curve = Array.from({ length: 60 }, (_, i) => i / 59);

// Fixed training-progress readout: the page itself is the training run.
export default function TrainingHUD({ activeSection }) {
    const [t, setT] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setT(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    const epoch = EPOCH_OF[activeSection] ?? 0;
    const shown = curve.filter((x) => x <= t + 0.001);
    const path = shown
        .map((x, i) => `${i ? "L" : "M"}${(x * W).toFixed(1)},${(HGT - (lossAt(x) / 2.4) * HGT).toFixed(1)}`)
        .join(" ");

    return (
        <>
            {/* thin progress bar, all sizes */}
            <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent">
                <div className="h-full bg-gradient-to-r from-ember to-violet shadow-[0_0_10px_#ff8a4c]" style={{ width: `${t * 100}%` }} />
            </div>

            {/* HUD, desktop only */}
            <div className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-5 rounded-2xl border border-line bg-void/80 px-5 py-2.5 font-mono text-[11px] shadow-card backdrop-blur-xl whitespace-nowrap lg:flex">
                <span className="text-ink3">
                    epoch <span className="text-ink">{epoch}</span>/7
                </span>

                <span className="flex items-center gap-2">
                    <span className="relative h-1.5 w-28 overflow-hidden rounded-full bg-white/[0.07]">
                        <span className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-ember to-violet" style={{ width: `${t * 100}%` }} />
                    </span>
                    <span className="w-8 text-ink3">{Math.round(t * 100)}%</span>
                </span>

                <span className="text-ink4">
                    loss <span className="text-warn">{lossAt(t).toFixed(4)}</span>
                </span>
                <span className="text-ink4">
                    acc <span className="text-signal">{accAt(t).toFixed(4)}</span>
                </span>

                <svg width={W} height={HGT} className="overflow-visible" aria-hidden="true">
                    <path d={path} fill="none" stroke="#ffcc66" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
            </div>
        </>
    );
}
