/**
 * RootLayout.jsx
 * @description This component serves as the root layout for the portfolio website.
 * It defines global metadata such as the title and description,
 * applies global styles, and sets up the base HTML structure.
 * Now includes GalaxyScrollProvider for smooth scrolling functionality.
 * Enhanced with theme system integration for Light/Dark Galaxy themes.
 */

import "./globals.css";
import { GalaxyScrollProvider } from "@/_components/GalaxyScrollProvider";
import CosmicNavbar from "@/_components/CosmicNavbar";

export const metadata = {
  title: "Portfolio - Lucas Sekwati",
  description: "Showcasing the work and skills of Lucas Sekwati, a passionate software developer specializing in JavaScript ecosystems and full-stack development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth theme-transition">
      <body className="antialiased font-segoe-ui leading-4 overflow-x-hidden 
        bg-galaxy-light-background text-galaxy-light-text
        dark:bg-galaxy-dark-background dark:text-galaxy-dark-text">
        <GalaxyScrollProvider>
          <CosmicNavbar />
          <main className="relative">
            {children}
          </main>
        </GalaxyScrollProvider>
      </body>
    </html>
  );
}