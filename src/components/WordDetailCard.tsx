"use client";

import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { useState } from "react";
import {
  FiCopy,
  FiVolume2,
  FiBookmark,
  FiFacebook,
  FiTwitter,
  FiLink,
  FiCheck,
} from "react-icons/fi";

const WordDetailCard = ({
  word,
  pronuncation,
  part_of_speech,
  definitions,
  examples,
}: DicionaryModel) => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const speakWord = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "lo-LA"; // Lao language code
      speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(word);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-2xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-gray-900 font-lao">
                {word}
              </h1>
              <button
                onClick={speakWord}
                className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
                aria-label="Pronounce word"
              >
                <FiVolume2 className="w-5 h-5 text-blue-600" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">
                  ອອກສຽງ:
                </span>
                <span className="text-lg text-blue-700 font-medium">
                  {pronuncation}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {part_of_speech}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-300 transition-all duration-200"
              >
                {copied ? (
                  <FiCheck className="w-4 h-4 text-green-600" />
                ) : (
                  <FiCopy className="w-4 h-4" />
                )}
                <span>{copied ? "ຄັດລອກແລ້ວ" : "ຄັດລອກ"}</span>
              </button>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  bookmarked
                    ? "bg-yellow-50 text-yellow-700 border border-yellow-300"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                }`}
              >
                <FiBookmark
                  className={`w-4 h-4 ${bookmarked ? "fill-yellow-500" : ""}`}
                />
                <span>{bookmarked ? "ບັນທຶກແລ້ວ" : "ບັນທຶກ"}</span>
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">ແບ່ງປັນ:</span>
              <div className="flex gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <FiFacebook className="w-5 h-5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    ""
                  )}&text=${encodeURIComponent(`${word} - ${pronuncation}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <FiTwitter className="w-5 h-5" />
                </a>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                  aria-label="Copy link"
                >
                  <FiLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-b-2xl border border-gray-200 border-t-0 p-6 space-y-8">
        {/* Definitions */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">ຄວາມໝາຍ</h2>
          </div>

          <div className="space-y-4 pl-3">
            {definitions.map((item, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-1 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {item.text}
                    </p>

                    <p className="mt-2 text-gray-500 text-sm italic pl-4 border-l-2 border-gray-200">
                      language: {item.language}
                    </p>
                  </div>
                </div>
                {index < definitions.length - 1 && (
                  <div className="h-px bg-gray-100 my-4 ml-9"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Examples */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              ຕົວຢ່າງການນຳໃຊ້
            </h2>
          </div>

          <div className="space-y-4 pl-3">
            {examples.map((item, index) => (
              <div
                key={index}
                className="group bg-gradient-to-r from-emerald-50 to-white p-4 rounded-xl border border-emerald-100 hover:border-emerald-200 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-lg">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-lg leading-relaxed font-lao">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Notes */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            ຂໍ້ມູນຈາກ ວັດຈະນານຸກົມລາວ • ອັບເດດລ່າສຸດ:{" "}
            {new Date().toLocaleDateString("lo-LA")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordDetailCard;
