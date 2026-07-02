"use client";

import { Ref, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";

import LanguageSwitcher from "./LangageSwitcher";
import { Anchor, Button } from "../ui/button";
import { Dropdown } from "../ui/dropdown";

const InternalAnchor: typeof Anchor = ({ href, children, ...props }) => (
  <Anchor target="_self" href={href} {...props}>
    <span>{children}</span>
    <IoIosArrowRoundForward size="1.5rem" className="inline-block" />
  </Anchor>
);

export default function Navbar({ ref }: { ref: Ref<HTMLElement> }) {
  const [vpWidth, setVpWidth] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.innerWidth;
  });

  useEffect(() => {
    const handleResize = () => {
      setVpWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const solutionsLIRef = useRef<HTMLLIElement>(null);

  const t = useTranslations("Navbar");

  return (
    <nav
      ref={ref}
      className="w-full h-min px-4 sm:px-8 py-4 flex flex-row items-center justify-between bg-neutral-50 border-b-2 border-b-primary-600/50 z-999"
    >
      {/* Logo */}
      <a href="#" className="flex-none">
        <Image
          src={"/refrio-logo.png"}
          alt="Refrio Logo"
          width={200}
          height={64}
          loading={"lazy"}
          className="pointer-events-none select-none"
          draggable={false}
        />
      </a>
      {/* Content */}
      <div
        className={
          "relative flex flex-row-reverse gap-6 " +
          // Desktop
          "sm:static sm:min-w-0 sm:max-w-max sm:w-full sm:flex sm:flex-row sm:gap-6"
        }
      >
        {/* Mobile Menu Button */}
        <Button
          variant="primary"
          shapes={["roundy", "square"]}
          className="block sm:hidden min-w-12 px-3 py-3.5 z-999"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div
            className={
              "relative size-full " +
              "*:absolute *:inset-x-0 *:h-0.5 *:bg-neutral-50 *:duration-300 *:ease-in-out"
            }
          >
            {/* Top bar */}
            <span
              className={
                "origin-center transition-[top,translate,rotate] " +
                (mobileMenuOpen
                  ? "top-1/2 -translate-y-1/2 rotate-45"
                  : "top-0 rotate-0")
              }
            />

            {/* Middle bar */}
            <span
              className={
                "top-1/2 -translate-y-1/2 " +
                "transition-opacity " +
                (mobileMenuOpen ? "opacity-0" : "opacity-100")
              }
            />

            {/* Bottom bar */}
            <span
              className={
                "origin-center transition-[top,translate,rotate] " +
                (mobileMenuOpen
                  ? "top-1/2 -translate-y-1/2 -rotate-45"
                  : "top-[calc(100%-0.125rem)] rotate-0")
              }
            />
          </div>
        </Button>
        {/* Navigation */}
        <div
          className={
            // Mobile Displaying
            (mobileMenuOpen ? "block" : "hidden") +
            " " +
            // Mobile
            "fixed right-0 p-4 w-max rounded-bl-2xl bg-neutral-50 border-primary-600/50 border-b-2 border-l-2 shadow-2xl shadow-neutral-900/30 z-999 " +
            // Desktop
            "sm:block sm:static sm:min-w-0 sm:max-w-max sm:overflow-x-auto sm:overflow-y-hidden sm:rounded-none sm:shadow-none sm:border-none sm:p-0"
          }
          style={{ top: "var(--navbar-h, 0px)" }}
        >
          <ul className="w-max text-xl font-bold flex flex-col sm:flex-row flex-nowrap gap-4 sm:items-center *:w-max">
            <li>
              <Anchor variant="underline" href="#about">
                {t("btn-01")}
              </Anchor>
            </li>
            <li ref={solutionsLIRef}>
              <Dropdown
                action={
                  <Anchor variant="underline" href="#solutions">
                    {t("btn-02")}
                  </Anchor>
                }
                className={
                  // Global
                  "text-lg font-bold " +
                  // Mobile - Static
                  "static w-min! pl-4 " +
                  // Desktop - Fixed
                  "sm:fixed sm:p-4 sm:bg-neutral-50 sm:rounded-2xl sm:rounded-tl-none sm:border-2 sm:border-primary-600 sm:space-y-4 sm:z-9999"
                }
                containerRef={vpWidth < 640 ? solutionsLIRef : undefined}
              >
                <li>
                  <Anchor variant="underline" href="#s&p">
                    {t("btn-02-a")}
                  </Anchor>
                </li>
                <li>
                  <Anchor variant="underline" href="#consulting">
                    {t("btn-02-b")}
                  </Anchor>
                </li>
              </Dropdown>
            </li>
            <li>
              <InternalAnchor variant="underline" href="/atuation">
                {t("btn-03")}
              </InternalAnchor>
            </li>
            <li>
              <Anchor variant="underline" href="#solutions">
                {t("btn-04")}
              </Anchor>
            </li>
          </ul>
        </div>
        {/* Language Switcher */}
        <div className="w-max shrink-0">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
