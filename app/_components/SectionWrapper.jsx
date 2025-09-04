"use client";

import { useGalaxyScroll } from './GalaxyScrollProvider';
import { useRef, useEffect } from 'react';

const SectionWrapper = ({ id, children, className = '' }) => {
  const sectionRef = useRef(null);
  const { registerSection, unregisterSection } = useGalaxyScroll();

  useEffect(() => {
    if (sectionRef.current) {
      registerSection(id, sectionRef.current);
    }

    return () => {
      unregisterSection(id);
    };
  }, [id, registerSection, unregisterSection]);

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`relative min-h-screen flex items-center justify-center ${className}`}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;