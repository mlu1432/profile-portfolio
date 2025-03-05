/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#085797",
        "light-yellow": "#F8F8EF", // Light mode background
        "light-red": "#F1E4E4",
        "blue-600": "#2590EE",
        "red-talk": "#d86e83",
        "gray-300": "#707070",
        "green": "#15A475",
        "light-blue": "#C7D9F9",

        // 🌙 Dark Mode (Tomorrow Night Blue)
        "darkTheme": "#002451", // Dark background
        "tnb-text": "#FF9DA4", // Default text color
        "tnb-keywords": "#BBDAFF", // Light blue for headings
        "tnb-functions": "#EBBBFF", // Purple for emphasis
        "tnb-variables": "#FFEEAD", // Yellow for variables
      },
      fontFamily: {
        "segoe-ui": ["'Segoe UI'", "Tahoma", "Geneva", "Verdana", "sans-serif"],
      },
      backgroundImage: {
        bannerImage: "url('/programming.png')",
        blackoverlay: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))",
      },
    },
  },
  plugins: [],
};