"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import {Blinds} from "lucide-react";

export function Logo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a fallback during SSR and initial load
  if (!mounted) {
    return (
      <div className="w-[65px] h-[65px] bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div>
        <Blinds/>
    </div>
  );
}
