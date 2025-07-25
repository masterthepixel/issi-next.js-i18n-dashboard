'use client';

import ProductsTaskManagementSystemFeatures from "@/components/ProductsTaskManagementSystemFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsTaskManagementSystemFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsTaskManagementSystemFeaturesWrapper({
    locale,
    messages,
}: ProductsTaskManagementSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsTaskManagementSystemFeatures />
        </IntlProvider>
    );
}
