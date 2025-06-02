"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ComplianceStats from "./ComplianceStats";

interface ComplianceStatsWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ComplianceStatsWrapper({ locale, messages }: ComplianceStatsWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ComplianceStats />
    </IntlProvider>
  );
}