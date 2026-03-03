import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ | ຄຳສັບພາສາລາວ",
  description:
    "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວຂອງເວັບໄຊ ຄຳສັບພາສາລາວ (laoswords.com). ຂໍ້ມູນການເກັບຂໍ້ມູນ, ຄຸກກີ ແລະ ການໃຊ້ Google Analytics.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ | ຄຳສັບພາສາລາວ",
    description:
      "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວຂອງເວັບໄຊ ຄຳສັບພາສາລາວ (laoswords.com).",
    url: "https://www.laoswords.com/privacy-policy",
    siteName: "ຄຳສັບພາສາລາວ",
    locale: "lo_LA",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Grid background */}
      <div
        className="fixed inset-0 -z-10 bg-white
        bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
        bg-[size:24px_24px]"
        aria-hidden="true"
      />

      <Header />

      <main className="flex-1 px-6 py-24 md:py-32">
        <article className="max-w-3xl mx-auto prose prose-gray prose-lg">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ
          </h1>
          <p className="text-gray-500 text-sm mb-12">
            ອັບເດດລ່າສຸດ: ມັງກອນ 2025 | Last updated: January 2025
          </p>

          {/* Intro */}
          <section className="mb-10">
            <p className="text-gray-700 leading-relaxed">
              ເວັບໄຊ <strong>ຄຳສັບພາສາລາວ</strong> (laoswords.com) ໃຫ້ຄວາມສຳຄັນ
              ກັບຄວາມເປັນສ່ວນຕົວຂອງຜູ້ໃຊ້ທຸກທ່ານ. ນະໂຍບາຍນີ້ອະທິບາຍວ່າ
              ພວກເຮົາເກັບ, ນຳໃຊ້ ແລະ ປົກປ້ອງຂໍ້ມູນຂອງທ່ານແນວໃດ.
            </p>
          </section>

          {/* Data collection */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. ຂໍ້ມູນທີ່ພວກເຮົາເກັບ
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              ພວກເຮົາບໍ່ໄດ້ຂໍໃຫ້ທ່ານລົງທະບຽນ ຫຼື ສ້າງບັນຊີ.
              ຂໍ້ມູນທີ່ພວກເຮົາເກັບແມ່ນຂໍ້ມູນການນຳໃຊ້ທົ່ວໄປ ເຊັ່ນ:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>ໜ້າເວັບທີ່ທ່ານເຂົ້າຊົມ ແລະ ເວລາທີ່ໃຊ້ໃນແຕ່ລະໜ້າ</li>
              <li>ປະເພດຂອງອຸປະກອນ ແລະ ເບຣົາເຊີທີ່ນຳໃຊ້</li>
              <li>ປະເທດ ຫຼື ພາກພື້ນ (ແຕ່ບໍ່ແມ່ນທີ່ຢູ່ສະເພາະ)</li>
              <li>ຄຳທີ່ຄົ້ນຫາໃນເວັບໄຊ</li>
            </ul>
          </section>

          {/* Cookies & Analytics */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. ຄຸກກີ ແລະ Google Analytics
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              ພວກເຮົາໃຊ້ <strong>Google Analytics</strong> ເພື່ອເຂົ້າໃຈວ່າ
              ຜູ້ເຂົ້າຊົມນຳໃຊ້ເວັບໄຊແນວໃດ. Google Analytics ໃຊ້ cookies
              ເພື່ອບັນທຶກຂໍ້ມູນການຢ້ຽມຊົມ ໂດຍບໍ່ລະບຸຕົວຕົນຂອງທ່ານ.
            </p>
            <p className="text-gray-700 leading-relaxed">
              ທ່ານສາມາດປິດ cookies ໄດ້ໃນການຕັ້ງຄ່າເບຣົາເຊີຂອງທ່ານ.
              ສຳລັບຂໍ້ມູນເພີ່ມເຕີມ ກະລຸນາເຂົ້າເບິ່ງ{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#205781] underline"
              >
                ນະໂຍບາຍ Google
              </a>
              .
            </p>
          </section>

          {/* Google AdSense */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. ການໂຄສະນາ (Google AdSense)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              ເວັບໄຊນີ້ອາດຈະສະແດງໂຄສະນາຈາກ Google AdSense.
              Google ອາດໃຊ້ cookies ເພື່ອສະແດງໂຄສະນາທີ່ກ່ຽວຂ້ອງ
              ໂດຍອີງໃສ່ການຢ້ຽມຊົມເວັບໄຊອື່ນໆ ຂອງທ່ານ.
            </p>
            <p className="text-gray-700 leading-relaxed">
              ທ່ານສາມາດເລືອກບໍ່ຮັບໂຄສະນາສ່ວນບຸກຄົນໄດ້ທີ່{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#205781] underline"
              >
                ການຕັ້ງຄ່າໂຄສະນາ Google
              </a>
              .
            </p>
          </section>

          {/* Third-party links */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. ລິ້ງໄປຫາເວັບໄຊອື່ນ
            </h2>
            <p className="text-gray-700 leading-relaxed">
              ເວັບໄຊນີ້ອາດມີລິ້ງໄປຫາເວັບໄຊອື່ນ.
              ພວກເຮົາບໍ່ຮັບຜິດຊອບຕໍ່ເນື້ອຫາ ຫຼື ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ
              ຂອງເວັບໄຊເຫຼົ່ານັ້ນ.
            </p>
          </section>

          {/* Updates */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. ການປ່ຽນແປງນະໂຍບາຍ
            </h2>
            <p className="text-gray-700 leading-relaxed">
              ພວກເຮົາອາດປ່ຽນແປງນະໂຍບາຍນີ້ໄດ້ໂດຍບໍ່ຕ້ອງແຈ້ງລ່ວງໜ້າ.
              ການປ່ຽນແປງທັງໝົດຈະຖືກເຜີຍແຜ່ໃນໜ້ານີ້.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. ຕິດຕໍ່ພວກເຮົາ
            </h2>
            <p className="text-gray-700 leading-relaxed">
              ຫາກທ່ານມີຄຳຖາມກ່ຽວກັບນະໂຍບາຍນີ້
              ກະລຸນາຕິດຕໍ່ຫາພວກເຮົາຜ່ານ{" "}
              <a
                href="/contact"
                className="text-[#205781] underline"
              >
                ໜ້າຕິດຕໍ່
              </a>
              .
            </p>
          </section>

          {/* English summary */}
          <section className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Privacy Policy (English Summary)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>laoswords.com</strong> is a free Lao-English dictionary
              website. We do not require user registration. We collect anonymous
              browsing data through Google Analytics to improve the site.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may display advertisements through Google AdSense. Google may
              use cookies to serve personalized ads based on your browsing
              history. You can opt out at{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#205781] underline"
              >
                Google Ad Settings
              </a>
              .
            </p>
            <p className="text-gray-700 leading-relaxed">
              We do not sell or share personal information with third parties.
              For questions, please visit our{" "}
              <a href="/contact" className="text-[#205781] underline">
                Contact page
              </a>
              .
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
