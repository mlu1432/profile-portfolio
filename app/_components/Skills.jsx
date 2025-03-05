/** 
 * Skills.jsx
 * @description 
 * Displays categorized technical skills (Frontend, Backend, Other Tools) with icons.  
 * Uses Tailwind CSS for styling and responsive layout.  
 * Implements `RevealOnScroll` for smooth animations on scroll.  
 * Optimizes images with Next.js `Image` component.  
 * Dynamically renders skills from `skillCategories` for scalability.  
 * Includes a color mapping system for category styling.  
 * Features a background image and hover effects for better UI.  
 * Uses a grid layout to ensure consistency across screen sizes.  
 * Designed for easy expansion with new skills or categories.  
 */

import React from "react";
import Image from "next/image";
import RevealOnScroll from "../_components/RevealOnScroll";

const colorClasses = {
  frontend: "text-blue-600 bg-blue-600/10 hover:bg-blue-600/20",
  backend: "text-primary-blue bg-primary-blue/10 hover:bg-primary-blue/20",
  otherTools: "text-purple-500 bg-purple-500/10 hover:bg-purple-500/20",
};

// Skill Data
const skillCategories = [
  {
    title: "Frontend",
    color: "frontend",
    skills: [
      { name: "HTML5", icon: "/assets/html5.svg" },
      { name: "CSS3", icon: "/assets/css3.svg" },
      { name: "JavaScript", icon: "/assets/javascript.svg" },
      { name: "React", icon: "/assets/react.svg" },
      { name: "Next.js", icon: "/assets/nextjs.svg" },
      { name: "Tailwind CSS", icon: "/assets/tailwind.svg" },
    ],
  },
  {
    title: "Backend",
    color: "backend",
    skills: [
      { name: "Node.js", icon: "/nodejs.svg" },
      { name: "Express.js", icon: "/assets/express.svg" },
      { name: "MongoDB", icon: "/assets/mongodb.svg" },
      { name: "MySQL", icon: "/assets/mysql.svg" },
      { name: "Python", icon: "/assets/python.svg" },
    ],
  },
  {
    title: "Other Tools",
    color: "otherTools",
    skills: [
      { name: "GitHub", icon: "/assets/github.svg" },
      { name: "Docker", icon: "/assets/docker.svg" },
      { name: "Firebase", icon: "/assets/firebase.svg" },
      { name: "Postman", icon: "/assets/postman.svg" },
      { name: "Linux", icon: "/assets/linux.svg" },
      { name: "VS Code", icon: "/assets/visualstudio.svg" },
    ],
  },
];

// Reusable Skill Section Component
const SkillSection = ({ title, color, skills }) => {
  return (
    <div className="rounded-xl p-6 hover:-translate-y-1 transition-all bg-white shadow-md">
      <h3 className={`text-xl font-bold mb-4 ${colorClasses[color]}`}>{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((tech, key) => (
          <span
            key={key}
            className={`flex items-center gap-2 py-1 px-3 rounded-full text-sm shadow-md transition ${colorClasses[color]}`}
          >
            <Image src={tech.icon} alt={tech.name} width={20} height={20} />
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
};

// Main Skills Component
const Skills = () => {
  return (
    <div className="relative top-[50px] w-full h-[700px] bg-light-blue flex flex-col justify-center items-center 
      shadow-[inset_0px_1px_3px_rgba(0,0,0,0.12),_0px_2px_4px_rgba(0,0,0,0.08)]">

      {/* Background Image Positioned Behind Icons */}
      <div className="absolute top-[240px] left-1/2 transform -translate-x-1/2 z-0">
        <Image
          src="/programming.png"
          alt="Programming"
          width={650}
          height={650}
          className="w-[500px] h-[500px] opacity-5"
        />
      </div>
      <RevealOnScroll>
        {/* Skills Title */}
        <h2 className="relative top-[-95px] text-center text-5xl font-bold text-primary-blue">
          Skills
        </h2>
      </RevealOnScroll>

      {/* Skills Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-6">
        {skillCategories.slice(0, 2).map((category, index) => (
          <SkillSection key={index} {...category} />
        ))}
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <SkillSection {...skillCategories[2]} />
        </div>
      </div>
    </div>
  );
};

export default Skills;