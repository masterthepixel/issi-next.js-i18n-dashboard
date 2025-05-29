"use client";

import { IntlProvider } from "react-intl";
import AboutAwards from "./AboutAwards";
import { Locale } from "@/lib/definitions";

interface AboutAwardsWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function AboutAwardsWrapper({ locale, messages }: AboutAwardsWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <AboutAwards />
    </IntlProvider>
  );
}
