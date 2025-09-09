"use client";

import ProductsVisitorLogSystemFeatures from "@/components/ProductsVisitorLogSystemFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsVisitorLogSystemFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsVisitorLogSystemFeaturesWrapper({
    locale,
    messages
}: ProductsVisitorLogSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsVisitorLogSystemFeatures />
        </IntlProvider>
    );
} 
