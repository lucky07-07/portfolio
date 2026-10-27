export const TOTAL_BLOCKS = 7;

// Each section is one block of a transformer forward pass.
const BLOCK = {
    about:      "TokenEmbedding",
    projects:   "MultiHeadAttention",
    hackathons: "FeedForward",
    research:   "CrossAttention",
    stack:      "Add & LayerNorm",
    education:  "PositionalEncoding",
    contact:    "Softmax → you",
};

// Shared section heading: block counter, block name, title and optional subtitle.
export default function SectionHeader({ index, tag, title, subtitle, right }) {
    const n = Number(index);

    return (
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
            <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px]">
                    <span className="text-ember">block {index}/{String(TOTAL_BLOCKS).padStart(2, "0")}</span>
                    <span className="flex gap-1" aria-hidden="true">
                        {Array.from({ length: TOTAL_BLOCKS }, (_, i) => (
                            <span
                                key={i}
                                className={`h-2 w-5 rounded-sm ${i < n ? "bg-gradient-to-r from-ember to-rose" : "bg-white/[0.07]"}`}
                                style={i < n ? { opacity: 0.4 + (0.6 * (i + 1)) / n } : undefined}
                            />
                        ))}
                    </span>
                    <span className="text-ink4">{BLOCK[tag] ?? tag}</span>
                </div>
                <h2 className="mt-5 text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[3rem]">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-4 max-w-2xl text-[16.5px] leading-[1.7] text-ink3">{subtitle}</p>
                )}
            </div>
            {right}
        </div>
    );
}
