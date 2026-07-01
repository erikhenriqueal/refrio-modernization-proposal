"use client";

import { Ref } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";

import LanguageSwitcher from "./LangageSwitcher";
import { Anchor } from "../ui/button";
import { Dropdown } from "../ui/dropdown";

const InternalAnchor: typeof Anchor = ({ href, children, ...props }) => (
  <Anchor target="_self" href={href} {...props}>
    <span>{children}</span>
    <IoIosArrowRoundForward size="1.5rem" className="inline-block" />
  </Anchor>
);

export default function Navbar({ ref }: { ref: Ref<HTMLElement> }) {
  const t = useTranslations("Navbar");
  return (
    <nav
      ref={ref}
      className="w-full px-8 py-4 flex flex-row items-center justify-between bg-neutral-50 border-b-2 border-b-primary-600/50 z-999"
    >
      {/* Logo */}
      <a href="#">
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
      <div className="flex flex-row gap-6">
        {/* Navigation */}
        <ul className="text-xl font-bold flex flex-row gap-4 items-center">
          <li>
            <Anchor variant="underline" href="#about">
              {t("btn-01")}
            </Anchor>
          </li>
          <li>
            <Dropdown
              action={
                <Anchor variant="underline" href="#solutions">
                  {t("btn-02")}
                </Anchor>
              }
              className="bg-neutral-50 p-4 rounded-2xl rounded-tl-none border-2 border-primary-600 space-y-4"
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
        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
