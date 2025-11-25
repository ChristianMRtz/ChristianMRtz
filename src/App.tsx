import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./index.css";

// Components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { ParticleBackground } from "./components/ParticleBackground";

// Modals
import { SkillModal } from "./components/modals/SkillModal";
import { StatModal } from "./components/modals/StatModal";
import { ProjectsModal } from "./components/modals/ProjectsModal";
import { ContactModal } from "./components/modals/ContactModal";

// Types
import type { SkillInfo, ModalType } from "./types";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillInfo | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`app ${theme}`}>
      <ParticleBackground />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <Hero onOpenModal={setOpenModal} />

      <AboutSection
        hoveredStat={hoveredStat}
        onStatHover={setHoveredStat}
        onStatClick={setSelectedStat}
      />

      <SkillsSection
        hoveredSkill={hoveredSkill}
        onSkillHover={setHoveredSkill}
        onSkillClick={setSelectedSkill}
      />

      <ExperienceSection />

      <ProjectsSection />

      <ContactSection />

      <footer className="footer">
        <span>© {new Date().getFullYear()} Christian · Full Stack Developer</span>
      </footer>

      <AnimatePresence>
        {selectedStat && (
          <StatModal
            statType={selectedStat as "experience" | "technologies" | "commitment"}
            onClose={() => setSelectedStat(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedSkill && (
          <SkillModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openModal === "projects" && <ProjectsModal onClose={() => setOpenModal(null)} />}
        {openModal === "contact" && <ContactModal onClose={() => setOpenModal(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
