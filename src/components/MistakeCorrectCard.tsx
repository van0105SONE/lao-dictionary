import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";
import Link from "next/link";

const MistakeCorrectionCard = ({
  id,
  incorrect_word,
  correct_word,
  explanation,
}: CorrectIncorrect) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 flex flex-col gap-4 border border-transparent hover:border-[#205781]/20">
      {/* Incorrect */}
      <div>
        <h3 className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1">
          ຜິດ
        </h3>
        <p className="text-xl text-red-600 line-through font-medium">
          {incorrect_word}
        </p>
      </div>

      {/* Correct */}
      <div>
        <h3 className="text-xs font-semibold text-green-500 uppercase tracking-widest mb-1">
          ຖືກ
        </h3>
        <p className="text-xl text-[#205781] font-bold">{correct_word}</p>
      </div>

      {/* Explanation */}
      {explanation && (
        <div className="bg-gray-50 px-4 py-3 rounded-lg border-l-4 border-amber-300/60 flex-1">
          <p className="text-sm text-gray-600 italic leading-relaxed">
            &ldquo;{explanation}&rdquo;
          </p>
        </div>
      )}

      {/* Detail button */}
      <Link
        href={`/correct-incorrect/${id}`}
        className="mt-1 flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#205781]/8 text-[#205781] font-semibold text-sm hover:bg-[#205781] hover:text-white transition-all duration-200 border border-[#205781]/20 hover:border-[#205781]"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        ເບິ່ງລາຍລະອຽດ
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
};

export default MistakeCorrectionCard;