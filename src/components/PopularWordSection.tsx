import { DicionaryModel } from "@/shared/model/DictionaryModel";
import PopularWordCard from "./PopularWordCard";
import { useEffect, useState } from "react";
import { getRecentWords } from "@/app/lib/actions";

const PopularWordsSection = () => {
  const [words, setWords] = useState<DicionaryModel[]>([]);

  async function loadData() {
    const data = await getRecentWords();
    if (data) {
      setWords(data);
    }
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="mt-4 bg-gradient-to-r from-[#205781]  to-[#4F959D] py-12 px-6">
      <div className="container mx-auto">
        {/* Section Title */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          ຄຳສັບລ່າສຸດ
        </h1>

        {/* Popular Words Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {words.map((word, index) => (
            <PopularWordCard
              key={index}
              id={word.id}
              word={word.word}
              pronuncation=""
              part_of_speech=""
              definitions={word.definitions}
              examples={word.examples}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularWordsSection;
