"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routing } from "./routing";

export function useLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const switchLanguage = (lang: (typeof routing.locales)[number]) => {
    const segments = pathname.split("/").filter(Boolean);

    segments[0] = lang;

    const newPath = `/${segments.join("/")}`;
    const queryStr = searchParams.toString();
    const fullUrl = queryStr ? `${newPath}?${queryStr}` : newPath;

    router.replace(fullUrl);
  };

  return { switchLanguage };
}
