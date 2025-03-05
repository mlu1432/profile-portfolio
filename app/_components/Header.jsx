/** Header Component  
 *  Description: This section displays the main introduction of the portfolio, including titles, author details, and social links.
 */

import React from "react";
import Image from "next/image";
import RevealOnScroll from "../_components/RevealOnScroll";

const Header = () => {
  return (
    <header className="bg-light-yellow dark:bg-darkTheme py-10">
      {/* Title 1 */}
      <RevealOnScroll>
        <h1 className="text-4xl font-bold text-primary-blue dark:text-tnb-keywords font-segoe-ui w-[650px] 
          relative top-[20px] left-[395px]">
          ADAPTABLE & RESULTS-DRIVEN
        </h1>
      </RevealOnScroll>

      <RevealOnScroll>
        {/* Title 2 */}
        <h1 className="text-4xl font-bold text-primary-blue dark:text-tnb-keywords font-segoe-ui w-[650px] 
          relative top-[50px] left-[155px]">
          SOFTWARE ENGINEER
        </h1>
      </RevealOnScroll>

      <RevealOnScroll>
        {/* Title 3 */}
        <h1 className="relative top-[70px] left-[395px] text-4xl font-bold text-blue-600 dark:text-tnb-functions font-segoe-ui w-[400px] hover:text-primary-blue transition-colors">
          LUCAS SEKWATI
        </h1>
      </RevealOnScroll>

      {/* Author Section */}
      <div className="relative top-[110px] left-[155px] w-[600px]">
        <p className="text-lg text-gray-300 dark:text-tnb-text font-segoe-ui font-semibold">
          Welcome to my portfolio! I'm a passionate Junior Software Engineer
          specializing in front-end and back-end technologies. Explore my
          projects, skills, and achievements as I bring ideas to life through
          innovative and efficient coding solutions.
        </p>
      </div>

      {/* Talk Button */}
      <div className="relative top-[150px] left-[370px]">
        <button className="bg-primary-blue text-light-red font-segoe-ui text-xl rounded-full w-[160px]
         h-[50px] cursor-pointer hover:bg-blue-600 hover:text-red-talk hover:shadow-lg transition-all">
          Let's talk
        </button>
      </div>

      {/* Profile Image */}
      <div className="absolute top-[180px] left-[770px]">
        <Image
          src="/displayLu.jpg"
          alt="Profile Picture"
          width={300}
          height={300}
          className="rounded-full shadow-md"
        />
      </div>

      {/* Social Buttons */}
      <div className="relative top-[35px] left-[1100px] bottom-4 right-4 flex flex-col space-y-4 color-primary-blue">
        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/lucas-sekwati-723029bb" target="_blank" rel="noreferrer">
          <Image
            src="/linkedin.svg"
            alt="LinkedIn"
            width={32}
            height={32}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </a>
        {/* GitHub */}
        <a href="https://github.com/mlu1432?tab=repositories" target="_blank" rel="noreferrer">
          <Image
            src="/github.svg"
            alt="GitHub"
            width={32}
            height={32}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;