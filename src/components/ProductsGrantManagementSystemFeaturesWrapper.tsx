'use client'

import ProductsGrantManagementSystemFeatures from "@/components/ProductsGrantManagementSystemFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsGrantManagementSystemFeaturesWrapperProps {
  locale: Locale;
  messages: Record<string, string> | Record<string, any>;
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
