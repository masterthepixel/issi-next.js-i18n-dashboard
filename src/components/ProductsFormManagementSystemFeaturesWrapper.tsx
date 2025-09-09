'use client'

import ProductsFormManagementSystemFeatures from "@/components/ProductsFormManagementSystemFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsFormManagementSystemFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsFormManagementSystemFeaturesWrapper({
    locale,
    messages
}: ProductsFormManagementSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsFormManagementSystemFeatures />
        </IntlProvider>
    );
} 
