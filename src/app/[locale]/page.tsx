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
  const navbarRef = useRef<HTMLDivElement>(null);

  // Create CSS `--navbar-h` height after loading
  useEffect(() => {
    const el = navbarRef.current;
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
      <div className="fixed top-0 left-0 w-full z-999">
        <Navbar ref={navbarRef} />
      </div>
      <main className="p-2" style={{ marginTop: "var(--navbar-h, 0px)" }}>
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
              {t("hero-cta-01")}
            </Anchor>
            <Anchor href={"#"} variant="primary" shapes={["roundy"]}>
              {t("hero-cta-02")}
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
        <section id="about">
          <h1 className="py-8 text-center text-4xl font-bold text-primary-800">
            {t("sections.about.title")}
          </h1>
          <MultiSide className="gap-x-12 gap-y-8 *:max-w-sm">
            {/* Item 1 - Left */}
            <DescriptionItem
              icon={BsBoxSeam}
              text={t("sections.about.description-01")}
            />
            {/* Item 2 - Right */}
            <DescriptionItem
              icon={BsCpu}
              text={t("sections.about.description-02")}
            />
            {/* Item 3 - Left */}
            <DescriptionItem
              icon={BsDice5}
              text={t("sections.about.description-03")}
            />
            {/* Item 4 - Right */}
            <DescriptionItem
              icon={BsAward}
              text={t("sections.about.description-04")}
            />
          </MultiSide>
        </section>
        {/* Solutions */}
        <section id="solutions">
          {/* Storage & Picking */}
          <div id="s&p">
            <h1 className="py-8 text-center text-4xl font-bold text-primary-800">
              {t("sections.s&p.title")}
            </h1>
            <div className="w-full px-4 flex flex-row flex-wrap justify-center gap-6 *:min-w-xs *:max-w-lg">
              <SolutionCard
                icon={BsCompass}
                title={t("sections.s&p.cards.0.title")}
                description={t("sections.s&p.cards.0.description")}
                highlight={t("sections.s&p.cards.0.highlight")}
              />
              <SolutionCard
                icon={BsClockHistory}
                title={t("sections.s&p.cards.1.title")}
                description={t("sections.s&p.cards.1.description")}
                highlight={t("sections.s&p.cards.1.highlight")}
              />
              <SolutionCard
                icon={SlCalculator}
                title={t("sections.s&p.cards.2.title")}
                description={t("sections.s&p.cards.2.description")}
                highlight={t("sections.s&p.cards.2.highlight")}
              />
              <SolutionCard
                icon={LiaPalletSolid}
                title={t("sections.s&p.cards.3.title")}
                description={t("sections.s&p.cards.3.description")}
                highlight={t("sections.s&p.cards.3.highlight")}
              />
              <SolutionCard
                icon={BsGlobeAmericas}
                title={t("sections.s&p.cards.4.title")}
                description={t("sections.s&p.cards.4.description")}
                highlight={t("sections.s&p.cards.4.highlight")}
              />
              <SolutionCard
                icon={BiBarChartAlt}
                title={t("sections.s&p.cards.5.title")}
                description={t("sections.s&p.cards.5.description")}
                highlight={t("sections.s&p.cards.5.highlight")}
              />
              <SolutionCard
                icon={BsThermometerSnow}
                title={t("sections.s&p.cards.6.title")}
                description={t("sections.s&p.cards.6.description")}
                highlight={t("sections.s&p.cards.6.highlight")}
              />
              <SolutionCard
                icon={BsClipboard2Data}
                title={t("sections.s&p.cards.7.title")}
                description={t("sections.s&p.cards.7.description")}
                highlight={t("sections.s&p.cards.7.highlight")}
              />
              <SolutionCard
                icon={BsStar}
                title={t("sections.s&p.cards.8.title")}
                description={t("sections.s&p.cards.8.description")}
                highlight={t("sections.s&p.cards.8.highlight")}
              />
              <SolutionCard
                icon={BsTelephone}
                title={t("sections.s&p.cards.9.title")}
                description={t("sections.s&p.cards.9.description")}
                highlight={t("sections.s&p.cards.9.highlight")}
              />
            </div>
          </div>
          {/* Consulting */}
          <div id="consulting"></div>
          {/* Differentials */}
          <div id="differentials"></div>
        </section>
      </main>
    </>
  );
}
