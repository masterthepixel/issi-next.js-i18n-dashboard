"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import AboutCertifications from "./AboutCertifications";

interface AboutCertificationsWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function AboutCertificationsWrapper({ locale, messages }: AboutCertificationsWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <AboutCertifications />
    </IntlProvider>
  );
}
