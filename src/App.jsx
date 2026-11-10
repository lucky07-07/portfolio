import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Hackathons from "./components/Hackathons";
import Projects from "./components/Projects";
import OpenSource from "./components/OpenSource";
import Research from "./components/Research";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FieldBackground from "./components/FieldBackground";
import TrainingHUD from "./components/TrainingHUD";

const NAV_ITEMS = [
  { name: "About",     id: "about"     },
  { name: "Projects",  id: "projects"  },
  { name: "Open Source", id: "opensource" },
  { name: "Hackathons", id: "hackathons" },
  { name: "Research",  id: "research"  },
  { name: "Stack",     id: "skills"    },
  { name: "Education", id: "education" },
  { name: "Contact",   id: "contact"   },
];

const SECTION_IDS = ["overview", ...NAV_ITEMS.map((n) => n.id)];

// Highlights the nav link of the section currently crossing the upper third of the viewport.
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

// Each section resolves out of a soft blur as it scrolls into view.
function Section({ id, children, className = "" }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      className={`scroll-mt-24 py-20 sm:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function App() {
  const active = useScrollSpy(SECTION_IDS);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-ink2">
      <FieldBackground />
      <Navbar items={NAV_ITEMS} activeSection={active} onNavigate={scrollTo} />
      <TrainingHUD activeSection={active} />

      <main className="relative z-10 mx-auto max-w-[1160px] px-5 pb-8 sm:px-8 lg:pb-24">
        <section id="overview" className="scroll-mt-24">
          <Hero onNavigate={scrollTo} />
        </section>

        <Section id="about"><About /></Section>
        <Section id="projects"><Projects onNavigate={scrollTo} /></Section>
        <Section id="opensource"><OpenSource /></Section>
        <Section id="hackathons"><Hackathons /></Section>
        <Section id="research"><Research /></Section>
        <Section id="skills"><Skills /></Section>

        <Section id="education">
          <Education />
          <Certifications />
        </Section>

        <Section id="contact"><Contact /></Section>

        <Footer />
      </main>
    </div>
  );
}

export default App;
