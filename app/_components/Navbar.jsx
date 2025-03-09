/** 
 *  @component Navbar
 * @description Main website navigation header with responsive menu and theme switching
 * @prop {ReactNode} children - No children props accepted (self-contained navigation)
 * 
 * @features
 * - Responsive desktop/mobile menu layouts
 * - Animated mobile menu transitions
 * - Theme switching functionality
 * - CV download button with icon
 * - Smooth scroll navigation
 *  
 */

"use client";
import Image from "next/image";
import React, { useState } from "react";
import RevealOnScroll from "../_components/RevealOnScroll";
import ThemeSwitcher from "../_components/ThemeSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="bg-light-yellow dark:bg-darkTheme dark:text-tnb-text fixed top-0 left-0 w-full h-20 z-50 shadow-xl px-5 lg:px-8 xl:px-[8%] flex items-center justify-between">
        <a href="#top">
          <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={72}
            className="cursor-pointer"
            priority
          />
        </a>

        <RevealOnScroll>
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3">
            <li>
              <a href="#home" className="font-semibold text-primary-blue dark:text-tnb-keywords hover:text-[#5c76a5] transition duration-300 ease-in-out">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="font-semibold text-primary-blue dark:text-tnb-keywords hover:text-[#5c76a5] transition duration-300 ease-in-out">
                About Me
              </a>
            </li>
            <li>
              <a href="#contact" className="font-semibold text-primary-blue dark:text-tnb-keywords hover:text-[#5c76a5] transition duration-300 ease-in-out">
                Contact
              </a>
            </li>
          </ul>
        </RevealOnScroll>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          <RevealOnScroll>
            <a
              href="/Lucas_Sekwati_-CV.pdf"
              download="Lucas_Sekwati_CV.pdf"
              className="hidden lg:flex items-center gap-2 px-6 py-2 bg-[#c4d0e6] text-[#2E89D7]
                         rounded-full font-segoe-ui font-semibold text-sm shadow-md hover:bg-[#2E89D7]
                         hover:text-[#9EADC9] hover:shadow-lg active:opacity-20 transition dark:bg-darkTheme dark:text-tnb-text dark:hover:bg-[#00346E]"
            >
              Download CV
              <Image
                src="/download-minimalistic.svg"
                alt="Download"
                width={16}
                height={16}
                style={{ width: 'auto', height: 'auto' }}
              />
            </a>
          </RevealOnScroll>

          <button
            className="block md:hidden ml-3"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Image
              src="/menu-alt.svg"
              alt="Menu"
              width={24}
              height={24}
              className="cursor-pointer"
              style={{ width: 'auto', height: 'auto' }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`fixed right-0 top-0 bottom-0 w-64 z-50 h-screen bg-light-yellow dark:bg-darkTheme
          flex flex-col gap-4 py-20 px-10 overflow-y-auto transition-transform duration-300 ease-in-out 
          transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
        >
          <div
            className="absolute right-6 top-6 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <Image
              src="/close-square.svg"
              alt="Close"
              width={24}
              height={24}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>

          <RevealOnScroll>
            <li>
              <a
                href="#home"
                onClick={() => setIsMenuOpen(false)}
                className="font-semibold text-primary-blue dark:text-tnb-text transition duration-300 ease-in-out"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="font-semibold text-primary-blue dark:text-tnb-text transition duration-300 ease-in-out"
              >
                About Me
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="font-semibold text-primary-blue dark:text-tnb-text transition duration-300 ease-in-out"
              >
                Contact
              </a>
            </li>
          </RevealOnScroll>
        </ul>
      </nav>

      <div className="pt-20"></div>
    </div>
  );
};

export default Navbar;