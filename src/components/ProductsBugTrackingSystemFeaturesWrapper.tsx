'use client'

import { IntlProvider } from 'react-intl'

import ProductsBugTrackingSystemFeatures from './ProductsBugTrackingSystemFeatures'
import { Locale } from '@/lib/definitions'

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
