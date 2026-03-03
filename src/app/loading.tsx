import Image from "next/image";
import style from "../components/search.module.css"
import reading from '../../public/logo.png'
export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col justify-center items-center h-screen gap-6">
        <div className={`${style.animate_float_delay}`}>
          <Image width={200} height={200} src={reading} alt="ຄຳສັບພາສາລາວ – Loading" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl text-[#205781] font-semibold">
            ກຳລັງໂຫຼດ ວັດຈະນານຸກົມ...
          </p>
          <p className="text-sm text-gray-400">
            Loading Lao Dictionary
          </p>
        </div>
      </div>
    </div>
  );
}
