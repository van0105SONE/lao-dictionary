export interface AddWordDialogProps {
    onClose: () => void;
}

export default function AddWordDialog({ onClose }: AddWordDialogProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-96">
            {/* Blurred Background */}
            <div className="fixed inset-0  "></div>

            {/* Dialog Content */}
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-2xl relative z-10">
                <h2 className="text-xl font-semibold mb-4">ເພີ່ມຄຳສັບ</h2>

                {/* Form Fields */}
                <div className="space-y-4">
                    {/* Word */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ຄຳສັບ</label>
                        <input
                            type="text"
                            className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter word"
                        />
                    </div>

                    {/* Part of Speech */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ປະເພດຄຳສັບ</label>
                        <select
                            className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="noun">ຄຳນາມ</option>
                            <option value="verb">ກຳກິລິຍາ</option>
                        </select>
                    </div>

                    {/* Definitions */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ຄວາມໝາຍ</label>
                        <textarea
                            className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="ອະທິບາຍກຽວກັບຄວາມໝາຍຂອງຄຳສັບ"
                            rows={3}
                        />
                    </div>

                    {/* Examples */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ປະໂຫຍກຕົວຢ່າງ</label>
                        <textarea
                            className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="ສ້າງປະໂຫຍກຕົວຢ່າງ"
                            rows={3}
                        />
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
                    >
                        ເພີ່ມ
                    </button>
                </div>
            </div>
        </div>
    );
}