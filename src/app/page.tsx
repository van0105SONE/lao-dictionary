"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchCard from "@/components/SearchComponent";
//static assets
import laos from "../../public/laos.png";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { getData } from "./lib/actions";

export default function Home() {
  // State to manage drawer visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [words, setWord]= useState<DicionaryModel[]>([])
  // Toggle drawer and overlay
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Close drawer and overlay
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(()=>{
    fetchWord()
  }, []);
 
  const fetchWord = async () => {
    const resData = await  getData();
    console.log("resData: ", resData)
    setWord(resData)
  }

  return (
    <div className="">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
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

      {/* Drawer (Hidden by Default) */}
      <div id="drawer" className={`fixed inset-y-0 left-0 w-full bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-50 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} lg:transform-none lg:relative lg:w-auto lg:bg-transparent lg:translate-x-0`}>
        <div className="flex mx-6">
          <button className="text-white lg:hidden" onClick={toggleDrawer}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <div className="mx-6 lg:hidden">
            <a href="#" className="text-lg font-bold">
              <Image src={laos} alt=""></Image>
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

      {/* Overlay (Hidden by Default) */}
      <div id="overlay" className={`fixed inset-0  bg-opacity-50 z-40 ${isDrawerOpen ? "block" : "hidden"} lg:hidden`} onClick={closeDrawer}></div>
      {/* grid-rows-[20px_1fr_20px] note i want to know what it mean? */}
      <main className="justify-items-center h-screen ">
        <SearchCard words={words}></SearchCard>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
