"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ComplianceHero from "./ComplianceHero";

interface ComplianceHeroWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ComplianceHeroWrapper({ locale, messages }: ComplianceHeroWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ComplianceHero />
    </IntlProvider>
  );
}