'use client'

import { IntlProvider } from 'react-intl'
import ProductsEmployeePerformanceSystemFeatures from './ProductsEmployeePerformanceSystemFeatures'

interface ProductsEmployeePerformanceSystemFeaturesWrapperProps {
  locale: string
  messages: any
}

export default function ProductsEmployeePerformanceSystemFeaturesWrapper({
  locale,
  messages,
}: ProductsEmployeePerformanceSystemFeaturesWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ProductsEmployeePerformanceSystemFeatures />
    </IntlProvider>
  )
}
