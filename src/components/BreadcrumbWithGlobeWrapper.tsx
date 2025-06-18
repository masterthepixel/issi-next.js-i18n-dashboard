"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import BreadcrumbWithGlobe from "./BreadcrumbWithGlobe";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbWithGlobeWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
  items: BreadcrumbItem[];
  title: string;
  backLabel?: string;
  backHref?: string;
}

export default function BreadcrumbWithGlobeWrapper({ 
  locale, 
  messages, 
  items, 
  title, 
  backLabel, 
  backHref 
}: BreadcrumbWithGlobeWrapperProps) {
  return (    <IntlProvider locale={locale} messages={messages}>
      <BreadcrumbWithGlobe 
        items={items}
        title={title}
        backLabel={backLabel}
        backHref={backHref}
        lang={locale}
        baseUrl="https://issi.com"
      />
    </IntlProvider>
  );
}
