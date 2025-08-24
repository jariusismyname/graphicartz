import React, { useEffect, useState } from "react";
import "./intro.css"; // we'll use separate CSS for waves and styling

export default function Intro() {
  const paragraphs = [
    "I began my dream with just a single Crayola. I loved joining competitions, from poster-making to slogan contests. Oil pastels revealed the artist within me. Creativity spoke to me in its purest form.I started drawing on borrowed notebooks, turning margins into little worlds. I discovered colors, textures, and shapes that felt like magic in my hands. Every sketch told a story, every doodle offered a lesson. Over time, I realized that art was more than drawing—it was a way to communicate emotions.I explored different mediums and learned to embrace mistakes as part of the process. With each page, I built confidence and developed a unique style. Sharing my work online brought feedback and encouragement, while collaborating with friends inspired new techniques and ideas. I found joy in simple daily sketches. Slowly, this passion transformed into my purpose.",

    "Ever since I was a kid I want to be an architect, but I end up having a degree in Computer Engineer, and I always want to be an artist and be creative by editing short videos. It taught me rhythm, pacing, and how pictures can move feelings. I learned transitions, timing, and storytelling through clips. Combining visuals and sound created immersive experiences. Each project improved my patience and attention to detail. I explored various tools to enhance my workflow. I analyzed videos frame by frame to perfect every scene. Sharing videos online brought community and critiques. I discovered trends while maintaining my voice. Projects ranged from personal experiments to collaborative pieces. The process sharpened my creative and technical skills.",
  
    "I am a self-taught digital artist and graphic designer. I started with basic tools and gradually explored advanced software. Experimenting with different styles helped me find my unique voice. I learned about color theory, composition, and typography through online tutorials and practice. Creating logos, posters, and illustrations allowed me to apply design principles in real projects. Feedback from clients and peers was invaluable for growth. I stay updated on design trends while developing a timeless aesthetic. Each project challenges me to think creatively and solve visual problems. I enjoy collaborating with others to bring ideas to life through design."
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
            href="/artist_cv.pdf" // Replace with your CV path
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
