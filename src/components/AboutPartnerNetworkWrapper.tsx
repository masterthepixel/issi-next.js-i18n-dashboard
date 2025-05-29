"use client";

import { IntlProvider } from "react-intl";
import AboutPartnerNetwork from "./AboutPartnerNetwork";
import { Locale } from "@/lib/definitions";

interface AboutPartnerNetworkWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function AboutPartnerNetworkWrapper({ locale, messages }: AboutPartnerNetworkWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <AboutPartnerNetwork />
    </IntlProvider>
  );
}
