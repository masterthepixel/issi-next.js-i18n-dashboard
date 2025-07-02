'use client'

import { IntlProvider } from 'react-intl'

import { Locale } from '@/lib/definitions'
import ProductsBugTrackingSystemFeatures from './ProductsBugTrackingSystemFeatures'

interface ProductsBugTrackingSystemFeaturesWrapperProps {
    locale: Locale
    messages: Record<string, string> | Record<string, any>
}

export default function ProductsBugTrackingSystemFeaturesWrapper({
    locale,
    messages,
}: ProductsBugTrackingSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsBugTrackingSystemFeatures />
        </IntlProvider>
    )
}
