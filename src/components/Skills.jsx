import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

// Logo sources: devicon (jsDelivr) + simple-icons CDN. Any that fail to load
// fall back to a plain name tag (see SkillTile).
const devicon = (path) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;
const simple = (slug, color) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;

const groups = [
  {
    id: "dl",
    label: "Deep Learning",
    cmd: "import torch",
    skills: [
      { name: "Python",       logo: devicon("python/python-original.svg") },
      { name: "PyTorch",      logo: devicon("pytorch/pytorch-original.svg") },
      { name: "TensorFlow",   logo: devicon("tensorflow/tensorflow-original.svg") },
      { name: "JAX",          logo: simple("jax", "A78BFA") },
      { name: "CUDA",         logo: simple("nvidia", "76B900") },
      { name: "timm",         logo: null },
      { name: "Optuna",       logo: null },
    ],
  },
  {
    id: "genai",
    label: "LLMs & Agents",
    cmd: "from langgraph import StateGraph",
    skills: [
      { name: "Hugging Face", logo: simple("huggingface", "FFD21E") },
      { name: "LangChain",    logo: simple("langchain", "FFFFFF") },
      { name: "LangGraph",    logo: simple("langgraph", "FFFFFF") },
      { name: "Ollama",       logo: simple("ollama", "FFFFFF") },
      { name: "RAG",          logo: null },
      { name: "LanceDB",      logo: null },
      { name: "Prompting",    logo: null },
    ],
  },
  {
    id: "cvnlp",
    label: "Vision & Language",
    cmd: "model = ViT_B_16(weights='SWAG')",
    skills: [
      { name: "OpenCV",       logo: devicon("opencv/opencv-original.svg") },
      { name: "Kornia",       logo: null },
      { name: "spaCy",        logo: simple("spacy", "09A3D5") },
      { name: "CLIP",         logo: null },
      { name: "Transformers", logo: null },
      { name: "DICOM",        logo: null },
    ],
  },
  {
    id: "data",
    label: "Applied ML & Data",
    cmd: "df = duckdb.sql(q).df()",
    skills: [
      { name: "scikit-learn", logo: devicon("scikitlearn/scikitlearn-original.svg") },
      { name: "XGBoost",      logo: null },
      { name: "CatBoost",     logo: null },
      { name: "pandas",       logo: devicon("pandas/pandas-original.svg") },
      { name: "DuckDB",       logo: simple("duckdb", "FFF000") },
      { name: "PySpark",      logo: simple("apachespark", "E25A1C") },
      { name: "Power BI",     logo: null },
      { name: "SHAP",         logo: null },
    ],
  },
  {
    id: "mlops",
    label: "MLOps & Cloud",
    cmd: "docker compose up -d",
    skills: [
      { name: "AWS",          logo: devicon("amazonwebservices/amazonwebservices-original-wordmark.svg") },
      { name: "Docker",       logo: devicon("docker/docker-original.svg") },
      { name: "Kubernetes",   logo: devicon("kubernetes/kubernetes-original.svg") },
      { name: "FastAPI",      logo: devicon("fastapi/fastapi-original.svg") },
      { name: "Kafka",        logo: simple("apachekafka", "FFFFFF") },
      { name: "PostgreSQL",   logo: devicon("postgresql/postgresql-original.svg") },
      { name: "Prometheus",   logo: devicon("prometheus/prometheus-original.svg") },
      { name: "Linux",        logo: devicon("linux/linux-original.svg") },
      { name: "Git",          logo: devicon("git/git-original.svg") },
    ],
  },
  {
    id: "web",
    label: "Frontend",
    cmd: "npm run dev",
    skills: [
      { name: "React",        logo: devicon("react/react-original.svg") },
      { name: "Next.js",      logo: simple("nextdotjs", "FFFFFF") },
      { name: "TypeScript",   logo: devicon("typescript/typescript-original.svg") },
      { name: "Tailwind CSS", logo: simple("tailwindcss", "06B6D4") },
      { name: "D3.js",        logo: simple("d3", "F9A03C") },
    ],
  },
];

// Logo + name pill; a missing or broken logo falls back to a dot.
function SkillTile({ name, logo }) {
  const [errored, setErrored] = useState(false);
  const showLogo = logo && !errored;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-2.5 py-1.5 transition-colors hover:border-cyan/40 hover:bg-cyan/[0.05]">
      {showLogo ? (
        <img
          src={logo}
          alt=""
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-4 w-4 object-contain"
        />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-cyan/70" />
      )}
      <span className="text-[12.5px] text-ink2">{name}</span>
    </div>
  );
}

export default function Skills() {
  const total = groups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <SectionHeader
        index="04"
        tag="stack"
        title="Tech Stack"
        subtitle="The tools behind the projects, grouped by where they sit in the ML lifecycle."
        right={<span className="chip">{total} tools · {groups.length} layers</span>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="panel panel-hover flex flex-col p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold">{g.label}</h3>
              <span className="font-mono text-[10px] text-ink4">0{i + 1}</span>
            </div>
            <p className="mt-1 truncate font-mono text-[11px] text-ink4">
              <span className="text-signal">$</span> {g.cmd}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <SkillTile key={s.name} name={s.name} logo={s.logo} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
