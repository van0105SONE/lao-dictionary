import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { Noto_Serif_Lao } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";

const myFont = localFont({
  src: "../../public/NotoSansLao_Condensed-Black.ttf",
});

const notoSerifLao = Noto_Serif_Lao({
  subsets: ["lao"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "ຄຳສັບພາສາລາວ | ວັດຈະນານຸກົມລາວ-ອັງກິດ | Lao Dictionary Online",
    template: "%s | ຄຳສັບພາສາລາວ – laoswords.com",
  },
  description:
    "ວັດຈະນານຸກົມລາວ-ອັງກິດ ອອນລາຍ ຟຣີ. ຄົ້ນຫາ ຄຳສັບພາສາລາວ, ຄຳຖືກ ແລະ ຜິດ, ການອອກສຽງ ແລະ ຕົວຢ່າງປະໂຫຍກ. ແຫຼ່ງຮຽນພາສາລາວທີ່ດີທີ່ສຸດ ລວບລວມຄຳສັບຫຼາຍພັນຄຳ.",
  keywords: [
    "ຄຳສັບພາສາລາວ",
    "ຄຳສັບລາວ",
    "ວັດຈະນານຸກົມລາວ",
    "ຮຽນພາສາລາວ",
    "ພາສາລາວ",
    "ຄຳຖືກ ແລະ ຜິດ",
    "ຄຳຖືກແລະຜິດ",
    "ຄຳສັບຖືກ ແລະ ຜິດ",
    "ຄຳສັບຖືກແລະຜິດ",
    "ຄຳຜິດ ລາວ",
    "ຄຳຜິດລາວ",
    "ຄຳສັບຖືກ ຜິດ",
    "ຄຳລາວ",
    "ເວົ້າລາວ",
    "ປື້ມຄຳສັບພາສາລາວ",
    "ປະເທດລາວ",
    "lao dictionary",
    "lao english dictionary",
    "english lao dictionary",
    "learn lao",
    "learn lao language",
    "lao words",
    "lao vocabulary",
    "lao pronunciation",
    "lao correct spelling",
    "free lao dictionary",
  ],

  metadataBase: new URL("https://www.laoswords.com"),

  alternates: {
    canonical: "/",
    languages: {
      lo: "/lo",
      en: "/en",
    },
  },

  openGraph: {
    title:
      "ຄຳສັບພາສາລາວ | ວັດຈະນານຸກົມລາວ-ອັງກິດ | Lao Dictionary Online",
    description:
      "ຄົ້ນຫາ ຄຳສັບພາສາລາວ, ຄຳຖືກ ແລະ ຜິດ, ການອອກສຽງ ແລະ ຕົວຢ່າງປະໂຫຍກ. Learn Lao language with a complete Lao-English dictionary.",
    url: "https://www.laoswords.com",
    siteName: "ຄຳສັບພາສາລາວ",
    locale: "lo_LA",
    type: "website",
    images: [
      {
        url: "/dictionary_logo.png",
        width: 1200,
        height: 630,
        alt: "ຄຳສັບພາສາລາວ – Lao Dictionary",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ຄຳສັບພາສາລາວ | Lao Dictionary Online",
    description:
      "ຄົ້ນຫາ ຄຳສັບພາສາລາວ, ຄຳຖືກ ແລະ ຜິດ. Best free Lao dictionary online.",
    images: ["/dictionary_logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lo">
      <head>
        {/* Google Advertisement */}
        <meta name="google-adsense-account" content="ca-pub-8119173006530412" />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L0191P70P6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L0191P70P6', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.laoswords.com/"
        />
        <link
          rel="alternate"
          hrefLang="lo"
          href="https://www.laoswords.com/"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.laoswords.com/"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Lao:wght@100..900&display=swap"
          rel="stylesheet"
        />

        <Script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ຄຳສັບພາສາລາວ",
            alternateName: ["Lao Dictionary", "laoswords.com", "ວັດຈະນານຸກົມລາວ"],
            description:
              "ວັດຈະນານຸກົມລາວ-ອັງກິດ ອອນລາຍ ຟຣີ. ຄົ້ນຫາ ຄຳສັບພາສາລາວ, ຄຳຖືກ ແລະ ຜິດ ແລະ ຕົວຢ່າງປະໂຫຍກ.",
            url: "https://www.laoswords.com",
            inLanguage: "lo",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://www.laoswords.com/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>
      </head>
      <body className={notoSerifLao.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
