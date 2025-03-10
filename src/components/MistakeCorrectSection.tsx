import MistakeCorrectionCard from "./MistakeCorrectCard";

const mistakeExamples = [
    {
      mistake: "ຂອບໃຈຫຼາຍ",
      correct: "ຂອບໃຈ",
      explanation: "The word 'ຫຼາຍ' is unnecessary in this context.",
    },
    {
      mistake: "ສະບາຍດີທ່ານ",
      correct: "ສະບາຍດີ",
      explanation: "The word 'ທ່ານ' is too formal for casual greetings.",
    },
    {
      mistake: "ຂ້ອຍຢາກກິນນ້ຳ",
      correct: "ຂ້ອຍຢາກດື່ມນ້ຳ",
      explanation: "The verb 'ກິນ' is used for solid food, while 'ດື່ມ' is used for liquids.",
    },
    // Add more examples as needed
  ];
  
  const MistakeCorrectionSection = () => {
    return (
      <div className="bg-gradient-to-r from-[#4F959D] to-[#205781] py-12 px-6 mt-4">
        <div className="container mx-auto">
          {/* Section Title */}
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            ຕົວຢ່າງຄຳຜິດ ແລະ ຄຳຖືກ
          </h1>
  
          {/* Mistake Correction Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mistakeExamples.map((example, index) => (
              <MistakeCorrectionCard
                key={index}
                mistake={example.mistake}
                correct={example.correct}
                explanation={example.explanation}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default MistakeCorrectionSection;