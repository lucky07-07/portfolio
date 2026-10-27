import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const PRINCIPLES = [
    { k: "data_first",   v: "Better labels beat bigger backbones. I measure label quality before tuning models." },
    { k: "honest_eval",  v: "Time-aware splits, leakage audits, bootstrap CIs and baselines in every project." },
    { k: "ship_it",      v: "FastAPI services, Docker, dashboards and live demos rather than notebooks alone." },
    { k: "explainable",  v: "SHAP, Grad-CAM, cited RAG answers and transparent agent decisions." },
];

export default function About({ onNavigate }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="panel p-5 sm:p-8"
        >
            <SectionHeader index="01" tag="about" title={<>Engineer by training, <span className="text-grad">researcher by habit.</span></>} />

            <div className="space-y-4 text-[15px] leading-relaxed text-ink2">
                <p>
                    I&apos;m Anil Kumar, an AI / ML Engineer pursuing an M.Tech in Data Science at Amrita
                    Vishwa Vidyapeetham, Bengaluru. My work spans deep learning for computer vision and
                    medical imaging, multimodal and low-resource NLP, and LLM-powered agents.
                </p>
                <p className="text-ink3">
                    Recent work includes a top-tier RSNA knee-MRI pipeline that uses an LLM to label
                    multilingual radiology reports, the first COCO-scale Kannada captioning benchmark,
                    and a self-auditing AI news agent. I like problems where the data is messy and the
                    evaluation has to be honest.
                </p>
            </div>

            {/* principles as a config block */}
            <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-void/60 p-4 font-mono text-[12.5px] leading-7">
                <p className="text-ink4"># how_i_work.yaml</p>
                {PRINCIPLES.map(({ k, v }) => (
                    <p key={k} className="text-ink3">
                        <span className="text-violet">{k}</span>
                        <span className="text-ink4">: </span>
                        <span className="text-ink2">&quot;{v}&quot;</span>
                    </p>
                ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => onNavigate("projects")} className="btn-primary">View projects</button>
                <button onClick={() => onNavigate("contact")} className="btn-ghost">Get in touch</button>
            </div>
        </motion.section>
    );
}
