import { useEffect, useState } from "react";

const EPOCH_OF = { about: 1, projects: 2, opensource: 3, hackathons: 4, research: 5, skills: 6, education: 7, contact: 8 };

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
                <div className="h-full bg-accent" style={{ width: `${t * 100}%` }} />
            </div>

            {/* HUD, desktop only */}
            <div className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-5 rounded-full border border-white/10 bg-char/95 px-6 py-2.5 font-mono text-[11px] text-fog shadow-lift backdrop-blur-xl whitespace-nowrap lg:flex">
                <span>
                    epoch <span className="text-paper">{epoch}</span>/8
                </span>

                <span>
                    loss <span className="text-[#F0A283]">{lossAt(t).toFixed(4)}</span>
                </span>
                <span>
                    acc <span className="text-[#9BD3BC]">{accAt(t).toFixed(4)}</span>
                </span>

                <svg width={W} height={HGT} className="overflow-visible" aria-hidden="true">
                    <path d={path} fill="none" stroke="#F0A283" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
            </div>
        </>
    );
}
