"use client";

import Header from "@/components/header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";

export default function ContactClient() {
  const { lang } = useLanguage();

  const contactCards = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "WhatsApp",
      description: t("contact_card_wp_desc", lang),
      detail: "+856 20 78357280",
      href: "https://wa.me/8562078357280",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: t("contact_card_web_title", lang),
      description: t("contact_card_web_desc", lang),
      detail: "www.laoswords.com",
      href: "https://www.laoswords.com",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t("contact_card_loc_title", lang),
      description: t("contact_card_loc_desc", lang),
      detail: "ສປປ ລາວ 🇱🇦",
      href: null,
    },
  ];

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
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Title */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900">
              {t("contact_title", lang)}{" "}
              <span className="font-medium text-[#205781]">{t("contact_title2", lang)}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("contact_subtitle", lang)}
            </p>
          </div>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactCards.map((card) => {
              const content = (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 text-center space-y-4 h-full">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#205781]/10 flex items-center justify-center text-[#205781]">
                    {card.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{card.title}</h2>
                  <p className="text-sm text-gray-500">{card.description}</p>
                  <p className="text-[#205781] font-medium">{card.detail}</p>
                </div>
              );
              return card.href ? (
                <a key={card.title} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  {content}
                </a>
              ) : (
                <div key={card.title}>{content}</div>
              );
            })}
          </div>

          {/* How to help */}
          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t("contact_how_title", lang)}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { bg: "bg-green-50", color: "text-green-600", icon: "✓", title: "contact_item_error_title", desc: "contact_item_error_desc" },
                { bg: "bg-blue-50",  color: "text-blue-600",  icon: "+", title: "contact_item_add_title",   desc: "contact_item_add_desc" },
                { bg: "bg-purple-50",color: "text-purple-600",icon: "💡",title: "contact_item_sugg_title",  desc: "contact_item_sugg_desc" },
                { bg: "bg-orange-50",color: "text-orange-600",icon: "🤝",title: "contact_item_collab_title",desc: "contact_item_collab_desc" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <span className={`${item.color} text-lg`}>{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t(item.title as Parameters<typeof t>[0], lang)}</h3>
                    <p className="text-sm text-gray-500">{t(item.desc as Parameters<typeof t>[0], lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
