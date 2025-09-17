'use client'

import GlobeHero from "@/components/GlobeHero";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface HeroWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function HeroWrapper({ locale, messages }: HeroWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <GlobeHero lang={locale} />
    </IntlProvider>
  );
}
