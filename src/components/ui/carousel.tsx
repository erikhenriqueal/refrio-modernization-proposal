import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const AUTOPLAY_DELAY = 3000;

export function Carousel({
  slides,
}: {
  slides: ((isActive: boolean) => React.ReactNode)[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      active: true,
      delay: AUTOPLAY_DELAY,
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnLastSnap: false,
    }),
  ]);

  const onDotButtonClick = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const [selectedIndex, setSelectedIndex] = useState(
    emblaApi?.selectedScrollSnap() ?? 0,
  );

  const onSelect = useCallback(
    () => setSelectedIndex(emblaApi?.selectedScrollSnap() ?? 0),
    [emblaApi],
  );

  useEffect(() => {
    emblaApi?.on("select", onSelect);
    return () => {
      emblaApi?.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const pafRef = useRef<number>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;

    const updateProgress = () => {
      const timeUntilNext = autoplay.timeUntilNext();
      if (progressBarRef.current) {
        const ratio =
          timeUntilNext !== null
            ? Math.min(
                Math.max((AUTOPLAY_DELAY - timeUntilNext) / AUTOPLAY_DELAY, 0),
                1,
              )
            : 0;
        progressBarRef.current.style.width = `${ratio * 100}%`; // ← direct DOM write, zero re-renders
      }
      pafRef.current = requestAnimationFrame(updateProgress);
    };

    const resetProgress = () => {
      if (progressBarRef.current) progressBarRef.current.style.width = "0%";
    };

    pafRef.current = requestAnimationFrame(updateProgress);
    emblaApi.on("select", resetProgress);

    return () => {
      if (pafRef.current) cancelAnimationFrame(pafRef.current);
      emblaApi.off("select", resetProgress);
    };
  }, [emblaApi]);

  return (
    <div className="w-full">
      <div
        ref={emblaRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className="px-2 shrink-0 basis-[85%]">
              {slide(i === selectedIndex)}
            </div>
          ))}
        </div>
      </div>
      {/* Progress Bar */}
      {
        <div className="mt-4 h-1 min-w-64 w-1/2 mx-auto bg-primary-200 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-primary-600 rounded-full origin-left"
          />
        </div>
      }

      {/* Dots */}
      {
        <div className="flex justify-center gap-3 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => onDotButtonClick(i)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                i === selectedIndex
                  ? "bg-primary-600 scale-125"
                  : "bg-primary-200 hover:bg-primary-400"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      }
    </div>
  );
}
