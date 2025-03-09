/**
 * Header Component
 * @description Main header section showcasing portfolio introduction
 * @prop {ReactNode} children - No children props accepted (presentational component)
 * 
 */

"use client";
import Image from "next/image";
import RevealOnScroll from "../_components/RevealOnScroll";

const Header = () => {
  return (
    <header className="w-11/12 max-w-3xl text-center mx-auto min-h-screen flex flex-col items-center justify-center gap-1">
      {/* Profile Image */}
      <div className="relative w-40 h-40 rounded-full shadow-md overflow-hidden group -mt-2">
        <Image
          src="/displayLu.jpg"
          alt="Lucas Sekwati profile picture"
          fill
          sizes="(max-width: 768px) 128px, 180px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      {/* Name */}
      <h3 className="font-bold text-xl md:text-2xl text-blue-600 dark:text-tnb-functions hover:text-primary-blue transition-colors -mt-1">
        LUCAS SEKWATI
      </h3>

      {/* Title */}
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-primary-blue dark:text-tnb-keywords leading-tight px-4 -mt-1">
        Versatile & Driven Software Engineer
      </h1>

      {/* Description -  */}
      <p className="max-w-2xl mx-auto text-gray-900 dark:text-tnb-text font-medium sm:font-semibold text-base sm:text-lg leading-relaxed px-4 mt-4">
        Passionate about crafting efficient full-stack solutions. Turning ideas into reality through clean, innovative code and modern architectures.
      </p>

      {/* Buttons */}
      <nav className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <a
          href="#contact"
          className="bg-primary-blue text-white text-lg sm:text-xl rounded-full px-6 sm:px-8 py-2 sm:py-3
                     hover:bg-blue-700 hover:shadow-xl transition-all duration-300 focus:outline-none
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-darkTheme"
          aria-label="Contact Lucas Sekwati"
        >
          Let's Talk
        </a>

        <a
          href="#projects"
          className="bg-yellow-400 text-primary-blue text-lg sm:text-xl rounded-full px-6 sm:px-8 py-2 sm:py-3
                     hover:bg-yellow-500 hover:shadow-xl transition-all duration-300 focus:outline-none
                     focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-darkTheme"
          aria-label="View projects by Lucas Sekwati"
        >
          Projects
        </a>
      </nav>

    </header>
  );
};

export default Header;