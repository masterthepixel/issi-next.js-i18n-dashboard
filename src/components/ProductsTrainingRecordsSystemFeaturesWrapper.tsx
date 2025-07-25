'use client'

import ProductsTrainingRecordsSystemFeatures from "@/components/ProductsTrainingRecordsSystemFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsTrainingRecordsSystemFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsTrainingRecordsSystemFeaturesWrapper({
    locale,
    messages
}: ProductsTrainingRecordsSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsTrainingRecordsSystemFeatures />
        </IntlProvider>
    );
} 