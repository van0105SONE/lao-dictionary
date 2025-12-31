"use client";

import WordDetailCard from "@/components/WordDetailCard";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { getWordById } from "@/app/lib/searchActions";
import { useEffect, useState } from "react";
import Header from "@/components/header";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [word, setWord] = useState<DicionaryModel>({
    id: 0,
    word: "",
    pronuncation: "",
    part_of_speech: "",
    definitions: [],
    examples: [],
  });

  async function getWord() {
    const { id } = await params;
    const data = await getWordById(Number(id));
    if (data) {
      setWord(data);
    }
  }

  useEffect(() => {
    getWord();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Header />
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <main className="container mx-auto px-4 pt-24">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Ad */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-28 h-[600px] rounded-lg "></div>
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-8">
            {word && (
              <article className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <WordDetailCard
                  id={word.id}
                  pronuncation={word.pronuncation}
                  part_of_speech={word.part_of_speech}
                  word={word.word}
                  definitions={word.definitions}
                  examples={word.examples}
                />
              </article>
            )}
          </section>

          {/* Right Ad */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-28 h-[600px] rounded-lg "></div>
          </aside>
        </div>
      </main>
    </div>
  );
}
