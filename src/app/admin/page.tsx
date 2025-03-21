"use client";

import AddWordDialog from "@/components/AddWordDialog";
import { useEffect, useState } from "react";
import { getWordList } from "../lib/adminAction";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { PaginationModel } from "@/shared/model/PaginationModel";
import Link from "next/link";
import Header from "@/components/header";
import Breadcrumb, { BreadcrumbProps } from "@/components/Breadcrumd";

export default function Page() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [words, setWords] = useState<DicionaryModel[]>([])
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Admin', href: '/admin' },
    ];

    const [pagination, setPagination] = useState<PaginationModel>({
        page: 1,
        limit: 10,
        total: 10,
        totalPage: 5
    })
    const fecthWords = async () => {
        const resData = await getWordList(pagination);
        console.log("user data: ", resData)
        setWords(resData)
    }


    useEffect(() => {
        fecthWords()
    }, [])

    return (

        <div className="relative">
            <Header></Header>

            <div
                className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            ></div>
            <div className="relative pt-16 text-dark-100 h-screen">
                <div className="container mx-auto mt-4 px-4">
                    <Breadcrumb pages={breadcrumbItems} />
                </div>

                <div className="container mx-auto mt-4 p-4">
                    <h4 className="text-2xl my-2">ວັດຈະນານຸກົມ</h4>
                    <div className="">
                        {/* Search and Add Button Section */}
                        <div className="flex flex-col-reverse md:flex-row   md:justify-between items-end">
                            {/* Search Input */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="ຄົ້ນຫາຄຳສັບ"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 placeholder-gray-400"
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </span>
                            </div>
                            {/* Add Button */}
                            <Link
                                href={"/admin/add-word"}
                                className="px-4 py-2 bg-[#205781] text-white  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                onClick={() => {
                                    setIsAddDialogOpen(true)
                                }}
                            >
                                ເພີ່ມຄຳສັບເຂົ້າລະບົບ
                            </Link>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full mt-4">
                                <thead>
                                    <tr className="bg-gray-100 text-sm">
                                        <th className="px-4 py-2 text-left">ລະຫັດ</th>
                                        <th className="px-4 py-2 text-left">ຄຳສັບ</th>
                                        <th className="px-4 py-2 text-left">ປະເພດຄຳສັບ</th>
                                        <th className="px-4 py-2 text-left">ການອອກສຽງ</th>
                                        <th className="px-4 py-2 text-left">ເພີ່ມໂດຍ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {words.map((item, index) => (
                                        <tr key={item.id} className="">
                                            <td className="px-4 py-2">{index + 1}</td>
                                            <td className="px-4 py-2">{item.lao_word}</td>
                                            <td className="px-4 py-2">{item.part_of_speech}</td>
                                            <td className="px-4 py-2">{item.pronunciation}</td>
                                            <td className="px-4 py-2">-</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="flex justify-end items-center space-x-2 mt-4">
                        {/* Previous Button */}
                        <button
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                        >
                            ກ່ອນຫນ້າ
                        </button>

                        {/* Page Numbers */}

                        <button className="px-4 py-2 bg-[#205781] text-white rounded-lg">1</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">2</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">3</button>

                        {/* Next Button */}
                        <button
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                        >
                            ຕໍ່ໄປ
                        </button>
                    </div>
                </div>

                <div className="container mx-auto mt-4 p-4">
                    <h4 className="text-2xl my-2">ຄຳຜິດ ແລະ ຖືກ</h4>

                    <div className="">
                        {/* Search and Add Button Section */}
                        <div className="flex flex-col-reverse md:flex-row   md:justify-between items-end">
                            {/* Search Input */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="ຄົ້ນຫາຄຳສັບ"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 placeholder-gray-400"
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </span>
                            </div>
                            {/* Add Button */}
                            <Link
                                href={"/admin/add-word"}
                                className="px-4 py-2 bg-[#205781] text-white  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                onClick={() => {
                                    setIsAddDialogOpen(true)
                                }}
                            >
                                ເພີ່ມຄຳສັບເຂົ້າລະບົບ
                            </Link>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full mt-4">
                                <thead>
                                    <tr className="bg-gray-100 text-sm">
                                        <th className="px-4 py-2 text-left">ລະຫັດ</th>
                                        <th className="px-4 py-2 text-left">ຄຳຖືກ</th>
                                        <th className="px-4 py-2 text-left">ຄຳຜິດ</th>
                                        <th className="px-4 py-2 text-left">ຄຳສັບ</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {words.map((item, index) => (
                                        <tr key={item.id} className="">
                                            <td className="px-4 py-2">{index + 1}</td>
                                            <td className="px-4 py-2">{item.lao_word}</td>
                                            <td className="px-4 py-2">{item.part_of_speech}</td>
                                            <td className="px-4 py-2">{item.pronunciation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="flex justify-end items-center space-x-2 mt-4">
                        {/* Previous Button */}
                        <button
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                        >
                            ກ່ອນຫນ້າ
                        </button>

                        {/* Page Numbers */}

                        <button className="px-4 py-2 bg-[#205781] text-white rounded-lg">1</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">2</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">3</button>

                        {/* Next Button */}
                        <button
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                        >
                            ຕໍ່ໄປ
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}