"use client";

import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";
import MistakeCorrectionCard from "./MistakeCorrectCard";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";

interface MistakeCorrectIncorrectProps {
  pairs: CorrectIncorrect[];
}

const MistakeCorrectionSection = ({ pairs }: MistakeCorrectIncorrectProps) => {
  const { lang } = useLanguage();
  return (
    <div className="bg-gradient-to-r from-[#4F959D] to-[#205781] py-12 px-6 mt-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          {t("mistake_section_title", lang)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pairs.map((pair, index) => (
            <MistakeCorrectionCard
              key={index}
              id={pair.id}
              incorrect_word={pair.incorrect_word}
              correct_word={pair.correct_word}
              explanation={pair.explanation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MistakeCorrectionSection;
