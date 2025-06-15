"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ProductsBentoGrid from "./ProductsBentoGrid";

interface ProductsBentoGridWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ProductsBentoGridWrapper({ locale, messages }: ProductsBentoGridWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ProductsBentoGrid lang={locale} />
    </IntlProvider>
  );
}
