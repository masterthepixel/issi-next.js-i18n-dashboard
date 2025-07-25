'use client'

import { IntlProvider } from 'react-intl'

import { Locale } from '@/lib/definitions'
import ProductsPrudentAgileMethodologyFeatures from './ProductsPrudentAgileMethodologyFeatures'

interface ProductsPrudentAgileMethodologyFeaturesWrapperProps {
    locale: Locale
    messages: Record<string, string> | Record<string, any>
}

export default function ProductsPrudentAgileMethodologyFeaturesWrapper({
    locale,
    messages,
}: ProductsPrudentAgileMethodologyFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsPrudentAgileMethodologyFeatures />
        </IntlProvider>
    )
}
