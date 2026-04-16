import { useState, useEffect } from "react";
import "./style.css"; // Import CSS file

function Badge() {
  return (
    <div className="badge">
      <span className="badge-dot" />
    Belajar React dulu Bos
    </div>
  );
}

function QuoteText() {
  const text = "Gipo SUka pisang ";
            const text2 = "Gipo dan Fillah selamanya ";
  return (
    <div className="quote-card">
      <p className="quote-line lower">"{text.toLowerCase()}"</p>
      <p className="quote-line upper">— {text2.toUpperCase()}</p>
    </div>
  );
}

function GreetingBinjai() {
  return (
    <div className="greeting">
      <span className="greeting-icon">🚀</span>
      Salam dari Rumbai 
    </div>
  );
}

function UserStatus({ status }) {
  return (
    <div className="status-badge">
      <span className="dot" />
      {status}
    </div>
  );
}

function UserCard({ nama, nim, tanggal }) {
  return (
    <div className="user-card">
      <div className="card-header">
        <div className="avatar">
          <img
            src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS6BG0QnyNRGPhMtH8Ky-QvhS_PGGtCCFolTB9uhTN-2oEgyLF50NmtKSZv85j3Q2yzGzYIbrdTK5-Vyfo"
            alt="Profile"
            className="avatar-img"
          />
        </div>

        <div>
          <div className="card-name">{nama}</div>
          <div className="card-role">Mahasiswa Informatika</div>
        </div>
      </div>

      <div className="card-fields">
        <div className="field">
          <span className="field-icon">📚</span>
          <span className="field-label">NIM</span>
          <span className="field-value">{nim}</span>
        </div>

        <div className="field">
          <span className="field-icon">📅</span>
          <span className="field-label">Tanggal</span>
          <span className="field-value">{tanggal}</span>
        </div>
      </div>

      <UserStatus status="Mahasiswa Aktif" />
    </div>
  );
}

export default function App() {
  const user = {
    nama: "Fathur",
    nim: "22123456",
    tanggal: "12 Maret 2026"
  };

  return (
    <div className="app">

      {/* VIDEO BACKGROUND */}
      <div className="video-background">
        <iframe
          src="https://www.youtube.com/embed/Hgg7M3kSqyE?autoplay=1&mute=1&loop=1&playlist=Hgg7M3kSqyE&controls=0&showinfo=0&modestbranding=1"
          title="Background Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      {/* overlay biar tulisan lebih jelas */}
      <div className="overlay"></div>

      <div className="content">
        <Badge />

        <h1 className="heading">
          Hello <span>World</span> 👋
        </h1>
        <p className="subtitle">Belajar React bersama gipo</p>

        <div className="divider" />

        <QuoteText />
        <GreetingBinjai />

        <UserCard
          nama={user.nama}
          nim={user.nim}
          tanggal={user.tanggal}
        />
      </div>
    </div>
  );
}