'use client'

import ProductsMeetingMinutesManagerFeatures from "@/components/ProductsMeetingMinutesManagerFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsMeetingMinutesManagerFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsMeetingMinutesManagerFeaturesWrapper({
    locale,
    messages
}: ProductsMeetingMinutesManagerFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsMeetingMinutesManagerFeatures />
        </IntlProvider>
    );
} 