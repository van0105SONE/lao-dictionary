"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="relative bg-gradient-to-r from-[#205781] to-[#4F959D] py-16 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">{t("footer_brand", lang)}</h3>
            <p className="text-sm text-white/80 leading-relaxed">{t("footer_desc", lang)}</p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">{t("footer_links_title", lang)}</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href={`/`}                 className="hover:text-white transition-colors duration-200">{t("footer_home",    lang)}</Link></li>
                <li><Link href={`/correct-incorrect`} className="hover:text-white transition-colors duration-200">{t("footer_correct", lang)}</Link></li>
                <li><Link href={`/aboutus`}           className="hover:text-white transition-colors duration-200">{t("footer_about",   lang)}</Link></li>
                <li><Link href={`/privacy-policy`}    className="hover:text-white transition-colors duration-200">{t("footer_privacy", lang)}</Link></li>
                <li><Link href={`/contact`}           className="hover:text-white transition-colors duration-200">{t("footer_contact", lang)}</Link></li>
              </ul>
            </nav>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">{t("footer_info_title", lang)}</h3>
            <p className="text-sm text-white/80 leading-relaxed">{t("footer_info_desc", lang)}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} {t("footer_copy", lang)}
          </p>
        </div>
      </div>
    </footer>
  );
}
