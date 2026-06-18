import { motion } from "framer-motion";

const TechLogos = {
  Python: () => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path d="M11.9 2C7.5 2 7.8 4 7.8 4l.01 2.1h4.3v.65H5.5S2 6.4 2 11s2.6 4.4 2.6 4.4h1.55v-2.1s-.08-2.6 2.5-2.6H13s2.5.05 2.5-2.4V4.3S16 2 11.9 2zm-2.2 1.25c.45 0 .82.36.82.8a.82.82 0 1 1-.82-.8z" fill="#3776AB"/>
      <path d="M12.1 22c4.4 0 4.1-2 4.1-2l-.01-2.1h-4.3v-.65h6.61S22 17.6 22 13s-2.6-4.4-2.6-4.4h-1.55v2.1s.08 2.6-2.5 2.6H11s-2.5-.05-2.5 2.4v3.95S8 22 12.1 22zm2.2-1.25a.82.82 0 1 1 0-1.64.82.82 0 0 1 0 1.64z" fill="#FFD43B"/>
    </svg>
  ),
  PyTorch: () => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path d="M12.5 2L7 7.5a7.5 7.5 0 000 10.6 7.5 7.5 0 0010.6 0 7.5 7.5 0 000-10.6L16 9.1a3.5 3.5 0 010 4.95 3.5 3.5 0 01-4.95 0A3.5 3.5 0 0111 9.1l1.5-1.5V2zm1.7 3.4a.85.85 0 110 1.7.85.85 0 010-1.7z" fill="#EE4C2C"/>
    </svg>
  ),
  TensorFlow: () => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path d="M2 6.2L10.2 1.5v21l-3.3-1.9V8L2 11V6.2zm20 0l-8.2-4.7v8.2l8.2-4.8V6.2zm0 3.2L13.8 11v2.8l8.2-4.8V9.4zm0 5.5l-8.2 1.7v3.1l8.2-4.8v.1z" fill="#FF6F00"/>
    </svg>
  ),
  HuggingFace: () => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <circle cx="12" cy="12" r="9" fill="#FFD21E"/>
      <circle cx="9.5" cy="10" r="1" fill="#333"/>
      <circle cx="14.5" cy="10" r="1" fill="#333"/>
      <path d="M9.5 14.5c.7 1 4.5 1 5 0" stroke="#333" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
      <path d="M8.5 8C7.7 7 6.3 7 5.8 8.5" stroke="#333" strokeWidth=".9" strokeLinecap="round" fill="none"/>
      <path d="M15.5 8c.8-1 2.2-1 2.7.5" stroke="#333" strokeWidth=".9" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  OpenCV: () => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <circle cx="12" cy="13.5" r="3" fill="#5C3EE8"/>
      <path d="M12 7.5A6 6 0 006 13.5" stroke="#5C3EE8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".55"/>
      <circle cx="6.5" cy="7" r="2.5" fill="#EE4C2C"/>
      <circle cx="17.5" cy="7" r="2.5" fill="#2FBF44"/>
    </svg>
  ),
  spaCy: () => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path d="M12 2.5L3.5 7.3v9.4L12 21.5l8.5-4.8V7.3L12 2.5z" fill="#09A3D5"/>
      <path d="M12 7L8 9.3v5.4l4 2.3 4-2.3V9.3L12 7z" fill="none" stroke="white" strokeWidth="1" opacity=".35"/>
    </svg>
  ),
  FastAPI: () => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <circle cx="12" cy="12" r="10" fill="#009688"/>
      <path d="M13.5 5.5L9 13h5l-1.5 6.5 6.5-9.5H14l2.5-4.5h-3z" fill="white"/>
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#2496ED">
      <rect x="2.5" y="10.5" width="2.5" height="2" rx=".4"/>
      <rect x="5.5" y="10.5" width="2.5" height="2" rx=".4"/>
      <rect x="8.5" y="10.5" width="2.5" height="2" rx=".4"/>
      <rect x="11.5" y="10.5" width="2.5" height="2" rx=".4"/>
      <rect x="5.5" y="8" width="2.5" height="2" rx=".4"/>
      <rect x="8.5" y="8" width="2.5" height="2" rx=".4"/>
      <rect x="8.5" y="5.5" width="2.5" height="2" rx=".4"/>
      <path d="M20.9 11.3c-.45-2.1-2.35-3.6-4.55-3.3-.3-1.2-1.1-2.1-2.1-2.7v1.55c.65.42 1.05 1.15 1.05 1.95v.45H5.2C5.2 13.3 6.7 15 9.1 15h8c1.9 0 3.5-1.55 3.8-3.7z"/>
    </svg>
  ),
  AWS: () => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path d="M7.1 10.8L5.9 14.5H5l2.4-6.8H8l2.5 6.8h-.9l-1.3-3.7H7.1zm-.15-1.1H8.6l-.38-1.1c-.18-.5-.32-.95-.42-1.38-.12.44-.27.9-.45 1.4l-.38 1.08z" fill="#FF9900"/>
      <path d="M12.1 10.4l1.1 3.15 1.1-3.15h.82l-1.55 4.1h-.74l-1.55-4.1h.82z" fill="#FF9900"/>
      <path d="M5.2 18.5C3.3 17.7 2 15.9 2 13.8c0-1.45.65-2.75 1.65-3.65V8.7C2 9.75 1 11.65 1 13.8c0 2.85 1.75 5.3 4.3 6.35L5.2 18.5zm13.6 0c1.9-.8 3.2-2.6 3.2-4.7 0-1.3-.5-2.5-1.4-3.4v1.35c.6.75.95 1.7.95 2.7 0 1.4-.72 2.65-1.85 3.4l.1 1.65z" fill="#FF9900"/>
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path d="M12 2c-4.2 8-2 13.5 0 17 .45.72.72 1.42.72 2.05 0 .28-.22.45-.72.45v2.5h1.5v-2.5c-.5 0-.72-.17-.72-.45 0-.62.27-1.32.72-2.05C15.5 15.5 17.5 10 12 2z" fill="#47A248"/>
    </svg>
  ),
  Kafka: () => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <circle cx="12" cy="4.5" r="2" fill="#999"/>
      <circle cx="4.5" cy="18.5" r="2" fill="#999"/>
      <circle cx="19.5" cy="18.5" r="2" fill="#999"/>
      <circle cx="12" cy="12.5" r="3.2" fill="none" stroke="#999" strokeWidth="1.4"/>
      <line x1="12" y1="6.5" x2="12" y2="9.3" stroke="#999" strokeWidth="1.4"/>
      <line x1="9.6" y1="15.1" x2="6.2" y2="17.1" stroke="#999" strokeWidth="1.4"/>
      <line x1="14.4" y1="15.1" x2="17.8" y2="17.1" stroke="#999" strokeWidth="1.4"/>
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(120 12 12)"/>
    </svg>
  ),
};

