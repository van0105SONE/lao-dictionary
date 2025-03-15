import CharacterGrid from "@/components/CharGrid";
import { LAO_ALPHABET, COMBINE_ALPHABET, SARA } from "@/shared/constant/global-contant";
import Link from "next/link";

export default async function Page() {
    return (
        <div className="relative">
            <div
                className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            ></div>

            <div className="relative container mx-auto pt-24 min-h-screen">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Advertisement Space (20%) */}
                    <div className="md:w-1/5  px-6">
                        {/* Left Ad Content */}
                    </div>

                    {/* Main Content (60%) */}
                    <div className="lg:w-3/5  p-6">
                        <CharacterGrid chars={LAO_ALPHABET} title="ພະຍັນຊະນະ" />
                        <CharacterGrid chars={COMBINE_ALPHABET} title="ພະຍັນຊະນະປະສົມ"></CharacterGrid>
                        <CharacterGrid chars={SARA} title="ສະຫຼະ"></CharacterGrid>

                    </div>


                    {/* Right Advertisement Space (20%) */}
                    <div className="md:w-1/5">
                        {/* Right Ad Content */}
                    </div>
                </div>
            </div>
        </div>

    )
}