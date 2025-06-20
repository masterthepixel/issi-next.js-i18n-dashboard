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
  description?: string;
  backLabel?: string;
  backHref?: string;
}

export default function BreadcrumbWithGlobeWrapper({ 
  locale, 
  messages, 
  items, 
  title, 
  description,
  backLabel, 
  backHref 
}: BreadcrumbWithGlobeWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <BreadcrumbWithGlobe 
        items={items}
        title={title}
        description={description}
        backLabel={backLabel}
        backHref={backHref}
        lang={locale}
        baseUrl="https://issi.com"
      />
    </IntlProvider>
  );
}
