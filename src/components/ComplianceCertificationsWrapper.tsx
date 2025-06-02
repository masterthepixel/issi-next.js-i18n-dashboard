'use client';

import { IntlProvider } from "react-intl";
import ComplianceCertifications from "./ComplianceCertifications";

interface ComplianceCertificationsWrapperProps {
  locale: string;
  messages: any;
}

export default function ComplianceCertificationsWrapper({ locale, messages }: ComplianceCertificationsWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ComplianceCertifications />
    </IntlProvider>
  );
}
