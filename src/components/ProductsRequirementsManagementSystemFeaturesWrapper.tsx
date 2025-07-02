'use client'

import { IntlProvider } from 'react-intl'
import ProductsRequirementsManagementSystemFeatures from './ProductsRequirementsManagementSystemFeatures'

interface ProductsRequirementsManagementSystemFeaturesWrapperProps {
  locale: string
  messages: any
}

export default function ProductsRequirementsManagementSystemFeaturesWrapper({
  locale,
  messages,
}: ProductsRequirementsManagementSystemFeaturesWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ProductsRequirementsManagementSystemFeatures />
    </IntlProvider>
  )
}
