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

            {/* ── About this dictionary — server-rendered bilingual content ── */}
            {/* This section is critical for Google AdSense: it provides rich     */}
            {/* publisher content that Googlebot can read without executing JS.   */}
            <section
              aria-label="ກ່ຽວກັບວັດຈະນານຸກົມ / About this dictionary"
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-[#205781]">
                  ກ່ຽວກັບ ວັດຈະນານຸກົມ ລາວແປລາວ
                </h2>
                <p lang="en" className="text-sm text-[#4F959D] font-medium">
                  About this Lao-to-Lao Dictionary
                </p>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>laoswords.com</strong> ແມ່ນເວັບໄຊວັດຈະນານຸກົມ ລາວ-ລາວ ແລະ ລາວ-ອັງກິດ
                  ອອນລາຍ ທີ່ໃຫ້ບໍລິການຟຣີ. ທ່ານສາມາດຄົ້ນຫາ ຄຳສັບພາສາລາວ,
                  ເບິ່ງຄວາມໝາຍ, ການອອກສຽງ, ໝວດຄຳ ແລະ ຕົວຢ່າງປະໂຫຍກໄດ້ທັນທີ.
                </p>
                <p lang="en" className="text-gray-600 text-sm">
                  <strong>laoswords.com</strong> is a free online Lao-to-Lao and
                  Lao-English dictionary. Search thousands of Lao words to find
                  definitions, pronunciation, part-of-speech, and example
                  sentences instantly.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">
                    ຄຸນສົມບັດຫຼັກ
                    <span lang="en" className="block text-sm font-normal text-[#4F959D]">
                      Key Features
                    </span>
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-[#205781] font-bold">✓</span>
                      ຄຳສັບລາວຫຼາຍພັນຄຳ ພ້ອມຄຳອະທິບາຍ
                      <span lang="en" className="text-gray-400 ml-1">(thousands of entries)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#205781] font-bold">✓</span>
                      ຖານຂໍ້ມູນຄຳຖືກ ແລະ ຜິດ
                      <span lang="en" className="text-gray-400 ml-1">(correct vs. incorrect words)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#205781] font-bold">✓</span>
                      ການອອກສຽງ ແລະ ໝວດຄຳ
                      <span lang="en" className="text-gray-400 ml-1">(pronunciation & part-of-speech)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#205781] font-bold">✓</span>
                      ຕົວຢ່າງປະໂຫຍກ
                      <span lang="en" className="text-gray-400 ml-1">(example sentences)</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">
                    ເໝາະສຳລັບ
                    <span lang="en" className="block text-sm font-normal text-[#4F959D]">
                      Who is this for?
                    </span>
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-[#4F959D]">→</span>
                      ຜູ້ຮຽນພາສາລາວ
                      <span lang="en" className="text-gray-400 ml-1">(Lao language learners)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#4F959D]">→</span>
                      ນັກຮຽນ ແລະ ນັກສຶກສາ
                      <span lang="en" className="text-gray-400 ml-1">(students)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#4F959D]">→</span>
                      ຄົນລາວທີ່ຢາກຂຽນໄດ້ຖືກຕ້ອງ
                      <span lang="en" className="text-gray-400 ml-1">(native speakers improving spelling)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#4F959D]">→</span>
                      ນັກແປ ແລະ ນັກຂຽນ
                      <span lang="en" className="text-gray-400 ml-1">(translators & writers)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
                ເວັບໄຊນີ້ອັບເດດຢ່າງຕໍ່ເນື່ອງ ເພື່ອຮັບປະກັນຄວາມຖືກຕ້ອງ ແລະ ຄວາມຄົບຖ້ວນຂອງຂໍ້ມູນ.
                {" "}
                <span lang="en">
                  This site is continuously updated to ensure accuracy and
                  completeness of Lao language data.
                </span>
              </p>
            </section>
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
