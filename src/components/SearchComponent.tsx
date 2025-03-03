import { DicionaryModel } from "@/shared/model/DictionaryModel";

export interface SearchCardProps {
  words:DicionaryModel[]
}
const SearchCard =  ({words}:SearchCardProps) => {
  return (
    <div className="bg-white w-full p-6  shadow-md">
      <div className="container mx-auto ">
        <h2 className="text-xl font-bold mb-2">ຄົ້ນຫາ</h2>
        <div className="relative ">
          <input type="text" placeholder={"ຄົ້ນຫາເບິ່ງ"} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
        </div>
      </div>
      <div className="flex flex-col mx-2 mt-6">
          <ul>
            {
              words.map((word)=>{
               return (<li key={word.lao_word}>{word.lao_word}</li>)
              })
            }
          </ul>
      </div>
    </div>
  );
};

export default SearchCard;
