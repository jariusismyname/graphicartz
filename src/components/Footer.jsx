import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ftr">
      <div className="ftr-inner">
        <span>© {year} Jarius Miguel C. Ballesteros</span>
        <a href="#intro">Back to top</a>
      </div>
    </footer>
  );
}
