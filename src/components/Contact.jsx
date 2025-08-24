import React from "react";

export default function Contact() {
  return (
  <div className="section">
  <h2 className="section-title">Contact</h2>
  <div className="contact-links">
    <a className="btn icon" href="https://www.linkedin.com/in/jarius-miguel-ballesteros-4b7a43277/" target="_blank" rel="noreferrer">
      <i className="fab fa-linkedin"></i>
    </a>
    <a className="btn ghost icon" href="https://www.youtube.com/@JmJmjmjm-z3z" target="_blank" rel="noreferrer">
      <i className="fab fa-youtube"></i>
    </a>
    <a className="btn ghost icon" href="tel:+639765974874">
      <i className="fas fa-phone"></i>
    </a>
    <a
  className="btn ghost icon"
  href="https://mail.google.com/mail/?view=cm&fs=1&to=jmjmjmj160@gmail.com"
  target="_blank"
  rel="noreferrer"
>
  <i className="fas fa-envelope"></i>
</a>

  </div>
</div>

  );
}
