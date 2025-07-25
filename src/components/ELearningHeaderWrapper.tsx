"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ELearningHeader from "./ELearningHeader";

interface ELearningHeaderWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ELearningHeaderWrapper({ locale, messages }: ELearningHeaderWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ELearningHeader />
    </IntlProvider>
  );
}
