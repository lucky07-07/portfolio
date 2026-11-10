const TOTAL_BLOCKS = 8;

// Each section is one block of a transformer forward pass.
const BLOCK = {
    about:      "TokenEmbedding",
    projects:   "MultiHeadAttention",
    opensource: "ResidualConnection",
    hackathons: "FeedForward",
    research:   "CrossAttention",
    stack:      "Add & LayerNorm",
    education:  "PositionalEncoding",
    contact:    "Softmax → you",
};

// Shared section heading: a ruled line carrying the block counter and block name,
// then a large serif title and optional subtitle.
export default function SectionHeader({ index, tag, title, subtitle, right }) {
    return (
        <div className="mb-12 sm:mb-16">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line2 pt-5 font-mono text-[11px] uppercase tracking-[0.14em]">
                <span className="text-accent">Block {index} / {String(TOTAL_BLOCKS).padStart(2, "0")}</span>
                <span className="normal-case tracking-normal text-ink3">{BLOCK[tag] ?? tag}</span>
                {right && <span className="ml-auto normal-case tracking-normal">{right}</span>}
            </div>

            <h2 className="mt-9 max-w-4xl text-[2.7rem] leading-[1.02] sm:text-[4rem]">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-5 max-w-2xl text-[16.5px] leading-[1.7] text-ink3 sm:text-[17.5px]">{subtitle}</p>
            )}
        </div>
    );
}
