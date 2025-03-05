# Lucas Sekwati - Portfolio Website

![Portfolio Preview](./public/displayLu.jpg)

A modern developer portfolio featuring dark mode, smooth animations, and project showcases. Built with Next.js 14 and Tailwind CSS.

## ✨ Features

- 🌓 Theme Switcher with localStorage persistence
- 📱 Fully responsive mobile-first design
- 🎥 Scroll-triggered animations using Intersection Observer
- 📬 Functional contact form with EmailJS integration
- 🖼 Optimized image loading via Next.js Image
- 🔄 SSR compatibility for better SEO

## 🛠 Tech Stack

| Category        | Technologies                          |
|-----------------|---------------------------------------|
| Core            | Next.js 14, React 18, TypeScript      |
| Styling         | Tailwind CSS, PostCSS                 |
| Animations      | Framer Motion, CSS Transitions        |
| Email           | EmailJS                               |
| Tooling         | ESLint, Prettier                      |

## 🚀 Quick Start

1. Clone repository
```bash
git clone https://github.com/mlu1432/my-portfolio.git
cd my-portfolio
## 📁 Project Structure

profile-portfolio/
├── app/
│ ├── _components/ # Reusable components
│ │ ├── About.jsx
│ │ ├── Contact.jsx
│ │ ├── Header.jsx
│ │ ├── Navbar.jsx
│ │ ├── Projects.jsx
│ │ ├── Skills.jsx
│ │ ├── ThemeSwitcher.jsx
│ │ └── RevealOnScroll.jsx # Scroll animation logic
│ ├── globals.css # Global styles
│ └── page.js # Main page composition
├── public/ # Static assets
│ ├── assets/ # Project images
│ ├── *.svg # Icons and logos
├── tailwind.config.mjs # Tailwind configuration
└── next.config.mjs # Next.js configuration


## 🚀 Installation

1. Clone the repository
   
   git clone https://github.com/mlu1432/my-portfolio.git
   cd profile-portfolio

2. Install dependencies
## npm install

3. Set up environment variables

## env

NEXT_PUBLIC_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_TEMPLATE_ID=your_emailjs_template_id

4. Start development server
## npm run dev

🔧 Configuration
## EmailJS Setup
- Created a free EmailJS account

- Create email service and template


🎛 Scripts
- `npm run dev`: Start development server
- `npm run build`: Create production build

🌟 Key Components
- ThemeSwitcher: Implements theme persistence using localStorage

- RevealOnScroll: Uses Intersection Observer for scroll animations

- ProjectCard: Responsive project display with fallback images

- SkillSection: Dynamic skill category rendering with color variants