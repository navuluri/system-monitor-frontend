"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={
        "  rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
      }
    >
      {theme == "dark" ? (
        <MoonIcon
          onClick={() => setTheme("light")}
          className="cursor-pointer h-[1.2rem] w-[1.2rem]"
        />
      ) : (
        <SunIcon
          onClick={() => setTheme("dark")}
          className="cursor-pointer h-[1.2rem] w-[1.2rem]"
        />
      )}
    </div>
  );
}
