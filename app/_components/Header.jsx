// components/Header.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import SectionWrapper from './SectionWrapper';
import { useGalaxyScroll } from './GalaxyScrollProvider';

/**
 * Particle Component
 * Represents a small floating dot with parallax effect on scroll.
 * Now theme-aware with different colors for light and dark modes.
 *
 * @param {number} x - X position of the particle
 * @param {number} y - Y position of the particle
 * @param {number} size - Diameter of the particle
 * @param {number} scrollY - Current vertical scroll value
 * @param {number} speed - Parallax speed multiplier for particle movement
 * @param {string} theme - Current theme ('light' or 'dark')
 */
const Particle = ({ x, y, size, scrollY, speed, theme }) => {
  const parallaxOffset = scrollY * speed;

  return (
    <motion.div
      className={`absolute rounded-full ${theme === 'dark'
        ? 'bg-white'
        : 'bg-galaxy-light-primary'
        }`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y + parallaxOffset,
        boxShadow: theme === 'dark'
          ? "0 0 5px rgba(255,255,255,0.4)"
          : "0 0 5px rgba(74, 134, 232, 0.4)"
      }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: Math.random() * 4,
      }}
    />
  );
};

/**
 * Header Component
 * The main hero section with:
 * - Background particles (stars) and nebula glow (theme-aware)
 * - Floating profile image
 * - Gradient animated title (theme-aware)
 * - Description text (theme-aware)
 * - Gradient CTA buttons with hover effects (theme-aware)
 * - Scroll indicator for desktop (theme-aware)
 */
const Header = () => {
  /** Particles data */
  const [particles, setParticles] = useState([]);
  /** Track scroll for parallax */
  const [scrollY, setScrollY] = useState(0);
  /** Detect if device is mobile */
  const [isMobile, setIsMobile] = useState(false);
  /** Current theme state */
  const [theme, setTheme] = useState('dark');
  /** Reference to header container */
  const containerRef = useRef(null);
  /** Smooth scroll function from GalaxyScrollProvider */
  const { scrollToSection } = useGalaxyScroll();

  /**
   * Detect if the screen is mobile and update state
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
   * Listen to window scroll and update scrollY
   */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Generate particles randomly with parallax speed
   * Count is lower for mobile screens
   */
  const generateParticles = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const count = isMobile ? 15 : 25;

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speed: 0.05 + Math.random() * 0.1,
    }));

    setParticles(newParticles);
  }, [isMobile]);

  /** Generate particles on mount and on resize */
  useEffect(() => {
    generateParticles();
    window.addEventListener("resize", generateParticles);
    return () => window.removeEventListener("resize", generateParticles);
  }, [generateParticles, isMobile]);

  /** Floating animation for profile image */
  const floating = {
    float: {
      y: [-8, 8, -8],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  /** Gradient animation for title text */
  const gradientText = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { duration: 10, repeat: Infinity, ease: "linear" }
    }
  };

  /** Nebula offset for smooth parallax */
  const nebulaTopOffset = scrollY * 0.04;
  const nebulaBottomOffset = scrollY * 0.025;

  /**
   * Handle navigation to sections using smooth scroll
   * @param {string} sectionId - Target section ID
   */
  const handleNavigation = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <SectionWrapper id="header">
      <header
        ref={containerRef}
        className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-segoe-ui text-center
                   bg-galaxy-radial from-galaxy-light-background to-galaxy-light-surface
                   dark:from-galaxy-dark-background dark:to-galaxy-dark-surface"
      >
        {/* Background Particles and Nebula */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <Particle key={p.id} {...p} scrollY={scrollY} speed={p.speed} theme={theme} />
          ))}

          {/* Nebula soft glows - Theme aware */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 blur-xl"
            style={{
              background: theme === 'dark'
                ? "radial-gradient(circle, #4a00e0, transparent 70%)"
                : "radial-gradient(circle, rgba(74, 134, 232, 0.3), transparent 70%)",
              transform: `translateY(${nebulaTopOffset}px)`
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-20 blur-xl"
            style={{
              background: theme === 'dark'
                ? "radial-gradient(circle, #00d2ff, transparent 70%)"
                : "radial-gradient(circle, rgba(255, 157, 0, 0.3), transparent 70%)",
              transform: `translateY(${nebulaBottomOffset}px)`
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Main Content */}
        <motion.div className="relative z-10 flex flex-col items-center px-4 w-full max-w-6xl mx-auto">
          {/* Profile Picture with Floating Animation */}
          <motion.div
            className="relative rounded-full overflow-hidden mb-4 md:mb-6 shadow-md group
                       border border-galaxy-light-primary/30 dark:border-white/20"
            variants={floating}
            animate="float"
            style={{
              width: isMobile ? "120px" : "clamp(120px,25vw,180px)",
              height: isMobile ? "120px" : "clamp(120px,25vw,180px)"
            }}
          >
            <Image
              src="/displayLu.jpg"
              alt="Lucas Sekwati profile"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
              sizes="(max-width: 768px) 120px, 180px"
            />
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: theme === 'dark'
                  ? "0 0 30px rgba(100,200,255,0.5)"
                  : "0 0 30px rgba(74, 134, 232, 0.4)",
                background: theme === 'dark'
                  ? "radial-gradient(circle, transparent 30%, rgba(100,200,255,0.2) 70%)"
                  : "radial-gradient(circle, transparent 30%, rgba(74, 134, 232, 0.1) 70%)"
              }} />
          </motion.div>

          {/* Name */}
          <h3 className="text-xl md:text-2xl font-bold text-galaxy-light-accent dark:text-galaxy-dark-accent mb-2 md:mb-4 px-2">
            LUCAS SEKWATI
          </h3>

          {/* Animated Title */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight px-4 -mt-1 mb-4 md:mb-6"
            style={{
              backgroundImage: theme === 'dark'
                ? "linear-gradient(90deg, #4facfe, #00f2fe, #4facfe)"
                : "linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-primary))",
              backgroundSize: "200% auto",
              backgroundPosition: "0% 50%",
              backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: theme === 'dark'
                ? "0 0 15px rgba(79,172,254,0.5)"
                : "0 0 15px rgba(74, 134, 232, 0.3)"
            }}
            variants={gradientText}
            animate="animate"
          >
            Full-Stack Developer | Node.js
          </motion.h1>

          {/* Description */}
          <p className="max-w-2xl text-galaxy-light-text dark:text-galaxy-dark-text text-sm sm:text-base md:text-lg text-center mb-6 md:mb-8 px-4">
            Transforming ideas into scalable digital solutions. Specializing in JavaScript ecosystems with focus on user experience and maintainable code.
          </p>

          {/* Gradient CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center md:gap-4 mb-4 w-full max-w-md px-4">
            <motion.button
              onClick={() => handleNavigation('contact')}
              className="bg-gradient-to-r from-galaxy-light-primary to-galaxy-light-secondary 
                         dark:from-galaxy-dark-primary dark:to-galaxy-dark-secondary 
                         text-white py-2 md:py-3 px-4 md:px-6 rounded-full hover:shadow-lg transition-all text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
            </motion.button>
            <motion.button
              onClick={() => handleNavigation('projects')}
              className="bg-gradient-to-r from-galaxy-light-secondary to-galaxy-light-accent 
                         dark:from-galaxy-dark-secondary dark:to-galaxy-dark-accent 
                         text-white py-2 md:py-3 px-4 md:px-6 rounded-full hover:shadow-lg transition-all text-sm md:text-base mt-2 sm:mt-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Projects
            </motion.button>
          </div>
        </motion.div>
      </header>
    </SectionWrapper>
  );
};

export default Header;