'use client'

import { IntlProvider } from 'react-intl'

import ProductsPrudentAgileMethodologyFeatures from './ProductsPrudentAgileMethodologyFeatures'
import { Locale } from '@/lib/definitions'

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
