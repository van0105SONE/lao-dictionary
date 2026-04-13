import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import Image from "next/image";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "ກ່ຽວກັບພວກເຮົາ | About Us | ຄຳສັບພາສາລາວ",
  description:
    "ພວກເຮົາສ້າງ ວັດຈະນານຸກົມພາສາລາວ ນີ້ຂຶ້ນມາເພື່ອຮັບໃຊ້ຊຸມຊົນລາວໃນທົ່ວໂລກ. We built this free Lao dictionary (laoswords.com) to serve the global Lao-speaking community and Lao language learners worldwide.",
  keywords: [
    "ກ່ຽວກັບພວກເຮົາ",
    "ຄຳສັບພາສາລາວ",
    "ວັດຈະນານຸກົມລາວ",
    "ຮຽນພາສາລາວ",
    "lao dictionary",
    "about lao dictionary",
    "free lao dictionary",
    "lao language learning",
    "laoswords.com",
  ],
  alternates: { canonical: "/aboutus" },
  openGraph: {
    title: "ກ່ຽວກັບພວກເຮົາ | About Us | ຄຳສັບພາສາລາວ",
    description:
      "ພວກເຮົາສ້າງ ວັດຈະນານຸກົມພາສາລາວ ນີ້ຂຶ້ນມາເພື່ອຮັບໃຊ້ຊຸມຊົນລາວໃນທົ່ວໂລກ. A free online Lao dictionary for learners and native speakers.",
    url: "https://www.laoswords.com/aboutus",
    siteName: "ຄຳສັບພາສາລາວ",
    locale: "lo_LA",
    type: "website",
  },
};

