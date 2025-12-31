// app/correct-incorrect/page.tsx
"use client";

import Header from "@/components/header";
import Image from "next/image";
import laoWomen from "../../../public/lao-women.jpg";
import { getCorrectIncorrectPairs } from "../lib/actions";
import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";
import { useCallback, useEffect, useState } from "react";

interface PairCardProps {
  pair: CorrectIncorrect;
}

function PairCard({ pair }: PairCardProps) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-soft border border-transparent hover:border-[#205781]/40 hover:shadow-xl transition-all duration-300">
      <div className="space-y-6">
        {/* Incorrect → Correct */}
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-4 sm:gap-6">
          <span className="text-3xl xs:text-4xl sm:text-5xl font-medium text-red-600 line-through leading-tight">
            {pair.incorrect_word}
          </span>

          {/* Arrow: horizontal on larger screens, vertical on mobile */}
          <span className="text-3xl text-gray-500 hidden sm:inline">→</span>
          <span className="text-3xl text-gray-500 sm:hidden">↓</span>

          <span className="text-3xl xs:text-4xl sm:text-5xl font-medium text-[#205781] leading-tight">
            {pair.correct_word}
          </span>
        </div>

        {/* Explanation */}
        {pair.explanation && (
          <p className="text-base sm:text-lg text-gray-700 italic pl-1 leading-relaxed">
            {pair.explanation}
          </p>
        )}
      </div>
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

export default function CorrectIncorrectPage() {
  const [keyword, setKeyword] = useState("");
  const [pairs, setPairs] = useState<CorrectIncorrect[]>([]);
  const [loading, setLoading] = useState(true);

  const debouncedKeyword = useDebounce(keyword, 300);

  const loadPairs = useCallback(async (searchTerm?: string) => {
    setLoading(true);
    try {
      const data = await getCorrectIncorrectPairs(searchTerm);
      setPairs(data || FALLBACK_PAIRS);
    } catch (error) {
      console.error("Failed to load pairs:", error);
      setPairs(FALLBACK_PAIRS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPairs();
  }, [loadPairs]);

  useEffect(() => {
    loadPairs(debouncedKeyword || undefined);
  }, [debouncedKeyword, loadPairs]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      {/* Subtle grid background */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <main className="relative flex-1 py-8 px-4 sm:py-12 sm:px-6">
        <div className="pt-12 max-w-7xl mx-auto">
          {/* Title + Search */}
          <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 leading-tight">
              ຄຳສັບຖືກ ແລະ ຜິດ
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 px-4">
              {loading ? "ກຳລັງໂຫຼດ..." : `${pairs.length} ຕົວຢ່າງທີ່ພົບເລື້ອຍ`}
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto mt-8 px-4">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="ຄົ້ນຫາຄຳຜິດ ຫຼື ຄຳຖືກ... (ຕົວຢ່າງ: ດີ້ ຫຼື ສະບາຍດີ)"
                className="w-full px-6 py-4 sm:px-8 sm:py-5 text-base sm:text-lg rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-[#205781]/30 focus:border-[#205781] transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Content + Ads Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* List of pairs */}
            <div className="lg:col-span-2">
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

              {/* Inline ad */}
              {!loading && pairs.length > 8 && (
                <div className="my-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-600">
                  <p className="text-xl font-medium">Advertisement</p>
                  <p className="text-sm mt-3">
                    (728×90 or 300×250 - Google AdSense ready)
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar ads - hidden on mobile, visible beside on lg+ */}
            <aside className="hidden lg:block lg:col-span-1 space-y-10">
              <div className="sticky top-24 space-y-10">
                {/* Ad 1 */}
                <div className="bg-gray-50 rounded-2xl p-8 shadow-soft text-center">
                  <p className="text-lg font-medium text-gray-700 mb-6">
                    Advertisement
                  </p>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src={laoWomen}
                      alt="Lao culture and traditions"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Support the preservation of Lao language
                  </p>
                </div>

                {/* Ad 2 */}
                <div className="bg-gray-100 border-2 border-dashed rounded-2xl p-10 text-center text-gray-600">
                  <p className="text-xl">Advertisement</p>
                  <p className="text-sm mt-3">300×600 Skyscraper</p>
                </div>
              </div>
            </aside>
          </div>

          {/* Mobile-only ads (below content) */}
          <div className="lg:hidden mt-12 space-y-10">
            {/* Ad 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-soft text-center">
              <p className="text-lg font-medium text-gray-700 mb-6">
                Advertisement
              </p>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={laoWomen}
                  alt="Lao culture and traditions"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Support the preservation of Lao language
              </p>
            </div>

            {/* Ad 2 */}
            <div className="bg-gray-100 border-2 border-dashed rounded-2xl p-10 text-center text-gray-600">
              <p className="text-xl">Advertisement</p>
              <p className="text-sm mt-3">300×600 Skyscraper</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative bg-gradient-to-r from-[#205781] to-gray-300 py-12 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm opacity-90">
            © 2025 ຄຳສັບພາສາລາວ • Made with ❤️ for the Lao community
          </p>
        </div>
      </footer>
    </div>
  );
}
