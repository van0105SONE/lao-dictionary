"use client";

import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";

export default function HomeSidebar() {
  const { lang } = useLanguage();
  return (
    <div className="sticky top-24 space-y-6">
      {/* How to use */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold text-[#205781] mb-4">
          {t("home_how_title", lang)}
        </h4>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex gap-2"><span className="text-[#4F959D] font-bold">1.</span>{t("home_how_1", lang)}</li>
          <li className="flex gap-2"><span className="text-[#4F959D] font-bold">2.</span>{t("home_how_2", lang)}</li>
          <li className="flex gap-2"><span className="text-[#4F959D] font-bold">3.</span>{t("home_how_3", lang)}</li>
        </ul>
      </div>

      {/* Quick links */}
      <div className="bg-gradient-to-br from-[#205781] to-[#4F959D] rounded-2xl p-6 text-white shadow-sm">
        <h4 className="text-lg font-semibold mb-3">{t("home_links_title", lang)}</h4>
        <ul className="space-y-2 text-sm text-white/90">
          <li>
            <a href={`/${lang}/correct-incorrect`} className="hover:text-white transition-colors underline">
              ➜ {t("home_link_correct", lang)}
            </a>
          </li>
          <li>
            <a href={`/${lang}/aboutus`} className="hover:text-white transition-colors underline">
              ➜ {t("home_link_about", lang)}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
