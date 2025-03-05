/** Component: About  
 *  Description: This section provides an overview of the developer's background, 
 *  including education, technical experience, and a short bio.
 */

import React from "react";
import Image from "next/image";
import RevealOnScroll from "../_components/RevealOnScroll";

const About = () => {
  return (
    <div id="about" className="w-full px-[12%] py-20 scroll-mt-20 bg-light-yellow dark:bg-darkTheme dark:text-tnb-text">
      {/* Section Title */}
      <RevealOnScroll>
        <h2 className="text-center text-5xl text-primary-blue dark:text-tnb-keywords font-bold mb-16">
          About Me
        </h2>

        {/* Profile & About Me Section */}
        <div className="w-full flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Image
              src="/profile2.jpg"
              alt="profile picture"
              width={300}
              height={500}
              className="rounded-3xl shadow-md"
            />
          </div>

          {/* About Me Text */}
          <div className="w-full lg:w-[600px] text-justify">
            <p className="text-lg text-gray-900 dark:text-tnb-text leading-relaxed">
              In December 2022, I took a major step and joined the ALX Software Engineering Program,
              a 12-month intensive course that began in February 2023. Balancing full-time work with
              rigorous studies was challenging, requiring sacrifices, long nights, and perseverance.
              But in November 2024, my hard work paid off—I successfully graduated.
              <br />
              <br />
              Before transitioning into tech, I built a strong foundation in retail, honing problem-solving,
              adaptability, and customer empathy. Now, as a software developer,
              I apply these strengths to create user-focused solutions with cutting-edge technologies.
              <br />
              <br />
              Driven by a passion for problem-solving and innovation,
              I specialize in building dynamic front-end interfaces and efficient back-end systems,
              bridging functionality and creativity to deliver impactful applications.
            </p>
          </div>
        </div>

        {/* Education & Technical Experience Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 items-start text-center">
          {/* Education Section */}
          <div className="p-10 rounded-2xl border border-gray-300 dark:border-tnb-keywords bg-primary-blue 
                          dark:bg-darkTheme text-white shadow-lg w-full mx-auto hover:-translate-y-1 transition-all">
            <h3 className="text-2xl text-white dark:text-tnb-keywords font-bold mb-6"> 🎓 Education </h3>
            <ul className="text-lg text-white dark:text-tnb-text text-center">
              <li>
                <strong>ALX Software Engineering Program</strong> – Back-end Specialization
              </li>
              <li>
                <span className="text-blue-600 dark:text-tnb-variables">Completion Date:</span> November 22, 2024
              </li>
              <li>
                <span className="text-blue-600 dark:text-tnb-variables">Issued Date:</span> November 29, 2024
              </li>
              <li>
                <a
                  href="https://intranet.alxswe.com/certificates/pHRhXF93Mc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-tnb-strings underline font-semibold text-lg"
                >
                  📜 View Certificate
                </a>
              </li>
            </ul>
          </div>

          {/* Technical Experience Section */}
          <div className="p-10 rounded-2xl border border-gray-300 dark:border-tnb-keywords bg-primary-blue 
                          dark:bg-darkTheme text-white shadow-lg w-full mx-auto hover:-translate-y-1 transition-all">
            <h3 className="text-2xl text-white dark:text-tnb-keywords font-bold mb-6"> 💻 Technical Experience </h3>
            <ul className="text-lg text-center text-white dark:text-tnb-text">
              <li>
                Developed hands-on projects using JavaScript, Node.js, Express.js, MongoDB, SQL, and React.js.
              </li>
              <li>
                Open to software development roles, internships, and freelance opportunities.
              </li>
            </ul>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default About;