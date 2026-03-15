import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "ຕິດຕໍ່ພວກເຮົາ | Contact Us | ຄຳສັບພາສາລາວ",
  description:
    "ຕິດຕໍ່ທີມ ຄຳສັບພາສາລາວ (laoswords.com). Contact the Lao Dictionary team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "ຕິດຕໍ່ພວກເຮົາ | Contact Us | ຄຳສັບພາສາລາວ",
    description: "ຕິດຕໍ່ທີມ ຄຳສັບພາສາລາວ ເພື່ອສົ່ງຄຳແນະນຳ ຫຼື ຮ່ວມພັດທະນາ.",
    url: "https://www.laoswords.com/contact",
    siteName: "ຄຳສັບພາສາລາວ",
    locale: "lo_LA",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
