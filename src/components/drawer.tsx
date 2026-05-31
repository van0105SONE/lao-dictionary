// components/Drawer.jsx
import Image from "next/image";
import laos from "../../public/logo.png"; // Adjust the path to your image
import Link from "next/link";
import { t } from "@/translations";
import { useLanguage } from "@/context/LanguageContext";

export interface DrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}

const Drawer = ({ isDrawerOpen, toggleDrawer, closeDrawer }: DrawerProps) => {
  const { lang, toggleLang } = useLanguage();

  return (
    <div
      id="drawer"
      className={`fixed inset-y-0 left-0 w-[60%] max-w-xs bg-[#205781] text-white transform transition-transform duration-300 ease-in-out z-50 ${
        isDrawerOpen ? "translate-x-0" : "-translate-x-full"
      } lg:transform-none lg:relative lg:w-auto lg:bg-transparent lg:translate-x-0`}
    >
      <div className="flex mx-6">
        <button className="text-white lg:hidden" onClick={toggleDrawer}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div className="mx-6 lg:hidden">
          <a href="#" className="text-lg font-bold">
            <Image src={laos} className="w-16 h-16" alt="Laos Logo" />
          </a>
        </div>
      </div>

      <ul className="mt-4 text-lg lg:hidden">
        <li>
          <Link href={`/`} className="block p-4 hover:text-gray-400 ">
            {t("nav_home", lang)}
          </Link>
        </li>
        <li>
          <Link
            href={`/correct-incorrect`}
            className="block p-4 hover:text-gray-400 "
          >
            {t("nav_correct", lang)}
          </Link>
        </li>
        <li>
          <Link
            href={`/lao-language-basics`}
            className="block p-4 hover:text-gray-400 "
          >
            {t("nav_language_basic", lang)}
          </Link>
        </li>
        <li>
          <Link href={`/aboutus`} className="block p-4 hover:text-gray-400">
            {t("nav_about", lang)}
          </Link>
        </li>
        <li>
          <Link href={`/contact`} className="block p-4 hover:text-gray-400">
            {t("nav_contact", lang)}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