// ─── Static bilingual content rendered on the server ────────────────────────
// This ensures Google's crawler sees rich publisher content without needing JS.
export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className="fixed inset-0 -z-10 bg-white
        bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
        bg-[size:24px_24px]"
        aria-hidden="true"
      />
      <Header />
      <main className="flex-1 px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto space-y-20">

          {/* ── Hero ──────────────────────────────────────────────────── */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900">
              ກ່ຽວກັບ{" "}
              <span className="font-medium text-[#205781]">ຄຳສັບພາສາລາວ</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ວັດຈະນານຸກົມລາວ-ອັງກິດ ອອນລາຍ ຟຣີ ສຳລັບທຸກຄົນ —{" "}
              <span lang="en">
                A free online Lao-English dictionary for everyone.
              </span>
            </p>
          </div>

          {/* ── Vision ────────────────────────────────────────────────── */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                ວິໄສທັດຂອງພວກເຮົາ
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                ພວກເຮົາເຊື່ອວ່າທຸກຄົນຄວນມີສິດເຂົ້າຫາຄຳສັບ ແລະ ຄວາມຮູ້ພາສາລາວໄດ້ຢ່າງຟຣີ.
                ເວັບໄຊ <strong>laoswords.com</strong> ສ້າງຂຶ້ນຈາກຄວາມຮັກໃນພາສາ ແລະ ວັດທະນະທຳລາວ.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed" lang="en">
                We believe everyone should have free access to Lao vocabulary and
                language knowledge. <strong>laoswords.com</strong> was built out
                of love for the Lao language and culture.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-100 aspect-square">
              <Image
                src="/lao-culture.jpg"
                alt="Lao culture and language community – ວັດທະນະທຳລາວ"
                width={800}
                height={800}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </section>

          {/* ── What we offer ─────────────────────────────────────────── */}
          <section className="space-y-8">
            <h2 className="text-3xl font-light text-gray-900 text-center">
              ສິ່ງທີ່ພວກເຮົາມີ{" "}
              <span lang="en" className="text-[#205781]">/ What We Offer</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "📖",
                  titleLo: "ວັດຈະນານຸກົມລາວ-ໃນ",
                  titleEn: "Lao-to-Lao Dictionary",
                  descLo:
                    "ຄຳສັບລາວຫຼາຍພັນຄຳ ພ້ອມຄຳອະທິບາຍ, ການອອກສຽງ ແລະ ໝວດຄຳ.",
                  descEn:
                    "Thousands of Lao words with definitions, pronunciation guides, and part-of-speech labels.",
                },
                {
                  icon: "✅",
                  titleLo: "ຄຳຖືກ ແລະ ຜິດ",
                  titleEn: "Correct vs. Incorrect Words",
                  descLo:
                    "ຖານຂໍ້ມູນຄຳທີ່ຄົນລາວຂຽນຜິດເລື້ອຍໆ ພ້ອມຄຳອະທິບາຍ ແລະ ການແກ້ໄຂທີ່ຖືກຕ້ອງ.",
                  descEn:
                    "A database of commonly misspelled Lao words with correct forms and explanations.",
                },
                {
                  icon: "🔊",
                  titleLo: "ການອອກສຽງ",
                  titleEn: "Pronunciation",
                  descLo:
                    "ຮຽນຮູ້ການອອກສຽງຄຳສັບລາວດ້ວຍສັດສ່ວນທີ່ຊັດເຈນ.",
                  descEn:
                    "Learn how to pronounce Lao words accurately with romanized pronunciation guides.",
                },
                {
                  icon: "📝",
                  titleLo: "ຕົວຢ່າງໃນປະໂຫຍກ",
                  titleEn: "Example Sentences",
                  descLo: "ຕົວຢ່າງປະໂຫຍກທີ່ຊ່ວຍໃຫ້ເຂົ້າໃຈການໃຊ້ຄຳສັບໃນສະຖານະການຈິງ.",
                  descEn:
                    "Real-world example sentences showing how words are used in context.",
                },
                {
                  icon: "🔡",
                  titleLo: "ຕາຕະລາງຕົວໜັງສືລາວ",
                  titleEn: "Lao Alphabet Grid",
                  descLo:
                    "ຕາຕະລາງຕົວໜັງສືລາວ ທີ່ຊ່ວຍໃຫ້ຜູ້ຮຽນຈື່ຈຳຕົວໜັງສືໄດ້ງ່າຍ.",
                  descEn:
                    "An interactive Lao alphabet chart helping learners memorize Lao script quickly.",
                },
                {
                  icon: "🌐",
                  titleLo: "ຟຣີ ແລະ ໃຊ້ງ່າຍ",
                  titleEn: "Free & Easy to Use",
                  descLo:
                    "ເວັບໄຊໃຊ້ງ່າຍ ບໍ່ຕ້ອງລົງທະບຽນ ແລະ ໃຊ້ໄດ້ທຸກອຸປະກອນ.",
                  descEn:
                    "No registration required. Works on any device — desktop, tablet, or mobile.",
                },
              ].map((item) => (
                <div
                  key={item.titleEn}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-3"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="font-semibold text-gray-900">
                    {item.titleLo}
                    <span
                      lang="en"
                      className="block text-sm font-normal text-[#4F959D] mt-0.5"
                    >
                      {item.titleEn}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.descLo}
                  </p>
                  <p
                    lang="en"
                    className="text-sm text-gray-500 leading-relaxed"
                  >
                    {item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────── */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-gray-900">
              ຄຳຖາມທີ່ພົບເລື້ອຍ{" "}
              <span lang="en" className="text-[#205781]">
                / Frequently Asked Questions
              </span>
            </h2>
            <div className="space-y-4">
              {[
                {
                  qLo: "laoswords.com ແມ່ນຫຍັງ?",
                  qEn: "What is laoswords.com?",
                  aLo:
                    "laoswords.com ແມ່ນເວັບໄຊວັດຈະນານຸກົມລາວ-ອັງກິດອອນລາຍ ທີ່ສ້າງຂຶ້ນເພື່ອຊ່ວຍຜູ້ຮຽນພາສາລາວ ແລະ ຄົນລາວທົ່ວໄປ.",
                  aEn:
                    "laoswords.com is a free online Lao-English dictionary website built to help Lao language learners and native Lao speakers.",
                },
                {
                  qLo: "ຂໍ້ມູນຄຳສັບມາຈາກໃສ?",
                  qEn: "Where does the word data come from?",
                  aLo:
                    "ຂໍ້ມູນຄຳສັບລວບລວມຈາກຫຼາຍແຫຼ່ງ ລວມທັງວັດຈະນານຸກົມລາວທາງການ ແລະ ປຶ້ມອ້າງອິງຕ່າງໆ.",
                  aEn:
                    "Word data is compiled from multiple sources including official Lao dictionaries and language reference books.",
                },
                {
                  qLo: "ສາມາດຊ່ວຍເພີ່ມຄຳສັບໄດ້ບໍ?",
                  qEn: "Can I contribute new words?",
                  aLo:
                    "ໄດ້ຄ່ະ! ສາມາດຕິດຕໍ່ພວກເຮົາຜ່ານໜ້າ ຕິດຕໍ່ ເພື່ອສະເໜີຄຳສັບໃໝ່ ຫຼື ແຈ້ງຄຳທີ່ຜິດ.",
                  aEn:
                    "Yes! Contact us via the Contact page to suggest new words or report errors.",
                },
              ].map((faq) => (
                <details
                  key={faq.qEn}
                  className="bg-white rounded-xl border border-gray-200 p-5 open:shadow-sm transition-all"
                >
                  <summary className="cursor-pointer font-medium text-gray-900 select-none">
                    {faq.qLo}{" "}
                    <span lang="en" className="text-[#4F959D] text-sm font-normal">
                      / {faq.qEn}
                    </span>
                  </summary>
                  <div className="mt-3 space-y-2">
                    <p className="text-gray-700 leading-relaxed">{faq.aLo}</p>
                    <p lang="en" className="text-gray-500 leading-relaxed text-sm">
                      {faq.aEn}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ── Language-switch client island (for the toggle) ────────── */}
          <AboutClient />

        </div>
      </main>
      <Footer />
    </div>
  );
}
