'use client'

import ProductsProfessionalManagementFeatures from "@/components/ProductsProfessionalManagementFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsProfessionalManagementFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsProfessionalManagementFeaturesWrapper({
    locale,
    messages
}: ProductsProfessionalManagementFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsProfessionalManagementFeatures />
        </IntlProvider>
    );
} 