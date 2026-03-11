"use client";

import Header from "@/components/header";
import Footer from "@/components/Footer";
import { getCorrectIncorrectPairs } from "../lib/actions";
import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";
import { useEffect, useState } from "react";
import Link from "next/link";

interface PairCardProps {
  pair: CorrectIncorrect;
}

function PairCard({ pair }: PairCardProps) {
  return (
    <div className="group overflow-hidden w-full p-6 bg-white rounded-2xl shadow-soft border border-transparent hover:border-[#205781]/40 hover:shadow-xl transition-all duration-300 flex flex-col gap-4">
      <div className="space-y-4 min-w-0 w-full">
        {/* Incorrect → Correct */}
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-6 min-w-0 w-full">
          <span className="w-full max-w-full break-all text-xl sm:text-4xl font-medium text-red-600 line-through leading-tight">
            {pair.incorrect_word}
          </span>

          {/* Arrow: horizontal on larger screens, vertical on mobile */}
          <span className="shrink-0 text-xl text-gray-500 hidden sm:inline">→</span>
          <span className="shrink-0 text-xl text-gray-500 sm:hidden">↓</span>

          <span className="w-full max-w-full break-all text-xl sm:text-4xl font-medium text-[#205781] leading-tight">
            {pair.correct_word}
          </span>
        </div>

        {/* Explanation */}
        {pair.explanation && (
          <p className="break-words text-sm sm:text-base text-gray-700 italic pl-1 leading-relaxed">
            {pair.explanation}
          </p>
        )}
      </div>

      {/* Detail button */}
      <Link
        href={`/correct-incorrect/${pair.id}`}
        className="mt-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#205781]/8 text-[#205781] font-semibold text-sm hover:bg-[#205781] hover:text-white transition-all duration-200 border border-[#205781]/20 hover:border-[#205781]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ເບິ່ງລາຍລະອຽດ
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

const FALLBACK_PAIRS: CorrectIncorrect[] = [
  {
    id: 1,
    incorrect_word: "ສະບາຍດີ້",
    correct_word: "ສະບາຍດີ",
    explanation: "ບໍ່ຕ້ອງໃຊ້ຕົວເລກສຽງ (້)",
  },
  {
    id: 2,
    incorrect_word: "ຂອບໃຈ້",
    correct_word: "ຂອບໃຈ",
    explanation: "ບໍ່ຕ້ອງໃຊ້ຕົວເລກສຽງ",
  },
  {
    id: 3,
    incorrect_word: "ນ້ຳ",
    correct_word: "ນໍ້າ",
    explanation: "ໃຊ້ ໍ ແທນ ້",
  },
  {
    id: 4,
    incorrect_word: "ຮັກຮັກ",
    correct_word: "ຮັກ",
    explanation: "ບໍ່ຕ້ອງຊ້ຳຄຳ",
  },
];

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function CorrectIncorrectClient() {
  const [keyword, setKeyword] = useState("");
  const [pairs, setPairs] = useState<CorrectIncorrect[]>([]);
  const [loading, setLoading] = useState(true);

  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const data = await getCorrectIncorrectPairs(debouncedKeyword || undefined);
        if (!cancelled) setPairs(data || FALLBACK_PAIRS);
      } catch (error) {
        console.error("Failed to load pairs:", error);
        if (!cancelled) setPairs(FALLBACK_PAIRS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [debouncedKeyword]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <main className="relative flex-1 py-8 px-4 sm:py-12 sm:px-6">
        <div className="pt-12 w-full max-w-7xl mx-auto overflow-hidden">
          {/* Title + Search */}
          <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-gray-900 leading-tight">
              ຄຳສັບ <span className="text-green-600">ຖືກ</span> ແລະ{" "}
              <span className="text-red-600">ຜິດ</span>
              {/* Hidden keyword variant for SEO – no-space form "ຄຳຖືກແລະຜິດ" */}
              <span className="sr-only">ຄຳຖືກແລະຜິດ · ຄຳສັບຖືກແລະຜິດ</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              {loading ? "ກຳລັງໂຫຼດ..." : `${pairs.length} ຕົວຢ່າງທີ່ພົບເລື້ອຍ`}
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto mt-8 px-4">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="ຄົ້ນຫາຄຳຜິດ ຫຼື ຄຳຖືກ... (ຕົວຢ່າງ: ດີ້ ຫຼື ສະບາຍດີ)"
                className="w-full px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base md:text-lg rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-[#205781]/30 focus:border-[#205781] transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-hidden">
            {/* List of pairs */}
            <div className="lg:col-span-2 min-w-0 w-full overflow-hidden">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-soft overflow-hidden">
                {loading ? (
                  <div className="text-center py-20">
                    <p className="text-2xl text-gray-500">ກຳລັງໂຫຼດຂໍ້ມູນ...</p>
                  </div>
                ) : pairs.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-2xl text-gray-600">ບໍ່ພົບຄຳທີ່ຄົ້ນຫາ</p>
                  </div>
                ) : (
                  <div className="space-y-10 sm:space-y-12">
                    {pairs.map((pair, index) => (
                      <div
                        className="min-w-0 w-full overflow-hidden"
                        key={
                          pair.id || `${pair.incorrect_word}-${pair.correct_word}`
                        }
                      >
                        <PairCard pair={pair} />
                        {index < pairs.length - 1 && (
                          <div className="mt-10 sm:mt-12 border-t-2 border-dotted border-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar – Tips & Related Links: hidden on mobile to avoid overflow */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Spelling tips */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-[#205781] mb-4">
                    💡 ເຄັດລັບການສະກົດ
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      ກວດເບິ່ງສະຫຼະ ແລະ ວັນນະຍຸດ ໃຫ້ຖືກຕ້ອງ
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      ຫຼີກລ້ຽງການໃຊ້ຕົວເລກສຽງທີ່ບໍ່ຈຳເປັນ
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      ອ່ານຄຳອະທິບາຍເພື່ອເຂົ້າໃຈກົດຂອງພາສາ
                    </li>
                  </ul>
                </div>

                {/* Quick links */}
                <div className="bg-gradient-to-br from-[#205781] to-[#4F959D] rounded-2xl p-6 text-white shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">
                    🔗 ລິ້ງທີ່ກ່ຽວຂ້ອງ
                  </h3>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li>
                      <a href="/" className="hover:text-white transition-colors underline">
                        ➜ ຄົ້ນຫາຄຳສັບ
                      </a>
                    </li>
                    <li>
                      <a href="/aboutus" className="hover:text-white transition-colors underline">
                        ➜ ກ່ຽວກັບພວກເຮົາ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
