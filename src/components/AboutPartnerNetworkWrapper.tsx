"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import AboutPartnerNetwork from "./AboutPartnerNetwork";

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
