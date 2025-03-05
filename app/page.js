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
import Navbar from "./_components/Navbar";
import Header from "./_components/Header";
import About from "./_components/About";
import Skills from "./_components/Skills";
import Projects from "./_components/Projects";
import Contact from "./_components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1700); // simulate a 1,7-second delay
  }, []);

  if (isLoading) {
    return <Loading message="Loading..." />;
  }

  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}