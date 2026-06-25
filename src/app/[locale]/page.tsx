"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

import Navbar from "@/components/feature/Navbar";
import { Carousel } from "@/components/ui/carousel";
import { Anchor } from "@/components/ui/button";

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
      </main>
    </>
  );
}
