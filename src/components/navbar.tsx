import Image from "next/image";
import laos from "../../public/laos.png"; // Adjust the path to your image

export interface HeaderProps {
    isDrawerOpen: boolean,
    toggleDrawer: ()=>void
}


export default function Navbar({isDrawerOpen, toggleDrawer}:HeaderProps) {
    return (
        <nav className={`fixed min-w-screen bg-[#205781] p-4 z-50`}>
            <div className="container mx-auto flex">
                {/* Hamburger Button (Visible on Mobile) */}
                <button id="drawer-toggle" className="text-white lg:hidden" onClick={toggleDrawer}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <a href="#" className="text-white text-lg font-bold mx-6">
                    <Image src={laos} alt=""></Image>
                </a>

                {/* Navbar Menu (Visible on Desktop) */}
                <ul className="hidden lg:flex space-x-4">
                    <li>
                        <a href="#" className="text-white hover:text-gray-400">
                            ຄຳສັບ
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-gray-400">
                            ໄວຍະກອນ
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-gray-400">
                            ບົດຫັດແຕ່ງ
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

    )
}