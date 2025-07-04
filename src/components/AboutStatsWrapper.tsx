"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import AboutStats from "./AboutStats";

interface AboutStatsWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function AboutStatsWrapper({ locale, messages }: AboutStatsWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <AboutStats />
    </IntlProvider>
  );
}
