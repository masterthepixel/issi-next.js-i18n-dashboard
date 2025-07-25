'use client'

import ProductsExpenseTrackingSystemFeatures from "@/components/ProductsExpenseTrackingSystemFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsExpenseTrackingSystemFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsExpenseTrackingSystemFeaturesWrapper({
    locale,
    messages
}: ProductsExpenseTrackingSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsExpenseTrackingSystemFeatures />
        </IntlProvider>
    );
} 