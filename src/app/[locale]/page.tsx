"use client";

import Image from "next/image";

import Navbar from "@/components/feature/Navbar";
import { Carousel } from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    imgUrl: "/slider-home-1.jpg",
    text: "Infra-estrutura para armazenar variados tipos de produtos, em qualquer temperatura",
  },
  {
    id: 2,
    imgUrl: "/slider-home-2.jpg",
    text: "Linha 100% mecanizada que garante agilidade e segurança na movimentação de carga",
  },
  {
    id: 3,
    imgUrl: "/slider-home-3.jpg",
    text: "Mais de 800 mil m³ de instalações amplas e reversíveis",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="p-2">
        {/* Hero */}
        <section className="space-y-4">
          {/* Slogan/Presentation */}
          <div>
            <div className="text-center space-y-4 px-2">
              <h1 className="text-3xl font-bold">
                Refrigerando o{" "}
                <span>
                  <span className="text-green-600">B</span>
                  <span className="text-blue-700">r</span>
                  <span className="text-amber-500">a</span>
                  <span className="text-green-600">s</span>
                  <span className="text-blue-700">i</span>
                  <span className="text-amber-500">l</span>
                </span>{" "}
                com <span className="text-primary-600">excelência</span> e{" "}
                <span className="text-primary-600">inovação</span>.
              </h1>
              <h2 className="text-xl font-semibold">
                Há décadas oferecendo soluções inteligentes para a cadeia de
                refrigeração nacional.
              </h2>
            </div>
          </div>
          {/* Carousel */}
          <div className="max-h-96">
            <Carousel
              slides={slides.map((slide, i) => (
                <div key={i} className="relative">
                  <div className="absolute w-full h-max px-8 top-0 mt-4">
                    <span className="block px-2 py-4 text-center text-2xl/tight text-neutral-50 bg-neutral-900/75 backdrop-blur-xs rounded-2xl">
                      {slide.text}
                    </span>
                  </div>
                  <Image
                    className="rounded-4xl"
                    src={slide.imgUrl}
                    alt={slide.imgUrl.slice(1)}
                    width={1920}
                    height={1275}
                    loading="eager"
                    draggable="false"
                  />
                </div>
              ))}
            />
          </div>
        </section>
      </main>
    </>
  );
}
