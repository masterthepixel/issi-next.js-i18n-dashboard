'use client'

import { IntlProvider } from 'react-intl'
import ProductsHRManagementSystemFeatures from './ProductsHRManagementSystemFeatures'

interface ProductsHRManagementSystemFeaturesWrapperProps {
  locale: string
  messages: any
}

export default function ProductsHRManagementSystemFeaturesWrapper({
  locale,
  messages,
}: ProductsHRManagementSystemFeaturesWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ProductsHRManagementSystemFeatures />
    </IntlProvider>
  )
}
