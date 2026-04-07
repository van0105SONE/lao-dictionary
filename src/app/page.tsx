// app/page.tsx
import type { Metadata } from "next";
import SearchCard from "@/components/SearchComponent";
import CharacterGrid from "@/components/CharGrid";
import PopularWordsSection from "@/components/PopularWordSection";
import MistakeCorrectionSection from "@/components/MistakeCorrectSection";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import HomeSidebar from "@/components/HomeSidebar";
import { LAO_ALPHABET } from "@/shared/constant/global-contant";
import { getRecentWords, getRecentCorrectIncorrect } from "./lib/actions";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";

export const metadata: Metadata = {
  title: "ວັດຈະນານຸກົມ ລາວແປລາວ | ຄຳສັບພາສາລາວ | Lao Dictionary Online",
  description:
    "ວັດຈະນານຸກົມ ລາວແປລາວ ອອນລາຍ ຟຣີ. ຄົ້ນຫາ ຄຳສັບຜິດແລະຖືກ, ລາວ - ລາວ, ຄຳສັບພາສາລາວ ແລະ ຕົວຢ່າງປະໂຫຍກ. ເວັບໄຊຮຽນພາສາລາວອັນດັບໜຶ່ງ.",
  keywords: [
    // New keywords requested
    "ວັດຈະນານຸກົມ ລາວແປລາວ",
    "ລາວແປລາວ",
    "ລາວ - ລາວ",
    "ລາວ-ລາວ",
    "ຄຳສັບຜິດແລະຖືກ",
    "ຄຳສັບຜິດ ແລະ ຖືກ",
    "ເວັບໄຊຮຽນພາສາລາວອັນດັບໜຶ່ງ",
    "ເວັບໄຊຮຽນພາສາລາວ",
    "ຮຽນພາສາລາວ ອັນດັບໜຶ່ງ",
    // Existing keywords
    "ຄຳສັບພາສາລາວ",
    "ຄຳສັບລາວ",
    "ວັດຈະນານຸກົມລາວ",
    "ວັດຈະນານຸກົມລາວ-ອັງກິດ",
    "ຮຽນພາສາລາວ",
    "ພາສາລາວ",
    "ຄຳຖືກ ແລະ ຜິດ",
    "ຄຳຖືກແລະຜິດ",
    "ຄຳຜິດແລະຖືກ",
     "ຄຳຜິດ-ຖືກ",
    "ຄຳສັບຖືກ ແລະ ຜິດ",
    "ຄຳສັບຖືກແລະຜິດ",
    "ຄຳຜິດ ລາວ",
    "ຄຳຜິດລາວ",
    "ຄຳລາວ",
    "ເວົ້າລາວ",
    "lao dictionary",
    "lao lao dictionary",
    "lao to lao dictionary",
    "lao english dictionary",
    "learn lao",
    "learn lao language",
    "lao words",
    "lao vocabulary",
    "lao correct spelling",
    "free lao dictionary",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ວັດຈະນານຸກົມ ລາວແປລາວ | ຄຳສັບພາສາລາວ | Lao Dictionary Online",
    description:
      "ວັດຈະນານຸກົມ ລາວແປລາວ ອອນລາຍ ຟຣີ. ຄຳສັບຜິດແລະຖືກ, ລາວ - ລາວ. ເວັບໄຊຮຽນພາສາລາວອັນດັບໜຶ່ງ.",
    url: "https://www.laoswords.com",
    siteName: "ຄຳສັບພາສາລາວ",
    locale: "lo_LA",
    type: "website",
    images: [
      {
        url: "/dictionary_logo.png",
        width: 1200,
        height: 630,
        alt: "ວັດຈະນານຸກົມ ລາວແປລາວ – Lao Dictionary",
      },
    ],
  },
};

const FALLBACK_WORDS = [
  { lao: "ສະບາຍດີ", english: "Hello",    pronunciation: "sa-bai-dee" },
  { lao: "ຂອບໃຈ",   english: "Thank you", pronunciation: "khop jai" },
  { lao: "ນໍ້າ",    english: "Water",     pronunciation: "nam" },
];
const FALLBACK_PAIRS = [
  { incorrect: "ສະບາຍດີ້", correct: "ສະບາຍດີ", note: "No tone mark" },
];

export default async function Home() {
  const [wordsData, pairsData] = await Promise.all([
    getRecentWords().catch(() => FALLBACK_WORDS),
    getRecentCorrectIncorrect().catch(() => FALLBACK_PAIRS),
  ]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <main className="relative flex-1">
        <div className="pt-12 pb-20">
          <SearchCard />
        </div>
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-2 space-y-12">
            <PopularWordsSection words={wordsData as DicionaryModel[]} />
            <MistakeCorrectionSection pairs={pairsData as CorrectIncorrect[]} />
            <CharacterGrid
              chars={LAO_ALPHABET}
              background_color="bg-white"
              text_color="bg-gradient-to-r from-[#4F959D] to-[#205781]"
            />
          </div>
          <div className="lg:col-span-1">
            <HomeSidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
