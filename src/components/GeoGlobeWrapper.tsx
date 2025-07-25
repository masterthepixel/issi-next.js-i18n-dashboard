"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import GeoGlobe from "./GeoGlobe";

interface GeoGlobeWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
  className?: string;
}

export default function GeoGlobeWrapper({ 
  locale, 
  messages, 
  className 
}: GeoGlobeWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <GeoGlobe className={className} />
    </IntlProvider>
  );
}
