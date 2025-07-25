"use client";

import enMessages from "@/lang/en.json";
import esMessages from "@/lang/es.json";
import frMessages from "@/lang/fr.json";
import { IntlProvider } from "react-intl";
import NewAlternativeHero from "./NewAlternativeHero";

interface NewAlternativeHeroWrapperProps {
  lang: string;
}

// Messages mapping
const messages = {
  en: enMessages,
  fr: frMessages,
  es: esMessages,
};

export default function NewAlternativeHeroWrapper({ lang = "en" }: NewAlternativeHeroWrapperProps) {
  // Ensure we have a valid locale and messages
  const locale = lang as keyof typeof messages;
  const messagesForLocale = messages[locale] || messages.en;

  return (
    <IntlProvider locale={locale} messages={messagesForLocale}>
      <NewAlternativeHero lang={lang} />
    </IntlProvider>
  );
}
