// components/About.jsx

/**
 * About Section - Galaxy Themed
 * @description Cosmic-inspired About Me section with:
 * - Animated background particles with parallax (theme-aware)
 * - Nebula soft glows (theme-aware)
 * - Floating profile image
 * - Reveal-on-scroll for text and cards
 * - Education and Technical Experience cards with hover effects (theme-aware)
 * Fully responsive for mobile and desktop, optimized for performance.
 * 
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionWrapper from './SectionWrapper';

/**
 * Particle Component
 * @description Small floating dot with parallax and fade/scale animation.
 * Now theme-aware with different colors for light and dark modes.
 * @param {number} x - X position of the particle
 * @param {number} y - Y position of the particle
 * @param {number} size - Diameter of the particle
 * @param {number} duration - Duration of the animation cycle
 * @param {number} delay - Initial animation delay
 * @param {number} scrollY - Current scroll position for parallax
 * @param {string} theme - Current theme ('light' or 'dark')
 */
const Particle = ({ x, y, size, duration, delay, scrollY, theme }) => {
  const parallaxY = y + scrollY * 0.05; // subtle parallax effect
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${
        theme === 'dark' ? 'bg-white' : 'bg-galaxy-light-primary'
      }`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        width: size,
        height: size,
        left: x,
        top: parallaxY,
        boxShadow: theme === 'dark'
          ? "0 0 6px rgba(255,255,255,0.4)"
          : "0 0 6px rgba(74, 134, 232, 0.4)",
      }}
    />
  );
};

/**
 * About Component
 * @description Main About Me section
 * - Floating profile image
 * - Animated title (theme-aware)
 * - Paragraph description with scroll reveal (theme-aware)
 * - Education and Technical Experience cards with hover effects (theme-aware)
 * - Background particles and nebula effects (theme-aware)
 */
const About = () => {
  /** Particle data state */
  const [particles, setParticles] = useState([]);
  /** Track vertical scroll for parallax */
  const [scrollY, setScrollY] = useState(0);
  /** Detect if device is mobile */
  const [isMobile, setIsMobile] = useState(false);
  /** Current theme state */
  const [theme, setTheme] = useState('dark');
  /** Ref to container for particle generation */
  const containerRef = useRef(null);

  /**
   * Check if screen is mobile and update state
   */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Get current theme from document class
   */
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

  /**
   * Generate random particles with unique size, duration, and delay
   */
  useEffect(() => {
    const generateParticles = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const newParticles = [];
      const count = isMobile ? 25 : 40; // fewer on mobile

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

  /**
   * Track scroll position for parallax effect
   */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Variants for scroll reveal */
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  /** Variants for floating profile image */
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <SectionWrapper id="about" className="min-h-screen flex items-center">
      <div
        ref={containerRef}
        className="w-full min-h-screen relative overflow-hidden flex flex-col justify-center
                   bg-galaxy-radial from-galaxy-light-background to-galaxy-light-surface
                   dark:from-galaxy-dark-background dark:to-galaxy-dark-surface
                   py-12 md:py-20 px-4 sm:px-6 md:px-[12%]"
      >
        {/* Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <Particle key={p.id} {...p} scrollY={scrollY} theme={theme} />
          ))}

          {/* Nebula Effects - Theme aware */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 rounded-full opacity-20 blur-xl"
            style={{
              background: theme === 'dark'
                ? "radial-gradient(circle, #4a00e0, transparent 70%)"
                : "radial-gradient(circle, rgba(74, 134, 232, 0.3), transparent 70%)",
              y: scrollY * 0.05
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48 rounded-full opacity-20 blur-xl"
            style={{
              background: theme === 'dark'
                ? "radial-gradient(circle, #00d2ff, transparent 70%)"
                : "radial-gradient(circle, rgba(255, 157, 0, 0.3), transparent 70%)",
              y: scrollY * -0.05
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Section Title */}
        <motion.h2
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 lg:mb-16
                     text-galaxy-light-accent dark:text-galaxy-dark-accent"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          About Me
        </motion.h2>

        {/* Profile & Text */}
        <div className="w-full flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
          {/* Floating Profile Image */}
          <motion.div
            className="relative w-full max-w-[280px] md:max-w-[300px] h-[400px] md:h-[500px] flex-shrink-0 rounded-2xl md:rounded-3xl shadow-lg overflow-hidden mx-auto lg:mx-0
                       border border-galaxy-light-primary/30 dark:border-white/20"
            variants={floatingVariants}
            animate="float"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src="/profile2.jpg"
              alt="Lucas Sekwati profile picture"
              fill
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 300px, 300px"
              style={{ objectFit: "cover" }}
              className="hover:scale-105 transition-transform duration-300"
              priority
            />
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: theme === 'dark'
                  ? "0 0 40px rgba(100,200,255,0.3)"
                  : "0 0 40px rgba(74, 134, 232, 0.3)",
                background: theme === 'dark'
                  ? "radial-gradient(circle, transparent 30%, rgba(100,200,255,0.1) 70%)"
                  : "radial-gradient(circle, transparent 30%, rgba(74, 134, 232, 0.1) 70%)"
              }}
            />
          </motion.div>

          {/* About Me Text */}
          <motion.div
            className="w-full lg:w-[600px] text-left md:text-justify"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <p className="text-sm sm:text-base md:text-lg text-galaxy-light-text dark:text-galaxy-dark-text leading-relaxed md:leading-loose space-y-3 md:space-y-4">
              In December 2022, I took a major step and joined the ALX Software Engineering Program,
              a 12-month intensive course that began in February 2023. Balancing full-time work with
              rigorous studies was challenging, requiring sacrifices, long nights, and perseverance.
              But in November 2024, my hard work paid off—I successfully graduated.

              <br /><br />

              Before transitioning into tech, I built a strong foundation in retail, honing problem-solving,
              adaptability, and customer empathy. Now, as a software developer,
              I apply these strengths to create user-focused solutions with cutting-edge technologies.

              <br /><br />

              Driven by a passion for problem-solving and innovation,
              I specialize in building dynamic front-end interfaces and efficient back-end systems,
              bridging functionality and creativity to deliver impactful applications.
            </p>
          </motion.div>
        </div>

        {/* Education & Technical Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mt-12 md:mt-16 lg:mt-20 items-start text-center">
          {/* Education Card */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-5 md:p-6 lg:p-8 xl:p-10 rounded-xl md:rounded-2xl
                       border border-galaxy-light-primary/20 dark:border-galaxy-dark-primary/30
                       bg-galaxy-light-surface dark:bg-galaxy-dark-surface
                       shadow-[0_0_20px_rgba(100,200,255,0.2)] dark:shadow-[0_0_20px_rgba(100,200,255,0.3)]
                       w-full mx-auto transition-all"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <motion.h3
              className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 lg:mb-6
                         text-galaxy-light-accent dark:text-galaxy-dark-accent"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🎓 Education
            </motion.h3>
            <ul className="text-sm md:text-base lg:text-lg text-galaxy-light-text dark:text-galaxy-dark-text space-y-2 md:space-y-3">
              <li>
                <strong>ALX Software Engineering Program</strong> – Back-end Specialization
              </li>
              <li>
                <span className="text-galaxy-light-primary dark:text-galaxy-dark-accent">Completion Date:</span> November 22, 2024
              </li>
              <li>
                <span className="text-galaxy-light-primary dark:text-galaxy-dark-accent">Issued Date:</span> November 29, 2024
              </li>
              <li>
                <a
                  href="https://intranet.alxswe.com/certificates/pHRaXF93Mc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-galaxy-light-primary dark:text-galaxy-dark-accent underline font-semibold
                             hover:text-galaxy-light-secondary dark:hover:text-galaxy-dark-primary transition-colors"
                  aria-label="View ALX certification"
                >
                  📜 View Certificate
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Technical Experience Card */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-5 md:p-6 lg:p-8 xl:p-10 rounded-xl md:rounded-2xl
                       border border-galaxy-light-primary/20 dark:border-galaxy-dark-primary/30
                       bg-galaxy-light-surface dark:bg-galaxy-dark-surface
                       shadow-[0_0_20px_rgba(100,200,255,0.2)] dark:shadow-[0_0_20px_rgba(100,200,255,0.3)]
                       w-full mx-auto transition-all"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <motion.h3
              className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 lg:mb-6
                         text-galaxy-light-accent dark:text-galaxy-dark-accent"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              💻 Technical Experience
            </motion.h3>
            <ul className="text-sm md:text-base lg:text-lg text-galaxy-light-text dark:text-galaxy-dark-text space-y-2 md:space-y-3">
              <li>
                Developed hands-on projects using JavaScript, Node.js, Express.js, MongoDB, SQL, and React.js.
              </li>
              <li>
                Open to software development roles, internships, and freelance opportunities.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;