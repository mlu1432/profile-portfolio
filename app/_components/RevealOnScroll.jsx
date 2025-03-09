/** 
 * RevealOnScroll.jsx
 * @description 
 * This component applies a scroll-based reveal animation to its children. 
 * It utilizes the Intersection Observer API to detect when the component 
 * enters the viewport, triggering a fade-in effect with a smooth transition. 
 */

"use client"; // ← Required for Next.js client components
import { useEffect, useRef, useState } from "react"; // Added useState

const RevealOnScroll = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // Added state

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // ← Use state instead of classList
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-10 transition-all duration-700 ease-out 
        ${isVisible ? "!opacity-100 !translate-y-0" : ""}`}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;