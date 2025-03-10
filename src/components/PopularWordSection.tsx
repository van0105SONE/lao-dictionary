import PopularWordCard from "./PopularWordCard";

const popularWords = [
  {
    word: "ສະບາຍດີ",
    translation: "Hello",
    example: "ສະບາຍດີ, ທ່ານສະບາຍດີບໍ?",
  },
  {
    word: "ຂອບໃຈ",
    translation: "Thank you",
    example: "ຂອບໃຈຫຼາຍໆ ສຳລັບຄວາມຊ່ວຍເຫຼືອ.",
  },
  {
    word: "ລາກ່ອນ",
    translation: "Goodbye",
    example: "ລາກ່ອນ, ເຈົ້າຈະໄປໃສ?",
  },
  // Add more words as needed
];

const PopularWordsSection = () => {
  return (
    <div className="mt-4 bg-gradient-to-r from-[#205781]  to-[#4F959D] py-12 px-6">
      <div className="container mx-auto">
        {/* Section Title */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          ຄຳສັບນິຍົມ
        </h1>

        {/* Popular Words Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularWords.map((word, index) => (
            <PopularWordCard
              key={index}
              word={word.word}
              translation={word.translation}
              example={word.example}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularWordsSection;