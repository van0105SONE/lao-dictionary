// app/correct-incorrect/[id]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/header";
import { getCorrectIncorrectById } from "@/app/lib/searchActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

// ── Per-pair metadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const pair = await getCorrectIncorrectById(Number(id));

  if (!pair) {
    return {
      title: "ຄຳຖືກ ແລະ ຜິດ | ຄຳສັບພາສາລາວ",
      description: "ຄຳຖືກ ແລະ ຜິດ ໃນພາສາລາວ",
    };
  }

  const title = `${pair.incorrect_word} → ${pair.correct_word} | ຄຳຖືກ ແລະ ຜິດ`;
  const description = pair.explanation
    ? `ຄຳທີ່ຖືກຕ້ອງຂອງ "${pair.incorrect_word}" ແມ່ນ "${pair.correct_word}". ${pair.explanation}`
    : `ຮູ້ທັນ: "${pair.incorrect_word}" ຜິດ, ທີ່ຖືກຕ້ອງແມ່ນ "${pair.correct_word}".`;

  return {
    title,
    description,
    keywords: [
      pair.incorrect_word,
      pair.correct_word,
      "ຄຳຖືກ ແລະ ຜິດ",
      "ຄຳຖືກແລະຜິດ",
      "ຄຳສັບພາສາລາວ",
    ],
    alternates: {
      canonical: `/correct-incorrect/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.laoswords.com/correct-incorrect/${id}`,
      siteName: "ຄຳສັບພາສາລາວ",
      locale: "lo_LA",
      type: "article",
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
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
    <div className="relative min-h-screen flex flex-col">
      <Header />

      {/* Grid background */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {jsonLd && (
        <Script
          id="pair-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      )}

      <main className="relative flex-1 py-8 px-4 sm:py-12 sm:px-6">
        <div className="pt-16 max-w-2xl mx-auto">
          {/* Back button */}
          <Link
            href="/correct-incorrect"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#205781] mb-8 transition-colors group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            ກັບໄປລາຍການ
          </Link>

          {pair ? (
            <article className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8 sm:p-10 space-y-8">
              {/* Header badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#205781] bg-[#205781]/8 px-3 py-1 rounded-full">
                  ຄຳຖືກ ແລະ ຜິດ
                </span>
              </div>

              {/* Incorrect → Correct */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Incorrect */}
                <div className="flex-1 bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
                  <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
                    ຜິດ
                  </p>
                  <p className="text-4xl font-bold text-red-600 line-through leading-tight">
                    {pair.incorrect_word}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-500 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <svg className="w-5 h-5 text-gray-500 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Correct */}
                <div className="flex-1 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                  <p className="text-xs font-semibold text-green-500 uppercase tracking-widest mb-2">
                    ຖືກ
                  </p>
                  <p className="text-4xl font-bold text-[#205781] leading-tight">
                    {pair.correct_word}
                  </p>
                </div>
              </div>

              {/* Explanation */}
              {pair.explanation && (
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-6">
                  <p className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ຄຳອະທິບາຍ
                  </p>
                  <p className="text-gray-700 leading-relaxed">{pair.explanation}</p>
                </div>
              )}
            </article>
          ) : (
            <div className="bg-white rounded-3xl shadow-soft p-10 text-center">
              <p className="text-2xl text-gray-500">ບໍ່ພົບຂໍ້ມູນທີ່ຕ້ອງການ</p>
              <Link
                href="/correct-incorrect"
                className="mt-6 inline-block text-[#205781] underline"
              >
                ກັບໄປລາຍການ
              </Link>
            </div>
          )}
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
