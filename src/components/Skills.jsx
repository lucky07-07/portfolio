import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Logo sources: devicon (jsDelivr) + simple-icons CDN. Any that fail to load
// fall back to a plain name tag (see SkillTile / CompactTile).
const devicon = (path) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;
const simple = (slug, color) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;

// OpenAI has no usable colored CDN logo (it renders black on the dark card),
// so render its mark inline in a light fill instead.
function OpenAiMark({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="#f5f5f5" aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

const categories = [
  { id: "ml",       label: "Machine Learning" },
  { id: "genai",    label: "Generative AI" },
  { id: "cvnlp",    label: "Computer Vision & NLP" },
  { id: "backend",  label: "Backend & Cloud" },
  { id: "frontend", label: "Frontend" },
];

// Only skills with a usable logo are listed (LlamaIndex / YOLO removed — no logo).
const skills = [
  // Machine Learning
  { name: "Python",       category: "ml",       logo: devicon("python/python-original.svg") },
  { name: "PyTorch",      category: "ml",       logo: devicon("pytorch/pytorch-original.svg") },
  { name: "TensorFlow",   category: "ml",       logo: devicon("tensorflow/tensorflow-original.svg") },
  { name: "scikit-learn", category: "ml",       logo: devicon("scikitlearn/scikitlearn-original.svg") },

  // Generative AI
  { name: "Hugging Face", category: "genai",    logo: simple("huggingface", "FFD21E") },
  { name: "OpenAI",       category: "genai",    logo: OpenAiMark },
  { name: "LangChain",    category: "genai",    logo: simple("langchain", "FFFFFF") },

  // Computer Vision & NLP
  { name: "OpenCV",       category: "cvnlp",    logo: devicon("opencv/opencv-original.svg") },
  { name: "spaCy",        category: "cvnlp",    logo: simple("spacy", "09A3D5") },

  // Backend & Cloud
  { name: "FastAPI",      category: "backend",  logo: devicon("fastapi/fastapi-original.svg") },
  { name: "Docker",       category: "backend",  logo: devicon("docker/docker-original.svg") },
  { name: "Kafka",        category: "backend",  logo: simple("apachekafka", "FFFFFF") },
  { name: "PostgreSQL",   category: "backend",  logo: devicon("postgresql/postgresql-original.svg") },
  { name: "MongoDB",      category: "backend",  logo: devicon("mongodb/mongodb-original.svg") },
  { name: "AWS",          category: "backend",  logo: devicon("amazonwebservices/amazonwebservices-original-wordmark.svg") },
  { name: "Git",          category: "backend",  logo: devicon("git/git-original.svg") },
  { name: "Linux",        category: "backend",  logo: devicon("linux/linux-original.svg") },
  { name: "CUDA",         category: "backend",  logo: simple("nvidia", "76B900") },

  // Frontend
  { name: "React",        category: "frontend", logo: devicon("react/react-original.svg") },
  { name: "TypeScript",   category: "frontend", logo: devicon("typescript/typescript-original.svg") },
  { name: "Tailwind CSS", category: "frontend", logo: simple("tailwindcss", "06B6D4") },
  { name: "Vite",         category: "frontend", logo: devicon("vitejs/vitejs-original.svg") },
];

// Full-size tile used in the filtered grid: logo + name, falling back to a tag.
function SkillTile({ name, logo }) {
  const [errored, setErrored] = useState(false);
  const isComponent = typeof logo === "function";
  const showLogo = logo && (isComponent || !errored);

  if (!showLogo) {
    return (
      <div className="flex flex-col items-center justify-start">
        <span className="text-[10px] text-[#d1d1d1] bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-2 whitespace-nowrap">
          {name}
        </span>
      </div>
    );
  }

  const LogoComp = isComponent ? logo : null;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="
        h-10 w-10 rounded-xl flex items-center justify-center
        border border-white/[0.06] bg-white/[0.03]
        hover:border-white/[0.10] hover:bg-white/[0.06]
        transition-all duration-200 cursor-default
      ">
        {isComponent ? (
          <LogoComp size={22} />
        ) : (
          <img
            src={logo}
            alt={name}
            loading="lazy"
            onError={() => setErrored(true)}
            className="h-[22px] w-[22px] object-contain"
          />
        )}
      </div>
      <span className="text-[9px] text-[#9f9f9f] whitespace-nowrap">{name}</span>
    </div>
  );
}

// Compact icon used in the "All tools" strip: logo only, falling back to a tiny tag.
function CompactTile({ name, logo }) {
  const [errored, setErrored] = useState(false);
  const isComponent = typeof logo === "function";
  const showLogo = logo && (isComponent || !errored);

  if (!showLogo) {
    return (
      <span
        title={name}
        className="h-7 px-2 rounded-lg flex items-center justify-center border border-white/[0.05] bg-white/[0.03] text-[8px] text-[#9f9f9f] whitespace-nowrap"
      >
        {name}
      </span>
    );
  }

  const LogoComp = isComponent ? logo : null;

  return (
    <div
      title={name}
      className="
        h-7 w-7 rounded-lg flex items-center justify-center
        border border-white/[0.05] bg-white/[0.03]
        hover:bg-white/[0.06] hover:border-white/[0.09]
        transition-all duration-200 cursor-default
      "
    >
      {isComponent ? (
        <LogoComp size={16} />
      ) : (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-[16px] w-[16px] object-contain"
        />
      )}
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("ml");

  const visibleSkills = skills.filter((s) => s.category === activeTab);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-5 bg-white/[0.08] rounded-full" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#f0c674]">Stack</p>
        </div>
        <h2 className="text-[1.75rem] font-bold tracking-[-0.02em] text-[#f5f5f5]">
          Tech Stack
        </h2>
      </div>

      {/* Category filter tabs (top) */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`
                px-3 py-1.5 rounded-full border text-[11px] tracking-wide
                transition-all duration-200
                ${isActive
                  ? "text-[#f0c674] bg-[#f0c674]/[0.07] border-[#f0c674]/20"
                  : "text-[#c8c8c8] border-white/[0.06] hover:text-[#f0c674] hover:bg-white/[0.04] hover:border-white/[0.08]"
                }
              `}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filtered skills grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="futuristic-card neon-hover p-4 sm:p-6"
        >
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-x-3 gap-y-5">
            {visibleSkills.map((skill) => (
              <SkillTile key={skill.name} name={skill.name} logo={skill.logo} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* All tools strip (bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        viewport={{ once: true }}
        className="mt-4 futuristic-card px-4 sm:px-5 py-3 flex flex-wrap items-center gap-3 sm:gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#9f9f9f] shrink-0 whitespace-nowrap">
          All tools
        </span>
        <div className="h-3 w-px bg-white/[0.07] shrink-0" />
        <div className="flex items-center gap-2 flex-wrap">
          {skills.map((skill) => (
            <CompactTile key={skill.name} name={skill.name} logo={skill.logo} />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
