import SectionHeader from "./SectionHeader";
import NetworkDiagram from "./NetworkDiagram";

const PRINCIPLES = [
    { k: "data_first",  v: "Better labels beat bigger backbones." },
    { k: "honest_eval", v: "Time-aware splits, leakage audits, baselines, CIs." },
    { k: "ship_it",     v: "APIs, Docker and live demos, not just notebooks." },
    { k: "explainable", v: "SHAP, Grad-CAM and cited answers." },
];

export default function About({ onNavigate }) {
    return (
        <div>
            <SectionHeader
                index="01"
                tag="about"
                title={<>Engineer by training, <span className="text-grad">researcher by habit.</span></>}
            />

            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <div>
                    <div className="space-y-5 text-[17px] leading-[1.75] text-ink2">
                        <p>
                            I&apos;m Anil, an AI / ML Engineer doing an M.Tech in Data Science at Amrita Vishwa
                            Vidyapeetham, Bengaluru. I work across computer vision and medical imaging,
                            multimodal and low-resource NLP, and LLM-powered agents.
                        </p>
                        <p className="text-ink3">
                            I like problems where the data is messy and the evaluation has to be honest:
                            labelling multilingual radiology reports with an LLM, building the first
                            COCO-scale Kannada captioning dataset, or teaching an agent to audit its own claims.
                        </p>
                    </div>

                    <div className="mt-9 overflow-x-auto rounded-2xl border border-line bg-void/60 p-5 font-mono text-[13px] leading-8">
                        <p className="text-ink4"># config.yaml</p>
                        {PRINCIPLES.map(({ k, v }) => (
                            <p key={k} className="whitespace-nowrap text-ink3">
                                <span className="text-rose">{k}</span>
                                <span className="text-ink4">: </span>
                                <span className="text-ink2">&quot;{v}&quot;</span>
                            </p>
                        ))}
                    </div>

                    <div className="mt-9 flex flex-wrap gap-3">
                        <button onClick={() => onNavigate("projects")} className="btn-primary">View projects</button>
                        <button onClick={() => onNavigate("contact")} className="btn-ghost">Get in touch</button>
                    </div>
                </div>

                <div className="panel p-6 sm:p-8">
                    <p className="mb-4 font-mono text-[11.5px] text-ink4">
                        model.summary() <span className="text-ink3">· inputs → hidden → me</span>
                    </p>
                    <NetworkDiagram />
                </div>
            </div>
        </div>
    );
}
