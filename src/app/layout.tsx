import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const myFont = localFont({
  src: "../../public/NotoSansLao_Condensed-Black.ttf",
});

export const metadata: Metadata = {
  title: {
    default: "ຄຳສັບພາສາລາວ | Lao Dictionary & Learn Lao Language",
    template: "%s | ຄຳສັບພາສາລາວ",
  },
  description:
    "ຮຽນພາສາລາວອອນລາຍ | Learn Lao language with Lao dictionary, Lao words, pronunciation, examples, and daily vocabulary. Best resource to learn Laos language.",

  keywords: [
    "ຄຳສັບພາສາລາວ",
    "ຮຽນພາສາລາວ",
    "learn lao",
    "learn laos",
    "lao dictionary",
    "lao words",
    "laos language",
    "ພາສາລາວ",
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
    title: "ຄຳສັບພາສາລາວ | Learn Lao Language",
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
      </head>
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
