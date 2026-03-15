"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "lo" | "en";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "lo",
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("lo");

  // Read from localStorage on mount (client only)
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "lo" || saved === "en") setLang(saved);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "lo" ? "en" : "lo";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
