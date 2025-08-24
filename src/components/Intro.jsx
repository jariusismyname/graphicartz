import React, { useEffect, useState } from "react";
import "./intro.css"; // we'll use separate CSS for waves and styling

export default function Intro() {
  const paragraphs = [
    "I started drawing on borrowed notebooks—turning margins into little worlds. I discovered colors, textures, and shapes that felt like magic in my hands. Every sketch was a story, every doodle a lesson. Over time, I realized that art wasn't just drawing, but communicating emotions. I experimented with different mediums and learned to embrace mistakes. With each page, I built confidence and a unique style. Sharing my work online gave me feedback and encouragement. Collaboration with friends inspired new techniques and ideas. I found joy in simple daily sketches. This passion slowly became my purpose.",
    
    "Editing short videos taught me rhythm, pacing, and how pictures can move feelings. I learned transitions, timing, and storytelling through clips. Combining visuals and sound created immersive experiences. Each project improved my patience and attention to detail. I explored various tools to enhance my workflow. I analyzed videos frame by frame to perfect every scene. Sharing videos online brought community and critiques. I discovered trends while maintaining my voice. Projects ranged from personal experiments to collaborative pieces. The process sharpened my creative and technical skills.",

    "Now I blend code and creativity to design experiences that speak without words. Websites, apps, and interactive projects became my playground. I experiment with layout, animation, and color psychology. I solve problems with logic and empathy simultaneously. Coding taught me discipline while art nurtured imagination. Every project is a balance of form and function. I document my process to learn from successes and failures. I enjoy rapid prototyping to test ideas quickly. Creative coding allows me to merge two passions seamlessly. Ultimately, I aim to craft experiences that resonate and inspire."
  ];

  const [index, setIndex] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    setIndex(prev => (prev + 1) % paragraphs.length);
  }, 30000); // 15 seconds per paragraph
  return () => clearInterval(interval);
}, []);


  return (
    <div className="intro">
      <div className="intro-bg" />
      <div className="intro-content">
        <img className="avatar" src="/avatar.jpg" alt="My portrait" />
        <div className="intro-text">
          <h2 className="intro-title">Hi, I’m Jarius — aspiring Graphic Artist</h2>
          <p className="paragraph wave paragraph-1" style={{ display: index === 0 ? "block" : "none" }}>
            {paragraphs[0]}
          </p>
          <p className="paragraph wave paragraph-2" style={{ display: index === 1 ? "block" : "none" }}>
            {paragraphs[1]}
          </p>
          <p className="paragraph wave paragraph-3" style={{ display: index === 2 ? "block" : "none" }}>
            {paragraphs[2]}
          </p>
        </div>
      </div>
    </div>
  );
}
