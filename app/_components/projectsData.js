/**
 * projectsData.js
 * @description
 * Contains the array of project objects used in the Projects section. 
 * Each project includes:
 * - title: Name of the project
 * - description: Short overview
 * - features: Key functionalities or highlights
 * - images: Array of image paths/screenshots
 * - techStack: List of technologies used
 * - links: GitHub repo and design tool links
 * 
 * This separation of data from presentation ensures maintainability and scalability.
 */

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
    images: [
      "/assets/firstcare1.png",
      "/assets/firstcare2.png",
      "/assets/firstcare3.png",
    ],
    techStack: [
      "React (Next.js)",
      "Adobe XD",
      "Firebase",
      "Tailwind CSS",
      "Express.js",
      "Node.js",
      "MongoDB",
      "GitHub",
    ],
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
    techStack: [
      "React",
      "Expo",
      "Figma",
      "React Native Stylesheet",
      "GitHub",
      "Express.js",
      "Node.js",
      "Firebase",
    ],
    links: {
      github: "https://github.com/mlu1432/sentinel_shield_App",
      designTool:
        "https://www.figma.com/design/e8Nv8Lu5r7Ac6PA99yKxqq/SentinelShield?t=0gSfmTiFfW2HUHIT-1",
    },
  },
];

export default projects;