import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Education() {

    const education = [
        {
            degree: "M.Tech — Data Science",
            university: "Amrita Vishwa Vidyapeetham, Bengaluru",
            cgpa: "8.16",
            year: "2025 — Present",
            focus: ["Deep Learning", "Reinforcement Learning", "Computer Vision", "NLP"],
        },
        {
            degree: "B.Tech — Computer Science",
            university: "Vel Tech R&D Institute, Chennai",
            cgpa: "7.44",
            year: "2017 — 2021",
            focus: ["Algorithms", "Databases", "Operating Systems", "Software Engineering"],
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            <SectionHeader index="05" tag="education" title="Education" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {education.map((item, i) => (
                    <motion.div
                        key={item.degree}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className="panel panel-hover p-5"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/[0.07]">
                                <GraduationCap size={18} className="text-cyan" />
                            </span>
                            <span className="font-mono text-[11px] text-ink4">{item.year}</span>
                        </div>
                        <h3 className="mt-4 text-[17px] font-semibold">{item.degree}</h3>
                        <p className="mt-1 text-sm text-ink3">{item.university}</p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {item.focus.map((f) => <span key={f} className="chip">{f}</span>)}
                        </div>

                        <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                            <span className="font-mono text-[11px] text-ink4">cgpa</span>
                            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                                <div className="h-full rounded-full bg-gradient-to-r from-cyan to-violet" style={{ width: `${Number(item.cgpa) * 10}%` }} />
                            </div>
                            <span className="font-display text-sm font-bold text-ink">{item.cgpa}<span className="text-ink4">/10</span></span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
