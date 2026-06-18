import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import FocusAreas from "./components/FocusAreas";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MouseGlow from "./components/MouseGlow";
import {
  User,
  Brain,
  FolderKanban,
  GraduationCap,
  Mail,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Overview",  id: "overview",  icon: Sparkles      },
  { name: "About",     id: "about",     icon: User          },
  { name: "Skills",    id: "skills",    icon: Brain         },
  { name: "Projects",  id: "projects",  icon: FolderKanban  },
  { name: "Education", id: "education", icon: GraduationCap },
  { name: "Contact",   id: "contact",   icon: Mail          },
];

function SectionContent({ section, onNavigate }) {
  switch (section) {
    case "overview":
      return <Hero onNavigate={onNavigate} />;
    case "about":
      return (
        <div className="grid xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            <About onNavigate={onNavigate} />
          </div>
          <div>
            <FocusAreas />
          </div>
        </div>
      );
    case "skills":
      return <Skills />;
    case "projects":
      return <Projects />;
    case "education":
      return (
        <div className="space-y-5">
          <Education />
          <Certifications />
        </div>
      );
    case "contact":
      return <Contact />;
    default:
      return <Hero onNavigate={onNavigate} />;
  }
}

function App() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-[#0f0f10] text-[#d1d1d1] overflow-x-hidden">

      <MouseGlow />
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />

      <div className="pt-20 sm:pt-28 px-3 sm:px-4 lg:px-6 pb-6 max-w-[1800px] mx-auto">
        <div className="flex gap-5">

          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:flex w-[240px] shrink-0">
            <div className="
              futuristic-card
              sticky top-24
              h-[calc(100vh-7rem)]
              w-full p-6
              flex flex-col justify-between
            ">

              {/* TOP */}
              <div>
                <button
                  onClick={() => setActiveSection("overview")}
                  className="
                    w-[72px] h-[72px] rounded-[20px]
                    border border-white/[0.07] bg-white/[0.04]
                    flex items-center justify-center
                    hover:bg-white/[0.07] hover:border-white/[0.10]
                    transition-colors duration-200
                  "
                >
                  <span className="text-2xl font-bold text-white">
                    A<span className="text-[#f0c674]">K</span>
                  </span>
                </button>

                <div className="mt-5">
                  <h2 className="text-[1.05rem] font-bold text-[#f5f5f5] leading-tight tracking-[-0.01em]">
                    Anil<span className="text-[#f0c674]"> Kumar</span>
                  </h2>
                  <p className="mt-1.5 text-xs text-[#c8c8c8]">AI • ML • Data Science</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-1">
                {NAV_ITEMS.map(({ name, id, icon: Icon }) => {
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveSection(id)}
                      className={`
                        w-full flex items-center gap-3
                        px-3.5 py-2.5 rounded-[16px]
                        border text-sm
                        transition-all duration-200
                        ${isActive
                          ? "text-[#f0c674] bg-[#f0c674]/[0.07] border-[#f0c674]/20"
                          : "text-[#c8c8c8] border-white/[0.05] hover:text-[#f0c674] hover:bg-white/[0.04] hover:border-white/[0.08]"
                        }
                      `}
                    >
                      <Icon
                        size={15}
                        className={isActive ? "text-[#f0c674]" : "text-[#f0c674]/40"}
                      />
                      <span>{name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <div>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full block text-center
                    bg-[#f0c674] text-[#0f0f10]
                    py-2.5 rounded-[18px]
                    font-medium text-sm
                    hover:bg-[#e6b85c]
                    transition-colors duration-200
                  "
                >
                  Download CV
                </a>
              </div>

            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="relative z-10 flex-1 min-h-[calc(100vh-7rem)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col gap-5"
              >
                <SectionContent
                  section={activeSection}
                  onNavigate={setActiveSection}
                />
                <Footer />
              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>

    </div>
  );
}

export default App;
