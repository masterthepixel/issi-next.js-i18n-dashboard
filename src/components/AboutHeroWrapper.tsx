"use client";

import { IntlProvider } from "react-intl";
import AboutHero from "./AboutHero";
import { Locale } from "@/lib/definitions";

interface AboutHeroWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function AboutHeroWrapper({ locale, messages }: AboutHeroWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <AboutHero />
    </IntlProvider>
  );
}
