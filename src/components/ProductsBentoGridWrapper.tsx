"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ProductsBentoGrid from "./ProductsBentoGrid";

interface ProductsBentoGridWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ProductsBentoGridWrapper({ locale, messages }: ProductsBentoGridWrapperProps) {
  // const breadcrumbItems = [
  //   {
  //     name: messages['common.navigation.products'] || 'Products',
  //   }
  // ];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {/* <Breadcrumb 
        items={breadcrumbItems}
        locale={locale}
        title={messages['page.products.title'] || 'Our Products'}
        description={messages['page.products.description'] || 'Explore our innovative software products designed to meet your business needs.'}
        backgroundImage="/images/6.png"
      /> */}
      <ProductsBentoGrid lang={locale} />
    </IntlProvider>
  );
}
