// components/Drawer.jsx
import Image from "next/image";
import laos from "../../public/laos.png"; // Adjust the path to your image

export interface DrawerProps {
    isDrawerOpen: boolean,
    toggleDrawer: ()=>void,
    closeDrawer: ()=>void
}


const Drawer = ({ isDrawerOpen, toggleDrawer, closeDrawer }:DrawerProps) => {
    return (
        <div
            id="drawer"
            className={`fixed inset-y-0 left-0 w-full bg-[#205781] text-white transform transition-transform duration-300 ease-in-out z-50 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
                } lg:transform-none lg:relative lg:w-auto lg:bg-transparent lg:translate-x-0`}
        >
            <div className="flex mx-6">
                <button className="text-white lg:hidden" onClick={toggleDrawer}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <div className="mx-6 lg:hidden">
                    <a href="#" className="text-lg font-bold">
                        <Image src={laos} alt="Laos Logo" />
                    </a>
                </div>
            </div>

            <ul className="mt-4 lg:hidden">
                <li>
                    <a href="#" className="block p-4 hover:bg-gray-700" onClick={closeDrawer}>
                        ຄຳສັບ
                    </a>
                </li>
                <li>
                    <a href="#" className="block p-4 hover:bg-gray-700" onClick={closeDrawer}>
                        ໄວຍະກອນ
                    </a>
                </li>
                <li>
                    <a href="#" className="block p-4 hover:bg-gray-700" onClick={closeDrawer}>
                        ບົດຫັດແຕ່ງ
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Drawer;