'use client'

import { Locale } from '@/lib/definitions'
import { IntlProvider } from 'react-intl'
import ProductsMembershipDatabaseSubsidyPaymentSystemFeatures from './ProductsMembershipDatabaseSubsidyPaymentSystemFeatures'

interface ProductsMembershipDatabaseSubsidyPaymentSystemFeaturesWrapperProps {
    locale: Locale
    messages: Record<string, string> | Record<string, any>
}

export default function ProductsMembershipDatabaseSubsidyPaymentSystemFeaturesWrapper({
    locale,
    messages
}: ProductsMembershipDatabaseSubsidyPaymentSystemFeaturesWrapperProps) {
    return (
        <IntlProvider
            locale={locale}
            messages={messages}
        >
            <ProductsMembershipDatabaseSubsidyPaymentSystemFeatures />
        </IntlProvider>
    )
}
