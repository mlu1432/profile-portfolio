"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * EnhancedThemeSwitcher Component
 * @description A visually rich theme toggle switch with animations
 * @features
 * - Smooth transitions between light and dark galaxy themes
 * - Animation effects with Framer Motion
 * - Persistent theme storage in localStorage
 * - Prevents hydration mismatch errors
 * - Accessible ARIA labels
 * - Visual feedback for current theme
 */
export default function EnhancedThemeSwitcher() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  /**
   * Toggle between light and dark themes
   * Adds smooth transition class during theme change
   */
  const toggleTheme = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Add transition class to body for smooth theme change
    document.documentElement.classList.add("theme-transition");
    
    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
        setIsAnimating(false);
      }, 300);
    }, 150);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button 
        className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 px-1 flex items-center transition-colors"
        aria-label="Loading theme"
      >
        <div className="w-6 h-6 rounded-full bg-white shadow-md"></div>
      </button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full px-1 flex items-center transition-colors ${
        theme === "dark" 
          ? "bg-purple-900" 
          : "bg-gradient-to-r from-blue-300 to-yellow-200"
      }`}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
          theme === "dark" 
            ? "bg-gradient-to-br from-indigo-500 to-purple-700" 
            : "bg-gradient-to-br from-yellow-300 to-orange-400"
        }`}
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {theme === "dark" ? (
          <motion.svg
            key="moon"
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 30, opacity: 0 }}
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            initial={{ rotate: 30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -30, opacity: 0 }}
            className="w-4 h-4 text-orange-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </motion.svg>
        )}
      </motion.div>
      
      {/* Stars for dark theme */}
      {theme === "dark" && (
        <>
          <div className="absolute top-1 left-6 w-1 h-1 rounded-full bg-blue-300 opacity-70"></div>
          <div className="absolute top-4 left-8 w-0.5 h-0.5 rounded-full bg-white opacity-90"></div>
          <div className="absolute bottom-2 left-7 w-0.5 h-0.5 rounded-full bg-yellow-200 opacity-80"></div>
        </>
      )}
      
      {/* Sun rays for light theme */}
      {theme === "light" && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute top-0 left-4 w-0.5 h-1 bg-yellow-300 opacity-70 rounded-full"></div>
          <div className="absolute top-2 right-2 w-0.5 h-1 bg-yellow-300 opacity-70 rounded-full transform rotate-45"></div>
          <div className="absolute bottom-1 left-3 w-0.5 h-1 bg-yellow-300 opacity-70 rounded-full transform -rotate-45"></div>
        </div>
      )}
    </motion.button>
  );
}