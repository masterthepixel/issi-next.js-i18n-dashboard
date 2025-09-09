'use client';

import ProductsILearnSystemFeatures from "@/components/ProductsILearnSystemFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsILearnSystemFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsILearnSystemFeaturesWrapper({
    locale,
    messages
}: ProductsILearnSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsILearnSystemFeatures />
        </IntlProvider>
    );
} 
