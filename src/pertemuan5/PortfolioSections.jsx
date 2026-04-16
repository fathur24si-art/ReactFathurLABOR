import { IMPROVEMENTS, NAV_LINKS, PROJECTS, SKILLS } from "./portfolioData";
import GooeyNav from "../GooeyNav";

function ParticleShape({ shape, size, color, opacity }) {
  if (shape === "circle") {
    return <div style={{ width: size, height: size, borderRadius: "50%", background: color, opacity }} />;
  }
  if (shape === "dash") {
    return <div style={{ width: size * 3, height: size * 0.6, borderRadius: 2, background: color, opacity }} />;
  }
  return <div style={{ width: size, height: size, borderRadius: 1, background: color, opacity }} />;
}

export function ParticlesLayer({ particles, particlePos }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map((p, i) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${particlePos[i]?.x ?? p.x}%`,
            top: `${particlePos[i]?.y ?? p.y}%`,
            transform: `rotate(${particlePos[i]?.rotation ?? p.rotation}deg)`,
            transition: "none",
          }}
        >
          <ParticleShape shape={p.shape} size={p.size} color={p.color} opacity={p.opacity} />
        </div>
      ))}
    </div>
  );
}
export function NavbarSection() {
  const gooeyItems = NAV_LINKS.map((label) => ({
    label,
    href: "#",
  }));

  return (
    <nav
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        padding: "6px",
        borderRadius: 9999,

        // 🔥 glass apple
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",

        border: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.7)",
          borderRadius: 9999,
          padding: "6px 10px",
        }}
      >
        <GooeyNav items={gooeyItems} />
      </div>
    </nav>
  );
}
export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
        paddingTop: 64,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "#fff",
          border: "1px solid #e8e8e8",
          borderRadius: 100,
          padding: "6px 16px",
          marginBottom: 32,
          fontSize: 13,
          color: "#555",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
        Siap menerima kolaborasi
      </div>

      <h1
        className="hero-heading"
        style={{
          fontSize: "clamp(52px, 8vw, 96px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          maxWidth: 900,
          marginBottom: 24,
        }}
      >
        Membangun karya digital
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          yang bermanfaat
        </span>
      </h1>

      <p
        className="hero-sub"
        style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "#666",
          maxWidth: 480,
          lineHeight: 1.7,
          marginBottom: 44,
          fontWeight: 300,
        }}
      >
        Halo, saya <strong style={{ color: "#0f0f0f", fontWeight: 600 }}>Fathur Rahman</strong> dari{" "}
        <strong style={{ color: "#0f0f0f", fontWeight: 600 }}>kelas 2 SI C</strong> - mahasiswa yang fokus membangun pengalaman
        digital yang cepat, mudah diakses, dan nyaman digunakan.
      </p>

      <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button className="cta-primary">
          <span>Lihat Proyek Saya</span>
          <span style={{ fontSize: 18 }}>↓</span>
        </button>
        <button className="cta-secondary">Unduh CV</button>
      </div>

      <div style={{ marginTop: 80, display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {["Mahasiswa 2 SI C", "Fokus Frontend & Full Stack", "Aktif Belajar Proyek Nyata"].map((s) => (
          <div
            key={s}
            style={{
              background: "#fff",
              border: "1px solid #e8e8e8",
              borderRadius: 12,
              padding: "12px 20px",
              fontSize: 13,
              fontWeight: 500,
              color: "#555",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectsSection({ hoveredProject, setHoveredProject }) {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "100px 48px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 56, textAlign: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "#888", textTransform: "uppercase", marginBottom: 12 }}>
          Proyek Pilihan
        </div>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Proyek yang sudah saya kerjakan</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {PROJECTS.map((p, i) => (
          <div key={i} className="project-card" onMouseEnter={() => setHoveredProject(i)} onMouseLeave={() => setHoveredProject(null)}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: p.color + "18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <div style={{ width: 18, height: 18, borderRadius: 4, background: p.color }} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: p.color, textTransform: "uppercase", marginBottom: 10 }}>
              {p.tag}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>{p.title}</h3>
            <p style={{ fontSize: 14, color: "#888", lineHeight: 1.6 }}>{p.desc}</p>
            <div
              style={{
                marginTop: 24,
                fontSize: 13,
                fontWeight: 600,
                color: "#0f0f0f",
                display: "flex",
                alignItems: "center",
                gap: 6,
                opacity: hoveredProject === i ? 1 : 0.4,
                transition: "opacity 0.2s",
              }}
            >
              Lihat proyek →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ImprovementsSection() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "20px 48px 90px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "#888", textTransform: "uppercase", marginBottom: 12 }}>
          Setelah Berhasil
        </div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
          3 improvisasi di luar modul
        </h2>
        <p style={{ color: "#666", fontSize: 15, maxWidth: 720, margin: "0 auto", lineHeight: 1.7 }}>
          Berikut peningkatan yang saya rencanakan setelah tugas utama selesai agar portofolio lebih informatif dan interaktif.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {IMPROVEMENTS.map((item, i) => (
          <div key={i} className="project-card" style={{ cursor: "default", transform: "none" }}>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 10 }}>{item.title}</div>
            <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "60px 48px 100px", textAlign: "center" }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "#888", textTransform: "uppercase", marginBottom: 12 }}>
        Teknologi
      </div>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 40 }}>Teknologi yang saya gunakan</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 600, margin: "0 auto" }}>
        {SKILLS.map((s) => (
          <div key={s} className="skill-pill">
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        margin: "0 48px 80px",
        borderRadius: 28,
        background: "#0f0f0f",
        color: "#fff",
        padding: "72px 48px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          background:
            "radial-gradient(ellipse at 30% 50%, #6366f1 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, #ec4899 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>Mari bekerja sama</h2>
      <p style={{ fontSize: 16, color: "#aaa", marginBottom: 36, fontWeight: 300 }}>Punya ide proyek? Saya siap berdiskusi.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button
          style={{
            background: "#fff",
            color: "#0f0f0f",
            border: "none",
            padding: "14px 28px",
            borderRadius: 100,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Hubungi saya ↗
        </button>
        <button
          style={{
            background: "transparent",
            color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.25)",
            padding: "14px 28px",
            borderRadius: 100,
            fontSize: 15,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          fathurrahman2sic@email.com
        </button>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        padding: "24px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid #ebebeb",
        fontSize: 13,
        color: "#aaa",
      }}
    >
      <span>© 2026 Fathur Rahman - 2 SI C</span>
      <div style={{ display: "flex", gap: 24 }}>
        {["GitHub", "LinkedIn", "Twitter"].map((s) => (
          <a
            key={s}
            href="#"
            style={{ color: "#aaa", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = "#0f0f0f")}
            onMouseLeave={(e) => (e.target.style.color = "#aaa")}
          >
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}
