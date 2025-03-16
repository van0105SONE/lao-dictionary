"use client";


export default async function Page() {

    return (
        <div className="relative">
            <div
                className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            ></div>
            <div className="relative pt-16 text-dark-100 h-screen">
                <div className="container mx-auto mt-4">
                    <div className="bg-white">
                        {/* Search and Add Button Section */}
                        <div className="flex justify-between items-center">
                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* Add Button */}
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                ເພີ່ມຄຳສັບເຂົ້າລະບົບ
                            </button>
                        </div>

                        {/* Table */}
                        <table className="table-auto w-full mt-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">Word</th>
                                    <th className="px-4 py-2 text-left">Part of Speech</th>
                                    <th className="px-4 py-2 text-left">Created At</th>
                                    <th className="px-4 py-2 text-left">Upload By</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="px-4 py-2">1</td>
                                    <td className="px-4 py-2">Example</td>
                                    <td className="px-4 py-2">Noun</td>
                                    <td className="px-4 py-2">2023-10-01</td>
                                    <td className="px-4 py-2">User123</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-2">2</td>
                                    <td className="px-4 py-2">Sample</td>
                                    <td className="px-4 py-2">Verb</td>
                                    <td className="px-4 py-2">2023-10-02</td>
                                    <td className="px-4 py-2">User456</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-2">3</td>
                                    <td className="px-4 py-2">Test</td>
                                    <td className="px-4 py-2">Adjective</td>
                                    <td className="px-4 py-2">2023-10-03</td>
                                    <td className="px-4 py-2">User789</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </div>

    )
}