// app/page.tsx
import SearchCard from "@/components/SearchComponent";
import Image from "next/image";
import CharacterGrid from "@/components/CharGrid";
import PopularWordsSection from "@/components/PopularWordSection";
import MistakeCorrectionSection from "@/components/MistakeCorrectSection";
import Header from "@/components/header";
import laoWomen from "../../public/lao-women.jpg";
import { LAO_ALPHABET } from "@/shared/constant/global-contant";
import { getRecentWords, getRecentCorrectIncorrect } from "./lib/actions";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";

// Hardcoded fallbacks (in case API is slow/down)
const FALLBACK_WORDS = [
  { lao: "ສະບາຍດີ", english: "Hello", pronunciation: "sa-bai-dee" },
  { lao: "ຂອບໃຈ", english: "Thank you", pronunciation: "khop jai" },
  { lao: "ນໍ້າ", english: "Water", pronunciation: "nam" },
  // ... more
];

const FALLBACK_PAIRS = [
  { incorrect: "ສະບາຍດີ້", correct: "ສະບາຍດີ", note: "No tone mark" },
  // ...
];

export default async function Home() {
  // Fetch data directly on the server (parallel!)
  const [wordsData, pairsData] = await Promise.all([
    getRecentWords().catch(() => FALLBACK_WORDS),
    getRecentCorrectIncorrect().catch(() => FALLBACK_PAIRS),
  ]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />

      {/* Subtle grid background */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <main className="relative flex-1">
        <div className="pt-12 pb-20 ">
          <SearchCard />
        </div>

        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-8 pb-20">
          {/* Content Sections */}
          <div className="lg:col-span-2 space-y-12">
            <PopularWordsSection words={wordsData as DicionaryModel[]} />

            <MistakeCorrectionSection pairs={pairsData as CorrectIncorrect[]} />

            <CharacterGrid
              chars={LAO_ALPHABET}
              title="ຕົວອັກສອນພາສາລາວ"
              background_color="bg-white"
              text_color="bg-gradient-to-r from-[#4F959D] to-[#205781]"
            />
          </div>

          {/* Ad Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-medium text-gray-700 mb-4 text-center">
                ໂຄສະໜາ
              </h4>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={laoWomen}
                  alt="Lao women in traditional sinh and cultural attire"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative bg-gradient-to-r from-[#205781] to-gray-300 py-12 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm opacity-90">
            © 2025 ຄຳສັບພາສາລາວ • Made with ❤️ for the Lao community
          </p>
        </div>
      </footer>
    </div>
  );
}
