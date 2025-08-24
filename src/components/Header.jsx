import React, { useState, useEffect } from "react";

export default function Header({ dark, setDark, isAdmin, onSecretAccess, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="hdr">
      <div className="hdr-inner">
        {/* Double-click your name/logo to unlock admin */}
        <h1 className="brand" onDoubleClick={onSecretAccess} title=" ">
          Jarius Miguel C. Ballesteros
        </h1>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="#intro" onClick={closeMenu}>Intro</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="hdr-actions">
          <button className="btn ghost" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
            {dark ? "Light" : "Dark"}
          </button>
          {isAdmin && (
            <button className="btn ghost" onClick={onSignOut} aria-label="Sign out admin">
              Sign out
            </button>
          )}

          {/* Hamburger button (only render on mobile) */}
          {isMobile && (
            <button className="burger" onClick={toggleMenu} aria-label="Toggle menu">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
