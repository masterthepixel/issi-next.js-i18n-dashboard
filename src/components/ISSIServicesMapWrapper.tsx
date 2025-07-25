'use client';

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ISSIServicesMap from "./ISSIServicesMap";

interface ISSIServicesMapWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ISSIServicesMapWrapper({ locale, messages }: ISSIServicesMapWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ISSIServicesMap />
    </IntlProvider>
  );
}
