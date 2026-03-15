"use client";

import Header from "@/components/header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";

export default function AboutClient() {
  const { lang } = useLanguage();
  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className="fixed inset-0 -z-10 bg-white
        bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
        bg-[size:24px_24px]"
        aria-hidden="true"
      />
      <Header />
      <main className="flex-1 px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto space-y-20">
          {/* Title */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900">
              {t("about_title", lang)}{" "}
              <span className="font-medium text-[#205781]">ຄຳສັບພາສາລາວ</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("about_subtitle", lang)}
            </p>
          </div>

          {/* Vision */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                {t("about_vision_title", lang)}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">{t("about_vision_p1", lang)}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{t("about_vision_p2", lang)}</p>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-100">
              <Image
                src="/lao-culture.jpg"
                alt="Lao culture and community"
                width={800}
                height={800}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
