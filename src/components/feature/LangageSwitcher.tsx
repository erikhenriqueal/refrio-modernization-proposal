import React, { useState } from "react";
import { FlagComponent, US, BR } from "country-flag-icons/react/3x2";
import { usePathname } from "next/navigation";

import { useLanguageSwitcher } from "@/i18n/client";
import { routing } from "@/i18n/routing";

import { motion, AnimatePresence } from "motion/react";

function SwitcherButton({
  onClick,
  children,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        h-full p-2 aspect-square rounded-full border-2 shadow-md shadow-primary-900/35 cursor-pointer outline-none
        transition-colors ease-in-out duration-100
        border-primary-100
        hover:bg-primary-100 hover:border-primary-100
        active:*:scale-95
        `}
    >
      {children}
    </button>
  );
}

export interface LanguageObject {
  label: string;
  icon: FlagComponent;
}

export const Languages: Record<
  (typeof routing.locales)[number],
  LanguageObject
> = {
  en: {
    label: "English",
    icon: US,
  },
  br: {
    label: "Português (Brasil)",
    icon: BR,
  },
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const actualLangStr =
    pathname.split("/").filter(Boolean)[0] ?? routing.defaultLocale;
  const actualLang =
    Languages[actualLangStr as (typeof routing.locales)[number]];

  const { switchLanguage } = useLanguageSwitcher();

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="h-full relative">
      {/* Selected */}
      <SwitcherButton onClick={() => setOpen(!isOpen)}>
        <actualLang.icon
          height={16}
          className="rounded-xs transition-[scale] ease-out duration-100"
        />
      </SwitcherButton>
      {/* Options */}
      <div className="absolute bottom-0 translate-y-[calc(100%+0.5rem)]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {routing.locales
                .filter((l) => l != actualLangStr)
                .map((l, i) => {
                  const lang = Languages[l];
                  return (
                    <SwitcherButton key={i} onClick={() => switchLanguage(l)}>
                      <lang.icon
                        height={16}
                        className="rounded-xs transition-[scale] ease-out duration-100"
                      />
                    </SwitcherButton>
                  );
                })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
