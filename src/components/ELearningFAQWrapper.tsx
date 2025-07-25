"use client";

import { Locale } from '@/lib/definitions';
import { IntlProvider } from 'react-intl';
import ELearningFAQ from './ELearningFAQ';

interface ELearningFAQWrapperProps {
  locale: Locale;
  messages: any;
}

export default function ELearningFAQWrapper({ locale, messages }: ELearningFAQWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ELearningFAQ />
    </IntlProvider>
  );
}
