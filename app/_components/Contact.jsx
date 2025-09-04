// components/Contact.jsx
/**
 * Contact.jsx
 * @description
 * Renders the Contact section with:
 * - Floating form card with nebula background (theme-aware)
 * - Star particle animation in the background (theme-aware)
 * - Subtle orbital mini-planets behind the form (theme-aware)
 * - Interactive form inputs and send button (theme-aware)
 * - Social media icons with hover effects (theme-aware)
 * - Fully responsive and styled to match the galaxy theme
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionWrapper from './SectionWrapper';

/**
 * Particle Component
 * @description Background stars with theme-aware colors
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} size - Particle size
 * @param {number} duration - Animation duration
 * @param {number} delay - Animation delay
 * @param {number} scrollY - Current scroll position
 * @param {string} theme - Current theme ('light' or 'dark')
 */
const Particle = ({ x, y, size, duration, delay, scrollY, theme }) => (
  <motion.div
    className={`absolute rounded-full opacity-60 ${
      theme === 'dark' ? 'bg-white' : 'bg-galaxy-light-primary'
    }`}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    style={{
      width: size,
      height: size,
      top: y + scrollY * 0.05,
      left: x,
      boxShadow: theme === 'dark' 
        ? "0 0 5px rgba(255,255,255,0.3)" 
        : "0 0 5px rgba(74, 134, 232, 0.3)",
    }}
  />
);

/**
 * Orbital Planet Component
 * @description Mini planets orbiting behind the form with theme-aware colors
 * @param {number} size - Planet size
 * @param {string} color - Planet color
 * @param {number} distance - Orbit distance
 * @param {number} speed - Rotation speed
 * @param {string} theme - Current theme ('light' or 'dark')
 */
const OrbitalPlanet = ({ size, color, distance, speed, theme }) => {
  // Adjust planet colors for light theme
  const getPlanetColor = () => {
    if (theme === 'light') {
      // Map dark theme colors to light theme alternatives
      const colorMap = {
        '#ff6f91': '#ff9d9d', // Softer pink
        '#ffcb77': '#ffd699', // Softer orange
        '#6a5acd': '#8a79ff', // Softer purple
      };
      return colorMap[color] || color;
    }
    return color;
  };

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: getPlanetColor(),
        top: "50%",
        left: "50%",
        marginLeft: -distance / 2,
        marginTop: -distance / 2,
        boxShadow: `0 0 ${size * 2}px ${size}px ${getPlanetColor()}`,
        opacity: theme === 'light' ? 0.8 : 1,
      }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
    />
  );
};

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [particles, setParticles] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState('dark');

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

  // Generate background star particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * 500,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 8 + 5,
          delay: Math.random() * 5,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
    window.addEventListener("resize", generateParticles);
    window.addEventListener("scroll", () => setScrollY(window.scrollY));
    return () => {
      window.removeEventListener("resize", generateParticles);
      window.removeEventListener("scroll", () => setScrollY(window.scrollY));
    };
  }, []);

  // Floating animation for form card
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <SectionWrapper id="contact" className="min-h-screen flex items-center">
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden
                   bg-galaxy-radial from-galaxy-light-background to-galaxy-light-surface
                   dark:from-galaxy-dark-background dark:to-galaxy-dark-surface
                   py-12 md:py-20 px-4 md:px-6"
      >
        {/* Background star particles */}
        {particles.map((p) => (
          <Particle key={p.id} {...p} scrollY={scrollY} theme={theme} />
        ))}

        {/* Nebula glow - Theme aware */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{
            background: theme === 'dark' 
              ? "radial-gradient(circle, #4a00e0, transparent 70%)" 
              : "radial-gradient(circle, rgba(74, 134, 232, 0.3), transparent 70%)",
            top: "50%",
            left: "50%",
            marginLeft: "-250px",
            marginTop: "-250px",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbital planets - Theme aware */}
        <OrbitalPlanet size={12} color="#ff6f91" distance={120} speed={20} theme={theme} />
        <OrbitalPlanet size={8} color="#ffcb77" distance={180} speed={30} theme={theme} />
        <OrbitalPlanet size={10} color="#6a5acd" distance={220} speed={40} theme={theme} />

        {/* Title positioned at top center with spacing */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-galaxy-light-accent dark:text-galaxy-dark-accent mb-4 md:mb-6 text-center relative z-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Let's Talk
        </motion.h2>

        {/* Floating Form Card */}
        <motion.div
          className="relative w-11/12 max-w-xl p-6 md:p-8 rounded-2xl 
                     bg-galaxy-light-surface/20 dark:bg-galaxy-dark-surface/20 
                     backdrop-blur-md shadow-lg z-10 mt-6 md:mt-8
                     border border-galaxy-light-primary/20 dark:border-white/10"
          variants={floatingVariants}
          animate="float"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-center text-galaxy-light-text-muted dark:text-galaxy-dark-text-muted mb-6">
            Open to collaboration, growth, new opportunities!
          </p>

          <form ref={formRef} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name..."
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded px-4 py-2 
                         bg-galaxy-light-surface/50 dark:bg-white/10 
                         border border-galaxy-light-primary/20 dark:border-white/20 
                         text-galaxy-light-text dark:text-white
                         focus:outline-none focus:ring-2 
                         focus:ring-galaxy-light-primary dark:focus:ring-galaxy-dark-accent
                         placeholder-galaxy-light-text-muted/70 dark:placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email..."
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="rounded px-4 py-2 
                         bg-galaxy-light-surface/50 dark:bg-white/10 
                         border border-galaxy-light-primary/20 dark:border-white/20 
                         text-galaxy-light-text dark:text-white
                         focus:outline-none focus:ring-2 
                         focus:ring-galaxy-light-primary dark:focus:ring-galaxy-dark-accent
                         placeholder-galaxy-light-text-muted/70 dark:placeholder-gray-400"
            />
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              placeholder="Message..."
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="rounded px-4 py-2 
                         bg-galaxy-light-surface/50 dark:bg-white/10 
                         border border-galaxy-light-primary/20 dark:border-white/20 
                         text-galaxy-light-text dark:text-white
                         focus:outline-none focus:ring-2 
                         focus:ring-galaxy-light-primary dark:focus:ring-galaxy-dark-accent
                         placeholder-galaxy-light-text-muted/70 dark:placeholder-gray-400"
            />
            <button
              type="submit"
              className="mt-2 
                         bg-gradient-to-r from-galaxy-light-primary to-galaxy-light-secondary 
                         dark:from-galaxy-dark-primary dark:to-galaxy-dark-secondary 
                         text-white py-2 px-4 rounded shadow-lg 
                         hover:shadow-xl transition-all"
            >
              Send Message
            </button>
          </form>

          {/* Social media icons */}
          <div className="flex justify-center gap-4 mt-6">
            <a href="#" className="hover:scale-110 transition-transform">
              <Image 
                src="/linkedin.svg" 
                alt="LinkedIn" 
                width={32} 
                height={32} 
                className="filter dark:invert" 
              />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <Image 
                src="/github.svg" 
                alt="GitHub" 
                width={32} 
                height={32} 
                className="filter dark:invert" 
              />
            </a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;