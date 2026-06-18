import { motion } from "framer-motion";

export default function Education() {

    const education = [
        {
            degree: "M.Tech — Data Science",
            university: "Amrita Vishwa Vidyapeetham, Bengaluru",
            cgpa: "8.16",
            year: "2025 — Present",
        },
        {
            degree: "B.Tech — Computer Science",
            university: "Vel Tech R&D Institute, Chennai",
            cgpa: "7.44",
            year: "2017 — 2021",
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            <div className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-5 bg-white/[0.08] rounded-full" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f0c674]">Background</p>
                </div>
                <h2 className="text-[1.75rem] font-bold tracking-[-0.02em] text-[#f5f5f5]">
                    Education
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {education.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -2, transition: { duration: 0.18 } }}
                        className="futuristic-card neon-hover p-5 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-5 w-14 h-[1.5px] bg-gradient-to-r from-[#f0c674]/40 to-transparent" />

                        <p className="mt-1 text-[10px] uppercase tracking-[0.26em] text-[#9f9f9f]">
                            {item.year}
                        </p>
                        <h3 className="mt-3 text-[15px] font-bold text-[#f5f5f5] leading-snug tracking-[-0.01em]">
                            {item.degree}
                        </h3>
                        <p className="mt-1.5 text-sm text-[#c8c8c8]">{item.university}</p>

                        <div className="mt-4 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                            <span className="text-[9px] uppercase tracking-[0.26em] text-[#9f9f9f]">CGPA</span>
                            <span className="text-sm font-semibold text-[#f0c674]">{item.cgpa}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
