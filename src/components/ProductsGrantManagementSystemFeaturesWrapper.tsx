'use client'

import { IntlProvider } from "react-intl";
import ProductsGrantManagementSystemFeatures from "@/components/ProductsGrantManagementSystemFeatures";
import { Locale } from "@/lib/definitions";

interface ProductsGrantManagementSystemFeaturesWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ProductsGrantManagementSystemFeaturesWrapper({ 
  locale, 
  messages 
}: ProductsGrantManagementSystemFeaturesWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ProductsGrantManagementSystemFeatures />
    </IntlProvider>
  );
}
