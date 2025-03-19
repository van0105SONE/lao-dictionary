import Image from "next/image";

export interface CharacterGridProps {
  chars: any,
  title: string,
  text_color:string,
  background_color: string
}


const CharacterGrid = ({ chars, title,text_color ,background_color }: CharacterGridProps) => {
  return (
    <div className={`mt-16 border-2 border-gray-200 rounded-xl ${background_color} shadow-lg overflow-hidden`}>
      {/* Title */}
      <h1 className={`text-4xl text-center font-bold text-[#205781] py-6 ${text_color} bg-clip-text text-transparent`}>
        {title}
      </h1>

      {/* Character Grid */}
      <div className="grid grid-cols-5 gap-2  md:grid-cols-8 p-6">
        {chars.map((item: any) => (
          <div
            key={item.character}
            className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-4 cursor-pointer hover:bg-gray-50"
          >
            {/* Character */}
            <h4 className="text-2xl font-bold text-[#205781] mb-2">
              {item.character}
            </h4>
            {/* Image */}
            {
              item.image && <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center mb-2">
                <Image
                  width={60}
                  height={60}
                  src={item.image}
                  alt={item.word}
                  className="object-contain"
                />
              </div>
            }


            {/* Word */}
            <p className="text-lg text-center text-gray-700">{item.word}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterGrid;