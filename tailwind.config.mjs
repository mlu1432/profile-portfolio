/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Galaxy Theme Colors
        'galaxy-light': {
          primary: '#4a86e8',
          secondary: '#6aa84f',
          accent: '#ff9d00',
          background: '#f0f2ff',
          surface: '#ffffff',
          text: '#1a1a40',
          'text-muted': '#4a4a80',
        },
        // Dark Galaxy Theme Colors
        'galaxy-dark': {
          primary: '#4a00e0',
          secondary: '#8e2de2',
          accent: '#00d2ff',
          background: '#0a0a1a',
          surface: '#12122a',
          text: '#e0e0ff',
          'text-muted': '#a0a0cc',
        }
      },
      backgroundImage: {
        'galaxy-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'light-particles': "radial-gradient(1px 1px at 20% 30%, rgba(74, 134, 232, 0.2) 1px, transparent 50%), radial-gradient(1px 1px at 40% 70%, rgba(106, 168, 79, 0.15) 1px, transparent 50%), radial-gradient(1px 1px at 60% 80%, rgba(255, 157, 0, 0.2) 1px, transparent 50%)",
        'cosmic-particles': "radial-gradient(1px 1px at 20% 30%, rgba(255, 255, 255, 0.3) 1px, transparent 50%), radial-gradient(1px 1px at 40% 70%, rgba(255, 255, 255, 0.2) 1px, transparent 50%), radial-gradient(1px 1px at 60% 80%, rgba(255, 255, 255, 0.25) 1px, transparent 50%), radial-gradient(1.5px 1.5px at 80% 20%, rgba(255, 255, 255, 0.35) 1px, transparent 50%)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shine': 'shine 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { 'background-position': '0% 0%' },
          '100%': { 'background-position': '100% 100%' },
        }
      },
    },
  },
  plugins: [],
};

export default config;