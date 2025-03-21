"use client"

import WordDetailCard from "@/components/WordDetailCard";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { getWordById } from "@/app/lib/searchActions";
import { useEffect, useState } from "react";
import Header from "@/components/header";

export default function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const [word, setWord] = useState<DicionaryModel>({
    id: 0,
    lao_word: "",
    pronunciation: "",
    part_of_speech: "",
    definitions: [],
    examples: []
  })

  async function getWord() {
    const { id } = await params;
    const data = await getWordById(Number(id));
    console.log("word detail: ", data)
    if(data){
      setWord(data)
    }

  }

  useEffect(() => {
    getWord();

  }, [])

  return (
    <div className="relative">
      <Header></Header>
      <div className="container mx-auto pt-24 min-h-screen">
        <div className="flex flex-col lg:flex-row bg-gray-200  ">
          {/* Left Advertisement Space (20%) */}
          <div className="md:w-1/5 bg-blue-200 px-6">
            {/* Left Ad Content */}
          </div>

          {/* Main Content (60%) */}
          <div className="md:w-3/5 bg-white p-6">
            {word && (
              <WordDetailCard
                id={word.id}
                pronunciation={word.pronunciation}
                part_of_speech={word.part_of_speech}
                lao_word={word?.lao_word}
                definitions={word.definitions}
                examples={word.examples}
              />
            )}
          </div>


          {/* Right Advertisement Space (20%) */}
          <div className="md:w-1/5 bg-blue-200">
            {/* Right Ad Content */}
          </div>
        </div>
      </div>
    </div>


  )
}