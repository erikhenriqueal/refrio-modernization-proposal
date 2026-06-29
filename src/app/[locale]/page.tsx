"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  BsAward,
  BsBoxSeam,
  BsClipboard2Data,
  BsClockHistory,
  BsCompass,
  BsCpu,
  BsDice5,
  BsGlobeAmericas,
  BsStar,
  BsTelephone,
  BsThermometerSnow,
} from "react-icons/bs";
import { SlCalculator } from "react-icons/sl";
import { LiaPalletSolid } from "react-icons/lia";
import { BiBarChartAlt } from "react-icons/bi";
import { IconType } from "react-icons";

import { Carousel } from "@/components/ui/carousel";
import { Anchor } from "@/components/ui/button";
import { MultiSide } from "@/components/ui/multiside";

import Navbar from "@/components/feature/Navbar";
import SolutionCard from "@/components/feature/SolutionCard";

/** Colorize `chunks` using the pattern `green`, `blue`, `yellow`... */
const BrazilWord = ({ chunks }: { chunks: React.ReactNode }) => {
  const colors = ["text-green-600", "text-blue-700", "text-amber-500"];
  const chars = chunks?.toString().split("") ?? [];
  return (
    <span>
      {chars.map((c, i) => (
        <span key={i} className={colors[i % colors.length]}>
          {c}
        </span>
      ))}
    </span>
  );
};

const DescriptionItem = ({ icon, text }: { icon: IconType; text: string }) => (
  <>
    <div className="w-max px-4">
      {icon({ size: "6rem", className: "fill-primary-600" })}
    </div>
    <p className="w-full text-lg/tight hyphens-auto">{text}</p>
  </>
);

