// app/correct-incorrect/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import CorrectIncorrectClient from "./CorrectIncorrectClient";

export const metadata: Metadata = {
  title: "ຄຳຖືກ ແລະ ຜິດ | ຄຳຖືກແລະຜິດ | ຄຳສັບພາສາລາວ",
  description:
    "ຖານຂໍ້ມູນຄຳຖືກ ແລະ ຜິດ (ຄຳຖືກແລະຜິດ) ໃນພາສາລາວ. ເບິ່ງຄຳສັບຖືກຜິດທີ່ພົບເລື້ອຍ ພ້ອມຄຳອະທິບາຍທີ່ຖືກຕ້ອງ. ຄຳຖືກ ແລະ ຜິດ, ຄຳຖືກແລະຜິດ, ຄຳສັບຖືກຜິດ, ຄຳຜິດລາວ.",
  keywords: [
    "ຄຳຖືກ ແລະ ຜິດ",
    "ຄຳຖືກແລະຜິດ",
    "ຄຳສັບຖືກ ແລະ ຜິດ",
    "ຄຳສັບຖືກແລະຜິດ",
    "ຄຳສັບຖືກ ຜິດ",
    "ຄຳຜິດ ລາວ",
    "ຄຳຜິດລາວ",
    "ຄຳຖືກຜິດພາສາລາວ",
    "ຄຳສັບຖືກຜິດ",
    "ຄຳສັບພາສາລາວ",
    "ຄຳສັບລາວ",
    "lao correct spelling",
    "lao wrong spelling",
    "lao vocabulary",
  ],
  alternates: {
    canonical: "/correct-incorrect",
  },
  openGraph: {
    title: "ຄຳຖືກ ແລະ ຜິດ | ຄຳຖືກແລະຜິດ | ຄຳສັບພາສາລາວ",
    description:
      "ຖານຂໍ້ມູນຄຳຖືກ ແລະ ຜິດ (ຄຳຖືກແລະຜິດ) ໃນພາສາລາວ ພ້ອມຄຳອະທິບາຍ. Common Lao spelling mistakes corrected.",
    url: "https://www.laoswords.com/correct-incorrect",
    siteName: "ຄຳສັບພາສາລາວ",
    locale: "lo_LA",
    type: "website",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "ຄຳສັບພາສາລາວ",
      item: "https://www.laoswords.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "ຄຳຖືກ ແລະ ຜິດ",
      item: "https://www.laoswords.com/correct-incorrect",
    },
  ],
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ຄຳຖືກ ແລະ ຜິດ",
  alternateName: "ຄຳຖືກແລະຜິດ",
  description:
    "ຖານຂໍ້ມູນຄຳຖືກ ແລະ ຜິດ (ຄຳຖືກແລະຜິດ) ໃນພາສາລາວ. ຄຳສັບທີ່ຖືກ ແລະ ຜິດ ທີ່ຄົນລາວສັບສົນເລື້ອຍໆ.",
  url: "https://www.laoswords.com/correct-incorrect",
  inLanguage: "lo",
};

// Static examples shown to Googlebot — the interactive list loads client-side
const STATIC_EXAMPLES = [
  { incorrect: "ນ້ຳ",       correct: "ນໍ້າ",     note: "ໃຊ້ ໍ ແທນ ້" },
  { incorrect: "ຮັກຮັກ",    correct: "ຮັກ",       note: "ບໍ່ຕ້ອງຊ້ຳຄຳ" },
  { incorrect: "ສະບາຍດີ້",  correct: "ສະບາຍດີ", note: "ບໍ່ຕ້ອງໃຊ້ຕົວເລກສຽງ (້)" },
  { incorrect: "ນ້ຳໃຈ",     correct: "ນໍ້າໃຈ",   note: "ໃຊ້ ໍ ແທນ ້" },
];

export default function CorrectIncorrectPage() {
  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        strategy="beforeInteractive"
      />
      <Script
        id="collection-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
        strategy="beforeInteractive"
      />

      {/*
        Static server-rendered intro — visible to Googlebot.
        CorrectIncorrectClient loads pair data via useEffect (client-side),
        so without this section the crawler would see a near-empty page.
        sr-only hides it visually but keeps it in the DOM for crawlers.
      */}
      <div className="sr-only" aria-hidden="false">
        <h1>ຄຳຖືກ ແລະ ຜິດ ໃນພາສາລາວ — Lao Correct and Incorrect Word Spelling Database</h1>
        <p>
          ຖານຂໍ້ມູນຄຳຖືກ ແລະ ຜິດ ສຳລັບຜູ້ໃຊ້ພາສາລາວ.
          ຮຽນຮູ້ຄຳທີ່ຄົນລາວຂຽນຜິດເລື້ອຍໆ ແລະ ຮູ້ຈັກວ່າຄຳໃດແມ່ນຖືກຕ້ອງ.
        </p>
        <p lang="en">
          A database of commonly misspelled Lao words. Learn which Lao spellings
          are correct and which are incorrect, with clear explanations for each.
          Improve your Lao writing skills with this free reference tool.
        </p>
        <h2>ຕົວຢ່າງຄຳຖືກ ແລະ ຜິດ — Example Correct and Incorrect Lao Words</h2>
        <ul>
          {STATIC_EXAMPLES.map((ex) => (
            <li key={ex.incorrect}>
              <span>ຜິດ / Incorrect: {ex.incorrect}</span>
              {" → "}
              <span>ຖືກ / Correct: {ex.correct}</span>
              {" — "}
              <span>{ex.note}</span>
            </li>
          ))}
        </ul>
        <p>
          ຄຳອະທິບາຍ: ເວັບໄຊນີ້ລວບລວມຄຳສັບທີ່ຄົນລາວຂຽນຜິດ ແລະ ສະໜອງຮູບແບບທີ່ຖືກຕ້ອງ.
          ນຳໃຊ້ເປັນຂໍ້ອ້າງອິງໃນການຂຽນ ແລະ ສື່ສານໃນພາສາລາວ.
        </p>
        <p lang="en">
          This page is part of laoswords.com, a free Lao language reference
          website. The correct-incorrect section helps Lao speakers and learners
          identify and avoid common spelling mistakes in the Lao language.
        </p>
      </div>

      <CorrectIncorrectClient />
    </>
  );
}
