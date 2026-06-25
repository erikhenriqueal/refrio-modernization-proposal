"use client";

import Image from "next/image";

import Navbar from "@/components/feature/Navbar";
import { Carousel } from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";

const BrazilWord = ({ chunks }: { chunks: React.ReactNode }) => {
  const colors = ["text-green-600", "text-blue-700", "text-amber-500"];
  const chars = chunks?.toString().split("") ?? [];
  return (
    <span>
      <span>
        {chars.map((c, i) => (
          <span key={i} className={colors[i % colors.length]}>
            {c}
          </span>
        ))}
      </span>
    </span>
  );
};

export default function HomePage() {
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
      <Navbar />
      <main className="p-2">
        {/* Hero */}
        <section className="space-y-4">
          {/* Slogan/Presentation */}
          <div>
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
          </div>
          {/* Carousel */}
          <div className="max-h-96">
            <Carousel
              slides={slides.map(
                (slide, i) =>
                  function Slide(isActive) {
                    return (
                      <div key={i} className="relative">
                        <div className="absolute w-full h-max px-8 top-0 mt-4">
                          <motion.span
                            className="block px-2 py-4 text-center text-2xl/tight text-neutral-50 bg-neutral-900/75 backdrop-blur-xs rounded-2xl"
                            initial={{ opacity: 0, y: -8 }}
                            animate={
                              isActive
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: -8 }
                            }
                            transition={{ duration: 0.35, ease: "easeOut" }}
                          >
                            {slide.text}
                          </motion.span>
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
