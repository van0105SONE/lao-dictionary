// app/[word]/page.tsx — Server Component (enables per-word metadata & SEO)
import type { Metadata } from "next";
import { getWordByWord } from "@/app/lib/searchActions";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import WordDetailCard from "@/components/WordDetailCard";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import Script from "next/script";

interface PageProps {
  params: Promise<{ word: string }>;
}

// ─── Per-word metadata ──────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { word: wordParam } = await params;
  const decoded = decodeURIComponent(wordParam);
  const wordData = (await getWordByWord(decoded)) as DicionaryModel | null;

  if (!wordData || !wordData.word) {
    return {
      title: `${decoded} – ຄຳສັບລາວ | Lao Dictionary`,
      description: `ຄົ້ນຫາຄວາມໝາຍຂອງຄຳວ່າ ${decoded} ໃນວັດຈະນານຸກົມລາວ-ອັງກິດ.`,
    };
  }

  const firstDef =
    (wordData.definitions as { english?: string; lao?: string }[])?.[0]
      ?.english ?? "";

  const title = `${wordData.word} – ຄຳສັບລາວ | Lao Dictionary`;
  const description = firstDef
    ? `${wordData.word}: ${firstDef}. ຄົ້ນຫາຄວາມໝາຍ, ການອອກສຽງ ແລະ ຕົວຢ່າງໃນວັດຈະນານຸກົມລາວ-ອັງກິດ.`
    : `ຄົ້ນຫາຄວາມໝາຍ ແລະ ການອອກສຽງຂອງ ${wordData.word} ໃນວັດຈະນານຸກົມລາວ-ອັງກິດ.`;

  return {
    title,
    description,
    keywords: [
      wordData.word,
      `${wordData.word} ຄຳສັບລາວ`,
      `${wordData.word} ແປ`,
      "ຄຳສັບພາສາລາວ",
      "ຄຳສັບລາວ",
      "lao dictionary",
      "lao words",
    ],
    alternates: {
      canonical: `/${encodeURIComponent(wordData.word)}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.laoswords.com/${encodeURIComponent(wordData.word)}`,
      siteName: "ຄຳສັບພາສາລາວ",
      locale: "lo_LA",
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default async function WordPage({ params }: PageProps) {
  const { word: wordParam } = await params;
  const decoded = decodeURIComponent(wordParam);
  const wordData = (await getWordByWord(decoded)) as DicionaryModel | null;

  // Build JSON-LD DefinedTerm structured data
  const firstDef =
    (wordData?.definitions as { english?: string; lao?: string }[])?.[0]
      ?.english ?? "";
  const jsonLd = wordData?.word
    ? {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: wordData.word,
        description: firstDef || undefined,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "ວັດຈະນານຸກົມລາວ-ອັງກິດ",
          url: "https://www.laoswords.com",
        },
        ...(wordData.pronuncation
          ? { pronunciation: wordData.pronuncation }
          : {}),
      }
    : null;

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Header />
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* JSON-LD DefinedTerm schema */}
      {jsonLd && (
        <Script
          id="word-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      )}

      <main className="container mx-auto px-4 pt-24 mb-12">
        <div className="relative max-w-3xl mx-auto">
          {wordData && wordData.word ? (
            <article className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <WordDetailCard
                id={wordData.id}
                pronuncation={wordData.pronuncation}
                part_of_speech={wordData.part_of_speech}
                word={wordData.word}
                definitions={wordData.definitions}
                examples={wordData.examples}
              />
            </article>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 text-center">
              <p className="text-2xl text-gray-500">
                ບໍ່ພົບຄຳທີ່ຄົ້ນຫາ: &quot;{decoded}&quot;
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
