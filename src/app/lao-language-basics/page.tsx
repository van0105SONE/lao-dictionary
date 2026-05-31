import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import LaoBasicsClient from "./LaoBasicsClient";

export const metadata: Metadata = {
  title: "ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ | Basic Principles of Lao Language",
  description:
    "ຮຽນຮູ້ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ: ພະຍັນຊະນະ, ສະຫຼະ, ວັນນະຍຸດ, ຄຳ ແລະ ໂຄງສ້າງປະໂຫຍກ. Learn the basic principles of Lao language usage including consonants, vowels, tones, and word structure.",
  keywords: [
    "ຫຼັກການພາສາລາວ",
    "ພາສາລາວ",
    "ພະຍັນຊະນະລາວ",
    "ສະຫຼະລາວ",
    "ວັນນະຍຸດລາວ",
    "ຮຽນພາສາລາວ",
    "lao language basics",
    "lao consonants",
    "lao vowels",
    "lao tones",
    "learn lao",
  ],
  alternates: { canonical: "/lao-language-basics" },
  openGraph: {
    title: "ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ | Basic Principles of Lao Language",
    description:
      "ຮຽນຮູ້ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ. Learn the basic principles of Lao language usage.",
    url: "https://www.laoswords.com/lao-language-basics",
    siteName: "ຄຳສັບພາສາລາວ",
    locale: "lo_LA",
    type: "website",
  },
};

export default function LaoBasicsPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Same background as home page */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
      <Header />
      <main className="relative flex-1">
        <LaoBasicsClient />
      </main>
      <Footer />
    </div>
  );
}
