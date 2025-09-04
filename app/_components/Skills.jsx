// components/Skills.jsx
/**
 * Skills.jsx
 * @description
 * Cosmic-themed Skills section with animated particles, nebula glows, and categorized skill cards.
 * Features:
 * - Frontend, Backend, and Other Tools categories (theme-aware)
 * - Animated particle background with subtle parallax (theme-aware)
 * - Nebula effects behind skill cards (theme-aware)
 * - Framer Motion scroll reveal and hover effects
 * - Fully responsive using TailwindCSS and Next.js Image optimization
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionWrapper from './SectionWrapper';

/**
 * Particle Component
 * @description Small animated dot with parallax effect.
 * Now theme-aware with different colors for light and dark modes.
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} size - Particle diameter
 * @param {number} duration - Animation duration
 * @param {number} delay - Animation delay
 * @param {number} scrollY - Current scroll position
 * @param {string} theme - Current theme ('light' or 'dark')
 */
const Particle = ({ x, y, size, duration, delay, scrollY, theme }) => {
  const parallaxY = y + scrollY * 0.05;
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${
        theme === 'dark' ? 'bg-white' : 'bg-galaxy-light-primary'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5,
        ease: "easeInOut",
      }}
      style={{
        width: size,
        height: size,
        left: x,
        top: parallaxY,
        boxShadow: theme === 'dark' 
          ? "0 0 5px rgba(255,255,255,0.3)" 
          : "0 0 5px rgba(74, 134, 232, 0.3)",
      }}
    />
  );
};

/**
 * SkillSection Component
 * @description Individual skill category card with hover effects and animated nebula glow
 * Now theme-aware with appropriate colors for both light and dark modes.
 * @param {string} title - Category title
 * @param {string} color - Color variant key (frontend, backend, otherTools)
 * @param {Array} skills - Array of skill objects { name, icon }
 * @param {string} theme - Current theme ('light' or 'dark')
 */
const SkillSection = ({ title, color, skills, theme }) => {
  const colorClasses = {
    frontend: theme === 'dark' 
      ? "text-blue-400 bg-blue-400/10 hover:bg-blue-400/20" 
      : "text-galaxy-light-primary bg-galaxy-light-primary/15 hover:bg-galaxy-light-primary/25",
    backend: theme === 'dark' 
      ? "text-purple-400 bg-purple-400/10 hover:bg-purple-400/20" 
      : "text-galaxy-light-secondary bg-galaxy-light-secondary/15 hover:bg-galaxy-light-secondary/25",
    otherTools: theme === 'dark' 
      ? "text-pink-400 bg-pink-400/10 hover:bg-pink-400/20" 
      : "text-galaxy-light-accent bg-galaxy-light-accent/15 hover:bg-galaxy-light-accent/25",
  };

  return (
    <motion.div
      className="relative rounded-xl p-4 md:p-6 transition-transform shadow-md backdrop-blur-sm 
                 bg-galaxy-light-surface/20 dark:bg-white/10 
                 hover:scale-[1.02] hover:shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Nebula Glow - Theme aware */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-2xl md:blur-3xl"
        style={{ 
          background: theme === 'dark' 
            ? "radial-gradient(circle at 30% 30%, rgba(79,172,254,0.3), transparent 70%)" 
            : "radial-gradient(circle at 30% 30%, rgba(74, 134, 232, 0.2), transparent 70%)"
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-xl blur-2xl md:blur-3xl"
        style={{ 
          background: theme === 'dark' 
            ? "radial-gradient(circle at 70% 70%, rgba(255,100,200,0.2), transparent 60%)" 
            : "radial-gradient(circle at 70% 70%, rgba(255, 157, 0, 0.15), transparent 60%)"
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Skill Content */}
      <h3 className={`relative z-10 text-lg md:text-xl font-bold mb-3 md:mb-4 ${colorClasses[color]}`}>
        {title}
      </h3>
      <div className="relative z-10 flex flex-wrap gap-2 md:gap-3">
        {skills.map((tech, key) => (
          <span
            key={key}
            className={`flex items-center gap-1 md:gap-2 py-1 px-2 md:px-3 rounded-full text-xs md:text-sm shadow-md transition ${colorClasses[color]}`}
          >
            <Image 
              src={tech.icon} 
              alt={tech.name} 
              width={18} 
              height={18} 
              className="w-4 h-4 md:w-5 md:h-5" 
            />
            {tech.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Skills Component
 * @description Main Skills section containing particles, title, and categorized skill cards
 */
const Skills = () => {
  const [particles, setParticles] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState('dark');
  const containerRef = useRef(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get current theme from document class
  useEffect(() => {
    const checkTheme = () => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Generate particle positions
  useEffect(() => {
    const generateParticles = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const newParticles = [];
      const particleCount = isMobile ? 30 : 50;
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 10 + 5,
          delay: Math.random() * 5,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
    window.addEventListener("resize", generateParticles);
    return () => window.removeEventListener("resize", generateParticles);
  }, [isMobile]);

  // Scroll parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SectionWrapper id="skills" className="min-h-screen flex items-center">
      <div
        ref={containerRef}
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden
                   bg-galaxy-radial from-galaxy-light-background to-galaxy-light-surface
                   dark:from-galaxy-dark-background dark:to-galaxy-dark-surface
                   py-12 md:py-20 px-4 md:px-6"
      >
        {/* Particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {particles.map((p) => (
            <Particle key={p.id} {...p} scrollY={scrollY} theme={theme} />
          ))}
        </div>

        {/* Title */}
        <motion.h2
          className="relative z-10 text-center text-3xl md:text-4xl lg:text-5xl font-bold 
                     text-galaxy-light-accent dark:text-galaxy-dark-accent mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Skills
        </motion.h2>

        {/* Skills Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full max-w-6xl px-4 md:px-6">
          {skillCategories.slice(0, 2).map((category, index) => (
            <SkillSection key={index} {...category} theme={theme} />
          ))}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <SkillSection {...skillCategories[2]} theme={theme} />
          </div>
        </div>

        {/* Decorative Nebulas - Theme aware */}
        <motion.div
          className="absolute bottom-10 left-10 w-20 h-20 md:w-32 md:h-32 rounded-full opacity-10 blur-xl"
          style={{ 
            background: theme === 'dark' 
              ? "radial-gradient(circle, #ff6b6b, transparent 70%)" 
              : "radial-gradient(circle, rgba(255, 107, 107, 0.2), transparent 70%)"
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-10 right-10 w-16 h-16 md:w-24 md:h-24 rounded-full opacity-10 blur-xl"
          style={{ 
            background: theme === 'dark' 
              ? "radial-gradient(circle, #4ecdc4, transparent 70%)" 
              : "radial-gradient(circle, rgba(78, 205, 196, 0.2), transparent 70%)"
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </SectionWrapper>
  );
};

export default Skills;

/**
 * Skill categories and icons
 */
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