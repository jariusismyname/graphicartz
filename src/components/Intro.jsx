import React, { useEffect, useState } from "react";
import "./intro.css"; // we'll use separate CSS for waves and styling

export default function Intro() {
  const paragraphs = [
    "I am a passionate digital artist and video editor who started exploring creativity from a young age, turning simple sketches into expressive visual stories. Over time, I developed skills in Adobe Photoshop, Illustrator, Lightroom, and video editing tools, experimenting with colors, composition, and effects to communicate ideas effectively. I thrive in creating digital artworks, posters, and multimedia projects that engage and inspire audiences.",

    "Through personal projects and collaborations, I gained hands-on experience in video editing, storytelling, and multimedia production. I am skilled in combining visuals, sound, and pacing to deliver polished short videos and vlogs. These projects strengthened my attention to detail, patience, and creative problem-solving, allowing me to translate concepts into impactful visual content.",

    "I am eager to contribute my design and editing skills to a professional team, continuing to grow as a digital artist while delivering high-quality creative solutions. I stay updated on industry trends, enjoy experimenting with new techniques, and adapt quickly to new tools and software. My goal is to create visually engaging content that resonates with audiences and supports creative projects in any organization."
  ];


  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % paragraphs.length);
    }, 30000); // 30 seconds per paragraph
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="intro">
      <div className="intro-bg" />
      <div className="intro-content">
        <img className="avatar" src="/avatar.jpg" alt="My portrait" />
        <div className="intro-text">
          <h2 className="intro-title">Hi, I’m Jarius Miguel C. Ballesteros</h2>
          <p
            className="paragraph wave paragraph-1"
            style={{ display: index === 0 ? "block" : "none" }}
          >
            {paragraphs[0]}
          </p>
          <p
            className="paragraph wave paragraph-2"
            style={{ display: index === 1 ? "block" : "none" }}
          >
            {paragraphs[1]}
          </p>
          <p
            className="paragraph wave paragraph-3"
            style={{ display: index === 2 ? "block" : "none" }}
          >
            {paragraphs[2]}
          </p>

          {/* Download CV Button */}
          <a
            href="/ga.pdf" // Replace with your CV path
            download
            className="btn download-cv"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#FF7F00",
              color: "#fff",
              borderRadius: "50px",
              textDecoration: "none"
            }}
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
}
