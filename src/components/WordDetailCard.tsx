"use client";

import { DicionaryModel } from "@/shared/model/DictionaryModel";


const WordDetailCard = ({ lao_word, pronunciation, part_of_speech, definitions, examples }: DicionaryModel) => {
    console.log("lao word: ", lao_word)
    return (
        <div className="bg-white rounded-xl shadow-sm transition-shadow duration-300 ease-in-out p-6 space-y-6">
            {/* Word Section Card */}
            <div className="border border-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-start">
                    {/* Word, Pronunciation, and Part of Speech */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-[#205781]">{lao_word}</h2>
                        <div className="space-y-1">
                            <h5 className="text-sm font-medium text-gray-600">{pronunciation}</h5>
                            <h5 className="text-sm font-medium text-gray-600">{part_of_speech}</h5>
                        </div>
                    </div>

                    {/* Social Media Buttons */}
                    <div className="flex items-center space-x-4">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-[#1877F2] transition-colors duration-300"
                            aria-label="Share on Facebook"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check this out: ${lao_word}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-[#1DA1F2] transition-colors duration-300"
                            aria-label="Share on X (Twitter)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 5.924a8.008 8.008 0 0 1-2.356.646 4.11 4.11 0 0 0 1.804-2.27 8.169 8.169 0 0 1-2.606.996 4.103 4.103 0 0 0-7.097 2.808 4.16 4.16 0 0 0 .104.938 11.65 11.65 0 0 1-8.457-4.287 4.103 4.103 0 0 0 1.27 5.478 4.05 4.05 0 0 1-1.858-.514v.052a4.103 4.103 0 0 0 3.292 4.023 4.1 4.1 0 0 1-1.853.07 4.103 4.103 0 0 0 3.833 2.85 8.23 8.23 0 0 1-5.096 1.756 11.62 11.62 0 0 1-1.396-.082 11.59 11.59 0 0 0 6.29 1.843c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.35 8.35 0 0 0 22 5.924z" />
                            </svg>
                        </a>
                        <a
                            href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-[#E4405F] transition-colors duration-300"
                            aria-label="Share on Instagram"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Definition Section Card */}
            <div className="border border-gray-100 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-700">ຄວາມໝາຍ</h3>
                <ul className="space-y-2 mt-2">
                    {definitions.map((item, index) => (
                        <li key={index} className="text-gray-600">{item.definition}</li>
                    ))}
                </ul>
            </div>

            {/* Example Section Card */}
            <div className="border border-gray-100 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-700">ຕົວຢ່າງປະໂຫຍກ</h3>
                <ul className="space-y-2 mt-2">
                    {examples.map((item, index) => (
                        <li key={index} className="text-gray-600">{item.example}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WordDetailCard;