// app/correct-incorrect/[id]/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import { getCorrectIncorrectById } from "@/app/lib/searchActions";
import DetailContent from "./DetailContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const pair = await getCorrectIncorrectById(Number(id));

  if (!pair) {
    return { title: "ຄຳຖືກ ແລະ ຜິດ | ຄຳສັບພາສາລາວ", description: "ຄຳຖືກ ແລະ ຜິດ ໃນພາສາລາວ" };
  }

  const title = `${pair.incorrect_word} → ${pair.correct_word} | ຄຳຖືກ ແລະ ຜິດ`;
  const description = pair.explanation
    ? `ຄຳທີ່ຖືກຕ້ອງຂອງ "${pair.incorrect_word}" ແມ່ນ "${pair.correct_word}". ${pair.explanation}`
    : `ຮູ້ທັນ: "${pair.incorrect_word}" ຜິດ, ທີ່ຖືກຕ້ອງແມ່ນ "${pair.correct_word}".`;

  return {
    title,
    description,
    keywords: [pair.incorrect_word, pair.correct_word, "ຄຳຖືກ ແລະ ຜິດ", "ຄຳສັບພາສາລາວ"],
    alternates: { canonical: `/correct-incorrect/${id}` },
    openGraph: {
      title, description,
      url: `https://www.laoswords.com/correct-incorrect/${id}`,
      siteName: "ຄຳສັບພາສາລາວ",
      locale: "lo_LA",
      type: "article",
    },
  };
}

export default async function CorrectIncorrectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pair = await getCorrectIncorrectById(Number(id));

  const jsonLd = pair
    ? {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: pair.correct_word,
        description: pair.explanation || `ຮູບແບບທີ່ຖືກຕ້ອງຂອງ "${pair.incorrect_word}"`,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "ຄຳຖືກ ແລະ ຜິດ – ວັດຈະນານຸກົມລາວ",
          url: "https://www.laoswords.com/correct-incorrect",
        },
      }
    : null;

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      <div className="pointer-events-none absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {jsonLd && (
        <Script
          id="pair-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      )}

      <main className="relative flex-1 py-8 px-4 sm:py-12 sm:px-6">
        <DetailContent pair={pair} />
      </main>

      <Footer />
    </div>
  );
}
