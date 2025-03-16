"use client";

import AddWordDialog from "@/components/AddWordDialog";
import { useState } from "react";


export default async function Page() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    return (
        <div className="relative">
            <div
                className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            ></div>
            <div className="relative pt-16 text-dark-100 h-screen">
                <div className="container mx-auto mt-4 p-4">
                    <div className="bg-white">
                        {/* Search and Add Button Section */}
                        <div className="flex justify-between items-center">
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
                            <button
                                className="px-4 py-2 bg-[#205781] text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => {
                                    setIsAddDialogOpen(true)
                                }}
                            >
                                ເພີ່ມຄຳສັບເຂົ້າລະບົບ
                            </button>
                        </div>

                        {/* Table */}
                        <table className="table-auto w-full mt-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left">ລະຫັດ</th>
                                    <th className="px-4 py-2 text-left">ຄຳສັບ</th>
                                    <th className="px-4 py-2 text-left">ປະເພດຄຳສັບ</th>
                                    <th className="px-4 py-2 text-left">ເພີ່ມເມື່ອວັນທິ</th>
                                    <th className="px-4 py-2 text-left">ເພີ່ມໂດຍ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="">
                                    <td className="px-4 py-2">1</td>
                                    <td className="px-4 py-2">Example</td>
                                    <td className="px-4 py-2">Noun</td>
                                    <td className="px-4 py-2">2023-10-01</td>
                                    <td className="px-4 py-2">User123</td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2">2</td>
                                    <td className="px-4 py-2">Sample</td>
                                    <td className="px-4 py-2">Verb</td>
                                    <td className="px-4 py-2">2023-10-02</td>
                                    <td className="px-4 py-2">User456</td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2">3</td>
                                    <td className="px-4 py-2">Test</td>
                                    <td className="px-4 py-2">Adjective</td>
                                    <td className="px-4 py-2">2023-10-03</td>
                                    <td className="px-4 py-2">User789</td>
                                </tr>
                            </tbody>
                        </table>

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
           {
            isAddDialogOpen && <AddWordDialog onClose={()=>{
                setIsAddDialogOpen(false)
            }}></AddWordDialog>
           }
        </div>

    )
}