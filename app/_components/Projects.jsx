// components/Projects.jsx

/**
 * Projects.jsx
 * @description
 * Cosmic-themed Projects section with animated background particles and nebula glows.
 * Features:
 * - Project cards with hover and floating animations (theme-aware)
 * - Responsive design for mobile and desktop
 * - Framer Motion scroll reveal animations
 * - Tech stack badges and links to GitHub, design tools, and live demos (theme-aware)
 * - Background particles with subtle parallax effect (theme-aware)
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import projects from "./projectsData"; // Array of project objects
import SectionWrapper from './SectionWrapper';

/**
 * Particle Component
 * @description Small floating star particle with parallax effect
 * Now theme-aware with different colors for light and dark modes.
 * @param {number} x - Horizontal position
 * @param {number} y - Vertical position
 * @param {number} size - Particle size
 * @param {number} duration - Animation duration
 * @param {number} delay - Animation delay
 * @param {number} scrollY - Current scroll position for parallax
 * @param {string} theme - Current theme ('light' or 'dark')
 */
const Particle = ({ x, y, size, duration, delay, scrollY, theme }) => {
  const parallaxY = y + scrollY * 0.05;
  return (
    <motion.div
      className={`absolute rounded-full ${
        theme === 'dark' ? 'bg-white' : 'bg-galaxy-light-primary'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
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
          ? "0 0 10px 2px rgba(255, 255, 255, 0.5)" 
          : "0 0 10px 2px rgba(74, 134, 232, 0.4)",
      }}
    />
  );
};

/**
 * ProjectCard Component
 * @description Displays individual project with image, description, features, tech stack, and links
 * Now theme-aware with appropriate colors for both light and dark modes.
 * @param {Object} project - Project object containing title, images, description, features, techStack, and links
 * @param {number} index - Index for staggered animation
 * @param {string} theme - Current theme ('light' or 'dark')
 */
const ProjectCard = ({ project, index, theme }) => {
  const [imgSrc, setImgSrc] = useState(project.images[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const floatingVariants = {
    float: {
      y: isMobile ? [-5, 5, -5] : [-10, 10, -10],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="relative backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all
                 bg-galaxy-light-surface/20 dark:bg-white/10"
      variants={floatingVariants}
      animate="float"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Nebula Glow - Theme aware */}
      <motion.div
        className="absolute inset-0 rounded-xl md:rounded-2xl blur-xl md:blur-2xl opacity-20"
        style={{ 
          background: theme === 'dark' 
            ? "radial-gradient(circle, #4a00e0, transparent 70%)" 
            : "radial-gradient(circle, rgba(74, 134, 232, 0.2), transparent 70%)"
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-galaxy-light-accent dark:text-galaxy-dark-accent mb-3 md:mb-4 relative z-10">
        {project.title}
      </h3>

      {/* Project Image */}
      <div className="relative w-full h-48 md:h-56 lg:h-64 mb-3 md:mb-4 rounded-lg overflow-hidden z-10
                      border border-galaxy-light-primary/20 dark:border-white/10">
        <Image
          src={imgSrc}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg hover:scale-105 transition-transform duration-300"
          onError={() => setImgSrc("/assets/fallback-image.png")}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Description */}
      <p className="text-galaxy-light-text dark:text-galaxy-dark-text text-sm md:text-base lg:text-lg mb-3 md:mb-4 relative z-10 line-clamp-3">
        {project.description}
      </p>

      {/* Features */}
      <ul className="text-galaxy-light-text dark:text-galaxy-dark-text text-xs md:text-sm list-disc list-inside mb-3 md:mb-4 relative z-10 space-y-1">
        {project.features.slice(0, isMobile ? 2 : 3).map((feature, i) => (
          <li key={i} className="flex items-start">
            <span className="mr-2 text-galaxy-light-accent dark:text-galaxy-dark-accent">✅</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1 md:gap-2 mt-auto mb-3 md:mb-4 relative z-10">
        {project.techStack.slice(0, isMobile ? 3 : 5).map((tech, i) => (
          <span
            key={i}
            className="text-xs font-semibold px-2 md:px-3 py-1 rounded-full 
                       bg-gradient-to-r from-galaxy-light-primary to-galaxy-light-secondary
                       dark:from-galaxy-dark-primary dark:to-galaxy-dark-secondary 
                       text-white shadow-sm"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > (isMobile ? 3 : 5) && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full 
                          bg-galaxy-light-text-muted/20 dark:bg-gray-600 
                          text-galaxy-light-text dark:text-white">
            +{project.techStack.length - (isMobile ? 3 : 5)}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 relative z-10">
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center 
                     bg-gradient-to-r from-galaxy-light-primary to-galaxy-light-secondary 
                     dark:from-galaxy-dark-primary dark:to-galaxy-dark-secondary 
                     text-white px-3 md:px-4 py-2 rounded-full hover:shadow-lg transition-all text-sm md:text-base"
        >
          GitHub
        </a>
        <a
          href={project.links.designTool}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center 
                     bg-gradient-to-r from-galaxy-light-secondary to-galaxy-light-accent 
                     dark:from-galaxy-dark-secondary dark:to-galaxy-dark-accent 
                     text-white px-3 md:px-4 py-2 rounded-full hover:shadow-lg transition-all text-sm md:text-base"
        >
          {project.title.includes("SentinelShield") ? "Figma" : "Design"}
        </a>
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center 
                       bg-gradient-to-r from-galaxy-light-accent to-galaxy-light-primary 
                       dark:from-green-600 dark:to-teal-500 
                       text-white px-3 md:px-4 py-2 rounded-full hover:shadow-lg transition-all text-sm md:text-base"
          >
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

/**
 * Projects Component
 * @description Main Projects section with particle background and grid of ProjectCards
 */
const Projects = () => {
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState('dark');
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

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

  // Generate particles
  useEffect(() => {
    const generateParticles = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const newParticles = [];
      const count = isMobile ? 25 : 40;

      for (let i = 0; i < count; i++) {
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

  // Scroll listener for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SectionWrapper id="projects" className="w-full min-h-screen py-0">
      <div
        ref={containerRef}
        className={
          "relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden " +
          "bg-galaxy-radial from-galaxy-light-background to-galaxy-light-surface " +
          "dark:from-galaxy-dark-background dark:to-galaxy-dark-surface"
        }
      >
        {/* Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {particles.map((p) => (
            <Particle key={p.id} {...p} scrollY={scrollY} theme={theme} />
          ))}
        </div>

        {/* Section Title */}
        <motion.h2
          className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12
                    text-galaxy-light-accent dark:text-galaxy-dark-accent pt-8 md:pt-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Projects
        </motion.h2>

        {/* Projects Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full max-w-6xl px-4 md:px-6 pb-8 md:pb-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} theme={theme} />
          ))}
        </div>

        {/* Decorative Cosmic Elements */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 md:w-24 md:h-24 rounded-full opacity-10 blur-xl z-0"
          style={{
            background: theme === "dark"
              ? "radial-gradient(circle, #ff9a8b, transparent 70%)"
              : "radial-gradient(circle, rgba(255, 154, 139, 0.2), transparent 70%)"
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-20 h-20 md:w-28 md:h-28 rounded-full opacity-10 blur-xl z-0"
          style={{
            background: theme === "dark"
              ? "radial-gradient(circle, #8bc6ec, transparent 70%)"
              : "radial-gradient(circle, rgba(139, 198, 236, 0.2), transparent 70%)"
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1], y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </SectionWrapper>
  );
};

export default Projects;