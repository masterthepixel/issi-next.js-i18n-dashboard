"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import TeamGrid from "./TeamGrid";

interface TeamGridWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function TeamGridWrapper({ locale, messages }: TeamGridWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <TeamGrid />
    </IntlProvider>
  );
}
