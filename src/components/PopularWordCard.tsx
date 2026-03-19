"use client";

import { DicionaryModel } from "@/shared/model/DictionaryModel";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";

const PopularWordCard = ({ word, examples, definitions }: DicionaryModel) => {
  const { lang } = useLanguage();
  const firstDef = definitions?.[0]?.text ?? "";
  const firstExample = examples?.[0]?.text ?? "";

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 flex flex-col gap-4 border border-transparent hover:border-[#205781]/20">
      {/* Word and definition */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-[#205781] mb-1 group-hover:text-[#4F959D] transition-colors">
          {word}
        </h2>
        {firstDef && (
          <p className="text-base text-gray-600 leading-snug">{firstDef}</p>
        )}
      </div>

      {/* Example sentence */}
      {firstExample && (
        <div className="bg-gray-50 px-4 py-3 rounded-lg border-l-4 border-[#4F959D]/40">
          <p className="text-sm text-gray-600 italic leading-relaxed">
            &ldquo;{firstExample}&rdquo;
          </p>
        </div>
      )}

      {/* Navigate to detail button */}
      <Link
        href={`/${lang}/${encodeURIComponent(word)}`}
        className="mt-1 flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#205781]/8 text-[#205781] font-semibold text-sm hover:bg-[#205781] hover:text-white transition-all duration-200 border border-[#205781]/20 hover:border-[#205781]"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        {t("popular_view_detail", lang)}
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
};

export default PopularWordCard;
