import { motion } from "framer-motion";

export default function Hero({ onNavigate }) {
    return (
        <motion.section
            className="py-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="futuristic-card p-4 sm:p-6 lg:p-8 overflow-hidden relative">

                <div className="glow-orb glow-gold w-[260px] h-[260px] top-[-60px] right-0" />
                <div className="glow-orb glow-soft w-[200px] h-[200px] bottom-[-50px] left-[8%]" />

                <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">

                    {/* LEFT */}
                    <div>

                        <div className="
                            inline-flex items-center gap-2
                            px-3.5 py-1.5 rounded-full
                            border border-[#f0c674]/20 bg-[#f0c674]/[0.07]
                            text-[#f0c674] text-[11px] tracking-[0.2em] font-medium
                        ">
                            DATA SCIENTIST · ML ENGINEER
                        </div>

                        <h1 className="
                            mt-5
                            text-[1.75rem] sm:text-[2.15rem] lg:text-[2.6rem]
                            font-bold leading-[1.1] tracking-[-0.03em]
                            text-[#f5f5f5]
                        ">
                            Data Science &
                            <br />
                            Intelligent
                            <br />
                            <span className="text-[#f0c674]">Systems</span>
                        </h1>

                        <p className="mt-4 text-[#c8c8c8] text-[15px] leading-relaxed max-w-lg">
                            Data Scientist and Machine Learning Engineer building deep learning systems
                            end to end — from dataset to deployment. I work across computer vision, NLP,
                            and generative AI in PyTorch, Transformers, and FastAPI.
                        </p>

                        <p className="mt-2.5 text-[#9f9f9f] text-sm leading-relaxed max-w-lg">
                            Research-grade rigor, production-grade delivery.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                onClick={() => onNavigate("projects")}
                                className="
                                    bg-[#f0c674] text-[#0f0f10]
                                    px-6 py-2.5 rounded-[18px] font-medium text-sm
                                    hover:bg-[#e6b85c] transition-colors duration-200
                                "
                            >
                                View Work
                            </button>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    bg-white/[0.05] border border-white/[0.08] text-[#d1d1d1]
                                    px-6 py-2.5 rounded-[18px] text-sm
                                    hover:bg-white/[0.08] hover:border-white/[0.12]
                                    transition-all duration-200
                                "
                            >
                                Resume
                            </a>
                        </div>

                        <div className="mt-7 flex gap-6 sm:gap-8">
                            {[
                                ["2+",  "Years Building"  ],
                                ["10+", "Projects"        ],
                                ["15+", "Technologies"    ],
                            ].map(([value, label]) => (
                                <div key={label}>
                                    <p className="text-[1.3rem] font-bold text-[#f5f5f5]">{value}</p>
                                    <p className="mt-0.5 text-xs text-[#c8c8c8]">{label}</p>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* RIGHT — profile */}
                    <div className="relative flex justify-center items-center">
                        <motion.div
                            whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
                            className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 cursor-default group"
                        >
                            <div className="
                                absolute -inset-8 rounded-full
                                bg-[#f0c674]/[0.05] blur-3xl
                                opacity-60 group-hover:opacity-90
                                transition-opacity duration-500 pointer-events-none
                            " />

                            <div className="
                                relative w-full h-full rounded-full overflow-hidden
                                border border-white/[0.08]
                                shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                            ">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1d] via-[#131314] to-[#1e1e21] z-0" />

                                <div className="absolute inset-0 flex items-center justify-center z-[1]">
                                    <div className="text-center">
                                        <h2 className="text-5xl font-bold text-[#f5f5f5]">AK</h2>
                                        <p className="mt-2 text-[10px] uppercase tracking-[0.4em] text-[#9f9f9f]">
                                            Data Science
                                        </p>
                                    </div>
                                </div>

                                <img
                                    src="/profile.jpg"
                                    alt="Anil Kumar"
                                    className="
                                        absolute inset-0 w-full h-full object-cover object-top z-10
                                        transition-transform duration-700 ease-out group-hover:scale-[1.03]
                                    "
                                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                                />

                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent z-20 pointer-events-none" />

                                <div
                                    className="absolute inset-0 z-[25] rounded-full pointer-events-none"
                                    style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)" }}
                                />
                            </div>

                            <div className="absolute inset-[12px] rounded-full border border-white/[0.04] pointer-events-none z-30" />
                        </motion.div>
                    </div>

                </div>
            </div>
        </motion.section>
    );
}
