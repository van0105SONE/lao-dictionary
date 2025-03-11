"use client";

import { useEffect, useState } from "react";
import SearchCard from "@/components/SearchComponent";
import patuxai from "../../public/phanamxai.png";
import laoWoment from "../../public/lao-women.jpg"

import Image from "next/image";
import CharacterGrid from "@/components/CharGrid";
import PopularWordsSection from "@/components/PopularWordSection";
import MistakeCorrectionSection from "@/components/MistakeCorrectSection";
export default function Home() {
  const chars = [
    {
      character: "ກ",
      image: "/chars/chicken.png",
      word: 'ໄກ່'
    },
    {
      character: "ຂ",
      image: "/chars/eggs.jpg",
      word: 'ໄຂ່'
    },
    {
      character: "ຄ",
      image: "/chars/buffalo.jpg",
      word: 'ຄວາຍ'
    },
    {
      character: "ງ",
      image: "/chars/ox.jpg",
      word: 'ງົວ'
    },

    {
      character: "ຈ",
      image: "/chars/cup.jpg",
      word: 'ຈອກ'
    }
    ,

    {
      character: "ສ",
      image: "/chars/tiger.jpg",
      word: 'ເສືອ'
    }
    ,

    {
      character: "ຊ",
      image: "/chars/elepant.png",
      word: 'ຊ້າງ'
    }
    ,

    {
      character: "ຍ",
      image: "/chars/mosquito.jpg",
      word: 'ຍູງ'
    }
    ,

    {
      character: "ດ",
      image: "/chars/kids.jpg",
      word: 'ເດັກ'
    },
    {
      character: "ຕ",
      image: "/chars/eye.jpg",
      word: 'ຕາ'
    },
    {
      character: "ຖ",
      image: "/chars/bag.jpg",
      word: 'ຖົງ'
    },
    {
      character: "ທ",
      image: "/chars/lao-flag.jpg",
      word: 'ທົງ'
    },
    {
      character: "ນ",
      image: "/chars/bird.jpg",
      word: 'ນົກ'
    },
    {
      character: "ບ",
      image: "/chars/goaat.jpg",
      word: 'ແບ້'
    },
    {
      character: "ປ",
      image: "/chars/fish.jpg",
      word: 'ປາ'
    },
    {
      character: "ຜ",
      image: "/chars/bee.jpg",
      word: 'ເຜິ້ງ'
    },
    {
      character: "ຝ",
      image: "/chars/rain.jpg",
      word: 'ຝົນ'
    },
    {
      character: "ຟ",
      image: "/chars/fire.jpg",
      word: 'ໄຟ'
    },
    {
      character: "ຢ",
      image: "/chars/medicine.jpg",
      word: 'ຢາ'
    },
    {
      character: "ຣ",
      image: "/chars/radar.jpg",
      word: 'ຣາດາ'
    },
    {
      character: "ລ",
      image: "/chars/monkey.jpg",
      word: 'ລີງ'
    },
    {
      character: "ວ",
      image: "/chars/handfaan.jpg",
      word: 'ວີ'
    },
    {
      character: "ຫ",
      image: "/chars/goose.jpg",
      word: 'ຫ່ານ'
    },
    {
      character: "ອ",
      image: "/chars/goose.jpg",
      word: 'ໂອ'
    },
    {
      character: "ຮ",
      image: "/chars/goose.jpg",
      word: 'ເຮືອນ'
    }
  ]








  return (
    <div className="relative">
      <div
        className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      ></div>

      <main className="relative">
        <div >
          <SearchCard ></SearchCard>
        </div>
        <div className="mx-auto container flex flex-col-reverse lg:flex-row  justify-between  p-6">
          <div className="md:mr-4">
            <PopularWordsSection />
            <MistakeCorrectionSection />
            <CharacterGrid chars={chars} />
          </div>
          <div className="w-full h-full md:w-84 h-46  rounded-xl md:ml-2 mt-4">
            <h4>Advertisement</h4>
            <Image src={laoWoment} alt="lao women" className="mt-4"></Image>
          </div>
        </div>
      </main >
      <footer className="relative bg-gradient-to-r from-[#205781] to-gray-300 h-16 row-start-3 flex gap-6 flex-wrap items-center justify-center ">

      </footer>
    </div >
  );
}