export default function HomePage() {
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Create CSS `--navbar-h` height after loading
  useEffect(() => {
    const el = navContainerRef.current;
    if (!el) return;

    const update = () =>
      document.documentElement.style.setProperty(
        "--navbar-h",
        `${el.offsetHeight}px`,
      );
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const t = useTranslations("HomePage");

  const slides = [
    {
      id: 1,
      imgUrl: "/slider-home-1.jpg",
      text: t("slider-home-01"),
    },
    {
      id: 2,
      imgUrl: "/slider-home-2.jpg",
      text: t("slider-home-02"),
    },
    {
      id: 3,
      imgUrl: "/slider-home-3.jpg",
      text: t("slider-home-03"),
    },
  ];

  return (
    <>
      <div ref={navContainerRef}>
        <Navbar />
      </div>
      <main className="p-2">
        {/* Hero */}
        <section className="h-[calc(100dvh-var(--navbar-h,0px))] flex flex-col py-4 gap-4">
          {/* Slogan/Presentation */}
          <div className="text-center space-y-4 px-2">
            <h1 className="text-3xl font-bold">
              {t.rich("slogan-title", {
                brazil: (chunks) => <BrazilWord chunks={chunks} />,
                highlight: (chunks) => (
                  <span className="text-primary-600">{chunks}</span>
                ),
              })}
            </h1>
            <h2 className="text-xl font-semibold">{t("slogan-subtitle")}</h2>
          </div>
          {/* CTA */}
          <div className="px-2 flex flex-wrap gap-x-8 gap-y-2 justify-center text-center">
            <Anchor href={"#"} variant="primary" shapes={["roundy"]}>
              Conheça nossa atuação
            </Anchor>
            <Anchor href={"#"} variant="primary" shapes={["roundy"]}>
              Entre em contato
            </Anchor>
          </div>
          {/* Carousel */}
          <div className="flex-1 min-h-0 h-full">
            <Carousel
              slides={slides.map(
                (slide, i) =>
                  function Slide(isActive) {
                    return (
                      <div key={i} className="relative h-full">
                        <div className="absolute w-full h-max px-8 top-0 mt-4 z-10">
                          <motion.span
                            className="block px-2 py-4 text-center text-2xl/tight text-neutral-50 bg-neutral-900/50 backdrop-blur-xs rounded-2xl"
                            initial={{ opacity: 0, y: -8 }}
                            animate={
                              isActive
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: -8 }
                            }
                            transition={{ duration: 1, ease: "easeOut" }}
                          >
                            {slide.text}
                          </motion.span>
                        </div>
                        <Image
                          src={slide.imgUrl}
                          alt={slide.imgUrl.slice(1)}
                          className="h-full rounded-4xl object-cover aspect-1920/1275"
                          sizes="85vw"
                          fill
                          loading="eager"
                          draggable="false"
                        />
                      </div>
                    );
                  },
              )}
            />
          </div>
        </section>
        {/* Description */}
        <section id="brand">
          <h1 className="py-8 text-center text-4xl font-bold text-primary-800">
            Quem somos?
          </h1>
          <MultiSide className="gap-x-12 gap-y-8 *:max-w-sm">
            {/* Item 1 - Left */}
            <DescriptionItem
              icon={BsBoxSeam}
              text="A Refrio é o parceiro ideal para apoiar a sua logística de armazenagem, picking e distribuição de diversos tipos de produtos."
            />
            {/* Item 2 - Right */}
            <DescriptionItem
              icon={BsCpu}
              text="Com tecnologia de ponta, contamos com equipamentos para movimentar e manter alimentos dentro dos mais rígidos padrões de qualidade e em qualquer temperatura."
            />
            {/* Item 3 - Left */}
            <DescriptionItem
              icon={BsDice5}
              text="Nossos sistemas de informação modernos e eficientes possibilitam o gerenciamento dos produtos armazenados."
            />
            {/* Item 4 - Right */}
            <DescriptionItem
              icon={BsAward}
              text="Com 40 anos de atuação no mercado, somos uma empresa completa, ágil e moderna, com atuação em todo o país."
            />
          </MultiSide>
        </section>
        {/* Solutions */}
        <section id="solutions">
          <h1 className="py-8 text-center text-4xl font-bold text-primary-800">
            Armazenagem e Picking
          </h1>
          <div className="w-full px-4 flex flex-row flex-wrap justify-center gap-6 *:min-w-xs *:max-w-lg">
            <SolutionCard
              icon={BsCompass}
              title="Rastreamento"
              description="Processos e sistemas, como o WMS, permitem acompanhar em tempo real o estoque, inclusive o rastreamento ponta a ponta."
              highlight="Tecnologia para ganhar eficiência."
            />
            <SolutionCard
              icon={BiBarChartAlt}
              title="Gestão de Estoque"
              description="Todo o estoque é controlado por meio de sistemas integrados de informação e softwares customizados."
              highlight="Controle eficiente e preciso para os nossos clientes."
            />
            <SolutionCard
              icon={BsClockHistory}
              title="Processos Ágeis"
              description="Oferta de soluções eficientes e precisas no segmento logístico de armazenagem e distribuição."
              highlight="Busca pela excelência nos negócios."
            />
            <SolutionCard
              icon={BsThermometerSnow}
              title="Congelamento"
              description="Inclui túneis estruturados para movimentar simultaneamente até 200 toneladas de produtos em temperatura negativa."
              highlight="Alta capacidade de congelamento."
            />
            <SolutionCard
              icon={SlCalculator}
              title="Estufagem"
              description="Atividades de cálculo de pontos de equilíbrio de carga, balanceamento e distribuição de pesos e preenchimento de containers e baús."
              highlight="Carregamento com segurança."
            />
            <SolutionCard
              icon={BsClipboard2Data}
              title="Unitização"
              description="Organização de diversos tipos de cargas de tamanhos e pesos diferentes para aproveitar melhor o espaço."
              highlight="Mais agilidade e aumento de eficiência."
            />
            <SolutionCard
              icon={LiaPalletSolid}
              title="Paletização"
              description="Ordenação das mercadorias unitizadas em pallets para facilitar a armazenagem e o transporte."
              highlight="Melhor organização e agilidade na distribuição."
            />
            <SolutionCard
              icon={BsStar}
              title="Kits Promocionais"
              description="Manuseio de embalagens, serviço de reembalagem e montagem de kits de produtos, incluindo em temperatura controlada."
              highlight="Serviços diferenciados para sua empresa."
            />
            <SolutionCard
              icon={BsGlobeAmericas}
              title="Distribuição"
              description="Malha de distribuição com capacidade para atender todo o Brasil, com frota preparada para transportar todos os tipos de carga."
              highlight="Distribuição para o crescimento do seu negócio."
            />
            <SolutionCard
              icon={BsTelephone}
              title="Atendimento"
              description="Apresentação de soluções rápidas e adequadas aos questionamentos dos clientes."
              highlight="Agilidade e atendimento eficiente para nossos clientes."
            />
          </div>
        </section>
      </main>
    </>
  );
}
