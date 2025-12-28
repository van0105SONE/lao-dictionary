import { DicionaryModel } from "@/shared/model/DictionaryModel";

const PopularWordCard = ({ word, meaning, examples }: DicionaryModel) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6">
      {/* Word and Translation */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-[#205781]">{word}</h2>
        <p className="text-lg text-gray-600">{meaning}</p>
      </div>

      {/* Example Sentence */}
      <div className="bg-gray-50 p-4 rounded-lg">
        {examples.map((item) => (
          <p className="text-gray-700 italic">"{item.text}"</p>
        ))}
      </div>
    </div>
  );
};

export default PopularWordCard;
