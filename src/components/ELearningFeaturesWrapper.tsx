"use client";

import { IntlProvider } from "react-intl";
import ELearningFeatures from "./ELearningFeatures";

interface ELearningFeaturesWrapperProps {
  locale: string;
  messages: Record<string, string>;
}

export default function ELearningFeaturesWrapper({ locale, messages }: ELearningFeaturesWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ELearningFeatures />
    </IntlProvider>
  );
}
