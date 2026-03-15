import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "ກ່ຽວກັບພວກເຮົາ | About Us | ຄຳສັບພາສາລາວ",
  description:
    "ພວກເຮົາສ້າງ ວັດຈະນານຸກົມພາສາລາວ ນີ້ຂຶ້ນມາເພື່ອຮັບໃຊ້ຊຸມຊົນລາວໃນທົ່ວໂລກ. We built this Lao dictionary to serve the global Lao community.",
  keywords: [
    "ກ່ຽວກັບພວກເຮົາ", "ຄຳສັບພາສາລາວ", "ວັດຈະນານຸກົມລາວ",
    "lao dictionary", "about lao dictionary",
  ],
  alternates: { canonical: "/aboutus" },
  openGraph: {
    title: "ກ່ຽວກັບພວກເຮົາ | About Us | ຄຳສັບພາສາລາວ",
    description: "ພວກເຮົາສ້າງ ວັດຈະນານຸກົມພາສາລາວ ນີ້ຂຶ້ນມາເພື່ອຮັບໃຊ້ຊຸມຊົນລາວໃນທົ່ວໂລກ.",
    url: "https://www.laoswords.com/aboutus",
    siteName: "ຄຳສັບພາສາລາວ",
    locale: "lo_LA",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