const skillGroups = [
  { id: "ml",       category: "Machine Learning", techs: ["Python", "PyTorch", "HuggingFace"] },
  { id: "dl",       category: "Deep Learning",    techs: ["TensorFlow", "PyTorch", "Python"]  },
  { id: "nlp",      category: "NLP & Vision",     techs: ["OpenCV", "spaCy", "HuggingFace"]  },
  { id: "backend",  category: "Backend & Cloud",  techs: ["AWS", "Docker", "FastAPI"]         },
];

const allTechs = [
  "Python", "PyTorch", "TensorFlow", "HuggingFace",
  "OpenCV", "spaCy", "FastAPI", "Docker",
  "AWS", "MongoDB", "Kafka", "React",
];

export default function Skills() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            viewport={{ once: true }}
            whileHover={{ y: -2, transition: { duration: 0.18 } }}
            className="futuristic-card neon-hover p-5 flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f0c674]/60 shrink-0" />
              <span className="text-[11px] font-medium text-[#d1d1d1] tracking-wide">
                {group.category}
              </span>
            </div>

            <div className="flex items-start gap-3">
              {group.techs.map((tech) => {
                const Logo = TechLogos[tech];
                return Logo ? (
                  <div key={tech} className="flex flex-col items-center gap-1.5">
                    <div className="
                      h-10 w-10 rounded-xl flex items-center justify-center
                      border border-white/[0.06] bg-white/[0.03]
                      hover:border-white/[0.10] hover:bg-white/[0.06]
                      transition-all duration-200 cursor-default
                    ">
                      <Logo />
                    </div>
                    <span className="text-[9px] text-[#9f9f9f] whitespace-nowrap">{tech}</span>
                  </div>
                ) : null;
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        viewport={{ once: true }}
        className="mt-4 futuristic-card px-5 py-3 flex items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#9f9f9f] shrink-0 whitespace-nowrap">
          All tools
        </span>
        <div className="h-3 w-px bg-white/[0.07] shrink-0" />
        <div className="flex items-center gap-2 flex-wrap">
          {allTechs.map((tech) => {
            const Logo = TechLogos[tech];
            return Logo ? (
              <div
                key={tech}
                title={tech}
                className="
                  h-7 w-7 rounded-lg flex items-center justify-center
                  border border-white/[0.05] bg-white/[0.03]
                  hover:bg-white/[0.06] hover:border-white/[0.09]
                  transition-all duration-200 cursor-default
                "
              >
                <Logo />
              </div>
            ) : null;
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}
