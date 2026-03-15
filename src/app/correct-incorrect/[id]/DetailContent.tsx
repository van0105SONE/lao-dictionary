"use client";

import Link from "next/link";
import ShareCardButton from "./ShareCardButton";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";
import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";

interface Props {
  pair: CorrectIncorrect | null;
}

export default function DetailContent({ pair }: Props) {
  const { lang } = useLanguage();

  return (
    <div className="pt-16 max-w-2xl mx-auto">
      {/* Back button */}
      <Link
        href="/correct-incorrect"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#205781] mb-8 transition-colors group"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        {t("ci_back", lang)}
      </Link>

      {pair ? (
        <article className="bg-white rounded-3xl shadow-soft border border-gray-100 p-5 sm:p-10 space-y-6 overflow-hidden">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#205781] bg-[#205781]/8 px-3 py-1 rounded-full">
              {t("badge_ci_label", lang)}
            </span>
          </div>

          {/* Incorrect → Correct */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 overflow-hidden">
            <div className="w-full min-w-0 overflow-hidden bg-red-50 border border-red-100 rounded-2xl p-4 sm:p-6 text-center">
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">{t("badge_incorrect", lang)}</p>
              <p className="text-3xl sm:text-4xl font-bold text-red-600 line-through leading-tight break-all w-full">
                {pair.incorrect_word}
              </p>
            </div>

            <div className="flex justify-center shrink-0">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-500 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <svg className="w-4 h-4 text-gray-500 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="w-full min-w-0 overflow-hidden bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-6 text-center">
              <p className="text-xs font-semibold text-green-500 uppercase tracking-widest mb-2">{t("badge_correct", lang)}</p>
              <p className="text-3xl sm:text-4xl font-bold text-[#205781] leading-tight break-all w-full">
                {pair.correct_word}
              </p>
            </div>
          </div>

          {/* Explanation */}
          {pair.explanation && (
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-6">
              <p className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t("ci_explanation", lang)}
              </p>
              <p className="text-gray-700 leading-relaxed break-words">{pair.explanation}</p>
            </div>
          )}

          <ShareCardButton
            incorrectWord={pair.incorrect_word}
            correctWord={pair.correct_word}
            explanation={pair.explanation ?? null}
          />
        </article>
      ) : (
        <div className="bg-white rounded-3xl shadow-soft p-10 text-center">
          <p className="text-2xl text-gray-500">{t("ci_not_found_msg", lang)}</p>
          <Link href="/correct-incorrect" className="mt-6 inline-block text-[#205781] underline">
            {t("ci_back", lang)}
          </Link>
        </div>
      )}
    </div>
  );
}
