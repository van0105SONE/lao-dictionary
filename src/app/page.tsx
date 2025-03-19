"use client";

import { useEffect, useState } from "react";
import SearchCard from "@/components/SearchComponent";
import patuxai from "../../public/phanamxai.png";
import laoWoment from "../../public/lao-women.jpg"

import Image from "next/image";
import CharacterGrid from "@/components/CharGrid";
import PopularWordsSection from "@/components/PopularWordSection";
import MistakeCorrectionSection from "@/components/MistakeCorrectSection";
import { LAO_ALPHABET } from "@/shared/constant/global-contant";
import { useUser } from "@stackframe/stack";

export default function Home() {
  
  const currentUser = useUser();
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
            <CharacterGrid chars={LAO_ALPHABET} title="ຕົວອັກສອນພາສາລາວ" background_color="bg-white" text_color="bg-gradient-to-r from-[#4F959D] to-[#205781]"/>
          </div>
          <div className="w-full h-full md:w-84 h-46  rounded-xl md:ml-2 mt-4">
            <h4>Advertisement</h4>
            <Image src={laoWoment} alt="lao women" className="mt-4"></Image>
          </div>
        </div>
      </main >

    </div >
  );
}
