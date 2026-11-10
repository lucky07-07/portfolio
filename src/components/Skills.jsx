import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { devicon } from "../data/logos";

// Logo sources: devicon (jsDelivr) + simple-icons CDN. Any that fail to load
// fall back to a dot (see SkillTile).
const simple = (slug, color) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;

const INK = "181713";

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
      { name: "Hugging Face", logo: simple("huggingface", "E0A800") },
      { name: "LangChain",    logo: simple("langchain", INK) },
      { name: "LangGraph",    logo: simple("langgraph", INK) },
      { name: "Ollama",       logo: simple("ollama", INK) },
    ],
  },
  {
    id: "data",
    label: "Data",
    note: "store, stream, analyse",
    skills: [
      { name: "pandas",       logo: devicon("pandas/pandas-original.svg") },
      { name: "DuckDB",       logo: simple("duckdb", INK) },
      { name: "PySpark",      logo: simple("apachespark", "E25A1C") },
      { name: "Kafka",        logo: simple("apachekafka", INK) },
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

// Logo + name row; a missing or broken logo falls back to a dot.
function SkillTile({ name, logo }) {
  const [errored, setErrored] = useState(false);
  const showLogo = logo && !errored;

  return (
    <li className="group flex items-center gap-3.5 border-t border-line py-3 transition-colors hover:border-ink">
      {showLogo ? (
        <img src={logo} alt="" loading="lazy" onError={() => setErrored(true)} className="h-5 w-5 object-contain grayscale-[35%] transition group-hover:grayscale-0" />
      ) : (
        <span className="flex h-5 w-5 items-center justify-center"><span className="h-2 w-2 rounded-full bg-accent" /></span>
      )}
      <span className="text-[15px] text-ink2 transition-colors group-hover:text-ink">{name}</span>
    </li>
  );
}

export default function Skills() {
  return (
    <div>
      <SectionHeader
        index="06"
        tag="stack"
        title={<>Tech <span className="em">stack.</span></>}
        subtitle="The core tools behind the projects, one home per tool, grouped by stage of the ML lifecycle."
      />

      {/* four stages of the lifecycle, read left to right */}
      <div className="card grid overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g, i) => (
          <div
            key={g.id}
            className={`p-6 sm:p-7 ${i > 0 ? "border-t border-line" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${i > 1 ? "lg:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l" : ""} ${i > 0 ? "lg:border-l" : ""}`}
          >
            <p className="font-mono text-[11px] text-accent">L{i + 1} <span className="text-ink4">· {g.note}</span></p>
            <h3 className="mb-6 mt-3 text-[1.9rem] leading-none">{g.label}</h3>
            <ul>
              {g.skills.map((s) => (
                <SkillTile key={s.name} name={s.name} logo={s.logo} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
