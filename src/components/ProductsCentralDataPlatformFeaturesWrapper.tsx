'use client'

import ProductsCentralDataPlatformFeatures from "@/components/ProductsCentralDataPlatformFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsCentralDataPlatformFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsCentralDataPlatformFeaturesWrapper({
    locale,
    messages
}: ProductsCentralDataPlatformFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsCentralDataPlatformFeatures />
        </IntlProvider>
    );
} 
