/** 
 * ThemeSwitcher.jsx
 * @description 
 * A theme toggle button that switches between light and dark modes.  
 * Saves user preference in `localStorage` and applies the "dark" class.  
 * Uses `useState` for theme management and `useEffect` for updates.  
 * Ensures SSR compatibility by checking `typeof window`.  
 * Displays sun or moon icons based on the theme.  
 * Maintains theme preference across sessions for better UX.  
 */


"use client";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "light";
        }
        return "light";
    });

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2"
        >
            {theme === "dark" ? "🌞" : "🌙"}
        </button>
    );
}