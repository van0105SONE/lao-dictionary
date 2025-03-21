'use client'


import { useState } from "react";
import { useRouter } from 'next/navigation'

import { FaLanguage, FaBook, FaExclamationCircle } from "react-icons/fa";

import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { addWord } from "../app/lib/adminAction"
import { LANGUAGE_SUPPORT } from "@/shared/constant/global-contant";

// Assuming DicionaryModel is defined somewhere


export interface AddWordDialogProps {
    onClose: () => void;
}

export default function AddWordDialog() {
    // Initialize state with default values
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<DicionaryModel>({
        id: 0,
        lao_word: "",
        pronunciation: "",
        part_of_speech: "noun", // Default to 'noun'
        definitions: [], // Start with one empty definition
        examples: [], // Start with one empty example
    });
    const [definitions, setDefinitions] = useState({
        language: "lao",
        definition: ""
    });
    const [examples, setExamples] = useState({
        language: "lao",
        example: ""
    })

    const [definitionErrorMessagae, setDefinitionErrorMessagae] = useState<string>("")
    const [examErrorMessagae, setExampleErrorMessagae] = useState<string>("")
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
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        field: "definitions" | "examples"
    ) => {
        const { name, value } = e.target;

        // Update the specific field while preserving other properties
        if (field == "definitions") {
            setDefinitions({
                ...definitions,
                [name]: value
            })
            setDefinitionErrorMessagae("")
        } else {
            setExamples({
                ...examples,
                [name]: value
            })
            setExampleErrorMessagae("")
        }



    };

    // Add a new input field to the list
    const addListItem = (field: "definitions" | "examples") => {
        if (field == "definitions") {
            if (definitions.definition == "") {
                setDefinitionErrorMessagae("ຕ້ອງການຄຳອະທິບາຍຄວາມໝາຍ")
                return;
            }

            setFormData((prevFormData) => ({
                ...prevFormData,
                definitions: [...prevFormData.definitions, definitions],
            }));
        } else {
            if (examples.example == "") {
                setExampleErrorMessagae("ຕ້ອງຕົວຢ່າງປະໂຫຍກ")
                return;
            }
            setExampleErrorMessagae("")
            setFormData((prevFormData) => ({
                ...prevFormData,
                examples: [...prevFormData.examples, examples],
            }));
        }

    };

    // Remove an input field from the list
    const removeListItem = (index: number, field: "definitions" | "examples") => {
        const newList = formData[field].filter((_, i) => i !== index);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: [...newList],
        }));
    };

    // Handle form submission
    const addNewWord = async () => {
        try {
            console.log("Form Data Submitted:", formData); // Log the form data
            setIsLoading(true);
            // You can send this data to your backend or perform other actions here
            const resData = await addWord(JSON.stringify(formData));
            console.log("result: ", JSON.parse(JSON.stringify(resData)))
            setIsLoading(false)
            if (resData.isSuccess) {

                router.push(`/admin`) // Navigate to the new post page
            }
        } catch (error) {
            console.error("Error adding new word:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg w-full shadow-xl">
            <h2 className="text-xl font-semibold mb-4">ເພີ່ມຄຳສັບ</h2>
            {/* Form Fields */}
            <div className="space-y-4">
                {/* Word */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">ຄຳສັບ <span className="text-red-500">*</span></label>
                    <input
                        name="lao_word"
                        value={formData.lao_word}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ຄຳສັບ"
                    />
                </div>

                {/* pronounciation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">ການອອກສຽງ <span className="text-red-500">*</span></label>
                    <input
                        name="pronunciation"
                        value={formData.pronunciation}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ການອອກສຽງ"
                    />
                </div>

                {/* Part of Speech */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">ປະເພດຄຳສັບ <span className="text-red-500">*</span></label>
                    <select
                        name="part_of_speech"
                        value={formData.part_of_speech}
                        onChange={handleInputChange}
                        className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="ຄຳນາມ">ຄຳນາມ</option>
                        <option value="ກຳກິລິຍາ">ກຳກິລິຍາ</option>
                    </select>
                </div>

                {/* Definitions */}
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-2/4 p-2">
                        <label className="block text-sm font-medium text-gray-700">ຄວາມໝາຍ <span className="text-red-500">*</span></label>
                        <div className="max-h-40 ">
                            <div className="flex flex-col lg:flex-row items-center gap-2 mb-2 relative">
                                <select
                                    name="language"
                                    value={definitions.language}
                                    onChange={(e) => handleListChange(e, "definitions")}
                                    className="mt-1 px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {LANGUAGE_SUPPORT.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="relative w-full">
                                    <textarea
                                        name="definition"
                                        value={definitions.definition}
                                        onChange={(e) => handleListChange(e, "definitions")}
                                        className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ອະທິບາຍກຽວກັບຄວາມໝາຍຂອງຄຳສັບ"
                                        rows={2}
                                    />
                                    {/* Error Message (Tooltip-like) */}
                                    {definitionErrorMessagae && (
                                        <div className="absolute top-full left-4 mt-1 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg flex items-center gap-1">
                                            <FaExclamationCircle className="text-red-500" />
                                            {definitionErrorMessagae}
                                        </div>
                                    )}
                                </div>


                            </div>

                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => addListItem("definitions")}
                                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                ເພີ່ມຄວາມໝາຍ
                            </button>
                        </div>

                        <div>
                            <ul>
                                {
                                    formData.definitions.map((item, index) => <li >
                                        <div className="flex justify-between  border-2 border-gray-300 my-2 p-3 rounded-lg">
                                            <div className="flex items-center space-x-4 rounded-lg  ">
                                                <FaLanguage className="text-blue-500" />
                                                <span className="text-sm font-medium text-gray-700 bg-blue-100 px-2 py-1 ">
                                                    {item.language}
                                                </span>
                                                <FaBook className="text-gray-500" />
                                                <span className="text-gray-900">{item.definition}</span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeListItem(index, "definitions")}
                                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                            >
                                                ລຶບ
                                            </button>
                                        </div>
                                    </li>)
                                }

                            </ul>
                        </div>

                    </div>

                    {/* Examples */}
                    <div className="lg:w-2/4 p-2">
                        <label className="block text-sm font-medium text-gray-700">ປະໂຫຍກຕົວຢ່າງ <span className="text-red-500">*</span></label>
                        <div className="max-h-40 ">
                            <div className="flex items-center gap-2 mb-2 relative">
                                {/* Textarea */}
                                <textarea
                                    name="example"
                                    value={examples.example}
                                    onChange={(e) => handleListChange(e, "examples")}
                                    className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="ສ້າງປະໂຫຍກຕົວຢ່າງ"
                                />
                                {examErrorMessagae && (
                                    <div className="absolute top-full left-4 mt-1 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg flex items-center gap-1">
                                        <FaExclamationCircle className="text-red-500" />
                                        {examErrorMessagae}
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => addListItem("examples")}
                                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 "
                            >
                                ເພີ່ມຕົວຢ່າງ
                            </button>
                        </div>
                        <ul>
                            {
                                formData.examples.map((item, index) => <li >
                                    <div className="flex justify-between  border-2 border-gray-300 my-2 p-3 rounded-lg">
                                        <div className="flex items-center space-x-4 rounded-lg  ">
                                            <FaBook className="text-gray-500" />
                                            <span className="text-gray-900">{item.example}</span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeListItem(index, "examples")}
                                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            ລຶບ
                                        </button>
                                    </div>
                                </li>)
                            }

                        </ul>
                    </div>
                </div>



            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
                {
                    isLoading ? (<div className="flex justify-center items-center">
                        {/* Spinner Circle */}
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-blue-500"></div>
                    </div>) : (<button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        onClick={addNewWord} // Handle form submission
                    >
                        ເພີ່ມ
                    </button>)
                }




            </div>
        </div>

    );
}