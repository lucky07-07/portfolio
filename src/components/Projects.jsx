import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {

    const projects = [
        {
            title: "AgroVision-7",
            description:
                "Transformer ensemble for rice leaf disease classification on imbalanced agricultural data. 97.48% accuracy and 0.9750 macro-F1 across Swin, ViT, and ConvNeXt with Optuna-tuned ensemble weighting.",
            tech: ["PyTorch", "ViT", "Swin", "ConvNeXt", "Optuna"],
            href: "https://github.com/lucky07-07",
        },
        {
            title: "KannadaCap",
            description:
                "Image captioning for low-resource Kannada — built on a 225K MS COCO translation. Multi-architecture study across CNN-RNN, attention, and CLIP-based decoders with BERTScore back-translation evaluation.",
            tech: ["PyTorch", "Transformers", "IndicTrans2", "CLIP", "BERTScore"],
            href: "https://github.com/lucky07-07",
        },
        {
            title: "GeoIntel-RT",
            description:
                "Real-time geospatial intelligence fusing satellite, aircraft, and weather streams. STGCN-based trajectory forecasting with anomaly detection at scale, served through a React dashboard.",
            tech: ["Kafka", "PyTorch", "STGCN", "React", "Docker"],
            href: "https://github.com/lucky07-07",
        },
        {
            title: "Sustainable Cloud Computing",
            description:
                "Research into energy-aware scheduling and compute-efficient training for cloud-scale ML workloads. Profiling, adaptive batching, and cost-performance analysis across distributed training configurations.",
            tech: ["Python", "Docker", "AWS", "PyTorch", "Linux"],
            href: "https://github.com/lucky07-07",
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            {/* Header */}
            <div className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-5 bg-white/[0.08] rounded-full" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f0c674]">Work</p>
                </div>
                <h2 className="text-[1.75rem] font-bold tracking-[-0.02em] text-[#f5f5f5]">
                    Selected Work
                </h2>
            </div>

            {/* Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.07 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -2, transition: { duration: 0.18 } }}
                        className="futuristic-card neon-hover p-5 flex flex-col gap-3 group"
                    >
                        <p className="text-[9px] uppercase tracking-[0.28em] text-[#9f9f9f]">
                            Project {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3 className="text-[14px] font-semibold leading-snug text-[#f5f5f5] group-hover:text-[#f0c674] transition-colors duration-200">
                            {project.title}
                        </h3>

                        <p className="text-[13px] text-[#c8c8c8] leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((item, i) => (
                                <span
                                    key={i}
                                    className="text-[9px] bg-white/[0.04] text-[#9f9f9f] px-2 py-0.5 rounded-full border border-white/[0.07]"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto pt-1 flex items-center gap-1 text-[#9f9f9f] hover:text-[#f0c674] transition-colors duration-200 cursor-pointer group/link w-fit"
                        >
                            <span className="text-[10px] uppercase tracking-[0.2em]">View project</span>
                            <ArrowUpRight
                                size={10}
                                className="transition-transform duration-200 group-hover/link:translate-x-px group-hover/link:-translate-y-px"
                            />
                        </a>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
