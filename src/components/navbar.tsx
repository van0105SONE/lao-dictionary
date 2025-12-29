import Image from "next/image";
import laos from "../../public/laos.png"; // Adjust the path to your image
import Link from "next/link";

export interface HeaderProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

export default function Navbar({ isDrawerOpen, toggleDrawer }: HeaderProps) {
  return (
    <nav className={`fixed min-w-screen  bg-[#205781] p-4  z-50`}>
      <div className="container mx-auto  flex justify-between">
        <div className="flex">
          {/* Hamburger Button (Visible on Mobile) */}
          <button
            id="drawer-toggle"
            className="text-white lg:hidden"
            onClick={toggleDrawer}
          >
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

          <a href="#" className="text-white text-lg font-bold mx-6">
            <Image src={laos} alt=""></Image>
          </a>

          {/* Navbar Menu (Visible on Desktop) */}
          <ul className="hidden lg:flex space-x-4 text-lg">
            <li>
              <Link href={`/`} className="text-white hover:text-gray-400">
                ວັດຈະນານຸກົມ
              </Link>
            </li>
            <li>
              <Link href={`/aboutus`} className="text-white hover:text-gray-400">
                ກຽວກັບພວກເຮົາ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
