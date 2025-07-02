'use client'

import { IntlProvider } from 'react-intl'

import ProductsCaptureManagerFeatures from './ProductsCaptureManagerFeatures'
import { Locale } from '@/lib/definitions'

interface ProductsCaptureManagerFeaturesWrapperProps {
  locale: Locale
  messages: Record<string, string> | Record<string, any>
}

export default function ProductsCaptureManagerFeaturesWrapper({
  locale,
  messages,
}: ProductsCaptureManagerFeaturesWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ProductsCaptureManagerFeatures />
    </IntlProvider>
  )
}
