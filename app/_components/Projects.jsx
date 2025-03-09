/** 
 * Projects.jsx
 * @description 
 * This component renders a list of projects with details such as title, description, features, 
 * tech stack, images, and links to GitHub and design tools.
 */

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RevealOnScroll from "../_components/RevealOnScroll";

const projects = [
  {
    title: "FirstCare Healthcare Appointment Booking",
    description:
      "FirstCare is a full-stack platform connecting patients to healthcare professionals through seamless appointment scheduling and management.",
    features: [
      "User Authentication: Secure user registration and login via Firebase.",
      "Provider Profiles: Comprehensive healthcare provider details with specialties and availability.",
      "Appointment Management: Book, view, reschedule, and cancel appointments.",
    ],
    images: ["/assets/firstcare1.png", "/assets/firstcare2.png", "/assets/firstcare3.png"],
    techStack: ["React (Next.js)", "Adobe XD", "Firebase", "Tailwind CSS", "Express.js", "Node.js", "MongoDB", "GitHub"],
    links: {
      github: "https://github.com/mlu1432/Healthcare-Appointment-Booking-System",
      designTool: "https://xd.adobe.com/view/14a7d2a6-c217-45bd-a60a-c48b72ecb24f-41f4/",
    },
  },
  {
    title: "SentinelShield Mobile App",
    description:
      "SentinelShield is a mobile application designed to provide emergency assistance by integrating location tracking and real-time communication with predefined emergency contacts.",
    features: [
      "User Authentication: Secure user registration and login via Firebase.",
      "Location Services: Real-time location updates for responders.",
      "Emergency Requests: Users can send their location and predefined messages during emergencies.",
    ],
    images: ["/assets/1pic.jpg", "/assets/4pic.jpg", "/assets/5pic.jpg"],
    techStack: ["React", "Expo", "Figma", "React Native Stylesheet", "GitHub", "Express.js", "Node.js", "Firebase"],
    links: {
      github: "https://github.com/mlu1432/sentinel_shield_App",
      designTool: "https://www.figma.com/design/e8Nv8Lu5r7Ac6PA99yKxqq/SentinelShield?t=0gSfmTiFfW2HUHIT-1",
    },
  },
];

const ProjectCard = ({ project, index }) => {
  const [imgSrc, setImgSrc] = useState(project.images[0]);

  return (
    <RevealOnScroll key={index}>
      <motion.div
        className="bg-white dark:bg-darkTheme dark:text-tnb-text shadow-lg rounded-lg overflow-hidden p-6 flex flex-col 
                 border border-gray-300 dark:border-tnb-keywords hover:shadow-xl transition-all"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <h3 className="text-2xl font-semibold text-center text-primary-blue dark:text-tnb-keywords mb-4">
          {project.title}
        </h3>

        <div className="relative w-full h-64 mb-4">
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority={index === 0}
            onError={() => setImgSrc("/assets/fallback-image.png")}
          />
        </div>

        <p className="text-gray-600 dark:text-tnb-text text-lg mb-4">{project.description}</p>

        <ul className="text-gray-700 dark:text-tnb-text text-sm list-disc list-inside mb-4">
          {project.features.map((feature, i) => (
            <li key={i}>✅ {feature}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-auto mb-4">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="bg-blue-100 dark:bg-tnb-keywords dark:text-darkTheme text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-4">
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-[#3B82F6] dark:bg-tnb-keywords text-white px-4 py-2 rounded-lg hover:bg-[#2563EB] 
                       dark:hover:bg-[#BBDAFF] transition-colors shadow-md"
          >
            GitHub Repo
          </a>
          <a
            href={project.links.designTool}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-[#3B82F6] dark:bg-tnb-keywords text-white px-4 py-2 rounded-lg hover:bg-[#2563EB] 
                       dark:hover:bg-[#BBDAFF] transition-colors shadow-md"
          >
            {project.title.includes("SentinelShield") ? "Figma Design" : "Adobe XD Design"}
          </a>
        </div>
      </motion.div>
    </RevealOnScroll>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 relative top-[50px] w-full min-h-screen bg-light-yellow dark:bg-darkTheme dark:text-tnb-text">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold text-primary-blue dark:text-tnb-keywords mb-12">
          Projects
        </h2>

        <div className="grid grid-cols-1 gap-12 w-full md:max-w-[700px] mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;