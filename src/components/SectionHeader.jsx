const TOTAL_EPOCHS = 6;

// Each section is framed as one layer of the network / one training epoch.
const LAYER = {
    about:     "Embedding(dim=512)",
    projects:  "Conv2D(filters=9)",
    research:  "MultiHeadAttention(heads=3)",
    stack:     "Dense(units=42)",
    education: "LayerNorm()",
    contact:   "Softmax(→ you)",
};

// Shared section heading: epoch counter, layer name, title and optional subtitle.
export default function SectionHeader({ index, tag, title, subtitle, right }) {
    const epoch = Number(index);

    return (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px]">
                    <span className="text-cyan">epoch {index}/{String(TOTAL_EPOCHS).padStart(2, "0")}</span>
                    <span className="flex gap-[3px]" aria-hidden="true">
                        {Array.from({ length: TOTAL_EPOCHS }, (_, i) => (
                            <span
                                key={i}
                                className={`h-1.5 w-4 rounded-sm ${i < epoch ? "bg-gradient-to-r from-cyan to-violet" : "bg-white/[0.07]"}`}
                            />
                        ))}
                    </span>
                    <span className="text-ink4">
                        layer <span className="text-violet">{LAYER[tag] ?? tag}</span>
                    </span>
                </div>
                <h2 className="mt-3 text-[2rem] font-bold leading-tight sm:text-[2.6rem]">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink3">{subtitle}</p>
                )}
            </div>
            {right}
        </div>
    );
}
