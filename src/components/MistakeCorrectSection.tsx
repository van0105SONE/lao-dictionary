import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";
import MistakeCorrectionCard from "./MistakeCorrectCard";


interface MistakeCorrectIncorrectProps{
   pairs: CorrectIncorrect[]
}
const MistakeCorrectionSection = ({pairs}:MistakeCorrectIncorrectProps) => {


  return (
    <div className="bg-gradient-to-r from-[#4F959D] to-[#205781] py-12 px-6 mt-4">
      <div className="container mx-auto">
        {/* Section Title */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          ຕົວຢ່າງຄຳຜິດ ແລະ ຄຳຖືກ
        </h1>

        {/* Mistake Correction Grid */}
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
