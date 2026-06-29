import { motion } from "framer-motion";

export default function FocusAreas() {

    const areas = [
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "Natural Language Processing",
        "Full-Stack AI Engineering",
        "API Design & Backend",
        "Generative AI",
        "Cloud & MLOps",
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="h-full"
        >
            <div className="futuristic-card p-5 h-full">

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#f0c674] font-medium">
                    Disciplines
                </p>
                <h2 className="mt-2 text-[1.05rem] font-bold tracking-[-0.01em] text-[#f5f5f5]">Focus Areas</h2>
                <div className="mt-2 w-7 h-[2px] rounded-full bg-[#f0c674]/50" />

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {areas.map((area, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -1, transition: { duration: 0.16 } }}
                            className="
                                bg-white/[0.03] border border-white/[0.06]
                                rounded-[14px] p-3
                                hover:bg-white/[0.06] hover:border-white/[0.09]
                                transition-all duration-200
                            "
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#f0c674]/60 shrink-0" />
                                <span className="text-[13px] text-[#d1d1d1] leading-snug">{area}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </motion.section>
    );
}
