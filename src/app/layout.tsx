import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: "../../public/NotoSansLao_Condensed-Black.ttf",
});

export const metadata: Metadata = {
  title: "ຄຳສັບພາສາລາວ",
  description: "ຮຽນພາສາລາວ, learn laos, ",
  icons: {
    icon: "/favicon.ico", // <--- Your favicon path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
