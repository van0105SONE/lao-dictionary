import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const myFont = localFont({
  src: "../../public/NotoSansLao_Condensed-Black.ttf",
});

export const metadata: Metadata = {
  title: {
    default:
      "Lao Dictionary | ຄຳສັບພາສາລາວ - English-Lao Online Dictionary & Pronunciation",
    template: "%s | Lao Dictionary ຄຳສັບພາສາລາວ",
  },
  description:
    "Free online Lao-English dictionary with audio pronunciation, example sentences, and community contributions. Best resource to learn Lao language (ຮຽນພາສາລາວ) with thousands of words.",
  keywords: [
    "lao dictionary",
    "free dictionary",
    "english lao dictionary",
    "lao english dictionary",
    "learn lao",
    "learn lao language",
    "ຄຳສັບພາສາລາວ",
    "ຮຽນພາສາລາວ",
    "ພາສາລາວ",
    "ປະເທດລາວ",
    "lao pronunciation",
    "lao words",
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
    title: "ຄຳສັບພາສາລາວ | ຮຽນພາສາລາວ | Learn Lao Language | lao dictionary",
    description:
      "Learn Lao language with a complete Lao dictionary, vocabulary, pronunciation, and examples.",
    url: "https://www.laoswords.com",
    siteName: "ຄຳສັບພາສາລາວ",
    locale: "lo_LA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ຄຳສັບພາສາລາວ",
    description: "Best website to learn Lao language and Lao vocabulary",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
    <html lang="en">
      <head>
        {/* Google Advertisement */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8119173006530412"
          crossorigin="anonymous"
        ></Script>

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
          href="https://www.laoswords.com/en"
        />
        <link
          rel="alternate"
          hrefLang="lo"
          href="https://www.laoswords.com/lo"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.laoswords.com/"
        />

        <Script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Lao Dictionary",
            alternateName: "ຄຳສັບພາສາລາວ",
            url: "https://www.laoswords.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.laoswords.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>
      </head>
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
