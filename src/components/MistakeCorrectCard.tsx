import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";

const MistakeCorrectionCard = ({ incorrect_word, correct_word, explanation }: CorrectIncorrect) => {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6">
        {/* Mistake Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-red-600">ຜິດ</h3>
          <p className="text-xl text-gray-800 line-through">{incorrect_word}</p>
        </div>
  
        {/* Correct Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-green-600">ຖືກ</h3>
          <p className="text-xl text-gray-800 font-bold ">{correct_word}</p>
        </div>
  
        {/* Explanation Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 italic">"{explanation}"</p>
        </div>
      </div>
    );
  };
  
  export default MistakeCorrectionCard;