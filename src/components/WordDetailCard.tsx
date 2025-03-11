"use client";

import { DicionaryModel } from "@/shared/model/DictionaryModel";


const WordDetailCard = ({ lao_word,pronunciation,part_of_speech,definitions, examples }: DicionaryModel) => {
     console.log("lao word: ", lao_word)
    return (
        <div className="bg-white rounded-xl shadow-xl transition-shadow duration-300 ease-in-out p-6">
            {/* Word Section */}
            <hr className="bg-gray-200"/>
            <div className="mt-4 mb-4">
                <h2 className="text-2xl font-bold text-[#205781]">{lao_word}</h2>
                <h5 className="text-sm font-bold ">{pronunciation}</h5>
                <h5 className="text-sm font-bold ">{part_of_speech}</h5>
            </div>
            <hr />
            {/* Definition Section */}
            <div className="mb-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-700">ຄວາມໝາຍ</h3>
                <ul>
                    {
                        definitions.map((item)=>
                         ( <li>{item.definition}</li>)
                        )
                    }

                </ul>

            </div>

            <hr />
            {/* Example Section */}
            <div className="bg-gray-50 rounded-lg mt-4 ">
                <h3 className="text-lg font-semibold text-gray-700">Example</h3>
                <ul>
                    {
                        examples.map((item)=>
                         ( <li>{item.example}</li>)
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default WordDetailCard;