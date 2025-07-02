'use client'

import { IntlProvider } from 'react-intl'
import ProductsTimesheetManagementSystemFeatures from './ProductsTimesheetManagementSystemFeatures'

interface ProductsTimesheetManagementSystemFeaturesWrapperProps {
  locale: string
  messages: any
}

export default function ProductsTimesheetManagementSystemFeaturesWrapper({
  locale,
  messages,
}: ProductsTimesheetManagementSystemFeaturesWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ProductsTimesheetManagementSystemFeatures />
    </IntlProvider>
  )
}
