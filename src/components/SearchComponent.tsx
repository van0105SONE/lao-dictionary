"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import style from "./search.module.css";
import kingdergarden from "../../public/kindergarten.png";
import reading from "../../public/reading.png";
import Link from "next/link";
import { searchWord, SearchResult } from "@/app/lib/searchActions";

// ── Debounce hook ─────────────────────────────────────────────────────────────
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

// ── Highlight matched text ────────────────────────────────────────────────────
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 text-gray-900 rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  );
}

// ── Match type badge ──────────────────────────────────────────────────────────
function MatchBadge({ type }: { type: SearchResult["matchType"] }) {
  if (type === "prefix") return null; // exact prefix — no badge needed
  if (type === "contains")
    return (
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-500 border border-blue-100 whitespace-nowrap">
        ມີໃນຄຳ
      </span>
    );
  return (
    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 whitespace-nowrap">
      ໃກ້ຄຽງ
    </span>
  );
}

// ── SearchCard ────────────────────────────────────────────────────────────────
const SearchCard = () => {
  const [words, setWords] = useState<SearchResult[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedKeyword = useDebounce(keyword, 300);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchWord = useCallback(async (searchParam: string) => {
    if (!searchParam.trim()) {
      setWords([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const resData = await searchWord(searchParam);
      setWords(resData);
      setOpen(true);
      setActiveIndex(-1);
    } catch {
      setWords([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWord(debouncedKeyword);
  }, [debouncedKeyword, fetchWord]);

  // ── Click-outside to close ─────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Keyboard navigation ────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || words.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, words.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const selected = words[activeIndex];
      if (selected)
        window.location.href = `/${encodeURIComponent(selected.word)}`;
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const clearSearch = () => {
    setKeyword("");
    setWords([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  const hasResults = words.length > 0;
  const showDropdown = open && keyword.trim().length > 0;

  // Split results by category for section headers
  const prefixResults = words.filter((w) => w.matchType === "prefix");
  const containsResults = words.filter((w) => w.matchType === "contains");
  const fuzzyResults = words.filter((w) => w.matchType === "fuzzy");

  return (
    <div className="bg-gradient-to-r from-[#205781] to-[#4F959D] w-full p-6 h-96 pt-24 relative overflow-visible">
      {/* ── Decorative floating elements ──────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute bottom-0 left-0 ${style.animate_float}`}>
          <Image width={200} src={reading} alt="cartoon" />
        </div>

        {[
          { top: "top-10", left: "left-20" },
          { top: "top-30", left: "left-40" },
          { top: "top-100", left: "left-120" },
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos.top} ${pos.left} ${style.animate_float}`}
          >
            <svg
              className="w-12 h-12 text-white opacity-20"
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
          </div>
        ))}

        <div
          className={`absolute top-32 right-32 ${style.animate_float_delay}`}
        >
          <svg
            className="w-16 h-16 text-white opacity-20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div
          className={`absolute bottom-0 right-40 ${style.animate_float_delay}`}
        >
          <Image width={80} height={80} src={kingdergarden} alt="cartoon" />
        </div>

        <div className="absolute bottom-0 left-1/3">
          <svg
            className="w-10 h-10 text-white opacity-20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
      </div>

      {/* ── Search card ──────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="container mx-auto bg-white p-6 rounded-xl shadow-xl relative z-10"
      >
        {/* Title */}
        <div className="flex items-center mb-4 gap-2">
          <svg
            className="w-6 h-6 text-[#205781]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-gray-800">ຄົ້ນຫາຄຳສັບ</h2>
        </div>

        {/* Input */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => keyword.trim() && setOpen(true)}
            placeholder="ພິມຄຳສັບລາວທີ່ຕ້ອງການຄົ້ນຫາ... (ຕົວຢ່າງ: ນໍ້າ, ສະບາຍດີ)"
            className="w-full pl-5 pr-20 py-3.5 text-base border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#205781]/40 focus:border-[#205781] bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
            autoComplete="off"
            aria-label="ຄົ້ນຫາຄຳສັບ"
            aria-autocomplete="list"
            aria-expanded={showDropdown}
          />

          {/* Right side icons */}
          <div className="absolute inset-y-0 right-3 flex items-center gap-2">
            {keyword && (
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-700 transition p-1 rounded-full hover:bg-gray-100"
                aria-label="ລ້າງການຄົ້ນຫາ"
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
                    strokeWidth="2.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            {loading ? (
              <span className="w-8 h-8 flex items-center justify-center">
                <svg
                  className="animate-spin w-5 h-5 text-[#205781]"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              </span>
            ) : (
              <span className="w-8 h-8 flex items-center justify-center bg-[#205781] rounded-full">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Hint */}
        {!keyword && (
          <p className="text-xs text-gray-400 mt-2 ml-4">
            ໃຊ້ປຸ່ມ ↑ ↓ ເພື່ອເລືອກ, Enter ເພື່ອເຂົ້າໄປ
          </p>
        )}

        {/* ── Dropdown ──────────────────────────────────────────────────── */}
        {showDropdown && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 px-6">
            <div
              role="listbox"
              className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* No results */}
              {!loading && !hasResults && (
                <div className="py-8 text-center text-gray-500">
                  <svg
                    className="w-10 h-10 mx-auto mb-3 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="font-medium text-gray-600">
                    ບໍ່ພົບຄຳວ່າ &ldquo;{keyword}&rdquo;
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    ລອງກວດສອບການສະກົດ ຫຼື ຄົ້ນຫາດ້ວຍຄຳອື່ນ
                  </p>
                </div>
              )}

              {/* Results grouped by match type */}
              {hasResults && (
                <ul className="divide-y divide-gray-50">
                  {/* Render all groups in order */}
                  {(
                    [
                      {
                        group: prefixResults,
                        label: null,
                      },
                      {
                        group: containsResults,
                        label: containsResults.length > 0 && prefixResults.length > 0
                          ? "ມີໃນຄຳ"
                          : null,
                      },
                      {
                        group: fuzzyResults,
                        label: fuzzyResults.length > 0
                          ? "ໃກ້ຄຽງ"
                          : null,
                      },
                    ] as const
                  ).map(({ group, label }, gi) =>
                    group.map((word, idx) => {
                      const globalIdx =
                        gi === 0
                          ? idx
                          : gi === 1
                          ? prefixResults.length + idx
                          : prefixResults.length + containsResults.length + idx;
                      const isActive = globalIdx === activeIndex;

                      // Show section label on first item of each group
                      const showLabel = idx === 0 && label;

                      return (
                        <li
                          key={word.word}
                          role="option"
                          aria-selected={isActive}
                          onMouseEnter={() => setActiveIndex(globalIdx)}
                        >
                          {showLabel && (
                            <div className="px-5 pt-3 pb-1">
                              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                                {label}
                              </span>
                            </div>
                          )}
                          <Link
                            href={`/${encodeURIComponent(word.word)}`}
                            onClick={() => setOpen(false)}
                            className={`flex items-center gap-4 py-3 px-5 transition-all duration-150 ${
                              isActive
                                ? "bg-[#205781]/8 border-l-4 border-[#205781]"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            {/* Icon */}
                            <div
                              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform ${
                                isActive
                                  ? "bg-[#205781] scale-105"
                                  : "bg-gray-100"
                              }`}
                            >
                              <svg
                                className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`}
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
                            </div>

                            {/* Word + definition */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p
                                  className={`text-lg font-semibold leading-tight ${
                                    isActive
                                      ? "text-[#205781]"
                                      : "text-gray-800"
                                  }`}
                                >
                                  <HighlightMatch
                                    text={word.word}
                                    query={keyword}
                                  />
                                </p>
                                <MatchBadge type={word.matchType} />
                              </div>
                            </div>

                            {/* Arrow */}
                            <svg
                              className={`w-4 h-4 flex-shrink-0 transition-opacity ${
                                isActive
                                  ? "text-[#205781] opacity-100"
                                  : "text-gray-300"
                              }`}
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
                        </li>
                      );
                    })
                  )}

                  {/* Footer */}
                  <li className="py-2 px-5 bg-gray-50 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      ພົບ {words.length} ຄຳ
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 text-[10px] font-mono">
                        ↑↓
                      </kbd>
                      <span>ເລືອກ</span>
                      <kbd className="ml-1 px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 text-[10px] font-mono">
                        ↵
                      </kbd>
                      <span>ເຂົ້າໄປ</span>
                      <kbd className="ml-1 px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 text-[10px] font-mono">
                        Esc
                      </kbd>
                      <span>ປິດ</span>
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
