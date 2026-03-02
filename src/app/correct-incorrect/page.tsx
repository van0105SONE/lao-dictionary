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
      <CorrectIncorrectClient />
    </>
  );
}


