import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import { Suspense } from "react";
import Loading from "./loading";

const myFont = localFont({
  src: "../../public/NotoSansLao_Condensed-Black.ttf"
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">


      <body
        className={myFont.className}
      >
        {children}
      </body>
    </html>
  );
}
