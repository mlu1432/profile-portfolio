"use client";

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * GalaxyScrollContext
 * Provides scroll-related state and functions to all child components.
 */
const GalaxyScrollContext = createContext();

/**
 * useGalaxyScroll
 * Custom hook to access the GalaxyScrollContext.
 * Throws an error if used outside of GalaxyScrollProvider.
 */
export const useGalaxyScroll = () => {
  const context = useContext(GalaxyScrollContext);
  if (!context) {
    throw new Error('useGalaxyScroll must be used within a GalaxyScrollProvider');
  }
  return context;
};

/**
 * GalaxyScrollProvider
 * Wraps your app/page and provides smooth scroll, active section tracking, and scroll progress.
 * Children components can register themselves as sections for navigation.
 */
export const GalaxyScrollProvider = ({ children }) => {
  /** State to track the currently visible section */
  const [activeSection, setActiveSection] = useState('header');

  /** Scroll progress from top of the page (0 to 1) */
  const [scrollProgress, setScrollProgress] = useState(0);

  /** Indicates whether a smooth scroll animation is in progress */
  const [isScrolling, setIsScrolling] = useState(false);

  /** Timeout ref to reset isScrolling after smooth scroll completes */
  const scrollTimeout = useRef(null);

  /** Object to store registered sections by id */
  const sections = useRef({});

  /** Framer Motion scroll value */
  const { scrollY } = useScroll();

  /** Smooth spring animation for scroll progress */
  const scrollYProgress = useSpring(scrollY, {
    damping: 30,
    stiffness: 100,
  });

  /**
   * registerSection
   * Adds a section to the registry with its DOM element.
   * @param {string} id - Unique section id
   * @param {HTMLElement} element - Section DOM element
   */
  const registerSection = (id, element) => {
    sections.current[id] = element;
  };

  /**
   * unregisterSection
   * Removes a section from the registry
   * @param {string} id - Unique section id
   */
  const unregisterSection = (id) => {
    delete sections.current[id];
  };

  /**
   * scrollToSection
   * Smoothly scrolls to a registered section by id
   * @param {string} id - Section id
   */
  const scrollToSection = (id) => {
    const element = sections.current[id];
    if (element) {
      setIsScrolling(true);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Clear previous timeout if any
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // Reset scrolling state after animation
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        setActiveSection(id);
      }, 1000);
    }
  };

  /**
   * Effect: Update activeSection based on scroll position
   * - Calculates which section is currently visible in viewport
   * - Updates activeSection if user scrolls manually
   */
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setScrollProgress(latest);

      const sectionIds = Object.keys(sections.current);
      let currentSection = 'header';

      for (const id of sectionIds) {
        const element = sections.current[id];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            currentSection = id;
            break;
          }
        }
      }

      if (currentSection !== activeSection && !isScrolling) {
        setActiveSection(currentSection);
      }
    });

    return () => unsubscribe();
  }, [scrollY, activeSection, isScrolling]);

  /** Return provider with context values and scroll progress bar */
  return (
    <GalaxyScrollContext.Provider value={{
      activeSection,
      scrollProgress,
      scrollToSection,
      registerSection,
      unregisterSection,
      isScrolling
    }}>
      {children}

      {/* Scroll progress indicator at top of page */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </GalaxyScrollContext.Provider>
  );
};