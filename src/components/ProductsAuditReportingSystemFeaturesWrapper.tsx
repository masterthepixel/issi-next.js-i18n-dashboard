'use client';

import ProductsAuditReportingSystemFeatures from "@/components/ProductsAuditReportingSystemFeatures";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ProductsAuditReportingSystemFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsAuditReportingSystemFeaturesWrapper({
    locale,
    messages
}: ProductsAuditReportingSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsAuditReportingSystemFeatures />
        </IntlProvider>
    );
} 