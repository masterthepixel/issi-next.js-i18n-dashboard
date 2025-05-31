'use client';

import { IntlProvider } from "react-intl";
import ComplianceCarousel from "./ComplianceCarousel";

interface ComplianceCarouselWrapperProps {
  locale: string;
  messages: any;
}

export default function ComplianceCarouselWrapper({ locale, messages }: ComplianceCarouselWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ComplianceCarousel />
    </IntlProvider>
  );
}
