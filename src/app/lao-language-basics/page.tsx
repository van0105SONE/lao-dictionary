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
    <div className="relative min-h-screen flex flex-col bg-white">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #f0f4ff 0%, #fdf6ee 50%, #f0fff4 100%)",
        }}
        aria-hidden="true"
      />
      <Header />
      <main className="flex-1">
        <LaoBasicsClient />
      </main>
      <Footer />
    </div>
  );
}
