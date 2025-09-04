/** 
 * Home.jsx
 * @description This is the main homepage component of the portfolio website. 
 * It includes a simulated loading screen before displaying the content.
 * The component imports and renders key sections like Navbar, Header, About, 
 * Skills, Projects, and Contact. The `useEffect` hook manages a loading 
 * state that delays rendering for 1.7 seconds to enhance user experience.
 */

"use client";
import { useState, useEffect } from "react";
import Loading from "./_components/Loading";
import Header from "./_components/Header.jsx";
import About from "./_components/About";
import Skills from "./_components/Skills";
import Projects from "./_components/Projects";
import Contact from "./_components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 1-second loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading message="Loading..." />;
  }

  return (
    <>
      <Header />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
