// app/words/page.tsx
"use client"; // ← Important: This must be at the top

import Header from "@/components/header";
import Image from "next/image";
import laoWomen from "../../../public/lao-women.jpg";
import { getAllWords } from "../lib/actions"; // This should be a server action
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface WordCardProps {
  word: DicionaryModel;
}

function WordCard({ word }: WordCardProps) {
  return (
    <Link
      href={`/word/${word.id || word.word?.replace(/\s+/g, "-")}`}
      className="block p-2 bg-white rounded-2xl shadow-soft hover:shadow-xl hover:border-[#205781]/40 border border-transparent transition-all duration-300"
    >
      <div className="">
        <h3 className="text-3xl sm:text-4xl font-medium text-[#205781] leading-tight">
          {word.word}
        </h3>
        <div className="flex flex-wrap items-center justify-between ">
          <p className="text-base italic text-gray-600">
            {word.pronuncation || word.pronuncation}
          </p>
          {word.part_of_speech && (
            <span className="px-4 py-1.5 bg-[#205781]/10 text-[#205781] text-sm font-medium rounded-full">
              {word.part_of_speech}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

const FALLBACK_WORDS: DicionaryModel[] = [
  {
    id: 1,
    word: "ສະບາຍດີ",
    pronuncation: "sa-bai-dee",
    part_of_speech: "greeting",
    definitions: [],
    examples: [],
  },
  {
    id: 2,
    word: "ຂອບໃຈ",
    pronuncation: "khop jai",
    part_of_speech: "expression",
    definitions: [],
    examples: [],
  },
  {
    id: 3,
    word: "ນໍ້າ",
    pronuncation: "nam",
    part_of_speech: "noun",
    definitions: [],
    examples: [],
  },
];

// Simple debounce hook
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

export default function WordsPage() {
  const [keyword, setKeyword] = useState("");
  const [words, setWords] = useState<DicionaryModel[]>([]);
  const [loading, setLoading] = useState(true);

  const debouncedKeyword = useDebounce(keyword, 300);

  const loadWords = useCallback(async (searchTerm: string) => {
    setLoading(true);
    try {
      const data = await getAllWords(searchTerm || undefined); // Pass empty → get all
      setWords(data || FALLBACK_WORDS);
    } catch (error) {
      console.error("Failed to load words:", error);
      setWords(FALLBACK_WORDS);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadWords("");
  }, [loadWords]);

  // Search when debounced keyword changes
  useEffect(() => {
    loadWords(debouncedKeyword);
  }, [debouncedKeyword, loadWords]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />

      {/* Subtle grid background */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <main className="relative flex-1 py-12 px-6">
        <div className="pt-12 max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 leading-tight">
              ຄຳສັບພາສາລາວ
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600">
              {loading ? "Loading..." : `${words.length}+ words found`}
            </p>

            {/* Live Search Input */}
            <div className="max-w-2xl mx-auto mt-8">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Lao words... (e.g. ສະບາຍດີ, ຂອບໃຈ)"
                className="w-full px-8 py-5 text-lg rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-[#205781]/30 focus:border-[#205781] transition-all"
                autoFocus
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="space-y-2">
                {loading ? (
                  <div className="text-center py-20">
                    <p className="text-2xl text-gray-500">Loading words...</p>
                  </div>
                ) : words.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-2xl text-gray-600">No words found</p>
                  </div>
                ) : (
                  words.map((word, index) => (
                    <div key={word.id || word.word}>
                      <WordCard word={word} />
                      {index < words.length - 1 && (
                        <div className="mt-2 border-t-2 border-dotted border-gray-300" />
                      )}
                    </div>
                  ))
                )}
              </div>

              {!loading && words.length > 10 && (
                <div className="my-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-600">
                  <p className="text-xl font-medium">Advertisement</p>
                  <p className="text-sm mt-3">(Google AdSense ready)</p>
                </div>
              )}
            </div>

            <aside className="lg:col-span-1 space-y-10">
              <div className="sticky top-24 space-y-10">
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
                </div>

                <div className="bg-gray-100 border-2 border-dashed rounded-2xl p-10 text-center text-gray-600">
                  <p className="text-xl">Advertisement</p>
                  <p className="text-sm mt-3">300×600 Skyscraper</p>
                </div>
              </div>
            </aside>
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
