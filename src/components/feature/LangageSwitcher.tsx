import { useRef, useState } from "react";
import { FlagComponent, US, BR } from "country-flag-icons/react/3x2";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

import { useLanguageSwitcher } from "@/i18n/client";
import { routing } from "@/i18n/routing";

import { Button } from "../ui/button";
import { useOutsideClick } from "@/hooks/useOutsideClick";

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

  const triggerRef = useRef<HTMLButtonElement>(null);

  useOutsideClick([triggerRef], () => setOpen(false));

  return (
    <div className="h-full relative">
      {/* Selected */}
      <Button
        ref={triggerRef}
        variant="secondary"
        shapes={["roundy", "square"]}
        onClick={() => setOpen(!isOpen)}
      >
        <actualLang.icon
          height={16}
          className="rounded-xs transition-[scale] ease-out duration-100"
        />
      </Button>
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
                    <Button
                      key={i}
                      variant="secondary"
                      shapes={["roundy", "square"]}
                      onClick={() => switchLanguage(l)}
                    >
                      <lang.icon
                        height={16}
                        className="rounded-xs transition-[scale] ease-out duration-100"
                      />
                    </Button>
                  );
                })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
