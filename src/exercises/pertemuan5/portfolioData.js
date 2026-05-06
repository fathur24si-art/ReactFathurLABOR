export const PARTICLES = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 5 + 2,
  color: ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"][Math.floor(Math.random() * 6)],
  speedX: (Math.random() - 0.5) * 0.08,
  speedY: (Math.random() - 0.5) * 0.08,
  rotation: Math.random() * 360,
  rotSpeed: (Math.random() - 0.5) * 1.2,
  shape: ["rect", "circle", "dash"][Math.floor(Math.random() * 3)],
  opacity: Math.random() * 0.6 + 0.3,
}));

export const NAV_LINKS = ["Tentang", "Proyek", "Keahlian", "Kontak"];

export const PROJECTS = [
  { title: "Platform E-Commerce", desc: "Aplikasi web full-stack dengan React dan Node.js", tag: "Full Stack", color: "#6366f1" },
  { title: "UI Mobile Banking", desc: "Desain antarmuka modern untuk aplikasi fintech", tag: "UI/UX", color: "#ec4899" },
  { title: "Dashboard Data", desc: "Visualisasi analitik real-time untuk monitoring", tag: "Data Viz", color: "#f59e0b" },
  { title: "Aplikasi Chat AI", desc: "Aplikasi percakapan cerdas berbasis LLM", tag: "AI/ML", color: "#10b981" },
];

export const SKILLS = ["React", "Next.js", "TypeScript", "Node.js", "Python", "Figma", "TailwindCSS", "PostgreSQL"];

export const IMPROVEMENTS = [
  {
    title: "Komponen Dashboard Akademik",
    desc: "Menambahkan kartu ringkasan nilai, absensi, dan jadwal agar informasi utama bisa dipantau cepat.",
  },
  {
    title: "Filter Proyek Berdasarkan Kategori",
    desc: "Menyediakan filter interaktif supaya pengunjung bisa melihat proyek sesuai fokus teknologi.",
  },
  {
    title: "Dark Mode Sederhana",
    desc: "Menyediakan tema gelap untuk kenyamanan membaca pada malam hari dan tampilan yang lebih fleksibel.",
  },
];
