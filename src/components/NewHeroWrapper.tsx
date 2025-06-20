'use client'

import NewHomePageHero from "@/components/NewHomePageHero";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface NewHeroWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function NewHeroWrapper({ locale, messages }: NewHeroWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <NewHomePageHero />
    </IntlProvider>
  );
}
