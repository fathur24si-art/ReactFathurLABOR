export const PORTFOLIO_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* 🔥 NAVBAR FONT FIX */
  .gooey-nav-root {
    color: #374151; /* abu gelap */
    font-family: 'Sora', sans-serif;
  }

  .gooey-nav-root li {
    color: inherit; /* ikut parent */
    font-weight: 500;
    transition: all 0.25s ease;
  }

  .gooey-nav-root li:hover {
    color: #000;
  }

  .gooey-nav-root li.active {
    color: #000;
    font-weight: 600;
  }

  /* 🔥 NAV LINK */
  .nav-link {
    text-decoration: none;
    color: #444;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.01em;
    transition: color 0.2s;
  }

  .nav-link:hover { color: #0f0f0f; }

  /* 🔥 BUTTON */
  .cta-primary {
    background: #0f0f0f;
    color: #fff;
    border: none;
    padding: 14px 28px;
    border-radius: 100px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
    font-family: inherit;
  }

  .cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  }

  .cta-secondary {
    background: transparent;
    color: #0f0f0f;
    border: 1.5px solid #d0d0d0;
    padding: 13px 28px;
    border-radius: 100px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    font-family: inherit;
  }

  .cta-secondary:hover {
    border-color: #0f0f0f;
    background: #f5f5f5;
  }

  /* 🔥 CARD */
  .project-card {
    background: #fff;
    border: 1px solid #ebebeb;
    border-radius: 20px;
    padding: 28px;
    cursor: pointer;
    transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  }

  .project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.10);
    border-color: #d0d0d0;
  }

  /* 🔥 SKILL */
  .skill-pill {
    padding: 8px 18px;
    border: 1.5px solid #e0e0e0;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    color: #333;
    background: #fff;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }

  .skill-pill:hover {
    border-color: #6366f1;
    color: #6366f1;
    background: #f0f0ff;
  }

  /* 🔥 HERO ANIMATION */
  .hero-heading { animation: fadeUp 0.9s ease forwards; opacity: 0; }
  .hero-sub { animation: fadeUp 0.9s 0.18s ease forwards; opacity: 0; }
  .hero-btns { animation: fadeUp 0.9s 0.32s ease forwards; opacity: 0; }

  /* 🔥 NAVBAR LAYOUT */
  .portfolio-navbar {
    gap: 12px;
    padding: 0 clamp(12px, 4vw, 48px) !important;
  }

  .portfolio-brand { flex-shrink: 0; }

  .portfolio-gooey-wrap {
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .portfolio-gooey-wrap::-webkit-scrollbar {
    display: none;
  }

  .portfolio-nav-cta { flex-shrink: 0; }

  @media (max-width: 900px) {
    .portfolio-brand-name { display: none; }
    .portfolio-nav-cta { display: none; }
    .portfolio-navbar { justify-content: center !important; }
    .portfolio-gooey-wrap { padding: 5px 8px !important; }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(28px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;