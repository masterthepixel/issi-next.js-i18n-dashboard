'use client';

import ProductsComplaintTrackingSystemFeatures from "@/components/ProductsComplaintTrackingSystemFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsComplaintTrackingSystemFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsComplaintTrackingSystemFeaturesWrapper({
    locale,
    messages,
}: ProductsComplaintTrackingSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsComplaintTrackingSystemFeatures />
        </IntlProvider>
    );
} 
