'use client'

import ProductsESurveyPlatformFeatures from "@/components/ProductsESurveyPlatformFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsESurveyPlatformFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsESurveyPlatformFeaturesWrapper({
    locale,
    messages
}: ProductsESurveyPlatformFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsESurveyPlatformFeatures />
        </IntlProvider>
    );
} 