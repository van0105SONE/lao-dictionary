import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-[#205781] to-[#4F959D] py-16 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">
              ຄຳສັບພາສາລາວ
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              ວັດຈະນານຸກົມລາວ-ອັງກິດ ອອນລາຍ ຟຣີ.
              ແຫຼ່ງຮຽນພາສາລາວທີ່ເຊື່ອຖືໄດ້ ລວບລວມຄຳສັບ,
              ການອອກສຽງ, ຄຳຖືກ ແລະ ຜິດ ແລະ ຕົວຢ່າງປະໂຫຍກ.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">
              ລິ້ງທີ່ເປັນປະໂຫຍດ
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link
                    href="/"
                    className="hover:text-white transition-colors duration-200"
                  >
                    ໜ້າຫຼັກ (Home)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/correct-incorrect"
                    className="hover:text-white transition-colors duration-200"
                  >
                    ຄຳຖືກ ແລະ ຜິດ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aboutus"
                    className="hover:text-white transition-colors duration-200"
                  >
                    ກ່ຽວກັບພວກເຮົາ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-white transition-colors duration-200"
                  >
                    ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors duration-200"
                  >
                    ຕິດຕໍ່ພວກເຮົາ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">
              ຂໍ້ມູນເພີ່ມເຕີມ
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              ເວັບໄຊນີ້ສ້າງຂຶ້ນເພື່ອອະນຸລັກ ແລະ ເຜີຍແຜ່ພາສາລາວ
              ໃຫ້ແກ່ຊຸມຊົນລາວໃນທົ່ວໂລກ.
              ຫາກທ່ານມີຄຳແນະນຳ ຫຼື ຕ້ອງການປະກອບສ່ວນ
              ກະລຸນາຕິດຕໍ່ຫາພວກເຮົາ.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} ຄຳສັບພາສາລາວ (laoswords.com) • Made
            with ❤️ for the Lao community
          </p>
        </div>
      </div>
    </footer>
  );
}
