"use client";

import ProductsInventoryAssetTrackingSystemFeatures from "@/components/ProductsInventoryAssetTrackingSystemFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsInventoryAssetTrackingSystemFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsInventoryAssetTrackingSystemFeaturesWrapper({
    locale,
    messages
}: ProductsInventoryAssetTrackingSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsInventoryAssetTrackingSystemFeatures />
        </IntlProvider>
    );
} 