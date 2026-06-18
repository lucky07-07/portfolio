import { motion } from "framer-motion";

export default function About({ onNavigate }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            <div className="futuristic-card p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">

                {/* LEFT */}
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f0c674] font-medium">
                        About
                    </p>

                    <div className="mt-3">
                        <h2 className="text-[1.5rem] sm:text-[1.875rem] lg:text-[2.25rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#f5f5f5]">
                            Data Scientist
                            <span className="block text-[#f0c674]">& ML Engineer</span>
                        </h2>
                        <div className="mt-3 w-10 h-[2px] rounded-full bg-[#f0c674]/60" />
                    </div>

                    <p className="mt-5 text-[#c8c8c8] leading-relaxed text-[15px]">
                        I am Anil Kumar, a Data Scientist and Machine Learning Engineer pursuing a
                        Master's in Data Science. I design, train, and ship deep learning models —
                        and the APIs and interfaces that bring them to life.
                    </p>

                    <p className="mt-3.5 text-[#c8c8c8] leading-relaxed text-sm">
                        My work spans computer vision, natural language processing, and generative AI,
                        with a strong lean toward fine-grained recognition, low-resource languages, and
                        real-time intelligent systems. I build the full path: dataset construction, model
                        training, evaluation, and deployment behind clean serving layers.
                    </p>

                    <p className="mt-3.5 text-[#c8c8c8] leading-relaxed text-sm">
                        <span className="text-[#d1d1d1] font-medium">Core skills —</span>{" "}
                        deep learning, computer vision, NLP, model fine-tuning, transfer learning,
                        ensembling, hyperparameter optimization, data pipelines, model serving, and
                        full-stack integration.
                    </p>

                    <p className="mt-3.5 text-[#c8c8c8] leading-relaxed text-sm">
                        <span className="text-[#d1d1d1] font-medium">Modeling —</span>{" "}
                        PyTorch, TensorFlow, Hugging Face Transformers, scikit-learn, OpenCV, NumPy,
                        Pandas.{" "}
                        <span className="text-[#d1d1d1] font-medium">Serving —</span>{" "}
                        FastAPI, Docker, Kafka, PostgreSQL.{" "}
                        <span className="text-[#d1d1d1] font-medium">Frontend —</span>{" "}
                        React, Tailwind, TypeScript.{" "}
                        <span className="text-[#d1d1d1] font-medium">Workflow —</span>{" "}
                        Git, Linux, CUDA.
                    </p>

                    <p className="mt-3.5 text-[#9f9f9f] leading-relaxed text-sm">
                        Open to AI/ML internships, research collaborations, and engineering roles
                        where rigor matters.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            onClick={() => onNavigate("projects")}
                            className="
                                bg-[#f0c674] text-[#0f0f10]
                                px-5 py-2.5 rounded-[16px] font-medium text-sm
                                hover:bg-[#e6b85c] transition-colors duration-200
                            "
                        >
                            View Work
                        </button>
                        <button
                            onClick={() => onNavigate("contact")}
                            className="
                                bg-white/[0.05] border border-white/[0.08] text-[#d1d1d1]
                                px-5 py-2.5 rounded-[16px] text-sm
                                hover:bg-white/[0.08] hover:border-white/[0.12]
                                transition-all duration-200
                            "
                        >
                            Contact
                        </button>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="relative flex justify-center pt-2 hidden lg:flex">
                    <div className="absolute w-48 h-48 rounded-full bg-[#f0c674]/[0.04] blur-3xl" />

                    <div className="
                        relative w-48 h-48 rounded-full
                        border border-white/[0.07]
                        bg-[#131314]
                        flex items-center justify-center
                        shadow-[0_16px_40px_rgba(0,0,0,0.4)]
                    ">
                        <div className="absolute inset-4 rounded-full border border-white/[0.05]" />
                        <div className="text-center">
                            <h3 className="text-[2.75rem] font-bold text-[#f5f5f5]">AK</h3>
                            <p className="mt-2 text-[#c8c8c8] tracking-widest text-[10px]">ANIL KUMAR</p>
                        </div>
                    </div>
                </div>

            </div>
        </motion.section>
    );
}
