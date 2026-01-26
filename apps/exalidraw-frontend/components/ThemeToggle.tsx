"use client";
import { Moon, Sun } from "lucide-react";
import useTheme from "next-theme";

export default function Theme() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme}
      className="p-2 rounded-lg border-2 border-teal-500/20 backdrop-blur-sm bg-white/80 dark:bg-black/80 text-white dark:text-white hover:shadow-blur-teal transition-all duration-300"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
      ) : (
        <Sun className="w-5 h-5 text-teal-600 dark:text-teal-400" />
      )}
    </button>
  );
}
