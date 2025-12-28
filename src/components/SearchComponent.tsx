"use client";

import Image from "next/image";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { useEffect, useState } from "react";
import style from './search.module.css'
import kingdergarden from '../../public/kindergarten.png'
import reading from '../../public/reading.png'
import Link from 'next/link'
import { searchWord } from "@/app/lib/searchActions";

export interface SearchCardProps {
  words: DicionaryModel[],
  onSearch: (keyword: string) => void
}
const SearchCard = () => {
  const [words, setWord] = useState<DicionaryModel[]>([])
  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    fetchWord(keyword)
  }, [keyword]);

  const fetchWord = async (searchParam: string) => {
    const resData = await searchWord(searchParam);
    setWord(resData)
  }


  // Step 2: Handle input change
  const handleInputChange = (event: any) => {
    setKeyword(event.target.value);
  };
  return (
    <div className="bg-gradient-to-r from-[#205781] to-[#4F959D]  w-full p-6 h-96 pt-24 relative overflow-hidden ">
      {/* Background Icons (Floating Animation) */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute bottom-0 left-0 ${style.animate_float}`}>
          <Image width={200} src={reading} alt="cartoon"></Image>
        </div>
        {/* Floating Book Icon */}
        <div className={`absolute top-10 left-20 ${style.animate_float}`}>
          <svg className="w-12 h-12 text-white opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>

        <div className={`absolute top-30 left-40 ${style.animate_float}`}>
          <svg className="w-12 h-12 text-white opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>

        <div className={`absolute top-100 left-120 ${style.animate_float}`}>
          <svg className="w-12 h-12 text-white opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        {/* Floating Globe Icon */}
        <div className={`absolute top-32 right-32 ${style.animate_float_delay}`}>
          <svg className="w-16 h-16 text-white opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        {/* Floating Globe Icon */}
        <div className={`absolute bottom-0 right-40 ${style.animate_float_delay}`}>
          <Image width={80} height={80} src={kingdergarden} alt="cartoon"></Image>
        </div>

        {/* Floating Pencil Icon */}
        <div className="absolute bottom-0 left-1/3 animate-float">
          <svg className="w-10 h-10 text-white opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
        </div>


      </div>

      {/* Search Card */}
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg relative z-10">
        {/* Title with Icon */}
        <div className="flex items-center mb-4">
          <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <h2 className="text-xl font-bold text-gray-800">ຄົ້ນຫາຄຳສັບ</h2>
        </div>

        {/* Search Input with Icon */}
        <div className="relative mb-6">
          <input
            type="text"
            value={keyword}
            onChange={handleInputChange}
            placeholder="ຄົ້ນຫາເບິ່ງ"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 placeholder-gray-400"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
        </div>

        {/* Search Results */}
        <div className="flex flex-col mx-2 text-lg z-50">
          <ul className="border-y border-gray-100 divide-y divide-gray-100">
            {words.map((word) => (
              <li key={word.id} className="flex items-center py-3 hover:bg-gray-50 transition-colors duration-200">
                <Link href={`/[id]`} as={`/${word.id}`}>                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                  <span className="text-gray-700">{word.word}</span></Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
