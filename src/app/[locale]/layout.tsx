import "@/app/globals.css";

import { Plus_Jakarta_Sans } from "next/font/google";

const PlusJakartaSansFont = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext"],
  preload: true,
});

// const ManropeFont = Manrope({
//   weight: ["200", "300", "400", "500", "600", "700", "800"],
//   subsets: ["latin-ext"],
//   preload: true,
// });

import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "LayoutMetadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const NormalizedHTMLLangs = {
  br: "pt-BR",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number]))
    notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={
        locale in NormalizedHTMLLangs
          ? NormalizedHTMLLangs[locale as keyof typeof NormalizedHTMLLangs]
          : locale
      }
      className={`${PlusJakartaSansFont.className} min-h-dvh w-dvw antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
