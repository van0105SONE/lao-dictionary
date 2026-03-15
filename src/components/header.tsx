"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import laos from "../../public/logo.png";
import Drawer from "./drawer";
import Overlay from "./overlay";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen((v) => !v);
  const closeDrawer = () => setIsDrawerOpen(false);
  const { lang, toggleLang } = useLanguage();

  return (
    <div>
      {/* ── Navbar ── */}
      <nav className="fixed min-w-screen bg-[#205781] p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left: hamburger + logo */}
          <div className="flex items-center">
            <button
              id="drawer-toggle"
              className="text-white lg:hidden"
              onClick={toggleDrawer}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>

            <a href="/" className="text-white text-lg font-bold mx-6">
              <Image src={laos} className="w-12 h-12" alt="Lao Dictionary Logo" />
            </a>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex space-x-4 text-lg my-auto">
              <li><Link href="/"                 className="text-white hover:text-gray-300 transition-colors">{t("nav_home",    lang)}</Link></li>
              <li><Link href="/correct-incorrect" className="text-white hover:text-gray-300 transition-colors">{t("nav_correct", lang)}</Link></li>
              <li><Link href="/aboutus"           className="text-white hover:text-gray-300 transition-colors">{t("nav_about",   lang)}</Link></li>
              <li><Link href="/contact"           className="text-white hover:text-gray-300 transition-colors">{t("nav_contact", lang)}</Link></li>
            </ul>
          </div>

          {/* Right: language toggle */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
          >
            <span className={`flex items-center gap-1 transition-all duration-200 ${lang === "lo" ? "opacity-100 scale-105" : "opacity-35 scale-95"}`}>
              <Image src="/laos.png" alt="ລາວ" width={24} height={24} className="rounded-sm object-cover" />
              <span className="text-white text-xs font-semibold">ລາວ</span>
            </span>
            <span className="text-white/30 text-xs">|</span>
            <span className={`flex items-center gap-1 transition-all duration-200 ${lang === "en" ? "opacity-100 scale-105" : "opacity-35 scale-95"}`}>
              <Image src="/flag-uk.svg" alt="English" width={24} height={16} className="rounded-sm object-cover" />
              <span className="text-white text-xs font-semibold">EN</span>
            </span>
          </button>
        </div>
      </nav>

      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} closeDrawer={closeDrawer} />
      <Overlay isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer} />
    </div>
  );
}