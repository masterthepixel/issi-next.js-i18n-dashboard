'use client';

import ProductsRSVPEventManagementFeatures from "@/components/ProductsRSVPEventManagementFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsRSVPEventManagementFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsRSVPEventManagementFeaturesWrapper({
    locale,
    messages
}: ProductsRSVPEventManagementFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsRSVPEventManagementFeatures />
        </IntlProvider>
    );
} 