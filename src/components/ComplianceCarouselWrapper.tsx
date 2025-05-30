'use client';

import { IntlProvider } from "react-intl";
import ComplianceCarousel from "./ComplianceCarousel";

interface ComplianceCarouselWrapperProps {
  locale: string;
  messages: any;
}

export default function ComplianceCarouselWrapper({ locale, messages }: ComplianceCarouselWrapperProps) {
  console.log('ComplianceCarouselWrapper rendering with locale:', locale, 'messages:', messages);
  
  return (
    <div className="bg-blue-500 text-white p-4 mb-4">
      DEBUG: ComplianceCarouselWrapper is rendering (locale: {locale})
      <IntlProvider locale={locale} messages={messages}>
        <ComplianceCarousel />
      </IntlProvider>
    </div>
  );
}
