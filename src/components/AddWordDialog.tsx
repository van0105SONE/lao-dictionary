"use client";

import { useState } from "react";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import {addWord} from "../app/lib/adminAction"
// Assuming DicionaryModel is defined somewhere


export interface AddWordDialogProps {
    onClose: () => void;
}

export default function AddWordDialog({ onClose }: AddWordDialogProps) {
    // Initialize state with default values
    const [formData, setFormData] = useState<DicionaryModel>({
        id: 0,
        lao_word: "",
        pronunciation: "",
        part_of_speech: "noun", // Default to 'noun'
        definitions: [], // Start with one empty definition
        examples: [], // Start with one empty example
    });

    // Handle input changes for single fields
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        
        
    };

    // Handle input changes for list fields (definitions or examples)
    const handleListChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        field: "definitions" | "examples"
    ) => {
        const newList = [...formData[field]];
        
        newList[index] = field == "definitions" ? {definition: e.target.value, language: "lao"} : {example: e.target.value, language: "lao"} ;
        setFormData({
            ...formData,
            [field]: newList,
        });
    };

    // Add a new input field to the list
    const addListItem = (field: "definitions" | "examples") => {
        setFormData({
            ...formData,
            [field]: [...formData[field], ""],
        });
    };

    // Remove an input field from the list
    const removeListItem = (index: number, field: "definitions" | "examples") => {
        const newList = formData[field].filter((_, i) => i !== index);
        setFormData({
            ...formData,
            [field]: newList,
        });
    };

    // Handle form submission
    const addNewWord = async () => {
        try {
            console.log("Form Data Submitted:", formData); // Log the form data
            // You can send this data to your backend or perform other actions here
            const resData = await  addWord(formData);
            console.log("result: ", resData)
        } catch (error) {
            console.error("Error adding new word:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-96">


            {/* Dialog Content */}
            <div className="bg-white p-6 rounded-lg w-full m-4 lg:m-16 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">ເພີ່ມຄຳສັບ</h2>

                {/* Form Fields */}
                <div className="space-y-4">
                    {/* Word */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ຄຳສັບ</label>
                        <input
                            name="lao_word"
                            value={formData.lao_word}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter word"
                        />
                    </div>

                    {/* Part of Speech */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ປະເພດຄຳສັບ</label>
                        <select
                            name="part_of_speech"
                            value={formData.part_of_speech}
                            onChange={handleInputChange}
                            className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="noun">ຄຳນາມ</option>
                            <option value="verb">ກຳກິລິຍາ</option>
                        </select>
                    </div>

                    {/* Definitions */}
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-2/4">
                            <label className="block text-sm font-medium text-gray-700">ຄວາມໝາຍ</label>
                            <div className="max-h-40 overflow-y-auto">
                                {formData.definitions.map((definition, index) => (
                                    <div key={index} className="flex items-center gap-2 mb-2">
                                        <textarea
                                            value={definition.definition}
                                            onChange={(e) => handleListChange(e, index, "definitions")}
                                            className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="ອະທິບາຍກຽວກັບຄວາມໝາຍຂອງຄຳສັບ"
                                            rows={2}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeListItem(index, "definitions")}
                                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            ລຶບ
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => addListItem("definitions")}
                                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                ເພີ່ມຄວາມໝາຍ
                            </button>
                        </div>

                                            {/* Examples */}
                    <div className="lg:w-2/4">
                        <label className="block text-sm font-medium text-gray-700">ປະໂຫຍກຕົວຢ່າງ</label>
                        <div className="max-h-40 overflow-y-auto">
                            {formData.examples.map((example, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <textarea
                                        value={example.example}
                                        onChange={(e) => handleListChange(e, index, "examples")}
                                        className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ສ້າງປະໂຫຍກຕົວຢ່າງ"
                                        rows={2}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeListItem(index, "examples")}
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        ລຶບ
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => addListItem("examples")}
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            ເພີ່ມຕົວຢ່າງ
                        </button>
                    </div>
                    </div>



                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                        onClick={onClose} // Close the dialog
                    >
                        ຍົກເລີກ
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        onClick={addNewWord} // Handle form submission
                    >
                        ເພີ່ມ
                    </button>
                </div>
            </div>
        </div>
    );
}