import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

// lucide-react (this version) ships no GitHub brand glyph, so render the mark inline.
function GithubMark({ size = 12 }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
        </svg>
    );
}

export default function Projects() {

    const projects = [
        {
            title: "AgroVision-7",
            description:
                "A complete deep-learning study that classifies seven rice leaf conditions from RGB photographs — progressing from a weak imbalanced baseline to an Optuna-optimised, test-time-augmented transformer ensemble at 97.48 % accuracy.",
            problemStatement:
                "Rice leaf diseases directly reduce yield, quality and farmer income, yet manual diagnosis is slow and expertise-dependent. Two obstacles make automated recognition hard: public rice-leaf datasets are small and class-imbalanced — causing overfitting and weak minority-class performance — and several diseases such as Rice Blast, Leaf scald and Rice Tungro are visually fine-grained and easily confused.",
            approach:
                "A pre-augmented 7-class dataset with imbalance-aware training (WeightedRandomSampler plus class-weighted Focal Loss), Optuna TPE hyperparameter search (15 trials on a ConvNeXt-Tiny proxy), and two-stage transfer learning — frozen-head warm-up, then top-block fine-tuning. Five experiment families are benchmarked on a common split, culminating in ×5 test-time augmentation and an accuracy-weighted ensemble of ViT-B/16 (SWAG), Swin-T and ConvNeXt-Tiny.",
            results:
                "The transformer ensemble reaches 97.48 % test accuracy and 0.9750 macro-F1, with every per-class accuracy ≥ 0.96. ConvNeXt-Tiny is the recommended lightweight model at 96.60 % for roughly a third of the cost. Switching from the original to the pre-augmented dataset under a weighted sampler lifted a fixed ResNet-50 from 76.53 % to 93.76 %.",
            tech: ["PyTorch", "ViT-B/16", "Swin-T", "ConvNeXt", "EfficientNet", "CBAM", "Optuna", "Grad-CAM", "Focal Loss", "CUDA", "timm"],
            href: "https://github.com/lucky07-07/rice-leaf-disease-classification",
            links: {
                github: "https://github.com/lucky07-07/rice-leaf-disease-classification",
                paper: "https://github.com/lucky07-07/rice-leaf-disease-classification/blob/main/docs/main.pdf",
            },
        },
        {
            title: "KIC-COCO-Kannada-Image-Captioning",
            description:
                "This project presents KIC-COCO (Kannada Image Captioning COCO), the first large-scale, standardized Kannada image-caption dataset, along with a comprehensive benchmark evaluation of six encoder-decoder architectures for automatic image captioning in Kannada.",
            problemStatement:
                "Kannada, a classical Dravidian language with over 60 million native speakers, remains severely under-resourced in multimodal NLP. No large-scale Kannada image-caption dataset existed; prior Kannada captioning was limited to small, non-standardized datasets without attention mechanisms or semantic evaluation; standard word-level metrics like BLEU and METEOR are poorly calibrated for agglutinative languages; and no prior work verified whether generated captions semantically preserve the original image meaning.",
            approach:
                "A four-stage pipeline: construct the corpus by translating MS COCO 2017 English captions to Kannada with IndicTrans2-1B (beam search k=5); preprocess images to 224×224 with ImageNet normalization and text to Unicode NFC character tokens (129-token vocabulary); train six encoder-decoder models end-to-end with teacher forcing, AdamW, cosine annealing and label smoothing (0.10), spanning CNN-RNN and transformer families; and evaluate with character-level SacreBLEU, chrF, METEOR, CIDEr and back-translation BERTScore.",
            results:
                "The resulting KIC-COCO dataset holds 250,000 Kannada captions across 50,000 images. The best model, ConvNeXtTransformer, achieves a character-level SacreBLEU-4 of 68.65, chrF of 43.20 and a back-translation BERTScore of 84.02 — improving word-level BLEU-4 over prior Kannada captioning work from 7.26 to 43.57.",
            tech:  ["PyTorch", "CLIP", "EfficientNet", "ConvNeXt", "Swin-T", "ViT", "IndicTrans2", "IndicBART", "BERTScore", "CUDA"],
            href: "https://github.com/lucky07-07/KIC-COCO-Kannada-Image-Captioning",
            links: {
                github: "https://github.com/lucky07-07/KIC-COCO-Kannada-Image-Captioning",
            },
        },
        {
            title: "Scalable Multi-Domain Geospatial Monitoring System",
            description:
                "A real-time geospatial intelligence platform that tracks satellites, aircraft, and weather from live public data sources, streams them through Kafka, persists them to PostGIS, visualizes them in a mode-switched dashboard, and layers a predictive ML service and a Spark analytics layer on top..",
            problemStatement:
                "Real-time situational awareness across satellites, aircraft and weather normally means stitching together separate, domain-specific tools. The challenge is to ingest live public data from all three domains, map it onto one canonical telemetry model, and serve it — with prediction and analytics — continuously and at scale.",
            approach:
                "Live data from keyless / OAuth2 public APIs (CelesTrak, OpenSky, Open-Meteo, RainViewer) is mapped to a canonical telemetry envelope and published onto Kafka. A FastAPI backend persists it to PostgreSQL/PostGIS, keeps an in-memory snapshot, and fans it out over WebSocket to a mode-switched React dashboard. A separate ML service publishes forecasts, congestion grids, anomalies and conjunction screening, while a PySpark layer runs streaming aggregation, KMeans hotspots, robust-z anomaly scoring and XGBoost/GBT risk forecasting — built across five phases.",
            results:
                "A live validation snapshot (2026-05-15) reports the full stack healthy, ingesting 126 satellites, 1,512 aircraft and 6 weather sources, and publishing 100 satellite forecasts and 459 aircraft forecasts (121 aircraft anomalies) per cycle. All six ML tasks run on always-active physics/statistical baselines, with the deep architectures present in code ready to auto-upgrade once trained.",
            tech: ["Kafka", "PyTorch", "PySpark", "React","PostgreSQL", "Docker"," FastAPI"],
            href: "https://github.com/lucky07-07/geospatial-monitoring-system",
            links: {
                github: "https://github.com/lucky07-07/geospatial-monitoring-system",
                paper: "https://github.com/lucky07-07/geospatial-monitoring-system/blob/main/docs/IEEE_Project_Report.docx",
                demo: "https://github.com/lucky07-07/geospatial-monitoring-system/blob/main/docs/demo.gif",
            },
        },
        {
            title: "autonomous-carbon-k8s-scheduler",
            description:
                "lightweight autonomous AI agent that schedules Kubernetes workloads with explicit awareness of regional grid carbon intensity.",
            problemStatement:
                "Most Kubernetes schedulers optimize only for CPU and memory pressure and treat every second of compute as carbon-equivalent. In reality, electricity grids vary by hour and by region, so the same job can emit several times less CO₂ when it runs at a cleaner time or in a cleaner region.",
            approach:
                "SustainSched is a lightweight autonomous agent that schedules Kubernetes workloads by regional grid carbon intensity. It combines an offline XGBoost forecaster (selected against LSTM and GRU on historical UK grid data), live multi-region data from the UK National Grid ESO Carbon Intensity API, a local Llama 3.2 3B model served through Ollama for explainable reasoning, and a single-agent LangGraph workflow that ranks fourteen UK distribution regions, reconciles rule-based scores with the LLM rationale, and emits transparent decisions persisted to SQLite and exposed through Prometheus and Grafana.",
            results:
                "Across the three forecasters, XGBoost won on the held-out set with MAE 7.16, RMSE 9.29, MAPE 9.03 % and R² 0.917 (versus GRU R² 0.890 and LSTM R² 0.854) and was persisted for the agent to consume. The agent emits deploy / delay / migrate / rebalance actions, and the whole system is designed to run on a laptop-class RTX 2060 (6 GB).",
            tech: ["Python","PyTorch" ,"Docker", "LangGraph","langchain","FastAPI","Kubernetes", "Linux"],
            href: "https://github.com/lucky07-07/autonomous-carbon-k8s-scheduler",
            links: {
                github: "https://github.com/lucky07-07/autonomous-carbon-k8s-scheduler",
                paper: "https://github.com/lucky07-07/autonomous-carbon-k8s-scheduler/blob/main/paper/SustainSched_IEEE.docx",
            },
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);
    const activeProject = openIndex !== null ? projects[openIndex] : null;

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

                        <div className="mt-auto pt-1 flex items-center gap-5">
                            <button
                                type="button"
                                onClick={() => setOpenIndex(index)}
                                className="flex items-center gap-1 text-[#9f9f9f] hover:text-[#f0c674] transition-colors duration-200 cursor-pointer w-fit"
                            >
                                <span className="text-[10px] uppercase tracking-[0.2em]">Overview</span>
                            </button>

                            <a
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[#9f9f9f] hover:text-[#f0c674] transition-colors duration-200 cursor-pointer group/link w-fit"
                            >
                                <span className="text-[10px] uppercase tracking-[0.2em]">GitHub</span>
                                <ArrowUpRight
                                    size={10}
                                    className="transition-transform duration-200 group-hover/link:translate-x-px group-hover/link:-translate-y-px"
                                />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Overview modal */}
            <AnimatePresence>
                {activeProject && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setOpenIndex(null)}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.94 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="futuristic-card relative w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 flex flex-col gap-4"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <p className="text-[9px] uppercase tracking-[0.28em] text-[#f0c674]">
                                    Project {String(openIndex + 1).padStart(2, "0")}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(null)}
                                    aria-label="Close overview"
                                    className="shrink-0 -mt-1 -mr-1 text-[#9f9f9f] hover:text-[#f0c674] transition-colors duration-200 cursor-pointer"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <h3 className="text-[18px] font-bold leading-snug text-[#f5f5f5]">
                                {activeProject.title}
                            </h3>

                            <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#9f9f9f] mb-2">
                                    Problem
                                </p>
                                <p className="text-[13px] text-[#c8c8c8] leading-relaxed">
                                    {activeProject.problemStatement}
                                </p>
                            </div>

                            <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#9f9f9f] mb-2">
                                    Approach
                                </p>
                                <p className="text-[13px] text-[#c8c8c8] leading-relaxed">
                                    {activeProject.approach}
                                </p>
                            </div>

                            <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#9f9f9f] mb-2">
                                    Results
                                </p>
                                <ul className="flex flex-col gap-1.5">
                                    {activeProject.results
                                        .split(/\.\s+/)
                                        .map((line) => line.replace(/\.$/, "").trim())
                                        .filter(Boolean)
                                        .map((line, i) => (
                                            <li
                                                key={i}
                                                className="flex gap-2 text-[13px] text-[#c8c8c8] leading-relaxed"
                                            >
                                                <span className="text-[#9f9f9f]">–</span>
                                                <span>{line}</span>
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#9f9f9f] mb-2">
                                    Tech Stack
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {activeProject.tech.map((item, i) => (
                                        <span
                                            key={i}
                                            className="text-[9px] bg-white/[0.04] text-[#9f9f9f] px-2 py-0.5 rounded-full border border-white/[0.07]"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px w-full bg-white/[0.08]" />

                            <div className="flex flex-wrap items-center gap-5">
                                <a
                                    href={activeProject.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-[#9f9f9f] hover:text-[#f0c674] transition-colors duration-200 cursor-pointer group/link w-fit"
                                >
                                    <GithubMark size={12} />
                                    <span className="text-[10px] uppercase tracking-[0.2em]">View on GitHub</span>
                                    <ArrowUpRight
                                        size={10}
                                        className="transition-transform duration-200 group-hover/link:translate-x-px group-hover/link:-translate-y-px"
                                    />
                                </a>

                                {activeProject.links.paper && (
                                    <a
                                        href={activeProject.links.paper}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-[#9f9f9f] hover:text-[#f0c674] transition-colors duration-200 cursor-pointer group/paper w-fit"
                                    >
                                        <span className="text-[10px] uppercase tracking-[0.2em]">Read paper</span>
                                        <ArrowUpRight
                                            size={10}
                                            className="transition-transform duration-200 group-hover/paper:translate-x-px group-hover/paper:-translate-y-px"
                                        />
                                    </a>
                                )}

                                {activeProject.links.demo && (
                                    <a
                                        href={activeProject.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-[#9f9f9f] hover:text-[#f0c674] transition-colors duration-200 cursor-pointer group/demo w-fit"
                                    >
                                        <span className="text-[10px] uppercase tracking-[0.2em]">Live demo</span>
                                        <ArrowUpRight
                                            size={10}
                                            className="transition-transform duration-200 group-hover/demo:translate-x-px group-hover/demo:-translate-y-px"
                                        />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
