"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ComplianceIndustryCertifications from "./ComplianceIndustryCertifications";

interface ComplianceIndustryCertificationsWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ComplianceIndustryCertificationsWrapper({ locale, messages }: ComplianceIndustryCertificationsWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ComplianceIndustryCertifications />
    </IntlProvider>
  );
}
