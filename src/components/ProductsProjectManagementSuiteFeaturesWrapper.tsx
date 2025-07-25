'use client'

import { Locale } from '@/lib/definitions'
import { IntlProvider } from 'react-intl'
import ProductsProjectManagementSuiteFeatures from './ProductsProjectManagementSuiteFeatures'

interface ProductsProjectManagementSuiteFeaturesWrapperProps {
    locale: Locale
    messages: Record<string, string> | Record<string, any>
}

export default function ProductsProjectManagementSuiteFeaturesWrapper({
    locale,
    messages
}: ProductsProjectManagementSuiteFeaturesWrapperProps) {
    return (
        <IntlProvider
            locale={locale}
            messages={messages}
        >
            <ProductsProjectManagementSuiteFeatures />
        </IntlProvider>
    )
}
