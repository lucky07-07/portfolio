import SectionHeader from "./SectionHeader";
import NetworkDiagram from "./NetworkDiagram";

const PRINCIPLES = [
    { k: "data_first",  v: "Better labels beat bigger backbones." },
    { k: "honest_eval", v: "Time-aware splits, leakage audits, baselines, CIs." },
    { k: "ship_it",     v: "APIs, Docker and live demos, not just notebooks." },
    { k: "explainable", v: "SHAP, Grad-CAM and cited answers." },
];

export default function About() {
    return (
        <div>
            <SectionHeader
                index="01"
                tag="about"
                title={<>Engineer by training, <span className="em">researcher by habit.</span></>}
            />

            <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <div>
                    <div className="space-y-5 text-[17px] leading-[1.75] text-ink2 sm:text-[18px]">
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
                </div>

                <div className="card p-6 sm:p-8">
                    <p className="mb-4 font-mono text-[11px] text-ink4">
                        model.summary() <span className="text-ink3">· inputs → hidden → me</span>
                    </p>
                    <NetworkDiagram />
                </div>
            </div>

            {/* operating principles */}
            <div className="mt-14">
                <p className="eyebrow mb-4">config.yaml · operating principles</p>
                <div className="grid overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 1 }}>
                    {PRINCIPLES.map(({ k, v }, i) => (
                        <div key={k} className="bg-paper p-6 transition-colors hover:bg-raised sm:p-7">
                            <p className="font-mono text-[11px] text-accent">
                                <span className="text-ink4">0{i + 1} · </span>{k}
                            </p>
                            <p className="mt-8 font-display text-[1.45rem] leading-[1.2] text-ink">{v}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
