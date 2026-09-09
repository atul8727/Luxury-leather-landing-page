"use client";

import { useCallback } from "react";
import { NAVBAR_HEIGHT } from "@/lib/constants";

export default function useScrollToSection() {
  return useCallback((hash) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - (NAVBAR_HEIGHT - 8);
    window.scrollTo({ top, behavior: "smooth" });
  }, []);
}
