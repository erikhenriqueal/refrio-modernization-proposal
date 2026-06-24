"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import LanguageSwitcher from "./LangageSwitcher";

function NavbarAnchor({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`
              relative p-2
              transition-colors duration-200 ease-out
              after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2] after:origin-left after:scale-x-0 after:bg-primary-600
              after:transition after:duration-200 after:ease-out
              hover:text-primary-600 hover:after:scale-x-100
            `}
    >
      {children}
    </a>
  );
}

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
          <NavbarAnchor href="#">{t("btn-01")}</NavbarAnchor>
        </li>
        <li>
          <NavbarAnchor href="#">{t("btn-02")}</NavbarAnchor>
        </li>
        <li>
          <NavbarAnchor href="#">{t("btn-03")}</NavbarAnchor>
        </li>
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
}
