/** 
 * RootLayout.jsx
 * @description This component serves as the root layout for the portfolio website. 
 * It defines global metadata such as the title and description, 
 * applies global styles, and sets up the base HTML structure.
 */

import "./globals.css";

export const metadata = {
  title: "Portfolio - Lucas Sekwati",
  description: "Showcasing the work and skills of Lucas Sekwati, a passionate software developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-segoe-ui leading-4 overflow-x-hidden bg-light-yellow text-gray-900 
        dark:bg-darkTheme dark:text-tnb-text">
        {children}
      </body>
    </html>
  );
}