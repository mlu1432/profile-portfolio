/** 
 * RevealOnScroll.jsx
 * @description 
 * This component applies a scroll-based reveal animation to its children. 
 * It utilizes the Intersection Observer API to detect when the component 
 * enters the viewport, triggering a fade-in effect with a smooth transition. 
 */

import { useEffect, useRef } from "react";

const RevealOnScroll = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add("visible");
          observer.unobserve(ref.current); // Stops observing after animation triggers (better performance)
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []); // Empty dependency array ensures it runs once

  return (
    <div ref={ref} className="opacity-0 transition-all duration-700 ease-out transform translate-y-10 reveal">
      {children}
    </div>
  );
};

export default RevealOnScroll;