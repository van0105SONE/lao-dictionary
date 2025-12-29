// app/about/page.tsx (or components/AboutPage.tsx)

import Header from "@/components/header";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 -z-10 bg-white 
        bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
        bg-[size:24px_24px]"
        aria-hidden="true"
      />

      {/* Header - updated with accent color */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto space-y-20">
          {/* Page Title */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900">
              About {"  "}
              <span className="font-medium text-[#205781]">Lao Dictionary</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A community-driven space preserving and sharing the beauty of the
              Lao language.
            </p>
          </div>

          {/* Vision Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We created this dictionary to serve the global Lao community —
                bringing together native speakers, learners, diaspora, and
                cultural enthusiasts in one accessible place.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                In a digital world where many minority languages struggle to
                find space, we believe every Lao word deserves to be documented,
                pronounced, and passed on. This platform exists to keep our
                language alive, evolving, and connected.
              </p>
            </div>
            {/* Image Card - Full bleed, cropped nicely */}
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-100">
              <Image
                src="/lao-culture.jpg" // Make sure this file is in /public/lao-culture.jpg
                alt="Lao culture and community – traditional dance, temples, and people"
                width={800}
                height={800}
                className="object-cover w-full h-full"
                priority // Optional: load faster if above the fold
              />
            </div>
          </section>

          {/* Contributors Section */}
          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                Community Contributors
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                This dictionary grows because of passionate people who
                generously share their knowledge.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Example Contributor Cards - replace with real ones later */}

              <div
                key={1}
                className="group bg-white border border-gray-200 rounded-2xl p-8 text-center 
                  hover:border-[#205781] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 border-2 border-dashed  shadow-md mb-6">
                  <Image
                    src="/funfah.jpg" // File must be in /public/aiy-yaethor.jpg
                    alt="Contributor profile - Aiy Yaethor"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900">
                  FunFah Favflower
                </h3>
                <p className="mt-2 text-gray-600">Borum Volunteer 5Th</p>
                <p className="mt-4 text-sm text-[#205781] font-medium">
                  Vientiane, Laos
                </p>
              </div>

              <div
                key={2}
                className="group bg-white border border-gray-200 rounded-2xl p-8 text-center 
                  hover:border-[#205781] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 border-2 border-dashed  shadow-md mb-6">
                  <Image
                    src="/lao-culture.jpg" // File must be in /public/aiy-yaethor.jpg
                    alt="Contributor profile - Aiy Yaethor"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900">
                  Chonlada Ssp
                </h3>
                <p className="mt-2 text-gray-600">Borum Volunteer 6Th</p>
                <p className="mt-4 text-sm text-[#205781] font-medium">
                  Vientiane, Laos
                </p>
              </div>

              <div
                key={3}
                className="group bg-white border border-gray-200 rounded-2xl p-8 text-center 
                  hover:border-[#205781] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 border-2 border-dashed  shadow-md mb-6">
                  <Image
                    src="/aiy-yaethor.jpg" // File must be in /public/aiy-yaethor.jpg
                    alt="Contributor profile - Aiy Yaethor"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900">
                  Air Yae Thor
                </h3>
                <p className="mt-2 text-gray-600">
                  Borum Volunteer 3Th & Staff At Somewhere
                </p>
                <p className="mt-4 text-sm text-[#205781] font-medium">
                  Vientiane, Laos
                </p>
              </div>
            </div>

            <div className="text-center pt-8">
              <p className="text-lg text-gray-700">
                Want to contribute Lao words, pronunciations, or examples?
              </p>
              <a
                href="/contribute"
                className="inline-block mt-6 px-8 py-4 bg-[#205781] text-white hover:bg-[#1a4566] 
                transition-colors duration-300 font-medium rounded-lg"
              >
                Become a Contributor
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-[#205781] to-gray-300 h-16 row-start-3 flex gap-6 flex-wrap items-center justify-center "></footer>
    </div>
  );
}
