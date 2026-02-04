// app/about/page.tsx (or components/AboutPage.tsx)

import Header from "@/components/header";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 -z-10 bg-white 
        bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
        bg-[size:24px_24px]"
        aria-hidden="true"
      />

      {/* Header - updated with accent color */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto space-y-20">
          {/* Page Title */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900">
              ກຽວກັບພວກເຮົາ {"  "}
              <span className="font-medium text-[#205781]">ຄຳສັບພາສາລາວ</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ພື້ນທີ່ແຫ່ງການຮ່ວມມືຂອງຊຸມຊົນ ເພື່ອການອະນຸລັກ ແລະ
              ເຜີຍແຜ່ຄວາມງົດງາມຂອງພາສາລາວ.
            </p>
          </div>

          {/* Vision Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                ວິໄສທັດຂອງພວກເຮົາ
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                ພວກເຮົາສ້າງ ວັດຈະນານຸກົມພາສາລາວ
                ນີ້ຂຶ້ນມາເພື່ອຮັບໃຊ້ຊຸມຊົນລາວໃນທົ່ວໂລກ —
                ໂດຍການເປັນສູນລວມໃຫ້ແກ່ເຈົ້າຂອງພາສາ, ຜູ້ທີ່ກຳລັງ ຮຽນພາສາລາວ,
                ຊາວລາວທີ່ຢູ່ຕ່າງປະເທດ, ແລະ ຜູ້ທີ່ສົນໃຈໃນວັດທະນະທຳລາວ
                ໄດ້ເຂົ້າມານຳໃຊ້ໃນບ່ອນດຽວທີ່ເຂົ້າເຖິງໄດ້ງ່າຍ.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                ໃນຍຸກທີ່ ປັນຍາປະດິດ (AI) ເຂົ້າມາມີບົດບາດຫຼາຍຂຶ້ນ, ການຊອກຫາ
                ຂໍ້ມູນພາສາລາວທີ່ຖືກຕ້ອງ ແລະ ເຊື່ອຖືໄດ້ນັ້ນກາຍເປັນເລື່ອງຍາກ.
                ຫຼາຍຄັ້ງທີ່ AI ອາດຈະໃຫ້ຂໍ້ມູນທີ່ຜິດພາດ ຫຼື ບໍ່ຄົບຖ້ວນ.
                ພວກເຮົາຈຶ່ງເຊື່ອວ່າທຸກໆ ຄຳສັບລາວ ສົມຄວນໄດ້ຮັບການບັນທຶກ,
                ການກວດສອບຄວາມຖືກຕ້ອງ, ແລະ ການສືບທອດຕໍ່ໆກັນໄປ.
                ແພລດຟອມນີ້ສ້າງຂຶ້ນເພື່ອເປັນແຫຼ່ງອ້າງອີງທີ່ໜ້າເຊື່ອຖື
                ເພື່ອເຮັດໃຫ້ພາສາຂອງພວກເຮົາຄົງຢູ່, ມີການພັດທະນາ, ແລະ
                ເຊື່ອມໂຍງກັບທຸກຄົນຢ່າງຖືກຕ້ອງ.
              </p>
            </div>
            {/* Image Card - Full bleed, cropped nicely */}
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-100">
              <Image
                src="/lao-culture.jpg" // Make sure this file is in /public/lao-culture.jpg
                alt="Lao culture and community – traditional dance, temples, and people"
                width={800}
                height={800}
                className="object-cover w-full h-full"
                priority // Optional: load faster if above the fold
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-[#205781] to-gray-300 h-16 row-start-3 flex gap-6 flex-wrap items-center justify-center "></footer>
    </div>
  );
}
