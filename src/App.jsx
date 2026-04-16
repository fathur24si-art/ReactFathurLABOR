import './App.css';

function App() {
  const projects = [
    {
      title: 'Personal Portfolio',
      description: 'Situs portfolio responsif dibangun dengan React, menampilkan skills dan proyek saya.',
      tech: ['React', 'CSS3', 'JavaScript'],
      link: 'https://github.com/fathur/portfolio',
      demo: 'https://fathur-portfolio.netlify.app',
    },
    {
      title: 'E-Commerce App',
      description: 'Aplikasi toko online sederhana dengan fitur cart, payment integration, dan admin dashboard.',
      tech: ['React', 'Laravel', 'Tailwind CSS'],
      link: 'https://github.com/fathur/ecommerce',
      demo: 'https://demo-ecommerce-fathur.vercel.app',
    },
    {
      title: 'UI/UX Design Prototype',
      description: 'Prototipe desain app mobile untuk tracking kesehatan, menggunakan Figma dan Adobe XD.',
      tech: ['Figma', 'UI/UX Principles', 'Prototyping'],
      link: 'https://www.figma.com/file/example',
      demo: 'https://figma.com/proto/example',
    },
  ];

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Fathur</h2>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Halo, Saya <span className="highlight">Fathur</span>
            </h1>
            <h2 className="hero-subtitle">
              Mahasiswa IT dari Pekanbaru | Web Developer & UI/UX Enthusiast
            </h2>
            <p className="hero-desc">
              Membangun aplikasi web modern yang cepat, responsif, dan user-friendly
              menggunakan teknologi terkini di era 2026.
            </p>
            <div className="hero-buttons">
              <button className="btn primary"><a href="#projects" style={{ color: 'inherit', textDecoration: 'none' }}>Lihat Proyek Saya</a></button>
              <button className="btn outline"><a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Hubungi Saya</a></button>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-wrapper">
              <img
                src="https://i.pravatar.cc/400?u=fathur"
                alt="Foto Profil Fathur - Mahasiswa IT Pekanbaru"
                className="profile-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about section">
        <h2 className="section-title">Tentang Saya</h2>
        <div className="about-content">
          <p>
            Saya adalah mahasiswa Teknik Informatika di Pekanbaru, Riau, yang passionate di bidang 
            <strong> web development</strong>, <strong>UI/UX design</strong>, dan 
            teknologi modern. Saat ini saya sedang mendalami React, Next.js, 
            Laravel, dan Tailwind CSS untuk membangun aplikasi yang scalable 
            dan memiliki pengalaman pengguna terbaik.
          </p>
          <p>
            Saya suka tantangan dalam menciptakan solusi digital yang tidak hanya 
            berfungsi dengan baik, tapi juga terlihat elegan dan menyenangkan digunakan – terinspirasi dari perkembangan tech di Indonesia.
          </p>
        </div>
      </section>

      {/* Projects - New Section */}
      <section id="projects" className="projects section">
        <h2 className="section-title">Proyek Saya</h2>
        <div className="project-grid">
          {projects.map((project, index) => (
            <div key={`${project.title}-${index}`} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <ul className="project-tech">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="project-links">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn outline small">GitHub</a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn primary small">Demo</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="skills section">
        <h2 className="section-title">Keahlian</h2>
        <div className="skill-grid">
          {['HTML5', 'CSS3 / SCSS', 'JavaScript (ES6+)', 'React & Redux', 'Laravel', 'UI/UX Design', 'Git & GitHub', 'Responsive Design'].map((skill, index) => (
            <div key={`${skill}-${index}`} className="skill-card">
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact section">
        <h2 className="section-title">Mari Terhubung</h2>
        <div className="contact-content">
          <p>
            <strong>Email:</strong> fathur@email.com
          </p>
          <p>
            <strong>Instagram:</strong> @fathur.dev
          </p>
          <p>
            <strong>GitHub:</strong> github.com/fathur
          </p>
          <p>
            <strong>LinkedIn:</strong> linkedin.com/in/fathur (tambahkan kalau ada)
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Fathur. All rights reserved.</p>
        <p className="made-with">Made with ❤️ using React in Pekanbaru, 2026</p>
      </footer>
    </div>
  );
}

export default App;