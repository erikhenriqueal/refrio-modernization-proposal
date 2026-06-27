"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import LanguageSwitcher from "./LangageSwitcher";
import { Anchor } from "../ui/button";

export default function Navbar() {
  const t = useTranslations("Navbar");
  return (
    <nav className="w-full px-8 py-4 flex flex-row items-center justify-between border-b-2 border-b-primary-600/50">
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
      <ul className="text-xl font-bold flex flex-row gap-4 items-center">
        <li>
          <Anchor variant="underline" href="#">
            {t("btn-01")}
          </Anchor>
        </li>
        <li>
          <Anchor variant="underline" href="#">
            {t("btn-02")}
          </Anchor>
        </li>
        <li>
          <Anchor variant="underline" href="#">
            {t("btn-03")}
          </Anchor>
        </li>
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
}
