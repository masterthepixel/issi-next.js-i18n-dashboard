'use client'

import ProductsICodeTestingPlatformFeatures from "@/components/ProductsICodeTestingPlatformFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsICodeTestingPlatformFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsICodeTestingPlatformFeaturesWrapper({
    locale,
    messages
}: ProductsICodeTestingPlatformFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsICodeTestingPlatformFeatures />
        </IntlProvider>
    );
} 