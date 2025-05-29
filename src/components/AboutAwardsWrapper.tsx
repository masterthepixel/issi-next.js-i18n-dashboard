"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import AboutAwards from "./AboutAwards";

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
