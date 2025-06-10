'use client';

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ISSIServicesShowcase from "./ISSIServicesShowcase";

interface ISSIServicesShowcaseWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ISSIServicesShowcaseWrapper({ locale, messages }: ISSIServicesShowcaseWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ISSIServicesShowcase />
    </IntlProvider>
  );
}
