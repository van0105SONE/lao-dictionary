// app/correct-incorrect/page.tsx
import type { Metadata } from "next";

import Script from "next/script";
import CorrectIncorrectClient from "./CorrectIncorrectClient";

export const metadata: Metadata = {
  title: "ຄຳຖືກ ແລະ ຜິດ | ຄຳສັບພາສາລາວ",
  description:
    "ຖານຂໍ້ມູນຄຳຖືກ ແລະ ຜິດ ໃນພາສາລາວ. ເບິ່ງຄຳສັບຖືກຜິດທີ່ພົບເຼື້ອຍ ພົ້ອມຄຳອຘິບາຍທີ່ຖືກຕ້ອງ. ຄຳຖືກ ແລະ ຜິດ, ຄຳສັບຖືກ ຜິດ, ຄຳຜິດລາວ.",
  keywords: [
    "ຄຳຖືກ ແລະ ຜິດ",
    "ຄຳສັບຖືກ ຜິດ",
    "ຄຳຜິດ ລາວ",
    "ຄຳຖືກຜິດພາສາລາວ",
    "ຄຳສັບພາສາລາວ",
    "ຄຳສັບລາວ",
    "lao correct spelling",
    "lao vocabulary",
  ],
  alternates: {
    canonical: "/correct-incorrect",
  },
  openGraph: {
    title: "ຄຳຖືກ ແລະ ຜິດ | ຄຳສັບພາສາລາວ",
    description:
      "ຖານຂໍ້ມູນຄຳຖືກ ແລະ ຜິດ ໃນພາສາລາວ ພົ້ອມຄຳອຘິບາຍ. Common Lao spelling mistakes corrected.",
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

export default function CorrectIncorrectPage() {
  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        strategy="beforeInteractive"
      />
      <CorrectIncorrectClient />
    </>
  );
}


