import { useState } from "react";
import {
  CtaSection,
  FooterSection,
  HeroSection,
  ImprovementsSection,
  NavbarSection,
  ProjectsSection,
  SkillsSection,
} from "./PortfolioSections";
import { PORTFOLIO_STYLES } from "./portfolioStyles";
import Antigravity from "./Antigravity";

export default function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div
      style={{
        fontFamily: "'Sora', 'DM Sans', sans-serif",
        minHeight: "100vh",
        color: "#0f0f0f",
        overflowX: "hidden",
        position: "relative",
        background: "#ffffff", 
      }}
    >
      {/* STYLE GLOBAL */}
      <style>{PORTFOLIO_STYLES}</style>

      {/* 🔥 ANTIGRAVITY (PALING BELAKANG) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Antigravity
          count={180}
          color="#8b5cf6"
          particleSize={1.3}
        />
      </div>


      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.05)", // ✅ sebelumnya terlalu tebal
          backdropFilter: "blur(6px)", // ✅ jangan terlalu besar
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* 🔥 CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <NavbarSection />
        <HeroSection />

        <ProjectsSection
          hoveredProject={hoveredProject}
          setHoveredProject={setHoveredProject}
        />

        <ImprovementsSection />
        <SkillsSection />
        <CtaSection />
        <FooterSection />
      </div>
    </div>
  );
}