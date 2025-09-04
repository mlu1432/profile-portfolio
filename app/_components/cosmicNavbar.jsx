// components/CosmicNavbar.jsx
/** 
 * @component CosmicNavbar
 * @description Galaxy-themed navigation with smooth scrolling, active section detection, and cosmic effects
 * 
 * @features
 * - Responsive desktop/mobile menu layouts with cosmic animations
 * - Theme switching functionality with galaxy-themed transitions
 * - CV download button with cosmic styling
 * - Smooth scroll navigation with progress indicator
 * - Active section detection with nebula glow effects
 * - Performance optimized with passive scroll listeners
 * - Full theme system integration with Light/Dark Galaxy themes
 */

"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeSwitcher from "../_components/ThemeSwitcher";

const CosmicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('header');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll listener for navbar background and active section detection
  useEffect(() => {
    const handleScroll = () => {
      // Navbar background on scroll
      setScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
      
      // Detect active section based on scroll position
      const sections = ['header', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsMenuOpen(false);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Navigation items
  const navItems = [
    { id: 'header', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div>
      <motion.nav 
        className={`fixed top-0 left-0 w-full h-20 z-50 px-5 lg:px-8 xl:px-[8%] flex items-center justify-between transition-all duration-300 ${
          scrolled 
            ? 'bg-galaxy-light-surface/80 dark:bg-galaxy-dark-surface/80 backdrop-blur-md shadow-xl' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.a 
          href="#header"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('header');
          }}
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image
            src="/logo.svg"
            alt="Lucas Sekwati Logo"
            width={100}
            height={72}
            priority
            className="filter dark:invert"
          />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-8 py-3 
                       bg-galaxy-light-surface/30 dark:bg-galaxy-dark-surface/30 backdrop-blur-sm
                       border border-galaxy-light-primary/20 dark:border-galaxy-dark-primary/20">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeSection === item.id 
                  ? 'text-galaxy-light-accent dark:text-galaxy-dark-accent' 
                  : 'text-galaxy-light-text-muted dark:text-galaxy-dark-text-muted hover:text-galaxy-light-primary dark:hover:text-galaxy-dark-primary'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="absolute inset-0 bg-galaxy-light-accent/20 dark:bg-galaxy-dark-accent/20 rounded-full -z-10"
                  layoutId="activeSection"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          {/* Download CV Button */}
          <motion.a
            href="/Lucas_Sekwati_-CV.pdf"
            download="Lucas_Sekwati_CV.pdf"
            className="hidden lg:flex items-center gap-2 px-6 py-2 
                       bg-gradient-to-r from-galaxy-light-primary to-galaxy-light-secondary 
                       dark:from-galaxy-dark-primary dark:to-galaxy-dark-secondary 
                       text-white rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
            <Image
              src="/download-minimalistic.svg"
              alt="Download"
              width={16}
              height={16}
              className="w-auto h-auto filter invert"
            />
          </motion.a>

          {/* Mobile Menu Toggle */}
          <motion.button 
            className="block md:hidden ml-3 text-galaxy-light-accent dark:text-galaxy-dark-accent"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open mobile menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src="/menu-alt.svg"
              alt="Menu"
              width={24}
              height={24}
              className="w-auto h-auto filter dark:invert"
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: isMenuOpen ? 'block' : 'none' }}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <motion.div
        className={`fixed right-0 top-0 bottom-0 w-64 z-50 h-screen 
                   bg-gradient-to-b from-galaxy-light-background to-galaxy-light-surface/90
                   dark:from-galaxy-dark-surface dark:to-galaxy-dark-background
                   flex flex-col gap-6 py-24 px-8 overflow-y-auto transition-transform duration-300 ease-in-out 
                   transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
        initial={{ x: 300 }}
        animate={{ x: isMenuOpen ? 0 : 300 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button - Smaller and more user-friendly */}
        <motion.button
          className="absolute right-4 top-4 p-1.5 rounded-full bg-white/10 dark:bg-black/20 
                     backdrop-blur-sm border border-galaxy-light-primary/20 dark:border-white/20
                     text-galaxy-light-accent dark:text-galaxy-dark-accent hover:bg-white/20 dark:hover:bg-black/30
                     transition-all duration-200"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close mobile menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
          >
            <path 
              d="M18 6L6 18M6 6L18 18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        {/* Mobile Navigation Items */}
        <div className="flex flex-col space-y-6">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-xl font-bold text-center py-3 rounded-lg transition-all ${
                activeSection === item.id 
                  ? 'text-galaxy-light-accent dark:text-galaxy-dark-accent bg-galaxy-light-accent/20 dark:bg-galaxy-dark-accent/20' 
                  : 'text-galaxy-light-text-muted dark:text-galaxy-dark-text-muted hover:text-galaxy-light-primary dark:hover:text-galaxy-dark-primary hover:bg-galaxy-light-primary/10 dark:hover:bg-galaxy-dark-primary/10'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ))}
          
          {/* Mobile Download CV Button */}
          <motion.a
            href="/Lucas_Sekwati_-CV.pdf"
            download="Lucas_Sekwati_CV.pdf"
            className="flex items-center justify-center gap-2 px-6 py-3 
                       bg-gradient-to-r from-galaxy-light-primary to-galaxy-light-secondary 
                       dark:from-galaxy-dark-primary dark:to-galaxy-dark-secondary 
                       text-white rounded-lg font-semibold shadow-md mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(false)}
          >
            Download CV
            <Image
              src="/download-minimalistic.svg"
              alt="Download"
              width={18}
              height={18}
              className="w-auto h-auto filter invert"
            />
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-galaxy-light-surface/30 dark:bg-galaxy-dark-surface/30">
        <motion.div 
          className="h-full bg-gradient-to-r from-galaxy-light-primary to-galaxy-light-secondary 
                     dark:from-galaxy-dark-primary dark:to-galaxy-dark-secondary"
          style={{ scaleX: scrollProgress / 100, transformOrigin: '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="pt-20"></div>
    </div>
  );
};

export default CosmicNavbar;