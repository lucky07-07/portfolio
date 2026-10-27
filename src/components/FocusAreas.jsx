import { motion } from "framer-motion";
import { Eye, MessageSquareText, Bot, HeartPulse, LineChart, Cloud } from "lucide-react";

const AREAS = [
    { icon: Eye,               label: "Computer Vision",        note: "ViT · Swin · ConvNeXt",  level: 92 },
    { icon: HeartPulse,        label: "Medical Imaging",        note: "MRI · DICOM · 2.5D",     level: 85 },
    { icon: MessageSquareText, label: "NLP & LLMs",             note: "RAG · labelling · MT",   level: 88 },
    { icon: Bot,               label: "Agentic AI",             note: "LangGraph · tool use",   level: 82 },
    { icon: LineChart,         label: "Applied ML & Analytics", note: "boosting · SHAP · BI",   level: 90 },
    { icon: Cloud,             label: "MLOps & Cloud",          note: "AWS · Docker · FastAPI", level: 78 },
];

export default function FocusAreas() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="panel h-full p-5 sm:p-6"
        >
            <p className="eyebrow"><span className="text-ink4">//</span> focus.weights</p>
            <h3 className="mt-2 text-lg font-bold">Focus Areas</h3>

            <div className="mt-5 space-y-4">
                {AREAS.map(({ icon: Icon, label, note, level }, i) => (
                    <div key={label}>
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-cyan/[0.06]">
                                    <Icon size={14} className="text-cyan" />
                                </span>
                                <div>
                                    <p className="text-[13px] font-medium text-ink">{label}</p>
                                    <p className="font-mono text-[10px] text-ink4">{note}</p>
                                </div>
                            </div>
                            <span className="font-mono text-[11px] text-ink3">{(level / 100).toFixed(2)}</span>
                        </div>
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${level}%` }}
                                transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: "easeOut" }}
                                className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
