import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {

    const projects = [
        {
            title: "AgroVision-7",
            description:
                "A complete deep-learning study that classifies seven rice leaf conditions from RGB photographs — progressing from a weak imbalanced baseline to an Optuna-optimised, test-time-augmented transformer ensemble at 97.48 % accuracy.",
            tech: ["PyTorch", "ViT-B/16", "Swin-T", "ConvNeXt", "EfficientNet", "CBAM", "Optuna", "Grad-CAM", "Focal Loss", "CUDA", "timm"],
            href: "https://github.com/lucky07-07/rice-leaf-disease-classification",
        },
        {
            title: "KIC-COCO-Kannada-Image-Captioning",
            description:
                "This project presents KIC-COCO (Kannada Image Captioning COCO), the first large-scale, standardized Kannada image-caption dataset, along with a comprehensive benchmark evaluation of six encoder-decoder architectures for automatic image captioning in Kannada.",
            tech:  ["PyTorch", "CLIP", "EfficientNet", "ConvNeXt", "Swin-T", "ViT", "IndicTrans2", "IndicBART", "BERTScore", "CUDA"],
            href: "https://github.com/lucky07-07/KIC-COCO-Kannada-Image-Captioning",
        },
        {
            title: "Scalable Multi-Domain Geospatial Monitoring System",
            description:
                "A real-time geospatial intelligence platform that tracks satellites, aircraft, and weather from live public data sources, streams them through Kafka, persists them to PostGIS, visualizes them in a mode-switched dashboard, and layers a predictive ML service and a Spark analytics layer on top..",
            tech: ["Kafka", "PyTorch", "PySpark", "React","PostgreSQL", "Docker"," FastAPI"],
            href: "https://github.com/lucky07-07/geospatial-monitoring-system",
        },
        {
            title: "autonomous-carbon-k8s-scheduler",
            description:
                "lightweight autonomous AI agent that schedules Kubernetes workloads with explicit awareness of regional grid carbon intensity.",
            tech: ["Python","PyTorch" ,"Docker", "LangGraph","langchain","FastAPI","Kubernetes", "Linux"],
            href: "https://github.com/lucky07-07/autonomous-carbon-k8s-scheduler",
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
