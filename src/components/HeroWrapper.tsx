'use client'

import { IntlProvider } from "react-intl";
import Hero from "@/components/Hero";
import { Locale } from "@/lib/definitions";

interface HeroWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function HeroWrapper({ locale, messages }: HeroWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <Hero />
    </IntlProvider>
  );
}
