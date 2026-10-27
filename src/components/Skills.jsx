import { useState } from "react";
import SectionHeader from "./SectionHeader";

// Logo sources: devicon (jsDelivr) + simple-icons CDN. Any that fail to load
// fall back to a dot (see SkillTile).
const devicon = (path) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;
const simple = (slug, color) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;

// One home per tool: no tool appears in two groups.
const groups = [
  {
    id: "model",
    label: "Modeling",
    note: "train & evaluate",
    skills: [
      { name: "Python",       logo: devicon("python/python-original.svg") },
      { name: "PyTorch",      logo: devicon("pytorch/pytorch-original.svg") },
      { name: "TensorFlow",   logo: devicon("tensorflow/tensorflow-original.svg") },
      { name: "scikit-learn", logo: devicon("scikitlearn/scikitlearn-original.svg") },
      { name: "XGBoost",      logo: null },
      { name: "OpenCV",       logo: devicon("opencv/opencv-original.svg") },
    ],
  },
  {
    id: "llm",
    label: "LLMs & Agents",
    note: "retrieve, reason, act",
    skills: [
      { name: "Hugging Face", logo: simple("huggingface", "FFD21E") },
      { name: "LangChain",    logo: simple("langchain", "FFFFFF") },
      { name: "LangGraph",    logo: simple("langgraph", "FFFFFF") },
      { name: "Ollama",       logo: simple("ollama", "FFFFFF") },
    ],
  },
  {
    id: "data",
    label: "Data",
    note: "store, stream, analyse",
    skills: [
      { name: "pandas",       logo: devicon("pandas/pandas-original.svg") },
      { name: "DuckDB",       logo: simple("duckdb", "FFF000") },
      { name: "PySpark",      logo: simple("apachespark", "E25A1C") },
      { name: "Kafka",        logo: simple("apachekafka", "FFFFFF") },
      { name: "PostgreSQL",   logo: devicon("postgresql/postgresql-original.svg") },
    ],
  },
  {
    id: "ship",
    label: "Deploy",
    note: "serve & scale",
    skills: [
      { name: "AWS",          logo: devicon("amazonwebservices/amazonwebservices-original-wordmark.svg") },
      { name: "Docker",       logo: devicon("docker/docker-original.svg") },
      { name: "Kubernetes",   logo: devicon("kubernetes/kubernetes-original.svg") },
      { name: "FastAPI",      logo: devicon("fastapi/fastapi-original.svg") },
      { name: "React",        logo: devicon("react/react-original.svg") },
      { name: "Git",          logo: devicon("git/git-original.svg") },
    ],
  },
];

// Logo + name tile; a missing or broken logo falls back to a dot.
function SkillTile({ name, logo }) {
  const [errored, setErrored] = useState(false);
  const showLogo = logo && !errored;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-4 py-3 transition-colors hover:border-ember/40 hover:bg-ember/[0.05]">
      {showLogo ? (
        <img src={logo} alt="" loading="lazy" onError={() => setErrored(true)} className="h-5 w-5 object-contain" />
      ) : (
        <span className="flex h-5 w-5 items-center justify-center"><span className="h-2 w-2 rounded-full bg-ember/80" /></span>
      )}
      <span className="text-[14.5px] text-ink2">{name}</span>
    </div>
  );
}

export default function Skills() {
  return (
    <div>
      <SectionHeader
        index="05"
        tag="stack"
        title="Tech Stack"
        subtitle="The core tools behind the projects, one home per tool, grouped by stage of the ML lifecycle."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((g, i) => (
          <div key={g.id} className="panel panel-hover p-7">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xl font-semibold">{g.label}</h3>
              <span className="font-mono text-[11.5px] text-ink4">L{i + 1} · {g.note}</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {g.skills.map((s) => (
                <SkillTile key={s.name} name={s.name} logo={s.logo} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
